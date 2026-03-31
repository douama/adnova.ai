# AdNova AI — Autonomous Advertising SaaS

**Plateforme autonome de publicité IA** — Multi-tenant, multi-plateforme, déployable sur Cloudflare Pages.

## 🚀 URL Live (Sandbox)
- **App** : https://3000-ip790jyz6bks9o8n61dej-d0b9e1e2.sandbox.novita.ai
- **Super Admin** : https://3000-ip790jyz6bks9o8n61dej-d0b9e1e2.sandbox.novita.ai/admin/login

## 🔑 Identifiants Démo
| Rôle | Email | Mot de passe |
|------|-------|--------------|
| User | `demo@adnova.ai` | `demo1234` |
| Super Admin | `superadmin@adnova.ai` | `superadmin2026` |

## 📋 Fonctionnalités
- **13 pages** : Landing, Login, Register, Dashboard, Campaigns, Creatives, Analytics, AI Engine, Platforms, Audiences, Automation, Billing, Settings
- **11 pages Super Admin** : Dashboard global, Tenants, Users, Revenue, AI Monitor, Plans, Billing, Logs, Security, Config, Admin Login
- **20+ API routes** : Auth, Dashboard, Campaigns, Creatives, Analytics, AI, Platforms, Billing, Tenants, Audiences, Automation + Admin APIs
- **Auth fonctionnelle** : POST /api/auth/login, /api/auth/register, /api/auth/logout
- **Navigation mobile** : sidebar responsive avec overlay
- **Multi-tenant** : tenant switcher dans la sidebar
- **Auto-scale IA** : +10% budget toutes les 72h si ROAS ≥ 3.5x
- **Auto-kill** : pause créatifs CTR < 0.8%

## 🛠️ Stack Technique
- **Framework** : Hono v4 (edge-native)
- **Runtime** : Cloudflare Pages / Workers
- **Build** : Vite + @hono/vite-cloudflare-pages
- **UI** : Tailwind CSS CDN + Chart.js + FontAwesome
- **Taille build** : ~330KB (worker unique)

## 🚀 Déploiement Cloudflare Pages

### Prérequis
1. Compte Cloudflare avec Pages activé
2. API Token avec permissions `Cloudflare Pages:Edit`

### Commandes
\`\`\`bash
# Installer les dépendances
npm install

# Build
npm run build

# Créer le projet Cloudflare Pages (première fois)
npx wrangler pages project create adnova-ai --production-branch main

# Déployer
npx wrangler pages deploy dist --project-name adnova-ai
\`\`\`

### Variables d'environnement (optionnelles)
\`\`\`bash
npx wrangler pages secret put JWT_SECRET --project-name adnova-ai
npx wrangler pages secret put STRIPE_KEY --project-name adnova-ai
\`\`\`

## 📁 Structure du Projet
\`\`\`
src/
├── index.tsx          # Entry point Hono + routes
├── lib/layout.ts      # Layout partagé (sidebar, topbar, modals)
├── pages/             # Pages HTML (13 pages)
│   ├── landing.ts, login.ts, register.ts
│   ├── dashboard.ts, campaigns.ts, creatives.ts
│   ├── analytics.ts, ai-engine.ts, platforms.ts
│   ├── audiences.ts, automation.ts, billing.ts, settings.ts
├── routes/            # API routes (11 fichiers)
│   ├── auth.ts, dashboard.ts, campaigns.ts, creatives.ts
│   ├── analytics.ts, ai.ts, platforms.ts, billing.ts
│   ├── tenants.ts, audiences.ts, automation.ts
└── admin/             # Super Admin (séparé)
    ├── layout.ts      # Layout admin orange
    ├── pages/         # 11 pages admin
    └── routes/admin.ts # 9 APIs admin
\`\`\`

## 🔧 Développement Local
\`\`\`bash
npm install
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
\`\`\`

## 📊 État du Projet
- ✅ Build Cloudflare Pages propre (0 erreurs)
- ✅ 44 routes testées (200 OK)
- ✅ Auth API fonctionnelle (login, register, logout)
- ✅ Navigation mobile responsive
- ✅ Déconnexion fonctionnelle (localStorage)
- ✅ Super Admin panel complet
- ✅ Date SSR-safe (côté client)
- ✅ Prêt pour déploiement Cloudflare Pages
