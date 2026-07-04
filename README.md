# Oscar Jimenez · Portfolio

Portafolio personal de **Oscar Jimenez** (*Osnarci*): ciberseguridad y desarrollo web full-stack.

Sitio de una sola página, tema oscuro, bilingüe (ES/EN), construido con foco en performance.

**Live:** [osnarci.online](https://osnarci.online) · **Contacto:** oscar@osnarci.online

---

## Stack

- **React 18** + **Vite** + **TypeScript** (strict)
- **Tailwind CSS**: design system con variables HSL
- **GSAP**: animación de entrada del hero y marquee
- **Framer Motion**: transiciones on-scroll y modales
- **Video de fondo**: MP4 auto-hospedado (`public/videos/hero.mp4`, ~2.6MB)
- **Vercel Analytics**: métricas ligeras

## Secciones

Loading screen → Hero → Sobre mí → Skills → Proyectos → Certificaciones → Trayectoria → Contacto.

## Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (localhost:5173)
npm run build    # build de producción (tsc + vite)
npm run preview  # previsualizar el build
```

## Estructura

```
src/
├── components/
│   ├── layout/      # Navbar
│   ├── sections/    # Hero, About, Skills, Work, Certifications, Experience, Contact, LoadingScreen
│   └── ui/          # SectionHeader, LanguageToggle
├── data/            # contenido bilingüe hardcodeado (projects, skills, certs, experience, about)
├── hooks/           # useHlsVideo, useScrollProgress
├── i18n/            # LanguageContext + translations (ES/EN)
├── styles/          # index.css (design system + animaciones)
└── utils/           # cn, constants
```

## Contenido

Todo el contenido vive en `src/data/` como objetos `{ es, en }`. Para editar proyectos,
skills o certificaciones se modifican esos archivos, sin CMS.

## Deployment

Auto-deploy en Vercel desde `main`. Build command: `npm run build`, output: `dist/`.

---

Diseñado y construido por Oscar Jimenez. Con [Claude Code](https://claude.com/claude-code).
