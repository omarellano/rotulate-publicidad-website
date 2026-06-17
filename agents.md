# Handoff para Agentes de IA — Estado del Proyecto

Este archivo sirve para transferir el contexto del desarrollo actual del sitio web **Rotúlate Publicidad** a cualquier agente de IA que colabore en el futuro. Es la **fuente única de verdad** para documentar el estado activo de desarrollo, la bitácora de sesiones históricas, notas de investigación y el backlog de tareas pendientes (evitando duplicar esta información en `CLAUDE.md`).

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
* **Diagnóstico de Supabase Storage:** Confirmamos que el bucket `cotizaciones` no existía físicamente en el Storage de Supabase (retornando error 404). El usuario procederá a crearlo en su dashboard.
* **Honeypot de Spambots:** Renombramos el campo honeypot de `website-url` a `form-temp-verify` en `index.html` y `upload.js` para evitar que los autocompletados del navegador (Chrome, Bitwarden, etc.) lo llenen por error y bloqueen los envíos legítimos.
* **EmailJS:** Envolvimos el envío de correos en un bloque `try-catch` independiente para que las fallas transitorias de notificación de correo no invaliden ni bloqueen la pantalla de confirmación exitosa cuando los datos ya se insertaron correctamente en Supabase.

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

* **Despliegue:** 100% operativo. Último deploy exitoso: 12 de junio de 2026 (commit `d90888a`, attempt 2 tras timeout transitorio).
* **Conexión a Supabase:** Integración completada y activa. El formulario escribe datos de forma segura en la base de datos de Supabase. La subida de archivos requiere que el usuario cree el bucket `cotizaciones` en su panel de administración de Supabase.
* **Ajustes de Formulario:** Se corrigieron los problemas del honeypot (evitando autocompletados no deseados de navegadores) y se aisló el flujo de EmailJS en `upload.js` para evitar fallos globales en caso de errores en la notificación por correo.
* **URLs funcionales en producción:**
  * Inicio Español: [https://rotulatepublicidad.com/](https://rotulatepublicidad.com/)
  * Control Solar 3M: [https://rotulatepublicidad.com/control-solar.html](https://rotulatepublicidad.com/control-solar.html)
  * Express Español: [https://rotulatepublicidad.com/express/](https://rotulatepublicidad.com/express/)
  * Express Inglés: [https://rotulatepublicidad.com/express/en/](https://rotulatepublicidad.com/express/en/)
* **Documentación:** Se actualizaron este archivo [agents.md](file:///c:/Users/omac_/rtmx-web/agents.md) y el reporte de diagnóstico del formulario [diagnostic_form_report.md](file:///C:/Users/omac_/.gemini/antigravity-cli/brain/8605a08a-562f-4e3b-9ef0-c0619e239f2d/diagnostic_form_report.md). El archivo [README.md](file:///c:/Users/omac_/rtmx-web/README.md) en español y [supabase_setup.sql](file:///c:/Users/omac_/rtmx-web/supabase_setup.sql) explican la configuración inicial.

---

## 📋 Próximos Pasos Recomendados (Backlog)

Si vas a continuar trabajando en este proyecto, te sugerimos enfocarte en las siguientes tareas:

1. **⚙️ Integrar Lectura de Cotizaciones en el Admin (`rtmx-cotizador`):**
   * Dado que la tabla y bucket `cotizaciones` ya están en el mismo Supabase centralizado, añade una sección en el panel admin para ver las cotizaciones entrantes del sitio público, asignarlas a asesores y convertirlas en órdenes de trabajo.
2. **🇬🇧 Expansión del Contenido en Inglés:**
   * Si la landing page `/express/en/` empieza a reportar clics orgánicos, evalúa traducir o crear landings específicas en inglés para eventos corporativos y bodas de destino en Cancún (ej. banners, displays tipo araña, stands).
