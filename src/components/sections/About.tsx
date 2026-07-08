import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { aboutParagraphs, stats } from "@/data/about";
import { SITE } from "@/utils/constants";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.about.eyebrow}
          heading={t.about.heading}
          headingItalic={t.about.headingItalic}
          subtext={t.about.subtext}
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
                alt={SITE.name}
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
              {aboutParagraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {p[lang]}
                </motion.p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="rounded-2xl border border-stroke bg-surface/40 p-5"
                >
                  <div className="font-display text-4xl italic text-text-primary md:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted">
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
