-- Run the entire file in Supabase SQL Editor for wtljdvexsksextnhpkkd.
-- Authorized by Omar: only his existing account manages website quotations.
-- No customer records are modified. Anonymous INSERT policies are preserved.
begin;

do $$
declare
    owner_id uuid;
begin
    -- Fail closed if the account is absent, duplicated, or has been replaced.
    select id into strict owner_id
    from auth.users
    where lower(email) = 'omar.arellano.mx@gmail.com';

    if owner_id <> '705862ca-2815-45da-b709-e7778d9120bc'::uuid then
        raise exception 'El usuario no coincide con el UID verificado. No aplicar cambios.';
    end if;

    alter table public.cotizaciones_web enable row level security;

    drop policy if exists "Allow all access to authenticated users on web table"
        on public.cotizaciones_web;
    drop policy if exists "Allow all access to authenticated users"
        on public.cotizaciones_web;
    drop policy if exists "Owner manages web quotations"
        on public.cotizaciones_web;
    drop policy if exists "Owner required for authenticated access"
        on public.cotizaciones_web;

    execute format(
        'create policy "Owner manages web quotations" on public.cotizaciones_web
         as permissive for all to authenticated
         using ((select auth.uid()) = %L::uuid)
         with check ((select auth.uid()) = %L::uuid)', owner_id, owner_id);

    -- A restrictive policy prevents another permissive policy from bypassing
    -- the owner check. It applies only to authenticated, not anonymous visitors.
    execute format(
        'create policy "Owner required for authenticated access" on public.cotizaciones_web
         as restrictive for all to authenticated
         using ((select auth.uid()) = %L::uuid)
         with check ((select auth.uid()) = %L::uuid)', owner_id, owner_id);

    grant select, insert, update, delete on public.cotizaciones_web to authenticated;
    -- TRUNCATE is not constrained by row-level security.
    revoke truncate, references, trigger on public.cotizaciones_web from authenticated;

    if has_table_privilege('authenticated', 'public.cotizaciones_web', 'TRUNCATE') then
        raise exception 'TRUNCATE heredado: revisar permisos antes de continuar.';
    end if;
    if not has_table_privilege('anon', 'public.cotizaciones_web', 'INSERT') then
        raise exception 'Falta INSERT anónimo: revisar el formulario antes de continuar.';
    end if;
end $$;

commit;

-- Expected: two existing anon INSERT policies plus two owner policies,
-- one PERMISSIVE and one RESTRICTIVE. Neither owner condition should be true.
select policyname, permissive, roles, cmd, qual as condicion_acceso, with_check
from pg_policies
where schemaname = 'public' and tablename = 'cotizaciones_web'
order by policyname;
