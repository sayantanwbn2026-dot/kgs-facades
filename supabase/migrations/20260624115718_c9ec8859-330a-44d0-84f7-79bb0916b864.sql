
-- Extend clients with richer profile fields for detail pages
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS sector text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS hero_image_url text,
  ADD COLUMN IF NOT EXISTS established_year text,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS about_long text,
  ADD COLUMN IF NOT EXISTS partnership_since text;

-- Extend client_projects with case-study fields
ALTER TABLE public.client_projects
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS hero_image_url text,
  ADD COLUMN IF NOT EXISTS gallery_urls text,
  ADD COLUMN IF NOT EXISTS testimonial_quote text,
  ADD COLUMN IF NOT EXISTS testimonial_author text,
  ADD COLUMN IF NOT EXISTS testimonial_role text,
  ADD COLUMN IF NOT EXISTS awards text,
  ADD COLUMN IF NOT EXISTS completion_date text,
  ADD COLUMN IF NOT EXISTS duration text,
  ADD COLUMN IF NOT EXISTS sqft_value text;

-- Ensure unique-by-slug for client routing (allow nulls)
CREATE UNIQUE INDEX IF NOT EXISTS clients_slug_unique_idx ON public.clients (slug) WHERE slug IS NOT NULL;
