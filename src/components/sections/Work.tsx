import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { cn } from "@/utils/cn";
import SectionHeader from "@/components/ui/SectionHeader";

// Column spans alternate for a bento rhythm: flagship wide, then 5/7/12.
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

export default function Work() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.work.eyebrow}
          heading={t.work.heading}
          headingItalic={t.work.headingItalic}
          subtext={t.work.subtext}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              span={SPANS[i % SPANS.length]}
              index={i}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  span,
  index,
  onOpen,
}: {
  project: Project;
  span: string;
  index: number;
  onOpen: () => void;
}) {
  const { t, lang } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onClick={onOpen}
      className={cn(
        "group relative col-span-1 overflow-hidden rounded-3xl border border-stroke bg-surface text-left",
        span,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Halftone overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
        {/* Hover veil */}
        <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
          <span className="relative rounded-full">
            <span className="animated-gradient-border absolute inset-[-2px] rounded-full" />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm text-black">
              {t.work.viewProject} ·{" "}
              <span className="font-display italic">{project.title}</span>
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          {project.flagship && (
            <span className="accent-gradient-text mb-2 block text-xs font-medium uppercase tracking-wider">
              {t.work.flagship}
            </span>
          )}
          <h3 className="text-xl text-text-primary">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.tagline[lang]}</p>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-text-primary" />
      </div>
    </motion.button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t, lang } = useLanguage();
  const images = project.gallery ?? [project.image];
  const [activeImg, setActiveImg] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

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
        aria-label={project.title}
        tabIndex={-1}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-stroke bg-surface focus:outline-none"
      >
        <button
          onClick={onClose}
          aria-label={lang === "es" ? "Cerrar" : "Close"}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-stroke bg-bg/80 text-muted backdrop-blur transition-colors hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl bg-bg">
          <img
            src={images[activeImg]}
            alt={project.title}
            className="h-full w-full object-cover object-top"
          />
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 px-6 pt-4">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-colors",
                  activeImg === i ? "border-white/60" : "border-stroke",
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="mb-3 flex items-center gap-3">
            <h3 className="font-display text-3xl italic text-text-primary">
              {project.title}
            </h3>
            <span className="rounded-full border border-stroke px-2 py-0.5 text-[11px] uppercase tracking-wider text-muted">
              {project.year}
            </span>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-muted md:text-base">
            {project.description[lang]}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex rounded-full"
          >
            <span className="animated-gradient-border absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm text-bg">
              {t.work.visitSite}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
