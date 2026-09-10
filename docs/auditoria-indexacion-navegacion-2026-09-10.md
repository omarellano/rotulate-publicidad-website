# Auditoría de indexabilidad, arquitectura y navegación

Fecha: 10 de septiembre de 2026. Sitio: https://rotulatepublicidad.com/.

## Dictamen

El sitio tiene una base técnica saludable y páginas comerciales que Google ya mostraba durante el periodo del histórico disponible. No se encontró un bloqueo general de rastreo. La prioridad es consolidar identidad y variantes de URL, mejorar la navegación comercial y corregir discrepancias de contenido/markup. No se justifica rehacer la web ni cambiar las URLs de servicio.

La captura de Hiplot muestra **enlaces de sitio (sitelinks)**. Google los selecciona automáticamente según la estructura y la consulta; no hay un marcado que los active ni permite elegir exactamente sus destinos. Las mejoras propuestas favorecen claridad y navegación, sin garantizar ese formato. [Google: enlaces de sitio](https://developers.google.com/search/docs/appearance/sitelinks?hl=es).

Esta es una auditoría, no una implementación. No se modificó código público, no se hicieron envíos del formulario, no se publicó ni se solicitó indexación.

## Alcance y fuerza de la evidencia

| Comprobación | Resultado |
|---|---|
| HTML versionado | 40 archivos; se excluyen las carpetas locales no versionadas |
| Sitemap publicado | 38 URLs; todas HTTP 200, canonical propio y contenido igual al repositorio, normalizando CRLF |
| Robots | `robots.txt` publicado permite rastreo y declara el sitemap correcto |
| Bloqueos de páginas del sitemap | Sin `noindex` en HTML ni `X-Robots-Tag` restrictivo en las respuestas comprobadas |
| Títulos y descripciones | Sin duplicados exactos entre los 40 HTML |
| H1 | Uno por HTML versionado |
| Enlaces HTML internos y fragmentos | Sin destinos HTML ausentes ni IDs de destino rotos en el barrido estático |
| Profundidad | Las 38 páginas del sitemap se alcanzan desde la home con un máximo de dos enlaces HTML |
| Datos estructurados | 109 bloques JSON-LD parsean; esto no certifica semántica ni resultados enriquecidos |
| Hreflang | Destinos locales existentes y retornos recíprocos en los conjuntos declarados |
| Recursos estáticos | 129 URLs únicas detectadas en HTML/CSS; todas versionadas y HTTP 200 mediante HEAD |
| Errores reales | URL inexistente de control devuelve 404; `/sectores/` devuelve 410 |

Las 129 referencias abarcan `src`, `srcset`, estilos, iconos, preloads y fondos CSS. No constituyen un inventario HTTP completo de imágenes generadas por JavaScript, destinos `data-full`, APIs externas o archivos remotos sin referencias. El grafo cuenta páginas distintas que enlazan, no la cantidad repetida de enlaces en cada página. Los conteos de texto son aproximados y no son objetivos de SEO.

**Indexabilidad no equivale a indexación efectiva.** No hay navegador conectado ni conector de Search Console disponible. Por ello no se pudo leer el estado actual de cada URL, canonical elegido por Google, último rastreo, acciones manuales o estadísticas actuales de rastreo. La búsqueda pública es orientativa; tampoco reproduce necesariamente una SERP de Google localizada en Cancún. No se hizo revisión visual de escritorio/móvil ni una medición nueva de Lighthouse o Core Web Vitals.

La herramienta de inspección de URL es la que permite comprobar la versión indexada y el canonical que Google eligió; una prueba del sitio en vivo no predice esa selección. [Google: inspección de URL](https://support.google.com/webmasters/answer/9012289?hl=es).

## 1. Indexación: qué sabemos realmente

Hay dos exportaciones de rendimiento:

- `search_info/`: 30 de mayo a 29 de agosto de 2026, 92 días.
- `seo_performance/`: 25 de marzo a 24 de junio de 2026, 92 días.

Son exportaciones de **rendimiento**, no informes actuales de indexación. Los periodos se solapan: no deben sumarse ni compararse como trimestres consecutivos.

El histórico reciente demuestra apariciones en búsquedas durante ese periodo, por ejemplo:

| Página | Clics | Impresiones | CTR | Posición media histórica |
|---|---:|---:|---:|---:|
| Home | 57 | 2,260 | 2.52% | 6.02 |
| Alucobond instalado | 24 | 402 | 5.97% | 4.86 |
| Express | 21 | 1,102 | 1.91% | 10.57 |
| Rotulación vehicular | 21 | 779 | 2.70% | 6.70 |
| Playa del Carmen | 20 | 887 | 2.25% | 6.67 |
| Lonas | 16 | 1,306 | 1.23% | 7.40 |
| Gran formato | 11 | 563 | 1.95% | 9.71 |
| Anuncios luminosos | 4 | 376 | 1.06% | 8.69 |

También hay impresiones para las páginas inglesas, incluidas `/express/en/` y `control-solar-en.html`. No se debe repetir como vigente el diagnóstico de julio que las daba por descubiertas sin indexar. Tampoco estos datos permiten afirmar su estado exacto del 10 de septiembre.

`placas-alucobond.html` se publicó el 9 de septiembre: queda fuera del periodo de los CSV. La búsqueda pública de su URL no aportó evidencia suficiente para confirmar su indexación. Su ausencia en esa consulta no prueba que Google la haya excluido. Los resultados del operador `site:` no son un inventario exhaustivo. [Google: operador site](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site).

## 2. Identidad de marca y versión antigua en Framer

**Confirmado por GET:** `https://rtmx.framer.website/` devuelve 200, muestra “Rotulate Publicidad & Diseño / Imprenta en Cancún”, declara canonical hacia sí misma y no contiene `noindex`. Su `robots.txt` permite rastreo y anuncia un sitemap del dominio Framer. La cabecera de modificación recibida corresponde al 6 de agosto de 2025. También apareció en la búsqueda pública de marca.

Es una versión antigua activa e indexable, no simplemente una captura histórica del buscador. Puede competir por la identidad de marca y llevar visitantes a información anterior; no se ha medido cuántos clics desvía ni demostrado una penalización o que impida los sitelinks.

**Acción:** retirar la publicación antigua desde Framer si ya no tiene uso. Si fuera posible y se quisiera conservar las señales de una migración, evaluar una redirección permanente desde la versión antigua a la equivalente actual. No se ha verificado que el plan de Framer de Omar permita esa configuración. El `.htaccess` de Hostinger no controla `rtmx.framer.website`.

Omar preguntó cómo eliminarla. La documentación actual de Framer indica: Dashboard → mover proyecto a Archive → abrir Archive → Delete → confirmar. El borrado permanente elimina el proyecto y despublica el sitio. **No se ejecutó ninguna eliminación.** [Framer: eliminar un proyecto](https://www.framer.com/help/articles/deleting-a-project-in-framer/).

La búsqueda también devuelve otros negocios con “Rotulate” en sus nombres. No se infiere que sean propiedad de Omar. En la home actual, `LocalBusiness.sameAs` solo incluye WhatsApp, mientras que Facebook e Instagram ya están enlazados en el pie. Incorporar los perfiles oficiales comprobados y un identificador estable de empresa ayudaría a mantener las referencias consistentes. Es una mejora de identidad, no un interruptor de sitelinks. [Google: datos de organización](https://developers.google.com/search/docs/appearance/structured-data/organization?hl=es).

## 3. Canonical y redirecciones

Las URLs principales del sitemap tienen canonical HTTPS, sin www y coherente con el destino. Las variantes probadas necesitan distinguirse:

| URL solicitada | Observación |
|---|---|
| `https://www.rotulatepublicidad.com/` | 301 a la home HTTPS sin www |
| `http://www.rotulatepublicidad.com/` | 301 a la home HTTPS sin www |
| `http://rotulatepublicidad.com/` | Primer barrido: 200. Repetición independiente con `Cache-Control: no-cache`: 301 correcto |
| `https://rotulatepublicidad.com/index.html` | Primer barrido: 200. Repetición independiente: 301 correcto |
| `/index.html?utm_source=audit` y `/index.html?audit=20260910` | 200; canonical hacia `/` |
| `/express/en/index.html?audit=20260910` | 200; su regla de URL limpia tampoco captura parámetros |
| `/lonas-cancun` y `/lonas-cancun/index.html` | 301 a `/lonas-cancun/` |
| `/express` y `/express/en/index.html` sin parámetros | 301 a sus rutas con barra |
| `/blog.html` | 301 a `/blog/` |
| `/home-b2/` | 301 a `/` |
| `/sectores/` | 410 intencional |
| URL de control inexistente | 404 real |

**Hallazgo reproducible de código:** las condiciones sobre `THE_REQUEST` de `.htaccess` exigen un espacio justo después de `index.html`. Una URL con `?` queda fuera. Corregir la condición para reconocer tanto el espacio como el inicio de parámetros, conservar el query string y evitar bucles sobre el índice resuelto internamente.

**Hallazgo intermitente:** HTTP home e índice raíz cambiaron de 200 a 301 entre pruebas. Hay cabeceras de Hostinger/hcdn y diferentes estados de caché, pero eso no identifica por sí solo la causa. Antes de alterar “Force HTTPS”, comprobar CDN y origen con nuevas peticiones después de cualquier corrección. No afirmar que HTTPS esté permanentemente roto.

El canonical correcto ya orienta la consolidación. Una redirección coherente refuerza esa señal y evita mantener accesibles variantes innecesarias; no es evidencia de que Google haya indexado ambas versiones. [Google: consolidar URLs duplicadas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## 4. Sitemap: cobertura buena, fechas desactualizadas

Las 38 entradas cubren las páginas comerciales, locales y editoriales. Fuera quedan `404.html`, correctamente con `noindex`, y `privacidad.html`, indexable y enlazada ampliamente. La omisión de privacidad no bloquea su descubrimiento ni es un problema comercial prioritario. Pedir `/404.html` directamente devuelve 200 con `noindex`; la URL inexistente sí devuelve el 404 correcto, por lo que no se detectó un soft 404 general.

Las fechas `lastmod` de la home y `alucobond.html` siguen en 1 de septiembre pese a modificaciones sustanciales del 9. Lonas sigue en 4 de septiembre, anterior a las correcciones del 7. Actualizar por cambios reales de contenido/funcionalidad; no refrescar todas las fechas por cada deploy o cache-bust. Google usa `lastmod` cuando es verificablemente preciso; `priority` y `changefreq` no sirven para seleccionar sitelinks. [Google: sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## 5. Arquitectura y enlaces: accesible, pero poco orientada a elegir servicio

El sitio no tiene un problema de páginas comerciales enterradas a muchos clics. La home enlaza los servicios y las páginas del sitemap tienen profundidad 1 o 2. Los enlaces son HTML estándar, no dependen de pulsar un botón JavaScript para descubrir su URL.

La navegación global, sin embargo, destaca “Servicios”, “Galería”, “Sobre Nosotros”, “Blog” y secciones informativas. “Servicios” baja a `#servicios`; no permite elegir directamente Lonas, Vehicular, Anuncios o Alucobond en el menú. Desde muchas páginas de servicio, “Servicios” devuelve a la home. Esta estructura puede funcionar, pero hace más largo el recorrido entre ofertas y da menos presencia constante a las páginas comerciales.

**Propuesta:** conservar las URLs actuales y añadir destinos directos bien agrupados al menú o a una navegación comercial compartida. Una estructura razonable es Servicios → Lonas / Gran formato / Vehicular / Anuncios y letras / Fachadas / Control solar; destacar Express y Placas donde corresponda. Mantener un CTA único y claro de cotización. No meter todas las URLs en una lista plana ni crear páginas vacías de “Contacto”, “Nosotros” o “Productos” para imitar a Hiplot.

Distribución de enlaces entrantes desde páginas distintas:

| Destino | Páginas que enlazan | Lectura |
|---|---:|---|
| Lonas | 16 | Bien conectado en el contexto comercial/editorial |
| Vehicular | 8 | Base aprovechable para casos y artículos |
| Anuncios | 8 | Base aprovechable |
| Gran formato | 7 | Bien accesible; aclarar intención |
| Alucobond instalado | 4 | Añadir conexiones pertinentes, por ejemplo desde letras/fachadas |
| Placas de Alucobond | 2 | Solo home y Alucobond; página nueva |
| Express EN | 1 | Solo Express ES; sin entrada desde home EN ni gran formato EN |
| Artículo control solar vs polarizado | 1 | Solo índice del blog |
| Artículo letreros para negocios | 1 | Solo índice del blog |

No hay páginas del sitemap huérfanas. “Pocos enlaces” no implica exclusión de Google; señala oportunidades concretas. Añadir enlaces desde `control-solar.html` al artículo comparativo y desde anuncios/letras al artículo de letreros. Enlazar Express EN desde `/en/` y `gran-formato-en.html` con contexto de urgencia.

## 6. Navegación móvil y accesibilidad: hallazgos de código

**Selector global que alcanza las migas de pan.** `style.css:2215` aplica a todo `nav` dentro de `max-width:968px`: posición fija, alto de viewport, `opacity:0` y `visibility:hidden`. Muchas páginas también usan `<nav class="breadcrumbs">`. Las reglas `.breadcrumbs` no revierten esas propiedades. Por cascada, las migas de pan quedan sometidas al comportamiento del menú móvil, aunque no reciben su clase `open`. Restringir esas reglas a `#main-nav` y revisar desktop/móvil. Hallazgo de código; falta comprobar visualmente la corrección en navegador. Lonas utiliza su propio CSS y debe evaluarse por separado.

**Express ES/EN:** su navegación tiene `hidden md:flex` y no hay menú alternativo móvil. El selector EN/ES está dentro de esa navegación, por lo que desaparece en el breakpoint móvil. Sigue habiendo contacto por WhatsApp y desplazamiento por la página, pero falta una ruta de cambio de idioma visible en esa plantilla.

**Contenido con `.reveal`:** CSS establece opacidad cero y JS la restituye al entrar en pantalla. Si falla JS, ese contenido puede quedar invisible salvo la excepción de movimiento reducido. Usar animación como mejora progresiva y mantener contenido visible por defecto. No se afirma que Google sea incapaz de ejecutar JavaScript ni que este mecanismo esté causando desindexación.

**Menú principal:** tiene `aria-expanded` y cierre por Escape; faltan gestión completa del foco y restauración del foco. “Más” abre mediante hover/focus-within, pero no expone estado expandido dinámico. Ese trabajo había sido pospuesto por Omar: queda como propuesta, no como decisión de implementación.

**Recorrido de cotización:** un CTA desde un servicio manda a `/#contacto` sin conservar la selección del servicio. El formulario exige email aunque existe teléfono opcional. Mejorar contexto de llegada, errores por campo y canal de contacto según proceso comercial. No se probó un envío ni se auditó Supabase en esta sesión.

## 7. Contenido y coherencia semántica

**Seis servicios EN muy resumidos.** Alucobond, anuncios luminosos, gran formato, letras 3D, neón y toldos tienen entre unas 114 y 151 palabras en su contenido principal extraído. Esto no viola un mínimo de palabras —no se propone ninguno—, pero faltan respuestas útiles: ejemplos, materiales, condiciones y pruebas de trabajo. Alucobond ES ya tiene 20 proyectos y 44 fotos; EN no incorpora esa evidencia ni el precio de instalación actualizado. Reutilizar lo confirmado adaptándolo al idioma.

**FAQ solo en JSON-LD.** Esas seis páginas EN incluyen 25 preguntas en `FAQPage` sin una sección visible equivalente. Confirmado por inspección del HTML, no solo por búsqueda literal. El barrido detectó otras diferencias textuales en blogs y páginas locales, pero muchas son reformulaciones; no se contabilizan automáticamente como infracciones. Retirar markup que no representa la página o publicar respuestas realmente útiles cuando formen parte del alcance. [Google: coherencia de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

**Actualización respecto al plan del 7 de septiembre:** Google retiró los resultados enriquecidos de FAQ desde el 7 de mayo de 2026 y eliminó su documentación en junio. No conviene invertir en FAQPage con el objetivo de ampliar el resultado de búsqueda. Las preguntas visibles siguen siendo útiles para clientes. [Google: registro de cambios](https://developers.google.com/search/updates#may-2026).

**Placas:** el precio de $1,850 coincide con la oferta visible. `Product.brand` declara Rotulate, mientras que el handoff identifica el producto del proveedor como Tach-Panel. Revisar marca real frente a vendedor; no asumir marca propia. Falta `Product.image` aunque ya hay fotografías. Incorporar imagen relevante y considerar variantes/agotados según el producto que se describa. El `InStock` genérico no demuestra un error si representa la oferta disponible; no afirmar que los colores agotados estén publicados individualmente como disponibles. No se ejecutó Rich Results Test ni se certifica elegibilidad para Merchant listings.

**Intenciones que se solapan:** gran formato comienza por “Lonas y Banners…” y vuelve a promover urgencia; Lonas tiene cotizador y Express resuelve urgencia. Diferenciar mejor las entradas y CTAs: Lonas = precio/medidas/material; Express = disponibilidad/plazo/archivo; Gran formato = soluciones y aplicaciones de impresión. No eliminar ni fusionar URLs sin datos consulta × página × fecha: no está demostrada canibalización.

**Prueba visual:** la galería aleatoria de home selecciona 12 imágenes y asigna a todas el mismo alt, “Trabajo Rotulate Publicidad Cancún”, sin contexto de servicio. Ofrecer una selección inicial de casos reconocibles y enlaces al servicio ayudaría a clientes. Se conserva la galería de Alucobond ya implementada. La inclusión autorizada de Mérida/Calkiní en home no convierte esas ubicaciones en Cancún/Riviera Maya: conviene que el texto de cobertura de la galería describa honestamente su selección.

**Páginas locales:** Playa explica que produce en Cancún y coordina instalación local; no inventa una sucursal. Añadir casos/logística reales cuando existan, no duplicar páginas cambiando solo la ciudad. Preservar la diferencia entre venta de placas y fachada instalada, y la condición de aliados en obra/mantenimiento.

## 8. Rendimiento: alcance limitado

Todas las referencias estáticas comprobadas responden 200. Quedan seis imágenes sin `width`/`height` en Express ES/EN. Eso permite proponer reserva de espacio, pero no afirmar un CLS medido. Hay fondos e imágenes de varios cientos de KB; el HTML usa variantes WebP y algunas imágenes son fallbacks, por lo que sumar todos los archivos no representa la descarga de un navegador real.

No se produjo una puntuación Lighthouse ni un valor actual de LCP/INP/CLS. La respuesta rápida de curl tampoco equivale a velocidad de carga visual. Mantener los pendientes visuales del hero y no reabrir una migración de framework o `main-lite.js` sin mediciones nuevas.

## 9. Orden recomendado y criterios de cierre

| Prioridad | Trabajo | Criterio de cierre |
|---|---|---|
| Alta | Retirar versión Framer obsoleta | URL antigua deja de servir el sitio; verificar respuesta y luego seguimiento de buscadores |
| Alta | Inspección actual en GSC | Registrar estado y canonical elegido de las URLs prioritarias, sin confundir datos históricos con actuales |
| Alta | Normalizar `index.html` con parámetros; revisar respuestas intermitentes | HTTP, www e índices redirigen de forma consistente, conservando parámetros y sin bucles |
| Alta | Acotar CSS de menú móvil; acceso a idioma en Express | Migas visibles y navegación operable a 360/390/768 px, teclado y retorno de foco |
| Media | Enlaces a servicios y Express EN | Selección de servicio directa; enlaces contextuales desde páginas relacionadas |
| Media | Ajustar lastmod y datos de identidad/producto | Fecha de cambios significativos correcta y schema fiel a oferta/marca/contenido |
| Media | Completar servicios EN y corregir FAQ ocultas | Contenido visible útil y marcado representativo; sin rellenar por conteo de palabras |
| Media | Casos y diferenciación Lonas/Express/Gran formato | Cada página resuelve una intención concreta con evidencia y CTA pertinente |
| Posterior | Robustez sin JS, formulario y rendimiento visual | Pruebas reales de navegación, errores, envío autorizado y métricas de laboratorio/campo |

En Search Console, revisar primero `/`, `/lonas-cancun/`, `/express/`, `/rotulacion-vehicular.html`, `/anuncios-luminosos.html`, `/alucobond.html`, `/placas-alucobond.html`, `/en/` y `/express/en/`. Para cada URL: indexada/no indexada, motivo, último rastreo, canonical declarado/elegido y sitemap de descubrimiento. Revisar después Page indexing, Sitemaps, acciones manuales y seguridad. No solicitar indexación repetidamente de todas las páginas ni usar una cifra antigua de cobertura como diagnóstico actual.

El resultado esperable del trabajo es una web más clara y coherente; no un compromiso de sitelinks, posición o incremento porcentual de ventas.

## Evidencia reproducible local

Archivos de trabajo conservados en `scratch/seo-audit-2026-09-10/` (no versionados): `local.json`, `http.json`, `assets.json`, `details.json`, `semantic.json`, `requests.json`, cuerpos y cabeceras de las respuestas iniciales, cabeceras de 129 recursos, y respuestas de repetición de redirecciones. Scripts de auditoría `scratch/seo-audit-2026-09-10.cjs`, `scratch/seo-audit-details-2026-09-10.cjs` y `scratch/seo-audit-semantic-2026-09-10.cjs`.

El análisis automatizado extrae HTML mediante patrones adecuados al repositorio y se complementó con lecturas manuales; no sustituye un parser DOM/renderizado para accesibilidad o fidelidad visual. Los archivos locales de evidencia no se deben publicar por rsync ni incorporar accidentalmente al commit.
