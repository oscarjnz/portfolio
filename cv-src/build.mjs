// Fuente editable de los 3 CV (latam, us, eu). Genera HTML y PDF con Chrome headless.
// Uso: node cv-src/build.mjs   (desde la raíz del repo)
// Salida: public/cv/oscar-jimenez-resume-{latam,us,eu}.pdf (mismos nombres que usa src/data/resumes.ts).
// Regla de estilo del proyecto: sin guion largo ni en dash como puntuación.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_HTML = join(ROOT, "cv-src", "html");
const OUT_PDF = join(ROOT, "public", "cv");
const CHROME = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("Chrome no encontrado. Define CHROME_PATH.");
mkdirSync(OUT_HTML, { recursive: true });

const LINKS = {
  linkedin: "https://www.linkedin.com/in/oscar-jimenez-cybersechack",
  github: "https://github.com/oscarjnz",
  site: "https://osnarci.online",
  sss: "https://securitysmartservices.site",
  email: "mailto:oscar@osnarci.online",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const a = (href, text) => `<a href="${href}">${esc(text)}</a>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

const CSS = `
@page { size: Letter; margin: 0.62in 0.8in; }
* { box-sizing: border-box; }
body { font-family: Georgia, "Times New Roman", serif; font-size: 10.1pt; line-height: 1.34; color: #111; margin: 0; }
a { color: #1a3f9c; text-decoration: none; }
h1 { font-size: 25pt; margin: 0 0 2pt; line-height: 1.15; }
.sub { font-size: 11.5pt; margin: 0 0 3pt; }
.contact { font-size: 9.6pt; margin: 0 0 10pt; }
h2 { font-size: 12.5pt; margin: 13pt 0 5pt; padding-bottom: 2pt; border-bottom: 1.4px solid #111; break-after: avoid; }
h3 { font-size: 10.6pt; margin: 8pt 0 2pt; break-after: avoid; }
p { margin: 0 0 4pt; text-align: justify; }
ul { margin: 2pt 0 4pt; padding-left: 20pt; }
li { margin: 0 0 2pt; text-align: left; }
.job { break-inside: avoid; }
li { break-inside: avoid; }
.url { margin: 0 0 2pt; font-size: 10pt; }
.skills p { text-align: left; }
table { border-collapse: collapse; width: 100%; margin: 3pt 0 6pt; font-size: 10pt; }
table.info td { border-bottom: 0.8px solid #999; padding: 2.5pt 4pt; }
table.info td:first-child { font-weight: bold; width: 26%; }
table.grid td, table.grid th { border: 0.8px solid #999; padding: 3pt 4pt; text-align: center; }
.small { font-size: 9.6pt; }
body.eu { font-size: 9.7pt; line-height: 1.3; }
body.eu h2 { margin-top: 10pt; }
.it { font-style: italic; }
`;

// ---------- Contenido ----------
const CONTENT = {
  es: {
    lang: "es",
    subtitle: "Estudiante de Ingeniería en TIC | Ciberseguridad | Desarrollo de software",
    location: "Santo Domingo, República Dominicana",
    nationality: "Nacionalidad: Dominicana",
    h: {
      summary: "Perfil Profesional", exp: "Experiencia Profesional", proj: "Proyectos", acad: "Proyectos académicos",
      skills: "Habilidades Técnicas", edu: "Educación", certs: "Certificaciones", comp: "Competencias Clave",
    },
    summary:
      "Estudiante de Ingeniería en TIC (concentraciones en Ciberseguridad y Desarrollo de Software, graduación estimada 2027) con experiencia práctica en backend Node.js/TypeScript y SQL, seguridad de aplicaciones y operación de servidores Linux con Docker. Administra el CRM institucional de la UNIBE, opera un VPS Debian en GCP con monitoreo propio y ha desplegado de forma independiente cuatro aplicaciones web full-stack (Fly.io, Render, Cloudflare Workers, Supabase). En producción detectó y cerró una fuga de datos entre usuarios aplicando RLS en Supabase con autenticación de Clerk. Formación aplicada en ciberseguridad (Google Cybersecurity Professional Certificate, Microsoft Cybersecurity Architect, Cisco Ethical Hacker) y experiencia en equipos multiculturales bajo presión operativa (FIFA U-17 Women's World Cup 2024).",
    jobs: [
      {
        title: "CRM Assistant / Cybersecurity Analyst / Software Developer Jr.",
        org: "Universidad Iberoamericana (UNIBE) | Santo Domingo, RD",
        date: "Jul. 2025 - Actualidad",
        bullets: [
          "Administra la plataforma CRM institucional del Departamento de TI, mapeando y rediseñando flujos de trabajo para reducir pasos manuales y mejorar la eficiencia operativa.",
          "Ejecuta evaluaciones periódicas de vulnerabilidades, monitoreo continuo de red y administración de servidores, fortaleciendo la postura de ciberseguridad de la organización.",
          "Mantiene y amplía el sitio web institucional (WordPress + Breakdance), entregando mejoras de front-end y garantizando la disponibilidad de la plataforma.",
        ],
      },
      {
        title: "Voluntario Oficial, Operaciones de Medios y Servicios",
        org: "FIFA U-17 Women's World Cup 2024 | Santo Domingo, RD",
        date: "Oct. - Nov. 2024",
        bullets: [
          "Brindó soporte logístico y coordinación de eventos en un torneo internacional avalado por la FIFA, trabajando con equipos multiculturales bajo condiciones operativas exigentes.",
        ],
      },
    ],
    projects: [
      {
        name: "Security Smart Services", tag: "Proyecto insignia | En producción | 2025", url: ["securitysmartservices.site", LINKS.sss],
        bullets: [
          "Plataforma de auditoría de seguridad de red: inventaría dispositivos, detecta puertos y servicios expuestos y alerta ante cambios o amenazas. Un asistente de IA (Groq, Llama 3.3 70B) interpreta cada resultado del escaneo.",
          "Arquitectura nube + agente local: el escaneo corre en local y nunca expone la red a internet, solo conexiones salientes por WSS. Decisión deliberada de seguridad y privacidad.",
          "Backend Node.js/TypeScript (Express) en Render, relay WebSocket en Fly.io, PostgreSQL en Supabase y autenticación con Clerk.",
          "Incidente en producción: verificó contra la base real que el RLS estaba apagado en 15 tablas y que la anon key pública permitía leer los datos de todos los usuarios. Integró Clerk como third-party auth de Supabase y reescribió las policies con el sub del JWT, con migración, plan de rollback y runbook; verificó que el rol anon quedó bloqueado.",
          "Endurecimiento: validación de argumentos del escáner por lista negra, tope de salida y timeout, y correcciones de IDOR y de robustez del relay.",
          "Stack: React 18, TypeScript, Supabase, Node.js/Express, Groq AI, Clerk, Fly.io, Render, nmap.",
        ],
      },
      {
        name: "Infraestructura propia: VPS Linux en GCP", tag: "En operación | 2026", url: null,
        bullets: [
          "VPS Debian 12 con n8n en contenedor Docker (reinicio automático), Apache como reverse proxy con HTTPS de Let's Encrypt (renovación automática), firewall ufw con política DROP y fail2ban.",
          "Monitoreo propio por cron con alertas a Telegram: salud del servidor y de n8n cada 5 minutos, verificación de que los workflows corren y vigilancia de accesos SSH (llaves desconocidas, logins por contraseña, cuentas nuevas). En 3 días registró 4,908 intentos de SSH fallidos desde 240 IPs, con 96 bloqueos de fail2ban.",
          "Stack: Debian, Docker, Apache, certbot, ufw, fail2ban, cron, n8n.",
        ],
      },
      {
        name: "Nutriflow", tag: "En producción | 2025", url: ["nutriflow-sigma.vercel.app", "https://nutriflow-sigma.vercel.app"],
        bullets: [
          "App de gestión nutricional para recomposición corporal (ganar, perder o mantener peso, construir músculo). Registro de comidas, cálculo de macros diarios (proteína, carbohidratos, grasa) contra metas, planes y control de ayuno.",
          "Infraestructura de costo cero.",
          "Stack: Next.js, Supabase, Groq AI, TypeScript, Tailwind.",
        ],
      },
      {
        name: "Active Calendar", tag: "En producción | 2026", url: ["activecalendar.site", "https://activecalendar.site"],
        bullets: [
          "Herramienta de gestión académica que ingiere el calendario de Blackboard (Anthology) y muestra tareas de la semana con estado pendiente/hecha. Exporta reportes en PDF, TXT o PNG; bot de Telegram con reportes semanales programables y entrega por correo.",
          "Backend desplegado como Cloudflare Worker con tareas programadas (cron cada 30 minutos), autenticación con Clerk y base de datos en Supabase con RLS.",
          "Stack: Cloudflare Workers, Supabase, Clerk, Telegram Bot API, TypeScript.",
        ],
      },
      {
        name: "Productivity OS", tag: "En desarrollo | 2026", url: ["productivity-os-beryl.vercel.app", "https://productivity-os-beryl.vercel.app"],
        bullets: [
          "Dashboard de productividad con widgets personalizables (tamaño, color, vistas), sincronizado en la nube con cuenta de Google. Widgets: reloj, clima, tráfico, correos sin leer, control de Spotify, marcadores, cripto, divisas, resultados deportivos y asistente de IA. Pensado para setups multi-monitor.",
          "Stack: React, Google OAuth, Spotify API, Groq AI, integraciones de terceros.",
        ],
      },
      {
        name: "Portafolio personal", tag: "", url: ["osnarci.online", LINKS.site],
        bullets: [
          "Sitio bilingüe en React 18, Vite y TypeScript, desplegado en Vercel, con encabezados de seguridad HTTP, SEO técnico y accesibilidad revisados.",
        ],
      },
    ],
    academic: [
      "TIC Tours: plataforma universitaria de programación, co-desarrollada.",
      "Herramienta de conversión de unidades con integración de APIs externas (Python).",
      "Simulador comparativo de rendimiento entre procesadores monociclo y segmentado (Python + interfaz HTML interactiva).",
      "Diseño e integración de bases de datos relacionales en múltiples proyectos académicos.",
    ],
    skills: [
      ["Lenguajes y tecnologías", "TypeScript (intermedio) · JavaScript (básico-intermedio) · Node.js · Express · Python (intermedio) · SQL · React · Next.js · HTML · CSS · Java (básico)"],
      ["Backend, datos e integraciones", "APIs REST e integraciones HTTP · PostgreSQL (Supabase) · RLS y migraciones SQL · WebSockets · Cloudflare Workers · n8n · APIs de IA (Groq, Llama 3.3 70B)"],
      ["Seguridad de aplicaciones", "autorización en servidor y aislamiento de datos por usuario (RLS) · autenticación con JWT y Clerk · principio de mínimo privilegio · manejo de secretos · corrección de IDOR · validación de entradas"],
      ["Ciberseguridad", "Kali Linux · Ethical Hacking · Pentesting · Análisis de vulnerabilidades · Wazuh (SIEM) · Wireshark · nmap · Cisco NetAcad"],
      ["Servidores e infraestructura", "Administración de servidores Linux (Debian, Ubuntu, Kali) · Docker · Apache y HTTPS (Let's Encrypt) · ufw y fail2ban · monitoreo con cron y alertas · VPS y PaaS (GCP, Oracle Cloud, Fly.io, Render) · DNS/SSL · Git y GitHub"],
      ["Sistemas y virtualización", "Linux (Debian, Ubuntu, Kali) · Windows · VMware · VirtualBox"],
      ["Plataformas y herramientas", "GitHub · WordPress · Breakdance · Figma (básico) · Jira · Excel (avanzado) · CRM/ERP (Odoo, Salesforce) · Supabase"],
      ["Idiomas", "Español (nativo) · Inglés (B1/B2)"],
    ],
    education: {
      title: "Ingeniería en Tecnologías Computacionales (TIC)", org: "Universidad Iberoamericana (UNIBE) | Santo Domingo, RD",
      date: "2023 - Actualidad (graduación estimada 2027)", note: "Concentraciones: Ciberseguridad y Desarrollo de Software.",
    },
    certs:
      "Google Cybersecurity Professional Certificate (8 cursos), Google/Coursera, Dic. 2025 · Microsoft Cybersecurity Architect, Microsoft, Nov. 2025 · Technical Introduction to Cybersecurity 3.0, Fortinet Training Institute, Oct. 2025 · Network Technician Career Path, Cisco Networking Academy, Ago. 2026 · Ethical Hacker, Cisco Networking Academy, Feb. 2024 · Introduction to Cybersecurity, Cisco Networking Academy, Feb. 2024 · Ethical Hacking y Pentesting, Hacker Mentor, Sep. 2024 · Seguridad Informática desde Cero, Udemy, Ene. 2024 · NDG Linux Unhatched, Cisco/NDG, Jun. 2024 · Digital Transformation, University of Virginia/BCG/Coursera, Oct. 2025 · Generative AI Applications, Google Cloud/Coursera, Oct. 2025",
    competencies: "Trabajo en equipo y colaboración · Resolución de problemas · Comunicación efectiva · Adaptabilidad · Aprendizaje continuo · Gestión del tiempo",
  },
  en: {
    lang: "en",
    subtitle: "ICT Engineering Student | Cybersecurity | Software Development",
    location: "Santo Domingo, Dominican Republic",
    nationality: "Dominican",
    h: {
      summary: "Professional Summary", exp: "Professional Experience", proj: "Projects", acad: "Academic Projects",
      skills: "Technical Skills", edu: "Education", certs: "Certifications", comp: "Core Competencies",
    },
    summary:
      "ICT Engineering student (concentrations in Cybersecurity and Software Development, expected graduation 2027) with hands-on experience in Node.js/TypeScript backend and SQL, application security, and Linux server operations with Docker. Administers the institutional CRM at UNIBE, runs a Debian VPS on GCP with custom monitoring, and has independently shipped four full-stack web applications (Fly.io, Render, Cloudflare Workers, Supabase). Detected and closed a cross-user data leak in production by applying Supabase RLS with Clerk authentication. Applied cybersecurity training (Google Cybersecurity Professional Certificate, Microsoft Cybersecurity Architect, Cisco Ethical Hacker) and experience in multicultural, high-pressure teams (FIFA U-17 Women's World Cup 2024).",
    jobs: [
      {
        title: "CRM Assistant / Cybersecurity Analyst / Jr. Software Developer",
        org: "Universidad Iberoamericana (UNIBE) | Santo Domingo, DR",
        date: "Jul 2025 - Present",
        bullets: [
          "Administer the institutional CRM platform for the IT Department, mapping and redesigning workflows to reduce manual processing steps and improve operational efficiency.",
          "Conduct recurring vulnerability assessments, continuous network monitoring, and server administration tasks, strengthening the organization's overall cybersecurity posture.",
          "Maintain and extend the institutional website on WordPress/Breakdance, delivering front-end improvements while maintaining uptime and platform reliability.",
        ],
      },
      {
        title: "Official Volunteer, Media Operations and Services",
        org: "FIFA U-17 Women's World Cup 2024 | Santo Domingo, DR",
        date: "Oct - Nov 2024",
        bullets: [
          "Delivered logistical support and on-site event coordination for a FIFA-sanctioned international tournament, operating across multicultural teams under high-pressure, time-critical conditions.",
        ],
      },
    ],
    projects: [
      {
        name: "Security Smart Services", tag: "Flagship project | In production | 2025", url: ["securitysmartservices.site", LINKS.sss],
        bullets: [
          "Network security audit platform: inventories devices, detects exposed ports and services, and alerts on changes or threats. An AI assistant (Groq, Llama 3.3 70B) interprets each scan result.",
          "Cloud + local-agent architecture: scanning runs locally and never exposes the network to the internet, only outbound connections over WSS. A deliberate security and privacy decision.",
          "Node.js/TypeScript (Express) backend on Render, WebSocket relay on Fly.io, PostgreSQL on Supabase, and Clerk authentication.",
          "Production incident: verified against the live database that RLS was off on 15 tables and that the public anon key allowed reading every user's data. Integrated Clerk as Supabase third-party auth and rewrote the policies around the JWT sub, shipped with a migration, rollback plan and runbook; verified the anon role was blocked.",
          "Hardening: denylist validation of scanner arguments, output cap and timeout, and fixes for IDOR and relay robustness.",
          "Stack: React 18, TypeScript, Supabase, Node.js/Express, Groq AI, Clerk, Fly.io, Render, nmap.",
        ],
      },
      {
        name: "Personal infrastructure: Linux VPS on GCP", tag: "In operation | 2026", url: null,
        bullets: [
          "Debian 12 VPS running n8n in a Docker container (auto-restart), Apache as a reverse proxy with Let's Encrypt HTTPS (auto-renewal), a ufw firewall with a DROP policy, and fail2ban.",
          "Custom cron-based monitoring with Telegram alerts: server and n8n health every 5 minutes, a check that workflows are running, and SSH access surveillance (unknown keys, password logins, new accounts). In 3 days it logged 4,908 failed SSH attempts from 240 IPs, with 96 fail2ban bans.",
          "Stack: Debian, Docker, Apache, certbot, ufw, fail2ban, cron, n8n.",
        ],
      },
      {
        name: "Nutriflow", tag: "In production | 2025", url: ["nutriflow-sigma.vercel.app", "https://nutriflow-sigma.vercel.app"],
        bullets: [
          "Nutrition management app for body recomposition (gain, lose, or maintain weight; build muscle). Meal logging, daily macro calculation (protein, carbohydrates, fat) against goals, meal plans, and fasting control.",
          "Zero-cost infrastructure.",
          "Stack: Next.js, Supabase, Groq AI, TypeScript, Tailwind.",
        ],
      },
      {
        name: "Active Calendar", tag: "In production | 2026", url: ["activecalendar.site", "https://activecalendar.site"],
        bullets: [
          "Academic management tool that ingests the Blackboard (Anthology) calendar and shows the week's tasks with pending/done status. Exports reports as PDF, TXT, or PNG; Telegram bot with schedulable weekly reports plus email delivery.",
          "Backend deployed as a Cloudflare Worker with scheduled tasks (cron every 30 minutes), Clerk authentication, and a Supabase database with RLS.",
          "Stack: Cloudflare Workers, Supabase, Clerk, Telegram Bot API, TypeScript.",
        ],
      },
      {
        name: "Productivity OS", tag: "In development | 2026", url: ["productivity-os-beryl.vercel.app", "https://productivity-os-beryl.vercel.app"],
        bullets: [
          "Productivity dashboard with customizable widgets (size, color, views), cloud-synced via a Google account. Widgets: clock, weather, traffic, unread emails, Spotify control, bookmarks, crypto, currencies, sports scores, and an AI assistant. Designed for multi-monitor setups.",
          "Stack: React, Google OAuth, Spotify API, Groq AI, third-party integrations.",
        ],
      },
      {
        name: "Personal Portfolio", tag: "", url: ["osnarci.online", LINKS.site],
        bullets: [
          "Bilingual site built with React 18, Vite, and TypeScript, deployed on Vercel, with HTTP security headers and reviewed technical SEO and accessibility.",
        ],
      },
    ],
    academic: [
      "TIC Tours: co-developed a university programming platform.",
      "Unit conversion tool integrating external APIs, built in Python.",
      "Performance comparison simulator (single-cycle vs. pipelined processors) with an interactive HTML interface, built in Python.",
      "Designed and integrated relational databases across multiple academic projects.",
    ],
    skills: [
      ["Languages & Technologies", "TypeScript (intermediate) · JavaScript (basic-intermediate) · Node.js · Express · Python (intermediate) · SQL · React · Next.js · HTML · CSS · Java (basic)"],
      ["Backend, Data & Integrations", "REST APIs and HTTP integrations · PostgreSQL (Supabase) · RLS and SQL migrations · WebSockets · Cloudflare Workers · n8n · AI APIs (Groq, Llama 3.3 70B)"],
      ["Application Security", "server-side authorization and per-user data isolation (RLS) · JWT and Clerk authentication · least privilege · secrets handling · IDOR remediation · input validation"],
      ["Cybersecurity", "Kali Linux · Ethical Hacking · Penetration Testing · Vulnerability Analysis · Wazuh (SIEM) · Wireshark · nmap · Cisco NetAcad"],
      ["Servers & Infrastructure", "Linux server administration (Debian, Ubuntu, Kali) · Docker · Apache and HTTPS (Let's Encrypt) · ufw and fail2ban · cron monitoring and alerting · VPS and PaaS (GCP, Oracle Cloud, Fly.io, Render) · DNS/SSL · Git and GitHub"],
      ["Systems & Virtualization", "Linux (Debian, Ubuntu, Kali) · Windows · VMware · VirtualBox"],
      ["Tools & Platforms", "GitHub · WordPress · Breakdance · Figma (basic) · Jira · Excel (advanced) · CRM/ERP (Odoo, Salesforce) · Supabase"],
      ["Languages", "Spanish (native) · English (B1/B2)"],
    ],
    education: {
      title: "Engineering in Computer Technologies (TIC)", org: "Universidad Iberoamericana (UNIBE) | Santo Domingo, DR",
      date: "2023 - Present (expected graduation 2027)", note: "Concentrations: Cybersecurity and Software Development.",
    },
    certs:
      "Google Cybersecurity Professional Certificate (8 courses), Google/Coursera, Dec 2025 · Microsoft Cybersecurity Architect, Microsoft, Nov 2025 · Technical Introduction to Cybersecurity 3.0, Fortinet Training Institute, Oct 2025 · Network Technician Career Path, Cisco Networking Academy, Aug 2026 · Ethical Hacker, Cisco Networking Academy, Feb 2024 · Introduction to Cybersecurity, Cisco Networking Academy, Feb 2024 · Ethical Hacking and Pentesting, Hacker Mentor, Sep 2024 · Computer Security from Scratch, Udemy, Jan 2024 · NDG Linux Unhatched, Cisco/NDG, Jun 2024 · Digital Transformation, University of Virginia/BCG/Coursera, Oct 2025 · Generative AI Applications, Google Cloud/Coursera, Oct 2025",
    competencies: "Teamwork and collaboration · Problem-solving · Effective communication · Adaptability · Continuous learning · Time management",
  },
};

// ---------- Renderers ----------
const contactLine = (c) =>
  [
    c.location,
    "+1 809 966 2254",
    a(LINKS.email, "oscar@osnarci.online"),
    a(LINKS.linkedin, "LinkedIn"),
    a(LINKS.github, "GitHub"),
    a(LINKS.site, "osnarci.online"),
    a(LINKS.sss, "securitysmartservices.site"),
  ].join(" · ");

function classic(c, showNationality) {
  const jobs = c.jobs
    .map(
      (j) => `<div class="job"><h3>${esc(j.title)} | ${esc(j.org)} | ${esc(j.date)}</h3>${ul(j.bullets)}</div>`,
    )
    .join("");
  const projects = c.projects
    .map(
      (p) =>
        `<div class="proj"><h3>${esc(p.name)}${p.tag ? " | " + esc(p.tag) : ""}</h3>${
          p.url ? `<div class="url">${a(p.url[1], p.url[0])}</div>` : ""
        }${ul(p.bullets)}</div>`,
    )
    .join("");
  const skills = c.skills.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join("");
  return `<h1>Oscar O. Jimenez Peguero</h1>
<div class="sub">${esc(c.subtitle)}</div>
${showNationality ? `<div class="contact">${esc(c.nationality)}</div>` : ""}
<div class="contact">${contactLine(c)}</div>
<h2>${c.h.summary}</h2><p>${esc(c.summary)}</p>
<h2>${c.h.exp}</h2>${jobs}
<h2>${c.h.proj}</h2>${projects}
<h2>${c.h.acad}</h2>${ul(c.academic)}
<h2>${c.h.skills}</h2><div class="skills">${skills}</div>
<h2>${c.h.edu}</h2><div class="entry"><h3>${esc(c.education.title)} | ${esc(c.education.org)} | ${esc(c.education.date)}</h3><p>${esc(c.education.note)}</p></div>
<h2>${c.h.certs}</h2><p>${esc(c.certs)}</p>
<h2>${c.h.comp}</h2><p>${esc(c.competencies)}</p>`;
}

function europass(c) {
  const rows = [
    ["Address", c.location],
    ["Telephone", "+1 809 966 2254"],
    ["Email", a(LINKS.email, "oscar@osnarci.online")],
    ["LinkedIn", a(LINKS.linkedin, "linkedin.com/in/oscar-jimenez-cybersechack")],
    ["GitHub", a(LINKS.github, "github.com/oscarjnz")],
    ["Website / Portfolio", a(LINKS.site, "osnarci.online")],
    ["Project Website", a(LINKS.sss, "securitysmartservices.site")],
    ["Nationality", c.nationality],
  ]
    .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
    .join("");
  const jobs = c.jobs
    .map(
      (j) =>
        `<div class="job"><h3>${esc(j.date)} | ${esc(j.title)}</h3><div class="small">${esc(j.org)}</div>${ul(j.bullets)}</div>`,
    )
    .join("");
  // Europass: los stacks ya están en Digital Skills, se omiten en proyectos para caber en 3 páginas.
  const projects = c.projects
    .map(
      (p) =>
        `<div class="proj"><h3>${esc(p.name)}${p.tag ? " | " + esc(p.tag) : ""}</h3>${
          p.url ? `<div class="url">${a(p.url[1], p.url[0])}</div>` : ""
        }${ul(p.bullets.filter((b) => !b.startsWith("Stack:") && b !== "Zero-cost infrastructure."))}</div>`,
    )
    .join("");
  const skills = c.skills
    .filter(([k]) => k !== "Languages")
    .map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`)
    .join("");
  return `<h1>Oscar O. Jimenez Peguero</h1>
<div class="sub"><b>Curriculum Vitae | Europass Format</b></div>
<h2>Personal Information</h2><table class="info">${rows}</table>
<h2>About Me</h2><p>${esc(c.summary)}</p>
<h2>Work Experience</h2>${jobs}
<h2>Education and Training</h2><div class="entry"><h3>${esc(c.education.date.replace(/ \(.*\)/, ""))} | ${esc(c.education.title)}</h3><div class="small">${esc(c.education.org)}. Expected graduation: 2027, in line with the current curriculum plan.</div><p>${esc(c.education.note)}</p></div>
<h2>Personal Skills</h2>
<p><b>Mother tongue:</b> Spanish<br><b>Other language:</b> English</p>
<table class="grid"><tr><th></th><th colspan="2">Understanding</th><th colspan="2">Speaking</th><th rowspan="2">Writing</th></tr>
<tr><th></th><th>Listening</th><th>Reading</th><th>Spoken interaction</th><th>Spoken production</th></tr>
<tr><td><b>English</b></td><td>B1/B2</td><td>B1/B2</td><td>B1/B2</td><td>B1/B2</td><td>B1/B2</td></tr></table>
<p><b>Communication skills:</b> Effective communication developed through multicultural teamwork (FIFA U-17 Women's World Cup 2024) and cross-functional collaboration in an institutional IT department.</p>
<p><b>Organisational / managerial skills:</b> Workflow mapping and process optimization (CRM administration); event logistics coordination under time pressure.</p>
<p><b>Job-related skills:</b> Node.js/TypeScript backend development and SQL; application security (RLS, JWT authentication, least privilege, IDOR remediation); Linux server administration with Docker; vulnerability assessment and network monitoring; ethical hacking and penetration testing fundamentals; CRM/ERP administration (Odoo, Salesforce); relational database design; full-stack web application development.</p>
<h2>Digital Skills</h2>
<table class="grid"><tr><th>Information processing</th><th>Communication</th><th>Content creation</th><th>Safety</th><th>Problem solving</th></tr>
<tr><td>Advanced</td><td>Proficient</td><td>Proficient</td><td>Advanced</td><td>Proficient</td></tr></table>
<div class="skills">${skills}</div>
<h2>Additional Information</h2>
<h3>Certifications</h3><p>${esc(c.certs)}</p>
<h2>${c.h.proj}</h2>${projects}
<h3>${c.h.acad}</h3>${ul(c.academic)}`;
}

const page = (body, lang, title, cls = "") =>
  `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${CSS}</style></head><body class="${cls}">${body}</body></html>`;

const JOBS = [
  { file: "oscar-jimenez-resume-latam", html: page(classic(CONTENT.es, true), "es", "Oscar O. Jimenez Peguero, CV") },
  { file: "oscar-jimenez-resume-us", html: page(classic(CONTENT.en, false), "en", "Oscar O. Jimenez Peguero, Resume") },
  { file: "oscar-jimenez-resume-eu", html: page(europass(CONTENT.en), "en", "Oscar O. Jimenez Peguero, Curriculum Vitae", "eu") },
];

for (const j of JOBS) {
  const htmlPath = join(OUT_HTML, `${j.file}.html`);
  const pdfPath = join(OUT_PDF, `${j.file}.pdf`);
  writeFileSync(htmlPath, j.html, "utf8");
  execFileSync(
    CHROME,
    ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href],
    { stdio: "ignore", timeout: 60000 },
  );
  console.log("OK", pdfPath);
}
