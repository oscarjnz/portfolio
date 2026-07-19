import type { Certification } from "./types";

// Tier 1 = flagship (large feature cards). Tier 2 = supporting (image
// thumbnails / pills). Tier 3 = complementary coursework (pills).
//
// `image` is the Credly badge icon (clickable, shown on the card). When a
// designed certificate/diploma exists it goes in `certificateImage` and is
// what the popup shows; otherwise the popup falls back to the badge itself.
// `credentialUrl` is the public Credly verification link for that badge
// (source: public/images/badges/public_badge_link.txt). A few badge images
// have no matching entry in that file yet, so they show without a verify link.
export const certifications: Certification[] = [
  // ── Tier 1 · flagship ────────────────────────────────────────────────
  {
    id: "google-cybersecurity",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google · Coursera",
    date: "2025-12",
    image: "/images/badges/certificado-de-ciberseguridad-de-google.png",
    certificateImage: "/images/certificates/google.webp",
    credentialUrl:
      "https://www.credly.com/badges/7ac3c636-122c-452e-8d74-d39aeeb72918/public_url",
    tier: 1,
    category: "cybersecurity",
  },
  {
    id: "microsoft-cybersecurity-architect",
    title: "Microsoft Cybersecurity Architect",
    issuer: "Microsoft · Gold Learning Partner",
    date: "2025-11",
    image: "/images/certificates/microsoft.webp",
    tier: 1,
    category: "cybersecurity",
  },
  {
    id: "fortinet-nse1",
    title: "Fortinet NSE 1 · Introduction to the Threat Landscape",
    issuer: "Fortinet Training Institute",
    date: "2025-10",
    image: "/images/badges/fortinet-nse-1-certified-in-cybersecurity.png",
    certificateImage: "/images/certificates/fortinet-nse1.webp",
    credentialUrl:
      "https://www.credly.com/badges/2dd6bcf8-1c25-4101-9c2d-592477988ecd/public_url",
    tier: 1,
    category: "cybersecurity",
  },
  {
    id: "ethical-hacker",
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "2024-02",
    image: "/images/badges/ethical-hacker.png",
    certificateImage: "/images/certificates/ethical-hacker.webp",
    credentialUrl:
      "https://www.credly.com/badges/1c44bd94-975a-4712-88ac-ec64a066c916/public_url",
    tier: 1,
    category: "cybersecurity",
  },
  {
    id: "intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024-02",
    image: "/images/badges/introduction-to-cybersecurity.png",
    certificateImage: "/images/certificates/intro-cybersecurity.webp",
    tier: 1,
    category: "cybersecurity",
  },

  // ── Tier 2 · supporting ──────────────────────────────────────────────
  {
    // No image on purpose: the source certificate exposes a national ID
    // number and a QR code, so it is listed as text only.
    id: "talento-ciberseguridad-intermedio",
    title: "Ciberseguridad · Nivel Intermedio (80h)",
    issuer: "INDOTEL · BID · Cymetria",
    date: "2026-01",
    tier: 2,
    category: "cybersecurity",
  },
  {
    id: "fortinet-threat-landscape",
    title: "Introduction to the Threat Landscape 3.0",
    issuer: "Fortinet Training Institute",
    date: "2025-10",
    image: "/images/badges/introduction-to-the-threat-landscape-3-0.png",
    certificateImage: "/images/certificates/fortinet2.webp",
    tier: 2,
    category: "cybersecurity",
  },
  {
    id: "fortinet-getting-started",
    title: "Getting Started in Cybersecurity 3.0",
    issuer: "Fortinet Training Institute",
    date: "2025-10",
    image: "/images/badges/getting-started-in-cybersecurity-3-0.png",
    certificateImage: "/images/certificates/fortinet3.webp",
    tier: 2,
    category: "cybersecurity",
  },
  {
    id: "fortinet-technical-intro",
    title: "Technical Introduction to Cybersecurity 3.0",
    issuer: "Fortinet Training Institute",
    date: "2025-10",
    image: "/images/badges/technical-introduction-to-cybersecurity-3-0.png",
    certificateImage: "/images/certificates/fortinet1.webp",
    credentialUrl:
      "https://www.credly.com/badges/dec4c1a8-d9c2-4c9d-8115-e5d2c13c1a0e/public_url",
    tier: 2,
    category: "cybersecurity",
  },
  {
    id: "fortinet-nse2",
    title: "Fortinet NSE 2 · Certified in Cybersecurity",
    issuer: "Fortinet Training Institute",
    date: "2025-10",
    image: "/images/badges/fortinet-nse-2-certified-in-cybersecurity.1.png",
    credentialUrl:
      "https://www.credly.com/badges/208f1f49-f9b9-4162-b4fe-9b1b00cf68c8/public_url",
    tier: 2,
    category: "cybersecurity",
  },
  {
    id: "fortinet-certified-fundamentals",
    title: "Fortinet Certified Fundamentals · Cybersecurity",
    issuer: "Fortinet Training Institute",
    date: "2025-10",
    image: "/images/badges/fortinet-certified-fundamentals-cybersecurity.png",
    credentialUrl:
      "https://www.credly.com/badges/0b459e77-cca6-4467-a41d-c10a80dc24fd/public_url",
    tier: 2,
    category: "cybersecurity",
  },
  {
    id: "cisco-network-devices",
    title: "Network Devices and Initial Configuration",
    issuer: "Cisco Networking Academy",
    date: "2025-12",
    image: "/images/badges/networking-devices-and-initial-configuration.png",
    certificateImage: "/images/certificates/cisco1.webp",
    credentialUrl:
      "https://www.credly.com/badges/071973d7-3b96-443c-b8b5-a16dac509d44/public_url",
    tier: 2,
    category: "networking",
  },
  {
    id: "cisco-network-addressing",
    title: "Network Addressing and Basic Troubleshooting",
    issuer: "Cisco Networking Academy",
    date: "2025-12",
    image: "/images/badges/network-addressing-and-basic-troubleshooting.png",
    certificateImage: "/images/certificates/cisco2.webp",
    credentialUrl:
      "https://www.credly.com/badges/33386b68-02bc-4698-87e9-2b54d766450a/public_url",
    tier: 2,
    category: "networking",
  },
  {
    id: "networking-basics",
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "2024-02",
    image: "/images/badges/networking-basics.png",
    certificateImage: "/images/certificates/networking-basics.webp",
    credentialUrl:
      "https://www.credly.com/badges/b2eb3e6b-2b14-4178-b2e5-ccc9ff45337a/public_url",
    tier: 2,
    category: "networking",
  },
  {
    id: "english-for-it",
    title: "English for IT 1",
    issuer: "Cisco · OpenEDG",
    date: "2024-02",
    image: "/images/badges/english-for-it-1.png",
    certificateImage: "/images/certificates/english-for-it.webp",
    credentialUrl:
      "https://www.credly.com/badges/d9b12861-64f8-437c-8268-fce52b624416/public_url",
    tier: 2,
    category: "networking",
  },
  {
    id: "ethical-hacking-pentesting",
    title: "Ethical Hacking y Pentesting",
    issuer: "Hacker Mentor",
    date: "2024-09",
    tier: 2,
    category: "cybersecurity",
  },
  {
    id: "ndg-linux",
    title: "NDG Linux Unhatched",
    issuer: "Cisco · NDG",
    date: "2024-06",
    tier: 2,
    category: "networking",
  },

  // ── Tier 3 · complementary ───────────────────────────────────────────
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    issuer: "University of Virginia · BCG",
    date: "2025-10",
    tier: 3,
    category: "business",
  },
  {
    id: "genai-google",
    title: "Generative AI Applications",
    issuer: "Google Cloud · Coursera",
    date: "2025-10",
    tier: 3,
    category: "business",
  },
  {
    id: "scrum-foundation-learner-2025",
    title: "Scrum Foundation Learner 2025",
    issuer: "Certiprof",
    date: "2025-11",
    image: "/images/badges/scrum-foundation-learner-2025.png",
    credentialUrl:
      "https://www.credly.com/badges/6f443272-5b1f-4021-8884-9fe59daeb1f9/public_url",
    tier: 3,
    category: "business",
  },
  {
    id: "lifelong-learning-2026",
    title: "Lifelong Learning 2026",
    issuer: "Certiprof",
    date: "2026-01",
    image: "/images/badges/lifelong-learning-2026.png",
    credentialUrl:
      "https://www.credly.com/badges/a3abf07e-4985-4db8-ab30-6dae4f700f8c/public_url",
    tier: 3,
    category: "business",
  },
];
