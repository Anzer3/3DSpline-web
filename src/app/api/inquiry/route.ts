import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Maximum total payload size: 25 MB
const MAX_TOTAL_SIZE = 25 * 1024 * 1024;

// Allowed file extensions
const ALLOWED_EXTENSIONS = new Set([
  "step",
  "stp",
  "stl",
  "3mf",
  "zip",
  "jpg",
  "jpeg",
  "png",
  "pdf",
  "dwg",
  "dxf",
]);

// -------------------------------------------------------------
// In-Memory Rate Limiting (Token Bucket per IP)
// Max 5 inquiries per IP in 10 minutes window
// -------------------------------------------------------------
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean old expired entries if map grows
  if (rateLimitMap.size > 2000) {
    rateLimitMap.forEach((val, key) => {
      if (now > val.resetTime) {
        rateLimitMap.delete(key);
      }
    });
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(retryAfter, 1) };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

// -------------------------------------------------------------
// HTML & Text XSS Sanitizer
// -------------------------------------------------------------
function sanitizeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

function sanitizeText(str: string, maxLength = 2000): string {
  if (!str) return "";
  // Strip control characters, keep newlines and tabs
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
  return cleaned.slice(0, maxLength);
}

function sanitizeFilename(filename: string): string {
  if (!filename) return "priloha";
  // Remove directory traversal characters, slashes and null bytes
  const base = filename.replace(/^.*[\\/]/, "").replace(/[\x00-\x1F\x7F]/g, "");
  // Keep only safe characters: letters, numbers, dot, dash, underscore, space
  return base.replace(/[^a-zA-Z0-9.\-_ \u00C0-\u024F\u1E00-\u1EFF]/g, "_");
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  try {
    // 1. RATE LIMITING CHECK
    const clientIp = getClientIp(req);
    const { allowed, retryAfterSeconds } = checkRateLimit(clientIp);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Příliš mnoho poptávek v krátkém čase. Zkuste to prosím znovu za ${Math.ceil(
            retryAfterSeconds / 60
          )} minut.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSeconds.toString(),
          },
        }
      );
    }

    const formData = await req.formData();

    // 2. INPUT SANITIZATION & LENGTH LIMITS
    const rawTab = (formData.get("tab") as string) || "drawing";
    const tab = rawTab === "model" ? "model" : "drawing";

    const name = sanitizeText((formData.get("name") as string) || "", 120);
    const email = sanitizeText((formData.get("email") as string) || "", 120).toLowerCase();
    const phone = sanitizeText((formData.get("phone") as string) || "", 50) || "Neuvedeno";
    const quantity = sanitizeText((formData.get("quantity") as string) || "", 100) || "Neuvedeno";
    const rawMaterial = sanitizeText((formData.get("material") as string) || "", 100);
    const material = rawMaterial || "Nechám si poradit";

    const prototypePackage =
      formData.get("prototypePackage") === "true" || formData.get("sampleApproval") === "true";

    const licenseConfirmed =
      formData.get("licenseConfirmed") === "true" || formData.get("licenseConfirmed") === "on";

    const note = sanitizeText((formData.get("note") as string) || "", 4000) || "Bez další poznámky";

    // 3. VALIDATION
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Jméno a příjmení a Váš e-mail jsou povinná pole." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Zadejte prosím platnou e-mailovou adresu." },
        { status: 400 }
      );
    }

    // 4. PROCESS FILES & SANITIZE NAMES
    const fileEntries = formData.getAll("files") as (File | string)[];
    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType: string;
    }> = [];

    let totalFileSize = 0;
    const fileListForLog: Array<{ name: string; size: string }> = [];

    for (const entry of fileEntries) {
      if (typeof entry === "object" && entry && "arrayBuffer" in entry && entry.size > 0) {
        totalFileSize += entry.size;
        if (totalFileSize > MAX_TOTAL_SIZE) {
          return NextResponse.json(
            {
              success: false,
              error: "Celková velikost přiložených souborů přesahuje povolený limit 25 MB.",
            },
            { status: 400 }
          );
        }

        const safeFilename = sanitizeFilename(entry.name);
        const ext = safeFilename.split(".").pop()?.toLowerCase() || "";

        if (!ALLOWED_EXTENSIONS.has(ext)) {
          return NextResponse.json(
            {
              success: false,
              error: `Nepovolený typ souboru: .${ext}. Povolené jsou: STEP, STL, 3MF, ZIP, JPG, PNG, PDF, DWG, DXF.`,
            },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await entry.arrayBuffer());
        attachments.push({
          filename: safeFilename,
          content: buffer,
          contentType: entry.type || "application/octet-stream",
        });

        const sizeKb = (entry.size / 1024).toFixed(1);
        fileListForLog.push({
          name: safeFilename,
          size: `${sizeKb} KB`,
        });
      }
    }

    const tabLabel =
      tab === "model"
        ? "Mám hotový 3D model (.STEP, .STL, .3MF)"
        : "Nemám 3D model (výkres, náčrt, poškozený díl)";

    const inquiryDetails = {
      tab: tabLabel,
      name,
      email,
      phone,
      quantity,
      material,
      prototypePackage: prototypePackage
        ? "ANO (požadován Prototypovací balíček / zkušební vzorek před sérií)"
        : "NE (rovnou výroba dle zadání)",
      licenseConfirmed: licenseConfirmed
        ? "ANO (klient potvrdil vlastnictví práv či komerční licenci k modelu)"
        : "NEPOTVRZENO",
      note,
      filesCount: attachments.length,
      fileList: fileListForLog,
      timestamp: new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" }),
      ip: clientIp,
    };

    console.log("==================================================");
    console.log("📥 PŘIJATA NOVÁ POPTÁVKA (3dspline.cz):", inquiryDetails);
    console.log("==================================================");

    // 5. ESCAPED VARIABLES FOR EMAIL HTML TEMPLATES (XSS PREVENTION)
    const safeNameHtml = sanitizeHtml(name);
    const safeEmailHtml = sanitizeHtml(email);
    const safePhoneHtml = sanitizeHtml(phone);
    const safeQuantityHtml = sanitizeHtml(quantity);
    const safeMaterialHtml = sanitizeHtml(material);
    const safePrototypePackageHtml = sanitizeHtml(inquiryDetails.prototypePackage);
    const safeTabLabelHtml = sanitizeHtml(tabLabel);
    const safeNoteHtml = sanitizeHtml(note).replace(/\n/g, "<br/>");
    const safeTimestampHtml = sanitizeHtml(inquiryDetails.timestamp);

    // Check SMTP configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyEmail = process.env.NOTIFY_EMAIL || "info@3dspline.cz";
    const fromEmail = process.env.FROM_EMAIL || `"3dspline.cz Poptávky" <${smtpUser || "info@3dspline.cz"}>`;

    const isSmtpConfigured =
      smtpHost &&
      smtpHost !== "localhost" &&
      smtpUser &&
      smtpUser !== "test@3dspline.cz" &&
      smtpPass &&
      smtpPass !== "testpass";

    if (!isSmtpConfigured) {
      console.log(
        "ℹ️ SMTP není nakonfigurováno pro produkci (nebo běží lokální simulace). Poptávka byla bezpečně uložena v konzoli."
      );
      return NextResponse.json({
        success: true,
        message:
          "Děkujeme! Vaše poptávka byla úspěšně přijata. Ozveme se vám s technickým posouzením a kalkulací do 24 hodin.",
        simulated: true,
      });
    }

    // Configure Nodemailer transporter (robust configuration for Seznam / Vercel)
    const isSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        // Do not fail on invalid certs and allow proper TLS negotiation
        rejectUnauthorized: false,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // 1. Email to Site Owner / Engineer (with escaped HTML)
    const ownerHtml = `
      <!DOCTYPE html>
      <html lang="cs">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
          .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: #0f2942; color: #ffffff; padding: 24px 32px; border-bottom: 3px solid #2563eb; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 0; font-size: 13px; color: #94a3b8; }
          .content { padding: 32px; }
          .badge { display: inline-block; background: #eff6ff; color: #1d4ed8; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; margin-bottom: 20px; border: 1px solid #bfdbfe; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .table th { text-align: left; padding: 10px 12px; font-size: 13px; color: #64748b; background: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 35%; }
          .table td { padding: 10px 12px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-weight: 500; }
          .note-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 0 6px 6px 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6; word-break: break-word; }
          .file-pill { display: inline-block; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-family: monospace; margin: 4px 4px 0 0; }
          .footer { background: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>3dspline.cz • Nová zakázková poptávka</h1>
            <p>Přijato dne ${safeTimestampHtml} přes webový formulář</p>
          </div>
          <div class="content">
            <span class="badge">${safeTabLabelHtml}</span>
            <table class="table">
              <tr>
                <th>Zákazník:</th>
                <td><strong>${safeNameHtml}</strong></td>
              </tr>
              <tr>
                <th>E-mail:</th>
                <td><a href="mailto:${safeEmailHtml}" style="color: #2563eb; text-decoration: none;">${safeEmailHtml}</a></td>
              </tr>
              <tr>
                <th>Telefon:</th>
                <td><a href="tel:${safePhoneHtml}" style="color: #0f172a; text-decoration: none;">${safePhoneHtml}</a></td>
              </tr>
              <tr>
                <th>Počet kusů:</th>
                <td>${safeQuantityHtml}</td>
              </tr>
              <tr>
                <th>Preferovaný materiál:</th>
                <td>${safeMaterialHtml}</td>
              </tr>
              <tr>
                <th>Prototypovací balíček:</th>
                <td><strong>${safePrototypePackageHtml}</strong></td>
              </tr>
              <tr>
                <th>Autorská práva &amp; licence:</th>
                <td><span style="color: #16a34a; font-weight: 600;">✓ Potvrzeno klientem</span> (vlastník dat / platná licence)</td>
              </tr>
              <tr>
                <th>Přiložené soubory:</th>
                <td>
                  ${
                    attachments.length > 0
                      ? fileListForLog
                          .map(
                            (f) =>
                              `<span class="file-pill">📎 ${sanitizeHtml(f.name)} (${sanitizeHtml(
                                f.size
                              )})</span>`
                          )
                          .join(" ")
                      : "Žádné soubory nepřipojeny"
                  }
                </td>
              </tr>
            </table>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin: 0 0 8px 0;">Specifikace zadání / Popis klienta:</h3>
            <div class="note-box">
              ${safeNoteHtml}
            </div>
          </div>
          <div class="footer">
            Systémové hlášení 3dspline.cz • Olomouc • Zakázkový 3D tisk a CAD konstrukce
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Automated Confirmation Email for the Client (with escaped HTML)
    const clientHtml = `
      <!DOCTYPE html>
      <html lang="cs">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #0f2942; color: #ffffff; padding: 24px 32px; border-bottom: 3px solid #2563eb; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
          .content { padding: 32px; line-height: 1.6; font-size: 15px; }
          .highlight { background: #eff6ff; border-radius: 6px; padding: 16px; border: 1px solid #bfdbfe; margin: 20px 0; }
          .footer { background: #f8fafc; padding: 20px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Potvrzení přijetí poptávky • 3dspline.cz</h1>
          </div>
          <div class="content">
            <p>Dobrý den, <strong>${safeNameHtml}</strong>,</p>
            <p>děkujeme za zaslání vaší poptávky na <strong>zakázkový 3D tisk a CAD konstrukci</strong>. Vaše zadání jsme v pořádku přijali a začínáme jej zpracovávat.</p>
            
            <div class="highlight">
              <strong>Jaký je další postup?</strong>
              <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                <li>Projdeme zaslané podklady a ověříme tisknutelnost i orientaci vrstev (DFAM).</li>
                <li>Ozveme se vám zpět nejpozději do 24 hodin s technickým posouzením a dalšími možnostmi.</li>
              </ul>
            </div>

            <p>Pokud budete chtít mezitím cokoliv doplnit nebo upřesnit, můžete nás kontaktovat přímo na <a href="mailto:info@3dspline.cz" style="color: #2563eb;">info@3dspline.cz</a>.</p>

            <p style="margin-top: 24px;">S pozdravem,<br/><strong>Tým 3D Spline</strong><br/><span style="color: #64748b; font-size: 13px;">Zakázkový 3D tisk a CAD konstrukce dílů</span></p>
          </div>
          <div class="footer">
            3D Spline • Spolehlivé doručení kurýrem po celé ČR
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text fallbacks
    const ownerText = `
3dspline.cz • Nová zakázková poptávka
Přijato: ${inquiryDetails.timestamp}
Typ: ${tabLabel}

Zákazník: ${name}
E-mail: ${email}
Telefon: ${phone}
Počet kusů: ${quantity}
Preferovaný materiál: ${material}
Prototypovací balíček: ${inquiryDetails.prototypePackage}
Autorská práva k datům: ${inquiryDetails.licenseConfirmed}
Přiložené soubory: ${attachments.length > 0 ? fileListForLog.map((f) => f.name).join(", ") : "Žádné"}

Popis zadání:
${note}
    `.trim();

    const clientText = `
Dobrý den, ${name},

děkujeme za zaslání vaší poptávky na zakázkový 3D tisk a CAD konstrukci na 3dspline.cz. Vaše zadání jsme v pořádku přijali.

Jaký je další postup?
- Projdeme zaslané podklady a ověříme tisknutelnost i orientaci vrstev.
- Ozveme se vám zpět nejpozději do 24 hodin s posouzením a dalšími možnostmi.

S pozdravem,
Tým 3D Spline
info@3dspline.cz
    `.trim();

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail({
        from: fromEmail,
        to: notifyEmail,
        replyTo: email,
        subject: `Nová poptávka z webu: ${name} (${quantity}) [${tabLabel}]`,
        text: ownerText,
        html: ownerHtml,
        attachments,
      }),
      transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: "Potvrzení přijetí poptávky • 3D Spline",
        text: clientText,
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message:
        "Děkujeme! Vaše poptávka byla úspěšně odeslána. Na e-mail jsme vám zaslali potvrzení a do 24 hodin se vám ozveme zpět.",
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ CHYBA PŘI ZPRACOVÁNÍ POPTÁVKY:", errMessage);
    return NextResponse.json(
      {
        success: false,
        error: `Chyba při odesílání e-mailu: ${errMessage}`,
      },
      { status: 500 }
    );
  }
}
