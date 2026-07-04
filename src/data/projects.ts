import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "security-smart-services",
    title: "Security Smart Services",
    tagline: {
      es: "Auditoría de seguridad de red para todos",
      en: "Network security auditing for everyone",
    },
    description: {
      es: "Plataforma que inventaría los dispositivos de tu red, detecta puertos y servicios expuestos, y te avisa ante cambios o amenazas. Todo el análisis corre en un agente local que nunca expone tu red a internet, solo conexiones salientes por WSS. Un asistente de IA interpreta cada resultado.",
      en: "A platform that inventories your network devices, detects exposed ports and services, and alerts you to changes or threats. All scanning runs on a local agent that never exposes your network to the internet, outbound WSS connections only. An AI assistant interprets every result.",
    },
    url: "https://securitysmartservices.site",
    image: "/images/projects/sss-landing.png",
    gallery: [
      "/images/projects/sss-landing.png",
      "/images/projects/sss-dashboard.png",
      "/images/projects/sss-geoloc.png",
    ],
    tags: [
      "React 18",
      "TypeScript",
      "Supabase",
      "Node.js",
      "Groq AI",
      "Clerk",
      "Fly.io",
      "nmap",
    ],
    status: "live",
    flagship: true,
    year: "2025",
  },
  {
    id: "nutriflow",
    title: "Nutriflow",
    tagline: {
      es: "Nutrición y recomposición corporal",
      en: "Nutrition and body recomposition",
    },
    description: {
      es: "App de gestión nutricional para quienes buscan ganar, perder o mantener peso y construir músculo. Registra comidas, calcula macros diarios (proteína, carbohidratos, grasa) contra tus metas, e incluye planes y control de ayuno. Infraestructura de costo cero.",
      en: "Nutrition management app for anyone pursuing weight gain, loss, maintenance or muscle building. Logs meals, tracks daily macros (protein, carbs, fat) against your goals, and includes meal plans and fasting control. Zero-cost infrastructure.",
    },
    url: "https://nutriflow-sigma.vercel.app",
    image: "/images/projects/nutriflow.png",
    tags: ["Next.js", "Supabase", "Groq AI", "TypeScript", "Tailwind"],
    status: "live",
    year: "2025",
  },
  {
    id: "active-calendar",
    title: "Active Calendar",
    tagline: {
      es: "Gestión académica automatizada",
      en: "Automated academic management",
    },
    description: {
      es: "Herramienta de tareas académicas que ingiere el calendario de Blackboard (Anthology), muestra las tareas de la semana con estado pendiente/hecha y exporta reportes en PDF, TXT o PNG. Incluye un bot de Telegram que envía reportes semanales el día que elijas, más entrega por correo programable.",
      en: "Academic task tool that ingests a Blackboard (Anthology) calendar, shows weekly tasks with pending/done status and exports reports as PDF, TXT or PNG. Includes a Telegram bot that sends weekly reports on your chosen day, plus scheduled email delivery.",
    },
    url: "https://activecalendar.site",
    image: "/images/projects/active-calendar.png",
    tags: [
      "Cloudflare Workers",
      "Supabase",
      "Telegram Bot API",
      "TypeScript",
    ],
    status: "live",
    year: "2026",
  },
  {
    id: "productivity-os",
    title: "Productivity OS",
    tagline: {
      es: "Tu dashboard, tus widgets",
      en: "Your dashboard, your widgets",
    },
    description: {
      es: "Dashboard de productividad con widgets personalizables (tamaño, color, vistas), sincronizado en la nube con tu cuenta de Google. Reloj, clima, tráfico, correos sin leer, control de Spotify, calendario, notas, marcadores, cripto, divisas, resultados deportivos y un asistente de IA. Pensado para setups multi-monitor.",
      en: "Productivity dashboard with customizable widgets (size, color, views), cloud-synced via your Google account. Clock, weather, traffic, unread email, Spotify control, calendar, notes, bookmarks, crypto, currency, sports scores and an AI assistant. Built for multi-monitor setups.",
    },
    url: "https://osnarci.online",
    image: "/images/projects/productivity-os.png",
    tags: [
      "React",
      "Google OAuth",
      "Spotify API",
      "Groq AI",
      "Multi-API",
    ],
    status: "in-progress",
    year: "2026",
  },
];
