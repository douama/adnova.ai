-- ============================================================================
-- AdNova AI — DATABASE SCHEMA v1.0
-- Apply via Supabase SQL Editor (one shot) on a fresh project.
-- ============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ----------------------------------------------------------------------------
-- ORGANIZATIONS & USERS
-- ----------------------------------------------------------------------------

create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  logo_url text,
  plan text not null default 'starter' check (plan in ('starter','pro','agency','enterprise')),
  stripe_customer_id text,
  stripe_subscription_id text,
  credits_remaining int not null default 20,
  credits_reset_at timestamptz,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete set null,
  full_name text,
  avatar_url text,
  role text not null default 'member' check (role in ('owner','admin','member','viewer')),
  onboarding_completed boolean not null default false,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index idx_profiles_org on profiles(organization_id);

-- ----------------------------------------------------------------------------
-- AD ACCOUNTS (OAuth connections to ad platforms)
-- ----------------------------------------------------------------------------

create table ad_accounts (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  platform text not null check (platform in ('meta','google','tiktok','linkedin','snapchat','twitter')),
  external_account_id text not null,
  account_name text not null,
  currency text not null default 'USD',
  timezone text not null default 'UTC',
  access_token text,   -- AES-GCM encrypted ciphertext
  refresh_token text,  -- AES-GCM encrypted ciphertext
  token_expires_at timestamptz,
  status text not null default 'active' check (status in ('active','disconnected','error','paused')),
  last_sync_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(organization_id, platform, external_account_id)
);
create index idx_ad_accounts_org on ad_accounts(organization_id);

-- ----------------------------------------------------------------------------
-- CAMPAIGNS / AD SETS / ADS
-- ----------------------------------------------------------------------------

create table campaigns (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  ad_account_id uuid not null references ad_accounts(id) on delete cascade,
  external_campaign_id text not null,
  name text not null,
  objective text,
  status text not null default 'active',
  budget_daily numeric(12,2),
  budget_lifetime numeric(12,2),
  spend_total numeric(12,2) not null default 0,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  conversions int not null default 0,
  roas numeric(8,4) not null default 0,
  cpa numeric(10,2),
  ctr numeric(8,6),
  cpc numeric(10,2),
  start_date date,
  end_date date,
  ai_score int,
  ai_recommendations jsonb not null default '[]'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(ad_account_id, external_campaign_id)
);
create index idx_campaigns_org on campaigns(organization_id);
create index idx_campaigns_account on campaigns(ad_account_id);

create table ad_sets (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  external_adset_id text not null,
  name text not null,
  targeting jsonb not null default '{}'::jsonb,
  budget_daily numeric(12,2),
  status text not null default 'active',
  spend numeric(12,2) not null default 0,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  roas numeric(8,4),
  created_at timestamptz not null default now(),
  unique(campaign_id, external_adset_id)
);
create index idx_ad_sets_campaign on ad_sets(campaign_id);

create table ads (
  id uuid primary key default uuid_generate_v4(),
  ad_set_id uuid not null references ad_sets(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  external_ad_id text not null,
  name text not null,
  type text check (type in ('image','video','carousel','collection','ugc')),
  headline text,
  description text,
  cta text,
  creative_url text,
  preview_url text,
  status text not null default 'active',
  spend numeric(12,2) not null default 0,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  conversions int not null default 0,
  roas numeric(8,4),
  ctr numeric(8,6),
  ai_generated boolean not null default false,
  ai_score int,
  created_at timestamptz not null default now(),
  unique(ad_set_id, external_ad_id)
);
create index idx_ads_org on ads(organization_id);
create index idx_ads_set on ads(ad_set_id);

-- ----------------------------------------------------------------------------
-- METRICS (time-series)
-- ----------------------------------------------------------------------------

create table metrics_daily (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null check (entity_type in ('campaign','adset','ad','account')),
  entity_id uuid not null,
  organization_id uuid not null references organizations(id) on delete cascade,
  date date not null,
  spend numeric(12,2) not null default 0,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  conversions int not null default 0,
  revenue numeric(12,2) not null default 0,
  roas numeric(8,4),
  ctr numeric(8,6),
  cpc numeric(10,2),
  cpa numeric(10,2),
  frequency numeric(6,2),
  reach bigint not null default 0,
  video_views bigint,
  platform text,
  created_at timestamptz not null default now(),
  unique(entity_type, entity_id, date)
);
create index idx_metrics_daily_entity on metrics_daily(entity_id, date desc);
create index idx_metrics_daily_org on metrics_daily(organization_id, date desc);

-- ----------------------------------------------------------------------------
-- CREATIVES (AI-generated assets)
-- ----------------------------------------------------------------------------

create table creatives (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  type text not null check (type in ('image','video','ugc')),
  prompt text not null,
  negative_prompt text,
  style text,
  format text,
  status text not null default 'pending' check (status in ('pending','processing','completed','failed')),
  file_url text,
  thumbnail_url text,
  file_size int,
  duration_seconds int,
  generation_model text,
  generation_params jsonb not null default '{}'::jsonb,
  credits_used int not null default 1,
  used_in_ads jsonb not null default '[]'::jsonb,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
create index idx_creatives_org on creatives(organization_id, created_at desc);

-- ----------------------------------------------------------------------------
-- AUTOMATION & AGENTS
-- ----------------------------------------------------------------------------

create table automation_rules (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  description text,
  trigger_type text not null check (trigger_type in ('schedule','metric_threshold','event','ai_recommendation')),
  trigger_config jsonb not null default '{}'::jsonb,
  conditions jsonb not null default '[]'::jsonb,
  actions jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  last_triggered_at timestamptz,
  trigger_count int not null default 0,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
create index idx_rules_org on automation_rules(organization_id);

create table agent_runs (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  agent_type text not null check (agent_type in ('analytics','optimization','creative','reporting','boost')),
  status text not null default 'running' check (status in ('running','completed','failed','cancelled')),
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  error_message text,
  tokens_used int not null default 0,
  duration_ms int,
  triggered_by text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index idx_runs_org on agent_runs(organization_id, created_at desc);

-- ----------------------------------------------------------------------------
-- NOTIFICATIONS
-- ----------------------------------------------------------------------------

create table notifications (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  type text not null,
  title text not null,
  message text,
  data jsonb not null default '{}'::jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index idx_notifs_user on notifications(user_id, read, created_at desc);

-- ----------------------------------------------------------------------------
-- TRIGGERS
-- ----------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_updated_at
  before update on organizations
  for each row execute function set_updated_at();

create trigger campaigns_updated_at
  before update on campaigns
  for each row execute function set_updated_at();

-- Auto-create a profile row on every new auth.users insert
create or replace function handle_new_auth_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_auth_user();

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------

alter table organizations    enable row level security;
alter table profiles         enable row level security;
alter table ad_accounts      enable row level security;
alter table campaigns        enable row level security;
alter table ad_sets          enable row level security;
alter table ads              enable row level security;
alter table metrics_daily    enable row level security;
alter table creatives        enable row level security;
alter table automation_rules enable row level security;
alter table agent_runs       enable row level security;
alter table notifications    enable row level security;

-- Helper: current user's organization
create or replace function auth_org_id()
returns uuid language sql stable security definer as $$
  select organization_id from profiles where id = auth.uid()
$$;

create policy "org members read their org"
  on organizations for select
  using (id = auth_org_id());

create policy "owners update their org"
  on organizations for update
  using (
    id = auth_org_id()
    and exists (select 1 from profiles where id = auth.uid() and role in ('owner','admin'))
  );

create policy "self read/update profile"
  on profiles for all
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "org members read profiles in org"
  on profiles for select
  using (organization_id = auth_org_id());

-- Tenant-scoped tables — same pattern: read/write only your org
do $$
declare t text;
begin
  foreach t in array array[
    'ad_accounts','campaigns','metrics_daily','creatives',
    'automation_rules','agent_runs','notifications','ads'
  ] loop
    execute format($f$
      create policy "org members access %1$I"
        on %1$I for all
        using (organization_id = auth_org_id())
        with check (organization_id = auth_org_id());
    $f$, t);
  end loop;
end$$;

create policy "ad_sets via campaign"
  on ad_sets for all
  using (exists (select 1 from campaigns c where c.id = campaign_id and c.organization_id = auth_org_id()))
  with check (exists (select 1 from campaigns c where c.id = campaign_id and c.organization_id = auth_org_id()));
