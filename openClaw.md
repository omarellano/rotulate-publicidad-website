🩺 Diagnóstico del proyecto rtmx-web

│ Ubicación: C:\Users\omac_\rtmx-web
│ Rama actual: main (limpia, sin cambios sin commitear salvo 2 carpetas con datos)
│ Último commit: 54b97a1 — handoff de agentes de IA

────────────────────────────────────────────────────────────────────────────────

1. 🧱 Stack detectado

┌─────────────────┬─────────────────────────────────────────────────────────────────────┬───────────────────────────────────────────────────┐
│ Capa            │ Tecnología actual                                                   │ Notas                                             │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Frontend        │ HTML5 + CSS3 vanilla + JS ES6+                                      │ Sin framework, sin build step                     │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Formulario      │ Formspree (api.emailjs.com aparece en CSP, no formspree.io real)    │ El README dice Formspree pero CSP permite EmailJS │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Subida archivos │ Uploadcare (ucarecdn.com)                                           │ Lógica en upload.js                               │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Backend / DB    │ Firebase Firestore + Storage                                        │ Ya configurado (firebase-config.js)               │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Auth            │ Firebase Auth (referenciado en CSP: identitytoolkit.googleapis.com) │ No se está usando aún en el código                │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ SEO/Analytics   │ Google Tag Manager, GA4, schema JSON-LD                             │ Funcionando                                       │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Hosting         │ Hostinger (LiteSpeed/Apache)                                        │ Shared hosting                                    │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Deploy          │ GitHub Actions → SFTP a Hostinger (puerto 65002)                    │ Operativo, usa rsync con host keys hardcoded      │
├─────────────────┼─────────────────────────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ Dev local       │ npx http-server -p 8080                                             │ Documentado en README                             │
└─────────────────┴─────────────────────────────────────────────────────────────────────┴───────────────────────────────────────────────────┘

│ ⚠️ Discrepancia detectada: El CLAUDE.md (línea 7) dice "Formspree" y README.md repite Formspree, pero el CSP y la lógica sugieren EmailJS o ya se migró.
│ Habría que revisar index.html para confirmar el proveedor real.

────────────────────────────────────────────────────────────────────────────────

2. 📁 Carpetas y archivos clave

```
  rtmx-web/
  ├── index.html                  # Landing principal (~58KB, single-page)
  ├── main.js                     # UI (scroll, nav, animaciones)
  ├── upload.js                   # Integración Uploadcare
  ├── firebase-config.js          # ⚠️ Config de Firebase (apiKey visible)
  ├── firestore.rules             # Reglas: solo creación pública de /cotizaciones, lectura DENEGADA
  ├── storage.rules               # Reglas: /cotizaciones/* lectura pública, write <24MB
  ├── .htaccess                   # CSP estricto, HTTPS, cache, HSTS
  ├── style.css                   # 57KB de estilos (glassmorphism)
  │
  ├── express/                    # Landing Express 24h (ES: React bundle, EN: HTML estático)
  │   ├── index.html
  │   └── en/index.html
  ├── lonas-cancun/               # Landing SEO local para lonas
  │
  ├── assets/
  │   ├── galeria/                # ~250 imágenes de proyectos (.webp)
  │   ├── galeria-raw/            # Originales sin optimizar
  │   ├── nuevas_fotos/           # 🆕 SIN COMMIT (carpeta de trabajo)
  │   └── ...logos, hero, brands
  │
  ├── rotulatepublicidad.com-Performance-on-Search-2026-06-05/   # 🆕 Export de GSC, sin commit
  └── .github/workflows/deploy.yml
```

### 🔐 Archivos sensibles / importantes

┌──────────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Archivo                      │ Por qué importa                                                                                                          │
├──────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ firebase-config.js           │ Contiene projectId: rotulate-publicidad y apiKey pública (no es secreto en cliente, la seguridad real está en las rules) │
├──────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ firestore.rules              │ Hoy solo permite create público en /cotizaciones. Cero lectura, cero update, cero delete.                                │
├──────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ storage.rules                │ Subida pública a /cotizaciones/* máx 24 MB.                                                                              │
├──────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ .htaccess                    │ CSP estricto. Si agregas Facturama o Supabase, hay que actualizar connect-src y script-src.                              │
├──────────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ .github/workflows/deploy.yml │ Deploy a 157.173.209.165:65002 con rsync. No excluye node_modules ni .env aún.                                           │
└──────────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────

3. 📦 Dependencias

No hay package.json en el proyecto. Es 100% estático. Solo hay dev-dependencies implícitas vía CDN:

- @uploadcare/upload-widget (vía ucarecdn.com)
- Google Fonts: Space Grotesk
- Firebase Web SDK (referenciado en firebase-config.js y CSP, pero no se inicializa Firestore/Auth en main.js — solo firebase.initializeApp en el config)

│ 📌 No hay npm install, no hay node_modules. Cualquier librería nueva se sumará vía CDN o requerirá un build step.

────────────────────────────────────────────────────────────────────────────────

4. 📊 Estado actual

┌────────────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
│ Aspecto                │ Estado                                                                                       │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Sitio público          │ ✅ Producción funcionando, 3 landings (ES principal, Express ES, Express EN)                 │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Deploy                 │ ✅ Operativo (SFTP vía GitHub Actions)                                                       │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ SEO local              │ ⚠️ /express/ = 60% de los clics, páginas de servicios en página 2-3 de Google                │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Cotizaciones           │ 🟡 Se guardan en Firestore (/cotizaciones) pero no hay panel para verlas                     │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Backend administrativo │ ❌ No existe. No hay dashboard, no hay gestión de clientes, ni de órdenes, ni de facturación │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Base de datos          │ 🟡 Firestore con 1 sola colección, schema libre                                              │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Autenticación admin    │ ❌ No implementada (Firebase Auth referenciado en CSP pero sin uso)                          │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Facturación            │ ❌ No existe. Cero integración con Facturama o cualquier PAC                                 │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Compras / gastos       │ ❌ No existe                                                                                 │
├────────────────────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Roles / permisos       │ ❌ No existen                                                                                │
└────────────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────

5. ⚠️ Riesgos y cosas a resolver antes de empezar

1. CSP bloquea todo lo nuevo por defecto. Cualquier fetch a Supabase, Facturama o endpoints propios va a ser bloqueado hasta actualizar connect-src en
   .htaccess y la meta tag CSP en cada HTML.
2. firestore.rules y storage.rules están dimensionados solo para "recibir cotizaciones", no para un sistema multi-usuario. Hay que repensarlas por completo
   para el módulo admin.
3. Decisión arquitectónica clave: Firebase ya está. ¿Quieres mantenerlo o migrar a Supabase? Tu mensaje dice "con Supabase", pero el proyecto ya usa
   Firebase. Hay 2 caminos:
    - A) Mantener Firebase (Firestore + Auth + Storage) — más rápido, ya funciona.
    - B) Migrar a Supabase (Postgres + Auth + Storage) — más estructura relacional, mejor para cotizaciones/facturación/órdenes con joins y reportes, pero
      es un proyecto nuevo encima.
4. No hay package.json, así que un backend Node/Express (para Facturama, que requiere API server) tendría que vivir en otra carpeta. Ya hay un
   rtmx-cotizador y un rtmx-empleados en la misma máquina — ¿guardamos todo ahí, en un nuevo rtmx-api, o usamos Supabase Edge Functions?
5. Credenciales de Facturama (sandboxes primero): las necesitamos pero NO las vamos a poner en el repo. Hay que decidir dónde van (variables de entorno en
   el backend, Supabase Vault, GitHub Secrets).
6. Hostinger es shared hosting: corre HTML estático, no Node. Si montamos backend, o va en otro host (Railway, Render, Fly, VPS) o usamos Supabase Edge
   Functions / Deno.

────────────────────────────────────────────────────────────────────────────────

6. 🗺️ Próximos pasos recomendados (en orden, sin tocar nada aún)

### Fase 0 — Decisiones (necesito que me digas antes de avanzar)

1. Backend / DB: ¿Supabase nuevo, o nos quedamos con Firebase + añadimos Cloud Functions?
2. Hosting del backend: ¿Supabase Edge Functions, VPS propio, Railway, Render?
3. Frontend del sistema interno: ¿SPA separada (React/Vue/Svelte) o multipágina HTML estático? Mi recomendación: SPA en /admin/ con Vite + React +
   TypeScript + shadcn/ui.
4. Migración de datos: ¿Hay cotizaciones históricas que importar? ¿De dónde (Excel, otro sistema, papel)?

### Fase 1 — Cimientos (1–2 semanas)

5. Crear la arquitectura: esquema relacional de clientes, cotizaciones, ordenes_trabajo, compras, gastos, facturas, usuarios, roles.
6. Configurar autenticación (Supabase Auth o Firebase Auth) con roles: admin, ventas, produccion, finanzas.
7. Definir firestore.rules/supabase policies por rol.
8. Crear la app /admin/ con login, layout, navegación y dashboard vacío.

### Fase 2 — Módulos core (en paralelo por sprints cortos)

9. Clientes (CRUD, historial, contacto).
10. Cotizaciones (crear, versionar, PDF, convertir a OT).
11. Órdenes de trabajo (estados, asignación, avance, materiales).
12. Compras (a proveedores, ligadas a OT).
13. Gastos (por categoría, por OT, con adjuntos).
14. Facturación Facturama (cliente → CFDI 4.0, timbrado, PDF/XML, cancelar).

### Fase 3 — Dashboard e integraciones

15. Dashboard con KPIs: cotizaciones del mes, conversión, ingresos, gastos, cuentas por cobrar.
16. Notificaciones (WhatsApp Business API opcional más adelante).
17. Respaldos automáticos.
18. Auditoría (quién hizo qué, cuándo).

### Fase 4 — Producción y endurecimiento

19. CSP/headers actualizados.
20. Logs y monitoreo.
21. Pruebas de carga, respaldos, plan de recuperación.

────────────────────────────────────────────────────────────────────────────────

7. 🛑 Lo que NO voy a hacer sin tu OK explícito

- ❌ Borrar ningún archivo
- ❌ Instalar dependencias (npm, pip, etc.)
- ❌ Crear/eliminar colecciones en Firebase
- ❌ Escribir credenciales reales (Facturama, Supabase, Firebase Admin SDK) en ningún archivo
- ❌ Subir nada a producción
- ❌ Cambiar firebase-config.js o las rules sin tu confirmación

────────────────────────────────────────────────────────────────────────────────

📋 Lo que necesito de ti para arrancar

1. ¿Firebase o Supabase? (es la decisión más importante, condiciona todo lo demás)
2. ¿Dónde vivirá el backend? (Supabase Edge, Railway, VPS, o ¿tienes Hostinger VPS?)
3. ¿Qué stack prefieres para el panel admin? (mi recomendación: Vite + React + TypeScript + shadcn/ui + Tailwind)
4. ¿Cuántos usuarios internos habrá? (define el modelo de roles)
5. ¿Ya tienes cuenta de Facturama? (sandbox lista o producción) — no me pases credenciales, dime solo si existen y el régimen fiscal bajo el que facturan.

Con esas 5 respuestas te presento un plan técnico detallado con archivos a crear, esquema de base de datos, mockups de pantallas y cronograma realista antes
de tocar una sola línea. 🚀