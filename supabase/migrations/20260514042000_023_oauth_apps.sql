-- OAuth apps configuration : one row per ad platform AdNova supports.
-- Only super-admins can register these (one Meta app, one Google app, etc.
-- are shared across ALL tenants). The table is RLS-locked; only service_role
-- bypasses.

create table if not exists public.oauth_apps (
  platform text primary key check (platform in (
    'meta','google','tiktok','linkedin','youtube',
    'pinterest','snapchat','x','amazon'
  )),
  client_id text not null,
  client_secret text not null,
  scopes text not null default '',
  is_active boolean not null default true,
  configured_by uuid references auth.users(id) on delete set null,
  configured_at timestamptz not null default now(),
  notes text
);

alter table public.oauth_apps enable row level security;

create or replace function public.set_oauth_app(
  p_platform text,
  p_client_id text,
  p_client_secret text,
  p_scopes text default null,
  p_notes text default null
) returns json
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_super_admin() then raise exception 'access denied'; end if;
  if length(p_client_id) < 3 or length(p_client_secret) < 6 then
    raise exception 'client_id/secret too short';
  end if;
  insert into public.oauth_apps(platform, client_id, client_secret, scopes, configured_by, notes)
  values (p_platform, p_client_id, p_client_secret, coalesce(p_scopes,''), auth.uid(), p_notes)
  on conflict (platform) do update
    set client_id = excluded.client_id,
        client_secret = excluded.client_secret,
        scopes = coalesce(excluded.scopes, public.oauth_apps.scopes),
        configured_by = auth.uid(),
        configured_at = now(),
        notes = coalesce(excluded.notes, public.oauth_apps.notes),
        is_active = true;
  return json_build_object('ok', true);
end$$;

create or replace function public.list_oauth_apps()
returns table(
  platform text, client_id_preview text, scopes text, is_active boolean,
  configured_at timestamptz, configured_by_email text, notes text
)
language plpgsql security definer set search_path = public, auth
as $$
begin
  if not public.is_super_admin() then raise exception 'access denied'; end if;
  return query
  select a.platform,
         (left(a.client_id, 6) || '...' || right(a.client_id, 4))::text,
         a.scopes, a.is_active, a.configured_at,
         u.email::text, a.notes
  from public.oauth_apps a
  left join auth.users u on u.id = a.configured_by
  order by a.platform;
end$$;

create or replace function public.delete_oauth_app(p_platform text)
returns json
language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_super_admin() then raise exception 'access denied'; end if;
  delete from public.oauth_apps where platform = p_platform;
  return json_build_object('ok', true);
end$$;

create or replace function public.is_oauth_configured(p_platform text)
returns boolean
language sql security definer set search_path = public stable
as $$
  select coalesce(
    (select is_active from public.oauth_apps where platform = p_platform),
    false
  );
$$;

create or replace function public.get_oauth_app(p_platform text)
returns table(client_id text, client_secret text, scopes text)
language sql security definer set search_path = public
as $$
  select client_id, client_secret, scopes
    from public.oauth_apps
   where platform = p_platform and is_active
   limit 1;
$$;

create table if not exists public.oauth_states (
  state text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  platform text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '15 minutes')
);
alter table public.oauth_states enable row level security;

revoke execute on function public.set_oauth_app(text, text, text, text, text) from public, anon;
grant execute on function public.set_oauth_app(text, text, text, text, text) to authenticated;
revoke execute on function public.list_oauth_apps() from public, anon;
grant execute on function public.list_oauth_apps() to authenticated;
revoke execute on function public.delete_oauth_app(text) from public, anon;
grant execute on function public.delete_oauth_app(text) to authenticated;
revoke execute on function public.is_oauth_configured(text) from public;
grant execute on function public.is_oauth_configured(text) to anon, authenticated;
revoke execute on function public.get_oauth_app(text) from public, anon, authenticated;
