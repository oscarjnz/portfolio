// UNIBE runs three four-month cuatrimestres per year (Ene-Abr, May-Ago,
// Sep-Dic), not two semesters. Oscar's program (Ingeniería en Tecnologías
// Computacionales) started in the Sep-Dic 2023 term (term 1) and finishes
// in the May-Ago 2027 term (term 12). This computes which cuatrimestre is
// current from the system date, so the site never needs a manual update
// until graduation.
const PROGRAM_START_YEAR = 2023;
const PROGRAM_START_MONTH = 8; // September, 0-indexed
const TOTAL_TERMS = 12;

export function getCurrentTerm(now: Date = new Date()): number {
  const monthsSinceStart =
    (now.getFullYear() - PROGRAM_START_YEAR) * 12 +
    (now.getMonth() - PROGRAM_START_MONTH);
  const term = Math.floor(monthsSinceStart / 4) + 1;
  return Math.min(Math.max(term, 1), TOTAL_TERMS);
}

export function formatTermLabel(term: number, lang: "es" | "en"): string {
  if (lang === "es") return `${term}.º cuatrimestre`;
  return `${term}${ordinalSuffixEn(term)} term`;
}

function ordinalSuffixEn(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Three-phase academic status. Coursework (and the thesis defense) wraps up
// with the May-Ago 2027 term, but the actual UNIBE colación (graduation
// ceremony) isn't until November 2027, so there's a real gap where Oscar has
// finished the degree but hasn't formally received it yet. Exact ceremony
// day is a placeholder (Nov 1) pending the official date from UNIBE.
export type AcademicStatus = "student" | "graduate" | "engineer";

const COURSEWORK_END = new Date(2027, 7, 31); // Aug 31, 2027 — end of term 12
const CEREMONY_DATE = new Date(2027, 10, 1); // Nov 1, 2027 — placeholder, confirm exact date

export function getAcademicStatus(now: Date = new Date()): AcademicStatus {
  if (now < COURSEWORK_END) return "student";
  if (now < CEREMONY_DATE) return "graduate";
  return "engineer";
}
