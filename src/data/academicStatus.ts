import type { Localized } from "./types";
import type { AcademicStatus } from "@/utils/academicTerm";

// Copy that changes across the three academic phases (student, egresado
// waiting on the ceremony, and graduated engineer). Centralized here so
// Hero, About and Experience all read from the same source instead of each
// re-deriving the wording. See src/utils/academicTerm.ts for the dates that
// pick which phase is active.
export interface AcademicStatusContent {
  heroRole: Localized; // third rotating role in the Hero
  aboutSubtext: Localized; // About section eyebrow subtext
  aboutIntro: Localized; // opening About paragraph
  degreeRole: Localized; // title shown on the UNIBE entry in Experience
  degreeDescription: Localized; // description on that same entry
}

const CONCENTRATIONS = { es: "Ciberseguridad y Desarrollo de Software", en: "Cybersecurity and Software Development" };

export const ACADEMIC_STATUS_CONTENT: Record<AcademicStatus, AcademicStatusContent> = {
  student: {
    heroRole: { es: "Estudiante de Ingeniería TIC", en: "ICT engineering student" },
    aboutSubtext: {
      es: "Estudiante de Ingeniería TIC, analista de ciberseguridad y desarrollador.",
      en: "ICT Engineering student, cybersecurity analyst and developer.",
    },
    aboutIntro: {
      es: "Tengo 21 años y estudio Ingeniería en Tecnologías Computacionales (TIC) en UNIBE, en Santo Domingo, con concentraciones en Ciberseguridad y Desarrollo de Software. Trabajo en el departamento de TIC de la universidad, donde toco ciberseguridad, desarrollo web y administración de CRM en el día a día.",
      en: "I'm 21 and study Engineering in Computer Technologies (TIC) at UNIBE in Santo Domingo, concentrating in Cybersecurity and Software Development. I work in the university's IT department, where I handle cybersecurity, web development and CRM administration day to day.",
    },
    degreeRole: {
      es: "Ingeniería en Tecnologías Computacionales (TIC)",
      en: "Engineering in Computer Technologies (TIC)",
    },
    degreeDescription: {
      es: `Formación en desarrollo de software, ciberseguridad, redes y tecnologías web, con concentraciones en ${CONCENTRATIONS.es}. Proyectos académicos en bases de datos relacionales, simuladores de arquitectura de procesadores y herramientas con integración de APIs.`,
      en: `Training in software development, cybersecurity, networking and web technologies, concentrating in ${CONCENTRATIONS.en}. Academic projects in relational databases, processor architecture simulators and API-integrated tools.`,
    },
  },
  graduate: {
    heroRole: { es: "Egresado en Ingeniería TIC", en: "ICT engineering graduate" },
    aboutSubtext: {
      es: "Egresado de Ingeniería TIC, analista de ciberseguridad y desarrollador.",
      en: "ICT Engineering graduate, cybersecurity analyst and developer.",
    },
    aboutIntro: {
      es: "Soy egresado de Ingeniería en Tecnologías Computacionales (TIC) por UNIBE, en Santo Domingo, con concentraciones en Ciberseguridad y Desarrollo de Software, a la espera de la ceremonia de graduación. Trabajo en el departamento de TIC de la universidad, donde toco ciberseguridad, desarrollo web y administración de CRM en el día a día.",
      en: "I'm a graduate of Engineering in Computer Technologies (TIC) from UNIBE in Santo Domingo, concentrating in Cybersecurity and Software Development, awaiting the graduation ceremony. I work in the university's IT department, where I handle cybersecurity, web development and CRM administration day to day.",
    },
    degreeRole: {
      es: "Ingeniería en Tecnologías Computacionales (TIC)",
      en: "Engineering in Computer Technologies (TIC)",
    },
    degreeDescription: {
      es: `Formación en desarrollo de software, ciberseguridad, redes y tecnologías web, con concentraciones en ${CONCENTRATIONS.es}. Proyectos académicos en bases de datos relacionales, simuladores de arquitectura de procesadores y herramientas con integración de APIs. Tesis final presentada, en espera de la ceremonia de graduación.`,
      en: `Training in software development, cybersecurity, networking and web technologies, concentrating in ${CONCENTRATIONS.en}. Academic projects in relational databases, processor architecture simulators and API-integrated tools. Final thesis presented, awaiting the graduation ceremony.`,
    },
  },
  engineer: {
    heroRole: { es: "Ingeniero en Tecnologías Computacionales", en: "Computer Technologies Engineer" },
    aboutSubtext: {
      es: "Ingeniero en Tecnologías Computacionales, analista de ciberseguridad y desarrollador.",
      en: "Computer Technologies Engineer, cybersecurity analyst and developer.",
    },
    aboutIntro: {
      es: "Soy Ingeniero en Tecnologías Computacionales (TIC) por UNIBE, en Santo Domingo, con concentraciones en Ciberseguridad y Desarrollo de Software. Trabajo en el departamento de TIC de la universidad, donde toco ciberseguridad, desarrollo web y administración de CRM en el día a día.",
      en: "I'm an Engineer in Computer Technologies (TIC) from UNIBE in Santo Domingo, concentrating in Cybersecurity and Software Development. I work in the university's IT department, where I handle cybersecurity, web development and CRM administration day to day.",
    },
    degreeRole: {
      es: "Ingeniero en Tecnologías Computacionales (TIC)",
      en: "Engineer in Computer Technologies (TIC)",
    },
    degreeDescription: {
      es: `Formación en desarrollo de software, ciberseguridad, redes y tecnologías web, con concentraciones en ${CONCENTRATIONS.es}. Proyectos académicos en bases de datos relacionales, simuladores de arquitectura de procesadores y herramientas con integración de APIs.`,
      en: `Training in software development, cybersecurity, networking and web technologies, concentrating in ${CONCENTRATIONS.en}. Academic projects in relational databases, processor architecture simulators and API-integrated tools.`,
    },
  },
};
