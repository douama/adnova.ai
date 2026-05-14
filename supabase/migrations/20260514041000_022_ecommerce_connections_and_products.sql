-- E-commerce integrations : Shopify + WooCommerce
-- Tenant connects their store once; AdNova syncs the product catalog so
-- creatives can be generated directly from a product card.

create table if not exists public.ecommerce_connections (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider text not null check (provider in ('shopify','woocommerce')),
  shop_domain text not null,
  api_token text not null,
  api_secret text,
  is_active boolean not null default true,
  last_synced_at timestamptz,
  last_sync_status text,
  last_sync_error text,
  product_count integer not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  unique(tenant_id, provider, shop_domain)
);

create index ecommerce_connections_tenant_idx
  on public.ecommerce_connections(tenant_id, is_active);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  connection_id uuid references public.ecommerce_connections(id) on delete set null,
  external_id text not null,
  title text not null,
  description text,
  price_usd numeric,
  currency text default 'USD',
  image_url text,
  source_url text,
  sku text,
  status text default 'active',
  synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(tenant_id, connection_id, external_id)
);

create index products_tenant_synced_idx
  on public.products(tenant_id, synced_at desc);
create index products_tenant_status_idx
  on public.products(tenant_id, status) where status = 'active';

create or replace function public.set_ecommerce_connections_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists trg_ecommerce_connections_updated_at on public.ecommerce_connections;
create trigger trg_ecommerce_connections_updated_at
  before update on public.ecommerce_connections
  for each row execute function public.set_ecommerce_connections_updated_at();

alter table public.ecommerce_connections enable row level security;
alter table public.products enable row level security;

create policy ec_select on public.ecommerce_connections
  for select using (public.is_tenant_admin(tenant_id));
create policy ec_insert on public.ecommerce_connections
  for insert with check (public.is_tenant_admin(tenant_id));
create policy ec_update on public.ecommerce_connections
  for update using (public.is_tenant_admin(tenant_id))
              with check (public.is_tenant_admin(tenant_id));
create policy ec_delete on public.ecommerce_connections
  for delete using (public.is_tenant_admin(tenant_id));

create policy products_select on public.products
  for select using (public.is_tenant_member(tenant_id));

create or replace function public.list_ecommerce_connections(_tenant_id uuid)
returns table (
  id uuid,
  provider text,
  shop_domain text,
  token_preview text,
  is_active boolean,
  last_synced_at timestamptz,
  last_sync_status text,
  last_sync_error text,
  product_count integer,
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
  select
    c.id, c.provider, c.shop_domain,
    (left(c.api_token, 4) || '...' || right(c.api_token, 4))::text as token_preview,
    c.is_active, c.last_synced_at, c.last_sync_status, c.last_sync_error,
    c.product_count, c.created_at
  from public.ecommerce_connections c
  where c.tenant_id = _tenant_id
  order by c.created_at desc;
end$$;

revoke execute on function public.list_ecommerce_connections(uuid) from public, anon;
grant execute on function public.list_ecommerce_connections(uuid) to authenticated;
