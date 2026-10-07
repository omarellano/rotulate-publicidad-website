-- Read-only audit. Run in Supabase SQL Editor; do not send customer records.
-- This project is shared with the ERP: review actual roles before any migration.
select n.nspname as schema_name, c.relname as table_name,
       c.relrowsecurity as rls_enabled, c.relforcerowsecurity as rls_forced
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind in ('r', 'p')
order by c.relname;

select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies where schemaname in ('public', 'storage')
order by schemaname, tablename, policyname;

select grantee, table_schema, table_name, privilege_type
from information_schema.table_privileges
where table_schema in ('public', 'storage')
  and grantee in ('PUBLIC', 'anon', 'authenticated')
order by table_schema, table_name, grantee, privilege_type;

select id, public, file_size_limit, allowed_mime_types
from storage.buckets order by id;

select n.nspname, p.proname, p.prosecdef as security_definer,
       p.proconfig,
       has_function_privilege('anon', p.oid, 'EXECUTE') as anon_execute,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as authenticated_execute
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
order by p.proname;
