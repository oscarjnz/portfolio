// UI-chrome strings (navigation, buttons, section labels).
// Long-form content (projects, bio) lives in the /data files as { es, en } objects.

export type Lang = "es" | "en";

export const translations = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      skills: "Skills",
      work: "Proyectos",
      experience: "Trayectoria",
      contact: "Contacto",
      sayHi: "Contáctame",
    },
    hero: {
      eyebrow: "PORTAFOLIO · 2026",
      intro: "Soy",
      roleConnector: "con base en Santo Domingo.",
      description:
        "Construyo aplicaciones web full-stack y protejo sistemas. Ciberseguridad, desarrollo y automatización con un mismo estándar: hacerlo bien.",
      ctaWork: "Ver proyectos",
      ctaContact: "Hablemos",
      scroll: "DESLIZA",
    },
    about: {
      eyebrow: "Sobre mí",
      heading: "Quién",
      headingItalic: "soy",
      subtext:
        "Estudiante de Ingeniería TIC, analista de ciberseguridad y desarrollador. Atleta de toda la vida.",
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
      present: "Actualidad",
    },
    beyond: {
      eyebrow: "Fuera del teclado",
      heading: "Mentalidad de",
      headingItalic: "atleta",
      subtext:
        "Casi 12 años de béisbol competitivo. Sigo el juego desde la sabermetría y hoy aplico la misma disciplina a la recomposición corporal, y al código.",
    },
    contact: {
      eyebrow: "Contacto",
      heading: "Construyamos",
      headingItalic: "algo juntos",
      subtext:
        "¿Un proyecto, una auditoría, o solo saludar? Mi bandeja siempre está abierta.",
      cta: "Escríbeme",
      available: "Disponible para proyectos",
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
      skills: "Skills",
      work: "Work",
      experience: "Journey",
      contact: "Contact",
      sayHi: "Say hi",
    },
    hero: {
      eyebrow: "PORTFOLIO · 2026",
      intro: "I'm a",
      roleConnector: "based in Santo Domingo.",
      description:
        "I build full-stack web applications and secure systems. Cybersecurity, development and automation held to one standard: doing it right.",
      ctaWork: "See work",
      ctaContact: "Let's talk",
      scroll: "SCROLL",
    },
    about: {
      eyebrow: "About",
      heading: "Who I",
      headingItalic: "am",
      subtext:
        "ICT Engineering student, cybersecurity analyst and developer. Lifelong athlete.",
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
      present: "Present",
    },
    beyond: {
      eyebrow: "Beyond the keyboard",
      heading: "Athlete's",
      headingItalic: "mindset",
      subtext:
        "Nearly 12 years of competitive baseball. I follow the game through sabermetrics and today apply the same discipline to body recomposition, and to code.",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's build",
      headingItalic: "something together",
      subtext:
        "A project, an audit, or just to say hi? My inbox is always open.",
      cta: "Email me",
      available: "Available for projects",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Designed and built by Oscar Jimenez.",
    },
  },
};

// Derived from the Spanish tree; both languages share this (widened) shape.
export type TranslationShape = (typeof translations)["es"];
