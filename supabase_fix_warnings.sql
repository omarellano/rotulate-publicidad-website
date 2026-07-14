-- ============================================================
-- Correcciones para los avisos del linter de Supabase
-- (exportados el 14-jul-2026; aplicadas y verificadas ese día)
--
-- CÓMO USAR: pegar y ejecutar completo en Dashboard → SQL Editor.
-- Idempotente: cada sentencia que no aplique se omite y se
-- reporta con RAISE NOTICE en la pestaña Messages.
--
-- NOTA IMPORTANTE (aprendida al aplicarlo): el permiso EXECUTE
-- de las funciones viene del rol PUBLIC (default de Postgres).
-- Revocar solo a `anon` NO surte efecto — hay que revocar de
-- PUBLIC y devolver el permiso explícitamente a quien sí lo usa.
-- ============================================================

do $$
declare
  stmts text[] := array[
    -- 1. Fijar search_path (seguridad, no cambia comportamiento)
    'alter function public.set_next_orden_folio() set search_path = public',
    'alter function public.set_next_cotizacion_folio() set search_path = public',
    'alter function public.update_updated_at_column() set search_path = public',
    'alter function public.handle_new_user() set search_path = public',
    'alter function public.get_user_empresa_id() set search_path = public',
    'alter function public.has_role(text) set search_path = public',
    -- 2. Cerrar el acceso vía API a funciones internas (revocando de PUBLIC)
    -- has_role y get_user_empresa_id: solo el panel admin las usa en sus políticas RLS
    'revoke execute on function public.has_role(text) from public, anon',
    'grant execute on function public.has_role(text) to authenticated, service_role',
    'revoke execute on function public.get_user_empresa_id() from public, anon',
    'grant execute on function public.get_user_empresa_id() to authenticated, service_role',
    -- funciones de trigger: nadie debe llamarlas vía API
    -- (los triggers NO se rompen: Postgres no revalida EXECUTE al dispararlos)
    'revoke execute on function public.handle_new_user() from public, anon, authenticated',
    'revoke execute on function public.rls_auto_enable() from public, anon, authenticated'
  ];
  s text;
begin
  foreach s in array stmts loop
    begin
      execute s;
      raise notice 'OK: %', s;
    exception when others then
      raise notice 'OMITIDA (%): %', sqlerrm, s;
    end;
  end loop;
end $$;

-- 3. Quitar el listado público del bucket de archivos de cotizaciones.
-- Los buckets públicos sirven archivos por URL sin necesitar política
-- SELECT; el sitio usa getPublicUrl() y el panel lee las URLs de la tabla.
drop policy if exists "Allow public file reads" on storage.objects;

-- ── Avisos que NO se corrigen ─────────────────────────────────
-- • "Allow anonymous inserts to web table" (cotizaciones_web):
--   intencional — así entran los leads del formulario y el cotizador.
-- • "Allow all access to authenticated users on web table":
--   intencional — el panel admin gestiona los leads.
-- • "Leaked password protection": función de plan Pro; descartada
--   en plan free (riesgo bajo: solo el equipo del panel usa contraseñas).
