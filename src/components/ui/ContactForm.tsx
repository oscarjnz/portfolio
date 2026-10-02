import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE } from "@/utils/constants";
import { cn } from "@/utils/cn";

const TOPICS = ["project", "audit", "call", "hello", "other"] as const;
type Topic = (typeof TOPICS)[number];

// Mirrors api/_lib/lead.ts. The server is the real gate; this only keeps people
// from a round trip for an obvious typo.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,30}$/;
const MESSAGE_MIN = 10;

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: Topic | "";
  message: string;
}
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error" | "limited";

const EMPTY: Values = { firstName: "", lastName: "", email: "", phone: "", topic: "", message: "" };

const fieldClass =
  "w-full rounded-xl border bg-surface/40 px-4 py-3 text-sm text-text-primary placeholder:text-muted/60 transition-colors focus:border-white/30 focus:bg-surface/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20";

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const f = t.contact.form;

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");
  const [honeypot, setHoneypot] = useState("");
  // When the form first rendered: a human takes seconds, a bot takes none.
  const mountedAt = useRef(Date.now());

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.firstName.trim()) next.firstName = f.errorRequired;
    if (!values.lastName.trim()) next.lastName = f.errorRequired;
    if (!values.email.trim()) next.email = f.errorRequired;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.errorEmail;
    if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) next.phone = f.errorPhone;
    if (!values.topic) next.topic = f.errorRequired;
    if (!values.message.trim()) next.message = f.errorRequired;
    else if (values.message.trim().length < MESSAGE_MIN) next.message = f.errorShort;
    return next;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users land on it.
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          lang,
          website: honeypot,
          elapsed: Date.now() - mountedAt.current,
        }),
      });
      if (response.status === 429) {
        setStatus("limited");
        return;
      }
      const payload = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || !payload?.ok) {
        setStatus("error");
        return;
      }
      setSentTo(values.email.trim());
      setValues(EMPTY);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-stroke bg-surface/40 p-8 text-center md:p-10"
      >
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-stroke bg-bg text-green-400">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-5 font-display text-3xl italic text-text-primary">{f.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">{f.successBody}</p>
        <p className="mt-1 break-all text-sm text-text-primary">{sentTo}</p>
        <button
          type="button"
          onClick={() => {
            mountedAt.current = Date.now();
            setStatus("idle");
          }}
          className="mt-7 rounded-full border border-stroke px-6 py-2.5 text-sm text-text-primary transition-colors hover:border-white/25 hover:bg-surface/70"
        >
          {f.another}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-3xl border border-stroke bg-surface/30 p-6 text-left backdrop-blur-sm md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-firstName" label={f.firstName} error={errors.firstName}>
          <input
            id="cf-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={60}
            value={values.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "cf-firstName-err" : undefined}
            className={cn(fieldClass, errors.firstName ? "border-red-400/60" : "border-stroke")}
          />
        </Field>
        <Field id="cf-lastName" label={f.lastName} error={errors.lastName}>
          <input
            id="cf-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={60}
            value={values.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "cf-lastName-err" : undefined}
            className={cn(fieldClass, errors.lastName ? "border-red-400/60" : "border-stroke")}
          />
        </Field>
        <Field id="cf-email" label={f.email} error={errors.email}>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={120}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            className={cn(fieldClass, errors.email ? "border-red-400/60" : "border-stroke")}
          />
        </Field>
        <Field id="cf-phone" label={f.phone} error={errors.phone}>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "cf-phone-err" : undefined}
            className={cn(fieldClass, errors.phone ? "border-red-400/60" : "border-stroke")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="cf-topic" label={f.topic} error={errors.topic}>
          <div className="relative">
            <select
              id="cf-topic"
              name="topic"
              value={values.topic}
              onChange={(e) => set("topic", e.target.value as Topic | "")}
              aria-invalid={!!errors.topic}
              aria-describedby={errors.topic ? "cf-topic-err" : undefined}
              className={cn(
                fieldClass,
                "appearance-none pr-10",
                values.topic === "" && "text-muted/60",
                errors.topic ? "border-red-400/60" : "border-stroke",
              )}
            >
              <option value="" disabled>
                {f.topicPlaceholder}
              </option>
              {TOPICS.map((topic) => (
                <option key={topic} value={topic} className="bg-bg text-text-primary">
                  {f.topics[topic]}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
          </div>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="cf-message" label={f.message} error={errors.message}>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            maxLength={3000}
            placeholder={f.messagePlaceholder}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cf-message-err" : undefined}
            className={cn(fieldClass, "resize-y leading-relaxed", errors.message ? "border-red-400/60" : "border-stroke")}
          />
        </Field>
      </div>

      {/* Honeypot: invisible to people and to assistive tech, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{f.privacy}</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex shrink-0 rounded-full disabled:cursor-wait disabled:opacity-70"
        >
          <span className="animated-gradient-border absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg">
            {status === "sending" ? `${f.sending}…` : f.submit}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>
      </div>

      <div aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm">
        {status === "error" && (
          <p className="text-red-300">
            {f.errorSend}{" "}
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
              {SITE.email}
            </a>
            .
          </p>
        )}
        {status === "limited" && <p className="text-red-300">{f.errorLimit}</p>}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
