import { motion } from "framer-motion";
import { Briefcase, GraduationCap, HeartHandshake, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/data/types";
import SectionHeader from "@/components/ui/SectionHeader";

const TYPE_ICON: Record<ExperienceItem["type"], LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  volunteer: HeartHandshake,
};

export default function Experience() {
  const { t, lang } = useLanguage();

  return (
    <section id="experience" className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[900px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.experience.eyebrow}
          heading={t.experience.heading}
          headingItalic={t.experience.headingItalic}
          subtext={t.experience.subtext}
        />

        <div className="relative">
          {/* Vertical line */}
          <span className="absolute left-[19px] top-2 h-full w-px bg-stroke md:left-[23px]" />

          <div className="space-y-10">
            {experience.map((item, i) => {
              const Icon = TYPE_ICON[item.type];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative flex gap-5 md:gap-7"
                >
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stroke bg-surface md:h-12 md:w-12">
                    <Icon className="h-4 w-4 text-text-primary/80 md:h-5 md:w-5" strokeWidth={1.5} />
                  </div>
                  <div className="pt-0.5">
                    <span className="text-xs uppercase tracking-wider text-muted">
                      {item.period[lang]}
                    </span>
                    <h3 className="mt-1 text-lg text-text-primary md:text-xl">
                      {item.role[lang]}
                    </h3>
                    <p className="accent-gradient-text text-sm font-medium">
                      {item.organization}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description[lang]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
