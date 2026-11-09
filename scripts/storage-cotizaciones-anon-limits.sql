-- ============================================================
-- Adjuntos del formulario web: límites para el rol anónimo
-- Proyecto wtljdvexsksextnhpkkd — bucket `cotizaciones`
--
-- CÓMO USAR: Dashboard → SQL Editor. Ejecutar el PASO 1 y leer el
-- resultado ANTES de ejecutar el PASO 2. El PASO 3 es opcional.
--
-- Qué resuelve: hoy el límite a PNG/JPG solo vive en el navegador
-- (upload.js); una petición directa a la API puede subir cualquier
-- archivo como anónimo. El PASO 2 pone ese límite en el servidor.
--
-- Qué NO resuelve: el bucket sigue siendo público (quien tenga la URL
-- completa puede abrir el archivo). Hacerlo privado requiere cambiar
-- el ERP y los enlaces del correo; es una decisión aparte.
--
-- Compatibilidad: el PASO 2 solo afecta al rol `anon` (visitantes del
-- sitio). El ERP usa usuarios autenticados y no cambia.
-- ============================================================

-- ── PASO 1. Diagnóstico (solo lectura, sin datos de clientes) ──
-- a) Configuración actual del bucket
select id, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'cotizaciones';

-- b) Qué tipos de archivo hay hoy y de qué tamaño (sin nombres)
select coalesce(metadata->>'mimetype', '(sin tipo)') as tipo,
       count(*) as archivos,
       pg_size_pretty(max((metadata->>'size')::bigint)) as mas_grande
from storage.objects
where bucket_id = 'cotizaciones'
group by 1
order by 2 desc;

-- c) Políticas actuales sobre storage.objects
select policyname, permissive, roles, cmd
from pg_policies
where schemaname = 'storage' and tablename = 'objects'
order by policyname;


-- ── PASO 2. Anónimos: solo PNG/JPG en `cotizaciones` ──────────
-- Política RESTRICTIVA: se suma (AND) a las permisivas que ya existan,
-- sin importar cómo se llamen. No afecta a otros buckets ni a usuarios
-- autenticados.
begin;

drop policy if exists "Anon solo imagenes en cotizaciones" on storage.objects;
create policy "Anon solo imagenes en cotizaciones"
on storage.objects
as restrictive
for insert
to anon
with check (
    bucket_id <> 'cotizaciones'
    or lower(storage.extension(name)) in ('png', 'jpg', 'jpeg')
);

commit;

-- Verificación: debe aparecer la política nueva como RESTRICTIVE / INSERT / {anon}
select policyname, permissive, roles, cmd
from pg_policies
where schemaname = 'storage' and tablename = 'objects'
  and policyname = 'Anon solo imagenes en cotizaciones';


-- ── PASO 3 (OPCIONAL). Tope de tamaño para TODO el bucket ─────
-- Aplica también al ERP. Ejecutar solo si en el PASO 1.b ningún archivo
-- supera 25 MB y el ERP no necesita subir archivos más grandes.
--
-- update storage.buckets
-- set file_size_limit = 26214400   -- 25 MB
-- where id = 'cotizaciones';
