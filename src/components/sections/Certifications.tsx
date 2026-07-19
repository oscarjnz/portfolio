import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/data/types";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Certifications() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Certification | null>(null);
  const tier1 = certifications.filter((c) => c.tier === 1);
  const withImage = certifications.filter((c) => c.tier !== 1 && c.image);
  const textOnly = certifications.filter((c) => c.tier !== 1 && !c.image);

  return (
    <section id="certifications" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.certifications.eyebrow}
          heading={t.certifications.heading}
          headingItalic={t.certifications.headingItalic}
          subtext={t.certifications.subtext}
        />

        {/* Tier 1: feature cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tier1.map((cert, i) => (
            <FeatureCard
              key={cert.id}
              cert={cert}
              index={i}
              onOpen={() => setSelected(cert)}
            />
          ))}
        </div>

        {/* Tier 2 with image: compact thumbnail grid */}
        {withImage.length > 0 && (
          <>
            <h3 className="mb-5 mt-14 text-xs uppercase tracking-[0.2em] text-muted">
              {t.certifications.more}
            </h3>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {withImage.map((cert, i) => (
                <ThumbCard
                  key={cert.id}
                  cert={cert}
                  index={i}
                  onOpen={() => setSelected(cert)}
                />
              ))}
            </div>
          </>
        )}

        {/* Text-only: compact pills */}
        <div className="mt-6 flex flex-wrap gap-3">
          {textOnly.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/40 px-4 py-2"
            >
              <Award className="h-4 w-4 text-muted" strokeWidth={1.5} />
              <span className="text-sm text-text-primary/90">{cert.title}</span>
              <span className="text-xs text-muted">· {cert.issuer}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <CertificateModal
            cert={selected}
            verify={t.certifications.verify}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function FeatureCard({
  cert,
  index,
  onOpen,
}: {
  cert: Certification;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-stroke bg-surface/40 text-left transition-colors hover:border-white/20"
    >
      {cert.image ? (
        <div className="aspect-[4/3] overflow-hidden border-b border-stroke bg-white">
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center border-b border-stroke bg-gradient-to-br from-surface to-bg">
          <ShieldCheck className="h-14 w-14 text-text-primary/30" strokeWidth={1} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-medium leading-snug text-text-primary">
          {cert.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-[11px] uppercase tracking-wider text-muted">
            {formatDate(cert.date)}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-text-primary/0 transition-colors group-hover:text-text-primary/70">
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function ThumbCard({
  cert,
  index,
  onOpen,
}: {
  cert: Certification;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group overflow-hidden rounded-2xl border border-stroke bg-surface/40 text-left transition-colors hover:border-white/20"
    >
      <div className="aspect-[4/3] overflow-hidden border-b border-stroke bg-white">
        <img
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h4 className="text-xs font-medium leading-snug text-text-primary">
          {cert.title}
        </h4>
        <p className="mt-1 text-[11px] text-muted">{cert.issuer}</p>
      </div>
    </motion.button>
  );
}

function CertificateModal({
  cert,
  verify,
  onClose,
}: {
  cert: Certification;
  verify: string;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const displayImage = cert.certificateImage ?? cert.image;

  // Modal a11y: Escape to close, focus trap, scroll lock, focus restore.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
        tabIndex={-1}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-stroke bg-surface focus:outline-none"
      >
        <button
          onClick={onClose}
          aria-label={lang === "es" ? "Cerrar" : "Close"}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-stroke bg-bg/80 text-muted backdrop-blur transition-colors hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        {displayImage ? (
          <div className="flex items-center justify-center border-b border-stroke bg-white p-6">
            <img
              src={displayImage}
              alt={cert.title}
              className="max-h-[50vh] w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center border-b border-stroke bg-gradient-to-br from-surface to-bg">
            <ShieldCheck className="h-16 w-16 text-text-primary/30" strokeWidth={1} />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h3 className="text-lg font-medium leading-snug text-text-primary">
            {cert.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {cert.issuer} · {formatDate(cert.date)}
          </p>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-6 inline-flex rounded-full"
            >
              <span className="animated-gradient-border absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-sm text-bg">
                {verify}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return month ? `${months[Number(month) - 1]} ${year}` : year;
}
