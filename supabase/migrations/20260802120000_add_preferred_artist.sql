-- Preferred artist (optional): free-text for now since the studio's real
-- artist lineup isn't confirmed yet (Artists page is still placeholder data,
-- see src/constants/artists.js). Swap to a foreign key once a real artists
-- table exists.
alter table public.inquiries add column if not exists preferred_artist text;
