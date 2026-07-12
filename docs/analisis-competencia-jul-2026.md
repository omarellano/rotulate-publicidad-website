# Análisis de Competencia — Rotulate Publicidad
**Fecha:** 12 de julio de 2026
**Alcance:** Cancún + Riviera Maya · 4 líneas de servicio (rotulación vehicular/wraps, gran formato/lonas, PPF y control solar, anuncios luminosos/letras 3D)
**Método:** Búsquedas en Google por cluster de keywords + análisis directo de los sitios de los ~12 competidores que dominan los resultados, contrastado con datos reales de Google Search Console del sitio (carpeta `seo_performance/`).

> Documento de referencia interna. El plan de acción vigente y su avance se registran en `agents.md`. Este archivo captura la evidencia y el razonamiento para no repetir la investigación.

---

## 1. Punto de partida: datos propios (Search Console)

- Posición promedio en keywords principales: **6–10** (nadie nos está aplastando, pero otros están arriba):
  - "lonas cancun": pos. 9.6 · 185 impresiones · 1 clic
  - "anuncios luminosos cancun": pos. 8.6 · 50 impresiones · 0 clics
  - "rotulos cancun": pos. ~7 · 37 impresiones · 2 clics
  - "banner": pos. 5.8 · 84 impresiones · 0 clics
- Páginas con mejor CTR (señal de que **publicar precios funciona**):
  - `control-solar.html`: **7.69% CTR** (el mejor del sitio)
  - `alucobond.html`: 6.12%
  - `rotulacion-vehicular.html`: 4.97%
  - Promedio del resto: ~2–3%
- Consulta detectada: **"blog de rotulación y publicidad visual"** (7 impresiones, pos. 22) apuntando a un `blog.html` que estaba vacío y huérfano en producción (resuelto el 12-jul-2026 con 301 → `/`).

## 2. Mapa competitivo por línea de servicio

### 2.1 Anuncios luminosos / letras 3D — líder: **Suitprint** (suitprint.com)
El competidor más serio en general. Fortalezas verificadas:
- Páginas dedicadas **por ciudad**: Cancún, Playa del Carmen, Tulum, Mérida.
- Blog activo (3–5 artículos de SEO local: "10 tipos de anuncios luminosos en Playa del Carmen", "Tendencias 2026 en fachadas", identidad visual).
- "+10 años de experiencia" declarados; portafolio con 20+ proyectos **con nombre del negocio** (ZINGARA, PRANA, La Pasadita, La Troje).
- 3 testimonios con nombre, foto y cargo.
- Formulario de cotización tipo wizard de 4 pasos (Contacto → Proyecto → Visita → Resumen).

Debilidades: sitio visualmente saturado, sin versión en inglés, sin precios públicos.

Otros en la línea: **Ramen Neon** (anunciosluminososcancun.com — diseño nocturno atractivo, proceso transparente paso a paso, pero galería con fotos de Unsplash, sin casos reales), **Letras3D Cancún** (letras3dcancun.com — corporativo básico, blog sin contenido visible), **ALC** (anunciosluminososencancun.com, 9+ años), **Arte y Diseño Cancún**.

### 2.2 Lonas / gran formato — mercado fragmentado, 5 jugadores
- **Igraphic** (igraphic.com.mx): la mejor prueba social del sector — **"4.9 estrellas en Google"** y **"+300 empresas en Cancún"** visibles en el sitio, con botón "Leer Reseñas Reales". Selector de idiomas ES/EN **roto** (error PHP visible). Sin blog.
- **Cuarto Gráfico** (cuartografico.net): catálogo más amplio (13 servicios), ~20 logos de clientes reconocibles, ubicación física (Av. Chichén Itzá #124). Sin blog, sin testimonios, sin años declarados.
- **Publicidad Rayo** (publicidadrayo.com): **cotizador interactivo de precio** — único en la zona. Entrega 24h, diseño gratis. Contacto solo por WhatsApp.
- **CopyMaya** (copymaya.com.mx): débil en conversión (sin WhatsApp, sin formularios, sin precios). Tiene blog en menú.
- **Viral Uno** (viraluno.com): agencia 360 multi-ciudad (Cancún, Tulum, Playa, Chihuahua, Mérida, GDL), 15 años declarados. Contenido SEO estructurado pero sin especialización.

### 2.3 Rotulación vehicular — mercado débil, **ganable a corto plazo**
- **Total Vinil** (totalvinilcancun.com): rankea arriba con un sitio casi vacío — solo "Home", sin portafolio, sin testimonios, sin propuesta de valor, sin formularios.
- **Cuarto Gráfico** es el más completo de la línea.
- Resto (Copytarget, Estudio Gráfico, Rotulacam, Rotulados.mx): genéricos o de fuera de la zona.

### 2.4 PPF / control solar automotriz — vacío competitivo web local
- **Titan Auto** (titanauto.mx): el sitio **no resuelve DNS** (caído al 12-jul-2026, verificado con y sin www).
- **Technik Car Care** (technikcar.com): realmente opera en CDMX (Polanco), no en Cancún.
- Los 3 instaladores XPEL autorizados en Cancún (ver localizador xpel.com) no tienen presencia web propia fuerte.
- **Decisión de negocio (Omar, 12-jul-2026):** PPF es marginal/aspiracional — taller no adaptado. NO crear página de venta. Entrada de bajo riesgo: 1 artículo de blog para medir demanda → consultas atendidas vía subcontratista certificado XPEL → escalar solo si demanda y calidad se comprueban. Los instaladores XPEL de Cancún son los candidatos naturales para alianza.

## 3. Autoridad: quién está arriba y por qué

Tres factores concretos explican que Suitprint e Igraphic ranqueen mejor:
1. **Volumen y profundidad de contenido:** páginas por servicio × ciudad + blog (Suitprint). Nosotros: una página por tema, casi nada de Playa/Tulum.
2. **Prueba social externa:** Igraphic capitaliza sus reseñas de Google en el sitio; las reseñas del perfil de Google Business son el factor #1 del pack local de Maps.
3. **Antigüedad y menciones locales:** 10–15 años declarados acumulan enlaces. Se compensa con contenido experto, no hay atajo.

**Dato propio confirmado:** el perfil de Google Business de Rotulate tiene **4.7★ con 30 opiniones** — competitivo y creíble (mejor que un 5.0 con pocas reseñas). Desde el 12-jul-2026 se muestra en el hero y en #testimonios del index.

## 4. Ventajas propias que ningún competidor tiene

| Ventaja | Evidencia |
|---|---|
| Precios visibles ("Desde $230/m²") | Mejor CTR del sector (7.69% control solar, 6.12% alucobond). Solo Rayo tiene cotizador; nadie más publica precios. |
| Versión en inglés funcional (`/en/` + 7 landings) | Ningún competidor la tiene; Igraphic la tiene rota. Relevante por dueños de negocio extranjeros en la zona. |
| Datos estructurados (LocalBusiness, FAQPage, WebSite, BreadcrumbList) | No se observó schema equivalente en competidores; es lo que consumen los motores de IA. |
| Diseño moderno (dark glassmorphism, acento lima) | Todos los competidores usan blanco/azul corporativo genérico. |

## 5. Qué copiar de la competencia (y hacerlo mejor)

1. Reseñas de Google visibles ← Igraphic. **(HECHO 12-jul-2026: badge 4.7★ + sección testimonios ya existente).**
2. Páginas por ciudad (Playa del Carmen, Tulum) ← Suitprint. Con contenido único + precios, no clonado. (Fase 2)
3. Portafolio con clientes nombrados ← Suitprint/Cuarto Gráfico. Omar confirma que **todos los clientes dan permiso** (les pregunta tras cada trabajo). Fotos disponibles en `assets/nuevas_fotos/` (renombrar: tienen espacios). (Pendiente)
4. Testimonios con nombre ← ya existían 4 en el index.
5. Cotizador interactivo de lonas por m² ← Rayo. Con leads a Supabase. (Fase 3)
6. Sección "proceso transparente" ← Ramen Neon. Ya existe #proceso en el index.
7. Blog SEO local ← Suitprint, pero con enfoque GEO/AEO que ellos no tienen. (Fase 2)

## 6. Blog + búsqueda por IA (GEO/AEO): decisión = SÍ

Fundamentos (fuentes consultadas jul-2026: guías GEO 2026 de HubSpot, Backlinko, GroupFractal, ThirdMarble):
- ~**88% de los negocios locales no tienen estrategia** para aparecer en respuestas de ChatGPT/Perplexity/AI Overviews; el tráfico referido por IA convierte mejor (llega pre-filtrado). Ninguno de los competidores locales optimiza para esto.
- Consenso 2026: **10–20 piezas realmente expertas > cientos de posts genéricos**. Formato pregunta-respuesta con "soundbites" de 40–60 palabras citables por la IA, datos concretos (precios, tiempos, clima local), FAQPage schema.
- Demanda ya medida en GSC (consulta "blog de rotulación y publicidad visual").
- Ventaja de conocimiento real: clima caribeño (salitre, UV extremo, huracanes) — contenido que agregadores no pueden fingir.

Temas priorizados: cuánto cuesta rotular vehículo/flotilla en Cancún · lona front vs microperforada · cuánto dura un anuncio luminoso frente al mar · control solar vs polarizado para hoteles y Airbnbs · guía de permisos de anuncios (Benito Juárez/Solidaridad) · PPF en clima tropical (medidor de demanda, ver §2.4).

## 7. Plan de acción y estado

- **Fase 1 — COMPLETADA 12-jul-2026** (commit `1625d55`, verificada en producción):
  1. 301 `/blog.html` → `/` en `.htaccess`.
  2. Badge "★ 4.7 en Google · 30 opiniones" en hero + calificación real en #testimonios.
  3. Eliminados `aggregateRating` auto-servidos/desactualizados del JSON-LD (index: 5.0/4 en LocalBusiness; control-solar: 6 copias en productos 3M) — política de Google contra reseñas auto-servidas.
  4. Sección "Control Solar para Hoteles, Airbnbs y Condominios" + FAQ hospitality en `control-solar.html`.
  5. (El selector 🇺🇸 EN y los testimonios ya existían.)
- **Fase 2 (3–6 semanas):** páginas Playa del Carmen y Tulum · blog con 6–10 artículos GEO/AEO · portafolio con clientes nombrados (permisos confirmados).
- **Fase 3:** cotizador de lonas por m² (Supabase) · campaña sistemática de reseñas post-venta por WhatsApp (meta: ~1/semana → ~55 en 6 meses) · responder todas las reseñas existentes.

## 8. Notas operativas

- No usar `AggregateRating` en JSON-LD con datos del perfil de Google (auto-servido = riesgo de perder rich results). Mostrar la calificación solo visualmente.
- El deploy por rsync **no borra archivos remotos**: al eliminar páginas del repo hay que añadir 301/410 en `.htaccess` (caso `blog.html`, caso `sectores/`).
- Los `.md` del repo se suben al servidor pero `.htaccess` bloquea su acceso web (FilesMatch) — este documento no es público.
