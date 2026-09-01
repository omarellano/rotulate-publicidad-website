# Auditoría Técnica, Velocidad y UX — Rotulate Publicidad

Fecha: 2026-09-01
Sitio: https://rotulatepublicidad.com/
Alcance: código estático del sitio, HTML/CSS/JS, assets, headers de producción, flujo de deploy, SEO técnico básico y experiencia de usuario.

---

## Resumen Ejecutivo

El sitio está en buen estado para una arquitectura estática: no depende de un build pesado, tiene headers de seguridad activos, compresión, caché para assets, HTML estructuralmente correcto, imágenes principales optimizadas y el stack pesado del formulario se carga de forma diferida.

Las mejoras con mayor impacto no requieren rediseñar el sitio. El foco debe estar en:

1. Limpiar lo que se sube al hosting.
2. Separar JavaScript pesado de home vs. páginas internas.
3. Unificar versiones de CSS/JS para evitar caché viejo.
4. Comprimir o retirar assets pesados/no usados.
5. Pulir accesibilidad y UX del menú.

Nota de cierre: antes del push se aplicaron tres quick wins derivados de esta auditoría: limpieza de exclusiones en deploy, caché CSS/JS a 1 año y respeto a `prefers-reduced-motion` en efectos decorativos del hero.

---

## Evidencia Revisada

### Verificaciones ejecutadas

- `node scratch\audit_html_structure.js`: 38 archivos HTML con etiquetas balanceadas.
- `git diff --check`: sin errores de whitespace.
- Revisión de headers en producción con `curl -I`.
- Inventario local de tamaños de HTML, CSS, JS y assets.
- Revisión de `.github/workflows/deploy.yml`, `.htaccess`, `robots.txt`, `sitemap.xml`, `main.js`, `upload.js`, `analytics.js`, `gtm.js`, `index.html` y `style.css`.

### Tamaños relevantes

- `index.html`: ~68.7 KB.
- `style.css`: ~63.9 KB.
- `main.js`: ~26.2 KB.
- `upload.js`: ~13.4 KB.
- `analytics.js`: ~7.7 KB.
- `blog/index.html`: ~24.2 KB.
- `assets/neon-flex.jpg`: ~1.4 MB.
- `assets/hero-space-bg-earth.jpg`: ~60.8 KB.
- `assets/portada-archivo-lona-vinil.webp`: ~76.3 KB.
- `assets/galeria-raw`: 125 archivos rastreados, aproximadamente 55 MB.

---

## Hallazgos

### 1. Deploy y carpetas internas

El workflow de deploy excluye:

- `search_info`
- `seo_performance`
- `deploy_failures`
- `assets/ysisi`
- `assets/nuevas_fotos`

Pero no excluye explícitamente:

- `assets/galeria-raw`
- `assets/imagenes_blog`
- `scratch`

Riesgo:

- Deploy más lento por subir archivos que no son necesarios en producción.
- Hosting con material interno o pesado que no aporta al usuario.
- Mayor costo operativo al sincronizar por `rsync`.

Estado antes del push:

- Implementado en `.github/workflows/deploy.yml`: exclusión de `assets/galeria-raw`, `assets/imagenes_blog`, `scratch`, `docs` y los `hero-space-bg*.png` no usados.

Recomendación restante:

- Bloquearlas también en `.htaccess` si alguna llegara a estar en producción.
- Evaluar si `assets/galeria-raw` debe permanecer en Git o moverse a respaldo externo/local.

Prioridad: Alta.

---

### 2. Versiones de CSS y JS inconsistentes

Se detectaron versiones mezcladas:

- Home: `style.css?v=3.3`, `main.js?v=3.1`.
- Muchas páginas internas: `style.css?v=3.2`, `main.js?v=3.0` o `main.js?v=2.5`.
- `lonas-cancun` usa además JS/CSS propios con otras versiones.

Riesgo:

- Algunas páginas pueden quedarse con estilos o scripts viejos en caché.
- Cada cambio global obliga a recordar muchas versiones manualmente.
- Se vuelve más difícil diagnosticar errores visuales por página.

Recomendación:

- Estandarizar versiones sitewide en una sola pasada.
- Adoptar una convención: cada cambio global de `style.css` o `main.js` incrementa versión en todas las páginas que lo consumen.

Prioridad: Alta.

---

### 3. JavaScript global demasiado amplio para páginas internas

`main.js` contiene lógica de:

- Header/nav.
- Smooth scroll.
- Back-to-top.
- Scroll reveal.
- Contadores.
- Partículas del hero.
- Mascota astronauta.
- Galería aleatoria.
- Lightbox.
- Carga diferida del stack del formulario.

Aunque muchas funciones hacen `return` si no encuentran nodos, el navegador sigue descargando y parseando todo el archivo en blogs y páginas de servicio.

Riesgo:

- Trabajo innecesario en páginas internas.
- Peor tiempo de interacción en móviles de gama baja.
- Más superficie para bugs globales.

Recomendación:

- Crear `main-lite.js` para páginas internas con solo:
  - menú,
  - scroll suave,
  - back-to-top,
  - reveal básico,
  - tracking mínimo que hoy dependa del DOM.
- Mantener `main.js` completo solo para home.
- Dejar lógica específica de `lonas-cancun` en su archivo local.

Prioridad: Alta.

---

### 4. Caché CSS/JS conservadora

`.htaccess` cachea CSS/JS por 1 semana. Como el sitio ya usa query strings de versión (`?v=`), se puede subir a 1 año sin sacrificar control de cambios.

Riesgo actual:

- Visitantes recurrentes vuelven a pedir CSS/JS antes de lo necesario.

Estado antes del push:

- Implementado en `.htaccess`: CSS/JS pasan de 1 semana a 1 año, apoyados en cache-busting con `?v=`.

Recomendación restante:

- Mantener disciplina de versionado en HTML cada vez que cambie el archivo.
- Agregar `AddType application/javascript .js` si Hostinger sigue sirviendo JS como `application/x-javascript`.

Prioridad: Media-alta.

---

### 5. Assets pesados o posiblemente no usados

Se detectaron assets grandes:

- `assets/neon-flex.jpg`: ~1.4 MB.
- `assets/hero-space-bg.png`: ~951 KB.
- `assets/hero-space-bg-2.png`: ~867 KB.
- `assets/hero-space-bg-3.png`: ~924 KB.
- Varias imágenes de galería sobre 300-500 KB.
- `assets/galeria-raw`: archivo fuente pesado, no público.

Riesgo:

- Si una imagen grande entra como fallback o se comparte en redes, puede afectar carga.
- Si archivos no usados se despliegan, ensucian producción.

Recomendación:

- Confirmar referencias reales antes de borrar.
- Reconvertir `neon-flex.jpg` a tamaño razonable para OG/fallback.
- Revisar top 10 de imágenes WebP más pesadas de galería.
- Excluir fuentes/raw del deploy.

Prioridad: Media.

---

### 6. Menú desktop y UX

Hay un cambio local pendiente que compacta el menú de home:

- Quita enlaces redundantes.
- Agrupa `Proceso`, `Reseñas` y `FAQ` en dropdown "Más".
- Cambia el switch de idioma a `EN` sin emoji.

Estado:

- La estructura HTML queda balanceada.
- El cambio no está commiteado según `git status`.

Riesgo:

- El dropdown depende de `hover`/`focus-within`; conviene reforzarlo para click/touch y accesibilidad.
- Falta `aria-expanded`, `aria-controls` y cierre al click fuera si se decide hacerlo interactivo con JS.

Recomendación:

- Terminar el cambio del menú antes de nuevas optimizaciones.
- Hacer verificación visual desktop/mobile.
- Aplicar tratamiento similar del switch `EN` en páginas internas si el emoji roto se repite.

Prioridad: Media-alta.

---

### 7. Movimiento y accesibilidad

Parte del sitio ya respeta `prefers-reduced-motion` en contadores, pero las partículas del hero y la interacción de la mascota pueden mejorar.

Riesgo:

- Usuarios con reducción de movimiento pueden recibir animaciones innecesarias.
- Móviles de gama baja pueden gastar CPU en efectos decorativos.

Estado antes del push:

- Implementado en `main.js`: partículas del hero y movimiento de la mascota no se inicializan si el usuario tiene `prefers-reduced-motion: reduce`.

Recomendación restante:

- Mantener la experiencia visual para usuarios sin esa preferencia.

Prioridad: Media.

---

### 8. SEO técnico

El sitemap está sano y el artículo nuevo aparece con `lastmod` correcto. Algunas páginas comerciales tienen `lastmod` antiguos aunque han recibido cambios en sesiones recientes.

Riesgo:

- Señal de frescura inconsistente para páginas actualizadas.

Recomendación:

- Actualizar `lastmod` solo cuando haya cambios reales de contenido o estructura.
- Mantener `sitemap.xml` como parte obligatoria de cada entrega SEO.

Prioridad: Media.

---

## Plan de Trabajo Propuesto

### Fase 1 — Limpieza de deploy y seguridad operacional

Objetivo: que producción reciba solo lo que necesita.

Acciones:

- Agregar exclusiones a `.github/workflows/deploy.yml`:
  - `assets/galeria-raw`
  - `assets/imagenes_blog`
  - `scratch`
- Ampliar bloqueo en `.htaccess` para esas rutas.
- Verificar con deploy y `curl` que el sitio público sigue intacto.

Impacto esperado:

- Deploy más rápido.
- Menor riesgo de publicar archivos internos.
- Hosting más limpio.

Riesgo: Bajo.

---

### Fase 2 — Unificación de cache-busting

Objetivo: eliminar inconsistencias de versiones.

Acciones:

- Actualizar referencias sitewide a una versión única de `style.css`.
- Actualizar referencias sitewide a una versión única de `main.js` donde aplique.
- Documentar la regla de versionado en `AGENTS.md`.

Impacto esperado:

- Menos errores por caché viejo.
- Mantenimiento más simple.

Riesgo: Bajo-medio, requiere revisar muchas páginas.

---

### Fase 3 — JavaScript ligero para páginas internas

Objetivo: reducir descarga/parseo en blogs y servicios.

Acciones:

- Crear `main-lite.js`.
- Mover solo utilidades comunes:
  - menú,
  - smooth scroll,
  - back-to-top,
  - reveal.
- Dejar galería, lightbox, partículas, astronauta y carga de formulario principal solo donde existan y sean necesarios.
- Cambiar blogs y páginas de servicio a `main-lite.js`.

Impacto esperado:

- Mejor experiencia en móvil.
- Menos JS global en páginas informacionales.
- Menos riesgo de regresiones cruzadas.

Riesgo: Medio, requiere prueba visual.

---

### Fase 4 — Optimización de imágenes

Objetivo: reducir peso sin perder calidad comercial.

Acciones:

- Reconvertir `neon-flex.jpg`.
- Auditar y recomprimir imágenes WebP pesadas de galería.
- Confirmar si `hero-space-bg*.png` se usan; si no, sacarlas del deploy o del repo.
- Mantener JPG fallback solo cuando aporte algo real.

Impacto esperado:

- Mejora de carga en páginas de servicio y compartidos sociales.
- Menor transferencia en producción.

Riesgo: Bajo si se conserva respaldo.

---

### Fase 5 — UX y accesibilidad

Objetivo: cerrar detalles de interacción y reducir fricción.

Acciones:

- Terminar dropdown del menú con accesibilidad completa.
- Corregir switch de idioma en páginas internas.
- Añadir soporte completo a `prefers-reduced-motion`.
- Verificar desktop y mobile con navegador real.

Impacto esperado:

- Navegación más clara.
- Mejor experiencia en móvil.
- Menos problemas visuales por menú saturado.

Riesgo: Medio-bajo.

---

## Orden Recomendado para el Equipo

1. Aprobar el tratamiento del menú pendiente.
2. Ejecutar Fase 1.
3. Ejecutar Fase 2.
4. Medir con PageSpeed/Lighthouse antes y después.
5. Ejecutar Fase 3 si los resultados muestran JS como oportunidad real.
6. Ejecutar Fase 4 en paralelo cuando haya tiempo de revisar visualmente imágenes.
7. Cerrar Fase 5 con pruebas desktop/mobile.

---

## Notas de Coordinación

- Se aplicaron quick wins de bajo riesgo derivados de la auditoría antes del push.
- El árbol local tenía cambios pendientes en `index.html` y `style.css` relacionados con el menú.
- Antes de iniciar una implementación, conviene decidir si esos cambios del menú se van a terminar, ajustar o descartar.
- Cualquier cambio futuro debe validarse con:
  - auditoría HTML,
  - `git diff --check`,
  - revisión visual desktop/mobile,
  - verificación de producción tras deploy.
