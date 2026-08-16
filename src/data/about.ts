import type { Localized } from "./types";

// Roles that cycle in the hero animation. The degree-status role (student /
// egresado / engineer) is appended dynamically in Hero.tsx from
// src/data/academicStatus.ts, since it changes over time.
export const heroRoles: Localized[] = [
  { es: "Analista de ciberseguridad", en: "Cybersecurity analyst" },
  { es: "Desarrollador web", en: "Web developer" },
];

// The opening paragraph (age, degree, university) changes with academic
// status and lives in src/data/academicStatus.ts (aboutIntro); About.tsx
// prepends it to this list.
export const aboutParagraphs: Localized[] = [
  {
    es: "Mi base es el blue team (monitoreo, SIEM y forense de red), pero también hago red team: explotación web, CTFs y pentesting. Construyo aplicaciones full-stack de punta a punta, despliego y administro yo mismo los servidores y VPS donde corren (Cloudflare Workers, Fly.io, Render, Docker) y automatizo lo que se pueda con bots e IA.",
    en: "My foundation is blue team (monitoring, SIEM and network forensics), but I also do red team: web exploitation, CTFs and pentesting. I build full-stack apps end to end, deploying and administering the servers and VPS instances they run on myself (Cloudflare Workers, Fly.io, Render, Docker), and automate whatever I can with bots and AI.",
  },
  {
    es: "Fuera del teclado, jugué béisbol competitivo casi 12 años y sigo el deporte de cerca, desde la sabermetría hasta la recomposición corporal.",
    en: "Away from the keyboard, I played competitive baseball for nearly 12 years and still follow the sport closely, from sabermetrics to body recomposition.",
  },
];

// Quick stats for the About section.
export const stats: { value: string; label: Localized }[] = [
  { value: "2+", label: { es: "Años de experiencia", en: "Years of experience" } },
  { value: "4", label: { es: "Proyectos en vivo", en: "Live projects" } },
  { value: "16+", label: { es: "Certificaciones", en: "Certifications" } },
];
