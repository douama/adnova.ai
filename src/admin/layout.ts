export function adminShell(title: string, content: string, activePage: string = ''): string {
  return `<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} — AdNova Super Admin</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,300;1,14..32,400&display=swap" rel="stylesheet"/>
  <script>
    (function(){
      const t = localStorage.getItem('adnova_admin_theme') || 'dark';
      document.documentElement.classList.toggle('dark', t==='dark');
      document.documentElement.classList.toggle('light', t==='light');
    })();
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
          colors: {
            admin: {
              50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',
              400:'#fb923c',500:'#f97316',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12',
            }
          }
        }
      }
    }
  </script>
  <style>
    /* ══════════════════════════════════════════════════
       LIQUID GLASS — SUPER ADMIN THEME (Orange/Amber)
       Verre liquide · Prisme · Réfraction · Profondeur
    ══════════════════════════════════════════════════ */

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.35); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(249,115,22,0.65); }

    /* ── Body ── */
    .dark body {
      background: #040208;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      background-image:
        radial-gradient(ellipse 80% 50% at 15% 10%, rgba(249,115,22,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 85% 80%, rgba(220,38,38,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 50% 35% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%);
      min-height: 100vh;
    }
    .light body {
      background: #fff8f2;
      color: #1c0a00;
      font-family: 'Inter', sans-serif;
      background-image: radial-gradient(ellipse 80% 50% at 20% 10%, rgba(249,115,22,0.08) 0%, transparent 60%);
    }

    /* ══ LIQUID GLASS CORE ══ */

    .dark .glass {
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.055) 0%,
        rgba(255,255,255,0.018) 50%,
        rgba(255,255,255,0.038) 100%
      );
      backdrop-filter: blur(20px) saturate(1.8);
      -webkit-backdrop-filter: blur(20px) saturate(1.8);
      border: 1px solid rgba(255,255,255,0.09);
      border-top-color: rgba(255,255,255,0.18);
      border-left-color: rgba(255,255,255,0.12);
      box-shadow:
        0 8px 32px rgba(0,0,0,0.40),
        0 2px 8px rgba(0,0,0,0.25),
        inset 0 1px 0 rgba(255,255,255,0.10),
        inset 0 -1px 0 rgba(0,0,0,0.18);
      position: relative;
      isolation: isolate;
    }

    /* Orange tinted prism for admin */
    .dark .glass::before {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(220,38,38,0.5) 15%,
        rgba(249,115,22,0.75) 35%,
        rgba(251,191,36,0.6) 50%,
        rgba(249,115,22,0.5) 65%,
        rgba(239,68,68,0.4) 85%,
        transparent 100%
      );
      filter: blur(0.5px);
      pointer-events: none;
      z-index: 1;
    }
    .dark .glass::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%);
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
    }

    .light .glass {
      background: linear-gradient(135deg, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.70) 50%, rgba(255,255,255,0.82) 100%);
      backdrop-filter: blur(20px) saturate(1.6);
      border: 1px solid rgba(255,255,255,0.95);
      border-top-color: rgba(255,255,255,1);
      box-shadow: 0 8px 32px rgba(234,88,12,0.07), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.98);
    }

    /* Admin glass — orange tinted */
    .dark .admin-glass {
      background: linear-gradient(
        135deg,
        rgba(249,115,22,0.08) 0%,
        rgba(249,115,22,0.03) 50%,
        rgba(249,115,22,0.06) 100%
      );
      backdrop-filter: blur(16px) saturate(1.6);
      border: 1px solid rgba(249,115,22,0.14);
      border-top-color: rgba(251,191,36,0.20);
      box-shadow:
        0 4px 20px rgba(0,0,0,0.30),
        inset 0 1px 0 rgba(251,191,36,0.10),
        inset 0 -1px 0 rgba(0,0,0,0.12);
    }
    .light .admin-glass {
      background: rgba(255,247,237,0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(249,115,22,0.15);
    }

    /* Sidebar */
    .dark .sidebar-bg {
      background: linear-gradient(180deg, rgba(4,2,8,0.98) 0%, rgba(6,3,12,0.96) 100%);
      backdrop-filter: blur(40px) saturate(1.4);
      box-shadow: inset -1px 0 0 rgba(249,115,22,0.08), 4px 0 40px rgba(0,0,0,0.6);
    }
    .light .sidebar-bg {
      background: rgba(255,247,237,0.98);
      backdrop-filter: blur(40px);
    }

    /* Topbar */
    .dark .topbar-bg {
      background: linear-gradient(90deg, rgba(4,2,8,0.94) 0%, rgba(6,3,12,0.90) 100%);
      backdrop-filter: blur(30px) saturate(1.5);
      box-shadow: 0 1px 0 rgba(249,115,22,0.08), 0 4px 24px rgba(0,0,0,0.45);
    }
    .light .topbar-bg {
      background: rgba(255,247,237,0.96);
      backdrop-filter: blur(30px);
    }

    /* Frosted */
    .dark .frosted {
      background: rgba(4,2,8,0.82);
      backdrop-filter: blur(40px) saturate(1.7);
      border: 1px solid rgba(249,115,22,0.10);
      box-shadow: 0 20px 60px rgba(0,0,0,0.65), inset 0 1px 0 rgba(251,191,36,0.08);
    }

    /* ── ADMIN SIDEBAR LINKS ── */
    .admin-link {
      transition: all 0.2s cubic-bezier(0.23,1,0.32,1);
      border-left: 2px solid transparent;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
    }
    .dark .admin-link::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(249,115,22,0.04));
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .dark .admin-link:hover::before, .dark .admin-link.active::before { opacity: 1; }
    .dark .admin-link:hover, .dark .admin-link.active {
      background: rgba(249,115,22,0.10);
      border-left-color: #f97316;
      color: #fb923c;
      box-shadow: inset 0 0 20px rgba(249,115,22,0.05);
    }
    .dark .admin-link.active {
      background: linear-gradient(90deg, rgba(249,115,22,0.16), rgba(249,115,22,0.07));
      color: #fdba74;
    }
    .light .admin-link:hover, .light .admin-link.active {
      background: rgba(249,115,22,0.08);
      border-left-color: #f97316;
      color: #c2410c;
    }

    /* ── CARD HOVER ── */
    .card-hover { transition: all 0.35s cubic-bezier(0.23,1,0.32,1); will-change: transform; }
    .dark .card-hover:hover {
      transform: translateY(-3px) scale(1.005);
      box-shadow: 0 24px 48px rgba(0,0,0,0.45), 0 8px 16px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.18);
    }
    .light .card-hover:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px rgba(249,115,22,0.10);
    }

    /* ── BADGES ── */
    .badge-active {
      background: linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.10));
      color: #34d399; border: 1px solid rgba(52,211,153,0.30);
      box-shadow: 0 0 10px rgba(52,211,153,0.10), inset 0 1px 0 rgba(255,255,255,0.08);
    }
    .badge-inactive {
      background: linear-gradient(135deg, rgba(239,68,68,0.18), rgba(248,113,113,0.10));
      color: #f87171; border: 1px solid rgba(248,113,113,0.28);
      box-shadow: 0 0 10px rgba(239,68,68,0.08);
    }
    .badge-trial {
      background: linear-gradient(135deg, rgba(249,115,22,0.18), rgba(251,191,36,0.10));
      color: #fb923c; border: 1px solid rgba(251,191,36,0.28);
      box-shadow: 0 0 10px rgba(249,115,22,0.10), inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .badge-suspended {
      background: linear-gradient(135deg, rgba(148,163,184,0.15), rgba(203,213,225,0.08));
      color: #94a3b8; border: 1px solid rgba(148,163,184,0.22);
    }

    /* ── PROGRESS BAR ── */
    .progress-bar { height: 3px; border-radius: 4px; background: rgba(255,255,255,0.05); overflow: visible; position: relative; }
    .progress-fill {
      height: 100%; border-radius: 4px;
      transition: width 1s cubic-bezier(0.23,1,0.32,1);
      position: relative;
    }
    .progress-fill::after {
      content: '';
      position: absolute; right: -1px; top: -1.5px;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: inherit;
      box-shadow: 0 0 8px rgba(249,115,22,0.6);
    }

    /* ── ANIMATIONS ── */
    .animate-fadeIn { animation: fadeIn 0.45s cubic-bezier(0.23,1,0.32,1); }
    @keyframes fadeIn { from { opacity:0; transform:translateY(10px) scale(0.99); } to { opacity:1; transform:translateY(0) scale(1); } }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
    .blink { animation: blink 2s ease infinite; }

    /* ── SUPER BADGE ── */
    .super-badge {
      background: linear-gradient(135deg, rgba(249,115,22,0.9), rgba(220,38,38,0.9));
      color: #fff; font-weight: 800; font-size: 9px;
      padding: 2px 8px; border-radius: 20px; letter-spacing: 0.08em;
      box-shadow: 0 2px 8px rgba(249,115,22,0.3), 0 0 16px rgba(249,115,22,0.15);
    }

    /* ── ADMIN GLOW ── */
    .admin-glow {
      box-shadow: 0 0 24px rgba(249,115,22,0.35), 0 0 48px rgba(249,115,22,0.12);
    }
    .liquid-glow-orange {
      box-shadow: 0 0 24px rgba(249,115,22,0.30), 0 0 48px rgba(249,115,22,0.10), 0 0 80px rgba(249,115,22,0.05);
    }

    /* ── TABLE ROWS ── */
    .dark .table-row { transition: all 0.2s ease; }
    .dark .table-row:hover {
      background: linear-gradient(90deg, rgba(249,115,22,0.05), rgba(220,38,38,0.03), transparent);
      box-shadow: inset 0 0 0 1px rgba(249,115,22,0.08);
    }
    .light .table-row:hover { background: rgba(249,115,22,0.04); }

    /* ── ICON BUTTONS ── */
    .icon-btn { position: relative; overflow: hidden; transition: all 0.25s cubic-bezier(0.23,1,0.32,1); }
    .icon-btn::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 70%);
      opacity: 0; transition: opacity 0.2s; pointer-events: none;
    }
    .icon-btn:hover::after { opacity: 1; }
    .icon-btn:active { transform: scale(0.95); }

    /* ── MODAL BACKDROP ── */
    .modal-backdrop { background: rgba(0,0,0,0.70); backdrop-filter: blur(8px) saturate(0.8); }

    /* ── DANGER ZONE ── */
    .danger-zone {
      border: 1px solid rgba(239,68,68,0.22);
      background: linear-gradient(135deg, rgba(239,68,68,0.04), rgba(220,38,38,0.02));
    }

    /* ── TOOLTIP ── */
    .tooltip { position: relative; }
    .tooltip-text {
      position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
      background: rgba(4,2,8,0.95); backdrop-filter: blur(12px);
      color: #e2e8f0; font-size: 11px; white-space: nowrap;
      padding: 5px 10px; border-radius: 8px;
      border: 1px solid rgba(249,115,22,0.15);
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      opacity: 0; pointer-events: none; transition: opacity 0.2s; z-index: 99;
    }
    .tooltip:hover .tooltip-text { opacity: 1; }

    /* ── LIGHT MODE OVERRIDES ── */
    .light .text-slate-200{color:#1e0a00!important}
    .light .text-slate-300{color:#431407!important}
    .light .text-slate-400{color:#6b3419!important}
    .light .text-slate-500{color:#9a3412!important}
    .light .text-slate-600{color:#c2410c!important}
    .light .text-white{color:#1c0a00!important}

    /* ── MOBILE ── */
    @media(max-width:768px){
      .admin-sidebar{transform:translateX(-100%);transition:transform .35s cubic-bezier(0.23,1,0.32,1)}
      .admin-sidebar.open{transform:translateX(0)}
      .admin-main{margin-left:0!important}
    }
    .sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(4px);z-index:35}
    .sidebar-overlay.show{display:block}

    /* ── ORB PULSE ── */
    @keyframes orbPulse {
      0%,100% { transform:scale(1); box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
      50% { transform:scale(1.04); box-shadow: 0 0 0 8px rgba(249,115,22,0); }
    }
    .orb-pulse { animation: orbPulse 3s ease infinite; }

    /* ── INPUT FOCUS ── */
    .dark input:focus, .dark select:focus, .dark textarea:focus {
      outline: none;
      border-color: rgba(249,115,22,0.45) !important;
      box-shadow: 0 0 0 3px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.04);
    }

    .theme-btn{transition:transform .3s ease} .theme-btn:hover{transform:rotate(20deg) scale(1.1)}
  </style>
</head>
<body class="text-slate-200 min-h-screen flex">

  <div class="sidebar-overlay" id="sadmin-overlay" onclick="closeAdminSidebar()"></div>

  <!-- Admin Sidebar -->
  <aside id="admin-sidebar" class="admin-sidebar sidebar-bg w-64 min-h-screen border-r flex flex-col fixed left-0 top-0 z-40" style="border-color:rgba(249,115,22,0.08);">
    <!-- Logo Admin -->
    <div class="p-5 border-b" style="border-color:rgba(249,115,22,0.08);">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg admin-glow orb-pulse flex-shrink-0">
          <i class="fas fa-shield-halved text-white text-lg"></i>
        </div>
        <div>
          <div class="font-black text-white text-base tracking-tight">AdNova AI</div>
          <div class="flex items-center gap-1.5 mt-0.5"><span class="super-badge">SUPER ADMIN</span></div>
        </div>
      </div>
    </div>

    <!-- Admin Info -->
    <div class="px-4 py-3 border-b" style="border-color:rgba(249,115,22,0.07);">
      <div class="admin-glass rounded-xl px-3 py-2.5 flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style="box-shadow:0 0 12px rgba(249,115,22,0.4);">SA</div>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold truncate" style="color:#fb923c;">superadmin@adnova.ai</div>
          <div class="text-xs" style="color:rgba(148,163,184,0.45);">Accès total — Niveau 5</div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 blink flex-shrink-0" style="box-shadow:0 0 6px #34d399;"></div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">
      <div class="text-xs font-bold uppercase tracking-widest px-3 py-2" style="color:rgba(249,115,22,0.45);">Vue d'ensemble</div>
      ${adminNavLink('/admin', 'fa-gauge-high', 'Dashboard Global', activePage)}
      ${adminNavLink('/admin/tenants', 'fa-building', 'Clients & Tenants', activePage)}
      ${adminNavLink('/admin/users', 'fa-users', 'Utilisateurs', activePage)}
      <div class="text-xs font-bold uppercase tracking-widest px-3 py-2 mt-3" style="color:rgba(249,115,22,0.45);">Plateforme</div>
      ${adminNavLink('/admin/ai-monitor', 'fa-brain', 'Monitoring IA', activePage)}
      ${adminNavLink('/admin/campaigns', 'fa-bullhorn', 'Toutes Campagnes', activePage)}
      ${adminNavLink('/admin/creatives', 'fa-photo-film', 'Créatifs Globaux', activePage)}
      ${adminNavLink('/admin/platforms', 'fa-plug', 'Intégrations', activePage)}
      <div class="text-xs font-bold uppercase tracking-widest px-3 py-2 mt-3" style="color:rgba(249,115,22,0.45);">Business</div>
      ${adminNavLink('/admin/revenue', 'fa-dollar-sign', 'Revenus & MRR', activePage)}
      ${adminNavLink('/admin/billing', 'fa-credit-card', 'Facturation', activePage)}
      ${adminNavLink('/admin/plans', 'fa-tags', 'Plans & Limites', activePage)}
      <div class="text-xs font-bold uppercase tracking-widest px-3 py-2 mt-3" style="color:rgba(249,115,22,0.45);">Système</div>
      ${adminNavLink('/admin/logs', 'fa-terminal', 'Logs Système', activePage)}
      ${adminNavLink('/admin/security', 'fa-lock', 'Sécurité', activePage)}
      ${adminNavLink('/admin/config', 'fa-sliders', 'Configuration', activePage)}
    </nav>

    <!-- System Status -->
    <div class="p-3 border-t" style="border-color:rgba(249,115,22,0.07);">
      <div class="admin-glass rounded-xl p-3 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold" style="color:rgba(148,163,184,0.6);">Santé système</span>
          <span class="text-xs font-bold" style="color:#34d399;">99.9%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill bg-gradient-to-r from-emerald-500 to-teal-400" style="width:99%"></div></div>
        <div class="grid grid-cols-3 gap-1 text-center">
          <div><div class="text-xs font-bold" style="color:#34d399;">API</div><div class="text-xs" style="color:rgba(148,163,184,0.4);">OK</div></div>
          <div><div class="text-xs font-bold" style="color:#34d399;">DB</div><div class="text-xs" style="color:rgba(148,163,184,0.4);">OK</div></div>
          <div><div class="text-xs font-bold" style="color:#34d399;">AI</div><div class="text-xs" style="color:rgba(148,163,184,0.4);">OK</div></div>
        </div>
      </div>
    </div>

    <!-- Back to App -->
    <div class="p-3 border-t" style="border-color:rgba(249,115,22,0.07);">
      <a href="/dashboard" class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-all text-xs" style="color:rgba(148,163,184,0.5);">
        <i class="fas fa-arrow-left"></i> Retour à l'app
      </a>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="admin-main ml-64 flex-1 flex flex-col min-h-screen">
    <!-- Top Bar -->
    <header class="h-14 topbar-bg border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30" style="border-color:rgba(249,115,22,0.08);">
      <div class="flex items-center gap-3">
        <button class="md:hidden admin-glass rounded-lg w-8 h-8 flex items-center justify-center icon-btn" onclick="openAdminSidebar()">
          <i class="fas fa-bars text-orange-400 text-sm"></i>
        </button>
        <i class="fas fa-shield-halved text-orange-500 text-sm hidden md:block" style="filter:drop-shadow(0 0 6px rgba(249,115,22,0.6));"></i>
        <h1 class="text-sm font-bold text-white">${title}</h1>
        <span class="super-badge hidden sm:inline">SUPER ADMIN</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="hidden md:flex admin-glass rounded-xl px-3 py-1.5 items-center gap-2 text-xs">
          <i class="fas fa-search text-slate-600 text-xs"></i>
          <input placeholder="Rechercher..." class="bg-transparent placeholder-slate-700 outline-none w-40 text-xs" style="color:rgba(226,232,240,0.8);" id="admin-search"/>
        </div>
        <button id="admin-theme-btn" onclick="toggleAdminTheme()" class="theme-btn admin-glass rounded-lg w-8 h-8 flex items-center justify-center hover:bg-orange-500/10 transition-all icon-btn" title="Dark / Light">
          <i id="admin-theme-icon" class="fas fa-moon text-orange-400 text-xs"></i>
        </button>
        <button class="admin-glass rounded-lg w-8 h-8 flex items-center justify-center transition-all relative icon-btn" onclick="toggleAdminAlerts()">
          <i class="fas fa-bell text-orange-400 text-xs"></i>
          <span class="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500" style="border:1.5px solid #040208;box-shadow:0 0 6px rgba(239,68,68,0.7);"></span>
        </button>
        <span class="text-xs hidden md:block" style="color:rgba(148,163,184,0.4);" id="admin-date"></span>
        <button onclick="adminLogout()" class="admin-glass hover:bg-red-500/10 text-red-400 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all" style="border:1px solid rgba(239,68,68,0.18);">
          <i class="fas fa-right-from-bracket text-xs"></i><span class="hidden sm:inline"> Déconnexion</span>
        </button>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 p-4 md:p-6 animate-fadeIn">
      ${content}
    </main>
  </div>

  <!-- Alerts Panel -->
  <div id="admin-alerts-panel" class="hidden fixed right-0 top-14 w-80 md:w-96 frosted border shadow-2xl z-50 rounded-bl-2xl max-h-[80vh] overflow-y-auto animate-fadeIn" style="border-color:rgba(249,115,22,0.10);">
    <div class="p-4 border-b flex items-center justify-between" style="border-color:rgba(249,115,22,0.08);">
      <h3 class="font-bold text-white text-sm">Alertes Système</h3>
      <button onclick="toggleAdminAlerts()" class="text-slate-500 hover:text-slate-300 transition-colors text-xs"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-3 space-y-2">${adminAlerts()}</div>
  </div>

  <script>
    const el = document.getElementById('admin-date');
    if(el) el.textContent = new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'});

    function applyAdminTheme(theme) {
      const html = document.documentElement;
      const icon = document.getElementById('admin-theme-icon');
      html.classList.toggle('dark', theme === 'dark');
      html.classList.toggle('light', theme === 'light');
      if(icon) icon.className = theme === 'dark' ? 'fas fa-moon text-orange-400 text-xs' : 'fas fa-sun text-amber-500 text-xs';
      if(typeof window.updateAdminCharts === 'function') window.updateAdminCharts(theme);
    }
    function toggleAdminTheme() {
      const cur = localStorage.getItem('adnova_admin_theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      localStorage.setItem('adnova_admin_theme', next);
      applyAdminTheme(next);
    }
    (function(){ applyAdminTheme(localStorage.getItem('adnova_admin_theme') || 'dark'); })();

    function adminLogout() {
      if(confirm('Déconnecter la session Super Admin ?')) {
        localStorage.removeItem('adnova_admin_token');
        window.location.href = '/admin/login';
      }
    }
    function toggleAdminAlerts() { document.getElementById('admin-alerts-panel').classList.toggle('hidden'); }
    document.addEventListener('click', function(e) {
      const panel = document.getElementById('admin-alerts-panel');
      if(!panel.classList.contains('hidden') && !panel.contains(e.target) && !e.target.closest('[onclick="toggleAdminAlerts()"]')) panel.classList.add('hidden');
    });
    document.getElementById('admin-search')?.addEventListener('keydown', function(e) {
      if(e.key==='Enter' && this.value) window.location.href='/admin/tenants?search='+encodeURIComponent(this.value);
    });
    function openAdminSidebar() {
      document.getElementById('admin-sidebar').classList.add('open');
      document.getElementById('sadmin-overlay').classList.add('show');
    }
    function closeAdminSidebar() {
      document.getElementById('admin-sidebar').classList.remove('open');
      document.getElementById('sadmin-overlay').classList.remove('show');
    }
  </script>
</body>
</html>`
}

function adminNavLink(href: string, icon: string, label: string, active: string): string {
  const isActive = active === href
  const badges: Record<string, string> = {
    '/admin/tenants': '<span class="ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold" style="background:rgba(249,115,22,0.18);color:#fb923c;">3</span>',
    '/admin/logs': '<span class="w-1.5 h-1.5 rounded-full bg-red-500 blink inline-block ml-auto" style="box-shadow:0 0 4px rgba(239,68,68,0.8);"></span>',
  }
  return `<a href="${href}" class="admin-link ${isActive ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500">
    <i class="fas ${icon} w-4 text-center flex-shrink-0 ${isActive ? 'text-orange-400' : 'text-slate-600'}"></i>
    <span class="flex-1">${label}</span>
    ${badges[href] || ''}
  </a>`
}

function adminAlerts(): string {
  const alerts = [
    { icon: 'fa-triangle-exclamation', color: 'amber', text: "TechStart Inc: dépassement budget +40% aujourd'hui", time: '12min' },
    { icon: 'fa-user-xmark', color: 'red', text: '3 tentatives de connexion suspectes — IP: 185.xx.xx.xx', time: '28min' },
    { icon: 'fa-clock', color: 'blue', text: 'Fashion Brand: essai expire dans 2 jours', time: '1h' },
    { icon: 'fa-server', color: 'orange', text: 'Usage CPU AI Engine: 87% — pic inhabituel', time: '2h' },
    { icon: 'fa-check-circle', color: 'emerald', text: 'Nouveau client: "Digital Storm" — plan Growth activé', time: '3h' },
  ]
  return alerts.map(a => `
    <div class="flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/5 cursor-pointer transition-all card-hover">
      <div class="w-7 h-7 rounded-xl bg-${a.color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5" style="box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);">
        <i class="fas ${a.icon} text-${a.color}-400 text-xs"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-300 leading-relaxed">${a.text}</p>
        <p class="text-xs mt-0.5" style="color:rgba(148,163,184,0.38);">${a.time}</p>
      </div>
    </div>`).join('')
}
