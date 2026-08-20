
-- Add logo to partners
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS logo_url text;

-- Clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text,
  logo_url text,
  tagline text,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.clients TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clients public read" ON public.clients FOR SELECT USING (true);
CREATE POLICY "clients admin insert" ON public.clients FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "clients admin update" ON public.clients FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "clients admin delete" ON public.clients FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_clients_updated BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Client projects table
CREATE TABLE IF NOT EXISTS public.client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text,
  year text,
  status text,
  system_description text,
  scope text,
  area text,
  kgs_role text,
  valuation text,
  fee text,
  description text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.client_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_projects TO authenticated;
GRANT ALL ON public.client_projects TO service_role;
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client_projects public read" ON public.client_projects FOR SELECT USING (true);
CREATE POLICY "client_projects admin insert" ON public.client_projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client_projects admin update" ON public.client_projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "client_projects admin delete" ON public.client_projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_client_projects_updated BEFORE UPDATE ON public.client_projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX IF NOT EXISTS client_projects_client_id_idx ON public.client_projects(client_id);

-- Clients page singleton
CREATE TABLE IF NOT EXISTS public.clients_page (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true,
  crumb text,
  hero_eyebrow text,
  hero_title text,
  hero_highlight text,
  hero_subtitle text,
  stat1_value text, stat1_label text,
  stat2_value text, stat2_label text,
  stat3_value text, stat3_label text,
  cta_title text,
  cta_copy text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.clients_page TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients_page TO authenticated;
GRANT ALL ON public.clients_page TO service_role;
ALTER TABLE public.clients_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clients_page public read" ON public.clients_page FOR SELECT USING (true);
CREATE POLICY "clients_page admin insert" ON public.clients_page FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "clients_page admin update" ON public.clients_page FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "clients_page admin delete" ON public.clients_page FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_clients_page_updated BEFORE UPDATE ON public.clients_page FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
