import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Secure", "Build", "Automate"];

// The loader is a quick branded flash, not a fixed wait. It resolves as soon
// as fonts are ready (so the hero renders with no FOUT), bounded by MIN/MAX.
const MIN_MS = 500; // show the animation at least this long
const MAX_MS = 1600; // hard cap — never wait longer than this

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    let done = false;
    const start = performance.now();

    const finish = () => {
      if (done) return;
      done = true;
      setCount(100);
      setTimeout(onComplete, 300);
    };

    // Drive the counter toward 100 across MAX_MS; snap to 100 on finish.
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const progress = Math.min((now - startRef.current) / MAX_MS, 0.99);
      setCount(Math.floor(progress * 100));
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
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      450,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Top-left label */}
      <span className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-10">
        Osnarci
      </span>

      {/* Center rotating words */}
      <div className="flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {WORDS[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
        <span className="font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left transition-transform duration-150"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </motion.div>
  );
}
