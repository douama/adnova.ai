
-- ─── platform_connections ──────────────────────────────────────────────────
-- OAuth tokens des plateformes pub. À chiffrer via Supabase Vault en Phase 5.
-- Pour Phase 1 on stocke en text avec colonne `encrypted` flag pour migration.
create table public.platform_connections (
  id              uuid primary key default gen_random_uuid(),
  tenant_id       uuid not null references public.tenants(id) on delete cascade,
  platform        public.ad_platform not null,
  account_id      text not null,        -- ID du compte pub sur la plateforme
  account_name    text,                  -- Nom affiché ("Acme Corp - Main Account")
  access_token    text,                  -- OAuth access token (à chiffrer Phase 5)
  refresh_token   text,                  -- Refresh token (à chiffrer Phase 5)
  expires_at      timestamptz,
  scope           text,                  -- Scopes OAuth accordés
  connected_by    uuid references auth.users(id) on delete set null,
  is_active       boolean default true not null,
  last_synced_at  timestamptz,
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null,
  unique (tenant_id, platform, account_id)
);

create index platform_connections_tenant_idx on public.platform_connections(tenant_id);
create index platform_connections_active_idx on public.platform_connections(tenant_id, platform) where is_active;

create trigger platform_connections_set_updated_at
  before update on public.platform_connections
  for each row execute function extensions.moddatetime(updated_at);

comment on table public.platform_connections is
  'OAuth connections aux plateformes pub. Tokens à chiffrer via Supabase Vault en Phase 5.';

-- ─── campaigns ──────────────────────────────────────────────────────────────
create table public.campaigns (
  id                  uuid primary key default gen_random_uuid(),
  tenant_id           uuid not null references public.tenants(id) on delete cascade,
  platform_connection_id uuid references public.platform_connections(id) on delete set null,
  platform            public.ad_platform not null,
  external_id         text,              -- ID côté plateforme (Meta campaign_id, etc.)
  name                text not null,
  objective           text,              -- 'conversions', 'reach', 'traffic', etc.
  status              public.campaign_status default 'draft' not null,
  daily_budget_usd    numeric(12,2),
  lifetime_budget_usd numeric(12,2),
  start_at            timestamptz,
  end_at              timestamptz,
  -- KPI cumulés (denormalized, rafraîchis par job cron toutes les 15 min)
  spend_total         numeric(14,2) default 0 not null,
  revenue_total       numeric(14,2) default 0 not null,
  impressions_total   bigint default 0 not null,
  clicks_total        bigint default 0 not null,
  conversions_total   bigint default 0 not null,
  roas                numeric(8,4),
  ctr                 numeric(6,4),
  cpa                 numeric(10,2),
  -- Métadonnées IA
  ai_managed          boolean default true not null,
  last_decision_at    timestamptz,
  created_by          uuid references auth.users(id) on delete set null,
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null
);

create index campaigns_tenant_idx on public.campaigns(tenant_id);
create index campaigns_status_idx on public.campaigns(tenant_id, status) where status != 'archived';
create index campaigns_platform_idx on public.campaigns(tenant_id, platform);
create unique index campaigns_external_id_uniq
  on public.campaigns(tenant_id, platform, external_id) where external_id is not null;

create trigger campaigns_set_updated_at
  before update on public.campaigns
  for each row execute function extensions.moddatetime(updated_at);

-- ─── ad_sets ────────────────────────────────────────────────────────────────
-- Niveau intermédiaire (ad set / ad group) — entre campaign et creative
create table public.ad_sets (
  id                uuid primary key default gen_random_uuid(),
  tenant_id         uuid not null references public.tenants(id) on delete cascade,
  campaign_id       uuid not null references public.campaigns(id) on delete cascade,
  external_id       text,
  name              text not null,
  status            public.campaign_status default 'draft' not null,
  daily_budget_usd  numeric(12,2),
  targeting         jsonb default '{}'::jsonb not null,  -- ages, geos, interests
  spend_total       numeric(14,2) default 0 not null,
  revenue_total     numeric(14,2) default 0 not null,
  impressions_total bigint default 0 not null,
  clicks_total      bigint default 0 not null,
  conversions_total bigint default 0 not null,
  created_at        timestamptz default now() not null,
  updated_at        timestamptz default now() not null
);

create index ad_sets_campaign_idx on public.ad_sets(campaign_id);
create index ad_sets_tenant_idx on public.ad_sets(tenant_id);
create unique index ad_sets_external_id_uniq
  on public.ad_sets(campaign_id, external_id) where external_id is not null;

create trigger ad_sets_set_updated_at
  before update on public.ad_sets
  for each row execute function extensions.moddatetime(updated_at);

-- ─── creatives ──────────────────────────────────────────────────────────────
-- Storage refs pointent vers le bucket `creatives/{tenant_id}/{id}.{ext}`
create table public.creatives (
  id                 uuid primary key default gen_random_uuid(),
  tenant_id          uuid not null references public.tenants(id) on delete cascade,
  ad_set_id          uuid references public.ad_sets(id) on delete set null,
  campaign_id        uuid references public.campaigns(id) on delete set null,
  external_id        text,
  type               public.creative_type not null,
  status             public.creative_status default 'draft' not null,
  -- Asset (storage)
  storage_path       text,           -- 'creatives/{tenant_id}/{id}.jpg'
  thumbnail_path     text,
  -- Métadonnées
  headline           text,
  primary_text       text,
  description        text,
  cta                text,
  landing_url        text,
  -- IA generation tracking
  generation_engine  text,           -- 'sdxl' | 'runway' | 'heygen' | 'claude_copy' | 'human'
  generation_prompt  text,
  generation_meta    jsonb default '{}'::jsonb not null,
  -- Performance
  spend_total        numeric(14,2) default 0 not null,
  impressions_total  bigint default 0 not null,
  clicks_total       bigint default 0 not null,
  conversions_total  bigint default 0 not null,
  ctr                numeric(6,4),
  cvr                numeric(6,4),
  -- Lifecycle
  killed_at          timestamptz,
  killed_reason      text,
  won_at             timestamptz,
  created_by         uuid references auth.users(id) on delete set null,
  created_at         timestamptz default now() not null,
  updated_at         timestamptz default now() not null
);

create index creatives_tenant_idx on public.creatives(tenant_id);
create index creatives_campaign_idx on public.creatives(campaign_id);
create index creatives_status_idx on public.creatives(tenant_id, status) where status not in ('archived', 'killed');
create index creatives_engine_idx on public.creatives(generation_engine);

create trigger creatives_set_updated_at
  before update on public.creatives
  for each row execute function extensions.moddatetime(updated_at);

comment on table public.creatives is
  'Visuels et vidéos pub. Liés au Supabase Storage bucket creatives/{tenant_id}/. Métadonnées IA tracées.';

-- ─── audiences ──────────────────────────────────────────────────────────────
create table public.audiences (
  id              uuid primary key default gen_random_uuid(),
  tenant_id       uuid not null references public.tenants(id) on delete cascade,
  name            text not null,
  source_type     text,            -- 'lookalike' | 'custom' | 'interests' | 'retargeting'
  source_meta     jsonb default '{}'::jsonb not null,
  size_estimate   bigint,
  performance_score numeric(5,2),  -- 0-100 — calculé par l'IA
  platforms       public.ad_platform[] default '{}',
  is_active       boolean default true not null,
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null
);

create index audiences_tenant_idx on public.audiences(tenant_id);

create trigger audiences_set_updated_at
  before update on public.audiences
  for each row execute function extensions.moddatetime(updated_at);

-- ─── automation_rules ──────────────────────────────────────────────────────
create table public.automation_rules (
  id                uuid primary key default gen_random_uuid(),
  tenant_id         uuid not null references public.tenants(id) on delete cascade,
  name              text not null,
  description       text,
  is_active         boolean default true not null,
  trigger_condition jsonb not null,     -- DSL: {"op":"and","clauses":[{"metric":"roas","gte":3.5}]}
  action            jsonb not null,     -- {"type":"scale","pct":10}
  cooldown_hours    integer default 72 not null,
  last_fired_at     timestamptz,
  fire_count        integer default 0 not null,
  created_by        uuid references auth.users(id) on delete set null,
  created_at        timestamptz default now() not null,
  updated_at        timestamptz default now() not null
);

create index automation_rules_tenant_idx on public.automation_rules(tenant_id) where is_active;

create trigger automation_rules_set_updated_at
  before update on public.automation_rules
  for each row execute function extensions.moddatetime(updated_at);
