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
      roleConnector: ".",
      description:
        "Aplicaciones web full-stack que saben defenderse. Ciberseguridad, desarrollo y automatización en una sola persona.",
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
      showAll: "Ver todas",
      showLess: "Ver menos",
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
        "Un proyecto, una duda de seguridad o un simple hola. El mensaje le llega directo a Oscar.",
      available: "Disponible para proyectos",
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo",
        phone: "Teléfono (opcional)",
        topic: "Motivo",
        topicPlaceholder: "Elige uno",
        topics: {
          project: "Un proyecto o desarrollo web",
          audit: "Una auditoría de seguridad",
          call: "Agendar una llamada",
          hello: "Solo saludar",
          other: "Otro motivo",
        },
        message: "Mensaje",
        messagePlaceholder:
          "Cuenta qué se necesita, para cuándo y cualquier detalle que ayude a entender el caso.",
        submit: "Enviar mensaje",
        sending: "Enviando",
        privacy: "Los datos solo se usan para responder este mensaje.",
        errorRequired: "Este campo es obligatorio.",
        errorEmail: "Revisa que el correo esté bien escrito.",
        errorPhone: "Usa solo números, espacios y los signos + - ( ).",
        errorShort: "Cuenta un poco más (mínimo 10 caracteres).",
        errorSend: "No se pudo enviar el mensaje. Inténtalo de nuevo o escribe directo a",
        errorLimit: "Se enviaron varios mensajes seguidos. Espera un rato e inténtalo otra vez.",
        successTitle: "Mensaje enviado",
        successBody:
          "Llegó bien. Oscar te responde en cuanto pueda, y a esta dirección acaba de salir una confirmación.",
        another: "Enviar otro mensaje",
        direct: "¿Prefieres escribir directo?",
      },
      resumeHeading: "Descargar CV",
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
      roleConnector: ".",
      description:
        "Full-stack web apps that know how to defend themselves. Cybersecurity, development and automation in one person.",
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
      showAll: "Show all",
      showLess: "Show less",
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
        "A project, a security question or a simple hello. The message goes straight to Oscar.",
      available: "Available for projects",
      form: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone (optional)",
        topic: "Reason",
        topicPlaceholder: "Pick one",
        topics: {
          project: "A project or web development",
          audit: "A security audit",
          call: "Schedule a call",
          hello: "Just saying hi",
          other: "Something else",
        },
        message: "Message",
        messagePlaceholder:
          "Say what is needed, by when, and any detail that helps explain the case.",
        submit: "Send message",
        sending: "Sending",
        privacy: "Your details are only used to answer this message.",
        errorRequired: "This field is required.",
        errorEmail: "Check that the email is spelled correctly.",
        errorPhone: "Use only digits, spaces and the signs + - ( ).",
        errorShort: "Tell a little more (at least 10 characters).",
        errorSend: "The message could not be sent. Try again or write directly to",
        errorLimit: "Several messages were sent in a row. Wait a while and try again.",
        successTitle: "Message sent",
        successBody:
          "It arrived. Oscar will reply as soon as he can, and a confirmation just went out to this address.",
        another: "Send another message",
        direct: "Prefer to write directly?",
      },
      resumeHeading: "Download resume",
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
