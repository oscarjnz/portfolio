import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { heroRoles } from "@/data/about";
import { ACADEMIC_STATUS_CONTENT } from "@/data/academicStatus";
import { getAcademicStatus } from "@/utils/academicTerm";
import { SITE } from "@/utils/constants";
import { AnimatedTopDock } from "@/shaders/animated-top-dock/AnimatedTopDock";
import "@/shaders/threeui.css";
import "@/shaders/animated-top-dock/portfolio-dock.css";

export default function Hero() {
  const { t, lang } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);

  // Degree-status role (student / egresado / engineer) rotates in alongside
  // the two fixed roles; see src/data/academicStatus.ts.
  const roles = useMemo(
    () => [...heroRoles, ACADEMIC_STATUS_CONTENT[getAcademicStatus()].heroRole],
    [],
  );

  // Cycle hero roles every 2s.
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      2000,
    );
    return () => clearInterval(id);
  }, [roles.length]);

  const role = roles[roleIndex][lang];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background: ThreeUI liquid glass bead field (WebGL, Three.js r128) */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatedTopDock
          variant="glass"
          className="atd-glass--field"
          rail={false}
          caption={false}
          particles={22}
          thickness={0.115}
          dispersion={0.05}
          specular={0.85}
          rim={0.5}
          drift={1}
        />
      </div>
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      {/* pointer-events-none so pointer movement reaches the bead field underneath
          (it drives the parallax); the CTAs opt back in. */}
      <div className="pointer-events-none relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="animate-name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-[9rem]">
          {SITE.name}
        </h1>

        <p
          className="animate-blur-in mb-8 text-lg text-text-primary/90 md:text-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {role}
          </span>
          {t.hero.roleConnector}
        </p>

        <p
          className="animate-blur-in mb-12 max-w-lg text-sm text-text-primary/85 md:text-base [text-shadow:0_1px_14px_rgba(0,0,0,0.7)]"
          style={{ animationDelay: "0.5s" }}
        >
          {t.hero.description}
        </p>

        <div
          className="animate-blur-in inline-flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "0.6s" }}
        >
          <button
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="pointer-events-auto group relative rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-transform hover:scale-105"
          >
            {t.hero.ctaWork}
          </button>
          <a
            href={`mailto:${SITE.email}`}
            className="pointer-events-auto group relative rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-transform hover:scale-105"
          >
            <span className="animated-gradient-border absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative">{t.hero.ctaContact}</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-text-primary/70">
          {t.hero.scroll}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient absolute inset-0 h-full w-full animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}
