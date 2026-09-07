# Auditoría y plan de mejoras SEO, UX y UI

Fecha: 7 de septiembre de 2026. Proyecto: Rotulate Publicidad.

## Estado y alcance

Documento de referencia de la revisión solicitada por Omar. **Plan propuesto, pendiente de implementación y de decisiones comerciales donde se indican.** Omar pidió documentarlo antes de empezar. Esta documentación no supone aprobación de todos los cambios, ni autoriza un deploy.

La bitácora y el estado activo se mantienen exclusivamente en `agents.md`; este documento conserva el detalle de la auditoría y los criterios del plan, sin convertirse en una segunda bitácora.

Se revisaron los 39 HTML versionados, enlaces y anclas, canonical y hreflang, JSON-LD, CSS, JavaScript, formulario, cotizador, analítica, `.htaccess`, workflow de despliegue y CSV de `search_info/`. Se comprobaron por HTTP las 37 URLs del sitemap y recursos específicos en producción. También se consultó documentación actual de Google.

Limitaciones:

- Search Console disponible: 30 de mayo–29 de agosto de 2026. No permite evaluar los cambios de septiembre.
- No hubo navegador conectado disponible. Las propuestas visuales se basan en HTML/CSS; falta revisión en pantallas y dispositivos reales.
- No se ejecutaron envíos de formularios, escrituras en Supabase ni mediciones nuevas de Lighthouse/Core Web Vitals.
- No se inspeccionó la configuración interna del contenedor GTM ni datos actuales de GA4 o Google Business Profile.
- Las verificaciones estáticas no equivalen a una prueba completa del sitio renderizado, elegibilidad de rich results o indexación efectiva.

## Diagnóstico y base que se debe conservar

Priorizar conversión del tráfico existente, calidad de las páginas comerciales y medición fiable antes de ampliar contenido o rediseñar extensamente.

Comprobaciones positivas:

- Las 37 URLs del sitemap responden HTTP 200 y su canonical coincide con la URL solicitada.
- Los 107 bloques JSON-LD parsean correctamente. Esto valida sintaxis, no exactitud comercial ni elegibilidad.
- Sin títulos ni metadescripciones idénticos entre páginas en el barrido estático.
- Sin anclas internas rotas ni incidencias detectadas de reciprocidad en los hreflang revisados.
- Los elementos `img` estáticos tienen atributo `alt`; su calidad descriptiva requiere revisión aparte.
- Ya existen fuentes locales, imágenes optimizadas, cotizador, contenido informacional, páginas locales y versiones en inglés.
- El portafolio nombrado ya muestra Alumik, Silanes, enviaflores.com y Fishing Joe’s. Los pendientes históricos de «crear portafolio desde cero» están superados; falta desarrollar casos y distribuirlos entre servicios.

## Hallazgos comprobados y acciones prioritarias

| ID | Hallazgo y evidencia | Acción propuesta | Verificación de cierre |
|---|---|---|---|
| P0-01 | `lonas-cancun/index.html:580` carga `analytics.js?v=1.0` como ruta relativa. `/lonas-cancun/analytics.js?v=1.0` devuelve 404; `/analytics.js?v=1.0` devuelve 200. | Corregir ruta y comprobar eventos y consentimiento. GTM ya se incluye por separado. | Recurso JavaScript 200 y comportamiento de eventos/banner comprobado. |
| P0-02 | `express/index.html` y `express/en/index.html` no incluyen GTM ni `analytics.js`. | Integrar la instrumentación común y adaptar el banner al CSS propio de Express. | Medición de ambas páginas y CTA; estados de consentimiento verificados. |
| P0-03 | `upload.js:300` dispara `cotizacion_supabase_ok` y `cotizacion_firebase_ok` por un mismo envío. | Auditar activadores GTM y adoptar un único evento principal. No se ha demostrado doble conteo en GA4. | Un envío produce una conversión principal. |
| P0-04 | `lonas-cancun/index.html` referencia `assets/galeria/new1.jpg`, `new2.jpg`, `new3.jpg`, ausentes del repositorio. Siguen respondiendo 200 en Hostinger. | Recuperar y versionar o sustituir por fotos verificadas del material correcto. No limpiar remotos sin resolver estas dependencias. | Todos los recursos existen en un checkout limpio y en producción. |
| P0-05 | `alucobond.html:63` declara $1,450–$2,200 en JSON-LD, sin mostrar esos precios en el contenido visible. | Confirmar vigencia, unidad, inclusiones y alcance; publicarlos o retirar la oferta estructurada. | Correspondencia entre oferta visible y schema; revisión semántica además del parseo. |
| P0-06 | La metadescripción de lonas dice «Sin mínimos»; `lonas-cancun/main.js:139` cobra mínimo 1 m² por pieza. | Aclarar «sin mínimo de piezas», si esa es la política, y mostrar mínimo facturable junto al precio. | Meta, contenido, cálculo y WhatsApp expresan la misma política. |

### Medición: riesgos y huecos adicionales

- GTM carga asíncronamente en el encabezado y el consentimiento predeterminado se declara después, en `analytics.js` diferido. Hay una carrera potencial; revisar el contenedor antes de atribuir efectos reales. Asegurar orden determinista.
- `analytics.js:111` usa `IntersectionObserver` con umbral 0.4 sobre secciones completas. Una sección de altura superior a 2.5 veces el viewport puede no alcanzar ese porcentaje visible. Medir puntos de entrada o elementos representativos.
- `TRACKED_SECTIONS` no incluye clientes ni obra. Los IDs de distintas plantillas/idiomas también necesitan una cobertura coherente.
- Diferenciar clic en WhatsApp, lead con contacto, cotización atendida y venta. Una fila anónima del cotizador en Supabase no equivale a oportunidad contactable.
- Medir errores de formulario y servicio/página de origen sin enviar datos personales a analítica.

## Priorización SEO basada en Search Console

Fuente: `search_info/Páginas.csv`; periodo hasta el 29 de agosto de 2026.

| Página | Impresiones | Clics | CTR | Posición media | Prioridad de trabajo |
|---|---:|---:|---:|---:|---|
| `/lonas-cancun/` | 1,306 | 16 | 1.23% | 7.40 | Oferta, cotizador, medición |
| `/express/` | 1,102 | 21 | 1.91% | 10.57 | Urgencia, condiciones y capacidad |
| `/rotulacion-vehicular.html` | 779 | 21 | 2.70% | 6.70 | Casos y coberturas |
| `/gran-formato.html` | 563 | 11 | 1.95% | 9.71 | Intención diferenciada |
| `/alucobond.html` | 402 | 24 | 5.97% | 4.86 | Preservar rendimiento y convertir |
| `/anuncios-luminosos.html` | 376 | 4 | 1.06% | 8.69 | Evidencia y comparación |
| `/neon-flex.html` | 354 | 4 | 1.13% | 8.46 | Ejemplos, acabados y condiciones |
| `/toldos.html` | 336 | 5 | 1.49% | 8.74 | Proyectos y materiales |

Orden inicial propuesto: lonas/Express, vehicular, Alucobond y anuncios luminosos. Ajustar según margen, valor del pedido, capacidad operativa y tasa de cierre; esos datos comerciales no se analizaron.

Móvil: 5,592 impresiones, 110 clics, CTR 1.97%. Escritorio: 4,242 impresiones, 117 clics, CTR 2.76%. El menor CTR móvil ocurre antes de entrar al sitio y no demuestra un problema de interfaz: controlar diferencias de consultas, posición y composición de resultados.

No reescribir todos los títulos de inmediato: se modificaron el 1 de septiembre y falta información posterior para evaluar su efecto.

### Arquitectura de intenciones

| URL | Intención principal propuesta | Información distintiva |
|---|---|---|
| `/lonas-cancun/` | Calcular y comprar lona | Medidas, material, acabados y precio |
| `/express/` | Resolver pedido urgente | Disponibilidad, hora límite, archivo aprobado y entrega |
| `/gran-formato.html` | Elegir solución de impresión | Viniles, banners, aplicaciones y materiales |

Mantener URLs y reforzar enlaces contextuales entre ellas. Existe solapamiento temático, pero **no se ha demostrado canibalización**; requiere consulta × página × fecha en GSC. El H1 de gran formato vuelve a comenzar por lonas/banners y es candidato a clarificación.

En Express, acercar las condiciones del plazo al CTA: cuándo empieza, qué archivo se necesita y qué depende de disponibilidad. No inventar horas límite o compromisos operativos.

## Páginas comerciales y contenido propio

Varias páginas repiten hero, beneficios, FAQ y CTA. En anuncios luminosos y Alucobond, los únicos `img` del HTML son logos; la fotografía de servicio está como fondo. Incorporar prueba visual específica.

Plantilla propuesta:

1. Servicio y ubicación claramente identificados.
2. Tres a seis fotografías relevantes con explicación.
3. Comparación de materiales, coberturas o soluciones.
4. Qué incluye y qué requiere evaluación.
5. Precio orientativo solo con base comercial confirmada.
6. Plazo y condiciones reales.
7. Caso propio y reseña pertinente.
8. CTA que conserve el servicio seleccionado.

Desarrollar Alumik para anuncios, Silanes para neón/eventos, enviaflores.com para vehicular y Fishing Joe’s para embarcaciones. Documentar problema, solución, material y ubicación solo con datos comprobados.

Enlazado: los artículos `blog/control-solar-vs-polarizado-hoteles-airbnb.html` y `blog/letreros-para-negocios-cancun-riviera-maya.html` reciben enlaces desde una sola página cada uno en el barrido estático. Conectarlos desde servicios relevantes.

Después, mantener cadencia moderada de contenido basado en preguntas reales: elección de materiales, cobertura, mantenimiento y preparación de pedidos. No expandir PPF ni obra más allá del modelo comercial acordado.

## UX: formulario y contexto de cotización

Las páginas de servicio suelen enviar a `/#contacto`, donde el usuario vuelve a elegir servicio. Preseleccionar el origen y adaptar encabezado, ayuda y WhatsApp; por ejemplo, pedir foto del frente y medidas aproximadas para Alucobond.

Mejoras propuestas:

- Evaluar correo **o** WhatsApp como canal de contacto válido, en lugar de exigir correo siempre. Confirmar compatibilidad con seguimiento comercial.
- Añadir errores escritos por campo: algunas validaciones actuales solo sacuden/cambian borde.
- Hacer accesible por teclado la selección de adjuntos; zona basada en clic e input oculto.
- Mostrar preparación, envío, éxito y error con estados comprensibles.
- Permitir reintento y alternativa de contacto ante fallos de dependencias.
- Mostrar recepción tras guardar el lead, desacoplando la notificación por correo.

Hallazgo de código: `main.js:28` carga Supabase, configuración, EmailJS y `upload.js` secuencialmente. Si falla la descarga de EmailJS, no se carga el controlador del formulario. Corregir esa dependencia y verificar red lenta, dependencia fallida, datos inválidos, envío correcto y duplicados. No se reprodujo un envío fallido real durante esta auditoría.

## UX: cotizador

`lonas-cancun/main.js:130` convierte campos vacíos o inválidos a mínimos mediante `Math.max` y valores de respaldo. Sustituir por validación explícita; impedir enviar una cotización con medidas inválidas.

- Selector cm/m con conversión visible.
- Tamaños de ejemplo que rellenen campos.
- Etiquetas breves de material y explicación separada.
- Mínimo facturable junto al importe.
- IVA, entrega e instalación claros según política confirmada.
- Resumen junto a WhatsApp y contacto opcional.
- Conservar cobro de diseño una vez y ojillos incluidos existentes.

Los selectores personalizados ya tienen manejo de teclado y estados ARIA; probarlos antes de proponer reconstrucción. Revisar también comportamiento de Enter y el manejador inline `onsubmit` frente a la CSP durante pruebas de navegador; no se verificó en esta revisión.

## UI: jerarquía, marca y accesibilidad

Conservar Space Grotesk, fondo oscuro, lima y Robbie. Probar mayor claridad en el H1: «Rótulos, impresión y anuncios para tu negocio en Cancún», manteniendo el eslogan actual como frase de marca. Es una hipótesis de contenido/UI, no garantía de ranking.

Orden propuesto de home: propuesta y CTA → servicios → trabajos/clientes → proceso → reseñas → FAQ → contacto. Compactar la presentación de obra, que actualmente aparece antes del portafolio y amplía la oferta a procesar. Mantener su naturaleza de coordinación con aliados.

Galería: el JS selecciona 12 imágenes aleatorias con alt genérico. Proponer selección inicial estable, categorías, descripciones y enlaces a servicios. Cambiar «Carga fotos nuevas aquí mismo» por «Ver otros trabajos», acorde a la acción real.

Revisión visual pendiente a 360/390/768/1024/1440 px y en teléfono real cuando esté disponible:

- Tarjetas móviles: descripciones a `0.78rem`, recortadas a dos líneas.
- Campos del formulario: base propuesta de 16 px.
- Contraste sobre fotos y superficies translúcidas.
- Coherencia de botones, navegación y espaciados entre home, servicios, lonas y Express.
- Banner de consentimiento y WhatsApp: posible superposición por CSS; no demostrada visualmente.
- Menú y lightbox: foco al abrir, navegación, Escape y devolución al cerrar.

El dropdown «Más» sigue sin estado expandido dinámico y cierre completo. Omar había pospuesto ese trabajo: se conserva como propuesta, no como decisión aprobada. El lightbox tiene Escape/flechas, pero falta gestión completa del foco en el código revisado.

`.reveal` oculta contenido por defecto; si JS falla puede quedar invisible. Implementar visibilidad inicial y animación como mejora progresiva.

## Rendimiento y prevención de regresiones

- Nueve imágenes estáticas carecen de dimensiones: tres en cada Express y tres en lonas. Completar ancho/alto o reserva de espacio adecuada; no se midió CLS atribuible a ellas.
- Revisar variantes de imagen por dispositivo.
- Medir home con Robbie: las mediciones históricas preceden al reemplazo.
- No priorizar `main-lite.js`: ya fue descartado con evidencia histórica de TBT bajo.
- `analytics.js` devuelve `application/x-javascript` y `max-age=604800` en la comprobación actual; `.htaccess` configura un año para `application/javascript`. Verificar MIME/caché efectivos antes de atribuir cumplimiento al archivo de configuración.
- Versionar dependencias locales cargadas dinámicamente cuando cambien; `upload.js` y `supabase-config.js` siguen cargándose sin versión.
- Incorporar comprobaciones de assets, anclas, JSON-LD, canonical, sitemap y rutas de scripts antes del deploy, más verificaciones HTTP posteriores.
- No activar borrado remoto general para limpiar hosting: hay dependencias activas de archivos ausentes en git.
- A medio plazo, evaluar componentes/plantillas compartidos que sigan generando HTML estático para reducir divergencias, sin migración de framework como requisito.

Objetivos de referencia: LCP ≤2.5 s, INP ≤200 ms y CLS ≤0.1 en percentil 75 cuando exista muestra suficiente. No son resultados actuales del sitio. Medir varias corridas de laboratorio bajo condiciones consistentes y distinguirlas de datos reales.

## SEO local y expectativas sobre schema/IA

Revisar perfil de Google Business: datos, servicios, horarios, fotos, reseñas y enlace medible. No se verificó el perfil actual. La posición media 9.85 de «rotulate» no permite atribuir causalidad al acento del nombre. Investigar consulta, país, dispositivo, competencia e identidad comercial.

Mantener campaña de reseñas con clientes reales. Desarrollar páginas de Playa/Tulum con evidencia y logística locales; no inventar sucursales o proyectos.

FAQ visible sigue siendo útil, pero `FAQPage` no ofrece una vía general de rich results para este negocio. `llms.txt` no aporta visibilidad en Google según su guía actual. Priorizar experiencia propia, contenido accesible y datos consistentes.

## Secuencia, esfuerzo y criterios

Estimaciones orientativas; excluyen espera de fotografías, decisiones comerciales y acumulación de tráfico. Las etapas pueden solaparse según dependencias.

| Etapa | Trabajo | Esfuerzo estimado | Cierre |
|---|---|---:|---|
| Semana 1 | Medición, consentimiento, precios/schema, mínimos y assets faltantes | 2–4 días | Recursos correctos y eventos comprobados sin duplicación |
| Semana 2 | Formulario fiable, servicio preseleccionado, validación del cotizador | 3–5 días | Flujos completos y errores recuperables |
| Semanas 3–4 | Home y plantilla piloto lonas/Express | 5–8 días | Revisión móvil real, teclado y claridad comercial |
| Semanas 4–6 | Vehicular, Alucobond y anuncios con casos | 4–7 días | Evidencia propia, condiciones y CTA contextual |
| Semanas 6–8 | Enlazado, perfil local y contenido de apoyo | Continuo | Consultas relevantes y leads atribuibles |
| Desde primera etapa | Verificación automatizada de despliegues | 1–2 días iniciales | Recursos ausentes/regresiones detectados antes de publicar |

Medición de resultados:

- Distinguir clic WhatsApp, contacto válido, cotización atendida y venta.
- Comparar SEO en periodos de 28 días por página, dispositivo y consultas similares.
- Registrar fechas de cambios y no interpretar el histórico previo como resultado posterior.
- Con 228 clics en tres meses, preferir cambios secuenciales y correcciones comprobables a repartir tráfico entre numerosas variantes A/B.
- Evitar promesas de aumento porcentual de ventas o ranking sin una línea base fiable.

Antes de publicar compromisos comerciales, confirmar precios/unidades de Alucobond, IVA, envío/instalación, condiciones de 24 horas, datos de casos y canal de seguimiento. La primera implementación recomendada es medición y fiabilidad de cotización; después, páginas comerciales con casos reales.

## Fuentes externas consultadas

- [Google: directrices de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): correspondencia con contenido visible, actualidad y elegibilidad.
- [Google: cambios de resultados FAQ](https://developers.google.com/search/blog/2023/08/howto-faq-changes): restricciones de presentación de FAQ.
- [Google: optimización para búsqueda generativa](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): contenido propio, fundamentos SEO y alcance de `llms.txt`.
- [Google Business Profile: ranking local](https://support.google.com/business/answer/7091): relevancia, distancia y prominencia.
- [web.dev: Web Vitals](https://web.dev/articles/vitals): métricas y umbrales de referencia.
- [iGraphic: anuncios luminosos](https://igraphic.com.mx/diseno-de-letreros-cancun): ejemplo competitivo de información solicitada para cotizar; no constituye un análisis exhaustivo del mercado ni de posiciones locales.
