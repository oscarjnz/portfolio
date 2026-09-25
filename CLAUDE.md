# Portfolio Oscar Jimenez - CLAUDE.md

**Última actualización:** 2026-09-24  
**Propósito:** Base central de conocimientos, decisiones de arquitectura, errores documentados, y evolución del proyecto.

## PRINCIPIO OPERATIVO (leer primero)
Este archivo es **la memoria y la mente activa del proyecto**. No es documentación pasiva: es el estado vivo desde el que se trabaja.
- **Actualización automática:** al terminar CUALQUIER tarea (feature, fix, refactor, decisión), se actualiza esta sección de estado y, si aplica, la tabla de errores/lecciones. No hace falta que el usuario lo pida; es parte de completar la tarea.
- **Aprende de errores y fallos:** cada bug, mal supuesto o corrección se registra en la tabla de "ERRORES DOCUMENTADOS & LECCIONES" con causa, solución y cómo evitarlo. La misma falla no se repite dos veces.
- **Fuente de verdad:** ante conflicto entre lo que se recuerda y lo que dice este archivo, gana este archivo (y se corrige si quedó desactualizado).

## ESTADO ACTUAL (2026-09-25)
- ✅ **2026-09-25: NOMENCLATURA DEFINITIVA DE LOS CV (commit `fdf1be5`, reemplaza la de 2026-09-09).** Estándar fijado por Oscar: **todos los CV se llaman `oscar-jimenez-resume.pdf`, sin sufijo de región, en el archivo físico, en el `href`, en el atributo `download` y en la pestaña.** Alternativa aceptada por Oscar si algún día se prefiere: `oscar-jimenez-cv.pdf` (cambiar en `cv-src/build.mjs` y `src/data/resumes.ts`), pero siempre UN solo nombre para las tres regiones.
  - Cómo se logra con 3 archivos distintos: la región vive solo en la carpeta, `public/cv/latam/`, `public/cv/us/`, `public/cv/eu/`, cada una con `oscar-jimenez-resume.pdf`. `src/data/resumes.ts` apunta a esas rutas y las 3 entradas tienen `downloadName: "oscar-jimenez-resume.pdf"`. `Contact.tsx` usa `resume.downloadName` sin caso especial. La detección por IP (`geoResume.ts`) sigue decidiendo cuál se muestra.
  - `cv-src/build.mjs` ya genera a esas rutas (`node cv-src/build.mjs`).
  - `vercel.json`: redirects 308 de las rutas viejas (`/cv/oscar-jimenez-resume-{latam,us,eu}.pdf`) a las nuevas, y el header de `/cv/(.*)` pasó de `max-age=604800` a `public, max-age=0, must-revalidate`. Motivo: con 7 días de caché el navegador de Oscar podía seguir mostrando un CV viejo tras actualizarlo; ahora revalida en cada visita (ETag, costo mínimo).
  - Los 3 CV comparten el mismo contenido actualizado (verificado por frases clave en los 3 HTML fuente). El EU omite las líneas "Stack:" de cada proyecto para caber en 3 páginas porque el stack ya está en Digital Skills.
  - Verificado en producción: tamaños idénticos a los locales (latam 105104, us 103065, eu 115706), redirects 308 correctos, `content-type: application/pdf`.
  - Ojo: en `public/cv/` apareció un `oscar-jimenez-resume.pdf` suelto en la raíz (no lo generó `build.mjs`, mismo tamaño que el LATAM pero distinto hash), sin commit. No se borró por si es una copia que Oscar hizo a propósito; no se despliega mientras siga sin versionar.
  - Pendiente de decisión (sugerencia hecha a Oscar): servir una sola URL `/cv/oscar-jimenez-resume.pdf` con rewrite de Vercel según `x-vercel-ip-country`, para que ni la carpeta muestre la región y se elimine la dependencia de `ipapi.co`. No se implementó porque no se puede probar desde fuera de RD si el caché del CDN respeta la variante por país.

## ESTADO ANTERIOR (2026-09-24)
- ✅ **2026-09-24: los 3 CVs reescritos y desplegados (commit `cb917d6`), ahora con fuente editable.** Motivo: postulación a una vacante backend "Producto y Seguridad" (ver `C:\Users\oscar\postulaciones\global-talent-connections.md`); Oscar pidió que todos los CV descargables desde osnarci.online lleven los cambios.
  - **Fuente editable nueva: `cv-src/build.mjs`.** Contiene el contenido de los 3 CV (objeto `CONTENT` en `es` y `en`) y los renderers (`classic` para LATAM y US, `europass` para EU). Genera HTML en `cv-src/html/` (no versionado) y los PDF en `public/cv/` con Chrome headless (`--print-to-pdf --no-pdf-header-footer`, sin Puppeteer). Para editar un CV: cambiar el texto en `build.mjs`, correr `node cv-src/build.mjs` desde la raíz, revisar los PDF, `npm run build`, commit y push. Ya NO hay que reconstruir HTML a mano (el HTML de 2026-07-17 se había perdido).
  - **Contenido nuevo:** perfil con Node.js/TypeScript, seguridad de aplicaciones y Linux/Docker; proyecto S.S.S. con el incidente real de RLS (15 tablas sin RLS, anon key pública, arreglo con Clerk third-party auth + policies por `auth.jwt()->>'sub'`, migración 018, rollback y runbook) y endurecimiento (lista negra de flags, cap y timeout, IDOR); proyecto nuevo "Infraestructura propia: VPS Linux en GCP" (Debian 12, n8n en Docker, Apache + Let's Encrypt, ufw DROP, fail2ban, monitoreo por cron con alertas a Telegram, 4,908 intentos SSH fallidos en 3 días desde 240 IPs, 96 bloqueos); categorías de skills "Backend, datos e integraciones" y "Seguridad de aplicaciones"; certificación Network Technician Career Path (Cisco, Ago 2026).
  - **Correcciones de datos que estaban mal en los CV anteriores:** (1) decían que el backend Node/Express estaba desplegado en Fly.io; según el CLAUDE.md de S.S.S. el Express corre en Render y en Fly.io está el relay WebSocket. (2) El portafolio figuraba como "HTML, CSS y JavaScript puro", pero hoy es React 18 + Vite + TypeScript en Vercel. (3) El título ahora usa el nombre oficial "Ingeniería en Tecnologías Computacionales (TIC)" con concentraciones en Ciberseguridad y Desarrollo de Software, y ya no se escribe "9.º semestre" (la UNIBE usa cuatrimestres y el número cambia cada término); en su lugar dice "graduación estimada 2027".
  - **Regla de estilo aplicada:** sin guion largo ni en dash; separadores `|` y `·`, rangos de fecha con guion simple.
  - **Sitio sincronizado:** `src/data/about.ts` (párrafo 1 menciona VPS Debian con Docker y monitoreo, autorización en servidor y RLS) y `src/data/skills.ts` (Seguridad de aplicaciones, APIs REST, WebSockets, RLS, Debian/Linux, Apache + Let's Encrypt, ufw/fail2ban, monitoreo con cron).
  - **No afirmar en el CV sin confirmar:** "multitenant" estricto, backups automáticos en S.S.S. (solo figuran como plan), Oracle Cloud (heredado del CV anterior, sin evidencia local nueva).
  - Verificado: `npx tsc -b` limpio, `npm run build` limpio, y en producción los 3 PDF de `https://osnarci.online/cv/` tienen el mismo tamaño en bytes que los locales (latam 105104, us 103065, eu 115706), 3 páginas cada uno.
  - **Higiene de git (resuelto 2026-09-25):** los cambios pendientes de la sesión del 2026-09-17 (`Certifications.tsx`, `Work.tsx`, `translations.ts`, `.gitignore`) se revisaron y se subieron en el commit `b020142`. `.gitignore` ahora ignora `cv-src/html/` y la carpeta `public/images/certificates/certificates webp to jpg/` (contiene `talento_digital.jpg`, que expone cédula y QR; verificado que en producción responde 404). Sigue sin versionar `public/cv/oscar-jimenez-resume.pdf` (copia que hizo Oscar a mano para adjuntar sin el sufijo; no es parte del sitio).

## ESTADO ANTERIOR (2026-09-17)
- ✅ **2026-09-17:** Primera auditoría con el skill `impeccable` (recién instalado globalmente vía `npx skills add`), en dos pasadas: `audit` técnico (16/20, Good) y `critique` de diseño con dos sub-agentes independientes (Assessment A: revisión de diseño/heurísticas Nielsen 28/32 en modo Experience; Assessment B: detector + evidencia de navegador en vivo contra `https://osnarci.online`).
  - **Falso positivo detectado y descartado:** Assessment B reportó que el modal de certificaciones no cerraba con Escape y no tenía `role="dialog"`. Verificación directa en vivo (tecla real, no evento sintético) mostró que sí funciona igual que el modal de proyectos. Causa: ambos sub-agentes de critique corrieron su automatización de navegador en paralelo sobre el mismo perfil/grupo de pestañas de Chrome, lo que también les causó una fuga de estado de idioma (ES→EN) entre sesiones. Lección: al correr sub-agentes de critique en paralelo con herramientas de navegador, verificar cualquier hallazgo de interacción "no reproducible desde el código fuente" con una prueba en vivo aislada antes de reportarlo como bug real.
  - **Fix 1 - Fechas de certificaciones en inglés pese al modo español** (P1 real, verificado en código y en vivo): `formatDate()` en `Certifications.tsx` tenía hardcodeado `["Jan",...,"Dec"]` sin recibir `lang`, así que con el sitio en español (default) mostraba "Dec 2025" en vez de "Dic 2025". Se agregó `MONTHS_BY_LANG` (es/en) y se pasó `lang` en las dos llamadas (`FeatureCard`, `CertificateModal`). Verificado en vivo con `vite preview`: certificaciones muestran "Dic 2025", "Ago 2026", etc. en modo español.
  - **Fix 2 - Muro de certificaciones sin jerarquía justo antes de Contacto** (P1, hallazgo de cognitive load): la grilla "Más credenciales" (~11 items con imagen) se agregó con progressive disclosure: cap inicial de 6 (`MORE_CREDENTIALS_PREVIEW_COUNT`) + botón "Ver todas"/"Ver menos" (nuevas keys `certifications.showAll`/`showLess` en `translations.ts`, es/en). Verificado en vivo: 6→11 items al expandir, el texto del botón cambia correctamente.
  - **Fix 3 - Nombre accesible duplicado en tarjetas de proyecto** (P2 de accesibilidad, verificado en código): el velo de hover en `Work.tsx` (`"Ver proyecto · {title}"`) no tenía `aria-hidden`, así que un lector de pantalla anunciaba el título del proyecto dos veces por tarjeta (una vez del velo, otra del `<h3>` real). Se agregó `aria-hidden="true"` al contenedor del velo.
  - Verificado con `npm run build` limpio (`tsc -b && vite build`, sin errores) y una pasada en Chrome vía `vite preview` confirmando los 3 fixes en vivo.
  - **Pendiente de decisión de UX (no implementado a propósito, requiere confirmación de Oscar):**
    - Nav principal solo cubre 4/6 secciones reales (`Navbar.tsx` no incluye Skills ni Experience) — el scroll-spy tampoco resalta nada mientras esas dos secciones están en viewport.
    - Sin vía de escape en el CV geolocalizado por IP: si la detección falla o da una región equivocada (VPN, proxy corporativo), no hay forma de pedir otro formato desde la UI — mismo tipo de fallo que ya costó una oportunidad real (ver 2026-07-17 más abajo). Es un trade-off de diseño intencional (ocultar la elección de región cuando hay un solo CV), así que el fix (link discreto "¿Otro formato?") se deja pendiente de que Oscar decida si vale la pena reintroducir esa fricción visual.
  - Reporte completo del `critique` guardado en `.impeccable/critique/2026-09-17T15-41-17Z__osnarci-online.md` (carpeta `.impeccable/` agregada a `.gitignore`: es estado local de la herramienta, no contenido del sitio).
  - Otros hallazgos del audit/critique sin fix aún (bajo impacto, quedan documentados para una próxima pasada): botones de miniatura del carrusel del modal de proyecto sin `aria-label`; touch targets del navbar en mobile por debajo de 44×44px; colores de estado (ámbar/verde) fuera del sistema de tokens; contador de `LoadingScreen` sin `aria-live`; lógica de a11y de modal duplicada entre `Work.tsx` y `Certifications.tsx` (candidato a hook `useModalA11y`); Vercel Web Analytics devuelve 503 en producción pese a estar documentado como activo (revisar en el dashboard de Vercel); viewport mobile (~390px) no se pudo verificar en esta sesión por una limitación de la herramienta de navegador (no lograba redimensionar realmente el viewport).

## ESTADO ANTERIOR (2026-09-09)
- ✅ **2026-09-09:** Renombre completo de los archivos de CV a una nomenclatura profesional estándar, a pedido explícito de Oscar ("no puede ser que llame resume-latam-blablabla").
  - **Investigación previa:** búsqueda de convenciones de nombre de archivo de CV que usan reclutadores/ATS (Jobscan, Hiration, StylingCV, etc.). Consenso: `FirstName-LastName-Resume.pdf`, guiones (no guiones bajos), sin jerga interna ("final", "v2", región), corto y legible.
  - **Fix 1 - Archivos físicos renombrados** (`git mv`, conserva historial): `public/cv/resume-anglosajon.pdf` → `oscar-jimenez-resume-us.pdf`, `resume-europass.pdf` → `oscar-jimenez-resume-eu.pdf`, `resume-latam_europa_continental.pdf` → `oscar-jimenez-resume-latam.pdf`. Motivo: aunque el atributo `download` ya fijaba el nombre visible desde el fix de 2026-08-25, la ruta interna seguía expuesta en el `href` (visible al inspeccionar, copiar enlace o abrir en pestaña nueva); con esto el nombre feo desaparece de raíz, no solo del nombre de descarga.
  - **Fix 2 - `downloadName` actualizado** en `src/data/resumes.ts`: `Oscar_Jimenez_CV-us.pdf` / `-eu.pdf` / `-latam.pdf` (guion bajo, "CV") → `Oscar-Jimenez-Resume-US.pdf` / `-EU.pdf` / `-LATAM.pdf` (guion, "Resume", sufijo de región en mayúsculas). Caso de CV único en `Contact.tsx` (geolocalización resuelve a un solo formato) pasó de `Oscar_Jimenez_CV.pdf` a `Oscar-Jimenez-Resume.pdf`, consistente con el mismo esquema.
  - Verificado con `tsc --noEmit` limpio, `npm run build` limpio (los 3 PDFs renombrados aparecen en `dist/cv/`), y una pasada en Chrome vía `vite preview`: el atributo `download` del enlace inspeccionado vía JS confirma `Oscar-Jimenez-Resume.pdf` (caso single de este entorno), sin errores de consola.
  - ~~Nomenclatura fijada: `Oscar-Jimenez-Resume[-REGION].pdf`~~ **SUPERADA el 2026-09-25**: ahora es `oscar-jimenez-resume.pdf` sin región (ver la entrada de arriba).

## ESTADO ANTERIOR (2026-09-04)
- ✅ **2026-09-04:** Auditoría SEO siguiendo la guía oficial de Google Search Central (SEO starter guide, pegada íntegra por Oscar) usando la skill `ecc:seo`. Checklist punto por punto contra el sitio real:
  - **Ya cumplía** (verificado, sin cambios): `robots.txt` permite todo y apunta al sitemap; `link rel="canonical"` autoconsistente; redirect 308 de `www` al apex (evita contenido duplicado); `<title>` (~46 car.) y meta description (~140 car.) dentro de los rangos recomendados por Google; un solo `<h1>` (Hero) y un `<h2>` por sección (`SectionHeader`) con `<h3>` correctamente anidados debajo, sin saltos de nivel; imágenes de certificaciones y proyectos con `alt` descriptivo (`cert.title` / `project.title`); todos los enlaces externos (UNIBE, FIFA, Credly, proyectos live) usan `rel="noopener noreferrer"` y texto de enlace descriptivo (nombre real de la organización, no "click aquí"); nada bloquea CSS/JS al rastreador.
  - **Fix 1 - `sitemap.xml` con `lastmod` desactualizado:** decía `2026-08-16` pero el último commit que tocó contenido real (`src/`, `index.html`, `public/`) fue `2026-08-25`, y esta misma sesión modificó contenido de nuevo. Actualizado a `2026-09-04` (fecha real de esta modificación, no fecha arbitraria).
  - **Fix 2 - Sin datos estructurados:** la home no tenía ningún JSON-LD. Se agregó `schema.org/Person` en `index.html` (nombre, alias, URL, imagen, email, jobTitle, `alumniOf` UNIBE, `sameAs` con GitHub/LinkedIn/Instagram) usando solo datos que ya existen y son verificables en la página misma (regla de la skill `ecc:seo`: "match schema to reality", nunca declarar algo que la página no muestra). Validado parseando el JSON del `dist/index.html` generado por el build.
  - **Fix 3 - Alt text genérico en la foto de perfil:** `About.tsx` usaba `alt={SITE.name}` (solo "Oscar Jimenez") para la foto de perfil. Se cambió a un alt descriptivo y bilingüe según `lang`: "Foto de perfil de Oscar Jimenez" / "Profile photo of Oscar Jimenez".
  - **Fuera de alcance, dejado documentado (no son parte de la guía para principiantes que pegó Oscar, o requieren decisión/acceso que no es del código):**
    - `hreflang`: el sitio es bilingüe pero con un solo URL (toggle client-side, no rutas `/en`), así que Google solo puede indexar una versión a la vez del texto visible; hreflang no aplica sin URLs separadas por idioma. No se tocó porque cambiar eso es una decisión de arquitectura (rutas por idioma), no un fix de auditoría.
    - Favicon solo en SVG (`public/favicon.svg`), sin PNG/`apple-touch-icon`/manifest: no estaba mencionado en la guía que pegó Oscar; se deja anotado por si se quiere mejorar la presentación en resultados de búsqueda mobile más adelante.
    - Alta en Google Search Console + envío de sitemap: sigue pendiente de acción manual de Oscar (ya estaba anotado desde 2026-08-16, no delegable, requiere su cuenta Google).
  - Verificado con `tsc --noEmit` limpio, `npm run build` limpio, JSON-LD parseado y validado desde el HTML compilado, y una pasada en Chrome vía `vite preview`: `<h1>`/`<h2>` correctos, alt de la foto de perfil se renderiza bien tras hidratar la sección About (estaba fuera de viewport inicial), JSON-LD presente con `name` no vacío, sin errores de consola.

## ESTADO ANTERIOR (2026-08-25)
- ✅ **2026-08-25:** Nombre de archivo del CV al descargar + headers de seguridad HTTP.
  - **Problema reportado por Oscar:** al descargar el CV, el navegador lo guardaba con el nombre interno del archivo (`resume-anglosajon.pdf`, `resume-latam_europa_continental.pdf`), nombres que no dicen nada al que los recibe y que además filtran el detalle de que hay variantes regionales.
  - **Fix:** nuevo campo `downloadName` en `Resume` (`src/data/types.ts`) y en cada entrada de `src/data/resumes.ts`. El `<a download="...">` en `Contact.tsx` ahora usa un nombre explícito en vez del atributo `download` vacío (que caía al basename de la URL):
    - Caso normal (geolocalización resuelve a un único CV, `isSingleResume === true`): siempre descarga como **`Oscar_Jimenez_CV.pdf`**, sin sufijo, consistente con que ya se oculta la región en ese caso ([ver 2026-08-16 tarde](#estado-anterior-2026-07-30) más abajo, sección de CV geolocalizado).
    - Caso fallback (geolocalización falla y se muestran los 3 CVs): cada uno descarga con un sufijo discreto que los distingue sin exponer las etiquetas internas viejas: `Oscar_Jimenez_CV-us.pdf`, `-eu.pdf`, `-latam.pdf`. Decisión confirmada con Oscar vía pregunta directa (prefirió distinguirlos en vez de que los 3 caigan con el mismo nombre y el navegador los numere).
  - Los archivos físicos en `public/cv/` **no se renombraron** (siguen siendo `resume-anglosajon.pdf` etc., son solo la ruta interna de origen); lo que cambió es el nombre con el que el navegador los guarda, que es lo único visible para el visitante.
  - **Barrido de salud general** (pedido explícito de Oscar: "que no falle de ninguna manera"), sin encontrar nada roto:
    - `tsc --noEmit` limpio, `npm run build` limpio (bundle sin cambios de tamaño relevantes).
    - Verificado en `vite preview` con Chrome: la detección de geolocalización (`ipapi.co/country/`) resuelve 200 y filtra a un solo CV; el atributo `download` inspeccionado vía JS confirma `Oscar_Jimenez_CV.pdf` en el caso single. Sin errores de consola (el único log es el aviso esperado de Vercel Analytics, que solo carga en producción, no en preview local). Sin requests 404 revisando las 47 requests de la carga completa de home (fuentes, JS chunks, todas las imágenes de certificaciones, video, CV).
    - `geoResume.ts` ya tenía manejo robusto (timeout de 4s con `AbortController`, validación de formato de respuesta, fallback silencioso a mostrar los 3 CVs si algo falla) — no necesitó cambios.
    - **Hallazgo real, corregido:** `vercel.json` no enviaba ningún header de seguridad HTTP (sin `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`), algo que desentona en el portafolio de alguien que se posiciona en ciberseguridad si un reclutador técnico revisa los headers. Se agregó un bloque `headers` para `/(.*)` con esos 5 headers (HSTS sin `preload`, ya que eso requiere sumisión externa a hstspreload.org y no debe activarse sin que Oscar lo decida explícitamente). De paso se agregó `Cache-Control` para `/cv/(.*)` (mismo criterio que `/images/` y `/videos/`, que ya lo tenían; a los PDFs les faltaba).
    - No hay carpeta `api/`ni backend propio más allá de Vercel (redirects/headers) y `ipapi.co` como único servicio externo desde el cliente; no aplica revisión de backend más allá de eso.

## ESTADO ANTERIOR (2026-08-16)
- ✅ **2026-08-16 (noche):** Indexación SEO en Google (diagnóstico + fixes) y limpieza de historial de git.
  - **Diagnóstico:** `robots.txt` y `sitemap.xml` ya servían 200 con contenido correcto (no interceptados por ningún rewrite de SPA; el sitio es one-page así que no hace falta catch-all). Dominio canónico confirmado por `<link rel="canonical">` y `og:url`: **`https://osnarci.online/`** (apex, sin `www`).
  - **Fix 1 - `sitemap.xml` sin `lastmod`:** el único `<url>` (home) no traía fecha de última modificación. Se agregó `<lastmod>2026-08-16</lastmod>` (fecha real del último commit de contenido, vía `git log`), no la fecha de generación del sitemap.
  - **Fix 2 - `www` sin redirect:** `https://www.osnarci.online` servía el mismo HTML que el apex con 200 OK (mismo ETag) en vez de redirigir, riesgo de contenido duplicado para Google pese a que canonical/og:url ya apuntan al apex. Se agregó un bloque `redirects` en `vercel.json` (`host: www.osnarci.online` → `https://osnarci.online/$1`, 308 permanent). Verificado en vivo: `www` ahora devuelve 308 con `Location: https://osnarci.online/`.
  - **⚠️ Hallazgo fuera de alcance, resuelto con permiso explícito:** se encontraron **26 commits históricos** (jul 2026, desde `6Z5agJq`... hasta `cac0f36`/`319cb7a`) con el trailer `Co-Authored-By: Claude ... <noreply@anthropic.com>` en este repo **público**, violando la regla global de CLAUDE.md que prohíbe atribución de IA en cualquier repo (ya había pasado antes en S.S.S., ver esa sección para el patrón). Con confirmación explícita del usuario se corrió `git filter-repo --force --message-callback` (regex que borra la línea `Co-Authored-By: Claude...` de cada mensaje) y `git push --force origin main`. Verificado: 0 commits con el trailer tras la reescritura, remote `origin` re-agregado y upstream tracking restaurado. El repo no tiene tags (no hubo que reapuntar releases) y es proyecto solo-autor (no hay otros colaboradores con clones que reconciliar).
  - Pendiente de acción manual del usuario (no delegable, requiere su cuenta Google): dar de alta la propiedad en Google Search Console (tipo Dominio recomendado si tiene acceso a DNS de osnarci.online; si no, Prefijo de URL con `https://osnarci.online/`), verificarla, enviar el sitemap y solicitar indexación de la home. Ver instrucciones detalladas entregadas en el chat de esa sesión.
- ✅ **2026-08-16 (tarde):** Estado académico de 3 fases + CV singular sin "elige tu región".
  - **Nuevo `src/data/academicStatus.ts`** centraliza todo el copy que cambia según la fase académica de Oscar (`AcademicStatus` = `"student" | "graduate" | "engineer"`, definido en `academicTerm.ts`): rol del Hero, subtext y párrafo de apertura de About, y rol/descripción de la entrada UNIBE en Experience. `getAcademicStatus()` compara la fecha del sistema contra dos hitos: fin de cursada (31-ago-2027, cierre del cuatrimestre 12) y ceremonia de graduación (**1-nov-2027, fecha placeholder** — Oscar dio "noviembre" sin día exacto, confirmar y ajustar `CEREMONY_DATE` en `academicTerm.ts` cuando se sepa la fecha real de colación).
    - **student** (hoy → 31-ago-2027): como estaba, "Estudiante de Ingeniería TIC" + cuatrimestre dinámico. Se le agregó mención a las 2 concentraciones (**Ciberseguridad y Desarrollo de Software**) en el párrafo de About y en la descripción de Experience, ya que Oscar confirmó que son las concentraciones con las que egresa.
    - **graduate** / egresado (01-sep-2027 → 31-oct-2027, la tesis se presenta jun-jul 2027 pero la colación no es hasta noviembre): Hero pasa a "Egresado en Ingeniería TIC", About dice "Soy egresado... a la espera de la ceremonia de graduación", Experience muestra "2023 - 2027 · Egresado" y la descripción menciona la tesis presentada.
    - **engineer** (desde 01-nov-2027): Hero "Ingeniero en Tecnologías Computacionales", About "Soy Ingeniero en Tecnologías Computacionales (TIC) por UNIBE... con concentraciones en Ciberseguridad y Desarrollo de Software", Experience muestra el rol como "Ingeniero..." (ya no "Ingeniería...") y el período limpio "2023 - 2027" sin sufijo.
    - Verificado corriendo la lógica de fechas de forma aislada (Node) contra 8 fechas clave (hoy, may-2027, límite 30-ago, 1-sep, 31-oct, 1-nov, después): las 3 fases cambian exactamente en los días esperados.
    - `about.ts` y `translations.ts` perdieron los campos que ahora son dinámicos (`heroRoles` ya no trae el 3er rol de estudiante, `aboutParagraphs` ya no trae el párrafo de apertura, `about.subtext` se quitó de `translations.ts`); `About.tsx`/`Hero.tsx`/`Experience.tsx` los recomponen leyendo `ACADEMIC_STATUS_CONTENT[getAcademicStatus()]`.
  - **CV geolocalizado sin "elige tu región" cuando solo hay uno:** Oscar pidió explícitamente que cuando la detección por IP resuelve a un único CV, el sitio no debe insinuar que hay más opciones. `Contact.tsx` ahora computa `isSingleResume = visibleResumes.length === 1` y, si es cierto, oculta `resumeSubtext` ("Elige el formato según tu región") y el `label`/`note` de la región (`"LATAM / Europa continental"`, etc.), mostrando solo un botón genérico "Descargar CV" (nueva key `contact.resumeDownload` en `translations.ts`). El subtext tampoco se muestra durante el estado `loading`, para no hacer flash antes de saber si hay 1 o 3 CVs. El texto "Elige el formato..." y las etiquetas de región solo aparecen cuando de verdad hay más de un CV visible (fallback cuando la geolocalización falla).
  - Ambos verificados con `tsc --noEmit`, `npm run build` y una pasada visual en Chrome (preview local): fase estudiante se ve igual que antes + concentraciones, y con IP real del entorno el CV queda como uno solo, sin mención de LATAM.
- ✅ **2026-08-16 (mañana):** Batch de 7 cambios pedidos por Oscar.
  1. **Cuatrimestre dinámico:** se confirmó vía el sitio oficial de UNIBE (`unibe.edu.do/calendario-academico/`) que la universidad corre en **cuatrimestres** (3 términos de 4 meses por año: Ene-Abr, May-Ago, Sep-Dic), no en semestres. Nuevo `src/utils/academicTerm.ts` calcula el cuatrimestre actual a partir de la fecha del sistema (inicio de programa asumido en el término Sep-Dic 2023 = término 1, dato retro-inferido porque hoy 16-ago-2026 caía en "9.º" y eso solo cuadra con ese punto de partida; último término = May-Ago 2027 = término 12, tal como indicó Oscar). `Experience.tsx` inyecta la etiqueta dinámica (`9.º cuatrimestre` / `9th term`) solo en el ítem `unibe-degree`; el resto de `experience.ts` no cambia. **[Superado en la entrada de arriba: ahora es un sistema de 3 fases con estado "graduate"/"engineer" tras agosto 2027, ya no se clampea en 12 para siempre.]**
  2. **CV por geolocalización:** nuevo `src/utils/geoResume.ts`, lookup silencioso por IP (`https://ipapi.co/country/`, sin permiso de navegador) que mapea el país a uno de los 3 CVs (`anglosajon` para US/GB/CA/AU/NZ, `europass` para países UE, `latam` como default). `Contact.tsx` muestra un skeleton mientras detecta y solo el CV correspondiente al terminar; si el fetch falla o da un país fuera de mapa, cae de vuelta a mostrar los 3 (nunca deja al visitante sin opción de descarga). Probado en preview local, la llamada a ipapi.co resolvió 200 y el sitio filtró correctamente a un solo CV.
  3. Se quitó el "Soy"/"I'm a" del Hero (`hero.intro` eliminado de `translations.ts`); ahora el rol animado abre la frase directamente.
  4. Auditoría de "no usar dos puntos" en todo el copy visible del sitio; el único caso real era la descripción del Hero ("...con un mismo estándar: hacerlo bien."), reescrita sin dos puntos en ambos idiomas.
  5. Se confirmó (vía `unibe.edu.do/escuelas/escuela-de-ingenieria-en-tecnologias-computacionales/`) que el nombre oficial de la carrera es **Ingeniería en Tecnologías Computacionales (TIC)**, distinto del que estaba puesto en `experience.ts` ("Ing. en Tecnologías de la Información y Comunicación", incorrecto). Se corrigió el rol de esa entrada al nombre completo oficial y se actualizó la primera mención en el párrafo de About (`aboutParagraphs[0]`) para usar el nombre completo también.
  6. Stat "Años en tech" → **"Años de experiencia"** / "Years of experience" (`about.ts`), término más estándar.
  7. Link de FIFA U-17 Women's World Cup 2024 en `experience.ts` actualizado a `https://www.fifa.com/en/tournaments/womens/u17womensworldcup/dominican-republic-2024` (la URL vieja apuntaba a un artículo específico de registro de voluntarios, ya no es la más representativa).
  - Verificado con `tsc --noEmit`, `npm run build` y una pasada visual en Chrome vía preview local (Hero, About, Experience, Contact). Sin errores de consola ni de red.
- ✅ **2026-08-09:** Nueva certificación **Network Technician Career Path** (Cisco Networking Academy, 09 ago 2026, Cert ID `175a37f0-fc2e-4024-a537-707efe384006`). Se agregó como **tier 1** (segunda tarjeta, justo después de Google) porque es el capstone del career path que agrupa los 3 módulos Cisco de networking que ya estaban en tier 2 (Networking Basics, Network Devices and Initial Configuration, Network Addressing and Basic Troubleshooting) + soporte y seguridad de red; además deja el grid de tier 1 en 6 tarjetas (3×2 exacto en `lg`).
  - Badge: `public/images/badges/network-technician-career-path.png` (llegó suelto en `certificates/`, se movió a `badges/` para respetar la convención).
  - Certificado: `public/images/certificates/network-technician-career-path.webp` (1400×949, 61KB), generado con Pillow desde el JPG original a `quality=82, method=6`. El JPG crudo (`Network_Technician_Career_Path_certificate.jpg`) se conserva en el repo igual que los PDFs crudos de las otras certs.
  - ⚠️ **Sin `credentialUrl`**: no hay link público de Credly en `public/images/badges/public_badge_link.txt` para esta credencial, así que el modal no muestra botón "Verificar". Pendiente pedirle a Oscar el public URL de Credly y agregarlo.
  - Nota de herramientas: el repo **no** tiene `sharp` ni ImageMagick; para convertir imágenes usar `python` + Pillow (12.3.0, ya instalado en la máquina).

## ESTADO ANTERIOR (2026-07-30)
- ✅ **2026-07-30:** Ajuste de tono a pedido de Oscar ("suena mucho a IA, poca experiencia"). Cambios:
  - `heroRoles` (`src/data/about.ts`) pasó de 4 a 3 roles: se quitó "Atleta"/"Athlete" (ya no compite con la identidad profesional en el Hero) y "Entusiasta de la ciberseguridad"/"Cybersecurity enthusiast" pasó a **"Analista de ciberseguridad"/"Cybersecurity analyst"** (coincide con `about.subtext` y con el rol real en `experience.ts`, gana consistencia).
  - Sección **`Beyond` eliminada por completo** (`src/components/sections/Beyond.tsx`, `src/data/beyond.ts`, bloque `beyond` en `src/i18n/translations.ts` es/en, import y render en `App.tsx`). El orden de secciones ahora termina en Certificaciones → Contacto.
  - El párrafo 3 de "Sobre mí" (`aboutParagraphs[2]` en `about.ts`) se recortó: se quitó la frase de cierre tipo "esa mentalidad... es la misma que llevo al código" (patrón de bridging genérico de IA). Queda solo el dato concreto: 12 años de béisbol competitivo, sabermetría, recomposición corporal.
  - `about.subtext` (es/en, `translations.ts`) perdió "Atleta de toda la vida"/"Lifelong athlete"; queda solo lo profesional.
  - Stat "12 · Años de béisbol" se quitó del grid de `stats` en `about.ts` (competía con métricas profesionales sin la sección Beyond alrededor). El grid pasó de `grid-cols-2 sm:grid-cols-4 lg:grid-cols-2` (4 items) a `grid-cols-3` fijo (3 items) en `About.tsx`.
  - Lo del béisbol/atletismo se mantiene mencionado (no se eliminó del todo), pero en una sola frase corta dentro del párrafo largo de About, no como sección ni como tag destacado.

## ESTADO ANTERIOR (2026-07-08)
- ✅ Hero: se quitó el tagline de ubicación ("con base en Santo Domingo" / "based in Santo Domingo"). El Home ahora solo dice **"Soy `{rol}`."**. La ubicación podría mostrarse a futuro con un mapa u otro recurso visual (idea pendiente, no implementada).
- ✅ Enlaces contextuales: menciones de **UNIBE** enlazan a `https://unibe.edu.do` en trayectoria (trabajo + estudios) y en el párrafo de "Sobre mí" (link inyectado con `renderParagraph` que parte el texto en "UNIBE"). **FIFA** enlaza al programa oficial de voluntarios del torneo. Se agregó campo opcional `organizationUrl` en `ExperienceItem` (`data/types.ts`) y render condicional como `<a target="_blank" rel="noopener noreferrer">` en `Experience.tsx`.
- ✅ Sitio completo construido y en GitHub (`oscarjnz/portfolio`), desplegado en Vercel.
- ✅ Orden de secciones: Loading → Hero → Sobre mí → Skills → **Proyectos → Trayectoria → Certificaciones** → Beyond → Contacto. (Certifications ahora va DESPUÉS de Experience: reclutadores técnicos priorizan proyectos/experiencia real sobre certificados.)
- ✅ Certificaciones: 5 Tier-1 (feature cards con imagen: Google, Microsoft, Fortinet NSE 1, Cisco Ethical Hacker, Cisco Intro) + Tier-2 con thumbnails de imagen (3 Fortinet Fundamentals, 2 módulos Cisco CCNA, Networking Basics, English for IT) + pills de texto (Talento Digital, Hacker Mentor, NDG Linux, Tier-3). Google tiene `credentialUrl` verificable (Coursera).
- ✅ Video del hero: **local, auto-hospedado** (`public/videos/hero.mp4`, 2.6MB, generado por IA). HLS/Mux **eliminado**. Bundle inicial ~119KB gzip; el chunk `animations` (GSAP + Framer Motion) pesa 68KB gzip (mayor peso — candidato a consolidar, ver Sección VI M-4 de AUDIT.md).
- ✅ LoadingScreen: flash breve **0.5–1.6s** atado a `document.fonts.ready` (ya NO 2.7s).
- ✅ A11y: modal de proyectos con Escape/focus-trap/scroll-lock/role=dialog; `:focus-visible` global; contraste de texto muted corregido a AA.
- ✅ SEO/social: `og-image.png` real (1200×630) + og/twitter/canonical absolutos; `robots.txt` + `sitemap.xml`.
- ✅ Email definitivo: `oscar@osnarci.online`. Bilingüe ES/EN (default ES). Vercel Analytics activo.
- 🎯 Pendiente: conectar dominio osnarci.online; posible video propio grabado; URLs de verificación (Credly/Coursera) para las certs Tier-1 restantes (solo Google tiene link hoy); versión redactada de `talento_digital.png` sin cédula si se quiere mostrar con imagen; montar ESLint flat config (`npm run lint` roto, ver AUDIT.md M-6).
- ⚠️ Docs personales (CVs, PDFs con cédula/teléfono) viven en `_source-docs/` - **gitignored**. Además `public/images/certificates/talento_digital.png` está **gitignored** (expone cédula + QR): nunca publicar sin redactar.
- 📄 Auditoría completa vigente en `AUDIT.md` (raíz).
- ✅ **2026-07-19:** Certificaciones ahora usan los badges de Credly (`public/images/badges/*.png`, con enlaces públicos en `public_badge_link.txt`) como imagen principal clickeable en todas las tarjetas (tier 1, 2 y 3 con imagen). Al hacer click se abre un modal (`Certifications.tsx`, mismo patrón de a11y que `ProjectModal` en `Work.tsx`: Escape/focus-trap/scroll-lock) que muestra el certificado real (`certificateImage` en `data/certifications.ts`) o, si no existe uno propio, el badge mismo; debajo un botón "Verificar" enlaza al `credentialUrl` público de Credly. Se agregó el campo `certificateImage` a `Certification` (`data/types.ts`). Se agregaron 4 credenciales nuevas descubiertas en el .txt que no estaban documentadas: Fortinet NSE 2, Fortinet Certified Fundamentals Cybersecurity, Scrum Foundation Learner 2025 y Lifelong Learning 2026 (Certiprof); sus fechas son estimadas (no venían en el .txt) y deberían confirmarse. 3 badges (Introduction to Cybersecurity, Getting Started in Cybersecurity 3.0, Introduction to the Threat Landscape 3.0) no tenían link de verificación en el .txt, así que su modal no muestra botón "Verificar" hasta que se consiga el link real.
- ✅ **2026-07-17:** Los 3 CVs (`public/cv/resume-anglosajon.pdf`, `resume-europass.pdf`, `resume-latam_europa_continental.pdf`) no mencionaban explícitamente experiencia con servidores/VPS (solo nombraban plataformas: Cloudflare Workers, Fly.io, Supabase), lo que le costó credibilidad frente a un reclutador. Se regeneraron los 3 PDFs (mismo nombre, mismo diseño) agregando: mención explícita de "server/VPS administration" en el resumen, y una nueva categoría de skills "Servers & Infrastructure" (Linux server admin, VPS en Fly.io/Render/Oracle Cloud/GCP, Cloudflare Workers como edge servers, Docker, n8n autoalojado, PostgreSQL, DNS/SSL). También se sincronizó `src/data/about.ts` y `experience.ts` con la misma mención. Los PDFs no tenían fuente editable en el repo (no hay `.docx`/plantilla); se reconstruyeron como HTML + Puppeteer (`page.pdf` con `displayHeaderFooter:false`) replicando el layout original.

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

### S.S.S. (Security Smart Services) - Stack Detallado
**Frontend:**
- React 18 + Vite + TypeScript (strict) + Tailwind CSS + shadcn/ui
- Clerk Auth (login, OAuth, JWT, registro)
- Vercel deployment (auto-deploy from main)

**Backend:**
- Express (Node/TS) en Render (free tier, hiberna @15min)
- Relay WebSocket en Fly.io (Miami) - pasarela WSS:443
- Scanner-agent local (Win/macOS/Linux) - ejecuta nmap/ping/traceroute
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
- [ ] Sin hardcoding de labels - data en `src/data/skills.ts`

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

## VI. CERTIFICACIONES - Análisis por Tier

### **TIER 1 - Mostrar en portafolio (prominente)**
*Estos 5 certificados son los "heavyweight" - ciberseguridad + evolución profesional*

1. **Google Cybersecurity Professional Certificate** (8 cursos) - Google/Coursera - Dec 2025
   - Status: Recent, comprehensive, industry-recognized
   - Image: `Coursera Google Cloud.pdf` (convertir a PNG)
   - Display: Logo + "8 courses" badge

2. **Microsoft Cybersecurity Architect** - Microsoft/Gold Learning Partner - Nov 2025
   - Status: Prestigious, indicates advanced level
   - Image: `251118 SC-100T00-A...pdf` (extraer)
   - Display: Microsoft logo + "Architect" badge

3. **Ethical Hacker** - Cisco Networking Academy - Feb 2024
   - Status: Industry standard, red-team credibility
   - Image: `ethical-hacker.png` (Ya existe ✅)
   - Display: Logo + Cisco badge

4. **Introduction to Cybersecurity** - Cisco - Feb 2024
   - Status: Foundational, paired with Ethical Hacker
   - Image: `introduction-to-cybersecurity.png` (Ya existe ✅)
   - Display: Logo + badge

5. **Fortinet NSE 1 - Technical Introduction to Cybersecurity 3.0** - Oct 2025
   - Status: Vendor-specific, current
   - Image: `NSE 1 - Fortinet.png` (Ya existe ✅)
   - Display: Fortinet logo + badge

### **TIER 2 - Mencionar en "Skills" section (no individual cards)**
*Estos complementan pero no son el foco principal*

- Ethical Hacking and Pentesting - Hacker Mentor - Sep 2024
- Computer Security from Scratch - Udemy (Thiago Araujo) - Jan 2024
- NDG Linux Unhatched - Cisco/NDG - Jun 2024
- Networking Basics - Cisco - Feb 2024
- English for IT 1 - Cisco/OpenEDG - Feb 2024

### **TIER 3 - En "About" como "continuous learning" (no mostrar PDFs)**
*HTML/CSS/Git/JS Logic de Alura/ONE - son básicos de grado*

- HTML & CSS: 4 cursos - Alura LATAM - Feb 2025
- Git & GitHub - Alura LATAM - Jan 2025
- Programming Logic: 2 cursos - Alura LATAM - Jan 2025

### **TIER 4 - Business/Soft Skills (mencionar si es necesario)**
- Digital Transformation - University of Virginia/BCG - Oct 2025
- Generative AI Applications - Google Cloud - Oct 2025
- ChatGPT: Optimizing Output Quality - Alura - Feb 2025
- Tech from Zero: Semiconductors - EOI - 2025
- Ladder Challenge: Industrial Automation - GingeLearn - Feb 2025

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

### 1. **Security Smart Services** (S.S.S.) - FLAGSHIP
- **URL:** https://securitysmartservices.site
- **Status:** LIVE (ya en producción)
- **Descripción:** Platform para monitoreo de red en tiempo real
- **Stack:** React 18, Vite, TS, Tailwind, shadcn/ui, Clerk, Supabase, Groq, Express, Render, Fly.io

### 2. **osnarci.online** - Personal Site
- **URL:** https://osnarci.online
- **Status:** LIVE
- **Stack:** Vanilla HTML, CSS, JavaScript
- **Nota:** Este es su sitio personal actual. El portafolio nuevo REEMPLAZARÁ esta URL.

### 3. **Nutriflow** - (Del brief anterior, no reencontrado en carpeta)
- **URL:** https://nutriflow-sigma.vercel.app
- **Status:** Asumo LIVE
- **Stack:** Next.js, Supabase, Groq AI

### 4. **Active Calendar** - (Del brief anterior)
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
| Título de cert no coincide con su imagen | `fortinet-nse1` decía "Technical Introduction to Cybersecurity 3.0" pero el badge dice "NSE 1 - Threat Landscape" | Corregir el título al que muestra el badge real | Verificar cada imagen de cert contra su `title` en `data/certifications.ts` |
| Imagen de cert expone PII | `talento_digital.png` muestra cédula (40215354255) + QR con datos personales | No publicarla: listar el cert como texto y gitignorear la imagen | Revisar visualmente toda imagen antes de publicarla; cédula/QR = privacidad |
| `og:image` roto → links sin preview | `index.html` apuntaba a `/images/og-image.png` inexistente y con ruta relativa | Generar PNG real 1200×630 + URLs absolutas + `twitter:image`/`canonical` | og:image debe existir, ser PNG/JPG y usar URL absoluta |
| Fix de nombre de descarga del CV quedó incompleto | El fix de 2026-08-25 solo cambió el atributo `download` (nombre visible al guardar); dejó los archivos físicos en `public/cv/` con nombres internos feos (`resume-latam_europa_continental.pdf`), expuestos en el `href` al inspeccionar/copiar enlace | Renombrar también los archivos físicos, no solo el atributo `download` | Cuando el nombre "feo" es el problema, revisar tanto el nombre visible (`download`) como la ruta real (`href`/`file`); un usuario técnico puede ver ambos |
| Modal sin accesibilidad de teclado | `ProjectModal` no cerraba con Esc, sin focus-trap ni scroll-lock | `useEffect` con keydown Esc + trap Tab + `body.overflow` + restauración de foco + `role=dialog` | Todo modal necesita Esc, trap de foco, scroll-lock y restaurar foco |
| Sub-agente de `critique` reportó bug de modal que no era real (Escape no cerraba, sin `role=dialog`) | Dos sub-agentes de critique corrieron automatización de navegador en paralelo compartiendo el mismo perfil/grupo de pestañas de Chrome; el Escape sintético de uno probablemente golpeó el foco/pestaña del otro | Verificación directa en vivo (tecla real vía computer-use, no `dispatchEvent`) confirmó que sí funciona | Cualquier hallazgo de interacción de un sub-agente que contradiga una lectura directa del código fuente se re-verifica en vivo, aislado, antes de reportarlo como bug confirmado |
| Fechas de certificaciones en inglés con el sitio en español | `formatDate()` en `Certifications.tsx` tenía array de meses hardcodeado en inglés, sin recibir `lang` | Se agregó `MONTHS_BY_LANG` (es/en) y se pasó `lang` en ambas llamadas | Cualquier formateo de fecha/número visible debe recibir `lang` explícito, nunca asumir un solo idioma aunque el resto del componente ya use `useLanguage()` |

### Lección clave - Robustez de animaciones
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

**TIER 1 - Critical (MVP):**
- [ ] S.S.S. screenshot (dashboard/hero) - JPG/PNG - 1200×800 min
- [ ] Google Cybersecurity cert - PNG (convertir PDF o screenshot)
- [ ] Microsoft Cybersecurity Architect cert - PNG (convertir PDF o screenshot)
- [ ] Tu foto de perfil - JPG/PNG - 400×400 min (headshot profesional)

**TIER 2 - Nice to have (Phase 2+):**
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
