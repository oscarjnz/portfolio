import type { Localized } from "./types";

// Roles that cycle in the hero animation.
export const heroRoles: Localized[] = [
  { es: "Entusiasta de la ciberseguridad", en: "Cybersecurity enthusiast" },
  { es: "Desarrollador web", en: "Web developer" },
  { es: "Estudiante de Ingeniería TIC", en: "ICT engineering student" },
  { es: "Atleta", en: "Athlete" },
];

export const aboutParagraphs: Localized[] = [
  {
    es: "Tengo 21 años y estudio Ingeniería en TIC en UNIBE, en Santo Domingo. Trabajo en el departamento de TIC de la universidad, donde toco ciberseguridad, desarrollo web y administración de CRM en el día a día.",
    en: "I'm 21 and study ICT Engineering at UNIBE in Santo Domingo. I work in the university's IT department, where I handle cybersecurity, web development and CRM administration day to day.",
  },
  {
    es: "Mi base es el blue team — monitoreo, SIEM y forense de red — pero también hago red team: explotación web, CTFs y pentesting. Construyo aplicaciones full-stack de punta a punta y automatizo lo que se pueda con bots e IA.",
    en: "My foundation is blue team — monitoring, SIEM and network forensics — but I also do red team: web exploitation, CTFs and pentesting. I build full-stack apps end to end and automate whatever I can with bots and AI.",
  },
  {
    es: "Fuera del teclado, soy atleta de toda la vida. Jugué béisbol competitivo casi 12 años y sigo el deporte de cerca — desde la sabermetría hasta la recomposición corporal. Esa mentalidad de disciplina y mejora constante es la misma que llevo al código.",
    en: "Away from the keyboard, I'm a lifelong athlete. I played competitive baseball for nearly 12 years and follow sports closely — from sabermetrics to body recomposition. That mindset of discipline and constant improvement is the same one I bring to code.",
  },
];

// Quick stats for the About section.
export const stats: { value: string; label: Localized }[] = [
  { value: "2+", label: { es: "Años en tech", en: "Years in tech" } },
  { value: "4", label: { es: "Proyectos en vivo", en: "Live projects" } },
  { value: "16+", label: { es: "Certificaciones", en: "Certifications" } },
  { value: "12", label: { es: "Años de béisbol", en: "Years of baseball" } },
];
