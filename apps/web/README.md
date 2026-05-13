# @adnova/web — Frontend (app.adnova.ai)

React 18 + Vite 6 + TypeScript + Tailwind 3 + React Router v6. Talks to the worker (`adnova-api`) for auth and to Supabase for sessions. Deployed on Cloudflare Pages under the project name `adnova-app`.

---

## 1. Local development

From the **repo root** (workspace):

```bash
pnpm install                  # once
cp apps/web/.env.example apps/web/.env
# edit apps/web/.env: VITE_API_BASE_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
```

In two terminals:

```bash
# T1 — worker (port 8787)
cd worker && pnpm dev

# T2 — web (port 5173)
cd apps/web && pnpm dev
```

Open http://localhost:5173 → register → land on /dashboard.

---

## 2. Build & deploy (Cloudflare Pages)

```bash
cd apps/web
pnpm build                    # → dist/
pnpm deploy                   # wrangler pages deploy dist --project-name adnova-app
```

First-time setup, one shot:

```bash
npx wrangler pages project create adnova-app --production-branch=main
```

Then in the Cloudflare dashboard:

1. **Pages → adnova-app → Settings → Environment variables (Production)** add:
   - `VITE_API_BASE_URL=https://api.adnova.ai`
   - `VITE_SUPABASE_URL=...`
   - `VITE_SUPABASE_ANON_KEY=...`
2. **Custom domains** → add `app.adnova.ai` → Cloudflare adds a CNAME automatically.
3. The worker (`adnova-api`) must whitelist `https://app.adnova.ai` in its `ALLOWED_ORIGINS` env var (see `worker/wrangler.jsonc`).

---

## 3. Stack — current minimal set

| Concern | Choice |
|---|---|
| Framework | React 18 |
| Bundler | Vite 6 |
| Routing | React Router v6 |
| Styles | Tailwind 3 |
| Forms | Native + Zod (`@adnova/shared/schemas/auth`) |
| Auth state | React Context (`src/lib/auth-context.tsx`) |
| API client | thin fetch wrapper (`src/lib/api.ts`) |
| Supabase | `@supabase/supabase-js` (`src/lib/supabase.ts`) |

**Not yet wired** (add when needed):

- shadcn/ui — run `pnpm dlx shadcn@latest init` once we need Radix primitives
- TanStack Query — add when we have GET endpoints to cache
- Zustand — current Context is fine until cross-tree state appears
- react-i18next — port from `src/lib/i18n.ts` (legacy) when we need multi-language

---

## 4. File map

```
apps/web/
├── index.html
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── src/
    ├── main.tsx              # entry
    ├── App.tsx               # router (protected by auth-context)
    ├── index.css             # Tailwind directives
    ├── vite-env.d.ts
    ├── lib/
    │   ├── env.ts            # validates VITE_* at load
    │   ├── api.ts            # fetch wrapper + ApiError
    │   ├── supabase.ts       # browser client
    │   └── auth-context.tsx  # login/register/logout + localStorage persistence
    ├── components/
    │   ├── Layout.tsx        # sidebar + header (authed)
    │   └── AuthCard.tsx      # shell for /login & /register
    └── pages/
        ├── Login.tsx
        ├── Register.tsx
        └── Dashboard.tsx     # skeleton, fetches /api/me
```
