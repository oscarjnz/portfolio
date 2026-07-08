import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { heroRoles } from "@/data/about";
import { SITE, HERO_VIDEO_SRC } from "@/utils/constants";

export default function Hero() {
  const { t, lang } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle hero roles every 2s.
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % heroRoles.length),
      2000,
    );
    return () => clearInterval(id);
  }, []);

  const role = heroRoles[roleIndex][lang];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        preload="auto"
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p
          className="animate-blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted"
          style={{ animationDelay: "0.3s" }}
        >
          {t.hero.eyebrow}
        </p>

        <h1 className="animate-name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-[9rem]">
          {SITE.name}
        </h1>

        <p
          className="animate-blur-in mb-8 text-lg text-text-primary/90 md:text-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          {t.hero.intro}{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {role}
          </span>{" "}
          {t.hero.roleConnector}
        </p>

        <p
          className="animate-blur-in mb-12 max-w-lg text-sm text-muted md:text-base"
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
            className="group relative rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-transform hover:scale-105"
          >
            {t.hero.ctaWork}
          </button>
          <a
            href={`mailto:${SITE.email}`}
            className="group relative rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-transform hover:scale-105"
          >
            <span className="animated-gradient-border absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative">{t.hero.ctaContact}</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {t.hero.scroll}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient absolute inset-0 h-full w-full animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}
