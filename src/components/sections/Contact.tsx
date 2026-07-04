import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE, SOCIAL, HERO_VIDEO_SRC } from "@/utils/constants";

const MARQUEE_TEXT = "BUILDING · SECURING · AUTOMATING · ";

export default function Contact() {
  const { t } = useLanguage();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bg pb-8 pt-20 md:pb-12 md:pt-28"
    >
      {/* Background video, flipped */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover opacity-60"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <div className="relative z-10">
        {/* Marquee */}
        <div ref={marqueeRef} className="mb-16 overflow-hidden md:mb-24">
          <div className="marquee-track flex whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-5xl italic text-text-primary/20 md:text-7xl"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[900px] px-6 text-center md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              {t.contact.eyebrow}
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-[1.05] tracking-tight text-text-primary md:text-6xl">
              {t.contact.heading}{" "}
              <span className="font-display italic">
                {t.contact.headingItalic}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm text-muted md:text-base">
              {t.contact.subtext}
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="group relative mt-10 inline-flex rounded-full"
            >
              <span className="animated-gradient-border absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary px-8 py-4 text-sm text-bg md:text-base">
                {SITE.email}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Footer bar */}
        <div className="mx-auto mt-20 max-w-[1200px] px-6 md:mt-28 md:px-10 lg:px-16">
          <div className="flex flex-col items-center gap-6 border-t border-stroke pt-8 md:flex-row md:justify-between">
            <div className="flex items-center gap-4">
              <SocialLink href={SOCIAL.github} label="GitHub">
                <Github className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={SOCIAL.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={SOCIAL.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-400 shadow-[0_0_8px] shadow-green-400/60" />
              <span className="text-xs text-muted">{t.contact.available}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-2 text-center text-xs text-muted/70 md:flex-row md:text-left">
            <span>
              © {year} {SITE.name}. {t.footer.rights}
            </span>
            <span>{t.footer.built}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-stroke bg-surface/40 text-muted transition-colors hover:border-white/20 hover:text-text-primary"
    >
      {children}
    </a>
  );
}
