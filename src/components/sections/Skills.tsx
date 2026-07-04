import { motion } from "framer-motion";
import {
  ShieldCheck,
  LayoutTemplate,
  Server,
  Sparkles,
  Cloud,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  LayoutTemplate,
  Server,
  Sparkles,
  Cloud,
  Gauge,
};

export default function Skills() {
  const { t, lang } = useLanguage();

  return (
    <section id="skills" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.skills.eyebrow}
          heading={t.skills.heading}
          headingItalic={t.skills.headingItalic}
          subtext={t.skills.subtext}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = ICONS[cat.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group rounded-3xl border border-stroke bg-surface/40 p-6 transition-colors hover:border-white/20"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-stroke bg-bg">
                  <Icon className="h-5 w-5 text-text-primary/80" strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 text-lg text-text-primary">
                  {cat.name[lang]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-muted transition-colors group-hover:text-text-primary/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
