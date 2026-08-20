
-- 1) Hero: background image URL
ALTER TABLE public.hero ADD COLUMN IF NOT EXISTS background_image_url text NOT NULL DEFAULT '';

-- 2) Enquiries (consultation form submissions)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  org text NOT NULL DEFAULT '',
  project text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  budget text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (including non-signed-in visitors) can submit an enquiry
CREATE POLICY "public insert enquiries" ON public.enquiries
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only admins can read / update / delete submissions
CREATE POLICY "admin read enquiries" ON public.enquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update enquiries" ON public.enquiries
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete enquiries" ON public.enquiries
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON public.enquiries (created_at DESC);
