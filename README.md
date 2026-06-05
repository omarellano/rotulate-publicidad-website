# Rotúlate Publicidad — Sitio Web Comercial

Este es el repositorio del sitio web principal de **Rotúlate Publicidad**, una empresa líder en servicios de impresión en gran formato, rotulación vehicular, letras 3D, y publicidad exterior e interior basada en Cancún, Quintana Roo.

El sitio es **100% estático** (construido con HTML5, CSS3 vanilla y JavaScript moderno), lo que garantiza tiempos de carga ultrarrápidos, alta seguridad y excelente rendimiento de SEO local.

---

## 🏗️ Estructura del Proyecto

La estructura principal del código fuente es la siguiente:

```
c:\Users\omac_\rtmx-web\
├── index.html                   # Página principal (Single-Page del sitio)
├── 404.html                     # Página personalizada de error 404 (Tema espacial)
├── style.css                    # Estilos CSS globales (Glassmorphism, variables y responsive)
├── main.js                      # Lógica principal (animaciones, navegación, carga diferida)
├── upload.js                    # Script de integración con Uploadcare para subida de archivos
├── sitemap.xml                  # Mapa del sitio para indexación en buscadores (Google, Bing)
├── robots.txt                   # Instrucciones para rastreadores de motores de búsqueda
├── .htaccess                    # Configuración del servidor Apache/LiteSpeed (Redirecciones y seguridad)
├── .github/                     # Automatizaciones
│   └── workflows/
│       └── deploy.yml           # Workflow de despliegue automático mediante GitHub Actions
├── assets/                      # Carpeta de recursos estáticos (imágenes de fondo, logotipos, fotos)
├── lonas-cancun/                # Landing page específica para el servicio de lonas en Cancún
│   └── index.html
└── express/                     # Sección de Servicios Express (Entrega 24 Horas)
    ├── index.html               # Landing en Español (React compilado)
    ├── favicon.ico
    ├── assets/                  # CSS, JS e imágenes optimizadas para la landing Express
    └── en/
        └── index.html           # Landing en Inglés (HTML estático de alto rendimiento para EE. UU.)
```

---

## 📂 Secciones Especiales

### 1. Servicio Express (`/express/`)
Es una landing page enfocada al 100% en la conversión rápida para clientes locales que requieren lonas y viniles urgentes. 
* **Versión en Español (`/express/`):** Construida inicialmente en React mediante Lovable, integrada completamente al repositorio local.
* **Versión en Inglés (`/express/en/`):** Creada de forma estática con HTML optimizado para capturar el tráfico orgánico de EE. UU. (ej. organizadores de eventos o bodas de destino en Cancún) sin el peso de la biblioteca React, maximizando el rendimiento móvil y el CTR en ordenadores.

### 2. Lonas Cancún (`/lonas-cancun/`)
Página de aterrizaje optimizada para capturar búsquedas específicas sobre fabricación e instalación de lonas publicitarias y banners en la zona de Cancún y Riviera Maya.

---

## ⚙️ Configuración del Servidor y SEO (`.htaccess`)

El servidor (LiteSpeed/Apache en Hostinger) está configurado a través del archivo `.htaccess` para asegurar las mejores prácticas del mercado:
* **Forzar HTTPS:** Redirige automáticamente todo el tráfico inseguro HTTP a conexiones seguras HTTPS.
* **Consolidación SEO:** Redirige la versión `www` a la versión no-www (`https://rotulatepublicidad.com/`) para unificar la autoridad de dominio en Google.
* **Limpieza de URLs:** Elimina la extensión `index.html` de las URLs tanto en la raíz como en las subcarpetas.
* **Políticas de Caché (Cache Control):** Almacenamiento en caché por 1 mes para imágenes, 1 año para fuentes y 1 semana para CSS/JS. Las páginas HTML se configuran con expiración inmediata para mostrar siempre el contenido más fresco.
* **Headers de Seguridad:** Implementación estricta de:
  * *Content Security Policy (CSP)* (Previene inyección de scripts externos).
  * *X-Frame-Options: DENY* (Previene ataques Clickjacking).
  * *X-Content-Type-Options: nosniff* (Previene sniffing de tipos MIME).
  * *Strict-Transport-Security (HSTS)* (Fuerza navegación cifrada).
  * *Redirecciones 410 (Gone):* Indican a Google que URLs eliminadas del sitio (ej: `/sectores/`) ya no existen y deben removerse de su índice de inmediato.

---

## 🚀 Pipeline de Despliegue Automático

El despliegue en producción se realiza automáticamente en cada `git push` a la rama `main` a través de **GitHub Actions**:

1. **Método de Conexión:** **SFTP (SSH File Transfer Protocol)** seguro sobre el puerto `65002` del servidor Hostinger.
2. **Autenticación:** Llave SSH privada configurada en los secretos del repositorio de GitHub (`SSH_PRIVATE_KEY`).
3. **Mecanismo de Despliegue:** Se ejecuta un paso en GitHub Actions que inyecta las claves públicas del servidor en el archivo `known_hosts` del runner de manera local y despliega los archivos vía `rsync` sobre SSH, excluyendo carpetas de desarrollo (`.git`, `.github`, etc.).

---

## 💻 Desarrollo Local

Para visualizar y probar los cambios del sitio localmente de manera correcta (especialmente para archivos que interactúan con APIs o rutas absolutas):

1. **Requisito:** Tener instalado [Node.js](https://nodejs.org/).
2. **Comando:** Desde la terminal en la raíz del proyecto, ejecuta el siguiente comando para levantar un servidor de desarrollo ligero:
   ```bash
   npx http-server -p 8080
   ```
3. **Acceso:** Abre tu navegador e ingresa a:
   * **Sitio Principal:** `http://localhost:8080/`
   * **Express Español:** `http://localhost:8080/express/`
   * **Express Inglés:** `http://localhost:8080/express/en/`

---

## 🛠️ Herramientas de Terceros Integradas

* **Uploadcare (`upload.js`):** Utilizado para que los clientes suban archivos pesados de diseño en el formulario de cotización.
* **Formspree:** Envío directo del formulario de contacto a correo electrónico sin necesidad de backend propio.
* **Google Tag Manager (`gtm.js`):** Integración de analíticas y seguimiento de conversiones de manera asíncrona.
