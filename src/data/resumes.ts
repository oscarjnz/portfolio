import type { Resume } from "./types";

// Region-oriented CV variants. Each PDF lives under /public/cv/<region>/ with the
// SAME generic filename (oscar-jimenez-resume.pdf) so no region jargon shows in the
// href, the tab title or the saved file. Regenerate with `node cv-src/build.mjs`.
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
    file: "/cv/us/oscar-jimenez-resume.pdf",
    downloadName: "oscar-jimenez-resume.pdf",
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
    file: "/cv/eu/oscar-jimenez-resume.pdf",
    downloadName: "oscar-jimenez-resume.pdf",
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
    file: "/cv/latam/oscar-jimenez-resume.pdf",
    downloadName: "oscar-jimenez-resume.pdf",
  },
];
