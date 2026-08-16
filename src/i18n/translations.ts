// UI-chrome strings (navigation, buttons, section labels).
// Long-form content (projects, bio) lives in the /data files as { es, en } objects.

export type Lang = "es" | "en";

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      work: "Proyectos",
      contact: "Contacto",
      sayHi: "Contáctame",
    },
    hero: {
      eyebrow: "PORTAFOLIO · 2026",
      roleConnector: ".",
      description:
        "Construyo aplicaciones web full-stack y protejo sistemas. Ciberseguridad, desarrollo y automatización, todos con el mismo estándar de hacerlo bien.",
      ctaWork: "Ver proyectos",
      ctaContact: "Hablemos",
      scroll: "DESLIZA",
    },
    about: {
      eyebrow: "Sobre mí",
      heading: "Quién",
      headingItalic: "soy",
      // Subtext depends on academic status; see src/data/academicStatus.ts.
    },
    skills: {
      eyebrow: "Stack técnico",
      heading: "Herramientas y",
      headingItalic: "tecnologías",
      subtext: "Lo que uso para construir, asegurar y automatizar.",
    },
    work: {
      eyebrow: "Proyectos destacados",
      heading: "Trabajo",
      headingItalic: "seleccionado",
      subtext: "Proyectos reales, en producción, resolviendo problemas reales.",
      viewProject: "Ver proyecto",
      visitSite: "Visitar sitio",
      flagship: "Proyecto insignia",
      inProgress: "En progreso",
    },
    certifications: {
      eyebrow: "Credenciales",
      heading: "Certificaciones y",
      headingItalic: "formación",
      subtext: "Aprendizaje continuo en seguridad, redes y desarrollo.",
      verify: "Verificar",
      more: "Más credenciales",
    },
    experience: {
      eyebrow: "Trayectoria",
      heading: "Experiencia y",
      headingItalic: "educación",
      subtext: "De las aulas al departamento de TI.",
    },
    contact: {
      eyebrow: "Contacto",
      heading: "Construyamos",
      headingItalic: "algo juntos",
      subtext:
        "¿Un proyecto, una auditoría, o solo saludar? Mi bandeja siempre está abierta.",
      available: "Disponible para proyectos",
      resumeHeading: "Descarga mi CV",
      resumeSubtext: "Elige el formato según tu región.",
      resumeDownload: "Descargar CV",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      built: "Diseñado y construido por Oscar Jimenez.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      contact: "Contact",
      sayHi: "Say hi",
    },
    hero: {
      eyebrow: "PORTFOLIO · 2026",
      roleConnector: ".",
      description:
        "I build full-stack web applications and secure systems. Cybersecurity, development and automation, all held to the same standard of doing it right.",
      ctaWork: "See work",
      ctaContact: "Let's talk",
      scroll: "SCROLL",
    },
    about: {
      eyebrow: "About",
      heading: "Who I",
      headingItalic: "am",
      // Subtext depends on academic status; see src/data/academicStatus.ts.
    },
    skills: {
      eyebrow: "Tech stack",
      heading: "Tools and",
      headingItalic: "technologies",
      subtext: "What I use to build, secure and automate.",
    },
    work: {
      eyebrow: "Featured projects",
      heading: "Selected",
      headingItalic: "work",
      subtext: "Real projects, in production, solving real problems.",
      viewProject: "View project",
      visitSite: "Visit site",
      flagship: "Flagship project",
      inProgress: "In progress",
    },
    certifications: {
      eyebrow: "Credentials",
      heading: "Certifications and",
      headingItalic: "training",
      subtext: "Continuous learning across security, networking and development.",
      verify: "Verify",
      more: "More credentials",
    },
    experience: {
      eyebrow: "Journey",
      heading: "Experience and",
      headingItalic: "education",
      subtext: "From the classroom to the IT department.",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's build",
      headingItalic: "something together",
      subtext:
        "A project, an audit, or just to say hi? My inbox is always open.",
      available: "Available for projects",
      resumeHeading: "Download my resume",
      resumeSubtext: "Pick the format for your region.",
      resumeDownload: "Download resume",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Designed and built by Oscar Jimenez.",
    },
  },
};

// Derived from the Spanish tree; both languages share this (widened) shape.
export type TranslationShape = (typeof translations)["es"];
