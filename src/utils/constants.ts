// Central site configuration — single source of truth for identity & links.

export const SITE = {
  name: "Oscar Jimenez",
  handle: "Osnarci",
  initials: "OJ",
  email: "oscar@osnarci.online",
  phone: "+1 809 966 2254",
  location: {
    es: "Santo Domingo, República Dominicana",
    en: "Santo Domingo, Dominican Republic",
  },
  domain: "osnarci.online",
} as const;

export const SOCIAL = {
  github: "https://github.com/oscarjnz",
  linkedin: "https://www.linkedin.com/in/oscar-jimenez-cybersechack",
  instagram: "https://instagram.com/oscar.jp__",
} as const;

// Background video — local MP4 (self-hosted, ~2.6MB). No external stream.
export const HERO_VIDEO_SRC = "/videos/hero.mp4";

export const SCROLL_THRESHOLD = 100; // px — navbar gains shadow past this
