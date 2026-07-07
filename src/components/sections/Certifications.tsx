import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { certifications } from "@/data/certifications";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Certifications() {
  const { t } = useLanguage();
  const tier1 = certifications.filter((c) => c.tier === 1);
  const rest = certifications.filter((c) => c.tier !== 1);

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
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-stroke bg-surface/40 transition-colors hover:border-white/20"
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
                  <ShieldCheck
                    className="h-14 w-14 text-text-primary/30"
                    strokeWidth={1}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-medium leading-snug text-text-primary">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                <span className="mt-auto pt-3 text-[11px] uppercase tracking-wider text-muted">
                  {formatDate(cert.date)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tier 2/3: compact list */}
        <div className="mt-6 flex flex-wrap gap-3">
          {rest.map((cert, i) => (
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
    </section>
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
