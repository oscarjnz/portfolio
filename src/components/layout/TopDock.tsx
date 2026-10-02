import { useEffect, useState } from "react";
import { Home, User, FolderKanban, Mail } from "lucide-react";
import { AnimatedTopDock, type DockItem } from "@/shaders/animated-top-dock/AnimatedTopDock";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { SITE } from "@/utils/constants";
import "@/shaders/threeui.css";
import "@/shaders/animated-top-dock/portfolio-dock.css";

const SECTIONS = ["home", "about", "work", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const iconProps = { size: 16, strokeWidth: 1.4 } as const;
const ICONS: Record<SectionId, JSX.Element> = {
  home: <Home {...iconProps} />,
  about: <User {...iconProps} />,
  work: <FolderKanban {...iconProps} />,
  contact: <Mail {...iconProps} />,
};

const BRAND_MARK = (
  <span className="grid h-full w-full place-items-center bg-[#E8E8E3] font-display text-[0.8em] italic text-[#111]">
    {SITE.initials}
  </span>
);

// Desktop navigation: the ThreeUI glass dock laid out as a top bar, bead field
// omitted (it lives in the Hero).
export default function TopDock() {
  const { t } = useLanguage();
  const [active, setActive] = useState<SectionId>("home");

  const labels: Record<SectionId, string> = {
    home: t.nav.home,
    about: t.nav.about,
    work: t.nav.work,
    contact: t.nav.contact,
  };

  // Scroll-spy by position, not IntersectionObserver: the sections below the
  // Hero are lazy-loaded and may not exist yet when this mounts.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: SectionId = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const items: DockItem[] = SECTIONS.map((id) => ({
    id,
    label: labels[id],
    icon: ICONS[id],
  }));

  return (
    <AnimatedTopDock
      variant="glass"
      className="atd-glass--rail"
      orientation="horizontal"
      field={false}
      caption={false}
      railItems={items}
      activeId={active}
      onSelect={scrollTo}
      brand={{ mark: BRAND_MARK, word: SITE.name.split(" ")[0], onClick: () => scrollTo("home") }}
      cta={{ label: t.nav.sayHi, href: `mailto:${SITE.email}` }}
      railExtra={
        <div className="atd-glass__lang">
          <LanguageToggle />
        </div>
      }
      proximity={70}
      widthGrowth={14}
      heightGrowth={6}
      drop={4}
    />
  );
}
