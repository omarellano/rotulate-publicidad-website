-- ============================================================
-- Correcciones para los avisos del linter de Supabase
-- (supabase/warnings_supabase.txt, exportado 14-jul-2026)
--
-- CÓMO USAR: pegar y ejecutar en Supabase Dashboard → SQL Editor.
-- Es seguro correrlo completo de una vez. Diseñado para NO romper
-- ni el sitio público (formulario/cotizador) ni el panel admin
-- (rtmx-cotizador), que comparten este proyecto.
-- ============================================================

-- ── 1. function_search_path_mutable (6 funciones) ───────────
-- Fija el search_path para que nadie pueda desviar las funciones
-- a otro esquema. No cambia su comportamiento.
ALTER FUNCTION public.set_next_orden_folio() SET search_path = public;
ALTER FUNCTION public.set_next_cotizacion_folio() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.get_user_empresa_id() SET search_path = public;
ALTER FUNCTION public.has_role(text) SET search_path = public;

-- ── 2. SECURITY DEFINER ejecutables vía API ──────────────────
-- Funciones de trigger: nunca deben llamarse por REST. Se revoca
-- a todos los roles de API (los triggers siguen funcionando igual,
-- porque corren internamente, no vía RPC).
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon, authenticated;

-- Funciones de apoyo del panel admin: el rol authenticated las
-- necesita (las usan las políticas RLS del panel), pero anon no
-- tiene por qué poder llamarlas.
REVOKE EXECUTE ON FUNCTION public.get_user_empresa_id() FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(text) FROM anon;

-- ── 3. Bucket público listable (el aviso más importante) ─────
-- Hoy cualquiera puede LISTAR todos los archivos que los clientes
-- suben con sus cotizaciones. Los buckets públicos NO necesitan
-- política SELECT para servir archivos por URL pública: el sitio
-- usa getPublicUrl() y el panel admin lee las URLs guardadas en la
-- tabla, así que quitar el listado no rompe nada.
DROP POLICY IF EXISTS "Allow public file reads" ON storage.objects;

-- ── 4. Avisos que NO se corrigen (intencionales) ─────────────
-- • "Allow anonymous inserts to web table" (cotizaciones_web):
--   necesario — así entran los leads del formulario y el cotizador.
-- • "Allow all access to authenticated users on web table":
--   por diseño — el panel admin (usuarios autenticados) gestiona
--   los leads. Si algún día hay usuarios autenticados que NO deban
--   ver leads, restringir con has_role().

-- ── 5. Pendiente en el Dashboard (no es SQL) ─────────────────
-- Authentication → Sign In / Providers → habilitar
-- "Leaked password protection" (verifica contraseñas contra
-- HaveIBeenPwned). Un clic, sin efectos secundarios.
