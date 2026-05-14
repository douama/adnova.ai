
-- ─── Extensions ─────────────────────────────────────────────────────────────
-- pgvector : embeddings IA (semantic memory pour creatives/audiences/decisions)
-- pg_cron  : scheduler pour jobs périodiques (claude-decide loop, daily rollups)
-- moddatetime : trigger maintenance auto de la colonne updated_at
create extension if not exists vector with schema extensions;
create extension if not exists pg_cron;
create extension if not exists moddatetime with schema extensions;

-- ─── Enums du domaine ───────────────────────────────────────────────────────

-- Rôles dans un workspace (tenant)
create type public.tenant_role as enum ('owner', 'admin', 'editor', 'viewer');

-- Plans tarifaires (sync avec Stripe)
create type public.plan_tier as enum ('trial', 'starter', 'growth', 'enterprise');

-- Statut d'abonnement (mirror Stripe)
create type public.subscription_status as enum (
  'trialing', 'active', 'past_due', 'canceled', 'incomplete', 'paused'
);

-- Statut d'un tenant (admin)
create type public.tenant_status as enum ('active', 'trial', 'suspended', 'churned');

-- Plateformes publicitaires supportées
create type public.ad_platform as enum (
  'meta', 'google', 'tiktok', 'linkedin', 'snapchat', 'pinterest', 'x', 'youtube', 'amazon'
);

-- Statut d'une campagne
create type public.campaign_status as enum (
  'draft', 'live', 'scaling', 'paused', 'killed', 'archived'
);

-- Type de créatif
create type public.creative_type as enum ('image', 'video', 'ugc_video', 'carousel', 'copy_only');

-- Statut d'un créatif (lifecycle A/B test)
create type public.creative_status as enum ('draft', 'testing', 'winner', 'killed', 'archived');

-- Type de décision IA (Decision Log)
create type public.decision_type as enum (
  'scale', 'kill', 'create', 'budget_realloc', 'audience_expand', 'audience_narrow',
  'bid_adjust', 'pause', 'resume', 'guardrail_block'
);

-- Mode d'autonomie de l'IA (paramétré par tenant)
create type public.ai_mode as enum ('advisory', 'guardrails', 'autonomous');

-- Statut d'une décision IA
create type public.decision_status as enum ('proposed', 'executed', 'rolled_back', 'blocked', 'rejected');

-- Statut d'un payout affilié
create type public.payout_status as enum ('pending', 'ready', 'processing', 'paid', 'failed', 'kyc_required');

-- Méthode de paiement payout
create type public.payout_method as enum ('stripe_connect', 'paypal', 'sepa', 'wise');

-- Tier d'affiliation (calculé chaque 1er du mois selon nombre référés actifs)
create type public.affiliate_tier as enum ('bronze', 'silver', 'gold', 'diamond');
