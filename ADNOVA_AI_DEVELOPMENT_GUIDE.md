# 🚀 AdNova AI — Guide de Développement Complet avec Agents IA

> **SaaS de gestion publicitaire multi-plateforme avec IA**  
> Stack: Vite + TypeScript + React | Cloudflare Workers | Supabase | Claude AI

---

## 📋 Table des Matières

1. [Vision Produit](#1-vision-produit)
2. [Architecture Globale](#2-architecture-globale)
3. [Stack Technique](#3-stack-technique)
4. [Structure du Projet](#4-structure-du-projet)
5. [Base de Données — Schéma Supabase](#5-base-de-données--schéma-supabase)
6. [Backend — Cloudflare Workers + Hono](#6-backend--cloudflare-workers--hono)
7. [Frontend — React + Vite + TailwindCSS](#7-frontend--react--vite--tailwindcss)
8. [Agents IA — Architecture Multi-Agent](#8-agents-ia--architecture-multi-agent)
9. [Intégrations Plateformes Publicitaires](#9-intégrations-plateformes-publicitaires)
10. [Génération Créatives IA](#10-génération-créatives-ia)
11. [Plan de Développement par Phases](#11-plan-de-développement-par-phases)
12. [Commandes Claude Code — Vérifications](#12-commandes-claude-code--vérifications)
13. [Variables d'Environnement](#13-variables-denvironnement)
14. [Tests & CI/CD](#14-tests--cicd)
15. [Déploiement](#15-déploiement)

---

## 1. Vision Produit

### Qu'est-ce qu'AdNova AI ?

AdNova AI est un SaaS tout-en-un permettant aux marketeurs, agences et e-commerçants de :

| Fonctionnalité | Description |
|---|---|
| 📊 **Suivi Multi-Plateforme** | Centraliser les métriques Meta, TikTok, Google, LinkedIn, Snapchat |
| 🚀 **Boost Intelligent** | Booster les ads performantes automatiquement avec des règles IA |
| 🎨 **Création Image Ads** | Générer des visuels publicitaires avec Stable Diffusion + Claude |
| 🎬 **Vidéo Ads IA** | Produire des vidéos ads animées avec des prompts texte |
| 👤 **UGC IA** | Générer des vidéos style "User Generated Content" avec avatars IA |
| 📈 **Analytics IA** | Insights et recommandations générés par Claude AI |
| 🤖 **Automatisation** | Agents IA qui optimisent les campagnes 24/7 |

### Personas Cibles

- **Agences Marketing** (10-50 clients, gestion centralisée)
- **E-commerçants** (Shopify, WooCommerce, solos à PME)
- **Growth Hackers** (testeurs de créatives, scaling rapide)
- **Grandes marques** (teams marketing internes)

### Modèle Tarifaire

```
Starter     : 49$/mois  — 3 comptes ads, 20 créatives IA/mois
Pro         : 149$/mois — 15 comptes ads, 100 créatives IA/mois
Agency      : 499$/mois — Illimité, white-label, API access
Enterprise  : Sur devis — SLA, dedicated support, custom agents
```

---

## 2. Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                        ADNOVA AI PLATFORM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │   Frontend   │    │   Backend    │    │   AI Agents      │   │
│  │  React/Vite  │◄──►│  CF Workers  │◄──►│  Claude + Tools  │   │
│  │  TypeScript  │    │  Hono API    │    │  Multi-Agent     │   │
│  └──────────────┘    └──────────────┘    └──────────────────┘   │
│         │                   │                      │             │
│         ▼                   ▼                      ▼             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │  Cloudflare  │    │   Supabase   │    │  Media Storage   │   │
│  │     CDN      │    │  PostgreSQL  │    │  Cloudflare R2   │   │
│  │    Pages     │    │  Auth + RT   │    │  + Sharp/FFMPEG  │   │
│  └──────────────┘    └──────────────┘    └──────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              PLATFORMS INTEGRATIONS                      │    │
│  │  Meta │ Google │ TikTok │ LinkedIn │ Snapchat │ Twitter  │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Stack Technique

### Frontend
```yaml
Framework:     React 18 + Vite 5 + TypeScript 5
Styling:       TailwindCSS 3 + shadcn/ui + Framer Motion
State:         Zustand + TanStack Query v5
Forms:         React Hook Form + Zod
Charts:        Recharts + Chart.js
Tables:        TanStack Table v8
Auth:          Supabase Auth (déjà intégré)
Routing:       React Router v6
Icons:         Lucide React
i18n:          react-i18next (FR/EN/ES)
```

### Backend
```yaml
Runtime:       Cloudflare Workers (Edge)
Framework:     Hono.js (ultra-léger, TypeScript-first)
ORM:           Drizzle ORM + Supabase PostgreSQL
Auth:          Supabase Auth + JWT
Queue:         Cloudflare Queues (jobs async)
Cache:         Cloudflare KV
Rate Limiting: Cloudflare Rate Limiting
Cron:          Cloudflare Cron Triggers
```

### Base de Données
```yaml
Primary DB:    Supabase PostgreSQL 15
Real-time:     Supabase Realtime (WebSocket)
Storage:       Supabase Storage + Cloudflare R2
Full-text:     PostgreSQL tsvector
```

### IA & ML
```yaml
LLM:           Claude claude-sonnet-4-20250514 (Agents + Texte)
Vision:        Claude Vision (analyse créatives)
Images:        Stable Diffusion XL via Replicate
Vidéo:         Runway ML / Kling AI API
UGC Avatars:   HeyGen API / D-ID API
Embeddings:    Voyage AI (analyse sémantique ads)
```

### DevOps
```yaml
Deploy FE:     Cloudflare Pages
Deploy BE:     Cloudflare Workers
CI/CD:         GitHub Actions
Monitoring:    Cloudflare Analytics + Sentry
Logs:          Axiom.co
Tests:         Vitest + Playwright
```

---

## 4. Structure du Projet

```
adnova-ai/
├── 📁 src/                          # Frontend React
│   ├── 📁 app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   ├── 📁 pages/
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── components/
│   │   ├── campaigns/
│   │   │   ├── CampaignsPage.tsx
│   │   │   ├── CampaignDetail.tsx
│   │   │   └── CreateCampaign.tsx
│   │   ├── creatives/
│   │   │   ├── CreativesPage.tsx
│   │   │   ├── ImageGenerator.tsx
│   │   │   ├── VideoGenerator.tsx
│   │   │   └── UGCGenerator.tsx
│   │   ├── analytics/
│   │   │   ├── AnalyticsPage.tsx
│   │   │   └── AIInsights.tsx
│   │   ├── automation/
│   │   │   ├── AutomationPage.tsx
│   │   │   └── AgentBuilder.tsx
│   │   ├── accounts/
│   │   │   └── ConnectedAccounts.tsx
│   │   ├── billing/
│   │   │   └── BillingPage.tsx
│   │   └── auth/
│   │       ├── LoginPage.tsx
│   │       └── OnboardingPage.tsx
│   ├── 📁 components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── charts/
│   │   │   ├── MetricsChart.tsx
│   │   │   ├── ROASChart.tsx
│   │   │   └── PlatformBreakdown.tsx
│   │   ├── ads/
│   │   │   ├── AdCard.tsx
│   │   │   ├── AdPreview.tsx
│   │   │   └── MetricsBadge.tsx
│   │   └── ai/
│   │       ├── AIChat.tsx
│   │       ├── InsightCard.tsx
│   │       └── AgentStatus.tsx
│   ├── 📁 hooks/
│   │   ├── useAds.ts
│   │   ├── useCampaigns.ts
│   │   ├── useAnalytics.ts
│   │   ├── useAIAgent.ts
│   │   └── useCreatives.ts
│   ├── 📁 stores/
│   │   ├── authStore.ts
│   │   ├── campaignStore.ts
│   │   └── uiStore.ts
│   ├── 📁 lib/
│   │   ├── api.ts                   # API client (Hono RPC)
│   │   ├── supabase.ts
│   │   └── utils.ts
│   └── 📁 types/
│       ├── ads.ts
│       ├── campaigns.ts
│       ├── platforms.ts
│       └── ai.ts
│
├── 📁 worker/                       # Backend Cloudflare Workers
│   ├── 📁 src/
│   │   ├── index.ts                 # Entry point Hono
│   │   ├── 📁 routes/
│   │   │   ├── auth.ts
│   │   │   ├── campaigns.ts
│   │   │   ├── ads.ts
│   │   │   ├── analytics.ts
│   │   │   ├── creatives.ts
│   │   │   ├── platforms.ts
│   │   │   ├── agents.ts
│   │   │   ├── billing.ts
│   │   │   └── webhooks.ts
│   │   ├── 📁 agents/
│   │   │   ├── orchestrator.ts      # Agent principal
│   │   │   ├── analyticsAgent.ts
│   │   │   ├── optimizationAgent.ts
│   │   │   ├── creativeAgent.ts
│   │   │   └── reportingAgent.ts
│   │   ├── 📁 integrations/
│   │   │   ├── meta.ts
│   │   │   ├── google.ts
│   │   │   ├── tiktok.ts
│   │   │   ├── linkedin.ts
│   │   │   └── snapchat.ts
│   │   ├── 📁 db/
│   │   │   ├── schema.ts            # Drizzle schema
│   │   │   ├── queries.ts
│   │   │   └── migrations/
│   │   ├── 📁 services/
│   │   │   ├── aiService.ts
│   │   │   ├── mediaService.ts
│   │   │   ├── billingService.ts
│   │   │   └── notificationService.ts
│   │   └── 📁 middleware/
│   │       ├── auth.ts
│   │       ├── rateLimit.ts
│   │       └── cors.ts
│   └── wrangler.jsonc
│
├── 📁 scripts/                      # Scripts utilitaires
│   ├── seed.ts
│   ├── migrate.ts
│   └── test-integrations.ts
│
├── 📁 tests/
│   ├── 📁 unit/
│   ├── 📁 integration/
│   └── 📁 e2e/
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── ecosystem.config.cjs
└── README.md
```

---

## 5. Base de Données — Schéma Supabase

### Migration SQL complète à exécuter dans Supabase

```sql
-- ============================================
-- ADNOVA AI — DATABASE SCHEMA v1.0
-- ============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- ORGANISATIONS & UTILISATEURS
-- ============================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'agency', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  credits_remaining INT NOT NULL DEFAULT 20,
  credits_reset_at TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMPTES PUBLICITAIRES CONNECTÉS
-- ============================================

CREATE TABLE ad_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'google', 'tiktok', 'linkedin', 'snapchat', 'twitter')),
  external_account_id TEXT NOT NULL,
  account_name TEXT NOT NULL,
  currency TEXT DEFAULT 'USD',
  timezone TEXT DEFAULT 'UTC',
  access_token TEXT, -- chiffré
  refresh_token TEXT, -- chiffré
  token_expires_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disconnected', 'error', 'paused')),
  last_sync_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, platform, external_account_id)
);

-- ============================================
-- CAMPAGNES
-- ============================================

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  ad_account_id UUID NOT NULL REFERENCES ad_accounts(id),
  external_campaign_id TEXT NOT NULL,
  name TEXT NOT NULL,
  objective TEXT,
  status TEXT DEFAULT 'active',
  budget_daily DECIMAL(12,2),
  budget_lifetime DECIMAL(12,2),
  spend_total DECIMAL(12,2) DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions INT DEFAULT 0,
  roas DECIMAL(8,4) DEFAULT 0,
  cpa DECIMAL(10,2),
  ctr DECIMAL(8,6),
  cpc DECIMAL(10,2),
  start_date DATE,
  end_date DATE,
  ai_score INT, -- Score IA de performance 0-100
  ai_recommendations JSONB DEFAULT '[]',
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AD SETS / GROUPES D'ANNONCES
-- ============================================

CREATE TABLE ad_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  external_adset_id TEXT NOT NULL,
  name TEXT NOT NULL,
  targeting JSONB DEFAULT '{}',
  budget_daily DECIMAL(12,2),
  status TEXT DEFAULT 'active',
  spend DECIMAL(12,2) DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  roas DECIMAL(8,4),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANNONCES INDIVIDUELLES
-- ============================================

CREATE TABLE ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_set_id UUID NOT NULL REFERENCES ad_sets(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  external_ad_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('image', 'video', 'carousel', 'collection', 'ugc')),
  headline TEXT,
  description TEXT,
  cta TEXT,
  creative_url TEXT,
  preview_url TEXT,
  status TEXT DEFAULT 'active',
  spend DECIMAL(12,2) DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions INT DEFAULT 0,
  roas DECIMAL(8,4),
  ctr DECIMAL(8,6),
  ai_generated BOOLEAN DEFAULT FALSE,
  ai_score INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MÉTRIQUES HISTORIQUES (time-series)
-- ============================================

CREATE TABLE metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('campaign', 'adset', 'ad', 'account')),
  entity_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  date DATE NOT NULL,
  spend DECIMAL(12,2) DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions INT DEFAULT 0,
  revenue DECIMAL(12,2) DEFAULT 0,
  roas DECIMAL(8,4),
  ctr DECIMAL(8,6),
  cpc DECIMAL(10,2),
  cpa DECIMAL(10,2),
  frequency DECIMAL(6,2),
  reach BIGINT DEFAULT 0,
  video_views BIGINT,
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, date)
);

-- Index pour les requêtes time-series
CREATE INDEX idx_metrics_daily_entity ON metrics_daily(entity_id, date DESC);
CREATE INDEX idx_metrics_daily_org ON metrics_daily(organization_id, date DESC);

-- ============================================
-- CRÉATIVES GÉNÉRÉES PAR L'IA
-- ============================================

CREATE TABLE creatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'ugc')),
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  style TEXT,
  format TEXT, -- '1:1', '9:16', '16:9', '4:5'
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  file_url TEXT,
  thumbnail_url TEXT,
  file_size INT,
  duration_seconds INT, -- pour vidéos
  generation_model TEXT,
  generation_params JSONB DEFAULT '{}',
  credits_used INT DEFAULT 1,
  used_in_ads JSONB DEFAULT '[]', -- IDs des ads qui utilisent cette créative
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AGENTS IA & AUTOMATISATIONS
-- ============================================

CREATE TABLE automation_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('schedule', 'metric_threshold', 'event', 'ai_recommendation')),
  trigger_config JSONB NOT NULL DEFAULT '{}',
  conditions JSONB DEFAULT '[]',
  actions JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  trigger_count INT DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agent_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  agent_type TEXT NOT NULL CHECK (agent_type IN ('analytics', 'optimization', 'creative', 'reporting', 'boost')),
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'cancelled')),
  input JSONB DEFAULT '{}',
  output JSONB DEFAULT '{}',
  steps JSONB DEFAULT '[]', -- Log des étapes de l'agent
  error_message TEXT,
  tokens_used INT DEFAULT 0,
  duration_ms INT,
  triggered_by TEXT, -- 'user', 'schedule', 'automation'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- NOTIFICATIONS & ALERTS
-- ============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS (Row Level Security)
-- ============================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;

-- Policies organisations
CREATE POLICY "Users see their org" ON organizations
  FOR ALL USING (
    id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Policies profiles
CREATE POLICY "Users manage their profile" ON profiles
  FOR ALL USING (id = auth.uid());

-- Policies ad_accounts
CREATE POLICY "Org members see their accounts" ON ad_accounts
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- Policies campaigns
CREATE POLICY "Org members see their campaigns" ON campaigns
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
  );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## 6. Backend — Cloudflare Workers + Hono

### `worker/src/index.ts` — Entry Point

```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { authMiddleware } from './middleware/auth'
import { authRoutes } from './routes/auth'
import { campaignsRoutes } from './routes/campaigns'
import { adsRoutes } from './routes/ads'
import { analyticsRoutes } from './routes/analytics'
import { creativesRoutes } from './routes/creatives'
import { agentsRoutes } from './routes/agents'
import { platformsRoutes } from './routes/platforms'
import { billingRoutes } from './routes/billing'
import { webhooksRoutes } from './routes/webhooks'

export type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_KEY: string
  ANTHROPIC_API_KEY: string
  REPLICATE_API_KEY: string
  HEYGEN_API_KEY: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  META_APP_ID: string
  META_APP_SECRET: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  TIKTOK_APP_ID: string
  TIKTOK_APP_SECRET: string
  R2_BUCKET: R2Bucket
  KV_CACHE: KVNamespace
  QUEUE: Queue
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware Global
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: ['https://app.adnova.ai', 'http://localhost:5173'],
  credentials: true,
}))

// Routes publiques
app.route('/auth', authRoutes)
app.route('/webhooks', webhooksRoutes)

// Routes protégées
app.use('/api/*', authMiddleware)
app.route('/api/campaigns', campaignsRoutes)
app.route('/api/ads', adsRoutes)
app.route('/api/analytics', analyticsRoutes)
app.route('/api/creatives', creativesRoutes)
app.route('/api/agents', agentsRoutes)
app.route('/api/platforms', platformsRoutes)
app.route('/api/billing', billingRoutes)

// Health check
app.get('/health', (c) => c.json({ status: 'ok', version: '1.0.0' }))

export default {
  fetch: app.fetch,
  // Cron Jobs
  async scheduled(event: ScheduledEvent, env: Bindings, ctx: ExecutionContext) {
    switch (event.cron) {
      case '*/15 * * * *': // Toutes les 15 min
        await syncAllPlatforms(env)
        break
      case '0 8 * * *': // Chaque matin 8h
        await runDailyReportAgent(env)
        break
      case '0 * * * *': // Chaque heure
        await runOptimizationAgent(env)
        break
    }
  }
}
```

### `worker/src/routes/analytics.ts` — Analytics avec IA

```typescript
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import Anthropic from '@anthropic-ai/sdk'

const analyticsRoutes = new Hono()

// Métriques agrégées
analyticsRoutes.get('/overview', async (c) => {
  const orgId = c.get('orgId')
  const { period = '30d', platform = 'all' } = c.req.query()
  
  // Fetch depuis Supabase
  const metrics = await fetchAggregatedMetrics(orgId, period, platform, c.env)
  
  return c.json({ success: true, data: metrics })
})

// Insights IA
analyticsRoutes.post('/ai-insights', async (c) => {
  const orgId = c.get('orgId')
  const { campaigns, period } = await c.req.json()
  
  const client = new Anthropic({ apiKey: c.env.ANTHROPIC_API_KEY })
  
  const metricsData = await fetchCampaignMetrics(campaigns, period, c.env)
  
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: `Tu es un expert en publicité digitale. Analyse les métriques publicitaires 
    et fournis des insights actionnables en JSON. Réponds UNIQUEMENT en JSON valide avec
    la structure: { insights: [], recommendations: [], alerts: [], score: number }`,
    messages: [{
      role: 'user',
      content: `Analyse ces données publicitaires sur ${period}:\n${JSON.stringify(metricsData, null, 2)}`
    }]
  })
  
  const insights = JSON.parse(response.content[0].text)
  return c.json({ success: true, data: insights })
})

export { analyticsRoutes }
```

### `worker/src/routes/creatives.ts` — Génération Créatives

```typescript
import { Hono } from 'hono'
import Anthropic from '@anthropic-ai/sdk'
import Replicate from 'replicate'

const creativesRoutes = new Hono()

// Génération image ad
creativesRoutes.post('/generate-image', async (c) => {
  const { prompt, style, format, brandColors, productDescription } = await c.req.json()
  const orgId = c.get('orgId')
  
  // 1. Améliorer le prompt avec Claude
  const claude = new Anthropic({ apiKey: c.env.ANTHROPIC_API_KEY })
  const enhancedPromptResponse = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Améliore ce prompt pour générer une image publicitaire professionnelle.
      Produit: ${productDescription}
      Style souhaité: ${style}
      Format: ${format}
      Couleurs de marque: ${brandColors?.join(', ')}
      Prompt original: ${prompt}
      
      Réponds UNIQUEMENT avec le prompt amélioré, sans explications.`
    }]
  })
  
  const enhancedPrompt = enhancedPromptResponse.content[0].text
  
  // 2. Générer avec Stable Diffusion XL via Replicate
  const replicate = new Replicate({ auth: c.env.REPLICATE_API_KEY })
  
  const [width, height] = getImageDimensions(format)
  
  const output = await replicate.run(
    'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37291fae01d7be353d34a9ac',
    {
      input: {
        prompt: enhancedPrompt,
        negative_prompt: 'blurry, low quality, text errors, watermark, nsfw',
        width,
        height,
        num_outputs: 4,
        guidance_scale: 7.5,
      }
    }
  )
  
  // 3. Uploader vers R2
  const uploadedUrls = await uploadToR2(output, orgId, c.env)
  
  // 4. Sauvegarder en DB
  const creative = await saveCreative({
    orgId,
    type: 'image',
    prompt: enhancedPrompt,
    urls: uploadedUrls,
    format,
    model: 'sdxl',
  }, c.env)
  
  return c.json({ success: true, data: creative })
})

// Génération vidéo UGC
creativesRoutes.post('/generate-ugc', async (c) => {
  const { script, avatar, language, duration, productUrl } = await c.req.json()
  
  // 1. Générer le script avec Claude si pas fourni
  let finalScript = script
  if (!script) {
    const claude = new Anthropic({ apiKey: c.env.ANTHROPIC_API_KEY })
    const scriptResponse = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Écris un script UGC (User Generated Content) authentique de ${duration} secondes 
        pour promouvoir ce produit: ${productUrl}
        Langue: ${language}
        Style: naturel, authentique, comme un vrai utilisateur
        Format: texte uniquement, ton parler en direct`
      }]
    })
    finalScript = scriptResponse.content[0].text
  }
  
  // 2. Générer la vidéo avec HeyGen
  const heygenResponse = await fetch('https://api.heygen.com/v2/video/generate', {
    method: 'POST',
    headers: {
      'X-Api-Key': c.env.HEYGEN_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      video_inputs: [{
        character: { type: 'avatar', avatar_id: avatar },
        voice: { type: 'text', input_text: finalScript, voice_id: 'en-US-JennyNeural' },
      }],
      dimension: { width: 1080, height: 1920 }, // 9:16 pour TikTok/Reels
    })
  })
  
  const { video_id } = await heygenResponse.json()
  
  // 3. Sauvegarder job en DB
  const creative = await saveCreative({
    orgId: c.get('orgId'),
    type: 'ugc',
    status: 'processing',
    externalJobId: video_id,
    script: finalScript,
  }, c.env)
  
  return c.json({ success: true, data: creative, videoId: video_id })
})

export { creativesRoutes }
```

---

## 7. Frontend — React + Vite + TailwindCSS

### `src/pages/dashboard/DashboardPage.tsx`

```tsx
import { useQuery } from '@tanstack/react-query'
import { MetricsOverview } from './components/MetricsOverview'
import { CampaignsTable } from './components/CampaignsTable'
import { AIInsightsPanel } from './components/AIInsightsPanel'
import { QuickActions } from './components/QuickActions'
import { PlatformBreakdown } from '../../components/charts/PlatformBreakdown'
import { api } from '../../lib/api'

export function DashboardPage() {
  const { data: overview, isLoading } = useQuery({
    queryKey: ['analytics', 'overview', '30d'],
    queryFn: () => api.analytics.getOverview({ period: '30d' }),
    refetchInterval: 5 * 60 * 1000, // Refresh toutes les 5 min
  })
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de vos campagnes</p>
        </div>
        <QuickActions />
      </div>
      
      {/* KPI Cards */}
      <MetricsOverview data={overview?.metrics} loading={isLoading} />
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PlatformBreakdown data={overview?.byPlatform} />
          <CampaignsTable limit={10} />
        </div>
        <div>
          <AIInsightsPanel />
        </div>
      </div>
    </div>
  )
}
```

### `src/pages/creatives/ImageGenerator.tsx`

```tsx
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Wand2, Download, RefreshCw, Zap } from 'lucide-react'
import { api } from '../../lib/api'

const STYLES = ['Photorealistic', 'Illustration', 'Minimalist', '3D Render', 'Vintage', 'Futuristic']
const FORMATS = [
  { label: 'Square 1:1', value: '1:1', desc: 'Facebook, Instagram' },
  { label: 'Portrait 4:5', value: '4:5', desc: 'Instagram Feed' },
  { label: 'Story 9:16', value: '9:16', desc: 'Stories, Reels, TikTok' },
  { label: 'Landscape 16:9', value: '16:9', desc: 'YouTube, Display' },
  { label: 'Banner 1200x628', value: '1200x628', desc: 'Facebook, LinkedIn' },
]

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('Photorealistic')
  const [format, setFormat] = useState('1:1')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  
  const generateMutation = useMutation({
    mutationFn: api.creatives.generateImage,
    onSuccess: (data) => {
      setGeneratedImages(data.urls)
    }
  })
  
  const handleGenerate = () => {
    generateMutation.mutate({ prompt, style, format })
  }
  
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Wand2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Générateur d'Images Ads</h1>
            <p className="text-gray-500 text-sm">Créez des visuels publicitaires en quelques secondes avec l'IA</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description de votre ad
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Chaussures de sport Nike pour femme, fond blanc, lumière studio, haute qualité..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      style === s 
                        ? 'border-purple-500 bg-purple-50 text-purple-700 font-medium' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <div className="space-y-2">
                {FORMATS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFormat(f.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all ${
                      format === f.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{f.label}</span>
                    <span className="text-gray-400 text-xs">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt || generateMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {generateMutation.isPending ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Génération en cours...</>
              ) : (
                <><Zap className="w-5 h-5" /> Générer 4 variations</>
              )}
            </button>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-3">
            {generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((url, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200">
                    <img src={url} alt={`Generated ad ${i+1}`} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="p-2 bg-white rounded-lg hover:bg-gray-100">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Wand2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Vos créatives apparaîtront ici</p>
                  <p className="text-sm mt-1">4 variations générées par requête</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 8. Agents IA — Architecture Multi-Agent

### Architecture des Agents

```
                    ┌─────────────────────┐
                    │   ORCHESTRATOR      │
                    │   (Claude Sonnet)   │
                    │   Coordinates all  │
                    │   sub-agents       │
                    └─────────┬───────────┘
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │  ANALYTICS   │  │ OPTIMIZATION │  │   CREATIVE   │
    │    AGENT     │  │    AGENT     │  │    AGENT     │
    │              │  │              │  │              │
    │ - Analyze    │  │ - Budget     │  │ - Generate   │
    │   metrics    │  │   realloc    │  │   images     │
    │ - Detect     │  │ - Pause/     │  │ - Write copy │
    │   anomalies  │  │   boost ads  │  │ - A/B ideas  │
    │ - Forecast   │  │ - Bid optim  │  │ - UGC scripts│
    └──────────────┘  └──────────────┘  └──────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
    ┌──────────────────────────────────────────────────┐
    │              REPORTING AGENT                      │
    │  - Daily/weekly reports                           │
    │  - Executive summaries                            │
    │  - Slack/Email notifications                      │
    └──────────────────────────────────────────────────┘
```

### `worker/src/agents/orchestrator.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk'
import { analyticsAgent } from './analyticsAgent'
import { optimizationAgent } from './optimizationAgent'
import { creativeAgent } from './creativeAgent'

export async function runOrchestrator(
  orgId: string,
  task: string,
  env: Bindings
): Promise<AgentResult> {
  
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })
  
  const tools: Anthropic.Tool[] = [
    {
      name: 'run_analytics_agent',
      description: 'Analyse les métriques publicitaires et détecte les anomalies',
      input_schema: {
        type: 'object' as const,
        properties: {
          period: { type: 'string', description: 'Période: 7d, 30d, 90d' },
          platforms: { type: 'array', items: { type: 'string' } },
          focus: { type: 'string', description: 'roas|cpa|ctr|spend|conversions' }
        },
        required: ['period']
      }
    },
    {
      name: 'run_optimization_agent',
      description: 'Optimise les campagnes: budget, enchères, pause/boost ads',
      input_schema: {
        type: 'object' as const,
        properties: {
          campaign_ids: { type: 'array', items: { type: 'string' } },
          optimization_goal: { type: 'string', description: 'roas|cpa|volume' },
          max_budget_change_pct: { type: 'number', description: 'Max % de changement budgétaire autorisé' }
        },
        required: ['optimization_goal']
      }
    },
    {
      name: 'run_creative_agent',
      description: "Génère des nouvelles créatives ou améliore les existantes",
      input_schema: {
        type: 'object' as const,
        properties: {
          ad_id: { type: 'string', description: 'Ad à améliorer (optionnel)' },
          type: { type: 'string', enum: ['image', 'video', 'copy', 'ugc'] },
          count: { type: 'number', description: 'Nombre de variations' }
        },
        required: ['type']
      }
    },
    {
      name: 'get_platform_metrics',
      description: 'Récupère les métriques depuis les plateformes',
      input_schema: {
        type: 'object' as const,
        properties: {
          platform: { type: 'string' },
          metric_type: { type: 'string' }
        },
        required: ['platform']
      }
    }
  ]
  
  const messages: Anthropic.MessageParam[] = [{
    role: 'user',
    content: task
  }]
  
  const steps: AgentStep[] = []
  let finalResult = ''
  
  // Agentic loop
  while (true) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: `Tu es l'orchestrateur d'AdNova AI. Tu coordonnes des sous-agents pour optimiser 
      les performances publicitaires de l'organisation ${orgId}.
      
      Tu as accès à des outils pour analyser les données, optimiser les campagnes et créer des contenus.
      Utilise-les de manière stratégique pour accomplir la tâche demandée.
      Sois précis, data-driven et fournis des recommandations actionnables.`,
      tools,
      messages
    })
    
    // Enregistrer l'étape
    steps.push({
      type: 'llm',
      content: response.content,
      tokens: response.usage.output_tokens
    })
    
    // Stop si fin ou pas d'outil
    if (response.stop_reason === 'end_turn') {
      finalResult = response.content
        .filter(b => b.type === 'text')
        .map(b => (b as Anthropic.TextBlock).text)
        .join('\n')
      break
    }
    
    if (response.stop_reason !== 'tool_use') break
    
    // Exécuter les outils
    const toolResults: Anthropic.MessageParam = {
      role: 'user',
      content: []
    }
    
    for (const block of response.content) {
      if (block.type !== 'tool_use') continue
      
      let result: unknown
      
      switch (block.name) {
        case 'run_analytics_agent':
          result = await analyticsAgent(orgId, block.input as AnalyticsInput, env)
          break
        case 'run_optimization_agent':
          result = await optimizationAgent(orgId, block.input as OptimizationInput, env)
          break
        case 'run_creative_agent':
          result = await creativeAgent(orgId, block.input as CreativeInput, env)
          break
        case 'get_platform_metrics':
          result = await getPlatformMetrics(orgId, block.input as MetricsInput, env)
          break
      }
      
      ;(toolResults.content as Anthropic.ToolResultBlockParam[]).push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: JSON.stringify(result)
      })
      
      steps.push({ type: 'tool', name: block.name, input: block.input, output: result })
    }
    
    messages.push({ role: 'assistant', content: response.content })
    messages.push(toolResults)
  }
  
  return { result: finalResult, steps, tokensUsed: calculateTokens(steps) }
}
```

---

## 9. Intégrations Plateformes Publicitaires

### `worker/src/integrations/meta.ts`

```typescript
export class MetaAdsIntegration {
  private baseUrl = 'https://graph.facebook.com/v19.0'
  
  constructor(private accessToken: string) {}
  
  async getCampaigns(adAccountId: string): Promise<MetaCampaign[]> {
    const fields = 'id,name,status,objective,daily_budget,lifetime_budget,start_time,stop_time'
    const url = `${this.baseUrl}/act_${adAccountId}/campaigns?fields=${fields}&access_token=${this.accessToken}`
    
    const response = await fetch(url)
    const data = await response.json()
    return data.data
  }
  
  async getCampaignInsights(campaignId: string, period: string): Promise<MetaInsights> {
    const dateRange = getDateRange(period)
    const fields = 'spend,impressions,clicks,actions,roas,ctr,cpc,cpm,frequency,reach'
    
    const url = `${this.baseUrl}/${campaignId}/insights?fields=${fields}&time_range=${JSON.stringify(dateRange)}&access_token=${this.accessToken}`
    
    const response = await fetch(url)
    return response.json()
  }
  
  async updateCampaignBudget(campaignId: string, dailyBudget: number): Promise<void> {
    await fetch(`${this.baseUrl}/${campaignId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        daily_budget: dailyBudget * 100, // Meta uses cents
        access_token: this.accessToken,
      })
    })
  }
  
  async pauseAd(adId: string): Promise<void> {
    await fetch(`${this.baseUrl}/${adId}`, {
      method: 'POST',
      body: new URLSearchParams({
        status: 'PAUSED',
        access_token: this.accessToken,
      })
    })
  }
  
  async getOAuthUrl(appId: string, redirectUri: string): string {
    const scopes = ['ads_management', 'ads_read', 'business_management'].join(',')
    return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&response_type=code`
  }
}
```

---

## 10. Génération Créatives IA

### Workflow Complet

```
Utilisateur saisit prompt
        │
        ▼
Claude améliore le prompt
  + analyse le brief
  + ajoute détails techniques
        │
        ▼
Stable Diffusion XL génère
  4 variations (Replicate)
        │
        ▼
Claude Vision évalue
  chaque image (0-10)
  + détecte problèmes
        │
        ▼
Upload vers Cloudflare R2
  + génère thumbnails
        │
        ▼
Sauvegarde Supabase
  + notification user
```

### Helper `getImageDimensions`

```typescript
export function getImageDimensions(format: string): [number, number] {
  const dimensions: Record<string, [number, number]> = {
    '1:1':      [1024, 1024],
    '4:5':      [820, 1024],
    '9:16':     [576, 1024],
    '16:9':     [1024, 576],
    '1200x628': [1200, 628],
  }
  return dimensions[format] ?? [1024, 1024]
}
```

---

## 11. Plan de Développement par Phases

### PHASE 1 — Foundation (Semaines 1-2)
**Objectif: Infrastructure + Auth + Dashboard de base**

```bash
# Tâches agents Claude Code:

## BACKEND
- [ ] Setup Cloudflare Workers + Hono
- [ ] Configurer Supabase (schéma SQL complet)
- [ ] Auth endpoints (login, register, OAuth)
- [ ] Middleware auth + rate limiting
- [ ] Health check + monitoring

## FRONTEND  
- [ ] Setup Vite + React + TailwindCSS + shadcn/ui
- [ ] Layout principal (Sidebar + Header)
- [ ] Auth pages (Login, Register, Onboarding)
- [ ] Dashboard skeleton
- [ ] Routeur + protected routes

## TESTS
- [ ] Tests unitaires auth
- [ ] Tests API health check
```

### PHASE 2 — Intégrations Plateformes (Semaines 3-4)
**Objectif: Connecter Meta + Google + TikTok**

```bash
## BACKEND
- [ ] OAuth flow Meta Ads
- [ ] OAuth flow Google Ads  
- [ ] OAuth flow TikTok Ads
- [ ] Sync campagnes (cron job 15min)
- [ ] Stockage métriques (metrics_daily)

## FRONTEND
- [ ] Page "Comptes connectés"
- [ ] Flow connexion OAuth (popup)
- [ ] Affichage campagnes importées
- [ ] Métriques en temps réel
- [ ] Filtres plateforme + période

## TESTS
- [ ] Mock APIs plateformes
- [ ] Tests sync campagnes
```

### PHASE 3 — Analytics IA (Semaines 5-6)
**Objectif: Dashboard analytics + Insights Claude**

```bash
## BACKEND
- [ ] Routes analytics (/overview, /campaigns, /ads)
- [ ] Agent Analytics Claude
- [ ] Calcul ROAS, CPA, CTR automatique
- [ ] Détection anomalies (chute/hausse soudaine)
- [ ] Système de scoring campagnes (0-100)

## FRONTEND
- [ ] Dashboard analytics complet
- [ ] Graphiques (Recharts): ROAS, Spend, CTR
- [ ] Panel "AI Insights" avec recommandations
- [ ] Comparaison périodes (vs N-1)
- [ ] Export CSV/PDF des rapports

## TESTS
- [ ] Tests calculs métriques
- [ ] Tests agent analytics
```

### PHASE 4 — Génération Créatives (Semaines 7-8)
**Objectif: Image Ads + Video Ads + UGC Generator**

```bash
## BACKEND
- [ ] Route génération images (SDXL + Replicate)
- [ ] Route génération vidéo (Runway ML)
- [ ] Route UGC (HeyGen)
- [ ] Upload R2 + gestion médias
- [ ] Système de crédits

## FRONTEND
- [ ] Image Generator UI
- [ ] Video Generator UI  
- [ ] UGC Generator UI (choix avatar)
- [ ] Galerie des créatives
- [ ] Export + utilisation dans campagnes

## TESTS
- [ ] Mock APIs génération
- [ ] Tests upload R2
```

### PHASE 5 — Automatisation & Agents (Semaines 9-10)
**Objectif: Agent orchestrateur + règles d'automation**

```bash
## BACKEND
- [ ] Agent orchestrateur multi-agent
- [ ] Agent optimization (boost/pause automatique)
- [ ] Agent reporting (rapports journaliers)
- [ ] Rules engine (si ROAS < X → pause)
- [ ] Cloudflare Queues pour jobs async

## FRONTEND
- [ ] Page "Automation" 
- [ ] Builder de règles (UI no-code)
- [ ] Logs des agents en temps réel
- [ ] Notifications push
- [ ] Page "Agent Runs" avec historique

## TESTS
- [ ] Tests règles d'automation
- [ ] Tests agents E2E
```

### PHASE 6 — Billing + Polish (Semaines 11-12)
**Objectif: Stripe + Onboarding + Production**

```bash
## BACKEND
- [ ] Intégration Stripe (subscriptions)
- [ ] Webhook Stripe
- [ ] Système de crédits créatives
- [ ] Rate limiting par plan
- [ ] API documentation (Hono OpenAPI)

## FRONTEND
- [ ] Page Billing (plans + upgrade)
- [ ] Onboarding wizard (5 étapes)
- [ ] Page Settings (org, team, notifications)
- [ ] Mode sombre
- [ ] Mobile responsive complet

## DÉPLOIEMENT
- [ ] CI/CD GitHub Actions
- [ ] Domaine custom + SSL
- [ ] Monitoring Sentry
- [ ] Documentation utilisateur
```

---

## 12. Commandes Claude Code — Vérifications

### Installation et Setup Initial

```bash
# Vérifier la structure actuelle du projet
claude "Analyse la structure du projet dans le dossier courant. 
Vérifie package.json, tsconfig.json, vite.config.ts et wrangler.jsonc.
Liste ce qui est déjà en place et ce qu'il faut ajouter."

# Initialiser le backend
claude "Dans le dossier worker/, crée un backend Cloudflare Workers avec Hono.
Installe: hono, @hono/zod-validator, zod, @anthropic-ai/sdk, drizzle-orm, @supabase/supabase-js.
Configure wrangler.jsonc avec les bindings KV, R2, Queue et les variables d'env."

# Setup Supabase
claude "Crée le fichier worker/src/db/schema.ts avec Drizzle ORM.
Le schéma doit inclure: organizations, profiles, ad_accounts, campaigns, 
ad_sets, ads, metrics_daily, creatives, automation_rules, agent_runs, notifications.
Génère aussi les types TypeScript correspondants."
```

### Vérifications Backend

```bash
# Test des routes
claude "Vérifie que toutes les routes API dans worker/src/routes/ sont correctement 
typées avec Hono. Assure-toi que chaque route a: validation Zod, gestion d'erreurs,
réponses typées. Lance 'wrangler dev' et teste les endpoints."

# Test authentification
claude "Teste le flux d'authentification complet:
1. Register avec email/password
2. Login et récupération JWT
3. Accès route protégée avec token valide
4. Rejet avec token invalide
5. Refresh token
Utilise Supabase Auth. Vérifie les RLS policies."

# Test intégrations plateformes
claude "Crée des mocks pour les APIs Meta, Google Ads et TikTok.
Teste le flux OAuth complet pour chaque plateforme.
Vérifie que les tokens sont correctement chiffrés en DB.
Lance les tests avec: npx vitest run worker/tests/integrations/"

# Vérification sécurité
claude "Audite la sécurité du backend:
1. Vérifie que tous les tokens sont chiffrés (AES-256)
2. Contrôle les rate limits sur toutes les routes
3. Vérifie les CORS headers
4. S'assure que les secrets ne sont jamais exposés dans les réponses
5. Teste les injections SQL (Drizzle les prévient mais vérifier)
Génère un rapport de sécurité."
```

### Vérifications Frontend

```bash
# Vérification TypeScript
claude "Lance 'npx tsc --noEmit' dans le projet. 
Corrige toutes les erreurs TypeScript. 
Assure-toi que tous les composants sont correctement typés,
en particulier les hooks React Query et les appels API."

# Test build production
claude "Lance 'npm run build' et vérifie:
1. Aucune erreur de compilation
2. Bundle size < 500KB (main chunk)
3. Code splitting pour les pages lazy-loaded
4. Assets optimisés
Propose des optimisations si le bundle est trop lourd."

# Test responsive
claude "Vérifie que les pages suivantes sont correctement responsive:
- Dashboard (mobile + tablet + desktop)
- Image Generator
- Campaigns list
- Analytics
Utilise Playwright pour faire des screenshots à différentes résolutions."

# Performance
claude "Analyse les performances du frontend avec Lighthouse.
Objectifs: Performance > 90, Accessibility > 95, Best Practices > 90.
Identifie et corrige les problèmes de performance."
```

### Tests E2E avec Playwright

```bash
# Setup Playwright
claude "Installe et configure Playwright pour les tests E2E.
Crée les tests suivants dans tests/e2e/:
1. auth.spec.ts: register, login, logout
2. dashboard.spec.ts: affichage métriques, navigation
3. campaigns.spec.ts: liste campagnes, détail
4. creatives.spec.ts: génération image (avec mock API)
5. billing.spec.ts: upgrade plan, checkout Stripe (mode test)"

# Lancement tests
claude "Lance tous les tests E2E: npx playwright test
Si des tests échouent, analyse les screenshots/vidéos dans tests/e2e/results/
et corrige les problèmes."
```

### Vérifications Agents IA

```bash
# Test Agent Analytics
claude "Teste l'agent analytics avec des données de campagnes mockées.
L'agent doit:
1. Identifier les campagnes sous-performantes (ROAS < 2)
2. Détecter les anomalies (chute de CTR > 30%)
3. Générer 3 recommandations actionnables
4. Calculer un score global 0-100
Vérifie que la réponse est du JSON valide et bien structuré."

# Test Agent Optimisation
claude "Teste l'agent d'optimisation avec des campagnes test.
Vérifie qu'il:
1. Ne dépasse jamais le max_budget_change_pct configuré
2. Ne pause jamais une campagne sans log de raison
3. Enregistre chaque action dans agent_runs
4. Envoie une notification à l'utilisateur après chaque action"

# Test Génération Créatives
claude "Teste la chaîne complète de génération d'image:
1. Amélioration du prompt par Claude (vérifier qualité)
2. Appel Replicate (mode mock)
3. Upload R2 (mode mock)
4. Sauvegarde DB avec bon status
5. Déduction crédits utilisateur
Assure-toi que les erreurs sont bien gérées à chaque étape."
```

### Vérifications Base de Données

```bash
# Vérification RLS
claude "Vérifie toutes les Row Level Security policies dans Supabase.
Pour chaque table, teste:
- Un utilisateur peut voir UNIQUEMENT les données de son organisation
- Un viewer ne peut pas modifier
- Un admin peut modifier mais pas supprimer l'org
- Les tokens OAuth sont inaccessibles hors backend
Génère un rapport des policies et teste chaque scénario."

# Performance requêtes
claude "Analyse les requêtes SQL les plus fréquentes de l'application.
Pour chaque requête:
1. Vérifie qu'il y a un index approprié
2. Lance EXPLAIN ANALYZE
3. Propose des optimisations
Focus: metrics_daily (time-series), campaigns (liste filtrée), ads (par campagne)"

# Backup & Migration
claude "Crée un script scripts/migrate.ts qui:
1. Applique les migrations dans l'ordre
2. Vérifie l'intégrité après chaque migration
3. Supporte le rollback
4. Log chaque opération
Teste le script sur une DB de test Supabase."
```

### Déploiement & CI/CD

```bash
# Pipeline GitHub Actions
claude "Crée le fichier .github/workflows/ci.yml avec:
1. Sur PR: lint, typecheck, tests unitaires
2. Sur main: + tests E2E + build + deploy preview
3. Sur release: deploy production Cloudflare Pages + Workers
4. Notifications Slack en cas d'échec
Variables secrets à configurer: CLOUDFLARE_API_TOKEN, SUPABASE_SERVICE_KEY, etc."

# Vérification déploiement
claude "Après déploiement sur Cloudflare:
1. Teste l'endpoint /health du Worker
2. Vérifie les variables d'env (sans les exposer)
3. Teste une authentification complète en production
4. Vérifie les métriques Cloudflare Analytics
5. Lance un test de charge basique (100 req/s pendant 30s)
Génère un rapport de santé du déploiement."
```

---

## 13. Variables d'Environnement

### `.env.local` (Frontend Vite)

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxx
VITE_API_URL=http://localhost:8787
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxx
VITE_APP_URL=http://localhost:5173
```

### `wrangler.jsonc` (Cloudflare Workers)

```jsonc
{
  "name": "adnova-api",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",
  "vars": {
    "ENVIRONMENT": "development"
  },
  "kv_namespaces": [
    { "binding": "KV_CACHE", "id": "xxxx" }
  ],
  "r2_buckets": [
    { "binding": "R2_BUCKET", "bucket_name": "adnova-media" }
  ],
  "queues": {
    "producers": [{ "binding": "QUEUE", "queue": "adnova-jobs" }],
    "consumers": [{ "queue": "adnova-jobs", "max_batch_size": 10 }]
  },
  "triggers": {
    "crons": ["*/15 * * * *", "0 8 * * *", "0 * * * *"]
  }
}
```

### Secrets à configurer dans Cloudflare Dashboard

```bash
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_KEY
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put REPLICATE_API_KEY
wrangler secret put HEYGEN_API_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
wrangler secret put META_APP_ID
wrangler secret put META_APP_SECRET
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
wrangler secret put TIKTOK_APP_ID
wrangler secret put TIKTOK_APP_SECRET
wrangler secret put ENCRYPTION_KEY  # Pour chiffrer les tokens OAuth
```

---

## 14. Tests & CI/CD

### `package.json` — Scripts de tests

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "worker:dev": "cd worker && wrangler dev",
    "worker:deploy": "cd worker && wrangler deploy",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "tsx scripts/migrate.ts",
    "db:seed": "tsx scripts/seed.ts"
  }
}
```

---

## 15. Déploiement

### Architecture Production

```
GitHub Push to main
      │
      ▼
GitHub Actions CI
  ├── Lint + TypeCheck
  ├── Unit Tests (Vitest)
  ├── E2E Tests (Playwright)
  └── Build ✓
      │
      ▼
Cloudflare Pages    Cloudflare Workers
(Frontend React)    (Backend Hono API)
      │                    │
      └──────┬─────────────┘
             │
             ▼
         Supabase
      (PostgreSQL + Auth)
             │
             ▼
      Cloudflare R2
      (Media Storage)
```

### Commandes de déploiement

```bash
# Frontend
npm run build
npx wrangler pages deploy dist --project-name adnova-app

# Backend  
cd worker
wrangler deploy --env production

# Vérification post-deploy
curl https://api.adnova.ai/health
# Attendu: {"status":"ok","version":"1.0.0"}
```

---

## 🎯 Prochaines Étapes Immédiates

Voici l'ordre exact pour démarrer avec Claude Code dès maintenant :

```bash
# 1. Ouvrir Claude Code dans le dossier du projet
claude

# 2. Première commande à lancer
"Analyse la structure actuelle du projet (voir les fichiers existants).
Dis-moi exactement ce qui est déjà configuré dans package.json, vite.config.ts 
et wrangler.jsonc. Ensuite liste les 5 premières tâches à faire pour 
implémenter la Phase 1 de AdNova AI."

# 3. Ensuite enchaîner avec
"Crée le dossier worker/ avec un backend Cloudflare Workers Hono complet.
Include: entry point, middleware auth, route /health, et la connexion Supabase."

# 4. Frontend
"Dans src/, crée la structure de base du frontend AdNova AI:
- Layout avec Sidebar navigation (Dashboard, Campagnes, Créatives, Analytics, Automation, Billing)
- Router React avec routes protégées
- Store Zustand pour l'auth
- Hook useAuth avec Supabase"
```

---

*Dernière mise à jour: Mai 2026 | AdNova AI v1.0 Development Guide*
