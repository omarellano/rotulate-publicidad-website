-- ============================================================
-- Tabla mínima para el keep-alive de Supabase — Rotulate Publicidad
--
-- CÓMO USAR: con el proyecto ya restaurado, pegar y ejecutar completo
-- en Dashboard → SQL Editor (proyecto wtljdvexsksextnhpkkd).
--
-- Por qué: el monitor anterior pedía leer cotizaciones_web como anon y
-- recibía 401 (lectura prohibida a propósito). El proyecto se pausó igual
-- tras 14 días de esos pings. Esta tabla permite una consulta real que
-- responde 200, sin exponer ningún dato de clientes.
--
-- No toca cotizaciones_web ni ninguna tabla del ERP.
-- ============================================================

begin;

-- Una sola fila posible (id = 1), sin datos personales.
create table if not exists public.keepalive (
    id smallint primary key default 1 check (id = 1),
    nota text not null default 'ping'
);

insert into public.keepalive (id) values (1)
on conflict (id) do nothing;

alter table public.keepalive enable row level security;

-- anon solo puede leer; nadie escribe por la API.
revoke all on public.keepalive from anon, authenticated;
grant select on public.keepalive to anon;

drop policy if exists "Keepalive lectura anonima" on public.keepalive;
create policy "Keepalive lectura anonima"
on public.keepalive
for select
to anon
using (true);

commit;

-- Verificación: debe mostrar únicamente SELECT para anon...
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public' and table_name = 'keepalive'
order by grantee, privilege_type;

-- ...y una sola política, de SELECT para anon.
select policyname, roles, cmd
from pg_policies
where schemaname = 'public' and tablename = 'keepalive';
