# Auditoría de seguridad — 6 de octubre de 2026

Revisión de código, historial Git, GitHub, despliegue y HTTP público. No certifica ausencia de vulnerabilidades ni compromiso. Cambios únicamente locales: sin commit, push, despliegue, escrituras en Supabase o envíos de formularios/correos. El proyecto Supabase también sirve al ERP, cuyo código no forma parte de este repositorio.

## Prioridades

| Prioridad | Hallazgo y evidencia | Estado / siguiente acción |
|---|---|---|
| Alta: disponibilidad | Supabase no resuelve desde esta red. El run `37507626600` del monitor también registró `HTTP 000000` pero terminó success. `curl` imprimía 000 y el fallback añadía otro 000; la condición solo rechazaba exactamente 000 o prefijo 5. | Corrección local y prueba de regresión con curl simulado. Revisar estado del proyecto en Dashboard; no inferir automáticamente pausa ni recuperación. El backup EmailJS no fue probado. |
| Alta: prevención de abuso | `upload.js` y `lonas-cancun/main.js` insertan desde el navegador; el límite temporal y honeypot solo viven en el cliente. El SQL permite INSERT anónimo. | Un cliente puede omitir esas validaciones. Implementar endpoint de servidor con CAPTCHA validado en servidor, límites por origen de petición/volumen y validación de payload. Migrar ambos formularios y el correo de respaldo antes de revocar inserciones directas. No basta poner CAPTCHA delante del HTML dejando el endpoint anónimo abierto. |
| Alta si se confirma en producción | El bootstrap concede acceso total a `authenticated` sobre leads. Estar autenticado no equivale a ser empleado. | Comprobar políticas reales, registro público y roles del ERP. No se intentó crear una cuenta ni leer clientes. SQL de diagnóstico sin datos personales en `scripts/audit-supabase-readonly.sql`. No se aplicó una política incompatible con el ERP. |
| Alta: repositorio | Repositorio público, `main` sin protección y rulesets vacíos; un push despliega. Único colaborador devuelto: `omarellano`, admin. | Configurar PR obligatoria, comprobación de CI, prohibición de force-push y borrado; para un único mantenedor no exigir aprobación de una segunda persona inexistente. Configurar comprobación requerida una vez que el workflow exista en GitHub. Ajustes remotos aún sin cambiar. |
| Media/alta: adjuntos | `getPublicUrl()` y nombres `timestamp_nombre` para documentos de clientes. La comprobación de extensión y 24 MB es del cliente; no acredita límites del bucket. | Verificar bucket, límites/MIME y permisos reales. Diseñar bucket privado con URLs firmadas autorizadas, IDs aleatorios, cuota y análisis de archivos. Coordinar cambios con el ERP y enlaces antiguos. No se descargaron adjuntos de clientes. |
| Media: credencial histórica | Alerta GitHub #1 abierta, tipo `google_api_key`, `validity=unknown`, en `firebase-config.js`, commit `8e5dceffcffb5cc32203e1a3843afe30833ca750`, línea 6. | Una clave Firebase web puede ser pública por diseño; esto no prueba robo ni una credencial administrativa expuesta. Revisar restricciones de API, uso y proyecto antiguo en Google Cloud; retirar si está en desuso. No se imprimió ni se probó la clave. No cerrar alerta sin verificar. |
| Media: cadena de suministro | Supabase `@2` y EmailJS `@4` se cargan de jsDelivr sin versión exacta/SRI. CSP autoriza el origen completo. No hay package.json/lockfile que permita afirmar que npm audit cubra estas dependencias. | Fijar versiones, hashes y proceso de actualización; revisar dependencias/transitivos y probar formulario y cotizador. GTM también puede ejecutar JS: revisar permisos y publicaciones del contenedor. Pendiente. |
| Media: despliegue | rsync copiaba casi todo el checkout; el script local subía carpetas locales y usaba `StrictHostKeyChecking=no`. | Preparado artefacto nuevo de archivos públicos versionados, comprobación de recursos y host keys fijas compartidas. Sin borrado remoto automático; archivos internos ya existentes requieren inventario y limpieza separada. |
| Media: detección | Secret scanning y push protection activos. Dependabot alerts y security updates desactivados; Actions permite todas las acciones y no exige SHA. Sin entornos protegidos. | Checkout fijado a SHA, token de solo lectura y sin persistencia, jobs acotados, despliegue serializado y solo desde main; Dependabot para Actions y CI nuevos en local. Alertas/configuración remota pendientes. |
| Disponibilidad: Express | `/express/` referencia `/express/express.css?v=3` y `/express/express.js?v=1`; los recursos base dieron 404. Ambos existen localmente sin versionar. | Estado preexistente. El nuevo constructor bloquea ese despliegue. Resolver publicación del rediseño pendiente o recuperar las páginas compatibles; no se mezcló el trabajo previo de Express. |

## Lo comprobado favorablemente

- 625 archivos versionados inventariados. Escaneo heurístico de 1,514 blobs de texto únicos en todas las referencias Git locales: dos versiones históricas de `firebase-config.js` coinciden con clave Google; sin coincidencias de claves privadas, tokens GitHub, AWS AKIA, Supabase secret o JWT `service_role`. No es un escáner universal, no cubre blobs binarios ni referencias remotas no presentes localmente.
- Home HTTP 200 con CSP (sin unsafe-inline para scripts), HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy y Permissions-Policy. La cabecera pública incluye `frame-src https://www.google.com`, ausente en el `.htaccess` local: reconciliar origen de esa diferencia antes de desplegar. No se modificó esa directiva.
- HEAD a `/.git/config`, `/.env`, `/.env.production`, `/agents.md`, `/supabase_setup.sql`, `/deploy-local.ps1`, `/docs/`, `/openClaw.md`: 403. `/.github/workflows/deploy.yml` y `/scratch/`: 404. Son rutas acotadas, no barrido exhaustivo.
- Revisión de los scripts propios, entradas URL y puntos de inserción HTML: nombres de archivo y errores usan textContent; servicio por URL usa lista permitida; enlaces WhatsApp se codifican. No se identificó un recorrido XSS explotable en esos puntos, sin equivaler a prueba dinámica completa ni revisión del panel ERP.
- No hay backend PHP/Node propio versionado que atienda peticiones del sitio estático. La superficie de escritura está en Supabase y EmailJS.
- Sin deploy keys registradas en GitHub ni entornos de despliegue configurados. La consulta de webhooks falló por falta del scope `admin:repo_hook`; no se afirma que no haya hooks.

## Cambios locales preparados

1. `scripts/build-deploy.mjs`: lista de tipos/carpetas públicas, exclusivamente archivos Git, carpeta nueva por ejecución, rechazo de enlaces simbólicos y recursos HTML/CSS faltantes. No hace borrados. No sustituye secret scanning: un archivo JS público todavía puede contener una credencial si alguien la introduce.
2. Workflow y deploy local: artefacto común, SSH estricto y host keys tomadas del workflow previo; no se rotaron claves. Secret SSH pasado como variable de entorno, no interpolado dentro del script. Checkout por SHA obtenido de la API oficial de GitHub. Sin persistencia de token. El deploy local verifica códigos de salida y limita chmod a los archivos transferidos.
3. `.htaccess`: defensa adicional para rutas ocultas (excepto `.well-known`), directorios internos, copias/configuraciones y redirecciones con dominio fijo. Desactivado filtro XSS obsoleto. No comprobado con Apache/LiteSpeed real; debe verificarse HTTP tras publicación.
4. Monitor: `limit=0`, sin imprimir respuestas potencialmente sensibles; errores DNS/timeout y respuestas inesperadas producen fallo. Esto acredita disponibilidad del endpoint, no un INSERT exitoso ni permisos correctos del formulario.
5. `.gitignore`: patrones de credenciales y scratch. No elimina contenido ya versionado. Bootstrap SQL no vuelve a crear listado público del bucket y refleja INSERT-only para anon; conserva advertencia explícita sobre su política authenticated histórica. No ejecutado.
6. CI con pruebas y validación de artefacto; Dependabot semanal para GitHub Actions. No agrega cobertura de dependencias CDN ni activa por sí mismo las alertas de seguridad remotas.

## Validación y bloqueo de publicación

- `node --test scripts/build-deploy.test.mjs scripts/security-monitor.test.mjs`: 3 pruebas pasan; incluyen exclusión de secretos/archivos locales, ausencia de residuos entre paquetes, recurso faltante y ocho escenarios del monitor (DNS, timeout, 500, 404, 429, 200, 401, 403). Ninguno envía tráfico real.
- Sintaxis Node y parser PowerShell correctos; `git diff --check` sin errores de whitespace. No se ejecutó el script de despliegue.
- La generación del artefacto del repositorio se detiene intencionalmente por los dos archivos de Express sin versionar (cuatro referencias ES/EN). No declarar el despliegue listo ni quitar el bloqueo para que pase CI.
- No hay revisión autenticada de Supabase, Hostinger, Google Cloud/Firebase, EmailJS ni GTM; tampoco auditoría de logs de intrusión, sesiones, backups o MFA. No se certifica que no haya ocurrido una intrusión. No se reescribió historial ni se revocaron credenciales.

## Orden de cierre recomendado

1. Revisar Supabase en Dashboard y recuperar disponibilidad; comprobar recepción real con una prueba acordada y comprobar alertas del monitor corregido. Resolver recursos de Express antes de publicar.
2. Revisar políticas reales con el SQL de solo lectura y acordar autorización del personal del ERP. Migrar entrada de formularios y adjuntos a controles de servidor; después cerrar acceso directo anónimo donde corresponda.
3. Publicar correcciones verificadas y activar protección de main, checks y alertas GitHub. Inventariar remotos internos antes de cualquier limpieza; no usar rsync --delete indiscriminado.
4. Revisar clave antigua Firebase, permisos GTM/EmailJS, credenciales Hostinger/SSH y passkeys/2FA de cuentas administrativas. Verificar recuperación y backups con restauración de prueba.
5. Fijar SDKs CDN con integridad y probar ambos recorridos comerciales. Limitar las credenciales de despliegue al sitio si el hosting lo permite.

La IA facilita automatizar abuso de formularios, phishing y cambios maliciosos de código. Los controles relevantes aquí son autorización de servidor, límites verificables, protección de cuentas/repositorio y actualización de dependencias. Textos de issues, documentos o adjuntos no deben autorizar a un agente a ejecutar comandos o revelar credenciales; los archivos de clientes deben tratarse como datos no confiables también al procesarlos con IA.

## Referencias

- [GitHub: uso seguro de Actions](https://docs.github.com/en/actions/reference/security/secure-use)
- [Supabase: seguridad de la API](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase: RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: límites y privacidad de buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals)
- [OWASP: carga de archivos](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [OWASP: JavaScript de terceros](https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html)
- [Firebase: claves de API](https://firebase.google.com/docs/projects/api-keys)

## Actualización tras restauración

Omar confirmó tabla existente, grant anon INSERT=true, dos políticas anon INSERT with_check=true y dos authenticated ALL USING(true), WITH CHECK nulo. Auth health responde 200; REST de lectura anónima ahora 401/42501, esperado para INSERT-only. Auth settings consultado de solo lectura devuelve disable_signup=false, email habilitado y confirmación de correo exigida. Prioridad alta: cerrar autorregistro si el ERP es interno y sustituir ambas políticas amplias por autorización real de personal. Verificar grants efectivos/políticas restrictivas, usuarios preexistentes y roles antes de migrar; no se probó explotación ni se accedió a cotizaciones. Contención y pruebas de envío siguen pendientes.

### Contención y restricción aplicadas por Omar

Registro público cerrado y verificado con Auth settings (disable_signup=true). Omar reportó retirada la cuenta de prueba y autorizó únicamente su cuenta para administrar cotizaciones. El resultado de scripts/restrict-cotizaciones-owner.sql confirma reemplazo de las dos políticas authenticated amplias por condiciones de UID propietario, PERMISSIVE más RESTRICTIVE, ambas con USING/WITH CHECK; dos políticas anon INSERT conservadas. Lectura anónima posterior sigue bloqueada (HTTP 401/42501). Pendiente comprobar panel con propietario y denegación efectiva con otro UID en prueba aislada; sin enviar formularios, leer clientes ni alterar Storage. Esta aplicación remota por Omar no equivale a publicación de los cambios locales del sitio/workflows.

### Prueba real del formulario publicada

Autorizada por Omar y completada el 6-oct a las 20:13 de Cancún. Marcador RTMX-SEG-20261006-A, datos ficticios y PNG de 1 píxel. UI confirmó Solicitud enviada con el mensaje normal; no hubo aviso de respaldo EmailJS ni archivo pendiente. El flujo de upload.js llega a ese estado tras aceptar carga e INSERT. Consola confirmó EmailJS notification sent successfully. Pendiente confirmación de entrega en bandeja y lectura administrativa del registro; no se eliminó la prueba. Evidencia en scratch/form-test-2026-10-06/solicitud-enviada.jpg.

Omar confirmó recepción del correo de prueba. El recorrido probado queda funcional tras restauración/restricción de políticas. La seguridad integral y demás pendientes del informe siguen abiertos.

### Bloqueo de Express resuelto localmente

Los dos recursos existentes fueron añadidos al índice Git; ES/EN ahora solicitan CSS v4 y JS v2. Constructor del artefacto pasa. Revisión local ES/EN a 320/1440 sin overflow, ES visual a 390/1440 y galería/FAQ por teclado correctas. Script estático Express y tres pruebas pasan. CSP local conserva frame-src Google que ya existía en producción. Pendiente commit/push/deploy y comprobación HTTP posterior; este bloque todavía no está publicado.

### Corrección de alcance de Express

Omar aclaró que el rediseño sigue sin autorización. Retirados los dos recursos del índice Git y revertidos solo los cache-bust propios; borrador preservado. Producción coincide con los HTML del rediseño incorporados anteriormente en 9f5b77f, commit del logo del 27-sep; no incluía los CSS/JS nuevos. La versión anterior al commit utiliza recursos existentes. Ningún despliegue realizado en esta sesión. Antes de publicar seguridad, resolver restauración de Express a versión aprobada; no completar el despliegue del borrador sin autorización.

### Restauración publicada

Omar autorizó recuperar la versión anterior aprobada. Commit 60c2b1b, deploy 37556665639 success. ES/EN HTTP 200 y coinciden con archivos restaurados; recursos de estilos/fuentes/hero HTTP 200. Borrador preservado en scratch/express-redesign-pending-2026-10-06/. Se publicaron solo dos HTML y bitácora; correcciones locales de seguridad siguen pendientes.
