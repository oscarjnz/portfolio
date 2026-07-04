import { useEffect, useState } from "react";

/**
 * Tracks vertical scroll position and returns whether the user has scrolled
 * past `threshold` pixels. Used to toggle the navbar shadow.
 */
export function useScrolledPast(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
