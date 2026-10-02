import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE } from "@/utils/constants";

const AREAS = {
  es: ["Ciberseguridad", "Redes", "Desarrollo", "Automatización"],
  en: ["Cybersecurity", "Networking", "Development", "Automation"],
} as const;

// The loader is a quick branded moment, not a fixed wait. It resolves as soon
// as fonts are ready (so the hero renders with no FOUT), bounded by MIN/MAX.
const MIN_MS = 900; // long enough for the ring to read as a deliberate draw
const MAX_MS = 1700; // hard cap, never wait longer than this

// Progress ring geometry.
const RING_SIZE = 148;
const RING_STROKE = 2;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { lang } = useLanguage();
  const areas = AREAS[lang];
  const [progress, setProgress] = useState(0);
  const [areaIndex, setAreaIndex] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    let done = false;
    const start = performance.now();

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(1);
      setTimeout(onComplete, 350);
    };

    // Ease the ring toward 1 across MAX_MS; snap to 1 on finish.
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = Math.min((now - startRef.current) / MAX_MS, 1);
      setProgress(Math.min(1 - Math.pow(1 - t, 2), 0.98));
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Complete as soon as fonts are ready AND the minimum time has elapsed.
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      const remaining = Math.max(0, MIN_MS - (performance.now() - start));
      window.setTimeout(finish, remaining);
    });

    // Hard cap + rAF-throttle guard (works even in a background tab).
    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(cap);
    };
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(
      () => setAreaIndex((i) => (i + 1) % AREAS.es.length),
      420,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-bg"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      role="status"
      aria-label={lang === "es" ? "Cargando" : "Loading"}
    >
      {/* Soft glows in the hero's blue and violet, so the handoff feels continuous */}
      <div className="pointer-events-none absolute -left-1/4 top-1/4 h-[60vmax] w-[60vmax] rounded-full bg-[#4E85BF]/35 blur-[120px]" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-[55vmax] w-[55vmax] rounded-full bg-[#7C5CC4]/30 blur-[120px]" />

      <div className="relative flex h-full flex-col items-center justify-center">
        {/* Monogram inside a progress ring */}
        <div className="relative grid place-items-center" style={{ width: RING_SIZE, height: RING_SIZE }}>
          <svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            className="absolute inset-0 -rotate-90"
            aria-hidden
          >
            <defs>
              <linearGradient id="loader-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#89AACC" />
                <stop offset="100%" stopColor="#4E85BF" />
              </linearGradient>
            </defs>
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={RING_STROKE}
              className="text-stroke/60"
            />
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke="url(#loader-ring)"
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - progress)}
              style={{ filter: "drop-shadow(0 0 6px rgba(137,170,204,0.45))" }}
            />
          </svg>
          <span className="font-display text-5xl italic text-text-primary">
            {SITE.initials}
          </span>
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.35em] text-text-primary/80">
          {SITE.name}
        </p>

        {/* Rotating areas, in the visitor's language */}
        <div className="mt-3 h-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={areaIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="block font-display text-lg italic text-muted"
            >
              {areas[areaIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
