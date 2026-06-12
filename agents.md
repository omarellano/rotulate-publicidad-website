# Handoff para Agentes de IA — Estado del Proyecto

Este archivo sirve para transferir el contexto del desarrollo actual del sitio web **Rotúlate Publicidad** a cualquier agente de IA que colabore en el futuro.

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
* **Conexión a Supabase:** Integración completada y activa. El formulario escribe datos y sube archivos de forma segura a Supabase.
* **URLs funcionales en producción:**
  * Inicio Español: [https://rotulatepublicidad.com/](https://rotulatepublicidad.com/)
  * Control Solar 3M: [https://rotulatepublicidad.com/control-solar.html](https://rotulatepublicidad.com/control-solar.html)
  * Express Español: [https://rotulatepublicidad.com/express/](https://rotulatepublicidad.com/express/)
  * Express Inglés: [https://rotulatepublicidad.com/express/en/](https://rotulatepublicidad.com/express/en/)
* **Documentación:** Se actualizó este archivo [agents.md](file:///c:/Users/omac_/rtmx-web/agents.md) y se creó [README.md](file:///c:/Users/omac_/rtmx-web/README.md) en español que explica la arquitectura del proyecto, configuraciones de servidor, redirecciones y desarrollo local. También se creó [supabase_setup.sql](file:///c:/Users/omac_/rtmx-web/supabase_setup.sql) como respaldo SQL local de la base de datos de Supabase.

---

## 📋 Próximos Pasos Recomendados (Backlog)

Si vas a continuar trabajando en este proyecto, te sugerimos enfocarte en las siguientes tareas:

1. **⚙️ Integrar Lectura de Cotizaciones en el Admin (`rtmx-cotizador`):**
   * Dado que la tabla y bucket `cotizaciones` ya están en el mismo Supabase centralizado, añade una sección en el panel admin para ver las cotizaciones entrantes del sitio público, asignarlas a asesores y convertirlas en órdenes de trabajo.
2. **✍️ Optimización de Metadatos de Servicios (SEO Local):**
   * Las páginas `/rotulacion-vehicular.html`, `/toldos.html`, `/gran-formato.html` y `/letras-3d.html` tienen impresiones en GSC pero 0 clics (están en páginas 2 y 3).
   * Modifica sus `title` y `meta description` para hacerlos más atractivos y orientados a búsquedas locales de Cancún (ej. "Rotulación Vehicular en Cancún | Vinil para Autos y Flotillas").
3. **🏷️ Auditoría de Schema Markup (Fragmentos de Producto):**
   * El Search Console reporta 99 impresiones con 0% de CTR en "Fragmentos de productos". Revisa el JSON-LD de marcado estructurado en `index.html` para asegurar que los precios, imágenes y descripciones de los productos se estén mostrando correctamente en el motor de búsqueda.
   * *Avance (12-jun-2026):* `control-solar.html` ya tiene `OfferCatalog` con productos 3M (marca + imagen) y schema `FAQPage`. Falta replicar el patrón en las demás páginas de servicio y validar en GSC/Rich Results una vez reindexado.
4. **🇬🇧 Expansión del Contenido en Inglés:**
   * Si la landing page `/express/en/` empieza a reportar clics orgánicos, evalúa traducir o crear landings específicas en inglés para eventos corporativos y bodas de destino en Cancún (ej. banners, displays tipo araña, stands).
