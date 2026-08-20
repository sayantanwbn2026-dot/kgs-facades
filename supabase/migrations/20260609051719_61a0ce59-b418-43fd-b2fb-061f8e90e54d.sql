
-- Tighten SECURITY DEFINER functions: revoke broad execute, keep needed access
alter function public.set_updated_at() set search_path = public;
revoke execute on function public.has_role(uuid, public.app_role) from anon;
revoke execute on function public.handle_first_admin() from public, anon, authenticated;
-- handle_first_admin runs as a trigger, no direct execute needed
