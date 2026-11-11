# Opiniones de Google automáticas — configuración

El workflow `.github/workflows/google-reviews.yml` corre a diario (6:17 a. m. Cancún) y con
`scripts/update-google-reviews.mjs` actualiza desde la API oficial de Google Business Profile:

- la calificación y el número de opiniones (`<span data-gr="rating">` / `<span data-gr="count">`
  en home, `/en/`, Tulum, Playa del Carmen y el blog de costo vehicular, más el `aria-label` del badge);
- las tarjetas de `#testimonios` en `index.html` (entre `<!-- google-reviews:start -->` y `<!-- google-reviews:end -->`):
  las **6 opiniones más recientes con texto y 4★ o más**, en su idioma original.

Si hay cambios, hace commit en `main` y lanza `Deploy to Hostinger`. Sin los secrets, se omite sin fallar.
No usa código externo en el sitio (sin widget, sin cookies, sin cambios de CSP).

## Pasos (una sola vez, con la cuenta dueña del perfil de Google)

1. **Proyecto en Google Cloud:** https://console.cloud.google.com → crear proyecto (p. ej. `rotulate-opiniones`).
2. **Solicitar acceso a la API de Business Profile:** formulario enlazado en
   https://developers.google.com/my-business/content/prereqs (pide el número del proyecto). Google responde
   por correo; mientras no aprueben, la cuota es 0 y el workflow falla con error 403/429.
3. **Habilitar APIs** (APIs y servicios → Biblioteca): *Google My Business API*,
   *My Business Account Management API* y *My Business Business Information API*.
4. **Pantalla de consentimiento OAuth:** tipo Externo, agregar el scope
   `https://www.googleapis.com/auth/business.manage` y tu correo como usuario de prueba.
   Después **Publicar la app (En producción)**: en modo prueba el token caduca a los 7 días.
   No hace falta verificación de Google para uso propio (solo verás un aviso de "app no verificada").
5. **Credenciales → Crear ID de cliente OAuth → Aplicación web.** URI de redirección autorizado:
   `https://developers.google.com/oauthplayground`. Guarda el Client ID y el Client secret.
6. **Refresh token:** en https://developers.google.com/oauthplayground → engrane → *Use your own OAuth credentials*
   (pegar Client ID/secret) → en el paso 1 escribir el scope `https://www.googleapis.com/auth/business.manage`
   → *Authorize APIs* con la cuenta dueña del perfil → *Exchange authorization code for tokens* → copiar el **Refresh token**.
7. **Secrets en GitHub** (repo → Settings → Secrets and variables → Actions → New repository secret):
   `GBP_CLIENT_ID`, `GBP_CLIENT_SECRET`, `GBP_REFRESH_TOKEN`.
8. **IDs de cuenta y ubicación:** Actions → *Google Reviews Sync* → *Run workflow* con la casilla
   *Solo listar IDs* marcada. El log muestra `Cuenta <número>` y `Ubicación <número>  Rotulate...`.
   Crear los secrets `GBP_ACCOUNT_ID` y `GBP_LOCATION_ID` con esos números.
9. **Primera sincronización:** *Run workflow* sin la casilla. Debe terminar con
   `Google: 4.7★ con N opiniones; 6 tarjetas` y lanzar el deploy.

## Notas
- Si `main` llega a tener protección de rama, el `git push` del workflow fallará: permitir a GitHub Actions o quitar la regla.
- Si el refresh token se revoca (cambio de contraseña, revocar acceso), repetir el paso 6 y actualizar `GBP_REFRESH_TOKEN`.
- Si una sincronización falla, GitHub envía correo al dueño del repo; el sitio conserva los últimos datos publicados.
- Los cambios del filtro (número de tarjetas, estrellas mínimas) están en `MAX_CARDS` y `MIN_STARS` del script.
