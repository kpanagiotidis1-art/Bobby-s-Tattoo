-- Inquiries: customer-submitted tattoo inquiries from the homepage form.
-- Written by the submit-inquiry Edge Function (service role), which also
-- emails the studio and sends a confirmation to the customer. No RLS
-- policies are granted to anon/authenticated here on purpose — this table
-- is never readable or writable directly from the public API. The studio
-- reviews inquiries via the Supabase dashboard's Table Editor (project
-- members bypass RLS there), which matches the brief's "simple CMS to
-- start, expand later" approach.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  client_type text not null check (client_type in ('New Client', 'Returning Client')),
  date_of_birth date not null,

  tattoo_placement text not null,
  tattoo_size text not null,
  tattoo_description text not null,
  reference_image_paths text[] not null default '{}',
  tattoo_area_image_paths text[] not null default '{}',
  skin_conditions text,

  preferred_days text,
  desired_dates text,

  hear_about_us text[] not null default '{}',
  instagram_handle text,

  -- Tracks the studio's review of the inquiry — this status field is the
  -- whole point of an inquiry-not-booking system (client explicitly wants
  -- to review and decide before contacting anyone back).
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'declined'))
);

alter table public.inquiries enable row level security;

-- Consent forms: submitted in-studio via the QR code, before a tattoo
-- appointment. Same access model as inquiries — service role only, no
-- public read/write policies.
create table if not exists public.consent_forms (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  date_of_birth date not null,
  id_type text not null,
  id_number text not null,
  phone text not null,
  email text not null,
  address text not null,
  city text not null,
  state text not null,
  postcode text not null,
  -- Storage path within the private `consent-uploads` bucket, not the file
  -- itself — never store the actual ID image as a blob in the database.
  id_upload_path text not null,
  agrees_to_terms boolean not null,
  signature_name text not null,
  signature_date date not null,
  tattoo_artist text
);

alter table public.consent_forms enable row level security;

-- Storage buckets for uploaded files. Both private — reference/placement
-- photos and ID photos are never publicly readable via a guessable URL.
-- Studio staff browse uploads via the Supabase dashboard's Storage browser
-- (project-member access, not the public API/RLS path).
insert into storage.buckets (id, name, public)
values ('inquiry-uploads', 'inquiry-uploads', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('consent-uploads', 'consent-uploads', false)
on conflict (id) do nothing;

-- No storage.objects policies for anon/authenticated: uploads are written
-- by the Edge Functions using the service role, which bypasses RLS.
