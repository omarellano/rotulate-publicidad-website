# Handoff para Agentes de IA — Estado del Proyecto

Este archivo sirve para transferir el contexto del desarrollo actual del sitio web **Rotúlate Publicidad** a cualquier agente de IA que colabore en el futuro. Es la **fuente única de verdad** para documentar el estado activo de desarrollo, la bitácora de sesiones históricas, notas de investigación y el backlog de tareas pendientes (evitando duplicar esta información en `CLAUDE.md`).

---
## 📅 Resumen de la Sesión (27 de Agosto, 2026)

### 🏗️ Nueva división: RTMX Obra y Mantenimiento (Fase 1 — validación como bróker)
* **Decisión de negocio (Omar):** crear una división de servicios de obra — cancelería, herrería, fachadas de alucobond, electricidad (alta/media/baja tensión), supervisión de obra, mantenimiento y construcción, e impermeabilización — para atender clientes que ya preguntan por esto. Nombre elegido: **RTMX Obra y Mantenimiento**. Arranca como **bróker/referido** (Rotulate conecta al cliente con un aliado subcontratado y cobra comisión), no como gestor de obra con margen ni estructura nueva — modelo de bajo riesgo para validar demanda antes de invertir en seguros/contratos de PM. Mismo patrón que se usó con PPF (ver sesiones de jul-2026): validar con exposición mínima antes de escalar.
* **Implementado en el sitio (Fase 1, sin páginas nuevas):**
  - Nueva sección `#obra-mantenimiento` en [index.html](file:///C:/Users/omac_/rtmx-web/index.html) (entre "Servicios" y "Galería") con las 7 categorías en tarjetas `.glass-list-item`, nota aclarando que son "servicios coordinados por RTMX... con contratistas certificados por especialidad", y CTAs a `#contacto` y WhatsApp (mensaje distinto mencionando RTMX Obra y Mantenimiento).
  - Enlaces de navegación agregados en nav principal y footer ("Obra y Mtto" / "Obra y Mantenimiento").
  - Formulario de cotización: el `<select id="servicio">` ahora tiene dos `<optgroup>` — "Rotulación y Publicidad" (opciones existentes sin cambios de valor) y "RTMX Obra y Mantenimiento" (7 opciones nuevas: `obra-canceleria`, `obra-herreria`, `obra-alucobond`, `obra-electricidad`, `obra-supervision`, `obra-mantenimiento-construccion`, `obra-impermeabilizacion`). Verificado que la columna `servicio` en `cotizaciones_web` es `text not null` sin `CHECK`, así que los valores nuevos no requieren migración de base de datos.
  - CSS nuevo en [style.css](file:///C:/Users/omac_/rtmx-web/style.css): `.obra-grid`, `.obra-nota`, `.obra-cta` y estilos hijos de `.glass-list-item` (clase existente que no se usaba en ningún otro lado del sitio, confirmado por grep antes de tocarla). Cache-bust `style.css?v=3.2` → `v=3.3` en `index.html`.
* **Verificación:** balance de tags y unicidad de `id="obra-mantenimiento"` verificados con Node/grep. **No se hizo verificación visual en navegador** — la extensión Claude in Chrome no estaba conectada en esta sesión. Falta confirmar visualmente (desktop y mobile) antes o después del deploy.
* **Pendiente:**
  1. Verificación visual del nuevo bloque (extensión de Chrome no disponible esta sesión).
  2. Definir y formalizar la red de aliados/subcontratistas por especialidad (mínimo 1-2 por categoría, con referencias verificables; electricidad de media/alta tensión requiere perito o DRO certificado — no negociable por responsabilidad legal).
  3. Commit y deploy de este cambio (aún no se ha hecho commit — ver `git status`).
  4. Medir en 60-90 días cuántas cotizaciones entran por las categorías `obra-*` antes de decidir si se escala a modelo de gestor de obra (PM) en alguna especialidad.

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
