# Deploy — AdNova AI

Production setup for the new `apps/web` React app at **app.adnova.ai**.
The legacy `adnova.ai` landing (Hono SSR) is already in prod and unrelated.

---

## 0. Architecture at a glance

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   app.adnova.ai  ──→  Cloudflare Pages  (SPA, apps/web build)  │
│                                                                │
│                          ↓ HTTPS                               │
│                                                                │
│   Supabase project jrfxmgxtnftbcxoqzagz                        │
│     ├── Postgres 17 + pgvector + pg_cron + pg_net              │
│     ├── Auth (PKCE + magic links)                              │
│     ├── Realtime (postgres_changes)                            │
│     ├── Storage (creatives, avatars)                           │
│     ├── Edge Functions                                         │
│     │     ├── claude-decide  (v6, Anthropic Sonnet 4.5)        │
│     │     ├── embed-decision (v1, OpenAI text-embed-3-small)   │
│     │     └── healthcheck    (v1, public probe)                │
│     └── Vault (service_role_key for pg_cron loop)              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 1. One-time backend setup

Already done — but if you ever restore from backup or fork the project,
re-run these in order.

### 1.1 Apply migrations

```bash
# From repo root, with `supabase` CLI logged in:
supabase link --project-ref jrfxmgxtnftbcxoqzagz
supabase db push
```

### 1.2 Edge Function secrets

Dashboard → **Edge Functions → Secrets** (or via CLI):

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set OPENAI_API_KEY=sk-...        # optional, enables semantic memory
```

### 1.3 Vault : service_role_key (autonomous loop)

SQL editor, **once**:

```sql
select vault.create_secret(
  'eyJ...your-service-role-jwt...',   -- Settings → API → service_role secret
  'service_role_key'
);
```

Without this, pg_cron fires every 30 min but skips silently with a `notice`.

### 1.4 Enable leaked password protection

Dashboard → **Authentication → Providers → Email** → enable
"Confirm email" + "Check leaked password (HaveIBeenPwned)". This kills the
last advisor warning.

---

## 2. Deploy the React app to Cloudflare Pages

### 2.1 First-time project creation

```bash
cd apps/web

# Verify build works locally first
pnpm install
pnpm typecheck
pnpm build

# Create the Cloudflare Pages project (one-time)
npx wrangler pages project create adnova-app \
  --production-branch main \
  --compatibility-date 2026-01-01
```

### 2.2 Subsequent deploys

```bash
cd apps/web && pnpm deploy
```

That's `pnpm build && wrangler pages deploy dist --project-name adnova-app`
(see `package.json`).

### 2.3 Environment variables in Cloudflare

Dashboard → **Pages → adnova-app → Settings → Environment variables**.
Set for **Production**:

```
VITE_SUPABASE_URL=https://jrfxmgxtnftbcxoqzagz.supabase.co
VITE_SUPABASE_ANON_KEY=<the anon key from Supabase → Settings → API>
```

### 2.4 Custom domain

Dashboard → **Pages → adnova-app → Custom domains → Set up a custom domain**
→ enter `app.adnova.ai`.

Cloudflare will tell you to add a CNAME record. If your DNS is also on
Cloudflare, it auto-creates. Otherwise add manually:

```
CNAME  app.adnova.ai  →  adnova-app.pages.dev
```

Wait for SSL provisioning (~1-2 min). The site is live.

### 2.5 SPA routing fallback

React Router needs all unknown paths to serve `index.html`. Create
`apps/web/public/_redirects` if it doesn't exist:

```
/*  /index.html  200
```

(Cloudflare Pages reads this at build time.)

---

## 3. Operational checks

### 3.1 Healthcheck

The `healthcheck` Edge Function is public (no JWT). Pipe it into any
uptime monitor :

```
GET https://jrfxmgxtnftbcxoqzagz.supabase.co/functions/v1/healthcheck
```

Returns `200 ok` when DB + Anthropic are reachable, `503 down` otherwise.
OpenAI status is informational and never fails the check.

For low-latency probes (skip Anthropic + OpenAI):

```
GET https://jrfxmgxtnftbcxoqzagz.supabase.co/functions/v1/healthcheck?fast=1
```

Recommended cadence : 60s for an uptime monitor (UptimeRobot has a free
plan covering this).

### 3.2 Cost monitoring

```sql
-- Today's Anthropic spend
select count(*) as runs,
       sum(decisions_count) as decisions,
       sum(cost_usd_estimate) as cost_usd
from public.ai_run_log
where started_at >= date_trunc('day', now());

-- Last 7 days, by day
select date_trunc('day', started_at) as day,
       count(*) as runs,
       sum(cost_usd_estimate) as cost_usd,
       avg(duration_ms) / 1000.0 as avg_seconds
from public.ai_run_log
where started_at >= now() - interval '7 days'
group by 1 order by 1 desc;

-- Top failing tenants
select t.name, count(*) as failures,
       array_agg(distinct l.error_message) as errors
from public.ai_run_log l
join public.tenants t on t.id = l.tenant_id
where l.status = 'failed'
  and l.started_at >= now() - interval '24 hours'
group by t.name
order by failures desc;
```

### 3.3 Frontend error triage

The `ErrorBoundary` writes to `public.client_errors`. Only super-admins
read:

```sql
select created_at, message, url, user_agent
from public.client_errors
order by created_at desc
limit 50;
```

---

## 4. Disaster recovery

| Failure                           | Recovery                                                |
|-----------------------------------|---------------------------------------------------------|
| Supabase project down             | Wait — managed service. Status: status.supabase.com     |
| Anthropic API down                | `claude-decide` returns 502, `ai_run_log` marks failed. UI shows error. Nothing crashes. |
| OpenAI API down                   | Embeddings skipped, `ai_decisions.embedding` stays null. Semantic memory degrades, rule-based memory still works. |
| Vault `service_role_key` deleted  | Cron loop silently skips. Re-add via `vault.create_secret`. |
| Cloudflare Pages deploy bad       | `wrangler pages deployment list --project-name adnova-app` then `wrangler pages deployment rollback <id>` |
| Bad migration applied             | Restore from Supabase point-in-time backup (PITR) — Dashboard → Database → Backups |

---

## 5. Rolling out a new Edge Function version

Edge Functions are versioned. Every deploy creates a new version. To roll
back:

```bash
# List versions
supabase functions list

# Re-deploy a previous version manually (no built-in rollback CLI yet —
# you check out the git ref where that version lived and deploy from there)
git checkout <ref>
supabase functions deploy claude-decide
```

For zero-downtime rollouts of a behavior change, deploy a new function
name (`claude-decide-v7`) and feature-flag the caller — but this is rarely
worth it. Most Edge Function changes are forward-compatible.

---

## 6. Last-mile checklist

Before flipping `app.adnova.ai` to a public audience :

- [ ] `pnpm typecheck` and `pnpm build` both clean in `apps/web`
- [ ] `ANTHROPIC_API_KEY` set in Edge Function secrets
- [ ] Vault `service_role_key` populated (verify with the SQL in `supabase/SETUP.md`)
- [ ] `OPENAI_API_KEY` set (optional but recommended)
- [ ] Leaked-password protection enabled in Auth settings
- [ ] DNS CNAME pointing to `adnova-app.pages.dev`
- [ ] Cloudflare SSL cert active for `app.adnova.ai`
- [ ] Uptime monitor pointed at `/functions/v1/healthcheck`
- [ ] Manually trigger one `claude-decide` from the dashboard and verify
      AI Activity panel shows the run in green
