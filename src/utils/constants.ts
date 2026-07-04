// Central site configuration — single source of truth for identity & links.

export const SITE = {
  name: "Oscar Jimenez",
  handle: "Osnarci",
  initials: "OJ",
  email: "oscarjimenez1410@gmail.com",
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

// Background video (HLS stream). MP4 fallback lives in /public/videos if provided.
export const HERO_VIDEO_HLS =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const SCROLL_THRESHOLD = 100; // px — navbar gains shadow past this
