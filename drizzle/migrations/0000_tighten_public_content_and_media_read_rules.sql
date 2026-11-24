DROP POLICY IF EXISTS "public read materials_intro" ON public.materials_intro;
CREATE POLICY "public read materials_intro" ON public.materials_intro FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "clients_page public read" ON public.clients_page;
CREATE POLICY "clients_page public read" ON public.clients_page FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read expertise_intro" ON public.expertise_intro;
CREATE POLICY "public read expertise_intro" ON public.expertise_intro FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read contact" ON public.contact;
CREATE POLICY "public read contact" ON public.contact FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read features_intro" ON public.features_intro;
CREATE POLICY "public read features_intro" ON public.features_intro FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read footer" ON public.footer;
CREATE POLICY "public read footer" ON public.footer FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read hero" ON public.hero;
CREATE POLICY "public read hero" ON public.hero FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read manufacturing" ON public.manufacturing;
CREATE POLICY "public read manufacturing" ON public.manufacturing FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read process_intro" ON public.process_intro;
CREATE POLICY "public read process_intro" ON public.process_intro FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read projects_intro" ON public.projects_intro;
CREATE POLICY "public read projects_intro" ON public.projects_intro FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read site_settings" ON public.site_settings;
CREATE POLICY "public read site_settings" ON public.site_settings FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read statement" ON public.statement;
CREATE POLICY "public read statement" ON public.statement FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "public read why_intro" ON public.why_intro;
CREATE POLICY "public read why_intro" ON public.why_intro FOR SELECT USING (singleton IS TRUE);

DROP POLICY IF EXISTS "media public read" ON storage.objects;
DROP POLICY IF EXISTS "public read media" ON storage.objects;

CREATE POLICY "admin read media" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::public.app_role));