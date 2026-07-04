import type { Localized } from "./types";

export interface BeyondHighlight {
  icon: string; // lucide-react icon name
  value: string;
  label: Localized;
}

export const beyondHighlights: BeyondHighlight[] = [
  {
    icon: "Trophy",
    value: "12",
    label: { es: "Años de béisbol competitivo", en: "Years of competitive baseball" },
  },
  {
    icon: "BarChart3",
    value: "MLB",
    label: { es: "Sabermetría y análisis", en: "Sabermetrics & analysis" },
  },
  {
    icon: "Dumbbell",
    value: "∞",
    label: { es: "Recomposición corporal", en: "Body recomposition" },
  },
];

export const beyondNote: Localized = {
  es: "La cancha me enseñó lo que ningún curso: constancia, leer el juego y mejorar cada día. Eso es exactamente lo que llevo a cada proyecto.",
  en: "The field taught me what no course could: consistency, reading the game and improving every day. That's exactly what I bring to every project.",
};
