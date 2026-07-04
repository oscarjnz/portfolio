import { motion } from "framer-motion";
import { Trophy, BarChart3, Dumbbell, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { beyondHighlights, beyondNote } from "@/data/beyond";
import SectionHeader from "@/components/ui/SectionHeader";

const ICONS: Record<string, LucideIcon> = { Trophy, BarChart3, Dumbbell };

export default function Beyond() {
  const { t, lang } = useLanguage();

  return (
    <section id="beyond" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.beyond.eyebrow}
          heading={t.beyond.heading}
          headingItalic={t.beyond.headingItalic}
          subtext={t.beyond.subtext}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {beyondHighlights.map((h, i) => {
            const Icon = ICONS[h.icon] ?? Trophy;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-stroke bg-surface/40 p-7"
              >
                {/* Accent glow on hover */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#4E85BF]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
                <Icon
                  className="mb-5 h-6 w-6 text-text-primary/70"
                  strokeWidth={1.5}
                />
                <div className="font-display text-5xl italic text-text-primary">
                  {h.value}
                </div>
                <div className="mt-2 text-sm text-muted">{h.label[lang]}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 rounded-3xl border border-stroke bg-gradient-to-br from-surface/60 to-bg p-8 md:p-10"
        >
          <p className="max-w-3xl font-display text-2xl italic leading-snug text-text-primary/90 md:text-3xl">
            "{beyondNote[lang]}"
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
