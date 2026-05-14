
-- ─── user_profiles ──────────────────────────────────────────────────────────
-- Profil étendu (1:1 avec auth.users). Auto-créé via trigger après signup.
create table public.user_profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  avatar_url    text,
  locale        text default 'fr',
  timezone      text default 'Europe/Paris',
  marketing_opt_in boolean default false,
  -- Champ super-admin (mirror du token JWT role; vérifié côté RLS via auth.jwt())
  is_super_admin boolean default false not null,
  created_at    timestamptz default now() not null,
  updated_at    timestamptz default now() not null
);

create trigger user_profiles_set_updated_at
  before update on public.user_profiles
  for each row execute function extensions.moddatetime(updated_at);

comment on table public.user_profiles is
  'Profil utilisateur étendu — 1:1 avec auth.users, créé automatiquement à la signup';

-- ─── tenants ────────────────────────────────────────────────────────────────
-- Un workspace = un client AdNova. Un user peut appartenir à plusieurs tenants
-- (cas agence : 1 user gère N marques).
create table public.tenants (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null check (slug ~ '^[a-z0-9-]{3,40}$'),
  name            text not null,
  logo_url        text,
  plan            public.plan_tier default 'trial' not null,
  status          public.tenant_status default 'trial' not null,
  ai_mode         public.ai_mode default 'advisory' not null,
  -- Guardrails IA (JSON pour évolution flexible)
  guardrails      jsonb default '{
    "roas_min": 3.5,
    "ctr_kill_threshold": 0.008,
    "max_scale_pct_24h": 15,
    "max_daily_budget_usd": 5000,
    "min_impressions_before_kill": 500
  }'::jsonb not null,
  trial_ends_at   timestamptz default (now() + interval '14 days'),
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null
);

create index tenants_status_idx on public.tenants(status) where status != 'churned';
create index tenants_plan_idx on public.tenants(plan);

create trigger tenants_set_updated_at
  before update on public.tenants
  for each row execute function extensions.moddatetime(updated_at);

comment on table public.tenants is
  'Workspaces clients AdNova — un tenant = un compte facturable. Un user peut être membre de N tenants.';

-- ─── tenant_members ────────────────────────────────────────────────────────
-- Pivot many-to-many : qui a accès à quel tenant, et avec quel rôle.
create table public.tenant_members (
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  role        public.tenant_role default 'editor' not null,
  invited_by  uuid references auth.users(id) on delete set null,
  joined_at   timestamptz default now() not null,
  primary key (tenant_id, user_id)
);

create index tenant_members_user_idx on public.tenant_members(user_id);

comment on table public.tenant_members is
  'Pivot users↔tenants avec rôle. Garantit qu''un user a accès à ses workspaces uniquement (via RLS).';

-- ─── Helper functions pour RLS ──────────────────────────────────────────────

-- Renvoie true si auth.uid() est membre du tenant_id donné
create or replace function public.is_tenant_member(_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.tenant_members
    where tenant_id = _tenant_id and user_id = auth.uid()
  );
$$;

-- Renvoie true si auth.uid() est owner ou admin du tenant_id donné
create or replace function public.is_tenant_admin(_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.tenant_members
    where tenant_id = _tenant_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
  );
$$;

-- Renvoie true si auth.uid() est super_admin (plateforme AdNova)
create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_super_admin from public.user_profiles where id = auth.uid()),
    false
  );
$$;

comment on function public.is_tenant_member is
  'Helper RLS — true si l''utilisateur courant est membre du tenant';
comment on function public.is_tenant_admin is
  'Helper RLS — true si l''utilisateur courant est owner ou admin du tenant';
comment on function public.is_super_admin is
  'Helper RLS — true si l''utilisateur courant est super_admin AdNova';
