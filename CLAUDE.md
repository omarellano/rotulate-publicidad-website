# Rotulate Publicidad - Website

## Proyecto
Sitio web comercial para **Rotulate Publicidad**, empresa mexicana de rotulación vehicular, impresión gran formato y PPF (Paint Protection Film). Sitio estático (HTML/CSS/JS) desplegado en Hostinger.

## URL Producción
- **Sitio:** https://rotulatepublicidad.com
- **Hosting:** Hostinger (shared hosting con LiteSpeed)

## Estructura del Proyecto
```
├── index.html          # Página principal (single-page)
├── style.css           # Estilos globales (glassmorphism, responsive)
├── main.js             # Lógica principal (navegación, animaciones, lazy loading)
├── upload.js           # Lógica de subida de archivos (Uploadcare)
├── assets/             # Imágenes (hero, logos, iconos)
├── .github/workflows/  # GitHub Actions (deploy automático)
└── CLAUDE.md           # Este archivo
```

## Stack Técnico
- **Frontend:** HTML5, CSS3 (variables, grid, flexbox), JavaScript vanilla (ES6+)
- **Cotizaciones (formulario + archivos):** Supabase (tabla `cotizaciones` + bucket Storage `cotizaciones`), cliente en `supabase-config.js` y lógica en `upload.js`
- **Fuentes:** Google Fonts (Space Grotesk)
- **Deploy:** GitHub Actions → rsync sobre SSH a Hostinger

## Deploy (GitHub Actions)
- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push a `main` o `workflow_dispatch`
- **Método:** `rsync` sobre SSH (puerto `65002`) — sustituyó al script Python ftplib anterior. Las llaves públicas del servidor están fijas en el workflow (`known_hosts` estático, sin `ssh-keyscan` porque fallaba desde los runners)
- **Ruta remota:** `domains/rotulatepublicidad.com/public_html` (IMPORTANTE: esta es la ruta real, NO usar `public_html` solo)
- **Secret necesario:** `SSH_PRIVATE_KEY`
- **Exclusiones:** `.git`, `.github`, `README.md`, `CLAUDE.md`, `.gitignore`, `LICENSE` (agents.md y todo lo demás SÍ se sube)

### Notas importantes del deploy
- Si el deploy falla con `Connection timed out` en el puerto 65002, es transitorio: reintentar con `gh run rerun <run-id> --failed` antes de tocar el workflow (pasó el 6 y el 12 de junio de 2026)
- La ruta `public_html` es un symlink; hay que usar la ruta completa `domains/rotulatepublicidad.com/public_html`
- Después de un deploy, puede ser necesario **purgar caché** desde el panel de Hostinger (Cache Manager) para ver los cambios
- Evitar nombres de archivo con espacios en el repo (se suben tal cual por rsync)

## Seguridad Implementada
- **Content Security Policy (CSP):** meta tag en index.html, permite solo dominios necesarios
- **X-Content-Type-Options:** nosniff
- **Referrer Policy:** strict-origin-when-cross-origin
- **Anti-clickjacking:** `frame-ancestors 'none'` en CSP
- **Formulario protegido:** honeypot anti-spam, rate limiting, validación/sanitización de inputs
- **Anti-XSS:** sanitización de datos del usuario antes de insertar en DOM

## Contacto del Negocio
- **WhatsApp:** Botón flotante en el sitio
- **Formulario:** Conectado a Formspree

## Estado Actual (2026-06-12)
- **Branch activo:** `main`
- **Último cambio:** Se integró el catálogo de películas de control solar 3M en `control-solar.html`: sección de líneas de producto (Prestige, Ceramic, Neutral, Night Vision, Silver P18, Prestige Exterior) con fotos WebP extraídas del PDF del catálogo, sección "¿Cómo funciona?", FAQ ampliado, PDF descargable (`assets/catalogo-3m-control-solar.pdf`) y schema `OfferCatalog` + `FAQPage`. Desplegado y verificado en producción.
- **SEO:** El detalle del plan SEO y el backlog viven en `agents.md` (resúmenes por sesión + próximos pasos). Los datos de Search Console están en `rotulatepublicidad.com-Performance-on-Search-2026-06-05/`.
- **Pendiente:** Replicar el patrón de schema de producto en las demás páginas de servicio y mejorar titles/descriptions de las páginas con 0 clics en GSC (ver backlog en `agents.md`).

## Historial de Decisiones
- Se descartó usar GitHub Actions de FTP de terceros (SamKirkland, etc.) porque no funcionaban con la config de Hostinger
- El deploy migró de script Python ftplib a rsync sobre SSH con llaves de host fijas en el workflow (jun-2026)
- Cotizaciones migradas de Firebase a Supabase (jun-2026); ver `agents.md` y `supabase_setup.sql`
- El sitio es 100% estático, sin framework ni build step
- El contenido de catálogos de proveedores (ej. 3M) se integra como HTML indexable + imágenes WebP optimizadas, no como imágenes de slides completas

## Estilo y Marca
- Todo diseño nuevo debe seguir el estilo existente del sitio: tema oscuro glassmorphism (`rgba(255,255,255,0.04)` en cards), acento lima `#C8F135` (`.text-accent-lime`), tipografía Space Grotesk, y reutilizar clases existentes (`.section-title`, `.faq-item`, `.cta-button`, etc.)
