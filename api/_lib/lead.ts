// Lead shape and server-side validation for the contact form. The client does
// its own checks for UX; this is the only validation that counts.

export const TOPICS = ["project", "audit", "call", "hello", "other"] as const;
export type Topic = (typeof TOPICS)[number];
export type Lang = "es" | "en";

export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: Topic;
  message: string;
  lang: Lang;
}

export type FieldErrors = Partial<Record<keyof Lead, string>>;

export const LIMITS = {
  name: 60,
  email: 120,
  phone: 30,
  messageMin: 10,
  message: 3000,
} as const;

// Pragmatic email check: one @, a dot in the domain, no whitespace. Real
// deliverability is Resend's problem, not a regex's.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/;

const clean = (value: unknown, max: number): string =>
  typeof value === "string"
    ? // strip control characters (keeps \n and \t inside the message later)
      value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max)
    : "";

// Names and emails must never carry line breaks (header injection, log
// forging). Messages may.
const oneLine = (value: string) => value.replace(/[\r\n\t]+/g, " ").trim();

export function parseLead(
  input: unknown,
): { ok: true; lead: Lead } | { ok: false; errors: FieldErrors } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const firstName = oneLine(clean(raw.firstName, LIMITS.name));
  const lastName = oneLine(clean(raw.lastName, LIMITS.name));
  const email = oneLine(clean(raw.email, LIMITS.email)).toLowerCase();
  const phone = oneLine(clean(raw.phone, LIMITS.phone));
  const message = clean(raw.message, LIMITS.message);
  const topic = TOPICS.includes(raw.topic as Topic) ? (raw.topic as Topic) : null;
  const lang: Lang = raw.lang === "en" ? "en" : "es";

  if (!firstName) errors.firstName = "required";
  if (!lastName) errors.lastName = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalid";
  if (phone && !PHONE_RE.test(phone)) errors.phone = "invalid";
  if (!topic) errors.topic = "required";
  if (!message) errors.message = "required";
  else if (message.length < LIMITS.messageMin) errors.message = "short";

  if (Object.keys(errors).length > 0 || !topic) return { ok: false, errors };
  return { ok: true, lead: { firstName, lastName, email, phone, topic, message, lang } };
}
