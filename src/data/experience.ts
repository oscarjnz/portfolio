import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "unibe-tic",
    role: {
      es: "Asistente CRM · Analista de Ciberseguridad · Dev Jr.",
      en: "CRM Assistant · Cybersecurity Analyst · Jr. Developer",
    },
    organization: "Universidad Iberoamericana (UNIBE)",
    organizationUrl: "https://unibe.edu.do",
    period: { es: "Jul 2025 - Actualidad", en: "Jul 2025 - Present" },
    description: {
      es: "Implementación y gestión del CRM institucional dentro del departamento de TIC, mapeando flujos y optimizando procesos. Evaluaciones de vulnerabilidades, monitoreo de red y administración de servidores. Mantenimiento y mejora del sitio institucional (WordPress / Breakdance).",
      en: "Implementation and management of the institutional CRM within the IT department, mapping workflows and optimizing processes. Vulnerability assessments, network monitoring and server administration. Maintenance and improvement of the institutional website (WordPress / Breakdance).",
    },
    type: "work",
  },
  {
    id: "fifa-volunteer",
    role: {
      es: "Voluntario oficial · Operación de medios y servicios",
      en: "Official volunteer · Media operations and services",
    },
    organization: "FIFA U-17 Women's World Cup 2024",
    organizationUrl:
      "https://www.fifa.com/en/tournaments/womens/u17womensworldcup/dominican-republic-2024",
    period: { es: "Oct - Nov 2024", en: "Oct - Nov 2024" },
    description: {
      es: "Soporte logístico y coordinación de eventos en un torneo internacional de alto perfil, colaborando con equipos multiculturales bajo condiciones operativas exigentes.",
      en: "Logistical support and event coordination for a high-profile international tournament, collaborating with multicultural teams under demanding operational conditions.",
    },
    type: "volunteer",
  },
  {
    id: "unibe-degree",
    // role/description below are unused placeholders: Experience.tsx always
    // overrides this entry from src/data/academicStatus.ts, since the title
    // and description change with academic status (student / egresado /
    // engineer). Kept only because ExperienceItem requires the fields.
    role: {
      es: "Ingeniería en Tecnologías Computacionales (TIC)",
      en: "Engineering in Computer Technologies (TIC)",
    },
    organization: "Universidad Iberoamericana (UNIBE)",
    organizationUrl: "https://unibe.edu.do",
    // Cuatrimestre / egresado status appended dynamically in Experience.tsx.
    period: {
      es: "2023 - 2027",
      en: "2023 - 2027",
    },
    description: {
      es: "Formación en desarrollo de software, ciberseguridad, redes y tecnologías web. Proyectos académicos en bases de datos relacionales, simuladores de arquitectura de procesadores y herramientas con integración de APIs.",
      en: "Training in software development, cybersecurity, networking and web technologies. Academic projects in relational databases, processor architecture simulators and API-integrated tools.",
    },
    type: "education",
  },
];
