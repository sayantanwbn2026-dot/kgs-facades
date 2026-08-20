-- ============================================================
-- Site settings — landing page section order & visibility
-- A singleton row holding a jsonb array of { key, visible } that
-- drives the order (and show/hide) of the homepage sections.
-- Hero and Footer are structural and not part of this list.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  landing_order jsonb not null default '[
    {"key":"partners","visible":true},
    {"key":"features","visible":true},
    {"key":"statement","visible":true},
    {"key":"expertise","visible":true},
    {"key":"projects","visible":true},
    {"key":"process","visible":true},
    {"key":"manufacturing","visible":true},
    {"key":"why","visible":true},
    {"key":"contact","visible":true}
  ]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "admin insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update site_settings" ON public.site_settings FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete site_settings" ON public.site_settings FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed the singleton row so the site has an order to read immediately.
INSERT INTO public.site_settings (singleton) VALUES (true)
ON CONFLICT (singleton) DO NOTHING;

-- ============================================================
-- Hero — optional uploaded logo mark (edited in the admin "Hero"
-- panel). Empty = the built-in monogram renders. The site already
-- handles the empty case in code; this column makes it savable.
-- ============================================================
ALTER TABLE public.hero
  ADD COLUMN IF NOT EXISTS logo_url text NOT NULL DEFAULT '';
