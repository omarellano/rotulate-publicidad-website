# Handoff para Agentes de IA — Estado del Proyecto

Este archivo sirve para transferir el contexto del desarrollo actual del sitio web **Rotúlate Publicidad** a cualquier agente de IA que colabore en el futuro. Es la **fuente única de verdad** para documentar el estado activo de desarrollo, la bitácora de sesiones históricas, notas de investigación y el backlog de tareas pendientes (evitando duplicar esta información en `CLAUDE.md`).

---

## 📅 Resumen de la Sesión (06 de Julio, 2026)

### ⚽→🧑‍🚀 Retiro de la promo "¿Y si sí?" — mascota restaurada
* Se ejecutó la limpieza pendiente (anotada en la sesión del 5-jul, punto 7): el astronauta del hero vuelve a ser la mascota permanente.
* Eliminado el bloque del swap con fecha límite en `main.js`, las reglas CSS `.astronaut-mascot.ysisi-promo` (base + media query de 628px y el `:has` que ampliaba `.hero-visual`) en `style.css`, y los assets trackeados `assets/ysisi-promo.png`/`.webp`.
* Versiones de caché: `style.css` y `main.js` bump a `?v=3.0` en `index.html`; `/en/index.html` referencia `style.css?v=3.0`.
* La imagen fuente cruda sigue local sin trackear en `assets/ysisi/` (borrable cuando se quiera).
* Nota: con el promo fuera, re-medir Lighthouse móvil — se estimaba recuperar ~90-92 al eliminar el swap post-carga que degradaba CLS/LCP.

---

## 📅 Resumen de la Sesión (05 de Julio, 2026)

Auditoría integral (solo diagnóstico, sin cambios de código): SEO, GSC en vivo, rendimiento, accesibilidad y presencia en internet.

### 1. 🔍 Google Search Console (en vivo, 3 meses abr–jul)
* **Totales:** 124 clics, 4,780 impresiones, CTR 2.6%, posición media 7.4. 21 páginas indexadas / 11 sin indexar.
* **Páginas top:** home (43 clics), `/express/` (37), `alucobond.html` (10, CTR 5.6%), `rotulacion-vehicular.html` (9), `/lonas-cancun/` (7 clics, 595 imp), `control-solar.html` (7, CTR 6.7%).
* **Rich results funcionando:** Fragmentos de productos y de reseñas ambos **7 válidos / 0 errores**. En SERP local real, `/lonas-cancun/` aparece **#2** con precio ($230–$350) y estrellas 5.0(4). La posición 9.6 de GSC es promedio global.
* **Problema crítico:** `control-solar-en.html` y `/express/en/` llevan semanas en "Descubierta: actualmente sin indexar" (Google nunca las ha rastreado). EE. UU. sigue con 719 impresiones y 0 clics — la solución inglesa existe pero no está indexada. Las 7 landings `-en.html` nuevas (26-jun) aún no aparecen indexadas.
* **Ya resuelto en servidor (errores GSC de rastreos viejos):** `/lonas-cancun` sin slash → 301 correcto; `/home-b2/` → 301 a home; `/sectores/` → 410 intencional. Se validó corrección en GSC (pendiente que Google re-rastree).

### 2. ⚡ Lighthouse móvil (producción)
* **Home:** Performance 83, Accesibilidad 100, Best Practices 100, SEO 100. LCP 4.1s (único punto débil; render-blocking: Google Fonts CSS ~846ms + style.css ~150ms).
* **`/lonas-cancun/`:** Performance **71**, Accesibilidad **96**, BP 100, SEO 100. LCP 6.2s. Causas: (a) galería usa `assets/galeria/galeria-*.webp` a resolución completa (250–500 KB c/u, ~1.5 MB de ahorro posible); (b) botón WhatsApp `.quote-cta-btn` **falla contraste WCAG** (blanco sobre #25d366 ≈ 1.9:1); (c) hero LCP sin `fetchpriority=high`.

### 3. 🌐 Presencia en internet
* **SERP de marca "rotulate publicidad cancun":** sitio #1, Google Business Profile con **4.7★ (30 reseñas)**, perfil "Información completa", 385 interacciones/90d, 368 vistas/mes, actualizado hace 4 semanas. Facebook (330+ seguidores, 4.4★/7 reseñas) e Instagram (@rotulateoficial) visibles en primera página.
* **Competidores en SERPs locales:** Hiplot, Impresiones Mágicas, Rótulos Martínez, Publicidad Rayo (este último compite en lonas "desde $95" — presión de precio en el snippet).

### 4. ✅ Fixes aplicados en la misma sesión (commit `f947a54`, deploy OK en 14s)
1. **Miniaturas de galería `/lonas-cancun/`:** generadas con `sharp` a 720×540 (`galeria-XXX-thumb.webp`), 1,554 KB → 282 KB (−82%). HTML actualizado con `width/height` + `loading="lazy"`; versión CSS bump a `?v=2.6`. Verificado 200 en producción.
2. **Contraste WCAG botón WhatsApp lonas:** `color: #0a3622` sobre verde `#25d366` (antes blanco ≈1.9:1).
3. **Canonicals añadidos** a `express/index.html` y `express/en/index.html`; se corrigió el `og:image` placeholder de Lovable en `/express/` (ahora `hero-printer-DHSLDeTJ.jpg`); `/express/` añadido al sitemap; `lastmod` refrescados.
4. **Google Fonts asíncrona en home** (`media="print"` + `onload` + `noscript`) para recortar ~0.8s de render-blocking.

### 5. ✅ Indexación EN gestionada en GSC (en vivo)
* Inspección URL por URL: `/en/` y las 7 landings `-en.html` **ya estaban indexadas** (el informe de GSC iba retrasado). Solo faltaban `control-solar-en.html` y `/express/en/`: se envió **"Solicitar indexación"** para ambas (cola prioritaria de rastreo, 5-jul-2026).
* Crawlers de IA verificados con curl: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot y Google-Extended reciben **200 OK** (ni robots.txt ni LiteSpeed los bloquean). `llms.txt` responde 200.

### 6. ✅ Alta en Bing Webmaster Tools + IndexNow (5-jul-2026)
* **BWT:** sesión con Google (misma cuenta de GSC). Se importaron los sitios desde Search Console: `rotulatepublicidad.com` y `rotulatepublicidad.com/express` quedaron **verificados sin cambios en el sitio**. Sitemap `sitemap.xml` enviado manualmente (estado "Procesando").
* **IndexNow:** llave `be088c42d6344fdaac9845c0056e7090.txt` en la raíz del sitio (commit `4caad0f`, verificada 200 en producción). Ping inicial a `api.indexnow.org` con las 22 URLs del sitemap → **HTTP 202 Accepted**. Nota para deploys futuros: al publicar páginas nuevas/modificadas se puede repetir el ping (POST JSON con host/key/urlList) para indexación casi inmediata en Bing/Copilot.
* Contexto: el índice de Bing alimenta a ChatGPT/Copilot, así que esta alta cierra el hueco principal de visibilidad en asistentes de IA.

### 7. ⚽ Promo temporal "¿Y si sí?" — Selección Mexicana (commit `5c8eb95`)
* La mascota del hero (`.astronaut-mascot`) se sustituye temporalmente por el logo promocional "¿Y si sí? Vamos México por la Copa del Mundo" (`assets/ysisi-promo.webp/png`, fondo removido con flood-fill desde bordes vía sharp, 900px, 131 KB webp).
* **Swap con fecha límite en `main.js`** (la CSP no permite scripts inline): se muestra solo hasta el **6-jul-2026 23:59 hora Cancún** (`2026-07-07T05:00:00Z`); pasada la fecha el astronauta vuelve **automáticamente sin deploy**. Hereda la animación de flotación del contenedor; clase `.ysisi-promo` en `style.css` (190px + glow verde/rojo). Versiones cacheadas bump a `?v=2.6`.
* Limpieza opcional posterior: eliminar el bloque de `main.js`, la regla CSS y los 2 assets cuando pase el evento (no urgente, es inerte tras la fecha). La imagen fuente cruda quedó local en `assets/ysisi/` (sin trackear).

### 8. ⚡ Optimización de rendimiento (commit `6e9a5f8`)
* **Space Grotesk self-hosted:** fuente variable (300–700) en `assets/fonts/*.woff2` (29 KB, subsets latin + latin-ext con `unicode-range`). `@font-face` en `style.css` y en `assets/fonts/fonts.css` (para `/express/en/` que no usa style.css). Se eliminaron los `<link>` de Google Fonts y preconnects de las 22 páginas HTML. Elimina ~850ms de CSS bloqueante: **FCP móvil 2.7s → 1.2s**. CSP: `font-src` ahora incluye `'self'` (se conserva `fonts.gstatic.com` porque el bundle del SPA `/express/` aún lo usa).
* **Carga diferida del stack del formulario:** Supabase + EmailJS + `supabase-config.js` + `upload.js` (~100 KB) ya no cargan con la página; `main.js` los inyecta vía IntersectionObserver (600px antes de llegar al formulario `#cotizar`) con respaldo `focusin`. `upload.js` ahora se inicializa con wrapper consciente de `readyState` (su listener de DOMContentLoaded no dispararía al cargarse tarde). Verificado en producción: cliente Supabase inicializa al scrollear al formulario.
* **Caché de imágenes:** TTL 1 mes → 1 año en `.htaccess` (los assets versionan por nombre/?v=).
* Versiones: `style.css?v=2.9` sitewide, `main.js?v=2.9`.
* **Nota Lighthouse:** móvil 84 con LCP 3.9s y CLS 0.117 — el CLS/LCP degradado es efecto **temporal del swap del promo** "¿Y si sí?" (reemplaza la imagen del hero post-carga); al expirar el promo (6-jul 23:59) se estima ~90-92.

### 9. 💬 WhatsApp pre-llenado por servicio (commit `e2b6308`)
* Los 60 enlaces `wa.me` (botón flotante + CTAs) de las 19 páginas ahora abren WhatsApp con mensaje específico del servicio, en el idioma de la página (ej. "Hola Rotúlate, quiero cotizar letras 3D para mi negocio." / "Hello Rotúlate, I'd like a quote for a custom awning."). Los `sameAs` de JSON-LD se dejaron sin parámetros. `/lonas-cancun/` ya lo tenía.

### 10. 🍞 Breadcrumbs con schema (commit `7742946`)
* Miga de pan visible (`Inicio › Servicio` / `Home › Service`) sobre el H1 de las **18 páginas de servicio** (9 ES + 8 EN + `/lonas-cancun/`), estilo de marca (blanco tenue, separador y hover lima), `aria-label` y `aria-current` correctos.
* JSON-LD `BreadcrumbList` por página (2 niveles; ES apunta a `/`, EN a `/en/`). Clase `.breadcrumbs` en `style.css` (bump a `?v=3.0` en páginas tocadas).

### 11. 🖼️ Lightbox en galería de `/lonas-cancun/` (commit `b46f1ca`)
* **Hallazgo:** la galería del home ya tenía lightbox funcional (sección 9 de `main.js`); solo faltaba en la mini-galería de lonas.
* Se añadió `initMiniGaleriaLightbox()` a `lonas-cancun/main.js` reutilizando los estilos `#lightbox`/`.lb-*` de `../style.css`. Abre la versión a tamaño completo (quita el sufijo `-thumb`), con prev/next, flechas de teclado, Esc, clic en fondo y swipe táctil. `cursor: pointer` en las tarjetas. Verificado en producción (abrir, navegar, cerrar). Versiones: lonas `main.js?v=2.6`, `style.css?v=3.1`.

### 12. 🏗️ `/express/` reconstruido como HTML estático (commits `1464464`, `ded495f`, `2b70b30`)
* **Parte 1:** contenido español del SPA capturado del render en producción → [express/contenido-es-referencia.md](file:///c:/Users/omac_/rtmx-web/express/contenido-es-referencia.md).
* **Parte 2:** nuevo [express/index.html](file:///c:/Users/omac_/rtmx-web/express/index.html) estático e indexable, espejo de la estructura de `express/en/index.html` (mismo CSS Tailwind compilado `assets/index-b314nm7x.css`, SVGs Lucide inline). Fiel al SPA: hero + 3 servicios + 3 ventajas + CTA + footer, sin FAQ (el SPA no la tenía visible). Añade canonical, hreflang, schema LocalBusiness, fuente self-hosted, WhatsApp pre-llenado y switcher 🇺🇸 EN. **Paridad visual verificada en producción.**
* **Parte 3:** bundle React viejo (`assets/index-d6sn2umm.js`) eliminado del repo (la copia en el servidor queda huérfana e inofensiva: rsync sin `--delete`; se puede purgar a mano). Sitemap `lastmod` actualizado, ping IndexNow (200) y **"Solicitar indexación" enviado en GSC** para `/express/`.
* Beneficio: la página #2 en clics del sitio por fin tiene contenido rastreable por Google y legible por agentes de IA, sin bundle JS de ~100+ KB.

### 13. 📋 Backlog restante
1. GBP: responder reseñas y publicar fotos recientes con regularidad (Google lo sugiere en el panel).
2. Vigilar en 1–2 semanas que `control-solar-en.html` y `/express/en/` pasen a "indexada" en GSC y que EE. UU. empiece a registrar clics; revisar también "URL descubiertas" del sitemap en BWT.
3. Opcional: automatizar el ping de IndexNow en el workflow de deploy (curl al final de `deploy.yml` con las URLs modificadas).

---

## 📅 Resumen de la Sesión (27 de Junio, 2026)

Añadimos el archivo `llms.txt`, anotaciones de WebMCP en formularios y optimizamos el rendimiento móvil y accesibilidad del sitio basándonos en el reporte de Google PageSpeed Insights.

### 1. ✅ Creación de `llms.txt`
* **Especificación e Implementación:** Creamos [llms.txt](file:///c:/Users/omac_/rtmx-web/llms.txt) siguiendo la especificación recomendada (Markdown válido con al menos un H1). Contiene una descripción concisa de la especialidad de Rotúlate Publicidad y enlaces absolutos indexables tanto a la versión en español como a la versión en inglés de las páginas clave del sitio.

### 2. ✅ Anotaciones WebMCP para Agentes de IA
* **Implementación en Formularios:** Añadimos anotaciones de WebMCP (`toolname`, `tooldescription` y `toolparamdescription`) al formulario de cotización en [index.html](file:///c:/Users/omac_/rtmx-web/index.html) y a la calculadora en [lonas-cancun/index.html](file:///c:/Users/omac_/rtmx-web/lonas-cancun/index.html). Esto permite a agentes de IA comprender y utilizar los formularios de manera directa y confiable, resolviendo la recomendación experimental de PageSpeed.

### 3. ✅ Optimización de Rendimiento Móvil (LCP/FCP)
* **Recursos sin bloqueo de renderizado:** Añadimos el atributo `defer` a las llamadas de los scripts de EmailJS y Supabase en [index.html](file:///c:/Users/omac_/rtmx-web/index.html) para eliminar el retraso de renderizado inicial (ahorro estimado de **1.36s**).
* **Compresión física de logotipos y recursos:** Desarrollamos un script de optimización automatizada de imágenes con `sharp` para redimensionar los logotipos del carrusel de proveedores (`avery-logo.png`, `XPEL-logo.webp`, `mactac-logo.png`, `3m-logo.png`) a un ancho máximo de 200px, y la fachada [assets/alucobond.webp](file:///c:/Users/omac_/rtmx-web/assets/alucobond.webp) a 800px. Logramos reducciones de peso de entre **41.47% y 92.25%** por imagen.

### 4. ✅ Mejoras de Accesibilidad (Lighthouse)
* **Corrección de Contraste de Color:** Aumentamos la opacidad del texto indicador de la versión del formulario `"v1.02"` en [index.html](file:///c:/Users/omac_/rtmx-web/index.html) a `color: rgba(255, 255, 255, 0.55)`, resolviendo la advertencia de contraste (ratio superior a 4.5:1).
* **Jerarquía de Encabezados del Footer:** Cambiamos todas las cabeceras `<h4>` del pie de página a `<h3>` en los 20 archivos HTML del proyecto para corregir la secuencia semántica de Lighthouse, y adaptamos las reglas en [style.css](file:///c:/Users/omac_/rtmx-web/style.css) a `.footer-nav h3, .footer-contact h3`.

---

## 📅 Resumen de la Sesión (26 de Junio, 2026)


Revisión del nuevo export de GSC (`seo_performance/`, últimos 3 meses) y acciones SEO on-page de alto valor sobre `/lonas-cancun/`.

### 1. 🔍 Análisis GSC (3 meses, mar 25 – jun 24, 2026)
* **Totales:** ~113 clics, ~4,146 impresiones, CTR ~2.7%, posición media ~7.4. Tendencia al alza clara (de ~15-30 impresiones/día en marzo a ~80-140/día en junio).
* **Páginas top:** `/express/` (39 clics) y la home (36 clics, posición 5.78, la mejor posicionada).
* **Mayor fuga de tráfico:** query "lonas cancun" con 185 impresiones pero solo 1 clic (CTR 0.54%, **posición 9.58**). La página `/lonas-cancun/` rankea 7.9 con CTR 1.3%. El problema no es el snippet (título/meta ya están bien optimizados con precio y urgencia) sino la **autoridad/ranking**.
* **EE. UU.:** 633 impresiones, 0 clics (búsquedas probablemente en inglés cayendo en páginas en español).

### 2. ✅ Cambios aplicados
* **Enlazado interno (palanca #1 de ranking):** `/lonas-cancun/` solo se enlazaba desde el footer de la home. Añadimos una **tarjeta dedicada "Impresión de Lonas en Cancún"** como primera del grid de servicios en [index.html](file:///c:/Users/omac_/rtmx-web/index.html) (enlace contextual con anchor rico en keywords + imagen). Reutiliza `assets/gran-formato.webp/jpg`.
* **Fix de FAQPage schema en `/lonas-cancun/`:** el JSON-LD `FAQPage` no coincidía con las preguntas visibles (listaba "¿Hacen envíos a domicilio?" y "¿cobro mínimo en lonas?" inexistentes en pantalla, y omitía "¿Qué lona aguanta el sol/viento?"). Sincronizamos el schema con las 5 preguntas visibles reales para cumplir las directrices de Google y no suprimir rich results.

### 3. ✅ Segunda tanda (enlazado interno + CTR/rich data)
* **Enlaces internos contextuales a `/lonas-cancun/`:** añadidos en el body de [anuncios-luminosos.html](file:///c:/Users/omac_/rtmx-web/anuncios-luminosos.html), [letras-3d.html](file:///c:/Users/omac_/rtmx-web/letras-3d.html) y [toldos.html](file:///c:/Users/omac_/rtmx-web/toldos.html) (antes solo tenían enlaces a `/#...`, ningún cross-link a páginas de servicio). Anchor rico en keywords ("impresión de lonas en Cancún"), color `var(--color-gray)`. `gran-formato.html` ya enlazaba 2 veces, se dejó igual.
* **FAQPage JSON-LD añadido** a esas tres páginas (antes solo tenían `Service`+`LocalBusiness`; `gran-formato.html` ya tenía `FAQPage`). El schema refleja exactamente las 4 preguntas visibles de cada una. Nota: desde el cambio de política de Google (2023) los rich results de FAQ rara vez se muestran para sitios no gubernamentales/salud, así que el valor es principalmente de comprensión de entidad y consistencia, no snippet garantizado.
* **Hallazgo que corrige la premisa de Tarea 3 (inglés):** `/express/en/` **NO es un SPA** — es HTML estático indexable (441 líneas, con schema y hreflang, ya en el sitemap). El SPA sin contenido crawleable es `/express/` **en español** (no está en el sitemap). Páginas en inglés existentes: `express/en/index.html` y `control-solar-en.html`. La infraestructura en inglés (hreflang recíproco, plantilla `control-solar-en.html`) ya está lista para replicar más landings.

### 4. ✅ Tarea 3: Home en inglés (`/en/`)
* **Nueva página:** [en/index.html](file:///c:/Users/omac_/rtmx-web/en/index.html) — homepage en inglés indexable, modelada sobre `control-solar-en.html` (estática, sin reimplementar el formulario Supabase para no introducir fragilidad). Rutas **absolutas** (`/style.css`, `/assets/...`, `/main.js`, `/gtm.js`). Secciones: hero, 8 servicios (tarjetas; las que tienen versión EN enlazan a `/control-solar-en.html` y `/express/en/`), strip de marcas, proceso, nosotros, reseñas traducidas (marcadas "translated"), FAQ en inglés (7 preguntas) y CTA a WhatsApp/email. Schema: `LocalBusiness` + `WebSite` (inLanguage en) + `FAQPage`, todos válidos.
* **hreflang recíproco:** añadido bloque en [index.html](file:///c:/Users/omac_/rtmx-web/index.html) (es→`/`, en→`/en/`, x-default→`/`). El `/en/` apunta de vuelta al español.
* **Switch de idioma:** el link "🇺🇸 EN" del nav del home español ahora apunta a `/en/` (antes a `/express/en/`). En `/en/` el "🇪🇸 ES" apunta a `/`.
* **Sitemap:** añadida `https://rotulatepublicidad.com/en/` (priority 0.90) en [sitemap.xml](file:///c:/Users/omac_/rtmx-web/sitemap.xml).
* Reseñas: se tradujeron las 4 reseñas reales de Google y se etiquetaron como "(translated)" para transparencia.

### 5. 📋 Pendiente / Backlog SEO
* Subir `/lonas-cancun/` de posición ~9 a top 5 (más enlaces internos contextuales desde páginas de servicio relacionadas: gran-formato, anuncios-luminosos; considerar reseñas/backlocales).
* Mejorar CTR de páginas en posición 6-10 (`anuncios-luminosos.html`: 198 impresiones, CTR 0.51%).
* Cerrar el ciclo de EE. UU./inglés (633 impresiones, 0 clics) — `/express/` es un SPA compilado (Lovable/Vite) sin contenido en el HTML estático; evaluar landing inglés indexable.

---

## 📅 Resumen de la Sesión (17 de Junio, 2026)

Analizamos el rendimiento SEO local a partir de la carpeta `seo_performance` (datos de GSC de marzo-juni de 2026) y ejecutamos las mejoras pendientes de metadatos locales y datos estructurados.

### 1. 🔍 Análisis de Rendimiento SEO (GSC)
* **Tendencia:** Crecimiento sólido de ~15-20 impresiones/día en marzo a 80-125 impresiones/día en junio.
* **Páginas Clave:** `/express/` y `/` lideran el tráfico. `/lonas-cancun/` tiene alta visibilidad pero bajísimo CTR (0.86%), y varias páginas de servicios clave tienen 0 clics (están en las posiciones 7-10).
* **Oportunidades:** El tráfico de EE. UU. representa 417 impresiones sin clics, validando la landing en inglés. Los "Fragmentos de productos" generan 319 impresiones con CTR de 0.63% debido a la falta de estructuración enriquecida.
* Creamos el reporte completo en [reporte_rendimiento_seo.md](file:///C:/Users/omac_/.gemini/antigravity-cli/brain/8605a08a-562f-4e3b-9ef0-c0619e239f2d/reporte_rendimiento_seo.md).

### 2. ✍️ Optimización de Metadatos Locales
* Modificamos títulos y meta descripciones en 6 landing pages de servicios clave para enfocar la búsqueda local en Cancún, agregar ganchos comerciales ("desde $230/m²", "entrega express", "garantía", "iluminación LED") y aumentar el CTR orgánico:
  * `/rotulacion-vehicular.html`
  * `/toldos.html`
  * `/gran-formato.html`
  * `/letras-3d.html`
  * `/anuncios-luminosos.html`
  * `/lonas-cancun/index.html`

### 3. 🏷️ Marcado Estructurado Enriquecido (Rich Snippets)
* **Lonas Cancún (`/lonas-cancun/index.html`):** Cambiamos el marcado estructurado de `Service` a un `Product` principal ("Impresión de Lonas Publicitarias en Cancún") con un `AggregateOffer` (especificando el rango de precios de $230 a $350 MXN) y `aggregateRating` (5.0 estrellas basadas en 4 valoraciones del perfil de negocio).
* **Control Solar (`/control-solar.html`):** Añadimos el `aggregateRating` del negocio a cada una de las 6 líneas de películas de control solar 3M en el catálogo.
* Esto resolverá las advertencias en Google Search Console y permitirá mostrar estrellas doradas y rangos de precio directamente en los resultados de búsqueda.

### 4. 🗺️ Actualización del Sitemap
* Sincronizamos las fechas `<lastmod>` a `2026-06-17` en `sitemap.xml` para los 7 archivos modificados.

### 5. 🇺🇸 Optimización de la Versión en Inglés (`/express/en/`)
* **Interconexión (Hreflang & Switcher):** Añadimos etiquetas cruzadas `hreflang` en la landing Express de español e inglés, y creamos enlaces directos del selector de idioma (botón `🇺🇸 EN` con acento lima en la cabecera principal e `Español` en el menú en inglés). Esto resuelve el problema de "página huérfana" y transfiere autoridad SEO.
* **Marcado Estructurado:** Creamos e inyectamos los esquemas estructurados JSON-LD en inglés para `LocalBusiness` y `FAQPage` en `express/en/index.html`.
* **Sección Visual de FAQ:** Diseñamos y agregamos una sección de preguntas frecuentes directamente en el HTML de la página en inglés para resolver dudas de clientes internacionales sobre envío de archivos, métodos de pago y entregas en resorts.

### 6. ☀️ Lanzamiento de la Página de Control Solar en Inglés (`/control-solar-en.html`)
* **Mercado Objetivo:** Enfocado en la alta demanda residencial de lujo en Puerto Cancún, Zona Hotelera y Riviera Maya (propietarios y administradores extranjeros de condominios y villas frente al mar).
* **Traducción y Copy:** Tradujimos todo el contenido de `control-solar.html` incluyendo especificaciones de las 6 líneas de películas 3M, FAQs y descarga de catálogo.
* **SEO e Interconexión:** Añadimos etiquetas `hreflang` cruzadas en ambas cabeceras y colocamos los botones de idioma (`🇺🇸 EN` y `🇪🇸 ES`) en el menú de navegación de ambos archivos respetando los colores del menú (blanco por defecto, hover lima verde de marca).
* **Marcado Estructurado:** Creamos el esquema JSON-LD en inglés para el servicio y las 6 líneas de producto 3M, enriquecido con la valoración de 5.0 estrellas.

### 7. 🛠️ Diagnóstico y Corrección de Formulario de Contacto
* **Diagnóstico de Supabase Storage:** Confirmamos que el bucket `cotizaciones` no existía físicamente en el Storage de Supabase (retornando error 404). El usuario procedió a crearlo en su dashboard.
* **Conflicto de Tabla del Admin Panel:** Detectamos que la tabla `cotizaciones` ya existía en la base de datos de producción porque es la tabla principal del ERP/admin panel (`rtmx-cotizador`), con dependencias activas (artículos, órdenes, facturas).
* **Solución de Aislamiento:** Redirigimos el formulario web para escribir en una nueva tabla independiente `cotizaciones_web` en `upload.js`, evitando alterar la estructura del ERP.
* **Honeypot de Spambots:** Renombramos el campo honeypot de `website-url` a `form-temp-verify` en `index.html` y `upload.js` para evitar que los autocompletados del navegador lo llenaran por error.
* **EmailJS:** Envolvimos el envío de correos en un bloque `try-catch` independiente en `upload.js` para que las fallas de EmailJS no bloqueen la pantalla de confirmación del usuario una vez guardados los datos en Supabase.

### 8. 🛡️ Auditoría e Implementación de Seguridad y UX (Fase 1 y 2)
* **Auditoría Integral:** Realizamos una auditoría profunda de velocidad, UX y seguridad documentada en [speed_ux_security_audit.md](file:///C:/Users/omac_/.gemini/antigravity-cli/brain/8605a08a-562f-4e3b-9ef0-c0619e239f2d/speed_ux_security_audit.md).
* **Corrección de Vulnerabilidad DOM XSS (Fase 1):** Modificamos la inyección del nombre del archivo seleccionado en [upload.js](file:///C:/Users/omac_/rtmx-web/upload.js) reemplazando la inyección directa por asignación segura vía `textContent` en vez de `innerHTML`.
* **Eliminación de Cumulative Layout Shift - CLS (Fase 1):** Agregamos los atributos de `width` y `height` nativos a todos los logos del marquee deslizante de marcas proveedoras, del header, de la sección de Nosotros y del footer en [index.html](file:///C:/Users/omac_/rtmx-web/index.html) para evitar desplazamientos de pantalla durante la carga.
* **Optimización de Peso de Imágenes (Fase 2):** Convertimos la pesada imagen de fallback `control-solar.png` (1.99 MB) en una versión JPEG optimizada `control-solar.jpg` (187 KB), logrando una reducción del 90.6%. Actualizamos las referencias de fallback y de Open Graph (OG) en [index.html](file:///C:/Users/omac_/rtmx-web/index.html), [control-solar.html](file:///C:/Users/omac_/rtmx-web/control-solar.html) y [control-solar-en.html](file:///C:/Users/omac_/rtmx-web/control-solar-en.html).
* **Limpieza de Archivos Huérfanos (Fase 2):** Eliminamos de la carpeta de assets más de 12 MB de imágenes y capturas antiguas sin uso en el código (`carrusel_X.png`/`carrusel_X.webp`), agilizando el peso de los deploys.
* **Corrección de Galería y Permisos (Deploy Local):** Diagnosticamos y corregimos el problema con las imágenes de la galería y logos que retornaban 404/403 debido a que `scp -r` de Windows establece permisos `700` en carpetas remotas. Reestablecimos `755`/`644` de forma remota y modificamos el script `deploy-local.ps1` para realizar la corrección automática de permisos vía SSH tras cada despliegue.
* **Limpieza de Sintaxis HTML:** Eliminamos una etiqueta de cierre `</section>` duplicada e inválida en `index.html` (línea 480) que quedaba huérfana tras la galería de trabajos.
* **Expansión de Versión en Inglés para Eventos y Bodas (Fase 2):** Añadimos 3 nuevas tarjetas en la cuadrícula de servicios de la landing `/express/en/index.html` enfocadas en "Corporate Events", "Destination Weddings" y "Resort Delivery", inyectamos 2 nuevas FAQs de soporte al cliente internacional y las sincronizamos con el esquema estructurado JSON-LD FAQPage en la cabecera.
* **Corrección Global de Cumulative Layout Shift (CLS):** Agregamos atributos `width="160"` y `height="48"` con `loading="lazy"` al logo de Rotúlate en el pie de página (`footer-logo-img`) de los 11 archivos de servicios y landings independientes, eliminando por completo cualquier desplazamiento visual del footer durante la carga.

---

## 📅 Resumen de la Sesión (12 de Junio, 2026)

Integramos el catálogo de **películas de control solar 3M** al sitio, alineado al plan de SEO local de Cancún.

### 1. 📄 Procesamiento del Catálogo 3M
* Fuente: PDF de 15 páginas `PELICULAS DE CONTROL SOLAR 3M 16042021.pdf` (presentación de slides, sin texto extraíble).
* Extrajimos las imágenes JPEG embebidas con Node.js (sin Python en la máquina; se usó `pdf-parse` + extracción binaria de streams DCTDecode) y recortamos las fotos de producto con `sharp`, eliminando los bordes negros de los slides.
* Resultado: 6 fotos optimizadas en WebP (~25-50 KB) en `assets/`: `3m-prestige.webp`, `3m-ceramic.webp`, `3m-neutral.webp`, `3m-night-vision.webp`, `3m-silver-p18.webp`, `3m-prestige-exterior.webp`.
* El PDF se renombró a `assets/catalogo-3m-control-solar.pdf` (sin espacios, para evitar problemas con rsync/FTP) y quedó como descarga pública en la página.

### 2. 🌞 Página `control-solar.html` Ampliada
* **Nueva sección "Líneas de Película 3M"**: 6 cards (Prestige, Ceramic, Neutral, Night Vision, Silver P18, Prestige Exterior) con foto y descripción SEO por línea. Diseño consistente con el estilo del sitio (glassmorphism `rgba(255,255,255,0.04)`, acento lima `#C8F135`, Space Grotesk).
* **Nueva sección "¿Cómo funciona?"**: comparativa de energía solar del catálogo (87% transmitida sin película vs 12% con película 3M) construida en HTML real, no como imagen, para que sea indexable.
* **FAQ ampliado**: 2 preguntas nuevas (diferencias entre líneas 3M, interferencia con celular/WiFi) y menciones de 3M en las respuestas existentes.
* **SEO/Schema**: `title`, meta description y OG ahora incluyen "3M" (captura "película 3M Cancún", "polarizado 3M"). El JSON-LD del Service ahora lleva `brand: 3M` y un `hasOfferCatalog` con las 6 líneas como `Product`. Se añadió un schema **FAQPage** nuevo — esto atiende parcialmente el punto 3 del backlog (fragmentos de producto con 0% CTR).
* `index.html`: la card del showcase dice "Control Solar 3M en Cancún" y el Offer del schema incluye 3M. `sitemap.xml`: `lastmod` actualizado.

### 3. 🧑‍🚀 Optimización del Astronauta del Hero
* **Imagen del Astronauta**: El astronauta del hero en `index.html` usaba la imagen `assets/astronauta_mx.png` que pesaba 1.29 MB.
* **Optimización**: Redimensionamos el ancho a `900px` (adecuado para pantallas Retina/2x) y la optimizamos en dos formatos usando `sharp`:
  * **WebP**: Creado `assets/astronauta_mx.webp` (~86.5 KB, reducción de ~93%).
  * **PNG**: Comprimido y optimizado el fallback `assets/astronauta_mx.png` (~184 KB, reducción de ~85%).
* **Efectos y Estilos**: Se conservan todos los efectos definidos en CSS (`style.css`), incluyendo la animación de flotación y el efecto de sombra `drop-shadow` de múltiples capas de la clase `.astronaut-mascot` en su tamaño original.
* **HTML**: Modificamos el tag `<picture>` en `index.html` para usar `<source srcset="assets/astronauta_mx.webp" type="image/webp">` como opción primaria de carga y la versión PNG optimizada como fallback.

### 4. 🚀 Deploy
* Commit `d90888a` pusheado a `main`. El primer intento del workflow falló por **timeout SSH transitorio** hacia Hostinger (puerto 65002); el rerun (`gh run rerun <id> --failed`) pasó en 18 segundos. **Lección: si el deploy falla con "Connection timed out", reintentar antes de tocar el workflow.**
* Importante: el deploy del 6 de junio también había fallado en silencio, por lo que este push sincronizó todo lo pendiente en el servidor.
* Verificado en producción: título 3M, sección de líneas, PDF descargable e imágenes WebP responden 200.

---

## 📅 Resumen de la Sesión (05 de Junio, 2026)

Hoy trabajamos en el análisis SEO local del sitio, la expansión para capturar tráfico del mercado angloparlante en Cancún, la corrección de navegación, y la migración total de la base de datos y almacenamiento de archivos de Firebase a **Supabase**.

### 1. 🔍 Análisis de Google Search Console (GSC)
* Procesamos la exportación de datos de GSC localizada en `rotulatepublicidad.com-Performance-on-Search-2026-06-05/`.
* Identificamos que la landing page `/express/` es la más exitosa del sitio, aportando más del **60% de los clics totales** y el **63% de las impresiones**.
* Detectamos tráfico latente desde EE. UU. (207 impresiones, 0 clics) que justificaba la creación de una versión en inglés.

### 2. 📥 Integración de la Landing `/express/`
* La carpeta `/express/` estaba en producción (subida manualmente desde Lovable) pero **no existía en el repositorio Git**. La descargamos y la consolidamos bajo control de versiones.
* Corregimos un error de navegación en ambas versiones (español e inglés): el enlace del logotipo en el header apuntaba a `#`. Lo modificamos a `/` para que regrese al sitio principal. En español, esto requirió parchar el bundle React compilado (`express/assets/index-d6sn2umm.js`) reemplazando la referencia exacta de `href:"#"` a `href:"/"`.

### 3. 🇺🇸 Versión en Inglés (`/express/en/`)
* Desarrollamos la versión en inglés en [express/en/index.html](file:///c:/Users/omac_/rtmx-web/express/en/index.html).
* Se construyó como **HTML estático** utilizando la hoja de estilos Tailwind precompilada del original (`../assets/index-b314nm7x.css`) y los íconos nativos Lucide (en código SVG). Esto la hace ultraligera para carga móvil.
* Tradujimos todos los encabezados, textos de conversión y botones de WhatsApp (`+529984007987`) con textos personalizados en inglés.
* Se agregó la URL `/express/en/` al [sitemap.xml](file:///c:/Users/omac_/rtmx-web/sitemap.xml).

### 4. 🛠️ Solución al Fallo de Despliegue en GitHub Actions
* La acción de despliegue `.github/workflows/deploy.yml` (SFTP mediante `rsync`) fallaba en el paso `Setup SSH key` debido a que el comando `ssh-keyscan` a menudo fallaba en el runner de GitHub (por bloqueos/timeouts en el puerto `65002` desde las IPs de Azure).
* **Solución aplicada:** Eliminamos `ssh-keyscan` y añadimos directamente las firmas de llave pública del servidor (RSA, ECDSA y ED25519) en el archivo `known_hosts` del runner de forma local y estática. El pipeline ahora despliega de forma exitosa y rápida.

### 5. 🔌 Migración Core: De Firebase a Supabase
* Migramos la base de datos de cotizaciones y la subida de archivos adjuntos a **Supabase** para lograr una integración directa con el panel de administración central (`rtmx-cotizador`).
* **Remoto (Base de Datos y Storage):**
  * Usamos Supabase CLI con el flag `--linked` para ejecutar de manera directa el esquema de migración en la base de datos de producción (`wtljdvexsksextnhpkkd`).
  * Creamos la tabla `public.cotizaciones` con políticas RLS de inserción anónima (`anon`) y lectura total para usuarios autenticados (`authenticated`).
  * Configuramos el bucket público `cotizaciones` en Supabase Storage junto con políticas de carga anónima e inicialización pública de lectura para archivos adjuntos.
* **Frontend (`rtmx-web`):**
  * Reemplazamos las librerías CDN de Firebase por la CDN oficial de `@supabase/supabase-js@2` en [index.html](file:///c:/Users/omac_/rtmx-web/index.html).
  * Creamos [supabase-config.js](file:///c:/Users/omac_/rtmx-web/supabase-config.js) para la inicialización global del cliente mediante la clave anónima pública del proyecto.
  * Modificamos [upload.js](file:///c:/Users/omac_/rtmx-web/upload.js): reescribimos el guardado en base de datos (`supabase.from('cotizaciones').insert()`), la subida de archivos al storage (`supabase.storage.from('cotizaciones').upload()`) y la obtención de las URLs públicas (`getPublicUrl()`).
  * Actualizamos [.htaccess](file:///c:/Users/omac_/rtmx-web/.htaccess): añadimos los dominios de la API de Supabase en la política CSP (`connect-src`) y retiramos las referencias a Firebase.
  * Eliminamos todos los archivos locales del SDK y configuración de Firebase (`firebase-config.js`, `firebase.json`, `.firebaserc`, `firestore.rules`, `storage.rules`).

---

## 📌 Estado Actual

* **Despliegue:** 100% operativo. Última sesión validada en producción el 26 de junio de 2026 (mejoras SEO: enlazado interno a lonas, FAQPage schema en páginas de servicio, y nueva home en inglés `/en/` — commits `680d1b7`, `b9273cb`, `9492382`). Nota: el deploy de `680d1b7` marcó `failure` por `Connection timed out` transitorio en el puerto 65002, pero los deploys posteriores (rsync = sync completo) ya subieron esos cambios.
* **Conexión a Supabase:** Integración completada y activa. El formulario escribe datos de forma segura en la nueva tabla `cotizaciones_web` y los archivos se suben al bucket público `cotizaciones`.
* **Ajustes de Formulario:** Se corrigieron los problemas del honeypot (evitando autocompletados no deseados de navegadores) y se aisló el flujo de EmailJS en `upload.js` para evitar fallos globales en caso de errores en la notificación por correo.
* **URLs funcionales en producción:**
  * Inicio Español: [https://rotulatepublicidad.com/](https://rotulatepublicidad.com/)
  * Control Solar 3M: [https://rotulatepublicidad.com/control-solar.html](https://rotulatepublicidad.com/control-solar.html)
  * Express Español: [https://rotulatepublicidad.com/express/](https://rotulatepublicidad.com/express/)
  * Express Inglés: [https://rotulatepublicidad.com/express/en/](https://rotulatepublicidad.com/express/en/)
  * Home Inglés (nueva): [https://rotulatepublicidad.com/en/](https://rotulatepublicidad.com/en/)
  * Lonas Cancún: [https://rotulatepublicidad.com/lonas-cancun/](https://rotulatepublicidad.com/lonas-cancun/)
* **Documentación:** Se actualizaron este archivo [agents.md](file:///c:/Users/omac_/rtmx-web/agents.md) y el reporte de diagnóstico del formulario [diagnostic_form_report.md](file:///C:/Users/omac_/.gemini/antigravity-cli/brain/8605a08a-562f-4e3b-9ef0-c0619e239f2d/diagnostic_form_report.md). El archivo [README.md](file:///c:/Users/omac_/rtmx-web/README.md) en español y [supabase_setup.sql](file:///c:/Users/omac_/rtmx-web/supabase_setup.sql) explican la configuración inicial.

---

## 📋 Próximos Pasos Recomendados (Backlog)

Si vas a continuar trabajando en este proyecto, te sugerimos enfocarte en las siguientes tareas:

1. **⚙️ Integrar Lectura de Cotizaciones en el Admin (`rtmx-cotizador`):**
   * Dado que la tabla y bucket `cotizaciones` ya están en el mismo Supabase centralizado, añade una sección en el panel admin para ver las cotizaciones entrantes del sitio público, asignarlas a asesores y convertirlas en órdenes de trabajo.
2. **🇬🇧 Expansión del Contenido en Inglés:**
   * Si la landing page `/express/en/` empieza a reportar clics orgánicos, evalúa traducir o crear landings específicas en inglés para eventos corporativos y bodas de destino en Cancún (ej. banners, displays tipo araña, stands).

### 8. ✅ Home EN service cards
* Converted the service cards in [en/index.html](file:///C:/Users/omac_/rtmx-web/en/index.html) into real click targets.
* Added seven new English landings for the services that previously only existed in Spanish: vehicle wraps, illuminated signs, large format printing, 3D letters, alucobond facades, awnings, and neon flex.
* Added reciprocal `hreflang` blocks to the Spanish service pages and updated `sitemap.xml` so the English pages are indexable and connected.
