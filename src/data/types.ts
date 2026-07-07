import type { Lang } from "@/i18n/translations";

/** A string that has both Spanish and English variants. */
export type Localized = Record<Lang, string>;

export interface Project {
  id: string;
  title: string; // brand name, same in both languages
  tagline: Localized;
  description: Localized;
  url: string;
  repo?: string;
  image: string;
  gallery?: string[];
  tags: string[];
  status: "live" | "in-progress" | "archived";
  flagship?: boolean;
  year: string;
}

export interface SkillCategory {
  id: string;
  name: Localized;
  icon: string; // lucide-react icon name
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string; // public verification link, when available
  tier: 1 | 2 | 3;
  category: "cybersecurity" | "networking" | "development" | "business";
}

export interface Resume {
  id: string;
  label: Localized; // region-oriented CV format
  note: Localized; // short hint about where the format fits
  file: string; // path under /public
}

export interface ExperienceItem {
  id: string;
  role: Localized;
  organization: string;
  period: Localized;
  description: Localized;
  type: "work" | "education" | "volunteer";
}
