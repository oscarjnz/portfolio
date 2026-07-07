# AUDIT.md — Auditoría de portafolio Oscar Jimenez

**Fecha:** 2026-07-07
**Alcance:** Código real en `src/`, `index.html`, `public/`, config de build. FASE A (solo diagnóstico, sin cambios de código).
**Método:** Lectura archivo por archivo de las 8 secciones + data + i18n + estilos. `npm run build` ejecutado. `npm run lint` **no ejecutable** (ver H-8).

## Línea base medida

| Métrica | Valor real | Referencia CLAUDE.md |
|---|---|---|
| Build | ✅ pasa (`tsc -b && vite build`, 8.5s) | — |
| JS inicial (no-lazy, gzip) | vendor 43.2 + animations 68.3 + index 7.7 ≈ **119 KB gzip** | ~127 KB (coincide) |
| Chunk `animations` (GSAP + Framer Motion) | **68.3 KB gzip** (el mayor peso, con diferencia) | — |
| CSS | 5.35 KB gzip | — |
| `npm run lint` | ❌ **no corre** (config obsoleta) | "cero warnings" (no verificable hoy) |

Nota: varios datos de CLAUDE.md están desactualizados vs. el código (LoadingScreen ya no dura 2.7s sino 0.5–1.6s; email ya es `oscar@osnarci.online`). Se corrige en L-5.

---

## CRÍTICO — rompe accesibilidad / experiencia

### C-1 · Modal de proyectos sin accesibilidad de teclado
**Ubicación:** `src/components/sections/Work.tsx:118-217` (`ProjectModal`)
**Problema:** El lightbox no cierra con `Escape`, no atrapa el foco (focus trap), no mueve el foco al abrir ni lo restaura al cerrar, no bloquea el scroll del `body` detrás, y no declara `role="dialog"` / `aria-modal="true"` / `aria-label`. Solo cierra con click en el backdrop.
**Por qué importa:** Un usuario de teclado/lector de pantalla queda atrapado: puede abrir el modal pero no cerrarlo sin ratón, y el foco sigue vagando por la página de fondo. Es el defecto de accesibilidad más concreto del sitio y el prompt lo señaló explícitamente.
**Fix propuesto:** `useEffect` que (1) escuche `keydown` Escape → `onClose`; (2) al montar, guarde `document.activeElement`, mueva foco al panel y bloquee `body.style.overflow`; (3) al desmontar restaure ambos. Añadir `role="dialog" aria-modal="true" aria-label={project.title}`. Trap de foco mínimo con ciclo Tab entre elementos enfocables del panel.

### C-2 · Sin estados de foco visibles (`:focus-visible`) en ningún elemento interactivo
**Ubicación:** global — `src/styles/index.css` (no hay regla de foco) + todos los `<button>`/`<a>` de Navbar, Work, Hero, LanguageToggle, Contact.
**Problema:** Ningún elemento interactivo define `focus-visible:`. La navegación por teclado depende del outline por defecto del navegador, que sobre fondo casi-negro (`--bg: 0 0% 4%`) es prácticamente invisible.
**Por qué importa:** Accesibilidad WCAG 2.4.7 (Focus Visible). Además la sección Skills anuncia "Accesibilidad (a11y)", "axe-core", "pa11y" como habilidad — un reclutador que tabule el sitio ve lo contrario (ver H-3).
**Fix propuesto:** Regla base global de `:focus-visible` con anillo de acento (`outline` o `ring` con el gradiente/azul `#4E85BF`) y `outline-offset`, más utilidades `focus-visible:` en los componentes de pill/botón. Respetar que no aparezca en click (usar `:focus-visible`, no `:focus`).

---

## ALTO — daña la primera impresión o la credibilidad técnica

### H-1 · `og:image` apunta a un archivo inexistente + faltan tags sociales
**Ubicación:** `index.html:26` (`og:image = /images/og-image.png`)
**Problema:** No existe `public/images/og-image.png` (verificado). Además falta `twitter:image` (la card declara `summary_large_image` pero sin imagen), falta `<link rel="canonical">`, y `og:image:width/height/alt`.
**Por qué importa:** Cualquier link compartido en LinkedIn, WhatsApp o Twitter renderiza sin preview o roto. Para un portafolio que se comparte con reclutadores, es la primera impresión antes de entrar al sitio.
**Fix propuesto:** Generar una `og-image.png` (1200×630) con nombre/rol/paleta del sitio, referenciarla con URL absoluta, añadir `twitter:image`, `canonical` y `og:image:alt` bilingüe. **Pendiente de Oscar:** ¿generamos la OG image o la aporta él?

### H-2 · "Productivity OS" se presenta como proyecto terminado y su link es autorreferencial
**Ubicación:** `src/data/projects.ts:75-97` + `src/components/sections/Work.tsx`
**Problema:** (a) Tiene `status: "in-progress"` pero la UI **nunca** renderiza el campo `status` — se muestra idéntico a los 3 proyectos `live`. (b) Su `url` es `https://osnarci.online`, que según CLAUDE.md es el dominio que **este mismo portafolio reemplazará**: hoy apunta al sitio viejo y tras el deploy apuntará a sí mismo.
**Por qué importa:** El prompt exige que lo "en progreso" se comunique como tal. Presentar algo inacabado como live y con un link que quedará roto debilita la narrativa de "developer real que no infla".
**Fix propuesto:** (1) Renderizar un badge "En progreso / In progress" cuando `status !== "live"` (par ES/EN). (2) Confirmar con Oscar la URL real de Productivity OS o marcarlo sin link visitable mientras no exista destino estable.

### H-3 · El sitio contradice las habilidades de auditoría que anuncia
**Ubicación:** `src/data/skills.ts:81-93` (categoría "Auditoría Web": Lighthouse, pa11y, axe-core, Accesibilidad, Performance, SEO) vs. C-1, C-2, H-1, H-4.
**Problema:** El portafolio se declara experto en accesibilidad, performance y SEO técnico, pero falla en accesibilidad de teclado (C-1, C-2), contraste (H-4) y meta tags/SEO (H-1). Es la categoría de skill que invita literalmente al reclutador a auditar el sitio.
**Por qué importa:** Riesgo de credibilidad directo. Un revisor técnico que corra axe/Lighthouse (justo lo que la sección presume) encontrará hallazgos. Este es el meta-hallazgo que hace que C-1/C-2/H-1/H-4 pasen de "pulido" a "prioridad".
**Fix propuesto:** Resolver C-1, C-2, H-1, H-4 antes de cualquier pulido estético. No es un cambio de código en sí, es el orden de prioridad.

### H-4 · Texto `muted` a opacidad reducida falla contraste WCAG AA
**Ubicación:** `src/components/sections/Certifications.tsx:55` (`text-muted/70`, fechas), `src/components/sections/Contact.tsx:117` (`text-muted/70`, copyright/footer).
**Problema:** `--muted` es `hsl(0 0% 53%)` (≈ #878787). A opacidad plena sobre `--bg` da ≈ 5.2:1 (pasa). Pero a `/70` sobre el fondo casi-negro el color compuesto cae a ≈ 3.3:1 en texto pequeño (`text-xs`, `text-[11px]`), por debajo del mínimo AA de 4.5:1 para texto normal.
**Por qué importa:** WCAG 1.4.3. Afecta fechas de certificaciones y el pie de página — texto real, no decorativo.
**Fix propuesto:** Subir esas instancias a `text-muted` pleno (o a un token dedicado `--muted-strong`), evitando modificadores de opacidad sobre texto informativo pequeño.

---

## MEDIO — debilita la narrativa "developer real, con evidencia"

### M-1 · Certificaciones sin enlace a credencial verificable
**Ubicación:** `src/data/types.ts:28-36` (falta campo) + `src/components/sections/Certifications.tsx`
**Problema:** Ninguna certificación enlaza a su verificación (Credly, URL de Coursera, número de credencial). El tipo `Certification` no tiene `credentialUrl`.
**Por qué importa:** El prompt lo pide como prueba social verificable. "Google Cybersecurity" o "Microsoft Cybersecurity Architect" sin link de verificación es un claim; con link es evidencia.
**Fix propuesto:** Añadir `credentialUrl?: string` al tipo y a los 5 Tier-1, y convertir la tarjeta en `<a>` (con foco/hover) cuando exista. **Pendiente de Oscar:** URLs de verificación de las certs Tier-1.

### M-2 · Faltan `robots.txt` y `sitemap.xml`
**Ubicación:** `public/` (no existen)
**Problema:** No hay `robots.txt` ni `sitemap.xml`. Afecta el score de SEO de Lighthouse y la indexación.
**Por qué importa:** Está en el checklist pre-launch de CLAUDE.md (Sección X) y baja el objetivo "SEO 90+".
**Fix propuesto:** Añadir ambos en `public/` (sitio de una sola página → sitemap trivial con la home).

### M-3 · Imágenes de certificados nuevas sin referenciar + conteo inconsistente
**Ubicación:** `public/images/certificates/` (git status: `cisco1.png`, `cisco2.png`, `fortinet1-3.png`, `talento_digital.png` nuevas, `google.png` modificada) vs. `src/data/certifications.ts` (no las usa) + `src/data/about.ts:30` ("16+" certificaciones vs. 11 en el array).
**Problema:** Oscar agregó 6 imágenes nuevas que el data file no consume. Y el stat "16+ Certificaciones" no coincide con las 11 entradas de datos (aunque "16+" puede ser el total real, no lo sabemos).
**Por qué importa:** Archivos huérfanos y un número no verificable contra lo mostrado.
**Fix propuesto:** **Pendiente de Oscar:** ¿estas imágenes reemplazan las actuales Tier-1, se suman como nuevas certs, o son descartes? No toco `certifications.ts` sin esa decisión.

### M-4 · Se envían GSAP **y** Framer Motion (chunk de 68 KB gzip)
**Ubicación:** `src/**` — GSAP en `Hero.tsx`, `Contact.tsx`, `LoadingScreen`; Framer Motion en casi todas las secciones (`whileInView`).
**Problema:** Dos librerías de animación coexisten. El chunk `animations` (68 KB gzip) es el mayor peso del bundle, más que todo el vendor de React.
**Por qué importa:** Performance-first es decisión "✅ Decidido". La mayoría de usos de Framer son fades `whileInView` reproducibles con IntersectionObserver + CSS; GSAP se usa para el timeline del hero y el marquee.
**Fix propuesto (a discutir, no inmediato):** Consolidar en una sola librería (probablemente conservar Framer por ergonomía y reemplazar los 3 usos de GSAP), o reemplazar los fades por un hook `useInView` + clases CSS y quitar Framer. Ahorro potencial 40–68 KB gzip. **Requiere aprobación** por el volumen de cambio.

### M-5 · Orden de secciones: Certificaciones antes que Experiencia
**Ubicación:** `src/App.tsx:29-35`
**Problema:** Orden actual: About → Skills → Work → **Certifications → Experience** → Beyond → Contact.
**Por qué importa:** El prompt (y la lógica de CV internacional) sugiere que los reclutadores técnicos priorizan experiencia/proyectos reales sobre certificados. Work ya está bien colocado (antes de todo lo formal), pero Experience queda después de Certifications.
**Fix propuesto (recomendación):** Intercambiar a `… → Work → Experience → Certifications → Beyond → …`. Es un cambio de una línea en `App.tsx` (y ajustar scroll-spy si aplica). Lo señalo como hallazgo; **no lo cambio sin tu OK**.

### M-6 · `npm run lint` roto (no se puede usar como gate)
**Ubicación:** `package.json` script `lint` → `eslint . --ext ...` (formato ESLint ≤8) sin `eslint.config.js`.
**Problema:** ESLint 9+ exige flat config (`eslint.config.js`); no existe. El comando falla antes de analizar. La FASE B/C exige "cero warnings de lint" pero el gate no es ejecutable hoy.
**Por qué importa:** No hay linter funcional; el criterio de calidad no se puede verificar automáticamente.
**Fix propuesto:** Crear `eslint.config.js` (flat) con `@typescript-eslint` + `eslint-plugin-react-hooks` + `react-refresh`, o alinear versión. Verificar dependencias instaladas.

---

## BAJO — pulido y consistencia

### L-1 · Strings i18n muertos
`translations.ts`: `nav.skills`, `certifications.viewAll`, `contact.cta`, `experience.present` están definidos pero no se renderizan. Limpieza (o usarlos).

### L-2 · `aria-label` hardcodeados en español
`Work.tsx:147` (`aria-label="Cerrar"`) y `Navbar.tsx:55` (`aria-label="Inicio"`) no cambian con el toggle EN. Menor, pero inconsistente con el bilingüismo total que pide el prompt.

### L-3 · Video de fondo sin `poster` ni `aria-hidden`
`Hero.tsx:67` y `Contact.tsx:34`: sin `poster` (flash negro antes de cargar) y sin `aria-hidden="true"` en videos puramente decorativos.

### L-4 · Navegación expone solo 4 de 8 secciones
`Navbar.tsx:8` (`home, about, work, contact`). Skills, Certifications, Experience y Beyond no son alcanzables desde el nav. Decisión minimalista válida (estilo Brittany Chiang), pero se pierde descubribilidad de las certs/experiencia. Nota, no bug.

### L-5 · CLAUDE.md desactualizado
"ESTADO ACTUAL" dice LoadingScreen 2.7s (real: 0.5–1.6s atado a `document.fonts.ready`), email `oscartronico`, etc. Actualizar al cerrar la FASE B (lo pide la metodología, Sección IX).

### L-6 · Campo `tier` con granularidad no usada
`types.ts` declara `tier: 1 | 2 | 3` pero `Certifications.tsx` agrupa 2 y 3 en una sola lista de pills (`tier !== 1`). Los tiers 2 y 3 son visualmente idénticos. Aceptable (2 niveles visuales), pero el dato sugiere 3.

### L-7 · LoadingScreen vs. referencia Brittany Chiang
Brittany Chiang no usa loader. El de Oscar ya es un flash breve gated por fuentes (0.5–1.6s), no una espera artificial, así que es defendible como marca. **Recomendación:** conservarlo; no aporta fricción real de TTI. Sin acción.

---

## Resumen de prioridad sugerida (para tu confirmación)

| Lote | Hallazgos | Naturaleza | Requiere dato de Oscar |
|---|---|---|---|
| **1 — A11y core** | C-1, C-2, H-4 | Solo código | No |
| **2 — Social/SEO** | H-1, M-2 | Código + 1 asset | Sí: OG image |
| **3 — Honestidad de proyectos** | H-2 | Código + decisión | Sí: URL Productivity OS |
| **4 — Evidencia** | M-1, M-3 | Código + datos | Sí: URLs verificación + qué hacer con imágenes nuevas |
| **5 — Estructura** | M-5, M-6 | Código | No (M-5 pide tu OK) |
| **6 — Perf (opcional, grande)** | M-4 | Refactor amplio | Requiere aprobación explícita |
| **7 — Pulido** | L-1…L-6 | Código menor | No |

H-3 no es un lote: es la razón por la que el Lote 1 va primero.

**Pendientes de Oscar antes de tocar ciertos lotes:**
1. ¿Genero yo la `og-image.png` (1200×630) con la paleta del sitio, o la aportas?
2. URL real y estado de **Productivity OS** (¿link visitable hoy o lo dejo sin link hasta que exista?).
3. URLs de verificación (Credly/Coursera) de las 5 certs Tier-1.
4. Las 6 imágenes de certificados nuevas (`cisco1/2`, `fortinet1-3`, `talento_digital`): ¿reemplazan, se suman, o se descartan?
5. ¿Autorizas el intercambio de orden Experience ↔ Certifications (M-5)?
