import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { aboutParagraphs, stats } from "@/data/about";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="about"
      className="bg-bg py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.about.eyebrow}
          heading={t.about.heading}
          headingItalic={t.about.headingItalic}
          subtext={t.about.subtext}
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Bio */}
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 self-start">
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
    </section>
  );
}
