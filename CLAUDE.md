# Rotulate Publicidad - Website

## Proyecto
Sitio web comercial para **Rotulate Publicidad**, empresa mexicana de rotulación vehicular, impresión gran formato, anuncios luminosos y control solar arquitectónico, con base en Cancún, Q. Roo. El PPF (Paint Protection Film) es una línea marginal/aspiracional — no crear páginas de venta de PPF sin confirmar con Omar (taller no adaptado; se evalúa vía subcontrato). Sitio estático (HTML/CSS/JS) desplegado en Hostinger.

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

## Estado de Proyecto & Bitácora
- **Fuente única de verdad:** Para evitar la duplicación de información, toda la documentación activa sobre el estado de desarrollo, historial de cambios en cada sesión, notas de investigación y backlog de tareas pendientes residen **exclusivamente** en el archivo [agents.md](file:///C:/Users/omac_/rtmx-web/agents.md).
- **Branch activo:** `main`

## Historial de Decisiones
- Se descartó usar GitHub Actions de FTP de terceros (SamKirkland, etc.) porque no funcionaban con la config de Hostinger
- El deploy migró de script Python ftplib a rsync sobre SSH con llaves de host fijas en el workflow (jun-2026)
- Cotizaciones migradas de Firebase a Supabase (jun-2026); ver `agents.md` y `supabase_setup.sql`
- El sitio es 100% estático, sin framework ni build step
- El contenido de catálogos de proveedores (ej. 3M) se integra como HTML indexable + imágenes WebP optimizadas, no como imágenes de slides completas

## Reglas de Desarrollo (Obligatorio)
- **REGLA SIEMPRE — Documentar sin que se pida:** TODA implementación, cambio, corrección, incidente o decisión se documenta en [agents.md](file:///C:/Users/omac_/rtmx-web/agents.md) **en el mismo momento en que se completa y verifica**, sin esperar a que Omar lo pida y sin dejarlo para "el cierre de sesión". Si hubo commits, listarlos; si hubo verificación en producción, decir cómo se verificó; si quedó algo pendiente, dejarlo explícito. Ningún trabajo se considera terminado hasta que está en la bitácora.
- **Bitácora Única (Evitar Duplicaciones):** `agents.md` es la única bitácora. `CLAUDE.md` se reserva estrictamente para guías técnicas, de estilo y reglas.

## Estilo y Marca
- Todo diseño nuevo debe seguir el estilo existente del sitio: tema oscuro glassmorphism (`rgba(255,255,255,0.04)` en cards), acento lima `#C8F135` (`.text-accent-lime`), tipografía Space Grotesk, y reutilizar clases existentes (`.section-title`, `.faq-item`, `.cta-button`, etc.)
