-- Sub-page header photographs become CMS-editable. Each page singleton gets a
-- hero_image_url; empty string keeps the bundled fallback the route ships with,
-- so nothing changes visually until an image is actually chosen in the admin.
alter table public.about_page     add column if not exists hero_image_url text not null default '';
alter table public.projects_page  add column if not exists hero_image_url text not null default '';
alter table public.process_page   add column if not exists hero_image_url text not null default '';
alter table public.expertise_page add column if not exists hero_image_url text not null default '';
alter table public.clients_page   add column if not exists hero_image_url text not null default '';
