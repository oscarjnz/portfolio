import type { Resume } from "@/data/types";

// Silent, IP-based country lookup (no permission prompt, unlike
// navigator.geolocation). Good enough to pick a CV region and fails
// gracefully: any error or ambiguous response falls back to null, and the
// caller shows every CV instead of guessing wrong.
const GEO_ENDPOINT = "https://ipapi.co/country/";
const FETCH_TIMEOUT_MS = 4000;

const ANGLO_COUNTRIES = new Set(["US", "GB", "CA", "AU", "NZ"]);
const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
]);

export function resumeIdForCountry(countryCode: string): Resume["id"] {
  const cc = countryCode.trim().toUpperCase();
  if (ANGLO_COUNTRIES.has(cc)) return "anglosajon";
  if (EU_COUNTRIES.has(cc)) return "europass";
  return "latam";
}

export async function detectResumeByLocation(): Promise<Resume["id"] | null> {
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(GEO_ENDPOINT, { signal: controller.signal });
    window.clearTimeout(timeout);
    if (!res.ok) return null;
    const country = (await res.text()).trim();
    if (!/^[A-Za-z]{2}$/.test(country)) return null;
    return resumeIdForCountry(country);
  } catch {
    return null;
  }
}
