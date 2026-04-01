export function adminShell(title: string, content: string, activePage: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} — AdNova Super Admin</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <script>
    // Prevent FOUC
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
    /* ── Scrollbar ── */
    ::-webkit-scrollbar{width:5px;height:5px}
    .dark ::-webkit-scrollbar-track{background:#0a0f1a}
    .dark ::-webkit-scrollbar-thumb{background:#2d1f0f;border-radius:3px}
    .dark ::-webkit-scrollbar-thumb:hover{background:#f97316}
    .light ::-webkit-scrollbar-track{background:#f8f4f0}
    .light ::-webkit-scrollbar-thumb{background:#fdba74;border-radius:3px}
    .light ::-webkit-scrollbar-thumb:hover{background:#f97316}

    /* ── Dark mode ── */
    .dark body{background:#060b14;color:#e2e8f0;font-family:'Inter',sans-serif}
    .dark .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.07)}
    .dark .admin-glass{background:rgba(249,115,22,0.04);backdrop-filter:blur(12px);border:1px solid rgba(249,115,22,0.12)}
    .dark .sidebar-bg{background:rgba(6,11,20,0.97);border-color:rgba(249,115,22,0.10)}
    .dark .topbar-bg{background:rgba(6,11,20,0.92);border-color:rgba(249,115,22,0.10)}
    .dark .admin-link:hover,.dark .admin-link.active{background:rgba(249,115,22,0.12);border-left-color:#f97316;color:#fb923c}
    .dark .admin-link.active{background:rgba(249,115,22,0.18);color:#fdba74}
    .dark .table-row:hover{background:rgba(249,115,22,0.04)}

    /* ── Light mode ── */
    .light body{background:#fff8f2;color:#1c0a00;font-family:'Inter',sans-serif}
    .light .glass{background:rgba(255,255,255,0.88);backdrop-filter:blur(12px);border:1px solid rgba(234,88,12,0.12)}
    .light .admin-glass{background:rgba(255,247,237,0.95);backdrop-filter:blur(12px);border:1px solid rgba(249,115,22,0.15)}
    .light .sidebar-bg{background:rgba(255,247,237,0.98);border-color:rgba(249,115,22,0.15)}
    .light .topbar-bg{background:rgba(255,247,237,0.96);border-color:rgba(249,115,22,0.12)}
    .light .admin-link:hover,.light .admin-link.active{background:rgba(249,115,22,0.10);border-left-color:#f97316;color:#c2410c}
    .light .admin-link.active{background:rgba(249,115,22,0.15);color:#9a3412}
    .light .table-row:hover{background:rgba(249,115,22,0.04)}
    .light .text-slate-200{color:#1e0a00!important}
    .light .text-slate-300{color:#431407!important}
    .light .text-slate-400{color:#6b3419!important}
    .light .text-slate-500{color:#9a3412!important}
    .light .text-slate-600{color:#c2410c!important}
    .light .text-white{color:#1c0a00!important}

    /* ── Shared ── */
    .admin-link{transition:all .2s ease;border-left:3px solid transparent}
    .card-hover{transition:all .3s ease}
    .card-hover:hover{transform:translateY(-2px);box-shadow:0 20px 40px rgba(0,0,0,.2)}
    .badge-active{background:rgba(16,185,129,.18);color:#10b981;border:1px solid rgba(16,185,129,.3)}
    .badge-inactive{background:rgba(239,68,68,.18);color:#ef4444;border:1px solid rgba(239,68,68,.3)}
    .badge-trial{background:rgba(249,115,22,.18);color:#fb923c;border:1px solid rgba(249,115,22,.3)}
    .badge-suspended{background:rgba(148,163,184,.18);color:#94a3b8;border:1px solid rgba(148,163,184,.3)}
    .progress-bar{height:4px;border-radius:2px;background:rgba(255,255,255,.08);overflow:hidden}
    .progress-fill{height:100%;border-radius:2px;transition:width .8s ease}
    .animate-fadeIn{animation:fadeIn .4s ease}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
    .blink{animation:blink 1.5s ease infinite}
    .admin-glow{box-shadow:0 0 30px rgba(249,115,22,.15)}
    .danger-zone{border:1px solid rgba(239,68,68,.25);background:rgba(239,68,68,.04)}
    .super-badge{background:linear-gradient(135deg,#f97316,#dc2626);color:#fff;font-weight:700;font-size:10px;padding:2px 8px;border-radius:20px;letter-spacing:.05em}
    .theme-btn{transition:transform .3s ease}
    .theme-btn:hover{transform:rotate(20deg)}
    /* Mobile */
    @media(max-width:768px){
      .admin-sidebar{transform:translateX(-100%);transition:transform .3s ease}
      .admin-sidebar.open{transform:translateX(0)}
      .admin-main{margin-left:0!important}
    }
    .sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:35}
    .sidebar-overlay.show{display:block}
  </style>
</head>
<body class="text-slate-200 min-h-screen flex">

  <div class="sidebar-overlay" id="sadmin-overlay" onclick="closeAdminSidebar()"></div>

  <!-- Admin Sidebar -->
  <aside id="admin-sidebar" class="admin-sidebar sidebar-bg w-64 min-h-screen admin-glass border-r flex flex-col fixed left-0 top-0 z-40">
    <!-- Logo Admin -->
    <div class="p-5 border-b border-orange-500/10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg admin-glow">
          <i class="fas fa-shield-halved text-white text-lg"></i>
        </div>
        <div>
          <div class="font-black text-white text-base tracking-tight">AdNova AI</div>
          <div class="flex items-center gap-1.5 mt-0.5"><span class="super-badge">SUPER ADMIN</span></div>
        </div>
      </div>
    </div>

    <!-- Admin Info -->
    <div class="px-4 py-3 border-b border-orange-500/10">
      <div class="admin-glass rounded-lg px-3 py-2 flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">SA</div>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-semibold text-orange-300 truncate">superadmin@adnova.ai</div>
          <div class="text-xs text-slate-600">Accès total — Niveau 5</div>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 blink flex-shrink-0"></div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">
      <div class="text-xs font-bold text-slate-700 uppercase tracking-wider px-3 py-2">Vue d'ensemble</div>
      ${adminNavLink('/admin', 'fa-gauge-high', 'Dashboard Global', activePage)}
      ${adminNavLink('/admin/tenants', 'fa-building', 'Clients & Tenants', activePage)}
      ${adminNavLink('/admin/users', 'fa-users', 'Utilisateurs', activePage)}
      <div class="text-xs font-bold text-slate-700 uppercase tracking-wider px-3 py-2 mt-3">Plateforme</div>
      ${adminNavLink('/admin/ai-monitor', 'fa-brain', 'Monitoring IA', activePage)}
      ${adminNavLink('/admin/campaigns', 'fa-bullhorn', 'Toutes Campagnes', activePage)}
      ${adminNavLink('/admin/creatives', 'fa-photo-film', 'Créatifs Globaux', activePage)}
      ${adminNavLink('/admin/platforms', 'fa-plug', 'Intégrations', activePage)}
      <div class="text-xs font-bold text-slate-700 uppercase tracking-wider px-3 py-2 mt-3">Business</div>
      ${adminNavLink('/admin/revenue', 'fa-dollar-sign', 'Revenus & MRR', activePage)}
      ${adminNavLink('/admin/billing', 'fa-credit-card', 'Facturation', activePage)}
      ${adminNavLink('/admin/plans', 'fa-tags', 'Plans & Limites', activePage)}
      <div class="text-xs font-bold text-slate-700 uppercase tracking-wider px-3 py-2 mt-3">Système</div>
      ${adminNavLink('/admin/logs', 'fa-terminal', 'Logs Système', activePage)}
      ${adminNavLink('/admin/security', 'fa-lock', 'Sécurité', activePage)}
      ${adminNavLink('/admin/config', 'fa-sliders', 'Configuration', activePage)}
    </nav>

    <!-- System Status -->
    <div class="p-3 border-t border-orange-500/10">
      <div class="admin-glass rounded-xl p-3 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Santé système</span>
          <span class="text-xs text-emerald-400 font-bold">99.9%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill bg-gradient-to-r from-emerald-500 to-teal-400" style="width:99%"></div></div>
        <div class="grid grid-cols-3 gap-1 text-center">
          <div><div class="text-xs font-bold text-emerald-400">API</div><div class="text-xs text-slate-600">OK</div></div>
          <div><div class="text-xs font-bold text-emerald-400">DB</div><div class="text-xs text-slate-600">OK</div></div>
          <div><div class="text-xs font-bold text-emerald-400">AI</div><div class="text-xs text-slate-600">OK</div></div>
        </div>
      </div>
    </div>

    <!-- Back to App -->
    <div class="p-3 border-t border-orange-500/10">
      <a href="/dashboard" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-slate-500 hover:text-slate-300 text-xs">
        <i class="fas fa-arrow-left"></i> Retour à l'app
      </a>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="admin-main ml-64 flex-1 flex flex-col min-h-screen">
    <!-- Top Bar -->
    <header class="h-14 topbar-bg admin-glass border-b border-orange-500/10 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <!-- Mobile menu -->
        <button class="md:hidden admin-glass rounded-lg w-8 h-8 flex items-center justify-center" onclick="openAdminSidebar()">
          <i class="fas fa-bars text-orange-400 text-sm"></i>
        </button>
        <i class="fas fa-shield-halved text-orange-400 text-sm hidden md:block"></i>
        <h1 class="text-sm font-bold text-white">${title}</h1>
        <span class="super-badge hidden sm:inline">SUPER ADMIN</span>
      </div>
      <div class="flex items-center gap-2">
        <!-- Global Search -->
        <div class="hidden md:flex admin-glass rounded-lg px-3 py-1.5 items-center gap-2 text-xs">
          <i class="fas fa-search text-slate-500 text-xs"></i>
          <input placeholder="Rechercher..." class="bg-transparent text-slate-300 placeholder-slate-600 outline-none w-40 text-xs" id="admin-search"/>
        </div>
        <!-- Theme Toggle -->
        <button id="admin-theme-btn" onclick="toggleAdminTheme()" class="theme-btn admin-glass rounded-lg w-8 h-8 flex items-center justify-center hover:bg-orange-500/10 transition-all" title="Dark / Light">
          <i id="admin-theme-icon" class="fas fa-moon text-orange-400 text-xs"></i>
        </button>
        <!-- Alerts -->
        <button class="admin-glass rounded-lg w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-all relative" onclick="toggleAdminAlerts()">
          <i class="fas fa-bell text-orange-400 text-xs"></i>
          <span class="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 border border-slate-900"></span>
        </button>
        <!-- Date -->
        <span class="text-xs text-slate-600 hidden md:block" id="admin-date"></span>
        <!-- Logout -->
        <button onclick="adminLogout()" class="admin-glass hover:bg-red-500/10 text-red-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all border border-red-500/20">
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
  <div id="admin-alerts-panel" class="hidden fixed right-0 top-14 w-80 md:w-96 admin-glass border border-orange-500/10 shadow-2xl z-50 rounded-bl-2xl max-h-[80vh] overflow-y-auto">
    <div class="p-4 border-b border-orange-500/10 flex items-center justify-between">
      <h3 class="font-bold text-white text-sm">Alertes Système</h3>
      <button onclick="toggleAdminAlerts()" class="text-slate-500 hover:text-slate-300 text-xs"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-3 space-y-2">${adminAlerts()}</div>
  </div>

  <script>
    // ── Date ─────────────────────────────────────────────────────────────────
    const el = document.getElementById('admin-date');
    if(el) el.textContent = new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'});

    // ── Theme ─────────────────────────────────────────────────────────────────
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

    // ── Logout ────────────────────────────────────────────────────────────────
    function adminLogout() {
      if(confirm('Déconnecter la session Super Admin ?')) {
        localStorage.removeItem('adnova_admin_token');
        window.location.href = '/admin/login';
      }
    }

    // ── Alerts ────────────────────────────────────────────────────────────────
    function toggleAdminAlerts() {
      document.getElementById('admin-alerts-panel').classList.toggle('hidden');
    }
    document.addEventListener('click', function(e) {
      const panel = document.getElementById('admin-alerts-panel');
      if(!panel.classList.contains('hidden') && !panel.contains(e.target) && !e.target.closest('[onclick="toggleAdminAlerts()"]')) {
        panel.classList.add('hidden');
      }
    });

    // ── Search ────────────────────────────────────────────────────────────────
    document.getElementById('admin-search')?.addEventListener('keydown', function(e) {
      if(e.key==='Enter' && this.value) window.location.href='/admin/tenants?search='+encodeURIComponent(this.value);
    });

    // ── Mobile sidebar ────────────────────────────────────────────────────────
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
    '/admin/tenants': '<span class="ml-auto text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full font-semibold">3</span>',
    '/admin/logs': '<span class="w-1.5 h-1.5 rounded-full bg-red-500 blink inline-block ml-auto"></span>',
  }
  return `<a href="${href}" class="admin-link ${isActive ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500">
    <i class="fas ${icon} w-4 text-center ${isActive ? 'text-orange-400' : 'text-slate-600'}"></i>
    <span class="flex-1">${label}</span>
    ${badges[href] || ''}
  </a>`
}

function adminAlerts(): string {
  const alerts = [
    { icon: 'fa-triangle-exclamation', color: 'amber', text: 'TechStart Inc: dépassement budget +40% aujourd\'hui', time: '12min' },
    { icon: 'fa-user-xmark', color: 'red', text: '3 tentatives de connexion suspectes — IP: 185.xx.xx.xx', time: '28min' },
    { icon: 'fa-clock', color: 'blue', text: 'Fashion Brand: essai expire dans 2 jours', time: '1h' },
    { icon: 'fa-server', color: 'orange', text: 'Usage CPU AI Engine: 87% — pic inhabituel', time: '2h' },
    { icon: 'fa-check-circle', color: 'emerald', text: 'Nouveau client: "Digital Storm" — plan Growth activé', time: '3h' },
  ]
  return alerts.map(a => `
    <div class="flex items-start gap-3 p-3 glass rounded-lg hover:bg-white/5 cursor-pointer transition-all">
      <div class="w-7 h-7 rounded-lg bg-${a.color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <i class="fas ${a.icon} text-${a.color}-400 text-xs"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-300 leading-relaxed">${a.text}</p>
        <p class="text-xs text-slate-600 mt-0.5">${a.time}</p>
      </div>
    </div>`).join('')
}
