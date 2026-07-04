import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHlsVideo } from "@/hooks/useHlsVideo";
import { heroRoles } from "@/data/about";
import { SITE, HERO_VIDEO_HLS } from "@/utils/constants";

export default function Hero() {
  const { t, lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useHlsVideo(videoRef, HERO_VIDEO_HLS);

  // Cycle hero roles every 2s.
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % heroRoles.length),
      2000,
    );
    return () => clearInterval(id);
  }, []);

  // GSAP entrance timeline.
  useLayoutEffect(() => {
    let guard = 0;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const targets = ".name-reveal, .blur-in";
      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0, filter: "none" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 });
      tl.from(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20, duration: 1, stagger: 0.1 },
        0.3,
      );

      // Safety guard: if rAF is throttled (e.g. background tab) and the tween
      // never runs, force the final visible state so content is never stuck
      // hidden. window.setTimeout is independent of GSAP's rAF ticker.
      guard = window.setTimeout(() => {
        if (tl.progress() < 1) {
          gsap.set(targets, { opacity: 1, y: 0, filter: "none" });
        }
      }, 2800);
    }, rootRef);

    return () => {
      ctx.revert();
      window.clearTimeout(guard);
    };
  }, []);

  const role = heroRoles[roleIndex][lang];

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          {t.hero.eyebrow}
        </p>

        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-[9rem]">
          {SITE.name}
        </h1>

        <p className="blur-in mb-8 text-lg text-text-primary/90 md:text-2xl">
          {t.hero.intro}{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {role}
          </span>{" "}
          {t.hero.roleConnector}
        </p>

        <p className="blur-in mb-12 max-w-lg text-sm text-muted md:text-base">
          {t.hero.description}
        </p>

        <div className="blur-in inline-flex flex-col gap-4 sm:flex-row">
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
