
-- ============ Extend existing list tables ============
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS scope text DEFAULT '',
  ADD COLUMN IF NOT EXISTS area text DEFAULT '',
  ADD COLUMN IF NOT EXISTS tag text DEFAULT 'Commercial',
  ADD COLUMN IF NOT EXISTS full_description text DEFAULT '';

ALTER TABLE public.expertise_items
  ADD COLUMN IF NOT EXISTS short_description text DEFAULT '',
  ADD COLUMN IF NOT EXISTS body text DEFAULT '',
  ADD COLUMN IF NOT EXISTS spec1_key text DEFAULT '', ADD COLUMN IF NOT EXISTS spec1_value text DEFAULT '',
  ADD COLUMN IF NOT EXISTS spec2_key text DEFAULT '', ADD COLUMN IF NOT EXISTS spec2_value text DEFAULT '',
  ADD COLUMN IF NOT EXISTS spec3_key text DEFAULT '', ADD COLUMN IF NOT EXISTS spec3_value text DEFAULT '',
  ADD COLUMN IF NOT EXISTS spec4_key text DEFAULT '', ADD COLUMN IF NOT EXISTS spec4_value text DEFAULT '';

ALTER TABLE public.process_steps
  ADD COLUMN IF NOT EXISTS weeks text DEFAULT '',
  ADD COLUMN IF NOT EXISTS deliverable1 text DEFAULT '',
  ADD COLUMN IF NOT EXISTS deliverable2 text DEFAULT '',
  ADD COLUMN IF NOT EXISTS deliverable3 text DEFAULT '';

-- ============ Singleton page tables ============

-- Projects page
CREATE TABLE IF NOT EXISTS public.projects_page (
  id uuid primary key default gen_random_uuid(),
  crumb text default 'Projects',
  hero_eyebrow text default '',
  hero_title text default '',
  hero_highlight text default '',
  hero_subtitle text default '',
  stat1_value text default '', stat1_label text default '',
  stat2_value text default '', stat2_label text default '',
  stat3_value text default '', stat3_label text default '',
  stat4_value text default '', stat4_label text default '',
  cta_title text default '', cta_copy text default '',
  modal_blurb text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.projects_page TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects_page TO authenticated;
GRANT ALL ON public.projects_page TO service_role;
ALTER TABLE public.projects_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read projects_page" ON public.projects_page FOR SELECT USING (true);
CREATE POLICY "admin insert projects_page" ON public.projects_page FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update projects_page" ON public.projects_page FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete projects_page" ON public.projects_page FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_projects_page_updated BEFORE UPDATE ON public.projects_page FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Process page
CREATE TABLE IF NOT EXISTS public.process_page (
  id uuid primary key default gen_random_uuid(),
  crumb text default 'Process',
  hero_eyebrow text default '',
  hero_title text default '',
  hero_highlight text default '',
  hero_subtitle text default '',
  timeline_eyebrow text default '',
  timeline_heading text default '',
  deliverables_eyebrow text default '',
  deliverables_heading text default '',
  cta_title text default '',
  cta_copy text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.process_page TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.process_page TO authenticated;
GRANT ALL ON public.process_page TO service_role;
ALTER TABLE public.process_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read process_page" ON public.process_page FOR SELECT USING (true);
CREATE POLICY "admin insert process_page" ON public.process_page FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update process_page" ON public.process_page FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete process_page" ON public.process_page FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_process_page_updated BEFORE UPDATE ON public.process_page FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Expertise page
CREATE TABLE IF NOT EXISTS public.expertise_page (
  id uuid primary key default gen_random_uuid(),
  crumb text default 'Expertise',
  hero_eyebrow text default '',
  hero_title text default '',
  hero_highlight text default '',
  hero_subtitle text default '',
  tabs_eyebrow text default '',
  tabs_heading text default '',
  tabs_heading_accent text default '',
  matrix_eyebrow text default '',
  matrix_heading text default '',
  cta_title text default '',
  cta_copy text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.expertise_page TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.expertise_page TO authenticated;
GRANT ALL ON public.expertise_page TO service_role;
ALTER TABLE public.expertise_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read expertise_page" ON public.expertise_page FOR SELECT USING (true);
CREATE POLICY "admin insert expertise_page" ON public.expertise_page FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update expertise_page" ON public.expertise_page FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete expertise_page" ON public.expertise_page FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_expertise_page_updated BEFORE UPDATE ON public.expertise_page FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- About page
CREATE TABLE IF NOT EXISTS public.about_page (
  id uuid primary key default gen_random_uuid(),
  crumb text default 'About',
  hero_eyebrow text default '',
  hero_title text default '',
  hero_highlight text default '',
  hero_subtitle text default '',
  philosophy_eyebrow text default '',
  philosophy_heading text default '',
  paragraph1 text default '',
  paragraph2 text default '',
  paragraph3 text default '',
  philosophy_image_url text default '',
  stat1_value integer default 0, stat1_suffix text default '', stat1_label text default '',
  stat2_value integer default 0, stat2_suffix text default '', stat2_label text default '',
  stat3_value integer default 0, stat3_suffix text default '', stat3_label text default '',
  stat4_value integer default 0, stat4_suffix text default '', stat4_label text default '',
  timeline_eyebrow text default '', timeline_heading text default '',
  leadership_eyebrow text default '', leadership_heading text default '', leadership_intro text default '',
  factory_image_url text default '', factory_label text default '', factory_name text default '',
  certifications_eyebrow text default '', certifications_heading text default '', certifications_intro text default '',
  cta_title text default '', cta_copy text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.about_page TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.about_page TO authenticated;
GRANT ALL ON public.about_page TO service_role;
ALTER TABLE public.about_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read about_page" ON public.about_page FOR SELECT USING (true);
CREATE POLICY "admin insert about_page" ON public.about_page FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update about_page" ON public.about_page FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete about_page" ON public.about_page FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_about_page_updated BEFORE UPDATE ON public.about_page FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ List tables ============

CREATE TABLE IF NOT EXISTS public.process_principles (
  id uuid primary key default gen_random_uuid(),
  key text default '', value text default '',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.process_principles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.process_principles TO authenticated;
GRANT ALL ON public.process_principles TO service_role;
ALTER TABLE public.process_principles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read process_principles" ON public.process_principles FOR SELECT USING (true);
CREATE POLICY "admin insert process_principles" ON public.process_principles FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update process_principles" ON public.process_principles FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete process_principles" ON public.process_principles FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_process_principles_updated BEFORE UPDATE ON public.process_principles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.expertise_compare (
  id uuid primary key default gen_random_uuid(),
  capability text default '', glass text default '', tolerance text default '', use_case text default '',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.expertise_compare TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.expertise_compare TO authenticated;
GRANT ALL ON public.expertise_compare TO service_role;
ALTER TABLE public.expertise_compare ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read expertise_compare" ON public.expertise_compare FOR SELECT USING (true);
CREATE POLICY "admin insert expertise_compare" ON public.expertise_compare FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update expertise_compare" ON public.expertise_compare FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete expertise_compare" ON public.expertise_compare FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_expertise_compare_updated BEFORE UPDATE ON public.expertise_compare FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.about_timeline (
  id uuid primary key default gen_random_uuid(),
  year text default '', title text default '', description text default '',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.about_timeline TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.about_timeline TO authenticated;
GRANT ALL ON public.about_timeline TO service_role;
ALTER TABLE public.about_timeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read about_timeline" ON public.about_timeline FOR SELECT USING (true);
CREATE POLICY "admin insert about_timeline" ON public.about_timeline FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update about_timeline" ON public.about_timeline FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete about_timeline" ON public.about_timeline FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_about_timeline_updated BEFORE UPDATE ON public.about_timeline FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.about_leadership (
  id uuid primary key default gen_random_uuid(),
  name text default '', role text default '', bio text default '', image_url text default '',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.about_leadership TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.about_leadership TO authenticated;
GRANT ALL ON public.about_leadership TO service_role;
ALTER TABLE public.about_leadership ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read about_leadership" ON public.about_leadership FOR SELECT USING (true);
CREATE POLICY "admin insert about_leadership" ON public.about_leadership FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update about_leadership" ON public.about_leadership FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete about_leadership" ON public.about_leadership FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_about_leadership_updated BEFORE UPDATE ON public.about_leadership FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.about_certifications (
  id uuid primary key default gen_random_uuid(),
  label text default '',
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
GRANT SELECT ON public.about_certifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.about_certifications TO authenticated;
GRANT ALL ON public.about_certifications TO service_role;
ALTER TABLE public.about_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read about_certifications" ON public.about_certifications FOR SELECT USING (true);
CREATE POLICY "admin insert about_certifications" ON public.about_certifications FOR INSERT WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin update about_certifications" ON public.about_certifications FOR UPDATE USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "admin delete about_certifications" ON public.about_certifications FOR DELETE USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_about_certifications_updated BEFORE UPDATE ON public.about_certifications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ Seed page singletons (once) ============

INSERT INTO public.projects_page (hero_eyebrow, hero_title, hero_highlight, hero_subtitle,
  stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label, stat4_value, stat4_label,
  cta_title, cta_copy, modal_blurb)
SELECT '03 — Portfolio', 'A portfolio of', 'precision-engineered envelopes.',
  'From frameless residential glazing to landmark unitised curtain walls — every project documents a single chain of accountability from concept to handover.',
  '100+','Projects delivered','8M+ sqft','Facade area engineered','25+','Years in practice','12','Indian cities',
  'Have a tower, campus, or residence in design?',
  'Send the brief — our engineering team will return with a feasibility note, system options and indicative tolerances within two working days.',
  'Engineered, fabricated and installed by KGS. Delivered with full BIM coordination, mockup-verified system selection and ±0.5mm fabrication tolerances.'
WHERE NOT EXISTS (SELECT 1 FROM public.projects_page);

INSERT INTO public.process_page (hero_eyebrow, hero_title, hero_highlight, hero_subtitle,
  timeline_eyebrow, timeline_heading, deliverables_eyebrow, deliverables_heading, cta_title, cta_copy)
SELECT '04 — Engineering Process', 'Six disciplines.', 'One continuous chain.',
  'A facade is only as strong as its weakest interface. KGS owns every stage from survey to handover — no handoffs, no gaps, no assumptions.',
  'The chain','From first survey to final handover.',
  'Deliverables','What you receive at every stage.',
  'Bring us in early. The earlier we engage, the cleaner the envelope.',
  'The first conversation is a structured briefing — no obligation. We''ll outline systems, tolerances and an indicative programme for your project.'
WHERE NOT EXISTS (SELECT 1 FROM public.process_page);

INSERT INTO public.expertise_page (hero_eyebrow, hero_title, hero_highlight, hero_subtitle,
  tabs_eyebrow, tabs_heading, tabs_heading_accent, matrix_eyebrow, matrix_heading, cta_title, cta_copy)
SELECT '02 — Capabilities', 'A complete envelope', 'of facade disciplines.',
  'From feasibility and wind-tunnel analysis to mockup, fabrication and installation — six core systems, integrated under one roof.',
  'Disciplines','Pick a capability —','see the spec.',
  'Specification matrix','Compare systems side by side.',
  'Not sure which system fits your envelope?',
  'Tell us the building type and constraints. We''ll return with shortlisted systems, indicative tolerances and a comparative performance note.'
WHERE NOT EXISTS (SELECT 1 FROM public.expertise_page);

INSERT INTO public.about_page (hero_eyebrow, hero_title, hero_highlight, hero_subtitle,
  philosophy_eyebrow, philosophy_heading, paragraph1, paragraph2, paragraph3,
  stat1_value, stat1_suffix, stat1_label, stat2_value, stat2_suffix, stat2_label,
  stat3_value, stat3_suffix, stat3_label, stat4_value, stat4_suffix, stat4_label,
  timeline_eyebrow, timeline_heading,
  leadership_eyebrow, leadership_heading, leadership_intro,
  factory_label, factory_name,
  certifications_eyebrow, certifications_heading, certifications_intro,
  cta_title, cta_copy)
SELECT '01 — Studio', 'We don''t install facades.', 'We engineer building identities.',
  'Two decades of integrated facade practice — design, engineering, fabrication and installation, owned by a single accountable team.',
  'Philosophy', 'A facade is the most visible expression of a building''s intent.',
  'Founded on the conviction that an envelope must perform as precisely as it appears, KGS has spent over two decades crafting facades that are quietly engineered and confidently composed.',
  'Our practice fuses structural rigour with material restraint. From concept through final installation, every system passes through a single, integrated chain of accountability — no handoffs, no gaps.',
  'We work in close collaboration with architects, structural consultants and developers — sharing the same drawings, the same tolerances and, ultimately, the same standards.',
  25,'+','Years in practice', 100,'+','Projects delivered', 80000,' sqft','Factory footprint', 54,'+','Engineers on staff',
  'Milestones','Two decades. Six chapters.',
  'Leadership','A senior team, hands on every project.',
  'KGS is led by engineers who came up through the trade. Every project carries direct studio oversight from brief to handover.',
  'Facility','Howrah Industrial Estate',
  'Certifications','Audited, certified, accountable.',
  'KGS systems are independently audited and certified across quality, environmental and system-partner programmes.',
  'Start a conversation with the studio.',
  'Whether you''re scoping a feasibility study or briefing a landmark tower — talk to a senior engineer at KGS.'
WHERE NOT EXISTS (SELECT 1 FROM public.about_page);

-- Seed process_principles
INSERT INTO public.process_principles (key, value, sort_order)
SELECT * FROM (VALUES
  ('Single chain','One accountable team — design through handover.',1),
  ('Documented','Every interface, calculation and tolerance signed off.',2),
  ('Tested','Wind tunnel, mockup and on-site water testing.',3),
  ('Coordinated','BIM-coordinated with structural and MEP early.',4)
) v
WHERE NOT EXISTS (SELECT 1 FROM public.process_principles);

-- Seed expertise_compare
INSERT INTO public.expertise_compare (capability, glass, tolerance, use_case, sort_order)
SELECT * FROM (VALUES
  ('Structural Glazing','8–19mm IGU','±0.5mm','Towers · Lobbies',1),
  ('Unitised Curtain Wall','IGU + spandrel','±0.8mm','High-rise commercial',2),
  ('Spider Glazing','Toughened HS','±1.0mm','Atrium · Retail',3),
  ('ACP Cladding','—','±0.5mm','Soffits · Facades',4),
  ('Window Systems','Double / Triple','±0.5mm','Residences · Hotels',5),
  ('Skylights & Louvers','Laminated low-iron','±0.8mm','Roofs · Courts',6)
) v
WHERE NOT EXISTS (SELECT 1 FROM public.expertise_compare);

-- Seed about_timeline
INSERT INTO public.about_timeline (year, title, description, sort_order)
SELECT * FROM (VALUES
  ('2001','Founded in Kolkata','KGS begins as a specialist glazing contractor for premium residences across eastern India.',1),
  ('2008','Curtain wall capability','Investment in unitised curtain wall engineering and BIM coordination for commercial towers.',2),
  ('2014','80,000 sqft facility','New fabrication facility commissioned with Italian-grade CNC and unitised assembly lines.',3),
  ('2018','MSME ZED Silver certified','Recognised under the Government of India''s Zero Defect Zero Effect programme for quality, sustainability and process discipline.',4),
  ('2022','100 projects milestone','Crossed 100 delivered facade projects spanning 12 cities and 8M+ sqft of envelope.',5),
  ('2026','Pan-India engineering','Engineering hubs supporting national delivery — Kolkata · Mumbai · Bengaluru · NCR.',6)
) v
WHERE NOT EXISTS (SELECT 1 FROM public.about_timeline);

-- Seed about_leadership
INSERT INTO public.about_leadership (name, role, bio, sort_order)
SELECT * FROM (VALUES
  ('Rajiv Agarwal','Managing Director','25+ years in facade engineering. Oversees design integrity across the studio''s portfolio.',1),
  ('Aritra Sen','Head of Engineering','Structural and BIM lead. Coordinates the technical chain from concept through installation.',2),
  ('Meher Bhatia','Head of Fabrication','Runs the 80,000 sqft factory — CNC, unitised assembly, QA traceability.',3),
  ('Ishan Kapoor','Site Operations','Leads installation crews and on-site commissioning across India.',4)
) v
WHERE NOT EXISTS (SELECT 1 FROM public.about_leadership);

-- Seed about_certifications
INSERT INTO public.about_certifications (label, sort_order)
SELECT * FROM (VALUES
  ('MSME ZED Silver — Govt. of India',1),
  ('Schüco Authorised Fabricator',2),
  ('Technal Certified Partner',3),
  ('AAMA / EN mockup-tested',4),
  ('GRIHA / IGBC compliant',5)
) v
WHERE NOT EXISTS (SELECT 1 FROM public.about_certifications);

-- ============ Seed extended columns on existing rows ============

-- Projects: scope/area/tag based on name
UPDATE public.projects SET scope='Design · Engineering · Install', area='62,000 sqft', tag='Commercial' WHERE name='7 Loudon Street' AND (area IS NULL OR area='');
UPDATE public.projects SET scope='Engineering · Fabrication · Install', area='78,400 sqft', tag='Commercial' WHERE name='One 10' AND (area IS NULL OR area='');
UPDATE public.projects SET scope='Design · Engineering · Install', area='44,200 sqft', tag='Mixed-Use' WHERE name='PS Aurus' AND (area IS NULL OR area='');
UPDATE public.projects SET scope='Design · Engineering · Install', area='92,000 sqft', tag='Residential' WHERE name='PS Vyom' AND (area IS NULL OR area='');
UPDATE public.projects SET scope='Engineering · Fabrication · Install', area='38,500 sqft', tag='Mixed-Use' WHERE name='Siddha Esplanade' AND (area IS NULL OR area='');
UPDATE public.projects SET scope='Engineering · Install', area='120,000 sqft', tag='Commercial' WHERE name='Eco Space' AND (area IS NULL OR area='');
UPDATE public.projects SET scope='Design · Engineering · Install', area='54,000 sqft', tag='Commercial' WHERE name='The Dominion' AND (area IS NULL OR area='');
UPDATE public.projects SET scope='Design · Engineering · Install', area='48,800 sqft', tag='Mixed-Use' WHERE name='69 Park Street' AND (area IS NULL OR area='');

-- Process steps: weeks + deliverables
UPDATE public.process_steps SET weeks='Wk 1–2', deliverable1='Site report', deliverable2='Wind/seismic data', deliverable3='Structural compatibility' WHERE title='Survey' AND (weeks IS NULL OR weeks='');
UPDATE public.process_steps SET weeks='Wk 2–5', deliverable1='Concept facade study', deliverable2='System options', deliverable3='Material samples' WHERE title='Design' AND (weeks IS NULL OR weeks='');
UPDATE public.process_steps SET weeks='Wk 4–9', deliverable1='Shop drawings', deliverable2='Thermal report', deliverable3='Mockup specification' WHERE title='Engineering' AND (weeks IS NULL OR weeks='');
UPDATE public.process_steps SET weeks='Wk 8–16', deliverable1='CNC profiles', deliverable2='Bracketry', deliverable3='QA traceability sheets' WHERE title='Fabrication' AND (weeks IS NULL OR weeks='');
UPDATE public.process_steps SET weeks='Wk 14–20', deliverable1='Unitised panels', deliverable2='Pre-install QA', deliverable3='Packing & logistics' WHERE title='Assembly' AND (weeks IS NULL OR weeks='');
UPDATE public.process_steps SET weeks='Wk 18+', deliverable1='On-site install', deliverable2='Weather testing', deliverable3='Handover documentation' WHERE title='Installation' AND (weeks IS NULL OR weeks='');

-- Expertise items: short_description, body, specs
UPDATE public.expertise_items SET
  short_description='Frameless silicone-bonded systems for uninterrupted vision lines.',
  body='Two-sided and four-sided silicone-bonded systems engineered for high-rise wind loads. Edge details and deflection are coordinated with the primary structure from concept stage.',
  spec1_key='Glass thickness', spec1_value='8 — 19mm + IGU',
  spec2_key='Wind capacity',   spec2_value='Up to 3.5 kPa',
  spec3_key='U-value',         spec3_value='1.1 W/m²K (IGU)',
  spec4_key='Tolerance',       spec4_value='±0.5mm fabrication'
WHERE title='Structural Glazing' AND (body IS NULL OR body='');

UPDATE public.expertise_items SET
  short_description='Unitised and stick-built envelopes engineered for tall buildings.',
  body='Schüco and Technal-grade unitised systems for fast envelope close-in, plus stick-built systems where geometry demands flexibility. All systems are mockup-tested to AAMA / EN standards.',
  spec1_key='System type', spec1_value='Unitised · Stick · Hybrid',
  spec2_key='Floor cycle', spec2_value='1 floor / 7 days',
  spec3_key='Air infiltration', spec3_value='≤ 0.3 L/s·m²',
  spec4_key='Acoustics',   spec4_value='Rw 38 — 45 dB'
WHERE title='Curtain Wall Systems' AND (body IS NULL OR body='');

UPDATE public.expertise_items SET
  short_description='Point-fixed transparency at architectural scale.',
  body='316-grade stainless fittings, rotule details and tension-rod cable nets. Designed for lobbies, atriums and signature retail facades where minimal interruption is essential.',
  spec1_key='Fitting grade', spec1_value='AISI 316',
  spec2_key='Glass',         spec2_value='Toughened + heat-soaked',
  spec3_key='Span',          spec3_value='Up to 14m unsupported',
  spec4_key='Load',          spec4_value='Wind / seismic engineered'
WHERE title='Spider Glazing' AND (body IS NULL OR body='');

UPDATE public.expertise_items SET
  short_description='Aluminium composite cladding fabricated to mm tolerances.',
  body='PVDF, PE and brushed finishes; FR-grade cores per IS 14021. Tray-style and route-and-return details, fabricated in-house with disciplined finish-batch matching.',
  spec1_key='Finish',     spec1_value='PVDF · PE · Brushed',
  spec2_key='Core',       spec2_value='FR / Standard',
  spec3_key='Panel size', spec3_value='Up to 1500 × 4000mm',
  spec4_key='Joint',      spec4_value='Open / Sealed'
WHERE title='ACP Cladding' AND (body IS NULL OR body='');

UPDATE public.expertise_items SET
  short_description='European-grade aluminium and uPVC fenestration.',
  body='Schüco, Technal and Hindalco platforms — sliding, tilt-turn, casement and pivot systems with engineered hardware and tested gaskets for performance-critical residences.',
  spec1_key='Platforms', spec1_value='Schüco · Technal · Hindalco',
  spec2_key='Types',     spec2_value='Slide · Tilt-Turn · Pivot',
  spec3_key='U-value',   spec3_value='Down to 0.8 W/m²K',
  spec4_key='Sound',     spec4_value='Up to 42 dB Rw'
WHERE title='Premium Window Systems' AND (body IS NULL OR body='');

UPDATE public.expertise_items SET
  short_description='Daylighting and modulated solar control structures.',
  body='Pyramid, vault and free-form skylights with engineered drainage. External louver systems — aluminium, terracotta and timber — that modulate light, heat and air for the local climate.',
  spec1_key='Forms',    spec1_value='Pyramid · Vault · Free-form',
  spec2_key='Glass',    spec2_value='Laminated low-iron',
  spec3_key='Louvers',  spec3_value='Aluminium · Terracotta · Timber',
  spec4_key='Drainage', spec4_value='Integrated gutters'
WHERE title='Skylights & Louvers' AND (body IS NULL OR body='');
