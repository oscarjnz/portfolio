# Portfolio Oscar Jimenez — CLAUDE.md

**Última actualización:** 2026-07-03  
**Propósito:** Base central de conocimientos, decisiones de arquitectura, errores documentados, y evolución del proyecto.

---

## I. IDENTIDAD DEL PROYECTO

### Usuario
- **Nombre:** Oscar Jimenez (alias digital: Osnarci)
- **Edad:** 21 años (nació 26 enero 2005)
- **Ubicación:** Santo Domingo, República Dominicana
- **Email:** oscartronico1420@gmail.com (principal), oscar@osnarci.online (futura)
- **Dominio:** osnarci.online
- **Mercado:** Primariamente LATAM / hispanohablante

### Perfil Técnico
- **Experiencia:** ~2 años combinados (ciberseguridad, web dev, mobile intro)
- **Rol actual:** Estudiante ICT Engineering (UNIBE, 9-10º término) + Web Dev en departamento TIC
- **Identidad:** **NOT una agencia.** Portafolio personal de un desarrollador real con proyectos reales.

### Roles que rotan en Hero
1. Cybersecurity Enthusiast
2. Web Developer
3. ICT Engineering Student
4. Athlete

---

## II. STACK & DECISIONES TÉCNICAS

### Stack Confirmado
- **Frontend:** React 18+ + Vite + TypeScript + Tailwind CSS
- **Animations:** GSAP + Framer Motion
- **Video:** HLS.js (streaming de video de fondo)
- **Deployment:** Vercel (inicial); VPS privado (futuro)
- **Package Manager:** npm
- **Node Version:** 18+ (LTS)

### S.S.S. (Security Smart Services) — Stack Detallado
**Frontend:**
- React 18 + Vite + TypeScript (strict) + Tailwind CSS + shadcn/ui
- Clerk Auth (login, OAuth, JWT, registro)
- Vercel deployment (auto-deploy from main)

**Backend:**
- Express (Node/TS) en Render (free tier, hiberna @15min)
- Relay WebSocket en Fly.io (Miami) — pasarela WSS:443
- Scanner-agent local (Win/macOS/Linux) — ejecuta nmap/ping/traceroute
- APIs serverless en Vercel: sync KEV, CVE, OWASP, pwned-passwords, geo

**Database & Services:**
- Supabase PostgreSQL (free tier, RLS + Realtime)
- IA: Groq SDK (Llama 3.3 70B)
- Email: Resend (6 plantillas HTML en español)

**Arquitectura:** Nube + local. Scanner jamás toca red privada directamente; solo conexiones salientes WSS:443 hacia relay. Decisión de seguridad/privacidad.

### Decisiones Clave (INMUTABLES)

| Decisión | Reasoning | Estado |
|----------|-----------|--------|
| **Español primario** | Oscar opera en LATAM; español es idioma de usuario. Inglés como fallback. | ✅ Decidido |
| **Datos hardcodeados (Fase 1-2)** | Portafolio simple, sin CMS. Fácil de mantener, rápido. Estructura lista para futura migración a Headless CMS si es necesario. | ✅ Decidido |
| **Tema oscuro forzado** | Estética ciberseguridad + preferencia personal. Sin toggle de light mode (scope creep). | ✅ Decidido |
| **Sin template feel** | Oscar audita webs. Su portafolio debe demostrar craft. Custom > template. | ✅ Decidido |
| **Performance-first** | Oscar sabe de perf. Lazy load, optimize images, minimal JS. | ✅ Decidido |
| **Git desde inicio** | Historial limpio desde el comienzo. Commits semánticos. | ✅ Decidido |
| **Bilingüe (futuro)** | No MVP. Considerar como enhancement post-launch. i18n con react-i18next. | 🎯 Phase 5 |

---

## III. ARQUITECTURA & ESTRUCTURA DE CARPETAS (PROPUESTA)

```
portafolio/
├── public/
│   ├── images/
│   │   ├── projects/           # Screenshots de S.S.S., Nutriflow, etc.
│   │   ├── about/              # Foto de Oscar, deportes, etc.
│   │   └── favicons/
│   └── videos/                 # Fallback para HLS (si es necesario)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Section.tsx     # Wrapper reutilizable para secciones
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── LoadingScreen.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Pill.tsx
│   │   └── effects/
│   │       ├── ScrollIndicator.tsx
│   │       └── AnimatedGradient.tsx
│   ├── hooks/
│   │   ├── useScrollTrigger.ts
│   │   ├── useInView.ts
│   │   └── usePreferredLanguage.ts (futuro)
│   ├── data/
│   │   ├── projects.ts         # Array de proyectos (S.S.S., Nutriflow, etc.)
│   │   ├── skills.ts           # Skills organizadas por categoría
│   │   ├── about.ts            # Bio de Oscar
│   │   └── experience.ts       # Timeline educación + trabajo
│   ├── styles/
│   │   ├── index.css           # Global styles + custom animations
│   │   └── tailwind.css        # Tailwind directives
│   ├── utils/
│   │   ├── cn.ts              # Class name merger (clsx/classnames)
│   │   ├── animations.ts       # GSAP helpers
│   │   └── constants.ts        # Rutas, URLs, etc.
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .env.local                  # (No commits, .gitignore)
├── .gitignore
├── .claude/
│   └── settings.json           # Claude Code settings
├── CLAUDE.md                   # Este archivo 🧠
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── README.md                   # Setup instructions (en español + english)
```

---

## IV. PLAN DE FASES (ITERATIVO)

### **Phase 1: Setup + Loading Screen + Hero**
**Entrega:** Estructura React + Vite + TS + Tailwind lista. Navbar flotante funcional. Hero con video HLS.  
**Componentes:** LoadingScreen, Navbar, Hero  
**Tiempo:** ~3-4 horas (primera sesión)  
**Criterios de éxito:**
- [ ] Vite dev server corre sin errores
- [ ] TypeScript strict mode activo, sin errores
- [ ] Loading screen cuenta 000→100 en 2.7s
- [ ] Video HLS carga y reproduce (fallback a mp4 si falla)
- [ ] Navbar sticks on scroll > 100px
- [ ] Hero content anima al cargar (GSAP)
- [ ] Mobile responsive (mobile first)

### **Phase 2: About + Skills**
**Entrega:** Sección About (bio + intereses). Skills grid categorizado (Frontend, Backend, Cybersecurity, etc.)  
**Componentes:** About, Skills  
**Tiempo:** ~2 horas  
**Criterios:**
- [ ] About section con texto + datos reales de Oscar
- [ ] Skills: 3-4 categorías, badges animados al scroll
- [ ] Sin hardcoding de labels — data en `src/data/skills.ts`

### **Phase 3: Projects Showcase**
**Entrega:** 4 tarjetas de proyectos (S.S.S., Nutriflow, Active Calendar, Productivity OS). Lightbox/modal.  
**Componentes:** Projects, ProjectCard, ProjectModal  
**Tiempo:** ~2.5 horas  
**Criterios:**
- [ ] Grid responsivo (1 col mobile, 2-3 cols desktop)
- [ ] Hover effects (scale, overlay con descripción)
- [ ] Links funcionales (visitables)
- [ ] Lightbox al click (screenshot grande + descripción)
- [ ] Tech tags (React, Supabase, GSAP, etc.)

### **Phase 4: Experience + Contact**
**Entrega:** Timeline educación/trabajo. Contact CTA + footer.  
**Componentes:** Experience, Contact, Footer  
**Tiempo:** ~2 horas  
**Criterios:**
- [ ] Timeline visual (educación UNIBE, rol TIC dept)
- [ ] Contact form simple (email validation básico)
- [ ] Social links (GitHub, Twitter, LinkedIn, etc.)
- [ ] Footer con copyrights + theme toggle (future)

### **Phase 5: Polish + Optimizations**
**Entrega:** Animations refinadas, performance audits, PWA prep, SEO.  
**Actividades:**
- [ ] Lighthouse audit (90+)
- [ ] Smooth scroll nav entre secciones
- [ ] Animations más pulidas (tweaks GSAP)
- [ ] Image optimization (WebP, srcset)
- [ ] Meta tags, Open Graph
- [ ] Bilingüe toggle (i18n setup)
- [ ] Mobile viewport optimizations
- [ ] Testing en todos los navegadores (Chrome, Firefox, Safari, Mobile)

---

## V. ESTÁNDARES & CONVENCIONES

### Naming
- **Componentes:** PascalCase, `export default` siempre al final
  ```tsx
  // ✅ Good
  export default function Hero() { ... }
  
  // ❌ Avoid
  export const Hero = () => { ... }
  ```
- **Archivos:** kebab-case para utilities, PascalCase para componentes
  ```
  src/utils/scroll-helpers.ts  ✅
  src/components/Hero.tsx       ✅
  ```
- **Variables/Funciones:** camelCase
  ```ts
  const handleScrollTrigger = () => { ... }  ✅
  const MAGIC_NUMBER = 100;                  ✅
  ```

### CSS & Tailwind
- **Responsive:** Mobile-first (no prefijo = mobile, `sm:`, `md:`, `lg:`)
  ```tsx
  <div className="text-sm md:text-base lg:text-lg">
  ```
- **Dark theme:** Forzado. NO `dark:` prefixes necesarios (body ya es dark).
- **Custom animations:** Definir en `tailwind.config.js` si reutilizable.
- **Magic numbers:** Documentar si no son obvios.
  ```ts
  const SCROLL_THRESHOLD = 100; // Navbar shadow triggers here
  ```

### TypeScript
- **Strict mode:** Siempre `"strict": true` en tsconfig
- **No `any`:** Usar `unknown` + type guards si es necesario
- **Interfaces > Types:** Para props y data shapes
  ```tsx
  interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
  }
  ```

### GSAP & Animations
- **Timeline approach:** Whenever possible, group animations in a `gsap.timeline()` rather than scattered `gsap.to()` calls.
  ```ts
  // ✅ Good
  const tl = gsap.timeline({ delay: 0.1 });
  tl.to(".name", { opacity: 1, y: 0, duration: 1.2 });
  tl.to(".eyebrow", { opacity: 1, duration: 1 }, 0.1);
  
  // ❌ Avoid
  gsap.to(".name", { opacity: 1, y: 0, duration: 1.2, delay: 0.1 });
  gsap.to(".eyebrow", { opacity: 1, duration: 1, delay: 0.2 });
  ```
- **Avoid janky animations:** Use `ease: "power3.out"` or `"power2.inOut"` por defecto.

### Commits
- **Atomic:** Cada commit debe ser una unidad lógica completa (no "wip").
- **Messages (English, semántico):**
  ```
  feat: add loading screen with counter animation
  fix: hero video not loading on mobile
  style: update navbar spacing and border colors
  refactor: extract scroll trigger logic to hook
  docs: update CLAUDE.md with phase 1 learnings
  ```

---

## VI. CERTIFICACIONES — Análisis por Tier

### **TIER 1 — Mostrar en portafolio (prominente)**
*Estos 5 certificados son los "heavyweight" — ciberseguridad + evolución profesional*

1. **Google Cybersecurity Professional Certificate** (8 cursos) — Google/Coursera — Dec 2025
   - Status: Recent, comprehensive, industry-recognized
   - Image: `Coursera Google Cloud.pdf` (convertir a PNG)
   - Display: Logo + "8 courses" badge

2. **Microsoft Cybersecurity Architect** — Microsoft/Gold Learning Partner — Nov 2025
   - Status: Prestigious, indicates advanced level
   - Image: `251118 SC-100T00-A...pdf` (extraer)
   - Display: Microsoft logo + "Architect" badge

3. **Ethical Hacker** — Cisco Networking Academy — Feb 2024
   - Status: Industry standard, red-team credibility
   - Image: `ethical-hacker.png` (Ya existe ✅)
   - Display: Logo + Cisco badge

4. **Introduction to Cybersecurity** — Cisco — Feb 2024
   - Status: Foundational, paired with Ethical Hacker
   - Image: `introduction-to-cybersecurity.png` (Ya existe ✅)
   - Display: Logo + badge

5. **Fortinet NSE 1 - Technical Introduction to Cybersecurity 3.0** — Oct 2025
   - Status: Vendor-specific, current
   - Image: `NSE 1 - Fortinet.png` (Ya existe ✅)
   - Display: Fortinet logo + badge

### **TIER 2 — Mencionar en "Skills" section (no individual cards)**
*Estos complementan pero no son el foco principal*

- Ethical Hacking and Pentesting — Hacker Mentor — Sep 2024
- Computer Security from Scratch — Udemy (Thiago Araujo) — Jan 2024
- NDG Linux Unhatched — Cisco/NDG — Jun 2024
- Networking Basics — Cisco — Feb 2024
- English for IT 1 — Cisco/OpenEDG — Feb 2024

### **TIER 3 — En "About" como "continuous learning" (no mostrar PDFs)**
*HTML/CSS/Git/JS Logic de Alura/ONE — son básicos de grado*

- HTML & CSS: 4 cursos — Alura LATAM — Feb 2025
- Git & GitHub — Alura LATAM — Jan 2025
- Programming Logic: 2 cursos — Alura LATAM — Jan 2025

### **TIER 4 — Business/Soft Skills (mencionar si es necesario)**
- Digital Transformation — University of Virginia/BCG — Oct 2025
- Generative AI Applications — Google Cloud — Oct 2025
- ChatGPT: Optimizing Output Quality — Alura — Feb 2025
- Tech from Zero: Semiconductors — EOI — 2025
- Ladder Challenge: Industrial Automation — GingeLearn — Feb 2025

### **Imágenes de certificados disponibles en carpeta:**
- ✅ ethical-hacker.png
- ✅ introduction-to-cybersecurity.png
- ✅ networking-basics.png
- ✅ english-for-it-1.png
- ✅ NSE 1 - Fortinet.png
- ✅ FIFA Volunteer.png (bonus)
- ❌ Google Cybersecurity (hay PDF, necesito PNG)
- ❌ Microsoft Cybersecurity Architect (hay PDF, necesito PNG)

**Acción:** Necesito que conviertas los PDFs de Google y Microsoft a PNG o me confirmes si extraigo screenshots de los PDFs.

---

## VII. PROYECTOS EXISTENTES (Ya online)

### 1. **Security Smart Services** (S.S.S.) — FLAGSHIP
- **URL:** https://securitysmartservices.site
- **Status:** LIVE (ya en producción)
- **Descripción:** Platform para monitoreo de red en tiempo real
- **Stack:** React 18, Vite, TS, Tailwind, shadcn/ui, Clerk, Supabase, Groq, Express, Render, Fly.io

### 2. **osnarci.online** — Personal Site
- **URL:** https://osnarci.online
- **Status:** LIVE
- **Stack:** Vanilla HTML, CSS, JavaScript
- **Nota:** Este es su sitio personal actual. El portafolio nuevo REEMPLAZARÁ esta URL.

### 3. **Nutriflow** — (Del brief anterior, no reencontrado en carpeta)
- **URL:** https://nutriflow-sigma.vercel.app
- **Status:** Asumo LIVE
- **Stack:** Next.js, Supabase, Groq AI

### 4. **Active Calendar** — (Del brief anterior)
- **URL:** https://activecalendar.site
- **Status:** Asumo LIVE
- **Stack:** Cloudflare Workers, Supabase, Telegram Bot API

---

## VIII. DATOS PARA HARDCODEAR (src/data/)

### About section (del CV)
```
Name: Oscar O. Jimenez Peguero (alias: Osnarci)
Title: IT & Communications Engineering Student · Cybersecurity · Software Development
Location: Santo Domingo, Dominican Republic
Current role: CRM Assistant / Cybersecurity Analyst / Jr. Software Developer @ UNIBE
Semester: 9th (Graduation: 2027)
Email: oscarjimenez1410@gmail.com
Phone: +1 809 966 2254

Bio: "9th semester IT Engineering student with a solid grounding in software development, 
cybersecurity, and web technologies. Hands-on experience implementing and managing CRM 
platforms, conducting vulnerability assessments, and building full-stack web applications. 
Comfortable working across multidisciplinary teams and able to contribute meaningfully from day one. 
Driven by real-world problem-solving and continuous improvement."

Interests: 
- Cybersecurity (blue team primary, pentesting secondary)
- Full-stack web development
- Networking & Linux systems
- AI integration in projects
- Sports & baseball enthusiast
```

### Skills (del CV, reorganizado)
```
**Languages & Technologies:**
- Python (intermediate)
- SQL
- HTML, CSS
- JavaScript (basic-intermediate)
- TypeScript (basic)
- Java (basic)

**Cybersecurity:**
- Kali Linux, Ethical Hacking, Penetration Testing
- Vulnerability Analysis
- Cisco NetAcad
- Network monitoring, SIEM (implied)

**Frontend:**
- React 18, Vite
- Tailwind CSS, shadcn/ui
- GSAP, Framer Motion

**Backend:**
- Node.js, Express
- Supabase (PostgreSQL)
- Groq API
- Cloudflare Workers

**Tools & Platforms:**
- GitHub, GitLab
- Vercel, Render, Fly.io
- WordPress, Breakdance
- Figma (basic)
- Jira, Excel (advanced)
- CRM administration (Odoo, SuiteCRM, EspoCRM)

**Languages:**
- Spanish (native)
- English (B1/B2)
```

### Experience/Timeline
```
CURRENT (Jul 2025 - Present):
- CRM Assistant / Cybersecurity Analyst / Jr. Software Developer @ UNIBE
  - CRM platform implementation & management
  - Vulnerability assessments & network monitoring
  - WordPress/Breakdance website maintenance

VOLUNTEER (Oct - Nov 2024):
- Media Operations & Services @ FIFA U-17 Women's World Cup 2024
  - Logistical support & event coordination

EDUCATION:
- B.Eng. in Information and Communications Technology @ UNIBE (2023-2027, 9th semester)
```

---

## VI. ERRORES DOCUMENTADOS & LECCIONES

| Error | Causa | Solución | Evitar en futuro |
|-------|-------|----------|------------------|
| `tsconfig.node.json` build falla (TS6306/6310) | Proyecto referenciado necesita `composite: true` y no puede tener `noEmit` | Añadir `composite: true` + `emitDeclarationOnly: true` + `outDir` | Al usar project references, el referenciado siempre `composite` |
| `path` / `__dirname` no encontrados en vite.config | Falta `@types/node` | `npm i -D @types/node` + `"types": ["node"]` en tsconfig.node | Instalar @types/node desde el inicio en proyectos Vite |
| Tipos de traducción incompatibles (es vs en) | `as const` estrecha los literales; `"Home"` no asignable a `"Inicio"` | Quitar `as const` del objeto translations; los valores se ensanchan a `string` | No usar `as const` en diccionarios i18n con misma forma |
| Contenido invisible en tab de fondo | Chrome estrangula rAF en tabs inactivas → GSAP `.from()` y framer `whileInView` quedan en opacity:0 | Guard con `window.setTimeout` (independiente de rAF) que fuerza estado final visible | Toda animación de entrada que oculta contenido necesita fallback de reloj |

### Lección clave — Robustez de animaciones
Cualquier animación que empiece en `opacity: 0` (GSAP `.from`, framer `initial`) debe tener
un camino garantizado al estado visible que NO dependa de rAF, por si el navegador lo estrangula
(tab de fondo, throttling, JS lento). Patrón: `window.setTimeout` + set del estado final.
Implementado en `LoadingScreen.tsx` (fallback de completado) y `Hero.tsx` (guard de visibilidad).

---

## VII. DATOS CLAVE DEL PROYECTO

### Proyectos Destacados (hardcoded en Phase 1)

```typescript
// src/data/projects.ts

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  url: string;
  image: string; // ruta a public/images/projects/
  tags: string[];
  status: "live" | "in-progress" | "archived";
}

export const projects: Project[] = [
  {
    id: "s-s-s",
    title: "Security Smart Services",
    description: "Platform para pequeños negocios ganando visibilidad en su postura de ciberseguridad.",
    fullDescription: "...",
    url: "https://securitysmartservices.site",
    image: "/images/projects/s-s-s.png",
    tags: ["Cybersecurity", "Web", "TBD"],
    status: "live",
  },
  {
    id: "nutriflow",
    title: "Nutriflow",
    description: "App de nutrición y gestión de comidas para recomposición corporal.",
    fullDescription: "...",
    url: "https://nutriflow-sigma.vercel.app",
    image: "/images/projects/nutriflow.png",
    tags: ["Next.js", "Supabase", "Groq AI"],
    status: "live",
  },
  // ... más proyectos
];
```

### Skills Categories

```typescript
// src/data/skills.ts

interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React", "Vite", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Cloudflare Workers", "Supabase", "n8n"],
  },
  {
    name: "Cybersecurity",
    skills: ["Wazuh", "Network Monitoring", "Pentesting", "Web Exploitation"],
  },
  // ... más categorías
];
```

---

## VIII. CHECKLIST FINAL ANTES DE PHASE 1

### Imágenes necesarias (PRIORITY):

**TIER 1 — Critical (MVP):**
- [ ] S.S.S. screenshot (dashboard/hero) — JPG/PNG — 1200×800 min
- [ ] Google Cybersecurity cert — PNG (convertir PDF o screenshot)
- [ ] Microsoft Cybersecurity Architect cert — PNG (convertir PDF o screenshot)
- [ ] Tu foto de perfil — JPG/PNG — 400×400 min (headshot profesional)

**TIER 2 — Nice to have (Phase 2+):**
- [ ] Nutriflow screenshot
- [ ] Active Calendar screenshot
- [ ] Productivity OS screenshot
- [ ] Foto deportiva (opcional)

### Decisiones confirmadas:
- ✅ **Toggle i18n:** Sí, Context simple (no i18next)
- ✅ **Analytics:** Vercel Analytics (lightweight)
- ✅ **Certificados:** 5 TIER-1 como badges clickeables (PDF modal)
- ✅ **Email:** oscartronico1410@gmail.com
- ✅ **Placeholders:** Yo creo profesionales, sustituyes luego
- ✅ **Video:** HLS Mux + MP4 fallback
- ✅ **Proyectos:** S.S.S., Nutriflow, Active Calendar, Productivity OS
- ✅ **Dominio:** osnarci.online (reemplaza osnarci.online actual)

### PREGUNTAS PARA OSCAR:

1. ¿Tienes screenshots actualizados de S.S.S., Nutriflow, Active Calendar, Productivity OS?
2. ¿Puedes convertir Google + Microsoft certs a PNG? (O yo extraigo screenshots de PDFs)
3. ¿Tienes foto profesional de perfil? (Si no, uso placeholder)
4. ¿Algunos certificados de Tier 2 que deba incluir?

**Una vez confirms → iniciamos git init + Phase 1 sin parar** 🚀

---

## IX. RECURSOS & REFERENCIAS

- **Tailwind docs:** https://tailwindcss.com/docs
- **GSAP docs:** https://gsap.com/docs/v3/
- **Framer Motion:** https://www.framer.com/motion/
- **Vite guide:** https://vitejs.dev/guide/
- **React 18 API:** https://react.dev/reference/react
- **TypeScript:** https://www.typescriptlang.org/docs/

---

## X. CHECKLIST PRE-LAUNCH

- [ ] Todos los links funcionales (internos + externos)
- [ ] Imágenes optimizadas (WebP con jpg fallback)
- [ ] Mobile viewport `<meta name="viewport" ... />`
- [ ] Favicon + PWA manifest (futuro)
- [ ] OG tags para social sharing
- [ ] 404 page (si aplica)
- [ ] Robots.txt + sitemap.xml
- [ ] Lighthouse audit 90+
- [ ] Test en Chrome, Firefox, Safari, Mobile
- [ ] SEO keywords en meta description
- [ ] Console warnings/errors = 0
- [ ] Vercel deployment configurado + domains

---

**Status:** 🟡 In Planning  
**Última sesión:** 2026-07-03  
**Próxima acción:** Confirmar preguntas de Section VIII, luego iniciar Phase 1.
