-- Lockdown : platform_connections access tokens
-- Previously every tenant member could SELECT *, which exposed access_token
-- and refresh_token via the REST API. Restrict to tenant admins, then
-- expose a SECURITY DEFINER RPC for members to list non-secret columns.

drop policy if exists platform_connections_select_member on public.platform_connections;
drop policy if exists platform_connections_select_admin on public.platform_connections;

create policy platform_connections_select_admin on public.platform_connections
  for select
  using (public.is_tenant_admin(tenant_id) or public.is_super_admin());

create or replace function public.list_platform_connections(_tenant_id uuid)
returns table (
  id uuid,
  platform public.ad_platform,
  account_id text,
  account_name text,
  is_active boolean,
  last_synced_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_tenant_member(_tenant_id) then
    raise exception 'access denied';
  end if;
  return query
  select c.id, c.platform, c.account_id, c.account_name,
         c.is_active, c.last_synced_at, c.expires_at, c.created_at
  from public.platform_connections c
  where c.tenant_id = _tenant_id
  order by c.created_at desc;
end$$;

revoke execute on function public.list_platform_connections(uuid) from public, anon;
grant execute on function public.list_platform_connections(uuid) to authenticated;

-- Helper views (security_invoker = on so RLS still applies)
create or replace view public.platform_connections_safe
with (security_invoker = on) as
select id, tenant_id, platform, account_id, account_name,
       is_active, last_synced_at, scope, expires_at,
       created_at, updated_at, connected_by
from public.platform_connections;
revoke all on public.platform_connections_safe from public, anon;
grant select on public.platform_connections_safe to authenticated;

create or replace view public.platform_connections_admin
with (security_invoker = on) as
select id, tenant_id, platform, account_id, account_name,
       case when access_token is null then null
            else (left(access_token, 4) || '...' || right(access_token, 4))
       end as access_token_preview,
       case when refresh_token is null then null
            else (left(refresh_token, 4) || '...' || right(refresh_token, 4))
       end as refresh_token_preview,
       is_active, last_synced_at, scope, expires_at,
       created_at, updated_at, connected_by
from public.platform_connections;
revoke all on public.platform_connections_admin from public, anon;
grant select on public.platform_connections_admin to authenticated;

-- Fix : function with mutable search_path
create or replace function public.set_ecommerce_connections_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end$$;

-- Defense-in-depth : FORCE RLS on sensitive tables so superuser sessions
-- cannot bypass even by accident.
alter table public.provider_credentials force row level security;
alter table public.oauth_apps force row level security;
alter table public.oauth_states force row level security;
alter table public.ecommerce_connections force row level security;
alter table public.platform_connections force row level security;
