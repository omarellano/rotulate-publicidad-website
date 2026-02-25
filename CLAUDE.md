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
- **Formulario de contacto:** Formspree (https://formspree.io)
- **Subida de archivos:** Uploadcare (https://ucarecdn.com)
- **Fuentes:** Google Fonts (Space Grotesk)
- **Deploy:** GitHub Actions → FTP a Hostinger

## Deploy (GitHub Actions)
- **Workflow:** `.github/workflows/deploy.yml`
- **Trigger:** Push a `main` o `workflow_dispatch`
- **Método:** Python `ftplib` (FTP_TLS) — se usa script Python directo porque las GitHub Actions de FTP no funcionaron con Hostinger
- **Ruta remota FTP:** `domains/rotulatepublicidad.com/public_html` (IMPORTANTE: esta es la ruta real, NO usar `public_html` solo)
- **Secrets necesarios:** `FTP_HOST`, `FTP_USER`, `FTP_PASS`

### Notas importantes del deploy
- Hostinger usa FTP con TLS, requiere `ssl.CERT_NONE` por certificado del servidor
- La ruta `public_html` es un symlink; en FTP hay que usar la ruta completa `domains/rotulatepublicidad.com/public_html`
- Después de un deploy, puede ser necesario **purgar caché** desde el panel de Hostinger (Cache Manager) para ver los cambios

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

## Historial de Decisiones
- Se descartó usar GitHub Actions de FTP de terceros (SamKirkland, etc.) porque no funcionaban con la config de Hostinger
- Se usa script Python directo en el workflow que sube archivo por archivo via ftplib
- El sitio es 100% estático, sin framework ni build step
