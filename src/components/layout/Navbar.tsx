import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrolledPast } from "@/hooks/useScrollProgress";
import { SITE, SCROLL_THRESHOLD } from "@/utils/constants";
import { cn } from "@/utils/cn";
import LanguageToggle from "@/components/ui/LanguageToggle";

const SECTIONS = ["home", "about", "work", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function Navbar() {
  const { t } = useLanguage();
  const scrolled = useScrolledPast(SCROLL_THRESHOLD);
  const [active, setActive] = useState<SectionId>("home");

  const navLabels: Record<SectionId, string> = {
    home: t.nav.home,
    about: t.nav.about,
    work: t.nav.work,
    contact: t.nav.contact,
  };

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={cn(
          "inline-flex items-center rounded-full border border-white/10 bg-surface/80 px-2 py-2 backdrop-blur-md transition-shadow",
          scrolled && "shadow-md shadow-black/20",
        )}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          aria-label="Inicio"
          className="group relative grid h-9 w-9 place-items-center rounded-full"
        >
          <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 group-hover:rotate-180" />
          <span className="absolute inset-[2px] grid place-items-center rounded-full bg-bg transition-transform group-hover:scale-110">
            <span className="font-display text-[13px] italic text-text-primary">
              {SITE.initials}
            </span>
          </span>
        </button>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Nav links */}
        <div className="flex items-center">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm",
                active === id
                  ? "bg-stroke/50 text-text-primary"
                  : "text-muted hover:bg-stroke/50 hover:text-text-primary",
              )}
            >
              {navLabels[id]}
            </button>
          ))}
        </div>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <div className="mx-1">
          <LanguageToggle />
        </div>

        {/* Say hi button */}
        <a
          href={`mailto:${SITE.email}`}
          className="group relative ml-1 hidden rounded-full sm:inline-flex"
        >
          <span className="animated-gradient-border absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-4 py-2 text-sm text-text-primary backdrop-blur-md">
            {t.nav.sayHi}
            <span aria-hidden className="text-xs">
              ↗
            </span>
          </span>
        </a>
      </div>
    </nav>
  );
}
