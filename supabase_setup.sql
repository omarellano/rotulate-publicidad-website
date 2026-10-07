-- ============================================================
-- SQL Setup for Supabase — Rotúlate Publicidad
-- HISTORICAL BOOTSTRAP, NOT a production security migration.
-- Audit current grants, staff roles and bucket settings first with
-- scripts/audit-supabase-readonly.sql. The ERP shares this project.
-- ============================================================

-- 1. Create the 'cotizaciones_web' table (Tabla activa de producción)
create table if not exists public.cotizaciones_web (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  email text not null,
  telefono text,
  servicio text not null,
  mensaje text,
  archivos jsonb default '[]'::jsonb, -- Array of files: [{name: "...", url: "..."}]
  estado text default 'nuevo'::text,
  fecha timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS) on the table
alter table public.cotizaciones_web enable row level security;

-- 3. Create RLS Policies for the table
-- Match the INSERT-only anon grants applied in production in August 2026.
revoke all on public.cotizaciones_web from anon;
grant insert on public.cotizaciones_web to anon;
-- Allow anyone (public/anonymous) to INSERT leads from the website form
create policy "Allow anonymous inserts" 
on public.cotizaciones_web 
for insert 
to anon 
with check (true);

-- Do not grant all signed-in users access to customer records.
-- Configure the authorized owner separately using
-- scripts/restrict-cotizaciones-owner.sql after verifying the existing account.

-- 4. Create storage policies (Ensure a bucket named 'cotizaciones' is created in Supabase Storage)
-- Allow anyone to upload files to the 'cotizaciones' bucket
create policy "Allow public file uploads"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'cotizaciones'
);

-- Do not recreate the anonymous listing policy removed in July 2026.
-- Public bucket URLs remain accessible to anyone who knows the URL.
-- Private bucket + authorized signed URLs requires coordinated frontend/ERP work.
