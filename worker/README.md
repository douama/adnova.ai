# AdNova AI — Worker (Backend)

Cloudflare Workers + Hono + Drizzle + Supabase. **Phase 1 — Foundation.**

Le `src/` à la racine du repo (Hono SSR v3.0) reste intact ; ce dossier est la **nouvelle stack cible** côté backend.

---

## 1. Provisionner Supabase

1. Créer un projet sur https://supabase.com → noter `PROJECT_REF` + DB password.
2. **SQL Editor** → coller `src/db/migrations/0001_init.sql` → Run. Vérifier les 11 tables + RLS activée.
3. **Settings → API** : copier `Project URL`, `anon public`, `service_role`, `JWT Secret`.
4. **Authentication → Providers → Email** : activer, désactiver "Confirm email" en dev.

---

## 2. Provisionner Cloudflare

```bash
cd worker
npm install

# KV
npx wrangler kv namespace create KV_CACHE
# → copier l'id retourné dans wrangler.jsonc (remplace REPLACE_WITH_KV_ID)

# R2
npx wrangler r2 bucket create adnova-media

# Queue
npx wrangler queues create adnova-jobs
```

---

## 3. Secrets locaux

```bash
cp .dev.vars.example .dev.vars
# Remplir SUPABASE_*, ANTHROPIC_API_KEY, ENCRYPTION_KEY (= openssl rand -base64 32)
```

Pour la prod :
```bash
npx wrangler secret bulk .dev.vars  # ou un par un avec `wrangler secret put`
```

---

## 4. Lancer

```bash
npm run dev          # wrangler dev → http://localhost:8787
curl localhost:8787/health
# → {"status":"ok","version":"1.0.0",...}
```

---

## 5. Tester l'auth (Phase 1 ✅)

```bash
# Register (crée user + org + profile owner)
curl -X POST localhost:8787/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@test.com","password":"changeme123","fullName":"You","organizationName":"Acme"}'

# → { user, organization, session: { accessToken, refreshToken, expiresAt } }

# Route protégée
curl localhost:8787/api/me -H "Authorization: Bearer <accessToken>"
# → { auth: { userId, orgId, role: "owner", email } }
```

---

## 6. Arbo

```
worker/
├── src/
│   ├── index.ts            # Hono entry + /health + /api/me
│   ├── types.ts            # Bindings + AuthContext + AppEnv
│   ├── lib/supabase.ts     # service / user clients
│   ├── middleware/
│   │   ├── auth.ts         # Bearer → c.var.auth (userId, orgId, role)
│   │   ├── cors.ts
│   │   └── rateLimit.ts    # KV fixed-window
│   ├── routes/auth.ts      # /register /login /refresh /logout
│   ├── db/
│   │   ├── schema.ts       # Drizzle mirror
│   │   └── migrations/0001_init.sql
│   └── (agents/, integrations/, services/ — Phase 2+)
├── drizzle.config.ts
├── wrangler.jsonc
├── .dev.vars.example
└── package.json
```

---

## 7. État Phase 1 (5 tâches Backend du guide)

- [x] **1. Setup Workers + Hono** (wrangler.jsonc, deps, types)
- [x] **2. Supabase schéma SQL** (`migrations/0001_init.sql`, 11 tables + RLS)
- [x] **3. Auth endpoints** (register/login/refresh/logout + rate limit)
- [x] **4. Middleware auth + rate limit** (Bearer JWT Supabase + KV fixed-window)
- [x] **5. Health check** (`GET /health`)

**Reste Phase 1** (côté frontend, à faire dans `apps/web/` selon ta décision de migration parallèle) :
- Setup Vite + React + TailwindCSS + shadcn/ui
- Layout Sidebar + Header
- Pages Login / Register / Onboarding
- Dashboard skeleton
- Router + protected routes
