import type { Resume } from "./types";

// Region-oriented CV variants. Each PDF lives under /public/cv and is served
// directly. Swapping a file only requires replacing it in that folder.
export const resumes: Resume[] = [
  {
    id: "anglosajon",
    label: {
      es: "Anglosajón",
      en: "Anglo",
    },
    note: {
      es: "EE. UU., Reino Unido, Canadá, Australia",
      en: "US, UK, Canada, Australia",
    },
    file: "/cv/resume-anglosajon.pdf",
  },
  {
    id: "europass",
    label: {
      es: "Europass",
      en: "Europass",
    },
    note: {
      es: "Estándar de la Unión Europea",
      en: "European Union standard",
    },
    file: "/cv/resume-europass.pdf",
  },
  {
    id: "latam",
    label: {
      es: "LATAM / Europa continental",
      en: "LATAM / Continental Europe",
    },
    note: {
      es: "Latinoamérica y Europa continental",
      en: "Latin America and continental Europe",
    },
    file: "/cv/resume-latam_europa_continental.pdf",
  },
];
