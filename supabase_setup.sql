-- ============================================================
-- SQL Setup for Supabase — Rotúlate Publicidad
-- Run this in the Supabase SQL Editor (https://supabase.com)
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
-- Allow anyone (public/anonymous) to INSERT leads from the website form
create policy "Allow anonymous inserts" 
on public.cotizaciones_web 
for insert 
to anon 
with check (true);

-- Allow authenticated users (admin, staff dashboard) to view/edit/delete leads
create policy "Allow all access to authenticated users" 
on public.cotizaciones_web 
for all 
to authenticated 
using (true);

-- 4. Create storage policies (Ensure a bucket named 'cotizaciones' is created in Supabase Storage)
-- Allow anyone to upload files to the 'cotizaciones' bucket
create policy "Allow public file uploads"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'cotizaciones'
);

-- Allow anyone to view/download files in the 'cotizaciones' bucket
create policy "Allow public file reads"
on storage.objects
for select
to anon
using (
  bucket_id = 'cotizaciones'
);

