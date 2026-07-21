-- Adds "PMU / Cosmetic Tattoo Client" as a third clientType option, per the
-- client 2026-07-20. Existing migrations are never edited after being
-- applied — this alters the constraint instead.
alter table public.inquiries
  drop constraint inquiries_client_type_check;

alter table public.inquiries
  add constraint inquiries_client_type_check
  check (client_type in ('New Client', 'Returning Client', 'PMU / Cosmetic Tattoo Client'));
