// Podoba e-mailů z poptávkového formuláře: zpráva pro mě a potvrzení pro zákazníka.
// Styly jsou přímo u prvků a rozložení stojí na tabulkách, protože poštovní programy jiné CSS často zahazují.

export interface InquiryEmailData {
  /** Nepovinné – prázdný řetězec, když ho zákazník nevyplní */
  name: string;
  email: string;
  quantity: string;
  material: string;
  color: string;
  hasModel: boolean;
  prototypePackage: boolean;
  licenseConfirmed: boolean;
  files: Array<{ name: string; size: string }>;
  modelUrl: string;
  note: string;
  timestamp: string;
}

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

interface Row {
  label: string;
  value: string;
  /** Vyplní se jen u odkazu, na který se dá bezpečně kliknout */
  href?: string;
}

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const NAVY = "#0F1E2E";
const BLUE = "#2563EB";
const INK = "#0F172A";
const MUTED = "#64748B";
const LINE = "#E2E8F0";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Pořadí je v obou e-mailech stejné a všechny řádky jsou vidět vždy
function summaryRows(data: InquiryEmailData): Row[] {
  return [
    { label: "Počet kusů", value: data.quantity || "neuvedeno" },
    { label: "Materiál", value: data.material || "neuvedeno" },
    { label: "Barva", value: data.color || "neuvedena" },
    { label: "3D model", value: data.hasModel ? "má hotový model" : "nemá model" },
    { label: "Zkušební kus", value: data.prototypePackage ? "ano, před sérií" : "ne" },
    { label: "Práva k podkladům", value: data.licenseConfirmed ? "potvrzena" : "nevyžadováno" },
    {
      label: "Přílohy",
      value: data.files.length
        ? data.files.map((f) => `${f.name} (${f.size})`).join("\n")
        : "žádné",
    },
    {
      label: "Odkaz na model",
      value: data.modelUrl || "neuvedeno",
      href: /^https?:\/\//i.test(data.modelUrl) ? data.modelUrl : undefined,
    },
  ];
}

function rowsHtml(rows: Row[], clickableLinks: boolean): string {
  return rows
    .map(({ label, value, href }) => {
      const safe = escapeHtml(value).replace(/\n/g, "<br>");
      const content =
        href && clickableLinks
          ? `<a href="${escapeHtml(href)}" style="color:${BLUE};">${safe}</a>`
          : safe;
      return `<tr>
<td valign="top" style="width:38%;padding:10px 12px 10px 0;border-bottom:1px solid ${LINE};font-size:13px;color:${MUTED};">${label}</td>
<td valign="top" style="padding:10px 0;border-bottom:1px solid ${LINE};font-size:15px;font-weight:600;color:${INK};word-break:break-word;">${content}</td>
</tr>`;
    })
    .join("\n");
}

function noteHtml(note: string): string {
  return `<p style="margin:24px 0 8px 0;font-size:13px;color:${MUTED};">Popis</p>
<div style="border-left:3px solid ${BLUE};padding:2px 0 2px 14px;font-size:15px;line-height:1.6;color:${INK};word-break:break-word;">${escapeHtml(note).replace(/\n/g, "<br>")}</div>`;
}

function layout(header: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:${FONT};color:${INK};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;">
<tr><td align="center" style="padding:16px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;">
<tr><td style="background:${NAVY};border-bottom:3px solid ${BLUE};padding:24px;">${header}</td></tr>
<tr><td style="padding:20px 24px 28px 24px;">${body}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function summaryText(rows: Row[], note: string): string {
  const lines = rows.map((r) => `${r.label}: ${r.value.replace(/\n/g, ", ")}`);
  return `${lines.join("\n")}\n\nPopis:\n${note}`;
}

export function buildOwnerEmail(data: InquiryEmailData): EmailContent {
  const rows = summaryRows(data);
  // Zalomení řádku v předmětu nemá co dělat
  const sender = (data.name || data.email).replace(/\s+/g, " ");

  const header = `<div style="font-size:26px;line-height:1.2;font-weight:700;color:#FFFFFF;">Nová zakázka</div>
<div style="margin-top:12px;font-size:16px;color:#FFFFFF;">od: ${data.name ? `<strong>${escapeHtml(data.name)}</strong><br>` : ""}<a href="mailto:${escapeHtml(data.email)}" style="color:#93C5FD;text-decoration:none;">${escapeHtml(data.email)}</a></div>`;

  const body = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rowsHtml(rows, true)}
</table>
${noteHtml(data.note)}
<p style="margin:24px 0 0 0;font-size:12px;color:${MUTED};">Odesláno z webu ${escapeHtml(data.timestamp)}. Odpověď na tento e-mail půjde přímo zákazníkovi.</p>`;

  const from = data.name ? `od: ${data.name}\n${data.email}` : `od: ${data.email}`;

  return {
    subject: `Nová zakázka: ${sender}`,
    html: layout(header, body),
    text: `NOVÁ ZAKÁZKA\n${from}\n\n${summaryText(rows, data.note)}\n\nOdesláno z webu ${data.timestamp}.`,
  };
}

export function buildClientEmail(data: InquiryEmailData, founderName: string): EmailContent {
  const rows = summaryRows(data).map((row) =>
    // V mailu pro zákazníka mluvíme přímo k němu
    row.label === "3D model" ? { ...row, value: data.hasModel ? "mám hotový model" : "nemám model" } : row
  );
  const received = "vaše poptávka byla úspěšně přijata. Ve všední dny se vám ozvu do 24 hodin.";
  const reply = "Pokud chcete něco doplnit, stačí na tento e-mail odpovědět.";

  const header = `<div style="font-size:22px;line-height:1.3;font-weight:700;color:#FFFFFF;">Poptávka přijata</div>
<div style="margin-top:6px;font-size:14px;color:#CBD5E1;">3D Spline</div>`;

  const body = `<p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;">Dobrý den,</p>
<p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;">${received}</p>
<p style="margin:0 0 4px 0;font-size:16px;font-weight:700;">Shrnutí vaší poptávky</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rowsHtml(rows, false)}
</table>
${noteHtml(data.note)}
<p style="margin:24px 0 0 0;font-size:15px;line-height:1.6;">${reply}</p>
<p style="margin:20px 0 0 0;font-size:15px;line-height:1.6;"><strong>${escapeHtml(founderName)}</strong><br>3D Spline<br><a href="mailto:info@3dspline.cz" style="color:${BLUE};">info@3dspline.cz</a></p>`;

  return {
    subject: "Potvrzení přijetí poptávky • 3D Spline",
    html: layout(header, body),
    text: `Dobrý den,\n\n${received}\n\nShrnutí vaší poptávky\n\n${summaryText(rows, data.note)}\n\n${reply}\n\n${founderName}\n3D Spline\ninfo@3dspline.cz`,
  };
}
