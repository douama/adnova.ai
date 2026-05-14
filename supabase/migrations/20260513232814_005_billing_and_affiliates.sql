
-- ─── plans (catalogue — mirror Stripe products/prices) ─────────────────────
create table public.plans (
  id                 public.plan_tier primary key,
  name               text not null,
  description        text,
  price_monthly_usd  numeric(10,2),
  price_annual_usd   numeric(10,2),
  stripe_price_monthly_id text,
  stripe_price_annual_id  text,
  -- Limites
  max_campaigns      integer,             -- null = unlimited
  max_creatives_per_month integer,
  max_platforms      integer,
  max_team_members   integer,
  ai_modes_allowed   public.ai_mode[] not null default '{advisory}',
  features           jsonb default '[]'::jsonb not null,
  is_visible         boolean default true not null,
  sort_order         integer default 0,
  created_at         timestamptz default now() not null
);

insert into public.plans (id, name, price_monthly_usd, price_annual_usd, max_campaigns, max_creatives_per_month, max_platforms, max_team_members, ai_modes_allowed, sort_order) values
  ('trial',      'Trial',      0,    0,    5,    20,   1,    1,  '{advisory}', 0),
  ('starter',    'Starter',    299,  239,  5,    30,   1,    3,  '{advisory}', 1),
  ('growth',     'Growth',     799,  639,  null, null, 9,    10, '{advisory,guardrails,autonomous}', 2),
  ('enterprise', 'Enterprise', null, null, null, null, null, null, '{advisory,guardrails,autonomous}', 3);

-- ─── subscriptions (sync Stripe) ───────────────────────────────────────────
create table public.subscriptions (
  id                   uuid primary key default gen_random_uuid(),
  tenant_id            uuid not null unique references public.tenants(id) on delete cascade,
  plan                 public.plan_tier not null references public.plans(id),
  status               public.subscription_status default 'trialing' not null,
  -- Stripe refs
  stripe_customer_id   text,
  stripe_subscription_id text,
  stripe_price_id      text,
  -- Cycle
  billing_period       text default 'monthly' check (billing_period in ('monthly', 'annual')),
  current_period_start timestamptz,
  current_period_end   timestamptz,
  cancel_at_period_end boolean default false not null,
  canceled_at          timestamptz,
  trial_ends_at        timestamptz,
  created_at           timestamptz default now() not null,
  updated_at           timestamptz default now() not null
);

create index subscriptions_status_idx on public.subscriptions(status);
create unique index subscriptions_stripe_sub_uniq on public.subscriptions(stripe_subscription_id)
  where stripe_subscription_id is not null;

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function extensions.moddatetime(updated_at);

-- ─── invoices ──────────────────────────────────────────────────────────────
create table public.invoices (
  id                    uuid primary key default gen_random_uuid(),
  tenant_id             uuid not null references public.tenants(id) on delete cascade,
  subscription_id       uuid references public.subscriptions(id) on delete set null,
  stripe_invoice_id     text unique,
  number                text,
  amount_usd            numeric(12,2) not null,
  currency              text default 'usd' not null,
  status                text not null check (status in ('draft', 'open', 'paid', 'void', 'uncollectible')),
  invoice_pdf_url       text,
  hosted_invoice_url    text,
  issued_at             timestamptz default now() not null,
  paid_at               timestamptz,
  due_at                timestamptz
);

create index invoices_tenant_idx on public.invoices(tenant_id, issued_at desc);
create index invoices_status_idx on public.invoices(status);

-- ─── usage_meters (track plan limits) ──────────────────────────────────────
create table public.usage_meters (
  tenant_id           uuid not null references public.tenants(id) on delete cascade,
  period_start        date not null,    -- 1er du mois
  campaigns_active    integer default 0 not null,
  creatives_generated integer default 0 not null,
  ai_decisions_count  integer default 0 not null,
  api_calls_count     bigint default 0 not null,
  primary key (tenant_id, period_start)
);

comment on table public.usage_meters is
  'Compteurs mensuels par tenant — utilisés pour appliquer les limites de plan et facturer overage';

-- ─── affiliates ────────────────────────────────────────────────────────────
create table public.affiliates (
  id                  uuid primary key default gen_random_uuid(),
  -- Un affilié peut être un user (creator) OU un tenant (B2B)
  user_id             uuid references auth.users(id) on delete cascade,
  tenant_id           uuid references public.tenants(id) on delete cascade,
  code                text unique not null check (code ~ '^[a-z0-9-]{3,40}$'),
  display_name        text not null,
  email               text not null,
  channel             text,                  -- 'youtube' | 'instagram' | 'linkedin' | etc.
  channel_url         text,
  audience_size       integer,
  tier                public.affiliate_tier default 'bronze' not null,
  commission_pct      numeric(5,4) default 0.20 not null,  -- 20% par défaut
  payout_method       public.payout_method default 'stripe_connect' not null,
  payout_account_ref  text,                  -- stripe connect account_id ou paypal email
  is_active           boolean default true not null,
  approved_at         timestamptz,
  approved_by         uuid references auth.users(id) on delete set null,
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null,
  -- Au moins user_id OU tenant_id doit être renseigné
  check (user_id is not null or tenant_id is not null)
);

create index affiliates_code_idx on public.affiliates(code);
create index affiliates_user_idx on public.affiliates(user_id) where user_id is not null;
create index affiliates_active_idx on public.affiliates(is_active, tier);

create trigger affiliates_set_updated_at
  before update on public.affiliates
  for each row execute function extensions.moddatetime(updated_at);

-- ─── referrals (clicks + signups attribués) ────────────────────────────────
create table public.referrals (
  id                  uuid primary key default gen_random_uuid(),
  affiliate_id        uuid not null references public.affiliates(id) on delete cascade,
  utm_source          text,                  -- canal UTM custom ("twitter", "yt-bio")
  -- Click tracking
  clicked_at          timestamptz default now() not null,
  ip_hash             text,                  -- IP hashée pour dédup, pas l'IP brute
  user_agent          text,
  referrer_url        text,
  -- Signup attribution (cookie 60j)
  signed_up_user_id   uuid references auth.users(id) on delete set null,
  signed_up_at        timestamptz,
  signed_up_tenant_id uuid references public.tenants(id) on delete set null,
  -- Conversion (became paying customer)
  converted_at        timestamptz,
  converted_to_plan   public.plan_tier
);

create index referrals_affiliate_idx on public.referrals(affiliate_id, clicked_at desc);
create index referrals_signed_up_idx on public.referrals(signed_up_user_id) where signed_up_user_id is not null;
create index referrals_converted_idx on public.referrals(affiliate_id) where converted_at is not null;

-- ─── payouts (versements aux affiliés) ─────────────────────────────────────
create table public.payouts (
  id                  uuid primary key default gen_random_uuid(),
  affiliate_id        uuid not null references public.affiliates(id) on delete cascade,
  amount_usd          numeric(12,2) not null check (amount_usd > 0),
  currency            text default 'usd' not null,
  period_start        date not null,
  period_end          date not null,
  status              public.payout_status default 'pending' not null,
  payout_method       public.payout_method not null,
  stripe_transfer_id  text,
  paid_at             timestamptz,
  failed_reason       text,
  created_at          timestamptz default now() not null,
  updated_at          timestamptz default now() not null,
  check (period_end >= period_start)
);

create index payouts_affiliate_idx on public.payouts(affiliate_id, created_at desc);
create index payouts_status_idx on public.payouts(status) where status in ('pending', 'ready', 'processing');

create trigger payouts_set_updated_at
  before update on public.payouts
  for each row execute function extensions.moddatetime(updated_at);

-- ─── commission_earnings (gains accumulés par mois et par référé) ─────────
create table public.commission_earnings (
  id                  uuid primary key default gen_random_uuid(),
  affiliate_id        uuid not null references public.affiliates(id) on delete cascade,
  referral_id         uuid references public.referrals(id) on delete set null,
  payout_id           uuid references public.payouts(id) on delete set null,
  period_start        date not null,
  amount_usd          numeric(12,2) not null,
  source_invoice_id   uuid references public.invoices(id) on delete set null,
  created_at          timestamptz default now() not null
);

create index commission_earnings_affiliate_idx on public.commission_earnings(affiliate_id, period_start desc);
create index commission_earnings_pending_idx on public.commission_earnings(affiliate_id) where payout_id is null;
