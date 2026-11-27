import { NextRequest, NextResponse } from "next/server";
import { acceptingInquiries, company, informativeNotice } from "@/lib/company";
import { buildClientEmail, buildOwnerEmail, type InquiryEmailData } from "@/lib/inquiryEmails";

// E-maily posíláme přes HTTP API Resendu – SMTP (Nodemailer) na Cloudflare Workers nefunguje.
// https://resend.com/docs/api-reference/emails/send-email
interface ResendEmail {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
  attachments?: Array<{ filename: string; content: string; content_type?: string }>;
}

async function sendWithResend(apiKey: string, email: ResendEmail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend API ${res.status}: ${detail.slice(0, 500)}`);
  }
}

// Maximum total payload size: 4 MB (serverless-safe limit)
const MAX_TOTAL_SIZE = 4 * 1024 * 1024;

// Obecná hláška pro zákazníka – technické detaily chyby patří jen do logu
const SEND_FAILED_ERROR =
  "Poptávku se teď nepodařilo odeslat. Zkuste to prosím za chvíli znovu, nebo mi napište přímo na info@3dspline.cz.";

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

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
// Čištění vstupů
// -------------------------------------------------------------
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
  // Zablokovaný formulář v prohlížeči nestačí, poptávka se nesmí dát poslat ani přímo na API
  if (!acceptingInquiries) {
    return NextResponse.json({ success: false, error: informativeNotice }, { status: 503 });
  }

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

    // 1b. HONEYPOT ANTI-SPAM CHECK
    const honeypot = (formData.get("website") as string) || "";
    if (honeypot.trim().length > 0) {
      console.warn(`🤖 Zablokován spam bot (honeypot vyplněn) z IP: ${clientIp}`);
      return NextResponse.json({
        success: true,
        message:
          "Děkuji! Poptávka dorazila v pořádku. Ve všední dny se ozvu do 24 hodin.",
      });
    }

    // 2. INPUT SANITIZATION & LENGTH LIMITS
    const rawTab = (formData.get("tab") as string) || "drawing";
    const tab = rawTab === "model" ? "model" : "drawing";

    const name = sanitizeText((formData.get("name") as string) || "", 120);
    const email = sanitizeText((formData.get("email") as string) || "", 120).toLowerCase();
    const quantity = sanitizeText((formData.get("quantity") as string) || "", 100) || "Neuvedeno";
    const rawMaterial = sanitizeText((formData.get("material") as string) || "", 100);
    const material = rawMaterial || "Nechám si poradit";
    const rawColor = sanitizeText((formData.get("color") as string) || "", 100);
    const color = rawColor; // bez předvolby – v e-mailu se pak ukáže „neuvedena“
    const modelUrl = sanitizeText((formData.get("modelUrl") as string) || "", 500);

    const prototypePackage =
      formData.get("prototypePackage") === "true" || formData.get("sampleApproval") === "true";

    const licenseConfirmed =
      formData.get("licenseConfirmed") === "true" || formData.get("licenseConfirmed") === "on";

    const note = sanitizeText((formData.get("note") as string) || "", 4000) || "Bez další poznámky";

    // 3. VALIDATION
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Váš e-mail je povinné pole." },
        { status: 400 }
      );
    }

    if (!note || note === "Bez další poznámky") {
      return NextResponse.json(
        { success: false, error: "Podrobný popis je povinné pole." },
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
      content: string; // base64
      content_type: string;
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
              error:
                "Celková velikost přiložených souborů přesahuje limit 4 MB. Větší soubory mi prosím pošlete přímo na e-mail info@3dspline.cz.",
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
          content: buffer.toString("base64"),
          content_type: entry.type || "application/octet-stream",
        });

        const sizeKb = (entry.size / 1024).toFixed(1);
        fileListForLog.push({
          name: safeFilename,
          size: `${sizeKb} KB`,
        });
      }
    }

    // Licenci je nutné potvrdit jen u dodaných dat (3D model, přílohy nebo odkaz)
    const licenseRequired = tab === "model" || attachments.length > 0 || modelUrl.length > 0;
    if (licenseRequired && !licenseConfirmed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Pro odeslání prosím potvrďte, že disponujete autorskými právy nebo licencí k dodaným podkladům.",
        },
        { status: 400 }
      );
    }

    const tabLabel =
      tab === "model"
        ? "Mám hotový 3D model (.STEP, .STL, .3MF)"
        : "Nemám 3D model (výkres, náčrt, poškozený díl)";

    const inquiryDetails = {
      tab: tabLabel,
      name,
      email,
      quantity,
      material,
      color,
      prototypePackage: prototypePackage
        ? "ANO (požadován Prototypovací balíček / zkušební vzorek před sérií)"
        : "NE (rovnou výroba dle zadání)",
      licenseConfirmed: licenseConfirmed
        ? "ANO (klient potvrdil vlastnictví práv či komerční licenci k modelu)"
        : "NEVYŽADOVÁNO (bez modelu, příloh i odkazu)",
      modelUrl: modelUrl || "Neuvedeno",
      note,
      filesCount: attachments.length,
      fileList: fileListForLog,
      timestamp: new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" }),
      ip: clientIp,
    };

    console.log("==================================================");
    console.log("📥 PŘIJATA NOVÁ POPTÁVKA (3dspline.cz):", inquiryDetails);
    console.log("==================================================");

    // Konfigurace odesílání (Resend)
    const resendApiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL || "info@3dspline.cz";
    const fromEmail = process.env.FROM_EMAIL || "3dspline.cz Poptávky <info@3dspline.cz>";

    if (!resendApiKey) {
      // V produkci by se poptávka bez odesílání tiše ztratila – zákazníkovi proto vrátíme chybu
      if (process.env.NODE_ENV === "production") {
        console.error(
          "❌ RESEND_API_KEY není nastavený – poptávku nelze doručit e-mailem. Údaje poptávky jsou výše v logu."
        );
        return NextResponse.json({ success: false, error: SEND_FAILED_ERROR }, { status: 503 });
      }

      console.log(
        "ℹ️ RESEND_API_KEY není nastavený (lokální vývoj) – e-maily se neodesílají, poptávka je jen vypsaná v konzoli."
      );
      return NextResponse.json({
        success: true,
        message:
          "Děkuji! Poptávka dorazila v pořádku. Ve všední dny se ozvu do 24 hodin.",
        simulated: true,
      });
    }

    // 5. E-MAILY
    const emailData: InquiryEmailData = {
      name,
      email,
      quantity,
      material,
      color,
      hasModel: tab === "model",
      prototypePackage,
      licenseConfirmed,
      files: fileListForLog,
      modelUrl,
      note,
      timestamp: inquiryDetails.timestamp,
    };
    const ownerEmail = buildOwnerEmail(emailData);
    const clientEmail = buildClientEmail(emailData, company.founderName);

    // E-mail majiteli je kritický – bez něj poptávka nikam nedorazí, proto při chybě vracíme chybu
    try {
      await sendWithResend(resendApiKey, {
        from: fromEmail,
        to: notifyEmail,
        reply_to: email,
        ...ownerEmail,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    } catch (error: unknown) {
      console.error("❌ Poptávku se nepodařilo odeslat (údaje jsou výše v logu):", describeError(error));
      return NextResponse.json({ success: false, error: SEND_FAILED_ERROR }, { status: 502 });
    }

    // Nepodařené potvrzení (např. překlep v adrese) nesmí z již doručené poptávky udělat chybu,
    // jinak ji zákazník odešle znovu a vzniknou duplicity
    let confirmationSent = true;
    try {
      await sendWithResend(resendApiKey, {
        from: fromEmail,
        to: email,
        reply_to: notifyEmail,
        ...clientEmail,
      });
    } catch (error: unknown) {
      confirmationSent = false;
      console.warn(`⚠️ Potvrzení zákazníkovi (${email}) se nepodařilo odeslat:`, describeError(error));
    }

    return NextResponse.json({
      success: true,
      message: confirmationSent
        ? "Děkuji! Poptávka je odeslaná. Na e-mail jsem vám poslal potvrzení. Ve všední dny se ozvu do 24 hodin."
        : "Děkuji! Poptávka je odeslaná, ale potvrzení na váš e-mail se nepodařilo doručit. Zkontrolujte prosím, že je adresa správná. Ve všední dny se ozvu do 24 hodin.",
    });
  } catch (error: unknown) {
    console.error("❌ CHYBA PŘI ZPRACOVÁNÍ POPTÁVKY:", describeError(error));
    return NextResponse.json({ success: false, error: SEND_FAILED_ERROR }, { status: 500 });
  }
}
