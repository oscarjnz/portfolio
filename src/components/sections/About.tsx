import { Fragment } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { aboutParagraphs, stats } from "@/data/about";
import { ACADEMIC_STATUS_CONTENT } from "@/data/academicStatus";
import { getAcademicStatus } from "@/utils/academicTerm";
import { SITE } from "@/utils/constants";
import SectionHeader from "@/components/ui/SectionHeader";

const UNIBE_URL = "https://unibe.edu.do";

// Render a paragraph, turning any "UNIBE" mention into a link.
function renderParagraph(text: string) {
  return text.split("UNIBE").map((part, i, parts) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href={UNIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors hover:decoration-current"
        >
          UNIBE
        </a>
      )}
    </Fragment>
  ));
}

export default function About() {
  const { t, lang } = useLanguage();
  const statusContent = ACADEMIC_STATUS_CONTENT[getAcademicStatus()];
  const paragraphs = [statusContent.aboutIntro, ...aboutParagraphs];

  return (
    <section id="about" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.about.eyebrow}
          heading={t.about.heading}
          headingItalic={t.about.headingItalic}
          subtext={statusContent.aboutSubtext[lang]}
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative self-start"
          >
            <div className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-b from-surface to-bg">
              {/* Subtle accent glow */}
              <div className="pointer-events-none absolute -left-1/4 top-0 h-1/2 w-3/4 rounded-full bg-[#4E85BF]/10 blur-3xl" />
              <img
                src="/images/about/profile.webp"
                alt={
                  lang === "es"
                    ? `Foto de perfil de ${SITE.name}`
                    : `Profile photo of ${SITE.name}`
                }
                loading="lazy"
                className="relative z-10 w-full object-contain"
              />
              {/* Bottom fade + name tag */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-gradient-to-t from-bg via-bg/70 to-transparent p-5 pt-12">
                <div>
                  <p className="font-display text-xl italic text-text-primary">
                    {SITE.name}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    @{SITE.handle.toLowerCase()}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green-400" />
                  {SITE.location[lang].split(",")[0]}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio + stats */}
          <div>
            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {renderParagraph(p[lang])}
                </motion.p>
              ))}
            </div>

            {/* Mobile: one joined card with three divided columns. sm and up: three separate cards. */}
            <div className="mt-10 grid grid-cols-3 divide-x divide-stroke overflow-hidden rounded-2xl border border-stroke bg-surface/40 sm:gap-4 sm:divide-x-0 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex min-w-0 flex-col items-center justify-start px-2 py-5 text-center sm:items-start sm:rounded-2xl sm:border sm:border-stroke sm:bg-surface/40 sm:p-5 sm:text-left"
                >
                  <div className="font-display text-3xl italic leading-none text-text-primary sm:text-4xl md:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-balance text-[10px] uppercase leading-snug tracking-wide text-muted sm:mt-1 sm:text-xs sm:tracking-wider">
                    {s.label[lang]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
