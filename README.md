# AdNova AI — Autonomous Advertising Intelligence

## 🚀 Vue d'ensemble

**AdNova AI** est une plateforme SaaS d'advertising autonome pilotée par IA, déployée sur Cloudflare Pages.

- **URL Live** : https://3000-ip790jyz6bks9o8n61dej-d0b9e1e2.sandbox.novita.ai
- **Tech** : Hono v4 + TypeScript + Cloudflare Pages
- **Taille build** : 368 KB (68 modules)
- **Version** : 3.0

---

## ✅ Fonctionnalités implémentées

### 🌐 Multilingue (i18n)
- Détection automatique de la langue par **IP (CF-IPCountry)** + `Accept-Language` + cookie
- 6 langues : **English, Français, Español, Deutsch, Português, العربية**
- Support RTL pour l'arabe
- Sélecteur de langue dans la barre de navigation
- Persistance via cookie `adnova_lang` (1 an)
- API `/api/lang` pour détection côté client

### 🌑🌕 Mode Sombre / Clair
- Toggle dans la barre de navigation (icône lune/soleil)
- Persistance via `localStorage` (`adnova_theme`)
- Graphiques Chart.js adaptatifs (couleurs grille + labels)
- CSS complet pour les deux modes

### 📢 9 Plateformes Publicitaires
| Plateforme | Spend/mois | ROAS | Campagnes |
|-----------|-----------|------|-----------|
| Facebook Ads | $42,350 | 4.1x | 47 |
| Google Ads | $35,100 | 5.2x | 12 |
| Instagram Ads | $25,200 | 3.8x | 22 |
| TikTok Ads | $15,400 | 4.6x | 8 |
| LinkedIn Ads | $8,920 | 3.3x | 6 |
| YouTube Ads | $11,750 | 3.9x | 9 |
| X (Twitter) Ads | $4,200 | 2.8x | 3 |
| Pinterest Ads | $3,150 | 3.1x | 5 |
| Snapchat Ads | $6,800 | 2.1x | 4 |

### 📊 Dashboard stabilisé
- KPI cards avec refresh API toutes les 30s
- Graphiques revenue/spend adaptatifs au thème
- Donut chart 7 plateformes
- AI Activity Feed live (nouveau item toutes les 9s)
- Tableau des 8 meilleures campagnes
- Panel status 9 plateformes

### 🤖 Super Admin Panel
- 11 pages : login, dashboard, tenants, users, revenue, AI monitor, logs, security, config, plans, billing
- 9 API routes sous `/admin/api/*`
- Accès : `/admin/login` (email: superadmin@adnova.ai / pass: superadmin2026 / 2FA: 842193)

---

## 🗺️ Routes

### Pages publiques
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Connexion |
| `/register` | Inscription |
| `/dashboard` | Dashboard principal |
| `/campaigns` | Gestion campagnes |
| `/creatives` | Studio créatif |
| `/analytics` | Analytiques |
| `/ai-engine` | Moteur IA (6 modules) |
| `/platforms` | Intégrations (9 plateformes) |
| `/billing` | Facturation |
| `/audiences` | Gestion audiences |
| `/automation` | Règles d'automatisation |
| `/settings` | Paramètres compte |

### API Routes
```
GET  /api/lang              → détection langue IP
GET  /api/dashboard/stats   → KPIs dashboard
GET  /api/campaigns         → liste campagnes
GET  /api/platforms         → 9 plateformes (summary + liste)
GET  /api/platforms/:id     → détails plateforme
POST /api/platforms/:id/connect    → connecter
POST /api/platforms/:id/disconnect → déconnecter
POST /api/platforms/:id/sync       → synchroniser
GET  /api/platforms/:id/metrics    → métriques détaillées
GET  /api/ai/status         → statut moteur IA
GET  /api/analytics/overview→ données analytiques
POST /api/auth/login        → authentification
POST /api/auth/register     → inscription
```

---

## 🏗️ Architecture

```
webapp/
├── src/
│   ├── index.tsx           # Router principal + middleware i18n
│   ├── lib/
│   │   ├── layout.ts       # Shell HTML avec dark/light + i18n
│   │   └── i18n.ts         # Système i18n 6 langues + IP detection
│   ├── pages/              # 13 pages UI
│   ├── routes/             # 11 API routers
│   └── admin/              # Super Admin (11 pages + 9 API)
├── dist/                   # Build Cloudflare Pages
├── wrangler.jsonc
└── ecosystem.config.cjs    # PM2 config
```

---

## 🚀 Déploiement Cloudflare Pages

```bash
# 1. Configurer la clé API dans l'onglet Deploy
# 2. Puis :
npm run build
npx wrangler pages project create adnova-ai --production-branch main
npx wrangler pages deploy dist --project-name adnova-ai
```

**Nom du projet Cloudflare** : `adnova-ai`

---

## 💻 Développement local

```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
# → http://localhost:3000
```

---

## 📦 Backup
- v3.0 : https://www.genspark.ai/api/files/s/Z78VMUeh

---

*Dernière mise à jour : 2026-03-31 — v3.0*
