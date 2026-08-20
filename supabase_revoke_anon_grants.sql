-- ============================================================
-- Limpieza de GRANTs sobrantes del rol `anon` en cotizaciones_web
-- (pendiente anotado el 10-ago-2026, ver agents.md)
--
-- CÓMO USAR: pegar y ejecutar completo en Dashboard → SQL Editor.
--
-- Contexto: `anon` tenía GRANT de SELECT/UPDATE/DELETE/TRUNCATE a
-- nivel de tabla en cotizaciones_web (heredado del comportamiento
-- por defecto de Supabase al crear tablas). No era explotable hoy
-- porque no existen policies RLS para esos comandos (RLS bloquea
-- aunque el GRANT lo permita), pero es más limpio dejar solo el
-- permiso que el sitio realmente usa: INSERT (ver upload.js:259-260,
-- que hace .from('cotizaciones_web').insert([leadData]) y nada más).
-- ============================================================

-- 1. Diagnóstico: ver los grants actuales antes de tocar nada
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'cotizaciones_web'
  and grantee = 'anon'
order by privilege_type;

-- 2. Revocar todo y volver a otorgar solo INSERT a `anon`
revoke all on public.cotizaciones_web from anon;
grant insert on public.cotizaciones_web to anon;

-- 3. Verificación: debe mostrar únicamente INSERT para anon
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'cotizaciones_web'
  and grantee = 'anon'
order by privilege_type;

-- Nota: no toca la tabla `cotizaciones` (la del ERP/admin panel,
-- rtmx-cotizador) ni los grants de `authenticated` — esos siguen
-- gestionando el panel admin vía la policy "Allow all access to
-- authenticated users".
