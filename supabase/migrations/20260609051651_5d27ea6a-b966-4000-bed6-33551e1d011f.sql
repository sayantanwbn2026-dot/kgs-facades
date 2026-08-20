
-- ============================================================
-- 1. ROLES + has_role
-- ============================================================
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'admin',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create policy "users read own role" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- First signup becomes admin, then locked
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.user_roles where role = 'admin') = 0 then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_first_admin();

-- ============================================================
-- 2. Helpers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- Shared policy helper macro pattern: public read, admin write
-- We'll write policies inline per table.

-- ============================================================
-- 3. SINGLETON TABLES (one row each, enforced by `singleton` unique)
-- ============================================================

-- HERO
create table public.hero (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  announcement_text text not null default 'New — KGS Engineering Platform',
  announcement_link text not null default '#platform',
  headline_line1 text not null default 'Architectural facades,',
  headline_line2 text not null default 'engineered end to end.',
  subtitle text not null default 'KGS unifies design, engineering, fabrication and installation under one platform — delivering landmark-grade glazing, curtain walls and ACP systems across India.',
  cta_primary_label text not null default 'Start a project',
  cta_primary_link text not null default '#contact',
  cta_secondary_label text not null default 'See projects',
  cta_secondary_link text not null default '#projects',
  trust_text text not null default 'Trusted on 100+ facades · ISO 9001:2015 certified',
  stat1_value integer not null default 25,
  stat1_suffix text not null default '+',
  stat1_label text not null default 'Years experience',
  stat2_value integer not null default 100,
  stat2_suffix text not null default '+',
  stat2_label text not null default 'Projects delivered',
  stat3_value integer not null default 54,
  stat3_suffix text not null default '+',
  stat3_label text not null default 'Engineers on staff',
  partners_label text not null default 'Specified with the world''s leading material partners',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger _hero_updated before update on public.hero for each row execute function public.set_updated_at();

-- FEATURES INTRO
create table public.features_intro (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '02 · The Platform',
  heading text not null default 'Five capabilities that make us a different kind of facade partner.',
  description text not null default 'From wind-load simulation to a live project portal, every project runs on the same engineered system — visible to you in real time.',
  updated_at timestamptz default now()
);
create trigger _features_intro_updated before update on public.features_intro for each row execute function public.set_updated_at();

-- STATEMENT
create table public.statement (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '01 — Architectural Statement',
  heading_main text not null default 'We don''t install facades.',
  heading_accent text not null default 'We engineer building identities.',
  image_url text not null default '/src/assets/statement.jpg',
  paragraph1 text not null default 'Founded on the conviction that a facade is the most visible expression of a building''s intent — Kolkata Glazing Services has spent over two decades crafting envelopes that perform as precisely as they appear.',
  paragraph2 text not null default 'Our practice fuses structural rigour with material restraint. From concept through final installation, every system passes through a single, integrated chain of accountability.',
  meta1_key text not null default 'ISO',
  meta1_value text not null default '9001 : 2015',
  meta2_key text not null default 'Region',
  meta2_value text not null default 'Pan-India',
  meta3_key text not null default 'Capability',
  meta3_value text not null default 'End-to-End',
  meta4_key text not null default 'Tier',
  meta4_value text not null default 'Landmark Grade',
  updated_at timestamptz default now()
);
create trigger _statement_updated before update on public.statement for each row execute function public.set_updated_at();

-- EXPERTISE INTRO
create table public.expertise_intro (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '02 — Expertise',
  heading text not null default 'A complete envelope of capabilities.',
  description text not null default 'Six core disciplines, integrated under one roof — from feasibility studies and wind-tunnel analysis to mockup testing, fabrication and final installation.',
  updated_at timestamptz default now()
);
create trigger _expertise_intro_updated before update on public.expertise_intro for each row execute function public.set_updated_at();

-- PROJECTS INTRO
create table public.projects_intro (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '03 — Projects',
  heading text not null default 'Selected works across India''s most considered buildings.',
  description text not null default 'A sample of completed and in-progress engagements spanning commercial towers, mixed-use developments and luxury residences.',
  archive_title text not null default '100+ delivered projects since 2001.',
  archive_cta_label text not null default 'Request portfolio',
  archive_cta_link text not null default '#contact',
  updated_at timestamptz default now()
);
create trigger _projects_intro_updated before update on public.projects_intro for each row execute function public.set_updated_at();

-- PROCESS INTRO
create table public.process_intro (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '04 — Engineering Process',
  heading_main text not null default 'Six disciplines.',
  heading_accent text not null default 'One continuous chain.',
  updated_at timestamptz default now()
);
create trigger _process_intro_updated before update on public.process_intro for each row execute function public.set_updated_at();

-- MANUFACTURING
create table public.manufacturing (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '05 — Manufacturing',
  heading text not null default 'An 80,000 sqft facility engineered for tolerance.',
  description text not null default 'Our facility integrates European fabrication equipment with disciplined process control. Every panel is measured, audited and barcoded before it leaves the floor.',
  image_url text not null default '/src/assets/manufacturing.jpg',
  capability1 text not null default 'Advanced CNC Cutting Systems',
  capability2 text not null default 'Italian Fabrication Equipment',
  capability3 text not null default 'Precision Assembly Lines',
  capability4 text not null default 'In-house Quality Control',
  stat1_value numeric not null default 80000,
  stat1_decimals integer not null default 0,
  stat1_suffix text not null default ' sqft',
  stat1_label text not null default 'Factory Footprint',
  stat2_value numeric not null default 0.5,
  stat2_decimals integer not null default 1,
  stat2_suffix text not null default ' mm',
  stat2_label text not null default 'Fabrication Tolerance',
  stat3_value numeric not null default 12,
  stat3_decimals integer not null default 0,
  stat3_suffix text not null default '+',
  stat3_label text not null default 'CNC Stations',
  stat4_value numeric not null default 100,
  stat4_decimals integer not null default 0,
  stat4_suffix text not null default '%',
  stat4_label text not null default 'Pre-Install QA',
  updated_at timestamptz default now()
);
create trigger _manufacturing_updated before update on public.manufacturing for each row execute function public.set_updated_at();

-- MATERIALS INTRO
create table public.materials_intro (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '06 — Material Partners',
  heading text not null default 'Specified with the world''s most exacting suppliers.',
  description text not null default 'Authorised relationships with global glass, aluminium and fixing manufacturers — backed by certified system warranties.',
  updated_at timestamptz default now()
);
create trigger _materials_intro_updated before update on public.materials_intro for each row execute function public.set_updated_at();

-- WHY INTRO
create table public.why_intro (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '07 — Why KGS',
  heading text not null default 'Three principles. Held without compromise.',
  updated_at timestamptz default now()
);
create trigger _why_intro_updated before update on public.why_intro for each row execute function public.set_updated_at();

-- CONTACT
create table public.contact (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  eyebrow text not null default '08 — Consultation',
  heading text not null default 'Start your project discussion.',
  description text not null default 'Share a brief outline of your project. A KGS engineering lead will respond within two working days to schedule a consultation.',
  email text not null default 'studio@kgs-facades.com',
  phone text not null default '+91 33 4000 0000',
  office_address text not null default 'Salt Lake Sector V, Kolkata 700091',
  factory_address text not null default 'Howrah Industrial Estate, WB',
  updated_at timestamptz default now()
);
create trigger _contact_updated before update on public.contact for each row execute function public.set_updated_at();

-- FOOTER
create table public.footer (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  brand_line1 text not null default 'Kolkata',
  brand_line2_accent text not null default 'Glazing',
  brand_line2_rest text not null default 'Services',
  studio_address1 text not null default 'Salt Lake Sector V',
  studio_address2 text not null default 'Kolkata 700091, IN',
  factory_address1 text not null default 'Howrah Industrial Estate',
  factory_address2 text not null default 'West Bengal, IN',
  contact_email text not null default 'studio@kgs-facades.com',
  contact_phone text not null default '+91 33 4000 0000',
  hours_days text not null default 'Mon — Sat',
  hours_time text not null default '10:00 — 19:00 IST',
  tagline text not null default 'KGS · Engineering Architectural Facades',
  copyright_holder text not null default 'Kolkata Glazing Services',
  updated_at timestamptz default now()
);
create trigger _footer_updated before update on public.footer for each row execute function public.set_updated_at();

-- ============================================================
-- 4. LIST TABLES
-- ============================================================

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

create table public.features (
  id uuid primary key default gen_random_uuid(),
  tag text not null,
  title text not null,
  description text not null,
  visual_kind text not null default 'wind', -- wind | bim | gauge | portal | energy
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);
create trigger _features_updated before update on public.features for each row execute function public.set_updated_at();

create table public.expertise_items (
  id uuid primary key default gen_random_uuid(),
  number_label text not null,
  title text not null,
  description text not null,
  image_url text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);
create trigger _expertise_items_updated before update on public.expertise_items for each row execute function public.set_updated_at();

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  number_label text not null,
  name text not null,
  location text not null,
  system_description text not null,
  year text not null,
  status text not null default 'Delivered',
  image_url text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);
create trigger _projects_updated before update on public.projects for each row execute function public.set_updated_at();

create table public.process_steps (
  id uuid primary key default gen_random_uuid(),
  number_label text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);
create trigger _process_steps_updated before update on public.process_steps for each row execute function public.set_updated_at();

create table public.material_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order integer not null default 0
);

create table public.why_cards (
  id uuid primary key default gen_random_uuid(),
  number_label text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);
create trigger _why_cards_updated before update on public.why_cards for each row execute function public.set_updated_at();

-- ============================================================
-- 5. GRANTS + RLS for all CMS tables
-- Public can read; only admins can write.
-- ============================================================

do $$
declare t text;
begin
  for t in select unnest(array[
    'hero','features_intro','statement','expertise_intro','projects_intro','process_intro',
    'manufacturing','materials_intro','why_intro','contact','footer',
    'partners','features','expertise_items','projects','process_steps','material_partners','why_cards'
  ]) loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public read %1$s" on public.%1$I for select using (true)', t);
    execute format('create policy "admin insert %1$s" on public.%1$I for insert to authenticated with check (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "admin update %1$s" on public.%1$I for update to authenticated using (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "admin delete %1$s" on public.%1$I for delete to authenticated using (public.has_role(auth.uid(), ''admin''))', t);
  end loop;
end $$;

-- ============================================================
-- 6. STORAGE policies — media bucket: public read, admin write
-- ============================================================
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
create policy "admin upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "admin update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "admin delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
