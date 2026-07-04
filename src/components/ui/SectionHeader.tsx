import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  headingItalic: string;
  subtext: string;
}

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function SectionHeader({
  eyebrow,
  heading,
  headingItalic,
  subtext,
}: SectionHeaderProps) {
  return (
    <motion.div {...reveal} className="mb-12 md:mb-16">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-stroke" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="max-w-2xl text-4xl leading-[1.05] tracking-tight text-text-primary md:text-5xl lg:text-6xl">
        {heading}{" "}
        <span className="font-display italic text-text-primary/90">
          {headingItalic}
        </span>
      </h2>
      <p className="mt-5 max-w-md text-sm text-muted md:text-base">{subtext}</p>
    </motion.div>
  );
}
