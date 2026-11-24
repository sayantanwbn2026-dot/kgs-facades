-- Abuse protection for the public enquiry form.
--
-- The form is intentionally open to anonymous visitors, which means a bot can
-- submit in a loop: that floods the CMS inbox and, via the email trigger, the
-- support mailbox too. This caps submissions per source IP.
--
-- The IP is stored only as a salted hash, so no raw visitor IPs are retained.

create table if not exists public.enquiry_throttle (
  ip_hash    text        not null,
  created_at timestamptz not null default now()
);

create index if not exists enquiry_throttle_lookup
  on public.enquiry_throttle (ip_hash, created_at desc);

-- Only the database itself touches this table.
alter table public.enquiry_throttle enable row level security;
revoke all on public.enquiry_throttle from anon, authenticated;

create or replace function public.enforce_enquiry_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_ip     text;
  v_hash   text;
  v_recent int;
begin
  -- Supabase exposes the original client IP through the request headers.
  v_ip := coalesce(
    split_part(
      nullif(current_setting('request.headers', true)::json ->> 'x-forwarded-for', ''),
      ',', 1),
    'unknown'
  );

  -- Salted so the table never holds a reversible address.
  v_hash := md5('kgs-enquiry-throttle:' || v_ip);

  select count(*) into v_recent
  from public.enquiry_throttle
  where ip_hash = v_hash
    and created_at > now() - interval '10 minutes';

  -- 3 enquiries per 10 minutes is far above genuine use, far below a flood.
  if v_recent >= 3 then
    raise exception 'Too many enquiries submitted. Please try again shortly.'
      using errcode = 'check_violation';
  end if;

  insert into public.enquiry_throttle (ip_hash) values (v_hash);

  -- Opportunistic cleanup so the table cannot grow without bound.
  delete from public.enquiry_throttle where created_at < now() - interval '1 day';

  return new;
end;
$$;

revoke execute on function public.enforce_enquiry_rate_limit() from public, anon, authenticated;

drop trigger if exists enquiry_rate_limit on public.enquiries;
create trigger enquiry_rate_limit
  before insert on public.enquiries
  for each row execute function public.enforce_enquiry_rate_limit();
