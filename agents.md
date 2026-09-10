# Handoff para Agentes de IA — Estado del Proyecto

Este archivo sirve para transferir el contexto del desarrollo actual del sitio web **Rotúlate Publicidad** a cualquier agente de IA que colabore en el futuro. Es la **fuente única de verdad** para documentar el estado activo de desarrollo, la bitácora de sesiones históricas, notas de investigación y el backlog de tareas pendientes (evitando duplicar esta información en `CLAUDE.md`).

---
## 🔒 CIERRE FINAL — 09 de Septiembre, 2026 (título e iconos del hero)

**Estado al cerrar:** cambios subidos a `main`; los tres despliegues de esta sesión terminaron en `success`. Este cierre sustituye el título y las versiones anteriores documentadas abajo. Cache-bust vigente: `style.css?v=3.8`, `main.js?v=3.5`.

**Commits y verificación:** `549e52f` (título e iconos, run `34418054373`), `4bd4fce` (incluir Cancún, run `34418091922`) y `6752264` (evitar partición de palabras, run `34418431758`). Tras el segundo deploy se consultó la home pública con curl y se confirmó el H1 final y los tres SVG nuevos. Para el último ajuste CSS se confirmó el éxito del workflow y la validación estática local; no se hizo comprobación visual en navegador, por lo que queda pendiente revisar el ajuste en desktop y móvil.

**Próxima sesión:** revisar visualmente el hero y continuar con los pendientes comerciales/SEO del cierre anterior (foto de Rojo Mate, política de corte a medida, limpieza de archivos remotos y plan SEO/UX). No quedan cambios versionados del sitio sin commit al cerrar; las carpetas locales no versionadas se conservan fuera del commit.

* Corrección posterior en producción: Omar reportó «im-presión» cortado en desktop. Causa: `hyphens: auto` y `word-break: break-word` heredados del hero. Se desactivan solo en `.hero-title-home` y se agrupa «e impresión» con `white-space: nowrap` para que salte completo. Cache-bust global `style.css?v=3.8` en las páginas versionadas que lo cargan. Validación: 41/41 HTML balanceados y diff sin errores.
* Actualización posterior de Omar: H1 final «Rótulos, anuncios e impresión / en Cancún y Riviera Maya / Cotiza ahora mismo», con acentos y tres líneas explícitas. Omar corrigió la cobertura para incluir Cancún después del primer push (`549e52f`). Sustituye el título de cobertura y cotización en 24h documentado anteriormente.
* Omar pidió crear y cambiar los tres iconos del hero para representar mejor cada servicio. Se reemplazaron los SVG inline de `index.html`: pantalla → plotter con impresión, foco → letrero con destellos, capas → letra T en relieve con perspectiva.
* Se conservaron tamaño, color heredado, enlaces y etiquetas; SVG decorativos con `aria-hidden="true"` y `focusable="false"`. El reemplazo de iconos solo cambió HTML; la corrección posterior del título sí cambió CSS y subió su versión a 3.8.
* Verificación local: `node scratch/audit_html_structure.js` (41/41 HTML balanceados) y `git diff --check` sin errores. Omar autorizó posteriormente commit y push a `main` de ambos cambios. Pendiente revisión visual en navegador.

---
## 🔒 CIERRE — 09 de Septiembre, 2026 (galería de Alucobond + nueva línea de placas + hero de conversión)

Resumen del día. El detalle de cada bloque está en las tres secciones «09 de Septiembre» de abajo.

**1. Galería de proyectos reales de Alucobond (`alucobond.html`):** 20 proyectos con nombre de cliente (Ford, GAC Motor, PEMEX, Wendy's, Coppel, Elektra, etc.) del instalador aliado, 44 fotos optimizadas y con corrección de color, foto de proceso + resultado, lightbox propio. Fuente confirmada con Omar como alianza permanente con permiso de uso. 5 de esas fotos (Mérida y Calkiní, únicas dentro de la Península de Yucatán) se sumaron también a la galería aleatoria de la home.

**2. Nueva línea de negocio: venta de placa de alucobond por hoja (`placas-alucobond.html`):** $1,850 MXN/hoja neto, 1.22×2.44m, 3mm, envío gratis 20km desde el centro de Cancún (zona hotelera con costo extra). Calculadora de cantidad + color con total en vivo y cotización por WhatsApp. Fotos reales del producto (con permiso confirmado) para Negro Mate, Blanco Mate, Plata Satinado; Plata Cepillado y Naranja Mate marcados como agotados. Integrada en el formulario de cotización, la grilla de Servicios de la home, cross-link desde `alucobond.html` y `sitemap.xml`.

**3. Hero de la home orientado a conversión:** de "Llevamos tu Marca al Siguiente Nivel" (genérico) a "Rótulos en Cancún / y la Riviera Maya / Cotiza Gratis en 24h" (categoría + cobertura completa + gancho de velocidad/gratis), subiendo también el dato de "+1,000 proyectos" al subtítulo. Se descartó título dinámico por geolocalización.

**Incidentes técnicos del día (los tres ya corregidos y verificados en producción):**
- Carpeta `assets/galeria/Alucobond/` subida con mayúscula pero referenciada en minúscula en el HTML — invisible en local (Windows, case-insensitive) pero rompía las fotos en Hostinger (Linux, case-sensitive).
- `style.css` editado dos veces sin subir la versión (`?v=3.4`→`3.5`→`3.6`→`3.7`), dejando estilos nuevos cacheados sin aplicar — **lección aplicada a partir de la 2ª vez: subir la versión en el mismo commit que el cambio de CSS.**
- Deploy del último commit del día falló 2 veces por el timeout intermitente conocido del puerto 65002 de Hostinger; el 3er intento (`gh run rerun --failed`) tuvo éxito.

**Commits del día (17):** `995810e`, `d9f77ca`, `3f1f0a8`, `50447d1`, `ada3569`, `9b2603b`, `98e2ff6`, `b955f68`, `dee7b19`, `8910d86`, `159f416`, `2af8de0`, `9d108cc`, `1c55e89`, `41536d0`, `a8b4e40`, `a2276b3`. Todos desplegados y verificados en producción con curl y/o navegador.

**Versiones actuales de cache-bust:** `style.css?v=3.8`, `main.js?v=3.5`.

**Pendiente para la próxima sesión:**
1. Conseguir foto real de Rojo Mate para `placas-alucobond.html` (el proveedor no tiene foto de ese color en su página).
2. Decidir si se ofrece corte a medida con costo adicional real (hoy la FAQ lo menciona sin precio).
3. Limpiar el archivo huérfano `assets/placas-alucobond/plata-brillante.webp` en Hostinger (ya no referenciado, el deploy no borra archivos removidos).
4. Semanas 3+ del plan del 07-sep (home, plantillas de servicio con casos) siguen pendientes salvo lo ya cubierto hoy.
5. Backlog histórico sin cambios: campaña de reseñas post-venta por WhatsApp, blog 1-2 artículos/mes.

---
## 📅 Resumen de la Sesión (09 de Septiembre, 2026 — nuevo título del hero de la home)

* Omar pidió un título nuevo para el hero de la home orientado a conversión (mismo criterio ya aplicado en `placas-alucobond.html`: categoría + localidad + gancho concreto, en vez de branding genérico).
* **Antes:** "Llevamos tu Marca al Siguiente Nivel" — genérico, no dice qué vendemos ni por qué cotizar ahora.
* **Ahora:** H1 "Rótulos en Cancún / Cotiza Gratis en 24h" (categoría + localidad + velocidad/gratis, 2 líneas, mismo largo que el original para no romper el layout). Subtítulo actualizado para subir el dato de prueba social que antes solo vivía en la sección "Nosotros": "Lonas, banners, rotulación vehicular, anuncios luminosos, letras 3D y control solar 3M. Más de 1,000 proyectos entregados en Cancún y la Riviera Maya."
* No se tocó el `<title>`/meta description de `index.html` (fuera de alcance de "el título del hero"; son cosas distintas).
* **Verificado localmente** en navegador: el H1 nuevo mantiene el layout compacto de 2 líneas (el primer intento, con "y Publicidad" y "24 Horas", se partía en 3-4 líneas y se acortó).
* **Corrección de Omar (mismo día):** "Cancún" solo en el H1 restringe la percepción de cobertura — el negocio también atiende toda la Riviera Maya. Se descartó la idea de un título dinámico según la ubicación del usuario (geolocalización por IP poco confiable, complejidad extra, y las páginas dedicadas `playa-del-carmen/` y `tulum/` ya cubren el aterrizaje por ciudad) a favor de un cambio simple y estático. H1 final, 3 líneas balanceadas: "Rótulos en Cancún / y la Riviera Maya / Cotiza Gratis en 24h". Verificado en navegador: no se encima con la mascota Robbie.
* **Deploy con incidente:** el primer intento (run `34415184907`) falló tras los 6 reintentos internos del workflow por el timeout intermitente del puerto 65002 de Hostinger (ya documentado); un segundo `gh run rerun --failed` también falló; el tercero tuvo éxito en 8s. **Verificado en producción con curl:** el H1 de 3 líneas ya se sirve en `rotulatepublicidad.com/`.

---
## 📅 Resumen de la Sesión (09 de Septiembre, 2026 — nueva línea: venta de placa de alucobond por hoja)

* Omar propuso una nueva línea de negocio: vender la placa de alucobond suelta (sin instalación), por hoja, con envío a domicilio incluido en Cancún centro. Confirmó los datos comerciales antes de construir nada: **$1,850 MXN por hoja, precio neto, mismo precio en los 4 colores** (Negro Mate, Blanco Mate, Rojo Mate, Plata Satinado); **medida 1.22 × 2.44 m, 3 mm de espesor**; **envío gratis en 20 km a la redonda desde el centro de Cancún, con costo extra a la zona hotelera**. Ficha técnica del producto real que van a vender (Tach-Panel, de vinilosygraficos.com): dos láminas de aluminio de hasta 0.30 mm con núcleo de polietileno de alta densidad de 3 mm, pintura PVDF Kynar 500, rígido y ligero (enrutable, cortable, laminable, doblable), resistente a corrosión costera, admite impresión UV en cama plana.
* **Nueva página `placas-alucobond.html`:** hero con precio y diferenciador en el H1 ("Placas de Alucobond en Cancún desde $1,850", sin mínimo de mayoreo — a petición de Omar de mejorar el título para conversión, siguiendo el mismo patrón de precio-visible que ya funciona en `alucobond.html`/`control-solar.html`), selector de 4 colores (swatches CSS, sin fotos reales del producto), calculadora de cantidad con total en vivo y botón de WhatsApp con mensaje pre-armado (color + cantidad), especificaciones técnicas, FAQ y CTA final. JS nuevo en `placas-alucobond.js`. CSS nuevo en `style.css` (`.color-swatches`, `.color-swatch`, `.placa-calculadora`, `.placa-qty`). Schema.org `Product`/`Offer` ($1,850 MXN) + `BreadcrumbList`.
* **Integración con el resto del sitio:** opción nueva `placa-alucobond` en el `<select id="servicio">` del formulario de cotización (`index.html`); tarjeta nueva en la grilla de Servicios de la home (reutiliza `assets/alucobond.jpg/webp`, sin foto propia todavía); cross-link desde `alucobond.html` (debajo del precio de instalación: "¿Ya tienes quién instale? Compra la placa suelta →"); entrada nueva en `sitemap.xml`.
* **Verificado localmente:** `node scratch/audit_html_structure.js` → 41/41 balanceados; 2/2 JSON-LD parsean; navegador — swatches cambian de color activo, cantidad +/- actualiza el total ($1,850 × n) y el link de WhatsApp arma el mensaje correcto con color y cantidad seleccionados (probado: 3 hojas × Rojo Mate → "$5,550 MXN" y mensaje de WhatsApp correcto).
* **Mismo bug de caché que ya habíamos visto con la galería de Alucobond, detectado al probar en producción:** agregué las reglas `.color-swatch`/`.placa-calculadora` a `style.css` pero olvidé subir la versión (`?v=3.5` seguía igual) — los swatches de color salían sin estilo en el sitio real aunque en local (servidor propio, sin caché) se veían bien. Corregido con bump `style.css?v=3.5`→`3.6` en las 37 páginas que lo cargan (commit `159f416`). **Lección para la próxima vez que se toque `style.css` o `main.js`: subir la versión SIEMPRE en el mismo commit que el cambio, no después.** Verificado en producción con navegador: swatches con su color y borde activo, calculadora visible y funcional.
* **Fotos reales del producto (mismo día):** Omar dio luz verde para tomar las fotos del proveedor (vinilosygraficos.com/producto/panel-de-aluminio-tach-panel/) y pidió marcar como "agotado" los colores que no vendemos. Descargué las 4 fotos de producto que existen en esa página (`panelnegro.jpg`, `TACH-PANEL-BLANCO.jpg`, `panelplatacepillado.jpg`, `panelplata.jpg`), las optimicé a WebP 320×320 en `assets/placas-alucobond/` y las usé como los círculos de color (antes eran solo CSS). Amplié la selección a los 6 colores reales del catálogo del proveedor (antes solo mostraba los 4 que vendemos):
  - **Disponibles (con foto real):** Negro Mate, Blanco Mate, **Plata Satinado**.
  - **Disponible sin foto (el proveedor no tiene foto de este color en su página):** Rojo Mate — sigue con el círculo de color CSS.
  - **Agotados (con foto real, deshabilitados y en gris):** Plata Brillante.
  - **Agotado (sin foto):** Naranja Mate — círculo CSS.
  - **Corregido por Omar (mismo día):** mi primer mapeo estaba invertido. Omar confirmó que "Plata Satinado" es la foto con textura de puntitos/grano fino (`panelplata.jpg`, sin líneas de cepillado) — **no** la de líneas de cepillado visibles. Reasignado: `panelplata.jpg` → **Plata Satinado** (disponible, `assets/placas-alucobond/plata-satinado.webp`); `panelplatacepillado.jpg` → **Plata Cepillado** (agotado, `assets/placas-alucobond/plata-cepillado.webp`, ya no "Plata Brillante" — ese nombre no aplica a ninguna de las dos fotos reales que tenemos). Archivo `plata-brillante.webp` eliminado.
  - Los botones "Agotado" tienen `disabled` (no seleccionables, verificado con clic en Plata Brillante → no cambia la selección).
* **Cache-bust:** `style.css` cambió otra vez (`.color-swatch.agotado`, `.swatch-agotado-badge`, tamaño de foto) — esta vez subí la versión (`?v=3.6`→`3.7`) **en el mismo commit** que el cambio de CSS, aplicando la lección de la vez anterior.
* **Pendiente:** conseguir foto real de Rojo Mate si existe; definir si se ofrece corte a medida con costo adicional real (la FAQ ya lo menciona como posibilidad genérica, sin precio).

---
## 📅 Resumen de la Sesión (09 de Septiembre, 2026 — galería de proyectos de Alucobond)

* Omar pidió crear una galería de fotos en `alucobond.html` (proyectos reales con nombre de cliente/referencia) y subir solo las mejores a la galería principal del sitio. Fuente: `assets/galeria/Alucobond/Alucobond Proyectos_Chatgpt/` — 85 fotos "Mejoradas" (JPEG ya retocadas) en 20 carpetas de proyecto, extraídas previamente de un PDF (ver `LEEME.txt`/`Indice_de_fotos.csv` en esa carpeta).
* **Hallazgo importante antes de publicar:** el `LEEME.txt` de esa carpeta identifica la fuente como `CV PANEL Marco A. Sanchez(1).pdf` — es decir, las fotos son el portafolio de un instalador de alucobond, no proyectos ejecutados por Rotulate/RTMX, y varias muestran instalación en proceso (plástico protector de fábrica, andamios) en vez de fachada terminada. Los clientes son reales y reconocibles (Ford, GAC Motor, PEMEX, Wendy's, Coppel, Elektra, Aeropuerto de San José del Cabo, etc.).
* **Confirmado con Omar:** Marco A. Sanchez es el instalador con el que trabajarán (alineado con el modelo de bróker de RTMX Obra y Mantenimiento) y dio permiso explícito de usar las fotos para promover el servicio y generar trabajo para ambos. Decisión: mostrar nombre de marca visible en cada proyecto, e incluir "proceso" y "resultado" como storytelling (no solo fachadas terminadas).
* **Selección y optimización:** revisé calidad de las 85 fotos con hojas de contacto etiquetadas (`scratch/alucobond_contact_sheets.js`) y elegí 44 (2–3 por proyecto, mezcla proceso/resultado, priorizando composición y foto realmente terminada cuando existía). Optimizadas con `sharp` (`scratch/alucobond_build_gallery.js`) a WebP: full 1400px máx. calidad 82 + thumb 560×420 calidad 75, en `assets/galeria/alucobond/` y `assets/galeria/alucobond/thumbs/` (44+44 archivos, ~6.16 MB total, -47% vs. las fuentes JPEG usadas).
* **Corrección de color (a petición de Omar, colores planos en las fuentes):** probé antes/después con 5 muestras representativas y aplicué a las 44 fotos `modulate({saturation:1.22, brightness:1.04})` + `linear(1.08,-8)` (contraste) + `sharpen({sigma:0.8})` vía sharp — cielos, rojos/amarillos de marca (Elektra, PEMEX) y blancos de panel notablemente más vivos sin verse artificiales. Mismo recorte de código en `scratch/alucobond_build_gallery.js`.
* **Reordenamiento de carpetas:** la carpeta fuente `assets/galeria/Alucobond/Alucobond Proyectos_Chatgpt/` (85 MB, PNG originales + JPEG mejoradas) vivía dentro de `assets/` (la ruta que se despliega a Hostinger) y coincidía de nombre (case-insensitive en Windows) con la carpeta de salida optimizada `assets/galeria/alucobond/` — se movió la carpeta fuente a la raíz del repo (`Alucobond Proyectos_Chatgpt/`, sin trackear, mismo patrón que `scratch/`/`search_info/`) para que solo los 44+44 WebP optimizados queden en la ruta que se sube a producción.
* **Implementado en `alucobond.html`:** nueva sección `#galeria-alucobond` ("Proyectos reales de Alucobond") entre el bloque de precio y el FAQ, con 20 tarjetas de proyecto (cliente + tipo + ciudad) y su mini-galería (`.galeria-grid.ab-grid`, columnas auto-fit reutilizando `.galeria-item`/`.galeria-label`). Lightbox propio en `alucobond-galeria.js` (nuevo archivo, mismo patrón que el lightbox de `main.js` pero data-driven vía `data-full`/`data-caption`, sin conflicto porque el IIFE de `main.js` solo se activa si existe `#galeria-grid`, que no está en esta página). Estilos nuevos en `style.css` (`.ab-proyectos`, `.ab-proyecto-header`, `.ab-grid` + breakpoint 480px).
* **Decisión de alcance — NO se agregaron estas fotos a la galería aleatoria de la home (`#proyectos` en `index.html`):** esa sección declara explícitamente "Proyectos reales realizados en Cancún y la Riviera Maya", y los 20 proyectos de Alucobond son de otras ciudades (Tijuana, CDMX, Chiapas, Monterrey, etc.) — mezclarlos ahí contradiría esa afirmación de localidad. Si Omar quiere incluir algunas ahí de todos modos, hay que ajustar el subtítulo de esa sección o aceptar la inconsistencia.
* **Verificado localmente:** `node scratch/audit_html_structure.js` → 39/39 HTML balanceados; 3/3 bloques JSON-LD de `alucobond.html` parsean; servidor estático local + navegador (Chrome vía MCP) — sección visible, lazy-load y animación `.reveal` funcionando, grid responsive (3/2/auto-fit según ancho), lightbox con navegación anterior/siguiente y cierre por click/Escape probados y funcionando.
* **Commits y deploy:** `995810e` (feature, 91 archivos: `alucobond.html`, `style.css`, `alucobond-galeria.js`, 88 WebP en `assets/galeria/Alucobond/`) y `d9f77ca` (docs). Push a `main` → workflow `Deploy to Hostinger` (run `34391784830`) `success` a la primera. **Verificado en producción con curl:** `alucobond.html` y `alucobond-galeria.js` responden 200; una foto full y su thumb responden 200; la sección `#galeria-alucobond` y sus 44 `.ab-galeria-item` están presentes en el HTML servido. No hizo falta purgar caché de Hostinger (contenido nuevo, no había versión previa cacheada).
* **Bug reportado por Omar y corregido (mismo día):** las fotos de la galería de `alucobond.html` no cargaban en producción. Causa: Hostinger/Linux usa filesystem *case-sensitive*, la carpeta se subió como `assets/galeria/Alucobond/` (mayúscula) pero el HTML referencia todo en minúsculas (`assets/galeria/alucobond/...`) — en Windows (case-insensitive) esto se veía bien en local y por eso no se detectó antes. Corregido con `git mv` (rename de solo mayúscula/minúscula, vía nombre temporal para que Git lo registre) — commit `ada3569`. Verificado con curl en producción: las 88 rutas (44 full + 44 thumb) responden 200.
* **Segundo bug relacionado, mismo reporte:** el título de cada proyecto quedaba visualmente pegado a las fotos del proyecto ANTERIOR (gap de 0px arriba del título vs. 48px entre el título y sus propias fotos) — medido con `getBoundingClientRect` en el navegador. Causa raíz: `style.css` sí tenía las reglas nuevas (`.ab-proyectos`, `.ab-grid`) desplegadas correctamente, pero todas las páginas seguían pidiendo `style.css?v=3.4` (mismo query string de antes de agregar esas reglas) — cache de un año en Hostinger, nunca se invalidó. Se confirmó con `getComputedStyle` en el navegador real: `.ab-proyectos` medía `display:block` (la regla `display:flex` nueva no estaba activa). Solución aplicada: (1) cada proyecto ahora es una tarjeta con fondo/borde propio (`.ab-proyecto { background: rgba(255,255,255,0.04); border-radius:12px; padding:1.5rem }`) para que el título y sus fotos queden inconfundiblemente agrupados sin depender solo del espaciado — a petición explícita de Omar de "colocar algún elemento que lo diferencie"; (2) bump `style.css?v=3.4`→`3.5` en las 36 páginas que lo cargan, mismo patrón ya usado con `main.js`. **Commits:** `ada3569` (mayúscula), `9b2603b` (tarjetas + cache-bust) y `98e2ff6` (chore inmediato después: un `git add -A '*.html'` agarró por error un HTML de la carpeta fuente sin trackear y un script de `scratch/` — se sacaron del control de versiones, ninguno se sirve desde el sitio). **Verificado en producción:** curl confirma las 88 rutas de fotos y `style.css?v=3.5` con la regla `.ab-proyecto` presente; navegador real contra `rotulatepublicidad.com/alucobond.html` — fotos cargan y cada tarjeta (Aeropuerto, Ford, GAC Motor Churubusco, etc.) se ve claramente agrupada y separada de la siguiente.
* **Actualización (mismo día):** Omar pidió subir las de Mérida y Campeche (Calkiní) a la galería aleatoria de la home — las únicas dos ciudades de la selección de Alucobond dentro de la Península de Yucatán, cerca de Cancún, a diferencia del resto (Tijuana, CDMX, Chiapas, etc.) que sí contradicen el subtítulo "Cancún y la Riviera Maya". Reutilicé las 5 fotos ya optimizadas/con color corregido (`pemex-calkini-1/2/3`, `pemex-merida-1/2`) redimensionadas al estándar de esa galería (full 1200px q80 + thumb 500px q75) como `galeria-128.webp`…`galeria-132.webp` en `assets/galeria/`. Regeneré el arreglo `allImgs` de `main.js` con `scratch/update_main_gallery.js` (ahora 120 imágenes) y subí el cache-bust `main.js?v=3.4`→`3.5` en las 35 páginas que lo cargan (mismo patrón que la sesión del 07-sep). Verificado en navegador: las 5 imágenes cargan y se ven bien en el layout real de la grilla. Sin captions ni nombre de cliente en esta galería (igual que el resto del pool), consistente con el estilo anónimo existente.

---
## 🔒 CIERRE — 07 de Septiembre, 2026 (implementación del plan SEO/UX/UI: P0 + Semana 2)

Resumen del día. El detalle de cada bloque está en las secciones «07 de Septiembre» de abajo; el plan completo en [docs/plan-seo-ux-ui-2026-09-07.md](docs/plan-seo-ux-ui-2026-09-07.md).

**Los 6 P0 del plan están cerrados y verificados en producción:**
| P0 | Qué se hizo | Verificación |
|---|---|---|
| P0-01 | `analytics.js` en `/lonas-cancun/` pasó a ruta absoluta `/analytics.js` (la relativa daba 404) | curl + navegador |
| P0-02 | GTM + `analytics.js` + banner de consentimiento (tema de Express) en `express/index.html` y `express/en/index.html`; `id="inicio"` en el hero, `whatsapp-float` en el botón flotante | navegador: GTM/GA4 cargan, Consent Mode dispara, `section_view` OK |
| P0-03 | Eliminado el evento muerto `cotizacion_firebase_ok` de `upload.js` | curl |
| P0-04 | `new1/2/3.jpg` (borradas del repo pero aún referenciadas) recuperadas de prod, revisadas, versionadas como `assets/galeria/tipo-lona-{frontlit,mesh,backlight}.webp` con `width/height/loading` | curl (con `?v=1` por caché de LiteSpeed) |
| P0-05 | Alucobond: precio visible «Desde $990 MXN/m² (material e instalación)» + `Offer`/`UnitPriceSpecification` alineado + FAQ de precio (antes el JSON-LD declaraba $1,450–$2,200 sin precio visible) | curl |
| P0-06 | Lonas: quitado «Sin mínimos» de la meta (contradecía el mínimo de 1 m²), añadida nota permanente bajo las tarjetas | curl + navegador |

**Semana 2 del plan (fiabilidad):**
- `main.js`: EmailJS ya no bloquea la carga de `upload.js` (se carga en paralelo con su propio `.catch`). Bump `main.js?v=3.3`→`3.4`.
- `lonas-cancun/main.js`: validación explícita del cotizador (antes `Math.max` forzaba mínimos y siempre cotizaba). Datos inválidos → precio «—», mensaje de qué corregir, WhatsApp con mensaje genérico, `lastQuote=null`. Cálculo inicial al cargar. Bump del `main.js` local `?v=3.2`→`3.3`. **Verificado en navegador** con 6 casos de entrada.

**Datos comerciales que confirmó Omar hoy:** Alucobond desde $990/m² (material + instalación); lonas mínimo 1 m².

**Commits (13):** `3b8ad6f`, `a558ae2`, `fe89e8c`, `e86c3fc`, `fe897bd`, `f0f9c13`, `e4b6faf`, `bc7b82b`, `ceb4ae9`, `71e3af6`, `4154bc1`, `850a8c1`, `12c9639`. Todos desplegados (`success`); dos deploys necesitaron `gh run rerun --failed` por el timeout transitorio del puerto 65002 (SSH de Hostinger intermitente toda la tarde).

**Pendiente para la próxima sesión / para Omar:**
1. **Envío real del formulario principal** desde la red de Omar: no se pudo probar aquí porque este entorno no resuelve el dominio de Supabase (`ENOTFOUND`). Confirmar fila en `cotizaciones_web` + evento `cotizacion_supabase_ok` en GA4 Realtime.
2. **i18n del banner de consentimiento**: la página EN de Express lo muestra en español (texto hardcodeado en `analytics.js`). Menor.
3. **Limpieza manual en Hostinger**: `assets/galeria/new1/2/3.jpg` ya son huérfanos reales (0 referencias) — borrables.
4. **Semana 2 restante del plan**: errores por campo en el formulario, adjuntos accesibles por teclado, estados de envío comprensibles, correo **o** WhatsApp como canal (todo esto necesita más trabajo de UX).
5. **Carrera de orden GTM-async vs. `consent default` diferido** (riesgo común a todo el sitio, no resuelto: requeriría script inline —bloqueado por CSP— o un archivo nuevo).
6. Semanas 3+ del plan (home, plantillas de servicio con casos) siguen sin empezar y dependen de fotos/casos reales.

---
## 📅 Resumen de la Sesión (07 de Septiembre, 2026 — auditoría y plan SEO, UX y UI)

* Omar pidió revisar a fondo el proyecto y proponer mejoras de SEO, UX y UI; después pidió **documentar antes de empezar**. Se conserva el detalle en [docs/plan-seo-ux-ui-2026-09-07.md](docs/plan-seo-ux-ui-2026-09-07.md). **Estado: propuesta documentada, sin implementación ni deploy.**
* Alcance: 39 HTML versionados, enlaces, canonical/hreflang, JSON-LD, CSS/JS, formulario/cotizador, analítica, hosting/deploy y CSV de Search Console. Verificación HTTP: las 37 URLs del sitemap responden 200 y coinciden con sus canonical; 107 bloques JSON-LD parsean; sin duplicados exactos de títulos/metas ni anclas internas rotas en el barrido estático.
* Fallos confirmados que pasan al inicio del backlog: `lonas-cancun/index.html` pide `analytics.js` en ruta relativa que devuelve 404; ambas páginas Express carecen de instrumentación común; `new1.jpg`, `new2.jpg`, `new3.jpg` **sí siguen referenciadas en lonas**, aunque se eliminaron del repo (corrige la conclusión de huérfanos del 1-sep). Hoy responden 200 porque permanecen en Hostinger: resolver antes de limpiar archivos remotos.
* Inconsistencias comerciales: Alucobond declara $1,450–$2,200 solo en JSON-LD, sin precios visibles; la meta de lonas dice «Sin mínimos» pese al mínimo facturable de 1 m² por pieza. Confirmar políticas antes de modificar ofertas. Revisar doble evento de éxito del formulario y orden de consentimiento; no se verificó el contenedor GTM y no se afirma doble conteo real.
* Plan propuesto: medición/consistencia → fiabilidad de formulario y cotizador → home y piloto lonas/Express → vehicular, Alucobond y anuncios con casos reales → enlazado, perfil local y contenido. Esfuerzos, dependencias y aceptación en el documento. Mantener marca y Robbie; no priorizar `main-lite.js`, ya descartado con evidencia histórica.
* Corrección de backlog histórico: el portafolio nombrado **ya existe** (Alumik, Silanes, enviaflores.com y Fishing Joe’s); desarrollar y reutilizar esos casos. Accesibilidad completa de «Más» permanece como propuesta, respetando la decisión previa de posponerla.
* Límites: GSC termina el 29-ago y no evalúa cambios de septiembre; navegador conectado no disponible; sin nueva medición Lighthouse, envíos de formularios ni acceso a configuración interna GTM/GA4/GBP. Hipótesis visuales y riesgos de código se distinguen de incidencias reproducidas.
* Esta sesión únicamente agrega documentación; no se modifican archivos del sitio. Tras documentar el plan, Omar pidió hacer commit y push de estos dos archivos a `main`. La bitácora activa sigue exclusivamente aquí; el documento es la referencia detallada del plan.

---
## 📅 Resumen de la Sesión (07 de Septiembre, 2026 — microfixes del plan: P0-01 y P0-03)

* Omar pidió arrancar por los microfixes del plan: los dos arreglos de bajo riesgo que no dependen de decisiones comerciales ni de acceso a GTM/GA4.
* **P0-01 — ruta de `analytics.js` en el cotizador de lonas:** `lonas-cancun/index.html:580` cargaba `analytics.js?v=1.0` como ruta relativa, que resuelve a `/lonas-cancun/analytics.js` (404) — la página del cotizador (1,306 impresiones en GSC, la de más volumen) llevaba tiempo sin instrumentación. Corregido a `/analytics.js?v=1.0` absoluto, igual que el resto de páginas en subcarpeta (`blog/`, `en/`, `playa-del-carmen/`, `tulum/`). Era la única página del sitio con la ruta rota.
* **P0-03 — evento fantasma de Firebase:** `upload.js:301` empujaba `cotizacion_firebase_ok` al `dataLayer` en cada envío del formulario, además de `cotizacion_supabase_ok`. Código muerto desde la migración a Supabase de junio: el contenedor GTM-5623CPQG solo tiene el activador `CE - cotizacion_supabase_ok (conversion)` (ver bitácora del 07-ago), nada escucha el evento firebase, así que no había doble conteo real en GA4 — pero se elimina para dejar limpio el flujo. `upload.js` no se toca más que en esa línea.
* **Cache-busting:** `upload.js` se carga dinámicamente desde `main.js:35` sin query string de versión y la caché JS está en 1 año. Se agregó `?v=2` a ese `loadScript('upload.js?v=2')` y se subió `main.js?v=3.2` → `?v=3.3` en las 35 páginas que cargan el `main.js` raíz, para que los navegadores que ya tienen `main.js` cacheado reciban la versión que pide el `upload.js` limpio. **No se tocó** `lonas-cancun/index.html:579` (usa su propio `lonas-cancun/main.js`, que no carga `upload.js` y no cambió).
* **Verificación local:** `node scratch/audit_html_structure.js` → 39 HTML balanceados; `git diff --check` sin errores (solo avisos CRLF esperados en este repo Windows). 39 archivos tocados (35 HTML con el bump + `main.js` + `upload.js` + `lonas-cancun/index.html` + `agents.md`).
* **Commit y deploy:** commit `3b8ad6f` a `main`; workflow `Deploy to Hostinger` (run `34155982743`) terminó en `success` a la primera. **Verificado en producción con curl:** `/lonas-cancun/` sirve `<script src="/analytics.js?v=1.0">` (absoluto); `https://rotulatepublicidad.com/analytics.js?v=1.0` responde 200; la home sirve `main.js?v=3.3`; `upload.js?v=2` tiene 0 ocurrencias de `firebase_ok` y 1 de `cotizacion_supabase_ok`. No hizo falta purgar caché de Hostinger.
* **Nota:** al hacer `git add` se colaron sin querer al stage archivos locales no versionados (`scratch/`, `search_info/`, `seo_performance/`, `assets/nuevas_fotos/`, etc.); se deshizo el commit con `reset --soft` y se rehízo staged solo los 39 archivos del microfix. Esas carpetas siguen sin trackear a propósito.
* **P0 restantes (abiertos):** P0-04 (imágenes `new1/2/3.jpg` referenciadas en lonas pero ausentes del repo), P0-05 (precios Alucobond solo en JSON-LD) y P0-06 (mínimo facturable de lonas vs. meta «Sin mínimos») — dependen de decisiones comerciales de Omar o de recuperar assets.

---
## 📅 Resumen de la Sesión (07 de Septiembre, 2026 — microfix del plan: P0-02 instrumentación de Express)

* Omar pidió seguir con P0-02: las dos páginas de Express (`express/index.html` ES y `express/en/index.html` EN) no cargaban GTM ni `analytics.js`, así que 1,102 impresiones/mes de `/express/` y todo el tráfico anglo de `/express/en/` no generaban ni un evento. Express es una app Vite estática independiente (solo HTML + `assets/index-b314nm7x.css` Tailwind, **cero JavaScript propio**), no comparte `style.css`/`main.js`.
* **Contexto CSP:** la CSP de `.htaccess` (verificada con curl) aplica idéntica en `/express/`: `script-src 'self' https://www.googletagmanager.com ...` **sin `'unsafe-inline'`** → los scripts inline (snippet clásico de GTM, `gtag('consent'...)` inline) están bloqueados; hay que usar los archivos self-hosted `/gtm.js` y `/analytics.js`, igual que el resto del sitio. `style-src` sí permite `'unsafe-inline'` → el `<style>` del banner va inline sin problema.
* **Implementado en ambas páginas Express:**
  - `<script src="/gtm.js" async>` en el `<head>` + `<noscript>` de GTM tras `<body>` (GTM-5623CPQG), mismo patrón que las ~30 páginas del sitio.
  - `<script src="/analytics.js?v=1.1" defer>` antes de `</body>` — trae Consent Mode v2 (denegado por defecto), banner de consentimiento y eventos `section_view`/`scroll_depth`/`cta_click`. No hay `form_start` porque Express no tiene formulario (todo es CTA a WhatsApp).
  - `<style>` inline scoped a `#consent-banner` con paleta del tema oscuro de Express (navy `rgba(2,4,28,.95)`, acento naranja `#ff6a00` en Aceptar, lima `#39ff14` en enlaces) — reemplaza las reglas de `style.css` que Express no carga. Specificity por ID gana sobre el Preflight de Tailwind.
  - `id="inicio"` en la `<section>` del hero (estaba sin id) y clase `whatsapp-float` añadida al botón flotante, para que `section_view` del hero y `cta_location: 'floating'` funcionen.
* **`analytics.js` (afecta a todo el sitio, por eso bump `?v=1.0` → `?v=1.1` en las 38 páginas que lo cargan):**
  - `TRACKED_SECTIONS` ampliado con `ventajas` (Express ES) y `services`/`advantages`/`contact` (Express EN); antes solo cubría los IDs de la home. Añadir IDs que otras plantillas no tienen es inocuo.
  - `ctaLocationFor()` ahora cae a `<header>`/`<footer>` genéricos además de `#main-header`/`.footer`, porque Express usa etiquetas semánticas sin esas clases.
* **Verificación local:** `node scratch/audit_html_structure.js` → 39 HTML balanceados; JSON-LD de ambas páginas Express parsea (1/1 y 2/2); `git diff --check` limpio. 39 archivos (analytics.js + 38 HTML).
* **Commit y deploy:** commit `fe89e8c` a `main`; workflow `Deploy to Hostinger` (run `34162528731`) → `success` a la primera. **Verificado en producción con curl:** `/express/` y `/express/en/` sirven `<script src="/gtm.js" async>`, `<script src="/analytics.js?v=1.1" defer>`, `id="inicio"`, `whatsapp-float` y el `<style>` del banner (13 reglas); `/gtm.js` y `/analytics.js?v=1.1` responden 200; el `analytics.js` servido ya trae el `TRACKED_SECTIONS` ampliado.
* **Pendiente de verificar (requiere navegador/Omar):** que el banner se vea bien sobre el tema de Express, que `consent default`→`update` dispare y que GA4 reciba `page_view`/`section_view`/`cta_click` desde `/express/` vía DebugView/Realtime en la red de Omar. La carrera de orden GTM-async vs. `consent default` diferido sigue siendo un riesgo común a todo el sitio (no se resolvió aquí porque requeriría un script inline, bloqueado por CSP, o un archivo nuevo).

---
## 📅 Resumen de la Sesión (07 de Septiembre, 2026 — microfix del plan: P0-04 assets faltantes del cotizador)

* Omar pidió seguir. Se tomó P0-04 porque es una fragilidad real de producción y no depende de decisiones comerciales: `lonas-cancun/index.html` mostraba las 3 tarjetas «Tipos de Lonas» con `../assets/galeria/new1.jpg`, `new2.jpg`, `new3.jpg`, borradas del repo el 1-sep por «huérfanas» pero que **sí seguían referenciadas**. Sólo respondían 200 porque `rsync` sin `--delete` las dejó en Hostinger; un checkout limpio o un deploy con `--delete` habría roto las imágenes.
* **Recuperación e inspección:** se descargaron las 3 de producción (1024×576 JPEG, 86–134 KB). Revisadas visualmente: son imágenes tipo stock generadas por IA, **on-topic y sin problemas de contenido/marca** (a diferencia del incidente `neon-flex` de «Sh*t Happens»): new3 = plotter HP Latex con impresión saliendo (Frontlit), new2 = lona mesh perforada en valla de obra (Mesh), new1 = caja de luz retroiluminada en fachada al anochecer (Translúcida/Backlight).
* **Versionado con nombres reales + WebP:** convertidas con Sharp q78 a `assets/galeria/tipo-lona-frontlit.webp` (40 KB), `tipo-lona-mesh.webp` (88 KB) y `tipo-lona-backlight.webp` (42 KB) — carpeta que sí se despliega. Los 3 `<img>` de `lonas-cancun/index.html` ahora apuntan a esos WebP y llevan `width="1024" height="576" loading="lazy"` (antes sin dimensiones ni lazy — resuelve también parte del hueco de CLS que señalaba el plan en «Rendimiento»).
* Los `new1/2/3.jpg` de Hostinger quedan ahora como **huérfanos de verdad** (0 referencias): se pueden borrar en la próxima limpieza manual del hosting sin riesgo.
* **Verificación local:** `node scratch/audit_html_structure.js` → 39 HTML balanceados; 0 referencias restantes a `new[123].jpg` en HTML/JS/CSS; los 3 WebP no están en `.gitignore`.
* **Commits y deploy:** `fe897bd` (WebP + `<img>`), `f0f9c13` (cache-bust). El deploy de `fe897bd` (run `34165246910`) falló con el timeout transitorio conocido del puerto 65002 en los 6 reintentos; `gh run rerun --failed` → `success`. Tras subir los WebP, el edge de LiteSpeed servía un **404 negativo cacheado** de forma intermitente entre nodos para las URLs nuevas (eran 404 antes del deploy); con query string daban 200 con los bytes correctos. Se añadió `?v=1` a los 3 `<img>` (`f0f9c13`, deploy `success`) para forzar URLs nunca negative-cacheadas — **verificado en producción: los 3 `tipo-lona-*.webp?v=1` responden 200 y el HTML servido los referencia**.

---
## 📅 Resumen de la Sesión (07 de Septiembre, 2026 — P0-05 y P0-06: consistencia comercial)

* Omar confirmó las dos políticas comerciales que faltaban (vía pregunta directa):
  - **Alucobond:** «Desde $990 pesos m², instalación y material».
  - **Lonas:** «Mínimo 1 m²» (confirma el mínimo facturable ya vigente en el cotizador y el FAQ).
* **P0-05 — Alucobond (`alucobond.html`):** el JSON-LD declaraba una `AggregateOffer` de $1,450–$2,200 sin ningún precio visible (viola las directrices de datos estructurados de Google). Corregido:
  - JSON-LD: `AggregateOffer` reemplazada por un `Offer` único de `price` $990 MXN con `priceSpecification` → `UnitPriceSpecification` y `referenceQuantity` de 1 `MTK` (metro cuadrado UN/CEFACT), más `url`.
  - Contenido visible: caja destacada (glass + acento lima) antes del FAQ con «Desde $990 MXN/m², incluye material e instalación» + nota de que el precio final depende de superficie, altura, estado de la fachada y acabado (visita de evaluación sin costo).
  - FAQ nueva «¿Cuánto cuesta una fachada de Alucobond en Cancún?» con la misma cifra.
  - `alucobond-en.html` no tiene schema de precio → no requiere cambio (tráfico EN marginal, fuera de alcance).
* **P0-06 — Lonas (`lonas-cancun/index.html`):** la única contradicción real era la meta description, que decía «Sin mínimos». El cotizador (`lonas-cancun/main.js:198`) ya avisa del cobro mínimo de 1 m² por pieza cuando aplica, y el FAQ lo explica (visible + JSON-LD). Cambios:
  - Meta description: «…Sin mínimos.» → «…desde $230/m² (cobro mínimo 1 m²)… impresas en HP Latex.» (título y `og:description` no mencionaban mínimos, no se tocaron).
  - Nota permanente bajo las 3 tarjetas de tipo de lona: «Precios por m², con impresión, ojillos y bastilla incluidos. El cobro mínimo es de 1 m² por pieza.» (inline style, sin tocar CSS).
* **Verificación local:** JSON-LD `alucobond.html` 3/3 y `lonas-cancun/index.html` 4/4 parsean; `audit_html_structure.js` → 39 HTML balanceados; `git diff --check` limpio.
* **Commit y deploy:** commit `bc7b82b`. El deploy (run `34167006384`) volvió a fallar por el timeout transitorio del puerto 65002 (2ª vez esta sesión — el endpoint SSH de Hostinger estuvo intermitente toda la tarde); `gh run rerun --failed` → `success`. **Verificado en producción con curl:** `alucobond.html` sirve «Desde $990 MXN/m²» visible + `"price": "990.00"` con `UnitPriceSpecification` y ya sin `1450`/`2200`; `/lonas-cancun/` sirve la meta con «(cobro mínimo 1 m²)», 0 ocurrencias de «Sin mínimos», y la nota permanente bajo las tarjetas.
* **Los 6 P0 del plan quedan cerrados.** Falta la verificación visual en navegador de P0-02 (banner de Express) y P0-04/P0-06 (cómo se ven las nuevas imágenes y la nota en pantalla real), pendiente de una sesión con navegador conectado o de Omar.

---
## 📅 Resumen de la Sesión (07 de Septiembre, 2026 — Semana 2 del plan: fiabilidad de formulario y cotizador)

* Omar pidió seguir con la fiabilidad del formulario y el cotizador (sin depender de decisiones comerciales).
* **`main.js` — EmailJS ya no bloquea el controlador del formulario:** `loadFormStack()` cargaba Supabase → config → EmailJS → `upload.js` en serie con `await`; si el CDN de EmailJS fallaba, `upload.js` nunca se cargaba y el formulario quedaba muerto. Ahora EmailJS se lanza **en paralelo** con su propio `.catch` (solo sirve para la notificación por correo, y `upload.js` ya tolera su ausencia con `typeof emailjs !== 'undefined'`). El `try/catch` que reinicia `started` ahora solo cubre el fallo de Supabase (crítico). Bump `main.js?v=3.3` → `?v=3.4` en las 35 páginas del `main.js` raíz.
* **`lonas-cancun/main.js` — validación explícita del cotizador:** `calculateQuote()` forzaba los campos vacíos/inválidos a mínimos con `Math.max(0.1, …)` / `Math.max(1, …)`, así que siempre mostraba un precio y el botón de WhatsApp quedaba activo con datos basura (p. ej. 0.1 × 0.1 m). Ahora:
  - Parseo sin coerción + lista de errores: ancho/alto deben ser número finito > 0 y ≤ 30 m (por encima → «escríbenos por WhatsApp para gran formato»); piezas entero ≥ 1; ojillos entero ≥ 0.
  - Si hay errores: precio = «—», el desglose lista qué corregir, `lastQuote = null` (así `saveQuoteLead()` no registra un lead basura en Supabase) y el botón de WhatsApp apunta a un mensaje genérico («necesito ayuda con las medidas») con `aria-disabled` y opacidad 0.6 — nunca se envía una cotización con números inválidos, pero el contacto sigue disponible.
  - Se elimina la redeclaración duplicada de `priceDisplay`/`breakdownDisplay`/`waButton` (ahora se obtienen una sola vez al inicio de la función).
  - Se añade una llamada inicial a `calculateQuote()` para que el precio, el desglose y el enlace de WhatsApp arranquen coherentes con los valores por defecto (antes quedaba el «$230 MXN» estático del HTML y `lastQuote` en null hasta la primera interacción).
  - Bump del `main.js` local de lonas `?v=3.2` → `?v=3.3` (solo en `lonas-cancun/index.html:580`).
* **Verificación local:** `node --check` OK en ambos `main.js`; `audit_html_structure.js` → 39 HTML balanceados; `git diff --check` limpio.
* **Commit y deploy:** commit `71e3af6`; workflow (run `34169207174`) → `success`. **Verificado en producción con curl:** la home sirve `main.js?v=3.4` (contiene `emailjsReady`), `/lonas-cancun/` sirve su `main.js?v=3.3` local (contiene la validación `errors.push`/`MAX_DIM`).

### ✅ Verificación en navegador (Claude in Chrome) — Semana 1 + 2 en producción
* **P0-02 Express — funciona:** en `/express/` y `/express/en/` cargan GTM (`GTM-5623CPQG`) y GA4 (`G-7RD98QCP79`). Consent Mode correcto: `consent default` (todo denied) → banner → clic «Aceptar» dispara `consent update` (`analytics_storage: granted`) + evento `consent_granted` + `localStorage.rtmx_consent='granted'` y el banner se retira del DOM. El banner se ve bien sobre el tema oscuro de Express (fondo navy, «Aceptar» naranja, enlace lima) — confirmado con captura. `section_view` con `section_name:'inicio'` dispara (el `id="inicio"` añadido al hero funciona).
* **Hallazgo menor P0-02:** la página **EN** de Express muestra el banner de consentimiento **en español** (`analytics.js` tiene el texto hardcodeado en ES). Coherente con la decisión previa de tener `privacidad.html` solo en español (tráfico anglo marginal), pero queda anotado por si se quiere i18n del banner.
* **Cotizador de lonas — validación verificada:** con ancho vacío / `abc` / `-5` / `0` → precio «—», mensaje «Escribe el ancho en metros (ej. 2.5)», botón WhatsApp con `aria-disabled` + opacidad 0.6 + enlace genérico («necesito ayuda con las medidas»); con `99` → «El ancho supera 30 m: escríbenos por WhatsApp para gran formato»; errores de varios campos se apilan; al volver a un valor válido (`2` m) recupera el precio real ($460) y reactiva WhatsApp con la cotización. El `calculateQuote()` inicial ya deja el desglose poblado al cargar.
* **Fix de EmailJS (`main.js?v=3.4`) — verificado el camino feliz:** al enfocar el formulario de la home cargan en orden Supabase + `supabase-config.js` + EmailJS + `upload.js?v=2`; `window.supabaseClient` y `emailjs` quedan inicializados, consola limpia («Supabase Client initialized successfully», sin errores). El fallo real del CDN de EmailJS no se pudo simular con las herramientas de navegador, pero la estructura (promesa `emailjsReady` con su propio `.catch`, `await` que no propaga) garantiza que `upload.js` cargue igual.
* **Envío real del formulario — intentado, bloqueado por el entorno:** Omar autorizó la prueba. Se llenó el formulario de la home (nombre «PRUEBA - Claude Code», correo de Omar, servicio lonas-vinilos, mensaje marcado como prueba) y se envió. **Falló en la capa de red:** `upload.js:262` → «Database insert failed», y una prueba directa del cliente Supabase devuelve `TypeError: Failed to fetch` / `status: 0`. Desde la terminal y `WebFetch`, `wtljdvexsksextnhpkkd.supabase.co` da `ENOTFOUND` / HTTP 000 — **este entorno (Bash + Chrome + WebFetch) no resuelve el dominio de Supabase**, mismo tipo de bloqueo de red ya documentado para otros dominios. No es un bug del sitio: la validación, la carga del stack y la construcción de la petición funcionaron; solo no hay salida de red hacia Supabase desde aquí. **No se creó ningún registro** (los 3 intentos fallaron antes de llegar). El insert anónimo se validó como funcional el 10-ago desde la red de Omar.
* **Hallazgo positivo del intento:** el manejo de error degradó bien — al fallar el insert, `upload.js` muestra la pantalla de error «Error al registrar la cotización. Inténtalo de nuevo.» y **reactiva el botón de envío** (`submitBtn.disabled = false`), así que un usuario con un fallo de red real ve un error claro y reintentable, no un cuelgue silencioso. Esto es justamente lo que preocupaba el plan sobre fallos de dependencias.
* **Pendiente real (solo Omar, desde su red):** enviar una cotización de prueba desde su navegador y confirmar en GA4 Realtime que llega `cotizacion_supabase_ok` y en Supabase que se guardó la fila.

---
## 📅 Resumen de la Sesión (04 de Septiembre, 2026 — nueva mascota del hero)

### 🤠 Robbie charro reemplaza a la mascota anterior
* Omar pidió cambiar la mascota del hero por `assets/robbie_rocket_charro.png`, eliminar el fondo y optimizarla sin perder los efectos actuales de flotación/movimiento.
* Se creó `assets/robbie-rocket-charro-hero.png` con transparencia real y su versión WebP `assets/robbie-rocket-charro-hero.webp`. La fuente original tenía el patrón cuadriculado integrado, no un canal alfa; se aisló por contorno y se verificó visualmente sobre azul marino. La fuente original no se modificó.
* Optimización: el PNG fuente era 1.97 MB; el WebP transparente usado por navegadores modernos pesa 188 KB (~90% menos). El PNG fallback transparente, comprimido en paleta, pesa 398 KB.
* `index.html`: preload LCP y `<picture>` cambiados a Robbie. Se mantuvo exactamente `astronaut-mascot-container` y `astronaut-mascot`, por lo que siguen activos `floatAstronaut`, las sombras y la interacción de huida del mouse en `main.js`; solo se actualizó alt y altura intrínseca a 525 por la nueva proporción.
* **Commit y deploy:** commit `88b3db6` enviado a `main`. El primer workflow (run `33891102066`) agotó sus seis conexiones SSH al puerto 65002 de Hostinger antes de transferir archivos; reintentado con `gh run rerun --failed`, terminó en `success`.

---
## 📅 Resumen de la Sesión (04 de Septiembre, 2026 — nuevo artículo SEO)

### 📐 Guía: elegir la medida de una lona para negocio
* Tras investigación profunda basada en `search_info/Consultas.csv`/`Páginas.csv` (corte 29-ago-2026), inventario del blog y SERP actual, se publicó `blog/medidas-lona-negocio-cancun.html`: **“¿Qué medida de lona necesito para mi negocio en Cancún?”**. Se eligió porque el clúster `lona/lonas` suma 796 impresiones en 125 consultas y la landing `/lonas-cancun/` tiene 1,306 impresiones con CTR 1.23%; el artículo responde la duda previa a cotizar (medidas, distancia de lectura, viento y acabados) sin duplicar el cotizador ni la guía Front vs. Mesh.
* Contenido: respuesta rápida, tabla de tamaños orientativos por caso de uso, criterios de visibilidad, elección de material ante viento, precios vigentes publicados ($230/$260/$350 por m²), acabados, CTA al cotizador/WhatsApp y FAQPage + BlogPosting + BreadcrumbList schema.
* Portada editorial original generada con ImageGen: `assets/portada-medidas-lona-negocio-cancun.webp` (95 KB) y `.jpg` (133 KB), 1200×675. Muestra medición realista de lona de gran formato en taller con contexto Caribe, sin texto ni marcas.
* Integración: tarjeta al inicio de `blog/index.html`, URL en `sitemap.xml` (y `lastmod` del blog y `/lonas-cancun/` a 2026-09-04), `llms.txt` y enlace contextual desde FAQ de `/lonas-cancun/`. Investigación y justificación conservada en `docs/report-source.md` (excluida del deploy).
* Verificación local: los 3 bloques JSON-LD parsean, enlaces internos y assets comprobados, `node scratch\audit_html_structure.js` reporta 39 HTML balanceados y `git diff --check` no reporta errores.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — auditoría técnica)

### ⚡ Auditoría de código, velocidad y experiencia de usuario
* Omar pidió una auditoría completa del código del sitio para revisar mejoras de velocidad y experiencia de usuario antes de implementar cambios.
* **Documento creado para revisión con el equipo:** `docs/auditoria-tecnica-velocidad-ux-2026-09-01.md`.
* **Alcance revisado:** HTML/CSS/JS estático, assets, headers en producción, `.htaccess`, workflow de deploy a Hostinger, `robots.txt`, `sitemap.xml`, `main.js`, `upload.js`, `analytics.js`, `gtm.js`, `index.html` y `style.css`.
* **Hallazgos principales:** oportunidad de excluir carpetas internas/pesadas del deploy (`assets/galeria-raw`, `assets/imagenes_blog`, `scratch`), versiones mezcladas de `style.css`/`main.js` entre páginas, `main.js` demasiado amplio para blogs/servicios, caché CSS/JS conservadora de 1 semana pese a usar `?v=`, assets grandes o posiblemente no usados, y necesidad de terminar la accesibilidad del nuevo dropdown del menú.
* **Verificación:** `node scratch\audit_html_structure.js` confirma 38 HTML balanceados; `git diff --check` sin errores.
* **Quick wins aplicados antes del push:** `.github/workflows/deploy.yml` ahora excluye `assets/galeria-raw`, `assets/imagenes_blog`, `scratch`, `docs` y los `hero-space-bg*.png` no usados; `.htaccess` sube caché CSS/JS de 1 semana a 1 año usando la disciplina de `?v=`; `main.js` respeta `prefers-reduced-motion` en partículas del hero y la mascota astronauta.
* **Nota:** el árbol local ya tenía cambios pendientes en `index.html`/`style.css` por el menú compactado; la auditoría los considera como cambio existente y no los revierte.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — UX del menú)

### 🧭 Menú principal saturado en la home — compactado
* Omar reportó que el menú principal se veía saturado / a punto de desbordarse. Se confirmó con Chrome (ventana a 1920px): el `<nav>` tenía **11 links en una sola fila sin wrap** (Inicio, Servicios, Obra y Mtto, Proceso, Galería, Sobre Nosotros, Reseñas, FAQ, Blog, Contáctanos, EN) más el CTA "Solicitar Cotización" — había ido creciendo con cada sesión (Obra y Mtto, Blog y EN se agregaron después del diseño original) sin quitar nada. De paso se encontró un bug: el emoji 🇺🇸 no renderiza en Chrome de este entorno y se ve como texto roto "us EN".
* **Decisión (Omar eligió entre 4 opciones):** quitar los ítems redundantes + agrupar los de menor prioridad en un dropdown.
* **Implementado en `index.html`/`style.css`:**
  - Quitados **"Inicio"** (el logo ya cumple esa función) y **"Contáctanos"** (el CTA naranja "Solicitar Cotización" ya lleva a `#contacto` y es más prominente).
  - **"Proceso", "Reseñas" y "FAQ"** agrupados en un dropdown **"Más ▾"** — CSS puro (`:hover`/`:focus-within`), sin JS nuevo; `main.js` no necesitó cambios porque ya opera sobre `querySelectorAll('nav a')` genérico.
  - **"EN"** pasó de emoji roto a texto plano en pill (`.lang-switch`, borde sutil).
  - En móvil (`≤968px`) el dropdown se aplana automáticamente dentro del menú hamburguesa existente (el botón "Más" se oculta, los 3 links quedan como cualquier otro ítem de la lista) — no requiere tap-to-open ni lógica nueva.
  - Nav visible en desktop queda en 6 links + Más + EN + CTA (antes 11 + CTA).
* **Verificación:** servidor estático local (Node, puerto 8099) + Claude in Chrome — dropdown por hover confirmado visualmente, y el estado móvil confirmado inyectando temporalmente las reglas del media query `≤968px` (el `resize_window` de la extensión no cambia el viewport real en este entorno, se quedó fijo en 1920×945 pese a pedir tamaños menores). Tras el deploy, confirmado en producción con curl que el HTML servido tiene la nueva estructura.
* **Commit y deploy:** commit `37a6a13`, deploy `success` a la primera (run `33523961665`).
* **Alcance:** solo se tocó `index.html` (el nav de la home, que era el que Omar señaló). Las ~19 páginas de servicio (`gran-formato.html`, `toldos.html`, etc.) usan su propio nav más corto (9 ítems, sin Obra y Mtto ni Contáctanos) pero **comparten el mismo emoji roto de "EN"** — no se tocaron esta sesión, pendiente de decidir si se les aplica el mismo tratamiento.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — barrido final de huérfanos)

### 🧹 8 assets huérfanos más, encontrados con un cruce completo
* Al cierre de la sesión, Omar preguntó si quedaba algo más por mejorar. Se hizo un cruce automatizado (grep de todas las referencias `assets/*.{png,jpg,jpeg,webp,svg,ico}` en `.html`/`.js`/`.css` vs. el listado real de `assets/`) que encontró 8 archivos más sin ninguna referencia: `boat.png`, `excavator.png`, `printer.png`, `supercar.png`, `truck.png` (~330KB, huérfanos desde el commit inicial del sitio `ec7f05a` — nunca se usaron) y `assets/galeria/new1.jpg`, `new2.jpg`, `new3.jpg` (~800KB, no están en el arreglo `allImgs` de la galería dinámica de `main.js`).
* **Se descartó borrar** `assets/qr-google-resenas.png`/`.webp` pese a no tener referencias en HTML — es intencional, generado para imprimir en stickers/notas de entrega físicas (campaña de reseñas), no para mostrarse en la web.
* **Commit y deploy:** commit `b3da1ec`, deploy `success` a la primera (run `33534261731`).
* **Pendiente sin resolver (decisión de Omar):** accesibilidad completa del dropdown "Más" (`aria-expanded` dinámico + cierre al click fuera) — se ofreció y Omar decidió no hacerlo por ahora.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — Fase 4: imágenes + incidente de contenido)

### 🔍 Medición real con PageSpeed Insights antes de decidir la Fase 3
* Omar pidió correr PageSpeed Insights real para decidir si valía la pena la Fase 3 (`main-lite.js`). La API pública no tiene cuota anónima (`quota_limit_value: 0`); se le explicó a Omar y él mismo creó una API key en Google Cloud Console (proyecto `rotulate-publicidad`, ya existente por Firebase) — **con Claude in Chrome operando su sesión ya autenticada**, restringida solo a "PageSpeed Insights API", sin restricción de aplicación (se usa por curl, no desde un sitio). La clave quedó guardada en su cuenta de Google Cloud (nombre "PageSpeed Insights - solo lectura"); Omar pidió dejarla ahí para uso futuro. **No se guardó la clave en ningún archivo del repo ni en memoria** — se usó solo en el momento.
* **Resultado (4 corridas: home móvil ×2, home escritorio, gran-formato.html móvil):** TBT (bloqueo por JS) consistentemente bajo (20-90ms, bien debajo del umbral "bueno" de 200ms) en las 4 mediciones. El "JavaScript no usado" que reporta Lighthouse (123-128 KB) es 100% de Google Tag Manager/gtag.js — `main.js` propio ni aparece en esa lista. **Conclusión: Fase 3 (`main-lite.js`) descartada con evidencia real** — no hay nada que ganar separando el JS propio.
* El LCP en móvil salió débil pero inconsistente entre corridas (4.8s-6.3s) — un run culpó un pico de TTFB de 4.1s que no se pudo reproducir con curl real (220-360ms consistente); el sitio no tiene suficiente tráfico para tener datos CrUX (usuarios reales) en la API. Se interpreta como ruido del laboratorio de Lighthouse, no como un problema de servidor confirmado.
* Los "network-requests" más pesados de la home fueron imágenes del showcase (`anuncios-luminosos.webp` 179KB, `letras-3d.webp` 157KB, `gran-formato.webp` 118KB, `control-solar.webp` 110KB) — esto es lo que orientó la Fase 4 a continuación.

### 🖼️ Fase 4 ejecutada: limpieza de assets muertos + recompresión
* **Eliminados del repo** (confirmado sin referencias en HTML/JS/CSS, ~3.4MB): `assets/hero-space-bg.png/-2/-3` (ya excluidas del deploy en la Fase 1 pero seguían en git), `assets/astronauta-404.png` y `astronauta-cohete-404.png` (duplicados binarios idénticos entre sí, sin uso), `assets/astronauta_cohete.png` (duplicado binario idéntico a `astronauta_mascota.png`, que sí está en uso).
* **Recomprimidas** (WebP calidad 78 con Sharp/Node, solo se aplicó cuando el ahorro fue >10%, ~1.4MB de ahorro total): `rotulacion-vehicular.webp` 246→208KB, `anuncios-luminosos.webp` 182→156KB, `letras-3d.webp` 159→136KB, `toldos.webp` 135→116KB, `gran-formato.webp` 119→96KB, `control-solar.webp` 111→92KB. `rotulacion-tradicional.webp` se dejó igual — ya estaba bien comprimida (el ahorro hubiera sido <10%).
* **Nota técnica:** en este entorno Windows, `fs.renameSync`/`fs.unlinkSync` sobre archivos en `assets/` fallan intermitentemente con `EPERM`/`EBUSY` (probablemente antivirus escaneando los archivos nuevos) — se resolvió con reintentos pacientes (hasta 20 intentos, 1.5-2s de espera) y borrando el archivo original antes de renombrar el temporal, en vez de sobrescribir directo.

### 🚨 Incidente de contenido encontrado durante la verificación visual
* Al revisar visualmente `neon-flex.jpg` antes de subirlo (buena práctica: siempre mirar el resultado, no solo medir KB), se descubrió que la imagen real en producción — usada como fondo del hero de `neon-flex.html`, `og:image` de esa página, y tarjeta de la home — era una **foto de stock de un letrero de neón que dice "Sh*t Happens"**, sin relación con el negocio y contenido inapropiado para un sitio B2B. Llevaba tiempo así en producción, sin relación con esta sesión de optimización — se detectó por casualidad al hacer la verificación de calidad.
* **Se pausó el trabajo y se preguntó a Omar antes de decidir.** Omar pidió usar una foto real de la galería — el letrero de neón hecho para **Silanes** (evento "Humanía"), ya usado en la tarjeta de "Clientes que confían en nosotros" de la home. Se generó una versión de mayor resolución desde la fuente original (`assets/nuevas_fotos/silanes-evento-2.jpeg`, 1600x900) en vez de reusar el recorte pequeño de 1200x675 ya publicado.
* **Cache-busting agregado:** las imágenes tienen caché de navegador de 1 año sin query string de versión (a diferencia de `style.css`/`main.js`). Como el contenido de `neon-flex.jpg`/`.webp` cambió (no solo el peso), cualquier visitante que ya hubiera cargado la página antes de hoy seguiría viendo la foto vieja cacheada por un año. Se agregó `?v=2` a las 8 referencias en `index.html`, `neon-flex.html`, `neon-flex-en.html`, `tulum/index.html` y `en/index.html`. **Verificado en un navegador que ya tenía la imagen vieja en caché de esta misma sesión — el `?v=2` sí forzó la actualización inmediata.**
* **Commits y deploy:** `5be1d77` (limpieza + recompresión + reemplazo de foto), `20c7707` (cache-bust). Ambos deploys `success` a la primera. Verificado en producción con curl (hash de archivo idéntico al local) y con Claude in Chrome (captura antes/después de `neon-flex.html`).
* **Pendiente:** los archivos borrados del repo siguen físicamente en el hosting (mismo comportamiento de `rsync` sin `--delete` ya documentado) — limpieza manual pendiente si se quiere recuperar ese espacio en Hostinger.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — incidente de caché del menú)

### 🐛 Incidente: el menú se veía roto en producción tras el paquete técnico de la auditoría
* Tras aplicar el paquete de bajo riesgo de `docs/auditoria-tecnica-velocidad-ux-2026-09-01.md` (commit de Codex `71264d7`, que además incluyó sin querer todos los cambios que yo ya tenía hechos en el mismo árbol de trabajo compartido: exclusiones de deploy, caché CSS/JS a 1 año, `prefers-reduced-motion` en partículas/astronauta, unificación de versiones de `style.css`/`main.js`, y `lastmod` de sitemap), Omar reportó que el menú principal "quedó horrible". Captura de pantalla confirmó el dropdown "Más" permanentemente abierto y empujando el nav a dos líneas.
* **Diagnóstico:** no era un bug de código. El HTML servido sí tenía la clase `nav-dropdown-toggle` (verificado con curl), pero el `style.css?v=3.3` servido por producción **no contenía las reglas `.nav-dropdown-menu`** (0 apariciones vía fetch + inspección de CSSOM en el navegador, contra 12 apariciones en el archivo local y en `git show HEAD:style.css`, con hash y bytes verificados idénticos). Los headers de respuesta (`x-hcdn-cache-status: MISS` pero `Last-Modified` reciente, y contenido inconsistente entre pedidos) apuntan a una capa de caché del lado del servidor de Hostinger/LiteSpeed atada a esa URL específica — el problema ya documentado en `CLAUDE.md` ("puede ser necesario purgar caché desde el panel de Hostinger").
* **Mitigación:** se subió `style.css` a `v=3.4` en las 36 referencias del sitio (todas las páginas, incluido blog) para forzar una URL nunca antes cacheada. **Funcionó de inmediato**: verificado con curl que `style.css?v=3.4` sirve el contenido correcto (62,518 bytes, coincide byte a byte con el commit) y con captura de pantalla que el menú se ve correcto (una fila, dropdown funcional por hover, incluye ya "Obra y Mtto" — Omar pidió moverlo también al dropdown "Más" en el mismo momento).
* **Commit y deploy:** commit `c27095b`, deploy `success` a la primera (run `33527011330`). Verificado visualmente con Claude in Chrome (captura antes/después) y por curl.
* **Pendiente / riesgo latente:** si vuelve a pasar algo similar sin haber cambiado el contenido de un archivo (es decir, la URL con `?v=` ya cacheada sirve contenido viejo pese a que el origen tiene el archivo correcto), el siguiente paso es que Omar purgue el Cache Manager desde el hPanel de Hostinger — esta vez no hizo falta, pero es la causa raíz más probable si se repite.
* **Barrido completo post-incidente (a petición de Omar):** se comparó byte a byte (Node, `git show HEAD:<archivo>` vs `fetch` a producción, normalizando CRLF/LF) **todo** el sitio: los 38 HTML trackeados en git, `style.css`, `main.js`, `analytics.js`, `gtm.js`, `upload.js`, `supabase-config.js`, `lonas-cancun/main.js` y `lonas-cancun/style.css`, el bundle de `/express/` (`assets/index-b314nm7x.css`), `sitemap.xml`, `robots.txt`, `manifest.json`, `llms.txt` y una muestra de imágenes recientes (portada de blog, astronauta, foto de cliente). **Resultado: 0 discrepancias reales** — coincidencia exacta en todos los casos (la única "diferencia" detectada fue un falso positivo del script: `index.html` en la raíz responde 301 → `/`, comportamiento correcto). No quedó caché vieja en ningún otro lado del sitio.
* **Nota técnica:** `upload.js` y `supabase-config.js` se cargan dinámicamente desde `main.js`/`lonas-cancun/main.js` **sin query string de versión** (`loadScript('upload.js')`, sin `?v=`). No es un problema hoy porque no cambiaron recientemente, pero con la caché de CSS/JS ahora en 1 año (antes 1 semana), si se edita cualquiera de los dos en el futuro **hay que renombrar el archivo o agregarle un `?v=` explícito en el código que los carga**, o los navegadores que ya los cachearon no verán el cambio hasta dentro de un año.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — switch de idioma en el resto de páginas)

### 🌐 Emoji de bandera roto — corregido en las 11 páginas restantes
* Tras compactar el nav de la home, Omar pidió aplicar la misma corrección al resto de menús. Barrido completo (`grep -rl '🇺🇸\|🇪🇸\|🇲🇽'`) encontró el emoji roto en 11 archivos más (fuera de `index.html`, ya corregido, y sin tocar `/blog/`):
  * `anuncios-luminosos.html`, `control-solar.html`, `control-solar-en.html`, `gran-formato.html`, `letras-3d.html`, `rotulacion-vehicular.html`, `toldos.html`, `playa-del-carmen/index.html`, `tulum/index.html` — `🇺🇸 EN` / `🇪🇸 ES` → texto plano con `class="lang-switch"` (mismo pill que en la home).
  * `express/index.html` y `express/en/index.html` — `🇺🇸 EN` / `🇪🇸 Español` → texto plano `EN`/`ES` sin clase nueva (usan su propio bundle Tailwind, no `style.css`).
* **Cache-bust:** las 9 páginas que cargan `style.css` estaban en `?v=3.2` (la home ya estaba en `v=3.3` desde la sesión de Obra y Mtto); se subieron a `v=3.3` para que el pill `.lang-switch` se vea correcto sin depender de que el navegador tuviera cacheado el CSS viejo.
* **Alcance respetado:** no se tocó el largo/estructura de estos navs (ya son más cortos que el de la home — sin "Obra y Mtto" ni "Contáctanos"), ni ningún archivo de `/blog/`.
* **Commit y deploy:** commit `3e41741`, deploy `success` a la primera (run `33524782969`). Verificado en producción con curl en las 11 páginas: 0 ocurrencias de emoji de bandera restantes en todo el sitio (fuera de blog).

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — Fase C)

### 🏷️ Consistencia de marca en datos estructurados ("rotulate" rankea en pos. 9.85)
* Investigando por qué la búsqueda de marca propia "rotulate" solo rankea en posición 9.85 (dato de la Fase A), se encontró una inconsistencia real: **36 de ~40 apariciones** de `"name"` en JSON-LD del sitio usan **"Rotulate Publicidad"** (sin acento, igual que el dominio `rotulatepublicidad.com`), pero 4 archivos usaban **"Rotúlate Publicidad"** (con acento) en `Product.brand.name`, `LocalBusiness.name` o `meta name="author"`: `alucobond.html`, `gran-formato.html`, `express/index.html`, `express/en/index.html`. Nombres de entidad inconsistentes en datos estructurados diluyen la señal de marca que Google usa para el Knowledge Graph.
* **Corrección:** unificadas las 4 páginas a "Rotulate Publicidad" (sin acento) en JSON-LD, meta author y alt de logo. **No se tocó** `index.html` (alt del astronauta, cosmético, de otra sesión) ni los archivos de `/blog/` que también tenían la variante con acento — fuera de alcance esta sesión.
* **Commit y deploy:** commit `fba2ac4`, deploy `success` a la primera. Verificado en producción con curl (0 ocurrencias de "Rotúlate" en las 3 páginas revisadas).
* **Nota:** esto es una corrección técnica de consistencia, no garantiza per se que la posición de "rotulate" suba — vale la pena revisar en 2-4 semanas junto con el resto de la volatilidad de posición señalada en la Fase A. Si no mejora, el siguiente sospechoso sería el Google Business Profile (nombre del perfil, categorías, NAP) — fuera del alcance de este repo.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — Fase B)

### 🔗 Enlazado interno: `/express/` era una página huérfana
* Al ejecutar la Fase A de SEO (ver sección de abajo) se detectó que `/express/` (1,102 impresiones en GSC, pos. 10.57) **no tenía ningún enlace interno** apuntando a ella desde ninguna otra página del sitio — ni home, ni `gran-formato.html`, ni el footer — pese a estar en el sitemap. Dependía solo de que Google la descubriera por su cuenta, lo cual explica que se quedara justo debajo del top 10 sin poder subir.
* **Cambios:** agregada como 4ª tarjeta en el bloque "También te puede interesar" de `gran-formato.html` (la página temáticamente más cercana: lonas/viniles/impresión) + enlace en el footer-nav de esa misma página y de `index.html`. Enlace recíproco agregado en el footer de `express/index.html` hacia `/`, `/gran-formato.html` y `/lonas-cancun/` para cerrar el clúster de enlazado.
* **Commit y deploy:** commit `f540488`. Primer intento de deploy falló por el timeout transitorio conocido del puerto 65002; reintentado con `gh run rerun --failed`, segundo intento `success` (run `33520026357`). Verificado en producción con curl en las 3 páginas.
* **Nota de coordinación:** esta sesión corrió en paralelo con Codex trabajando en el blog sobre el mismo directorio de trabajo (working tree compartido). Se evitó deliberadamente tocar `blog/index.html`, `sitemap.xml`, `llms.txt`, `lonas-cancun/index.html` y `agents.md` mientras Codex tenía cambios sin commitear ahí, para no mezclar ni pisar su trabajo. Codex commiteó y desplegó su parte por separado (commit `a5b5162`, ver sección siguiente) antes de que se agregara esta entrada.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026 — continuación)

### 📝 Nuevo artículo SEO: checklist de archivo para imprimir lonas y viniles
* **Investigación previa:** se cruzó `search_info/Consultas.csv` con el backlog de SEO: `/lonas-cancun/` mantiene 1,306 impresiones con CTR 1.23% y la consulta "lonas cancun" aparece con 151 impresiones, posición 9.62 y 0 clics; `/express/` concentra 1,102 impresiones con CTR 1.91%; `gran-formato.html` tiene 563 impresiones con CTR 1.95%. En búsquedas actuales, competidores como Printec, iGraphic, SuitPrint y Abig Ideas atacan precio/entrega, pero el hueco útil para el usuario es operativo: qué archivo mandar para que la lona o vinil no salga pixelado y no se retrase la entrega.
* **Fuentes consultadas:** documentación de Google Search Central sobre contenido útil, Adobe Photoshop sobre resolución de impresión, HP Large Format sobre aplicaciones de señalización y CONAGUA sobre vientos/huracanes para contextualizar por qué el material y la ubicación importan en Cancún.
* **Publicación:** se creó `blog/como-preparar-archivo-para-imprimir-lona-vinil-cancun.html` con estructura GEO/AEO: respuesta rápida, checklist de medidas/uso/archivo/fecha, tabla de formatos (PDF, AI/EPS, PSD/TIFF, JPG/PNG), explicación de resolución y pixeleo, márgenes/ojillos, recomendaciones para Canva, lista de datos para cotizar por WhatsApp, CTA a revisión de archivo y FAQ con schema.
* **Portada:** se generó una imagen nueva específica del artículo con ImageGen (taller de gran formato, plotter, laptop con layout, swatches y viniles, sin texto ni marcas). Optimizada con Sharp a `assets/portada-archivo-lona-vinil.webp` (1200×675, ~78 KB) y `.jpg` (~101 KB). El artículo y la tarjeta del blog ya usan esta portada; `og:image` y JSON-LD apuntan al JPG.
* **Integración:** añadido al inicio de `blog/index.html`, `sitemap.xml` (`lastmod` del blog actualizado a 2026-09-01), `llms.txt`, y enlazado contextualmente desde `lonas-cancun/index.html`, `gran-formato.html` y `express/index.html`.
* **Intención SEO:** reforzar clusters de "lonas cancun", "impresión de lonas cerca de mi", "lonas express", "imprimir lona", "vinil cancun", "impresión en vinil cerca de mi" y consultas informacionales como "qué archivo necesitan para imprimir una lona", empujando páginas comerciales existentes sin crear una landing redundante.

---
## 📅 Resumen de la Sesión (01 de Septiembre, 2026)

### 🔎 Análisis de `search_info/` (GSC, últimos 3 meses) y Fase A de SEO on-page
* Omar pidió revisar los reportes actualizados de `search_info/` (exportación de Google Search Console, ~230 clics / periodo mayo-agosto 2026) y armar un plan de acción. Hallazgos clave:
  * Las impresiones casi se triplicaron entre junio (60-120/día) y finales de agosto (150-205/día) gracias al contenido de julio (blog, Playa del Carmen, Tulum), pero el CTR se mantuvo bajo (~2.5%) — oportunidad de ajustar títulos/metas antes de invertir en más contenido nuevo.
  * El schema `Product`/`Offer` agregado el 5-ago en `gran-formato.html` y `alucobond.html` ya genera **"Fragmentos de productos"** en Google (1,152 impresiones, 15 clics) — confirma que esa táctica funciona.
  * Páginas con impresiones altas y CTR débil pese a posición decente: `/lonas-cancun/` (1,306 impr., pos. 7.4, CTR 1.23% — es la página del cotizador), `/express/` (1,102 impr., pos. 10.57, CTR 1.91%), `gran-formato.html`, `toldos.html`, `neon-flex.html` y `anuncios-luminosos.html` (esta última ya se había tocado el 5-ago y seguía débil).
  * Query "rotulate" (marca propia) rankea solo en pos. 9.85 — señal a revisar en otra sesión (posible tema de Google Business Profile).
  * EE. UU. genera 1,123 impresiones pero solo 0.53% CTR — páginas `-en.html` en pos. 13-24; se decidió no invertir ahí por ahora.
* **Fase A implementada** (títulos y meta descriptions, con CTA/beneficio antepuesto al inicio del snippet, siguiendo el patrón que ya funcionó el 5-ago): `lonas-cancun/index.html`, `express/index.html`, `gran-formato.html`, `toldos.html`, `neon-flex.html`, `anuncios-luminosos.html`. Open Graph y Twitter cards actualizados en consecuencia para mantener consistencia.
* **Commit y deploy:** commit `0e6344a` (rebaseado sobre `origin/main` porque hubo un push concurrente — revert del astronauta del hero, sin conflicto real ya que no tocaba las mismas líneas). Primer intento de deploy falló por el timeout transitorio conocido del puerto 65002 (documentado en `CLAUDE.md`); reintentado con `gh run rerun --failed` y el segundo intento terminó en `success` (run `33518828047`).
* **Verificado en producción con curl:** los `<title>` nuevos de `/lonas-cancun/`, `/express/` y `/toldos.html` ya se sirven en vivo.
* **Pendiente (Fase B/C del plan, sin implementar todavía):**
  1. Reforzar `/express/` con contenido/enlazado interno para empujarlo de pos. ~10.5 a top 10 (el ajuste de meta por sí solo no alcanza).
  2. Retomar cadencia de blog (nada nuevo desde el 12-jul) — ayuda a "blog de rotulación y publicidad visual" (pos. 16.74) y a la autoridad general.
  3. Portafolio con clientes nombrados y campaña de reseñas por WhatsApp (pendientes de sesiones anteriores, siguen sin resolver).
  4. Monitorear en 2-3 semanas si se estabiliza la volatilidad de posición vista en agosto (picos a pos. 14-15 en días puntuales).
  5. Investigar por qué la marca propia "rotulate" rankea en pos. 9.85.

---
## 📅 Resumen de la Sesión (28 de Agosto, 2026)

### 🧑‍🚀 Hero: retirar astronauta con uniforme de fútbol y restaurar la mascota original
* **Solicitud de Omar:** quitar del hero el astronauta con la playera de la selección mexicana / Mundial 2026 (`assets/astronauta_mx.png`/`.webp`) y regresar a la mascota original (astronauta montado en el cohete).
* **Cambios:**
  - `index.html`: el `<picture>` del hero y el `<link rel="preload">` del LCP ahora apuntan a `assets/astronauta_mascota.webp`/`.png` (la mascota original, idéntica a `astronauta_cohete.png`). Alt actualizado a "Astronauta mascota de Rotúlate montado en un cohete" y `height` corregido a 447 para la proporción real (801×1024).
  - Generado `assets/astronauta_mascota.webp` (~54 KB, Pillow q82) para conservar la optimización WebP del LCP.
  - Eliminados `assets/astronauta_mx.png` y `assets/astronauta_mx.webp` (ya sin referencias; mismo criterio que el retiro de la promo ysisi en jul-2026).
* **Verificación:** grep confirma que ninguna otra página, script o CSS referenciaba `astronauta_mx`; el comportamiento de "huida del mouse" en `main.js` usa la clase `.astronaut-mascot` y no cambia. No se hizo verificación visual en navegador en esta sesión.
* **Commit y deploy:** commit `12dbe29` en branch `claude/astronauta-futbol-original-bfnbk3`, mergeado a `main` (fast-forward) a petición de Omar ("pushea"). Workflow `Deploy to Hostinger` (run `33211454341`) terminó en `success`. **No se pudo verificar producción con curl** desde esta sesión: la política de red del entorno remoto bloquea conexiones a `rotulatepublicidad.com` (solo se confirmó el deploy por el estado del workflow). Puede requerir purga de caché en Hostinger para ver el cambio.


### 🏗️ Nueva división: RTMX Obra y Mantenimiento (Fase 1 — validación como bróker)
* **Decisión de negocio (Omar):** crear una división de servicios de obra — cancelería, herrería, fachadas de alucobond, electricidad (alta/media/baja tensión), supervisión de obra, mantenimiento y construcción, e impermeabilización — para atender clientes que ya preguntan por esto. Nombre elegido: **RTMX Obra y Mantenimiento**. Arranca como **bróker/referido** (Rotulate conecta al cliente con un aliado subcontratado y cobra comisión), no como gestor de obra con margen ni estructura nueva — modelo de bajo riesgo para validar demanda antes de invertir en seguros/contratos de PM. Mismo patrón que se usó con PPF (ver sesiones de jul-2026): validar con exposición mínima antes de escalar.
* **Implementado en el sitio (Fase 1, sin páginas nuevas):**
  - Nueva sección `#obra-mantenimiento` en [index.html](file:///C:/Users/omac_/rtmx-web/index.html) (entre "Servicios" y "Galería") con las 7 categorías en tarjetas `.glass-list-item`, nota aclarando que son "servicios coordinados por RTMX... con contratistas certificados por especialidad", y CTAs a `#contacto` y WhatsApp (mensaje distinto mencionando RTMX Obra y Mantenimiento).
  - Enlaces de navegación agregados en nav principal y footer ("Obra y Mtto" / "Obra y Mantenimiento").
  - Formulario de cotización: el `<select id="servicio">` ahora tiene dos `<optgroup>` — "Rotulación y Publicidad" (opciones existentes sin cambios de valor) y "RTMX Obra y Mantenimiento" (7 opciones nuevas: `obra-canceleria`, `obra-herreria`, `obra-alucobond`, `obra-electricidad`, `obra-supervision`, `obra-mantenimiento-construccion`, `obra-impermeabilizacion`). Verificado que la columna `servicio` en `cotizaciones_web` es `text not null` sin `CHECK`, así que los valores nuevos no requieren migración de base de datos.
  - CSS nuevo en [style.css](file:///C:/Users/omac_/rtmx-web/style.css): `.obra-grid`, `.obra-nota`, `.obra-cta` y estilos hijos de `.glass-list-item` (clase existente que no se usaba en ningún otro lado del sitio, confirmado por grep antes de tocarla). Cache-bust `style.css?v=3.2` → `v=3.3` en `index.html`.
* **Verificación:** balance de tags y unicidad de `id="obra-mantenimiento"` verificados con Node/grep. **No se hizo verificación visual en navegador** — la extensión Claude in Chrome no estaba conectada en esta sesión. Falta confirmar visualmente (desktop y mobile) antes o después del deploy.
* **Commit y deploy:** commit `88a654a` enviado a `main`; workflow `Deploy to Hostinger` (run `33103683409`) terminó en `success`. Verificado en producción con curl: `https://rotulatepublicidad.com/` sirve `id="obra-mantenimiento"` y `style.css?v=3.3` responde HTTP 200.
* **Pendiente:**
  1. Verificación visual del nuevo bloque en navegador real (desktop y mobile) — solo se confirmó por curl/grep que el HTML/CSS llegaron a producción, no cómo se ve.
  2. Definir y formalizar la red de aliados/subcontratistas por especialidad (mínimo 1-2 por categoría, con referencias verificables; electricidad de media/alta tensión requiere perito o DRO certificado — no negociable por responsabilidad legal).
  3. Medir en 60-90 días cuántas cotizaciones entran por las categorías `obra-*` antes de decidir si se escala a modelo de gestor de obra (PM) en alguna especialidad.

### ➕ Ampliación: albañilería y plomería + decisión de NO crear página SEO aparte (todavía)
* Omar pidió agregar **albañilería** y **plomería** al catálogo de RTMX Obra y Mantenimiento. Agregadas como `obra-albanileria` y `obra-plomeria` en el `<optgroup>` del formulario y como tarjetas en `#obra-mantenimiento` (9 categorías en total).
* Omar preguntó si convenía crear una **página dedicada** para captar tráfico de Google. Recomendación dada (pendiente de decisión formal, no implementada): esperar a tener leads reales y al menos 1-2 subcontratistas confirmados con fotos de proyecto antes de invertir en una landing — una página sin portafolio ni aliados nombrados rankea mal y diluye el enfoque temático del dominio (hoy centrado en rotulación/señalización). Alternativa de bajo costo si se quiere probar SEO antes: un artículo de blog, mismo patrón usado con PPF. Sin acción de código en esta ampliación además del catálogo.
* **Commit y deploy:** commit `89586a9` enviado a `main`; workflow `Deploy to Hostinger` (run `33104090218`) terminó en `success`. Verificado en producción con curl: `obra-albanileria` y `obra-plomeria` presentes en el HTML servido.

---
## 📅 Resumen de la Sesión (21 de Agosto, 2026)

### 📝 Nuevo Artículo de Blog: Letreros para Negocios en Cancún y Riviera Maya
* **Justificación (GSC):** revisando `search_info/Consultas.csv` (último reporte local, 04-ago-2026), la oportunidad elegida fue **"rótulos cancun"**: 60 impresiones, posición media 14.4 y 0 clics, sin ningún artículo de blog dedicado. La variante sin acento ("rotulos cancun") también aparece con 2 clics y posición 6.13, por lo que el artículo busca reforzar ambas.
* **Publicación:** Se creó [blog/letreros-para-negocios-cancun-riviera-maya.html](file:///C:/Users/omac_/rtmx-web/blog/letreros-para-negocios-cancun-riviera-maya.html). Cubre cómo elegir según distancia y horario, los formatos más usados (vinil de corte, lona, rótulo pintado, caja de luz, letras 3D, neón flex, alucobond), durabilidad frente al sol/salitre, precios de referencia ya publicados para materiales impresos (lona frontlit $230, mesh $260, translúcida $350 y vinil desde $350 MXN/m²), consideración de permisos y proceso de Rotúlate.
* **Estructura:** Mismo patrón que los artículos recientes (JSON-LD `BlogPosting` + `FAQPage` con 4 preguntas + `BreadcrumbList`, respuesta rápida, CTA a WhatsApp). Reutiliza `assets/letras-3d.jpg`/`.webp` existentes; no se generó imagen nueva.
* **Corrección solicitada por Omar:** se amplió la cobertura de Cancún a toda la Riviera Maya (Puerto Morelos, Playa del Carmen y Tulum) y se cambió el enfoque principal de “rótulos” a “letreros”. Se aclaró que en México “rótulo” suele referirse al letrero pintado a mano sobre muro, y esa técnica se agregó como opción explícita enlazando a `rotulacion-tradicional.html`. El archivo pasó de `rotulos-para-negocios-en-cancun.html` a `letreros-para-negocios-cancun-riviera-maya.html`, actualizando índice, sitemap y llms.
* **Integración:** Añadido a [blog/index.html](file:///C:/Users/omac_/rtmx-web/blog/index.html) (tarjeta al inicio), [sitemap.xml](file:///C:/Users/omac_/rtmx-web/sitemap.xml) (nueva URL y lastmod del índice del blog a 2026-08-21) y [llms.txt](file:///C:/Users/omac_/rtmx-web/llms.txt).
* **Verificación:** 3 bloques JSON-LD parsean correctamente con PowerShell; `scratch/audit_html_structure.js` reporta 37 archivos HTML con etiquetas balanceadas. No se hizo verificación visual en navegador esta sesión.
* **Commit y deploy:** commit `5aba324` enviado a `main`; workflow `Deploy to Hostinger` (run `32498000112`) terminó en `success`. Verificado en producción: `https://rotulatepublicidad.com/blog/letreros-para-negocios-cancun-riviera-maya.html` responde **HTTP 200** con el HTML actualizado.
* **Portada del blog:** se intentó crear una imagen nueva para el artículo, pero no se generó: la herramienta integrada de imagen no estaba disponible en la sesión y la alternativa CLI requería `OPENAI_API_KEY`, que no estaba configurada. Queda pendiente para una próxima sesión.
* **Pendientes para la próxima sesión:** solicitar indexación de la URL nueva en Google Search Console y generar/definir la portada del artículo.

---
## 📅 Resumen de la Sesión (20 de Agosto, 2026)

### 🖼️ Incorporación y Optimización de Fotos Nuevas a la Galería Dinámica
* **Procesamiento de `assets/nuevas_fotos/`:** Se auditaron las fotos en la carpeta local. Inicialmente se procesaron las 24 fotos en WebP dual (full 1200px + thumb 500px).
* **Curaduría de Fotos de Rotulación Vehicular (enviaflores.com):** Se seleccionaron exclusivamente las **3 mejores tomas de producto terminado** (`galeria-118.webp` vista 3/4 frontal, `galeria-119.webp` vista lateral completa con logo, y `galeria-120.webp` vista posterior), retirando 6 fotos redundantes de ángulos intermedios y de proceso (`galeria-117`, `121`, `122`, `123`, `124`, `125`).
* **Actualización de `main.js`:** Se ajustó el arreglo `allImgs` a **115 fotos curadas y balanceadas**. Cache-bust de `main.js` bump a `?v=3.1` en `index.html`.

### 📝 Nuevo Artículo de Blog: Vinil Adhesivo para Vidrieras y Fachadas
* **Idea basada en datos de GSC:** siguiendo el reporte del 04-ago-2026, se identificó que "vinil cancún"/"vinilos cancún" (~47 impresiones combinadas, posición 16-18, **0 clics**) no tenían ningún artículo de blog de apoyo — a diferencia de lonas, toldos, permisos, vehicular y control solar, que ya lo tienen. Se confirmó que la página de servicio correcta para esa keyword es **`gran-formato.html`** (sección "Viniles Adhesivos"/"Vinil Microperforado"), no `rotulacion-tradicional.html` (que es pintura a mano y explícitamente se posiciona como alternativa al vinil) ni `rotulacion-vehicular.html` (vinil para autos, ya cubierto por 2 artículos existentes).
* **Publicación:** Se creó [blog/vinil-adhesivo-vidrieras-fachadas-cancun.html](file:///c:/Users/omac_/rtmx-web/blog/vinil-adhesivo-vidrieras-fachadas-cancun.html) — vinil de corte, impreso, microperforado (one-way vision) y esmerilado (frost), dónde se usa cada uno, precio de referencia ($350 MXN/m², tomado del `Offer` ya existente en el JSON-LD de `gran-formato.html`) y durabilidad con tratamiento anti-UV/HP Latex. Mismo patrón que los artículos anteriores (JSON-LD `BlogPosting`+`FAQPage` con 4 preguntas+`BreadcrumbList`, respuesta rápida, CTA WhatsApp). Reutiliza `assets/gran-formato.jpg`/`.webp`. Añadido a `blog/index.html`, `sitemap.xml`, `llms.txt` y enlazado contextualmente desde `gran-formato.html`.
* **Verificación:** JSON-LD y balance de `<div>`/`<article>` validados con Node; probado en servidor estático local antes de subir. El deploy inicial (`32394274123`) falló tras 6 reintentos por el bloqueo intermitente de IPs de Hostinger ya documentado; se reintentó con `gh run rerun --failed` y quedó exitoso. Confirmado en producción con curl (artículo, índice del blog y `gran-formato.html` en 200; sitemap actualizado). Ping IndexNow enviado (200 OK).
* **Commit:** `6514827`.

### 🇺🇸 Paridad en inglés de Control Solar — sección hospitality/condominios
* Se agregó a [control-solar-en.html](file:///c:/Users/omac_/rtmx-web/control-solar-en.html) la sección "Solar Control for Hotels, Airbnbs, and Condos" (traducción de la ya existente en `control-solar.html`), insertada entre el catálogo de líneas 3M y el FAQ — mismo punto donde vive en la versión en español. Cierra el pendiente de paridad ES/EN anotado desde el 07-ago-2026.
* **Verificación:** balance de `<div>`/`<section>`/`<ul>` y JSON-LD validados con Node; probado en servidor estático local. Tras el push, deploy `32392860234` exitoso; confirmado en producción con curl (`grep` encuentra el título de la sección en el HTML servido).
* **Commit:** `c5f2cc1`.

### 📝 Nuevo Artículo de Blog: Toldos para Restaurantes en Cancún y Playa del Carmen
* **Publicación:** Se creó [blog/toldos-para-restaurantes-cancun-playa-del-carmen.html](file:///c:/Users/omac_/rtmx-web/blog/toldos-para-restaurantes-cancun-playa-del-carmen.html), siguiente artículo de la parrilla planeada (ver cierre de sesión de hoy más abajo). Cubre tipos de tela (PVC, acrílica, microperforada), tipos de estructura (fija, retráctil manual, cofre/pérgola) y resistencia al viento huracanado, con enlaces internos a `/toldos.html`, `/lonas-cancun/` y la guía de permisos publicada el mismo día.
* **Estructura:** Mismo patrón que el artículo de permisos (JSON-LD `BlogPosting` + `FAQPage` con 4 preguntas + `BreadcrumbList`, caja de "respuesta rápida", CTA a WhatsApp). Reutiliza `assets/toldos.jpg`/`.webp` ya existentes (sin generar imagen nueva). Añadido a `blog/index.html` (tarjeta), `sitemap.xml` y `llms.txt`.
* **Corrección de contenido (a petición de Omar):** el borrador inicial mencionaba "toldos motorizados con sensor de viento" como opción de estructura — Omar aclaró que **no es un servicio que ofrezcan**. Se retiró esa mención del artículo nuevo (título de sección, lista, respuesta rápida y ambas copias del FAQ) y también de **`toldos.html`** (la página de servicio ya publicada tenía "sistemas motorizados con control remoto" en su FAQ y en la lista de ventajas — quedó desactualizado/incorrecto y se corrigió de paso).
* **Verificación:** balance de `<div>`/JSON-LD validado con Node; probado con servidor estático local (`http://localhost:8099`, sin extensión de Chrome disponible en esta sesión para verificación visual). Tras el push, deploy `32391297141` exitoso; confirmado en producción con curl (artículo 200, `toldos.html` sin ninguna mención de "motoriz", sitemap actualizado). Ping IndexNow enviado (200 OK) para el artículo, `toldos.html`, `/blog/` y `sitemap.xml`.
* **Commit:** `47cb609`.
* **Pendiente opcional:** enviar "Solicitar indexación" en Google Search Console para la URL nueva (no se hizo esta sesión por falta de conexión con la extensión de Chrome).

### 🖼️ Portafolio con clientes nombrados — implementado y verificado en producción
* **Mapeo de `assets/nuevas_fotos/`** (pendiente desde jul-2026, permisos ya confirmados por Omar): identificadas 4 fotos/proyectos distintos entre los 17 archivos sin nombre de cliente — **Alumik** (letrero luminoso de canal en tienda), **Silanes** (escenografía en neón LED para el evento corporativo "Humanía"), **enviaflores.com** (rotulación vehicular completa, Toyota Avanza magenta) y **Fishing Joe's Tour Experience** (rotulación de lancha turística en Puerto Morelos).
* **Nueva sección en `index.html`**: "Clientes que confían en nosotros" (`#clientes`), entre la Galería y Nosotros — 4 tarjetas reutilizando el patrón visual `.showcase-item`/`.showcase-overlay` ya existente (nombre del cliente en lima + título + descripción corta del trabajo), grid fijo 2×2 (`.clientes-grid`, nuevo bloque en `style.css`) que colapsa a 1 columna en móvil.
* **Imágenes**: 1 foto representativa por cliente elegida de `assets/nuevas_fotos/`, redimensionadas a 1200px de ancho y convertidas a WebP+JPG (calidad ~72, ~70-200KB c/u) con Sharp (Node) en `assets/clientes/` — sin espacios en los nombres de archivo, siguiendo la regla del repo.
* **Verificación**: probado localmente con servidor estático + Claude in Chrome (grid, overlay al hover, responsive); tras el push, deploy `32387604370` completado con éxito; confirmado en producción con curl (imágenes 200, sección presente en el HTML servido de `https://rotulatepublicidad.com/`).
* **Commit:** `8a25b50`.
* **Nota:** los 17 archivos originales quedan en `assets/nuevas_fotos/` (no se suben al hosting por exclusión en `.htaccess`/deploy) por si se quiere ampliar el portafolio a futuro con más fotos por cliente.

### 🛡️ Verificación de Supabase Keep-Alive & Mantenimiento de Esquema SQL
* **Verificación de Automatización:** Se auditó el estado del proyecto Supabase y la GitHub Action `.github/workflows/supabase-keepalive.yml`. Se confirmó vía GitHub CLI (`gh run list`) que el workflow se ejecuta automáticamente cada lunes y jueves (última ejecución exitosa hoy mismo 20-ago-2026 a las 12:49 UTC). El ping a la API devuelve `200 OK`, garantizando que el proyecto no se pause por inactividad y previniendo pérdidas de cotizaciones en el sitio web.
* **Actualización de `supabase_setup.sql`:** Se actualizó el archivo de configuración SQL [supabase_setup.sql](file:///c:/Users/omac_/rtmx-web/supabase_setup.sql) en el repositorio para alinearlo exactamente con el nombre de la tabla activa de producción (`cotizaciones_web`), sus políticas RLS (`Allow anonymous inserts`, `Allow all access to authenticated users`) y almacenamiento de archivos.
* **Intento de Configuración en GA4:** Se inició la navegación guiada en la consola web de Google Analytics (propiedad `Rotúlate Publicidad`). Debido a la naturaleza dinámica de los componentes en la UI de GA4, la tarea de marcación de conversión requiere la interacción directa en el panel de administración por parte del usuario.
* **Limpieza de GRANTs sobrantes del rol `anon`** (cierra el pendiente #4 dejado el 10-ago-2026): se confirmó en `upload.js:259-260` que el sitio solo hace `.insert()` sobre `cotizaciones_web`, nunca `.select()`/`.update()`/`.delete()`. Se creó [supabase_revoke_anon_grants.sql](file:///c:/Users/omac_/rtmx-web/supabase_revoke_anon_grants.sql) (diagnóstico + `REVOKE ALL` + `GRANT INSERT` + verificación) y Omar lo ejecutó en el SQL Editor de Supabase (proyecto `wtljdvexsksextnhpkkd`). **Verificado:** la consulta de `information_schema.role_table_grants` tras el cambio muestra que `anon` solo conserva `INSERT` sobre `cotizaciones_web`. No se tocó la tabla `cotizaciones` (ERP/panel admin) ni los grants de `authenticated`.

### 📝 Nuevo Artículo de Blog: Guía de Permisos de Anuncios en Quintana Roo y Riviera Maya
* **Publicación GEO/AEO:** Se creó [blog/permisos-anuncios-publicitarios-quintana-roo-riviera-maya.html](file:///c:/Users/omac_/rtmx-web/blog/permisos-anuncios-publicitarios-quintana-roo-riviera-maya.html) abordando normativas, requisitos y reglamentos de anuncios comerciales y fachadas en Cancún (Benito Juárez), Playa del Carmen (Solidaridad), Tulum y Puerto Morelos.
* **Portada Editorial Optimizada:** Se generó y optimizó la imagen representativa en WebP y JPG (`assets/permisos-anuncios-quintana-roo.webp`/`.jpg`) con la licencia oficial de SEDETUS / Gobierno de Quintana Roo y plano con cotas arquitectónicas.
* **Corrección de Footer & Auditoría Global:** Se corrigió la estructura del pie de página en el artículo para alinearlo con las clases de `style.css` (`.footer`, `.footer-inner`, etc.) y se corrió un script de auditoría estructural confirmando que las 34 páginas del sitio tienen etiquetas balanceadas y footers consistentes.
* **Estructura y Marcado Estructurado:** Formato con respuesta rápida para citas de IA, esquemas JSON-LD validados (`BlogPosting`, `FAQPage` con 4 preguntas, `BreadcrumbList`), enlaces contextuales a servicios y páginas locales.
* **Indexación Solicitada:** Se envió la URL a rastreo prioritario en Google Search Console y se reenvió el `sitemap.xml` (marcado como "Correcto" por Google). Adicionalmente, se envió ping a la API de IndexNow (HTTP 200) para acelerar el rastreo en Bing y motores de IA.

### ⭐ Campaña Sistemática de Reseñas en Google Business Profile
* **Kit Operativo y Plantillas:** Se creó [docs/campana-resenas-google.md](file:///c:/Users/omac_/rtmx-web/docs/campana-resenas-google.md) con 4 plantillas de WhatsApp listas para copiar y pegar (instalación en sitio, mostrador/taller, B2B/hotelería y versión en inglés), junto con la estrategia y fórmulas de respuesta SEO.
* **Activo Código QR Oficial:** Se generó el QR oficial en alta resolución (`assets/qr-google-resenas.png`/`.webp`) apuntando directamente a la ficha de reseñas de Google.
* **Integración Web:** Se añadió el botón *"★ Dejar una opinión en Google"* en la sección `#testimonios` de [index.html](file:///c:/Users/omac_/rtmx-web/index.html) y se actualizó la prueba social con enlace en [en/index.html](file:///c:/Users/omac_/rtmx-web/en/index.html).

### 📍 Cierre de Sesión (20 de Agosto, 2026)
* **Commits aplicados:** `dc4fe6b`, `82190fd`, `9b4b4c1`, `e688a58`, `ff51fe8`, `0a540e7`, `5da1713`, `8a25b50`, `0069bed`, `930dc23`, `1120f6a`, `47cb609`, `2315e1a`, `c5f2cc1`, `2b4215e`, `ced1a87`, `6514827`, `1302450` (este último de una sesión en paralelo — 24 fotos nuevas a la galería dinámica, ver sección arriba).
* **Estado:** Sitio web 100% operativo en producción. Campaña de reseñas implementada con manual operativo y activos QR. Portafolio con clientes nombrados desplegado y verificado. GRANTs de `anon` limpiados en `cotizaciones_web`. Galería dinámica ampliada a 121 trabajos reales. Artículos de toldos y vinil adhesivo publicados. Paridad en inglés de control solar cerrada.
* **Backlog / Qué sigue en el plan de trabajo:**
  1. ✅ Resuelto — sección de hospitality/condominios agregada a `control-solar-en.html` (commit `c5f2cc1`).
  2. **Marcar conversión en GA4:** En el panel de Google Analytics, activar `cotizacion_supabase_ok` como conversión. Requiere acción directa de Omar en el panel.
  3. ✅ Resuelto — artículos de toldos (commit `47cb609`) y vinil adhesivo para vidrieras (commit `6514827`) publicados. **Siguiente en la parrilla del blog:** por definir — al elegir el siguiente, revisar el reporte de GSC más reciente por keywords "casi página 1" (posición 10-20, 0 clics) sin contenido de blog dedicado, como se hizo para estos dos.
  4. Opcional: enviar "Solicitar indexación" en GSC para los artículos de toldos y vinil (no se hizo por falta de conexión de la extensión de Chrome en esta sesión).
  5. Nota operativa: el deploy `32394274123` (vinil) falló primero por 6 intentos de bloqueo intermitente de Hostinger a IPs de GitHub y se resolvió con `gh run rerun --failed` — sigue siendo el procedimiento correcto documentado en `CLAUDE.md`, no requiere tocar el workflow.

---
## 📅 Resumen de la Sesión (10 de Agosto, 2026)

### 🚨 INCIDENTE CRÍTICO resuelto: formulario de cotización no guardaba nada (Supabase pausado + RLS incompleta)
Al intentar verificar el evento `cotizacion_supabase_ok` en GA4 (ver pendiente de abajo), Omar reportó que el formulario daba error y no permitía enviar cotizaciones. Se investigó y resolvió en la misma sesión.

**Causa raíz #1 — proyecto de Supabase pausado/inactivo:** el dominio `wtljdvexsksextnhpkkd.supabase.co` no resolvía en DNS ni siquiera consultando DNS públicos externos (8.8.8.8, 1.1.1.1 → "Non-existent domain"), confirmando que no era interferencia de red local sino que el proyecto free-tier de Supabase se había pausado por inactividad (migración fue el 5-jun-2026, sin evidencia de tráfico real reciente). **Omar restauró el proyecto desde el dashboard de Supabase.**

**Causa raíz #2 — política RLS de INSERT faltante en la tabla real:** tras restaurar, la tabla que usa el código (`cotizaciones_web`, ver `upload.js:259`) se quedó sin política de seguridad a nivel de fila que permitiera `INSERT` al rol `anon`. Nota: el `supabase_setup.sql` del repo documenta una tabla llamada `cotizaciones` (desactualizado/no coincide con el nombre real en uso). Omar ejecutó en el SQL Editor:
```sql
alter table public.cotizaciones_web enable row level security;
create policy "Allow anonymous inserts" on public.cotizaciones_web for insert to anon with check (true);
create policy "Allow all access to authenticated users" on public.cotizaciones_web for all to authenticated using (true);
```

**Diagnóstico adicional (por qué seguía fallando tras la policy):** confirmé con `pg_policies`, `information_schema.role_table_grants` y `set role anon; insert...` en el SQL Editor que la tabla, los GRANTs y la policy estaban correctos — el INSERT directo en SQL funcionaba. El fallo persistía solo al pasar por la API REST **cuando la llamada pedía `.select()` tras el insert** (patrón `Prefer: return=representation`), porque no existe policy `SELECT` para `anon` sobre esa tabla. El código real de producción (`upload.js:258-260`) **no usa `.select()`**, así que no está afectado — confirmado con `.insert([leadData])` puro (sin `.select()`) → `status 201` exitoso.

**Verificado end-to-end:** se envió una cotización de prueba real desde el formulario del sitio (botón "Enviar Cotización") → apareció "¡SOLICITUD ENVIADA!" → el evento `cotizacion_supabase_ok` llegó a GA4 en tiempo real (`Eventos por nombre de evento`, 1 evento). Ciclo completo formulario → Supabase → GA4 confirmado funcional.

**Pendiente / backlog para Omar:**
1. **Borrar los registros de prueba** insertados durante el diagnóstico en `cotizaciones_web` (nombres: "Prueba Interna Omar...", "SQL role test", "Prueba interna para verificar...") — vía SQL Editor: `delete from public.cotizaciones_web where nombre ilike 'Prueba%' or nombre ilike 'SQL role test';` (revisar antes de correr).
2. **Riesgo recurrente:** el plan free-tier de Supabase pausa proyectos tras ~7 días sin actividad de API. Si el sitio recibe pocas cotizaciones reales en una semana, puede volver a pausarse silenciosamente y bloquear el formulario otra vez sin aviso. Evaluar: (a) upgrade a plan Pro de Supabase (evita pausas), o (b) un ping periódico programado (cron/GitHub Action) que mantenga actividad de API.
3. Opcional: actualizar `supabase_setup.sql` en el repo para que refleje el nombre real de tabla (`cotizaciones_web`) y agregar la policy `SELECT` para `anon` si en el futuro se quiere usar `.select()` tras insertar (no es necesario para el funcionamiento actual).
4. Revisar por qué el rol `anon` tiene GRANT de UPDATE/DELETE/TRUNCATE a nivel de tabla en `cotizaciones_web` (aunque neutralizado en la práctica por no existir policy RLS para esos comandos) — no es explotable hoy, pero sería más limpio revocar esos grants y dejar solo INSERT.

---

### ✅ Microsoft Clarity conectado vía GTM — Fase 2 completada
Continuación del pendiente dejado el 07-ago (ver abajo y `clarity.md`). Omar creó el proyecto en Clarity y dio el Project ID `xyw1bj7bo1`.

- Entré a GTM-5623CPQG (cuenta RTMX) vía navegador y creé la etiqueta **"Clarity - Microsoft Clarity"** usando la plantilla comunitaria oficial **"Microsoft Clarity - Official" de `microsoft`** (verificada ✅ en la galería), en vez de HTML personalizado.
- Configuración: `Clarity Project Id` = `xyw1bj7bo1`; activador **All Pages**; **Configuración de consentimiento (BETA)** → "La etiqueta requiere consentimiento adicional para activarse" con `analytics_storage` — Clarity no dispara hasta que el visitante acepte el banner de `analytics.js` (mismo mecanismo de Consent Mode v2 ya usado para GA4).
- **Publicado:** Versión 3 del contenedor, "Microsoft Clarity - etiqueta con consentimiento", el 10/08/2026 9:29 por omar.arellano.mx@gmail.com (7 etiquetas, 5 activadores, 9 variables en total).
- **Verificado en producción (rotulatepublicidad.com, navegador de esta sesión):** sin aceptar el consentimiento, ninguna petición a `clarity.ms` (la condición de consentimiento funciona). Con `rtmx_consent=granted` en `localStorage`, `https://www.clarity.ms/tag/xyw1bj7bo1?ref=gtm` respondió **200 OK**. `https://scripts.clarity.ms/0.8.69/clarity.js` devolvió 503 en el navegador de esta sesión sin errores de CSP asociados — atribuido a la misma interferencia de red/DNS de esta máquina hacia dominios de Google/Microsoft ya detectada el 07-ago, no a la configuración.
- **Confirmado por Omar:** el proyecto de Clarity ya aparece conectado tanto a Tag Manager como a Analytics (GA4) desde su propia red — cierra el pendiente.

---

### ✅ INCIDENTE resuelto: notificaciones de correo del formulario (EmailJS) no llegaban

Omar reportó que el formulario de cotización "funciona" (se ve la pantalla de éxito) pero no le llegaba el correo de notificación de la solicitud.

**Diagnóstico:** el guardado en Supabase (`cotizaciones_web`) siempre funcionó correctamente — el problema estaba aislado al paso de notificación por EmailJS (`upload.js:268-288`, `service_n44qqee` / `template_wxr3rqu`), cuyo error se traga en un `try/catch` para no bloquear la pantalla de éxito del usuario, por lo que el fallo era invisible sin revisar la consola del navegador.

**Causa raíz:** se hizo una prueba en vivo en producción (envío real del formulario vía navegador) capturando la petición con `emailjs.send(...)` directamente en consola. Respuesta: `status 412 — "Gmail_API: Invalid grant. Please reconnect your Gmail account"`. La cuenta de Gmail conectada al servicio de EmailJS había perdido la autorización OAuth (token expirado/revocado).

**Resolución:** Omar reconectó la cuenta de Gmail en el panel de EmailJS (Email Services → `service_n44qqee` → Reconnect). Verificado con una segunda prueba real vía `emailjs.send(...)` en consola tras la reconexión → `status 200 — OK`.

**Nota:** el destinatario del correo (campo "To Email") está configurado dentro de la plantilla `template_wxr3rqu` en el panel de EmailJS, no en el código del repo.

**Limpieza:** Omar borró desde el SQL Editor de Supabase las filas de prueba acumuladas en `cotizaciones_web` (de este incidente y del incidente de Supabase de arriba: "SQL role test", "Prueba Interna Omar (sin select)", "Prueba Interna Omar - Formulario Real", "PRUEBA DIAGNOSTICO (ignorar)") — confirmado limpio. Nota: la clave `anon` no tiene policy RLS de `SELECT` sobre esta tabla, así que verificaciones futuras por API con esa clave no son confiables; hay que confirmar desde el SQL Editor.

---

### 📍 Cierre de Sesión (10 de Agosto, 2026)
* **Sin commits de código** — solo cambios de configuración externa (GTM, EmailJS) y datos (Supabase), documentados arriba. `agents.md` es el único archivo modificado en el repo.
* **Incidentes resueltos hoy:**
  1. Formulario de cotización no guardaba nada → Supabase pausado + RLS de INSERT faltante en `cotizaciones_web` (restaurado + policy creada por Omar).
  2. Notificaciones por correo (EmailJS) no llegaban → token OAuth de Gmail expirado en `service_n44qqee` (Omar reconectó, verificado `200 OK`).
* **Estado:** Clarity conectado vía GTM (versión 3 publicada), formulario end-to-end (Supabase + EmailJS) verificado funcional, tabla `cotizaciones_web` limpia de filas de prueba.
* **Punto de arranque próxima sesión:**
  1. Riesgo recurrente de pausa de Supabase por inactividad (free tier, ~7 días) — evaluar upgrade a Pro o ping periódico.
  2. Revisar/actualizar `supabase_setup.sql` para reflejar el nombre real de tabla (`cotizaciones_web`) y revocar GRANTs de UPDATE/DELETE/TRUNCATE sobrantes al rol `anon`.
  3. Continuar con el plan de competencia (portafolio con clientes nombrados, campaña de reseñas, parrilla del blog) — ver cierre del 05-ago.

---

## 📅 Resumen de la Sesión (07 de Agosto, 2026)

### 🩹 Bloqueo de entorno con Codex (primer intento, sin cambios aplicados)
Codex intentó implementar la analítica del recorrido del usuario y quedó bloqueado por un bug del sandbox de Windows al usar `apply_patch` (`orchestrator_helper_launch_failed ... codex-windows-sandbox-setup.exe ... program not found`). La lectura de archivos funcionaba pero la escritura no — no se aplicó ningún cambio. Quedaron documentadas las decisiones y hallazgos (ver detalle abajo), retomados y completados por Claude Code en la misma fecha.

### ✅ Analítica del recorrido del usuario — implementada (Fase 1: código)
**Pendiente original:** saber en qué parte del sitio los visitantes se quedan, qué secciones ven y cuáles no, para decidir mejoras con datos (GA4 + Microsoft Clarity vía el contenedor GTM-5623CPQG ya instalado).

**Decisiones confirmadas (se mantienen):**
- Conversión principal: contacto calificado (WhatsApp, teléfono, correo y formulario enviado).
- Privacidad: banner con aceptación explícita antes de activar analítica o mapas de calor.
- Alcance: Consent Mode, eventos de secciones/CTAs/formulario/cotizador, aviso de privacidad y configuración documentada de GTM.

**Verificación previa en vivo (navegador, sesión de Omar):** el contenedor GTM-5623CPQG existe pero estaba vacío (sin tags/triggers); Microsoft Clarity no tenía sesión iniciada (no hay proyecto creado o no es accesible desde ese navegador); `analytics.google.com` no cargó (no se pudo confirmar si ya existe una propiedad GA4).

**Implementado (código, sin necesidad de IDs externos — GA4/Clarity se conectan después vía GTM):**
- `analytics.js` (nuevo): Google Consent Mode v2 (denegado por defecto, con `wait_for_update`), banner de consentimiento propio (Aceptar/Rechazar, elección guardada en `localStorage` como `rtmx_consent`), `section_view` por `IntersectionObserver` sobre las 8 secciones (`inicio, proceso, servicios, proyectos, nosotros, testimonios, faq, contacto`), `scroll_depth` (25/50/75/90%), `cta_click` (WhatsApp/tel/mailto, con `cta_location` por sección/header/footer/flotante), `form_start` (primer focus en `#cotizar`). No duplica el evento `cotizacion_supabase_ok` que ya emite `upload.js:299-301`.
- `privacidad.html` (nuevo): aviso de privacidad (LFPDPPP, derechos ARCO, qué datos se recopilan, terceros: Supabase/EmailJS/GA4/Clarity), mismo layout que las páginas de servicio.
- `.htaccess`: CSP ampliada con `https://www.clarity.ms` en `script-src`/`connect-src` (dominio a confirmar cuando se instale el tag real de Clarity vía GTM, puede requerir ajuste).
- `analytics.js` incluido (con `defer`, después de `main.js`) en las 30 páginas que ya cargan `main.js` (index, 9 páginas de servicio ES + 8 EN, `en/`, `blog/` + 6 artículos, `lonas-cancun/`, `playa-del-carmen/`, `tulum/`, `privacidad.html`). No se tocó `404.html` ni `express/index.html` (no cargan `main.js`).
- Enlace "Aviso de Privacidad" / "Privacy Notice" agregado al footer de esas mismas 30 páginas (el aviso de privacidad es una sola página, sin versión en inglés separada — tráfico angloparlante es marginal según auditoría GSC del 04-ago).
- `style.css`: nuevas reglas para `#consent-banner` (glassmorphism + acento lima, reutiliza `.cta-button`/`.cta-secondary`); versión de cache bump a `?v=3.2` en las 30 páginas (antes mezcla de `3.0`/`3.1`).
- **Verificado en local** (servidor estático Node + Claude in Chrome): banner aparece, Consent Mode dispara `consent default` al cargar; al aceptar dispara `consent update` + `consent_granted` y persiste en `localStorage` (no reaparece en reload); `section_view` se dispara una vez por sección al hacer scroll; `scroll_depth` dispara en 25%; `cta_click` dispara `{cta_type:'whatsapp', cta_location:'floating'}` al hacer clic en el botón flotante; `form_start` dispara al enfocar el campo "nombre". Sin errores de consola. Balance de `<div>` verificado en las 35 páginas HTML del repo tras los cambios masivos.
- **Commit y deploy:** `ab72114` — push a `main`, deploy automático verificado exitoso (11s). Confirmado en producción con curl: `https://rotulatepublicidad.com/analytics.js` (200), `https://rotulatepublicidad.com/privacidad.html` (200), CSP con `clarity.ms` presente, y HTML de home sirviendo `analytics.js?v=1.0` / `style.css?v=3.2` sin caché stale (`Cache-Control: max-age=0`, `x-hcdn-cache-status: DYNAMIC`).

### ✅ Configuración de GTM para GA4 — completada (Fase 2, parcial)
Omar creó la propiedad GA4 (Measurement ID `G-7RD98QCP79`) el mismo día. Con ese ID, configuré directamente en el contenedor GTM-5623CPQG (cuenta RTMX) vía navegador:
- **Variables (4):** `DLV - section_name`, `DLV - cta_type`, `DLV - cta_location`, `DLV - percent` (Variable de capa de datos v2).
- **Activadores (5):** `CE - section_view`, `CE - scroll_depth`, `CE - cta_click`, `CE - form_start`, `CE - cotizacion_supabase_ok (conversion)` — todos tipo Evento personalizado.
- **Etiquetas (6):** `GA4 - Google Tag (config)` (tipo "Etiqueta de Google", dispara en Initialization - All Pages) + una etiqueta "Google Analytics: evento de GA4" por cada activador, con sus parámetros de evento conectados a las variables (`section_name`, `cta_type`+`cta_location`, `percent`).
- **Publicado:** Versión 2 del contenedor, "GA4 - seguimiento del recorrido del usuario", publicada el 07/08/2026 18:25 por omar.arellano.mx@gmail.com (6 etiquetas, 5 activadores, 9 variables en total incluyendo las integradas).

**Verificado en producción (rotulatepublicidad.com, tras publicar):** las peticiones a `google-analytics.com/g/collect` salen correctamente formadas — `tid=G-7RD98QCP79`, `en=page_view`, y `en=section_view&ep.section_name=servicios` al hacer scroll — confirmando que el dataLayer, los activadores y las etiquetas están bien conectados. **Nota:** esas peticiones devolvieron `503` en el navegador usado por Claude en esta sesión; no hubo errores de CSP en consola (la CSP ya permite `google-analytics.com`), así que probablemente es la misma interferencia de red/DNS de esta máquina hacia dominios de Google detectada antes (`analytics.google.com` no resolvía por DNS en este entorno). **Pendiente de que Omar confirme en GA4 Realtime/DebugView desde su propia red** que los eventos efectivamente están llegando (la estructura de las peticiones es correcta, falta solo la confirmación server-side).

**Pendiente (requiere a Omar):**
1. Confirmar en GA4 (Informes → Tiempo real, o DebugView) que los eventos `page_view`, `section_view`, `scroll_depth`, `cta_click`, `form_start`, `cotizacion_supabase_ok` están llegando.
2. Marcar `cotizacion_supabase_ok` como conversión en GA4 (Admin → Eventos → activar el toggle, o Admin → Conversiones → Nuevo evento de conversión con ese nombre).
3. ✅ Resuelto el 10-ago-2026 — ver sesión del 10 de Agosto arriba: Clarity conectado vía GTM (Project ID `xyw1bj7bo1`), publicado y confirmado por Omar como conectado a Tag Manager y Analytics.


## 📅 Resumen de la Sesión (04 de Agosto, 2026)

### 🔍 Análisis Google Search Console (export CSV, `search_info/`, solo diagnóstico)
* **Ventana:** 3-may al 2-ago-2026, tipo de búsqueda Web (7 CSV: Gráfico, Consultas, Páginas, Países, Dispositivos, Aparición en búsquedas, Filtros).
* **Totales:** 183 clics, 7,291 impresiones, CTR 2.51%, posición media ~7.8. **Vs. la auditoría del 05-jul** (124 clics / 4,780 impresiones / CTR 2.6% / pos 7.4): +47% clics y +52% impresiones, pero CTR y posición casi planos → el sitio gana visibilidad en más consultas de página 2 sin capturar proporcionalmente más clics.
* **Páginas top:** home (56 clics, pos 5.78), `/express/` (37 clics, 1,411 imp, pos 9.23), `rotulacion-vehicular.html` (16), `alucobond.html` (16, mejor CTR 5.21%, pos 5.58), `/lonas-cancun/` (12 clics, 1,028 imp).
* **Oportunidad #1 — "lonas cancun":** 173 impresiones (la consulta de más volumen del sitio), 0 clics, posición 9.62 — justo debajo de página 1. La página `/lonas-cancun/` en agregado está en pos 7.38, así que la brecha es específica de esa keyword exacta; reforzar title/H1/meta description con match exacto.
* **Otras consultas de alto volumen y 0 clics (posición 10-19, "casi página 1"):** "anuncios luminosos cancun" (69 imp, pos 10.96), "rótulos cancun" (60, pos 14.4), "blog de rotulación y publicidad visual" (55, pos 17.65), "toldos cancun" (40, pos 16.43), "vinil cancun" (25, pos 16.76), "vinilos cancun" (22, pos 17.95), "publicidad cancun" (19, pos 18.89).
* **Móvil vs. escritorio:** móvil mejor posición (6.81 vs 9.06) pero peor CTR (2.24% vs 2.88%) — posible snippet truncado en pantallas chicas, revisar longitud real de title/meta en SERP móvil.
* **Inglés casi invisible:** `control-solar-en.html` (pos 20.4), `alucobond-en.html` (25.8), `toldos-en.html` (17.45). EE. UU. genera 977 impresiones pero solo 3 clics (CTR 0.31%) — mezcla de consultas irrelevantes ("3m solar panel film seattle") con audiencia real (hoteles/Airbnb) que no está aterrizando bien.
* **Blog subaprovechado:** artículos individuales con buena posición (5-7) pero volumen mínimo (3-18 imp c/u); `blog.html` (índice) en pos 16.46 — falta enlazado interno/promoción para ganar tracción.
* **✅ Fix aplicado el mismo día (commit `7a2ebe5`):** on-page de `/lonas-cancun/` reforzado para la keyword exacta "lonas cancún" — meta description y `og:description` reescritos para liderar con la frase (antes empezaban con "Impresión de lonas..."); alt text de las 6 imágenes de la mini-galería (antes genérico "Trabajo de Lona Rotulate N") ahora describe el contenido con contexto geográfico; FAQ nueva "¿Dónde imprimir lonas en Cancún?" añadida visible + en el JSON-LD `FAQPage` (7 preguntas en total, verificado que el schema sigue siendo JSON válido con Node). Push a `main` hecho — deploy automático verificado exitoso (9s) y cambios confirmados en vivo con curl (meta description y FAQ nueva presentes).
* **✅ Indexación acelerada (mismo día):** ping IndexNow enviado para `/lonas-cancun/` (200 OK). "Solicitar indexación" enviado desde Google Search Console (cuenta omar.arellano.mx@gmail.com, vía navegador) para la misma URL — ya estaba indexada, se puso en cola de re-rastreo prioritario para que Google tome los cambios más rápido.
* **Pendiente (backlog, no aplicado):** revisar snippet móvil (title/meta length, ya que móvil tiene mejor posición pero peor CTR que escritorio); evaluar refuerzo de contenido/enlaces internos del blog; decidir si vale la pena invertir en las páginas `-en.html` dado el bajo volumen real de audiencia angloparlante relevante.

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

---

## 🔎 Sesión 12-jul-2026 — Análisis de competencia (Cancún + Riviera Maya)

**Sin cambios de código en el sitio.** Sesión de investigación y planeación estratégica; solo se ajustó la descripción del negocio en `CLAUDE.md` (el PPF pasa de línea central a marginal/aspiracional, confirmado por Omar).

### Hallazgos clave
* **Competidores dominantes por línea:**
  * Anuncios luminosos / letras 3D: **Suitprint** (suitprint.com) — el más fuerte en general: páginas por ciudad (Cancún/Playa/Tulum/Mérida), blog SEO local, 10+ años, portafolio con clientes nombrados, testimonios con foto. Débil en: saturación visual, sin inglés, sin precios.
  * Lonas / gran formato: **Igraphic** (4.9★ Google y "+300 empresas" visibles en el sitio), Cuarto Gráfico (13 servicios, ~20 logos de clientes), Publicidad Rayo (**cotizador interactivo de precio**, único en la zona), CopyMaya, Viral Uno.
  * Rotulación vehicular: mercado débil — Total Vinil rankea alto con sitio casi vacío. **Línea ganable a corto plazo.**
  * PPF: casi sin competencia web local (titanauto.mx caído a nivel DNS; Technik está en CDMX; instaladores XPEL de Cancún sin sitios fuertes).
* **Ventajas propias vs. todos los competidores:** precios visibles (mejor CTR: 7.69% control-solar, 6.12% alucobond), versión EN (nadie la tiene funcional), schema LocalBusiness/FAQPage/WebSite, diseño más moderno.
* **⚠️ `blog.html` huérfano en producción:** existe en el servidor mostrando "No hay artículos" pero ya no está en el repo — el rsync del deploy no borra archivos remotos. Google lo indexa vacío (GSC: consulta "blog de rotulación y publicidad visual", pos. 22). Pendiente decidir: revivir con contenido o redirigir 301.

### Decisión sobre PPF (Omar, 12-jul-2026)
* PPF es **marginal/aspiracional**: taller no adaptado, no se descarta a futuro. **No crear página de venta.** Entrada de bajo riesgo: 1 artículo de blog para medir demanda → consultas se atienden vía subcontratista certificado XPEL → escalar solo si demanda y calidad se comprueban.

### Plan de acción acordado
* **Fase 1 (1–2 sem):** resolver blog.html huérfano; sección de reseñas de Google + clientes reales en el index; promover versión EN de forma visible; potenciar control solar arquitectónico (hoteles/Airbnbs — mejor CTR del sitio).
* **Fase 2 (3–6 sem):** páginas locales Playa del Carmen y Tulum; lanzar blog con 6–10 artículos formato GEO/AEO (Q&A, respuestas de 40–60 palabras citables por IA, FAQPage schema, precios y datos de clima local); sección "nuestro proceso".
* **Fase 3:** cotizador interactivo de lonas por m² (leads a Supabase); campaña sistemática de reseñas post-venta por WhatsApp.

### Datos pendientes de Omar
1. Cantidad y calificación actual de reseñas en Google Business.
2. Permisos de clientes para nombrarlos en portafolio/testimonios.

### Implementación Fase 1 (misma sesión, 12-jul-2026)
* **.htaccess:** regla 301 `/blog.html` → `/` (resuelve la página huérfana indexada vacía).
* **index.html:**
  * Badge "★ 4.7 en Google · 30 opiniones" en el hero (`.google-rating-badge`, nueva clase en `style.css`, cache-bust a `?v=3.1`), enlazado al perfil de Google.
  * Subtítulo de #testimonios ahora muestra la calificación real (4.7★ · 30 opiniones).
  * **Eliminado `aggregateRating` (5.0/4, desactualizado) del JSON-LD LocalBusiness** — política de Google contra reseñas auto-servidas; se mantiene solo la representación visual.
  * Card de Control Solar en #servicios ahora menciona hoteles y Airbnbs.
* **control-solar.html:**
  * Eliminados los 6 `aggregateRating` falsos (5.0/4) copiados en los productos 3M del OfferCatalog (riesgo de marcado engañoso).
  * Nueva sección "Control Solar para Hoteles, Airbnbs y Condominios" (5 beneficios operativos + CTA WhatsApp con mensaje específico de hospitality).
  * Nueva FAQ "¿Instalan en hoteles y rentas vacacionales en operación?" (visible + JSON-LD FAQPage).
  * Meta description actualizada con hoteles/Airbnbs y Riviera Maya.
* **sitemap.xml:** lastmod 2026-07-12 para `/` y `/control-solar.html`.
* **Verificación:** los 6 bloques JSON-LD de ambas páginas parsean como JSON válido (script Node).
* Nota: el selector 🇺🇸 EN y la sección de testimonios con 4 reseñas reales **ya existían** — la Fase 1 solo añadió el badge agregado y la corrección de schema.

### Documentación de la investigación
* La investigación completa de competencia (perfiles de los ~12 competidores, datos GSC de partida, análisis de autoridad, fundamentos GEO/AEO del blog y estado del plan) quedó documentada en [docs/analisis-competencia-jul-2026.md](file:///C:/Users/omac_/rtmx-web/docs/analisis-competencia-jul-2026.md).
* Fase 1 desplegada y verificada en producción (deploy run 29212953747, success): 301 de /blog.html activo, badge 4.7★ visible en el home, sección hospitality en control-solar.html.

---

## 🚀 Sesión 12-jul-2026 (continuación) — Fase 2: blog GEO/AEO + páginas locales

* **Blog nuevo en `/blog/`** (índice + 6 artículos, todos con BlogPosting + FAQPage + BreadcrumbList schema, caja de "respuesta rápida" citable por IA, y SOLO datos ya publicados en el sitio):
  * `cuanto-cuesta-rotular-un-vehiculo-en-cancun.html`
  * `lona-front-vs-microperforada.html` (precios reales $230/$260/$350 por m²)
  * `cuanto-dura-un-anuncio-luminoso-frente-al-mar.html`
  * `control-solar-vs-polarizado-hoteles-airbnb.html`
  * `cuanto-dura-la-rotulacion-vehicular-en-cancun.html`
  * `ppf-en-cancun-vale-la-pena.html` (medidor de demanda PPF acordado; NO promete instalación propia, orienta y canaliza)
* **Páginas locales**: `/playa-del-carmen/` (ángulo: competencia comercial de la Quinta Avenida, un solo proveedor) y `/tulum/` (ángulo: estética del destino + materiales anti-salitre). Contenido único, Service schema con areaServed por ciudad, FAQ local.
* **Integración**: 301 de `/blog.html` ahora → `/blog/`; Blog + Playa + Tulum en nav/footer del index; hero del index ahora menciona **control solar 3M** (lo señaló Omar: faltaba); sitemap +9 URLs (31 total); eliminado el último `aggregateRating` auto-servido que quedaba (Product schema de `/lonas-cancun/`).
* **Análisis extra de competidores** (a petición de Omar): Sign Factory (B2B hotelero serio, sede Cancún), American Sign (corporativo, débil en conversión) y Kreativa (agencia 15 años, sureste). Documentados en `docs/analisis-competencia-jul-2026.md` §2.5 — ninguno muestra reseñas, precios ni inglés; nuestras ventajas se sostienen.
* **Verificación local**: JSON-LD válido en los 11 archivos tocados; sitemap balanceado.
* **Pendiente Fase 2**: portafolio con clientes nombrados — falta el mapeo foto→cliente de `assets/nuevas_fotos/` (Omar confirma permisos de todos los clientes).

### Post-Fase 2 (misma sesión)
* Enlace "Blog" añadido al menú de TODAS las páginas (9 páginas de servicio + lonas-cancun; el index ya lo tenía) — commit `c1f5924`.
* **Indexación solicitada en Search Console** (vía navegador de Omar): `/blog/`, `/playa-del-carmen/` y `/tulum/` añadidas a la cola prioritaria de rastreo, y `sitemap.xml` reenviado (el anterior databa del 26-jun con 22 páginas; ahora tiene 31 URLs).
* Flujo para alimentar el blog documentado: cada artículo nuevo = archivo HTML en `/blog/` siguiendo la plantilla existente + tarjeta en `/blog/index.html` + entrada en `sitemap.xml` + push a main.

---

## 📍 Cierre de sesión (14-jul-2026) — Punto de arranque para la siguiente

**Estado:** Fases 1 y 2 del plan de competencia desplegadas, verificadas en producción e indexación solicitada en GSC. Documentación completa en [docs/analisis-competencia-jul-2026.md](file:///C:/Users/omac_/rtmx-web/docs/analisis-competencia-jul-2026.md).

**Próximos pasos (en orden de prioridad):**
1. **Portafolio con clientes nombrados** (cierra Fase 2): Omar debe indicar qué cliente/proyecto es cada foto de `assets/nuevas_fotos/` (silanes-evento, alumik, WhatsApp jun-2026). Permisos de todos los clientes ya confirmados. Al armarlo: renombrar archivos (tienen espacios, regla del repo) y convertir a WebP.
2. **Fase 3:** cotizador interactivo de lonas por m² (guardar leads en Supabase, tabla `cotizaciones`) + campaña de reseñas post-venta por WhatsApp (meta ~1/semana; hoy: 4.7★/30) + responder reseñas existentes en Google.
3. **Monitorear en GSC (~2 semanas):** indexación de /blog/, /playa-del-carmen/, /tulum/ y los 6 artículos; primeras impresiones de las keywords nuevas.
4. **Blog:** publicar 1-2 artículos/mes. Backlog de temas en §6 del doc de análisis (permisos de anuncios Benito Juárez/Solidaridad, toldos para restaurantes, etc.). Flujo: HTML en /blog/ + tarjeta en índice + sitemap + push.
5. **Pendiente menor:** verificar si Omar purgó la caché de Hostinger (Cache Manager) tras los deploys del 12-jul.

**Commits de la sesión:** `1625d55` (Fase 1), `1a710c2` (doc investigación), `157ccf8` (Fase 2), `c1f5924` (Blog en navs), `854dfae` (log GSC).

---

## 🧮 Sesión 14-jul-2026 — Fase 3: cotizador con leads + incidente Supabase

### Cotizador de lonas (commit `62aa196`) — verificado e2e en producción
* El cotizador interactivo YA existía en `/lonas-cancun/` (cálculo en vivo, mínimo 1m², ojillos, diseño). Lo que se agregó:
  * **Campos opcionales** de nombre y WhatsApp en el formulario.
  * **Registro en Supabase**: cada clic en "Enviar a WhatsApp" inserta la cotización (specs + total) en `cotizaciones_web` con `servicio='cotizador-lonas'`; anónimos marcados como "Visitante del cotizador (anónimo)". Dedupe de 5 min por firma. Fire-and-forget: nunca bloquea la apertura de WhatsApp.
  * **EmailJS** (mismo service/template del formulario) solo cuando el visitante deja contacto.
  * Stack Supabase+EmailJS con carga diferida (IntersectionObserver a 600px del cotizador).
  * Mensaje de WhatsApp personalizado con el nombre. Cache-bust `main.js?v=2.7`.
* Verificación: insert por curl (HTTP 201), insert desde la página en producción (OK), EmailJS disparado tras el flujo real de clic. Quedan ~4 filas de prueba "(ignorar)" en la tabla — borrables.

### ⚠️ INCIDENTE: proyecto Supabase pausado (detectado 14-jul-2026)
* El dominio `wtljdvexsksextnhpkkd.supabase.co` no resolvía en DNS (proyecto gratuito pausado por inactividad, ~1 semana sin peticiones). **El formulario principal estuvo perdiendo leads en silencio** desde la pausa.
* Omar lo restauró desde el dashboard el 14-jul. Verificado funcionando después.
* **Prevención (commit `c7e8546`):** workflow `.github/workflows/supabase-keepalive.yml` — ping a la API lunes y jueves 12:00 UTC; si responde 000/5xx el job FALLA y GitHub notifica por correo (doble función: keep-alive + monitor).

### Warnings del linter de Supabase (supabase/warnings_supabase.txt, exportado por Omar)
* Todos nivel WARN/SECURITY. Análisis y correcciones en **supabase/fix_warnings.sql** (correr en SQL Editor del dashboard):
  * search_path fijado en 6 funciones; REVOKE de funciones SECURITY DEFINER vía API (triggers a nadie; helpers del panel solo a authenticated); DROP de la política de listado público del bucket `cotizaciones` (el aviso más relevante: cualquiera podía listar los archivos de clientes; las URLs públicas siguen funcionando sin ella).
  * Intencionales (no tocar): insert anónimo en `cotizaciones_web` (así entran los leads) y acceso total de authenticated (el panel admin).
  * Pendiente de Omar en dashboard: habilitar "Leaked password protection" en Auth.
* **Hardening del hosting:** `.htaccess` ahora bloquea `.sql`/`.ps1` y las carpetas `supabase/`, `docs/`, `deploy_failures/`, `seo_performance/` (rsync sube todo; `supabase_setup.sql` y `deploy-local.ps1` estaban públicamente accesibles).

### Nota de deploys
* El run del commit `afd0ec3` (13-jul) marcó failure transitorio; el siguiente deploy (rsync = sync completo) subió todo. Sin impacto.

---

## 🧮 Sesión 14-jul-2026 — Fase 3: cotizador con leads + incidente Supabase + hardening

### Cotizador de lonas (commit `62aa196`) — verificado e2e en producción
* El cotizador YA existía en `/lonas-cancun/` (cálculo en vivo, mínimo 1m², ojillos, diseño). Se agregó:
  * Campos opcionales de **nombre y WhatsApp**; mensaje de WhatsApp personalizado con el nombre.
  * **Registro en Supabase**: cada clic en "Enviar a WhatsApp" inserta la cotización (specs + total) en `cotizaciones_web` con `servicio='cotizador-lonas'`; anónimos marcados. Dedupe 5 min. Fire-and-forget (no bloquea WhatsApp).
  * **EmailJS** (mismo service/template del formulario) solo cuando dejan contacto.
  * Carga diferida del stack (IntersectionObserver, 600px). Cache-bust `main.js?v=2.7`.
* Verificado: insert por curl (201), insert desde la página en producción (OK), EmailJS disparado en el flujo real.

### ⚠️ INCIDENTE: proyecto Supabase pausado (detectado y resuelto 14-jul-2026)
* `wtljdvexsksextnhpkkd.supabase.co` no resolvía en DNS: proyecto free pausado por inactividad. **El formulario principal estuvo perdiendo leads en silencio.** Omar lo restauró desde el dashboard; verificado funcionando.
* **Prevención (commit `c7e8546`):** `.github/workflows/supabase-keepalive.yml` — ping lunes y jueves 12:00 UTC; si responde 000/5xx el job falla y GitHub notifica por correo (keep-alive + monitor). Primera corrida manual: success.

### Warnings del linter de Supabase — RESUELTOS y verificados
* Fuente: `supabase/warnings_supabase.txt` (exportado por Omar; carpeta gitignored, no se despliega).
* Aplicado por Omar en SQL Editor (script final en `supabase_fix_warnings.sql`):
  * search_path fijado en 6 funciones.
  * **Lección técnica:** revocar EXECUTE solo a `anon` no sirvió — el permiso venía del rol `PUBLIC`. Se revocó de PUBLIC y se devolvió a `authenticated`/`service_role` donde aplica.
  * Verificado desde fuera con curl: `has_role` y `get_user_empresa_id` → 401 para anon; `handle_new_user` fuera de la API (404); listado del bucket `cotizaciones` cerrado; **insert anónimo sigue en 201**.
* "Leaked password protection": **descartado** — es de plan Pro (error al activarlo en free). Riesgo bajo.
* Filas de prueba eliminadas por Omar (5, filtro `nombre ilike '%(ignorar%'` con RETURNING).

### Hardening del hosting (commit `2d73823`)
* `.htaccess`: FilesMatch ampliado a `.sql`/`.ps1` y 403 para `supabase/`, `docs/`, `deploy_failures/`, `seo_performance/`. `supabase_setup.sql` y `deploy-local.ps1` estaban públicamente accesibles — verificado 403 en producción tras el deploy; `robots.txt` y el sitio intactos.

### Pendientes del plan (sin cambios)
1. Portafolio con clientes nombrados (falta mapeo foto→cliente de `assets/nuevas_fotos/`).
2. Campaña de reseñas post-venta por WhatsApp (meta ~1/semana).
3. Blog: 1-2 artículos/mes (backlog en docs/analisis-competencia-jul-2026.md §6).

### Cierre verificado de la sesión 14-jul-2026
* Segundo SQL aplicado por Omar (revoke desde PUBLIC) y **verificado desde fuera con curl**: `has_role` y `get_user_empresa_id` devuelven 401 a anónimos, `handle_new_user` fuera de la API (404), listado del bucket cerrado, e insert anónimo del formulario/cotizador intacto (201).
* "Leaked password protection": descartado — Supabase lo limita a plan Pro (error confirmado al intentar activarlo en free).
* Filas de prueba eliminadas por Omar: 5, con `delete ... where nombre ilike '%(ignorar%' returning id, nombre` — la tabla queda solo con leads reales.
* `supabase_fix_warnings.sql` actualizado en el repo a la versión final aplicada (idempotente, con la lección del grant vía PUBLIC).
* **Nueva REGLA SIEMPRE en CLAUDE.md** (pedida por Omar): toda implementación/corrección/incidente se documenta en agents.md al momento de completarse y verificarse, sin que se pida.

### Auditoría de seguridad (14-jul-2026, a petición de Omar) y cierre de sesión
* **Verificado en vivo:** los 7 headers de seguridad activos (CSP estricta, HSTS 1 año, nosniff, X-Frame DENY, referrer, permissions policy); cero exposiciones (.git/.env/.md/.sql/.ps1 y carpetas internas → 403/404); Supabase endurecido (anon solo INSERT, funciones internas en 401, bucket sin listado).
* **Riesgos aceptados por diseño:** anon key pública (protege RLS), 'unsafe-inline' solo en estilos.
* **Margen de mejora identificado (sin acción por ahora):**
  1. Spam directo a la API de leads (sin CAPTCHA) — actuar solo si aparece basura en la tabla (solución: Turnstile + edge function).
  2. Respaldos: plan free de Supabase no tiene backups automáticos — Omar debe exportar `cotizaciones_web` a CSV periódicamente (o montar export automático si crece).
  3. **Pendiente de Omar:** confirmar 2FA en GitHub, Hostinger, Supabase y Google — hoy el eslabón más débil son las cuentas, no el sitio.

**Punto de arranque próxima sesión:** portafolio con clientes nombrados (falta mapeo foto→cliente de assets/nuevas_fotos/), campaña de reseñas post-venta, y blog 1-2 artículos/mes. Fase 3 (cotizador con leads) COMPLETA y verificada.

---

## 📅 Resumen de la Sesión (05 de Agosto, 2026)

Ejecución de plan de optimización SEO basado en el análisis directo del directorio `search_info/` (183 clics, 7,291 impresiones, CTR 2.51%):

### 1. 📱 Optimización de Metadescripciones para Móviles (Evitar Truncamiento)
* Recortadas las descripciones en `anuncios-luminosos.html`, `toldos.html`, `letras-3d.html`, `rotulacion-vehicular.html` y `gran-formato.html` a `< 125 caracteres`.
* Antepuesto el llamado a la acción comercial (`¡Cotiza en 24h!`, `¡Cotiza hoy!`) al inicio de los snippets para evitar que queden fuera en pantallas pequeñas (elevando CTR móvil desde 2.24%).

### 2. 💡 Refuerzo On-Page para "Anuncios Luminosos Cancún"
* En [`anuncios-luminosos.html`](file:///C:/Users/omac_/rtmx-web/anuncios-luminosos.html), se añadió una rejilla de tarjetas explicativas con H3 para los 3 formatos clave: **Cajas de Luz**, **Letreros LED Retroiluminados** y **Neón Flex LED**, atacando la consulta en posición 10.96 (69 imp, 0 clics).

### 3. 🇺🇸 Captura de Búsquedas B2B de EE. UU.
* En [`express/en/index.html`](file:///C:/Users/omac_/rtmx-web/express/en/index.html), se añadieron 2 tarjetas de servicio B2B enfocadas en compradores corporativos internacionales: *"Commercial Signage B2B"* (LED channel letters & outdoor building signs) y *"Large Format Printing"* (oversized banners & trade show displays).

### 4. 🏷️ Rich Snippets `Product` + `Offer`
* Inyectado marcado estructurado `Product` con `AggregateOffer` en [`gran-formato.html`](file:///C:/Users/omac_/rtmx-web/gran-formato.html) ($230 a $350 MXN) y [`alucobond.html`](file:///C:/Users/omac_/rtmx-web/alucobond.html) ($1,450 a $2,200 MXN) para capturar rich snippets con precios en Google (887 imp, CTR 1.01%).

### 5. 🔗 Enlazado Interno del Blog
* Enlazado contextual reforzado desde artículos clave en `/blog/` (ej. [`blog/ppf-en-cancun-vale-la-pena.html`](file:///C:/Users/omac_/rtmx-web/blog/ppf-en-cancun-vale-la-pena.html)) apuntando hacia las páginas de conversión de servicio ([`/rotulacion-vehicular.html`](file:///C:/Users/omac_/rtmx-web/rotulacion-vehicular.html)).

### 6. ⚡ Optimización Técnica, Carga (WPO) y Cache-Busting (Fases A, B y C)
* **Preload LCP & Preconnect:** Inyectadas etiquetas `<link rel="preload" as="image" ... fetchpriority="high">` para precargar las imágenes principales de hero (.webp/.jpg) en `index.html` y las 8 páginas de servicio. Se agregaron hints de red `preconnect` a la API de Supabase (`wtljdvexsksextnhpkkd.supabase.co`) y `dns-prefetch` a Google Analytics.
* **Unificación de Caché:** Estandarizadas las versiones de archivos estáticos sitewide a `style.css?v=3.1` y `main.js?v=3.0`.
* **Utilidades CSS:** Añadidas clases reutilizables de diseño (.container-narrow, .container-wide, .glass-card-sm, .glass-list-item) en `style.css` para recortar código inline en HTML.
* **Deploy Rápido:** Agregadas exclusiones a `.github/workflows/deploy.yml` (`search_info`, `seo_performance`, `deploy_failures`, `assets/ysisi`, `assets/nuevas_fotos`) para agilizar la sincronización por rsync.

### 📍 Cierre de Sesión (05 de Agosto, 2026)
* **Commits:** `ba6001d` (SEO & B2B) y `47fee45` (WPO & Cache-Busting).
* **Despliegues:** Ambos verificados en producción vía GitHub Actions (`completed success`) y respondiendo en vivo en Hostinger.
* **Punto de arranque próxima sesión:** 
  1. Portafolio con clientes nombrados (mapeo foto→cliente de `assets/nuevas_fotos/`).
  2. Campaña de reseñas post-venta por WhatsApp (Google Business Profile 4.7★).
  3. Continuación de parrilla del blog (1-2 artículos/mes en `/blog/`).
