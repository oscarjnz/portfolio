// HTML + plain-text emails for the contact form. Two audiences: the owner
// (a working summary with a reply button) and the visitor (a short, human
// confirmation). Layout is table-based with inline styles because email
// clients ignore most modern CSS. Web fonts are not reliable in email, so the
// serif/sans stacks fall back to system fonts.

import type { Lang, Lead, Topic } from "./lead.js";

const SITE_URL = "https://osnarci.online";
const OWNER_NAME = "Oscar Jimenez";
const OWNER_EMAIL = "oscar@osnarci.online";

export const TOPIC_LABEL: Record<Lang, Record<Topic, string>> = {
  es: {
    project: "Un proyecto o desarrollo web",
    audit: "Una auditoría de seguridad",
    call: "Agendar una llamada",
    hello: "Solo saludar",
    other: "Otro motivo",
  },
  en: {
    project: "A project or web development",
    audit: "A security audit",
    call: "Schedule a call",
    hello: "Just saying hi",
    other: "Something else",
  },
};

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const multiline = (value: string): string => escapeHtml(value).replace(/\r?\n/g, "<br>");

// Colors mirror the site: near-black surface, soft borders, one cool accent.
const C = {
  page: "#0b0b0d",
  card: "#131316",
  border: "#26262b",
  text: "#f2f2f0",
  muted: "#9a9aa2",
  accent: "#c9d4ff",
};
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, 'Segoe UI', Inter, Helvetica, Arial, sans-serif";

interface Shell {
  preheader: string;
  title: string;
  body: string;
  footer: string;
  lang: Lang;
}

function shell({ preheader, title, body, footer, lang }: Shell): string {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr><td style="padding:0 4px 20px 4px;font-family:${SERIF};font-size:26px;font-style:italic;color:${C.text};letter-spacing:-0.01em;">
      ${OWNER_NAME}<span style="color:${C.accent};">.</span>
    </td></tr>
    <tr><td bgcolor="${C.card}" style="background:${C.card};border:1px solid ${C.border};border-radius:20px;padding:32px 28px;font-family:${SANS};color:${C.text};">
      ${body}
    </td></tr>
    <tr><td style="padding:20px 8px 0 8px;font-family:${SANS};font-size:12px;line-height:18px;color:${C.muted};text-align:center;">
      ${footer}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

const button = (href: string, label: string): string =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;"><tr><td bgcolor="${C.text}" style="background:${C.text};border-radius:999px;">
  <a href="${escapeHtml(href)}" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:14px;font-weight:600;color:#0b0b0d;text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a>
</td></tr></table>`;

const row = (label: string, valueHtml: string): string =>
  `<tr>
  <td valign="top" style="padding:10px 16px 10px 0;width:104px;font-family:${SANS};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${C.muted};border-top:1px solid ${C.border};">${escapeHtml(label)}</td>
  <td valign="top" style="padding:10px 0;font-family:${SANS};font-size:15px;line-height:22px;color:${C.text};border-top:1px solid ${C.border};">${valueHtml}</td>
</tr>`;

const messageBlock = (message: string): string =>
  `<div style="margin-top:6px;padding:16px 18px;background:${C.page};border:1px solid ${C.border};border-left:3px solid ${C.accent};border-radius:12px;font-family:${SANS};font-size:15px;line-height:24px;color:${C.text};">${multiline(message)}</div>`;

function formatDate(lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es-DO" : "en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Santo_Domingo",
  }).format(new Date());
}

export interface Rendered {
  subject: string;
  html: string;
  text: string;
}

// To the owner: who wrote, why, and a one-click way to answer.
export function renderOwnerEmail(lead: Lead): Rendered {
  const topic = TOPIC_LABEL[lead.lang][lead.topic];
  const full = `${lead.firstName} ${lead.lastName}`;
  const subject = `${lead.lang === "es" ? "Nuevo contacto" : "New contact"}: ${topic} · ${full}`;
  const replySubject = encodeURIComponent(
    lead.lang === "es" ? "Re: tu mensaje en osnarci.online" : "Re: your message on osnarci.online",
  );
  const L =
    lead.lang === "es"
      ? { h: "Alguien escribió desde el portafolio", name: "Nombre", mail: "Correo", phone: "Teléfono", why: "Motivo", lang: "Idioma", when: "Recibido", msg: "Mensaje", cta: `Responder a ${lead.firstName}`, none: "No indicó", langName: "Español", foot: "Este aviso se genera solo cuando alguien envía el formulario de osnarci.online." }
      : { h: "Someone wrote from the portfolio", name: "Name", mail: "Email", phone: "Phone", why: "Reason", lang: "Language", when: "Received", msg: "Message", cta: `Reply to ${lead.firstName}`, none: "Not provided", langName: "English", foot: "This notice is generated whenever someone submits the osnarci.online form." };

  const mailto = `mailto:${lead.email}?subject=${replySubject}`;
  const body = `
<p style="margin:0 0 6px 0;font-family:${SANS};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${C.accent};">${escapeHtml(topic)}</p>
<h1 style="margin:0 0 22px 0;font-family:${SERIF};font-weight:400;font-size:30px;line-height:34px;color:${C.text};">${escapeHtml(L.h)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  ${row(L.name, escapeHtml(full))}
  ${row(L.mail, `<a href="mailto:${escapeHtml(lead.email)}" style="color:${C.accent};text-decoration:none;">${escapeHtml(lead.email)}</a>`)}
  ${row(L.phone, lead.phone ? escapeHtml(lead.phone) : `<span style="color:${C.muted};">${L.none}</span>`)}
  ${row(L.why, escapeHtml(topic))}
  ${row(L.lang, L.langName)}
  ${row(L.when, escapeHtml(formatDate(lead.lang)))}
</table>
<p style="margin:24px 0 0 0;font-family:${SANS};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${C.muted};">${escapeHtml(L.msg)}</p>
${messageBlock(lead.message)}
${button(mailto, L.cta)}`;

  const text = [
    L.h,
    "",
    `${L.name}: ${full}`,
    `${L.mail}: ${lead.email}`,
    `${L.phone}: ${lead.phone || L.none}`,
    `${L.why}: ${topic}`,
    `${L.lang}: ${L.langName}`,
    "",
    `${L.msg}:`,
    lead.message,
    "",
    `${L.cta}: ${mailto}`,
  ].join("\n");

  return {
    subject,
    html: shell({ preheader: `${full}: ${lead.message.slice(0, 90)}`, title: subject, body, footer: escapeHtml(L.foot), lang: lead.lang }),
    text,
  };
}

// To the visitor: the message arrived, what happens next, what was saved.
export function renderVisitorEmail(lead: Lead): Rendered {
  const topic = TOPIC_LABEL[lead.lang][lead.topic];
  const es = lead.lang === "es";
  const subject = es ? `Tu mensaje llegó, ${lead.firstName}` : `Your message arrived, ${lead.firstName}`;
  const L = es
    ? {
        hi: `Hola, ${lead.firstName}`,
        p1: "Gracias por escribir. El mensaje llegó bien.",
        p2: "Oscar lo lee personalmente y te responde en cuanto pueda. Si es urgente, también se le puede escribir directo a",
        saved: "Esto fue lo que quedó registrado",
        why: "Motivo",
        cta: "Ver el portafolio",
        foot: `Recibes este correo porque llenaste el formulario de <a href="${SITE_URL}" style="color:${C.muted};">osnarci.online</a>. No hace falta responderlo, y los datos solo se usan para contestar tu mensaje.`,
      }
    : {
        hi: `Hi, ${lead.firstName}`,
        p1: "Thanks for writing. The message arrived safely.",
        p2: "Oscar reads each one personally and will reply as soon as he can. If it is urgent, he can also be reached directly at",
        saved: "Here is what was recorded",
        why: "Reason",
        cta: "Visit the portfolio",
        foot: `You are receiving this because you filled in the form at <a href="${SITE_URL}" style="color:${C.muted};">osnarci.online</a>. There is no need to reply, and your details are only used to answer your message.`,
      };

  const body = `
<h1 style="margin:0 0 16px 0;font-family:${SERIF};font-weight:400;font-size:32px;line-height:36px;color:${C.text};">${escapeHtml(L.hi)}</h1>
<p style="margin:0 0 12px 0;font-family:${SANS};font-size:16px;line-height:26px;color:${C.text};">${escapeHtml(L.p1)}</p>
<p style="margin:0 0 26px 0;font-family:${SANS};font-size:16px;line-height:26px;color:${C.muted};">${escapeHtml(L.p2)} <a href="mailto:${OWNER_EMAIL}" style="color:${C.accent};text-decoration:none;">${OWNER_EMAIL}</a>.</p>
<p style="margin:0;font-family:${SANS};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${C.muted};">${escapeHtml(L.saved)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
  ${row(L.why, escapeHtml(topic))}
</table>
${messageBlock(lead.message)}
${button(SITE_URL, L.cta)}`;

  const text = [
    L.hi,
    "",
    L.p1,
    `${L.p2} ${OWNER_EMAIL}.`,
    "",
    `${L.saved}:`,
    `${L.why}: ${topic}`,
    lead.message,
    "",
    SITE_URL,
  ].join("\n");

  return {
    subject,
    html: shell({ preheader: L.p1, title: subject, body, footer: L.foot, lang: lead.lang }),
    text,
  };
}
