import { type Lang, type TranslationKey, t, getLangDir, langSelectorHTML, SUPPORTED_LANGS, getLangName } from './i18n'

export const BRAND = {
  name: 'AdNova AI',
  tagline: 'Autonomous Advertising Intelligence',
  version: '2.0',
}

export function shell(
  title: string,
  content: string,
  activePage: string = '',
  lang: Lang = 'en'
): string {
  const dir = getLangDir(lang)
  const isRTL = dir === 'rtl'

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" class="dark">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} — ${BRAND.name}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin/>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js" defer></script>
  <script>
    // ── Theme initialization (before render to avoid FOUC) ──
    (function() {
      const saved = localStorage.getItem('adnova_theme');
      if (saved === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
      }
    })();

    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0f4ff', 100: '#e0e9ff', 200: '#c7d7fe',
              300: '#a5bbfc', 400: '#8194f8', 500: '#6366f1',
              600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81',
            },
            surface: {
              50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
              800: '#1e293b', 850: '#172033', 900: '#0f172a', 950: '#080e1a',
            }
          },
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
          animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
            'spin-slow': 'spin 3s linear infinite',
            'float': 'float 6s ease-in-out infinite',
            'glow': 'glow 2s ease-in-out infinite alternate',
          },
          keyframes: {
            float: { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-10px)'} },
            glow: { '0%': {'box-shadow':'0 0 5px #6366f1'}, '100%': {'box-shadow':'0 0 20px #6366f1, 0 0 40px #6366f1'} }
          }
        }
      }
    }
  </script>
  <style>
    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    .dark ::-webkit-scrollbar-track { background: #0f172a; }
    .dark ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
    .dark ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
    .light ::-webkit-scrollbar-track { background: #f1f5f9; }
    .light ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    .light ::-webkit-scrollbar-thumb:hover { background: #6366f1; }

    /* ── Dark mode base ── */
    .dark body { background: #080e1a; color: #e2e8f0; font-family: 'Inter', sans-serif; }
    .dark .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.07); }
    .dark .glass-hover:hover { background: rgba(255,255,255,0.06); border-color: rgba(99,102,241,0.4); }
    .dark .sidebar-bg { background: rgba(8,14,26,0.95); border-color: rgba(255,255,255,0.05); }
    .dark .topbar-bg { background: rgba(8,14,26,0.9); border-color: rgba(255,255,255,0.05); }
    .dark .card-bg { background: rgba(30,41,59,0.5); border-color: rgba(255,255,255,0.07); }
    .dark .text-main { color: #e2e8f0; }
    .dark .text-sub { color: #64748b; }

    /* ── Light mode base ── */
    .light body { background: #f0f4ff; color: #0f172a; font-family: 'Inter', sans-serif; }
    .light .glass { background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.08); }
    .light .glass-hover:hover { background: rgba(255,255,255,0.95); border-color: rgba(99,102,241,0.4); }
    .light .sidebar-bg { background: rgba(255,255,255,0.97); border-color: rgba(0,0,0,0.07); }
    .light .topbar-bg { background: rgba(255,255,255,0.95); border-color: rgba(0,0,0,0.07); }
    .light .card-bg { background: rgba(255,255,255,0.9); border-color: rgba(0,0,0,0.07); }
    .light .text-main { color: #0f172a; }
    .light .text-sub { color: #64748b; }
    .light .text-slate-200 { color: #1e293b !important; }
    .light .text-slate-300 { color: #334155 !important; }
    .light .text-slate-400 { color: #475569 !important; }
    .light .text-slate-500 { color: #64748b !important; }
    .light .text-slate-600 { color: #94a3b8 !important; }
    .light .text-white { color: #0f172a !important; }
    .light .bg-\\[\\#080e1a\\] { background: #f0f4ff !important; }

    /* ── Shared styles ── */
    .neon-border { border: 1px solid rgba(99,102,241,0.5); box-shadow: 0 0 20px rgba(99,102,241,0.15); }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .gradient-text { background: linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .sidebar-link { transition: all 0.2s ease; border-${isRTL ? 'right' : 'left'}: 3px solid transparent; }
    .dark .sidebar-link:hover, .dark .sidebar-link.active { background: rgba(99,102,241,0.15); border-${isRTL ? 'right' : 'left'}-color: #6366f1; color: #818cf8; }
    .dark .sidebar-link.active { background: rgba(99,102,241,0.2); color: #a5b4fc; }
    .light .sidebar-link:hover, .light .sidebar-link.active { background: rgba(99,102,241,0.1); border-${isRTL ? 'right' : 'left'}-color: #6366f1; color: #4f46e5; }
    .light .sidebar-link.active { background: rgba(99,102,241,0.12); color: #4338ca; }
    .badge-live { background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
    .badge-paused { background: rgba(245,158,11,0.2); color: #f59e0b; border: 1px solid rgba(245,158,11,0.3); }
    .badge-draft { background: rgba(148,163,184,0.2); color: #94a3b8; border: 1px solid rgba(148,163,184,0.3); }
    .badge-killed { background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
    .badge-scaling { background: rgba(99,102,241,0.2); color: #818cf8; border: 1px solid rgba(99,102,241,0.3); }
    .progress-bar { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.08); overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.8s ease; }
    .animate-fadeIn { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .blink { animation: blink 1.5s ease infinite; }
    .platform-fb { background: linear-gradient(135deg,#1877f2,#0d5dbf); }
    .platform-ig { background: linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4); }
    .platform-tt { background: linear-gradient(135deg,#010101,#ff0050,#00f2ea); }
    .platform-sc { background: linear-gradient(135deg,#fffc00,#f5c400); }
    .platform-gl { background: linear-gradient(135deg,#4285f4,#34a853,#fbbc05,#ea4335); }
    .platform-pi { background: linear-gradient(135deg,#e60023,#ad081b); }
    .platform-tw { background: linear-gradient(135deg,#000000,#14171a); }
    .platform-li { background: linear-gradient(135deg,#0077b5,#005885); }
    .platform-yt { background: linear-gradient(135deg,#ff0000,#cc0000); }
    .dark .table-row:hover { background: rgba(255,255,255,0.02); }
    .light .table-row:hover { background: rgba(99,102,241,0.03); }
    /* Mobile sidebar */
    @media (max-width: 768px) {
      .sidebar-desktop { transform: translateX(${isRTL ? '100%' : '-100%'}); transition: transform 0.3s ease; }
      .sidebar-desktop.open { transform: translateX(0); }
      .main-content { margin-${isRTL ? 'right' : 'left'}: 0 !important; }
    }
    .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 35; }
    .sidebar-overlay.show { display: block; }
    /* Theme toggle button */
    .theme-toggle { transition: all 0.3s ease; }
    .theme-toggle:hover { transform: rotate(20deg); }
  </style>
</head>
<body class="text-slate-200 min-h-screen flex">

  <!-- Mobile overlay -->
  <div class="sidebar-overlay" id="sidebar-overlay" onclick="closeSidebar()"></div>

  <!-- Sidebar -->
  <aside id="main-sidebar" class="sidebar-desktop sidebar-bg w-64 min-h-screen glass border-r flex flex-col fixed ${isRTL ? 'right-0' : 'left-0'} top-0 z-40">
    <!-- Logo -->
    <div class="p-5 border-b border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <i class="fas fa-bolt text-white"></i>
        </div>
        <div>
          <div class="font-black text-white text-base tracking-tight">${BRAND.name}</div>
          <div class="text-xs text-slate-500">${BRAND.tagline}</div>
        </div>
      </div>
    </div>

    <!-- Tenant Selector -->
    <div class="px-4 py-3 border-b border-white/5">
      <button onclick="toggleTenantMenu()" id="tenant-btn" class="w-full glass rounded-lg px-3 py-2 flex items-center gap-2 text-sm hover:bg-white/5 transition-all">
        <div class="w-6 h-6 rounded-md bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0" id="tenant-abbr">A</div>
        <span class="flex-1 text-left text-slate-300 font-medium truncate" id="tenant-name">Acme Corp</span>
        <i class="fas fa-chevron-down text-slate-500 text-xs"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">
      <div class="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2">${t(lang, 'overview')}</div>
      ${navLink('/dashboard', 'fa-chart-line', t(lang, 'dashboard'), activePage)}
      ${navLink('/campaigns', 'fa-bullhorn', t(lang, 'campaigns'), activePage)}
      ${navLink('/creatives', 'fa-wand-magic-sparkles', t(lang, 'creatives'), activePage)}
      ${navLink('/analytics', 'fa-chart-bar', t(lang, 'analytics'), activePage)}
      <div class="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2 mt-3">${t(lang, 'ai_engine')} & ${t(lang, 'automation')}</div>
      ${navLink('/ai-engine', 'fa-brain', t(lang, 'ai_engine'), activePage)}
      ${navLink('/automation', 'fa-gears', t(lang, 'automation'), activePage)}
      ${navLink('/audiences', 'fa-users', t(lang, 'audiences'), activePage)}
      <div class="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2 mt-3">${t(lang, 'settings')}</div>
      ${navLink('/platforms', 'fa-plug', t(lang, 'platforms'), activePage)}
      ${navLink('/billing', 'fa-credit-card', t(lang, 'billing'), activePage)}
      ${navLink('/settings', 'fa-gear', t(lang, 'settings'), activePage)}
    </nav>

    <!-- AI Status -->
    <div class="p-4 border-t border-white/5">
      <div class="glass rounded-xl p-3">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 rounded-full bg-emerald-400 blink flex-shrink-0"></div>
          <span class="text-xs font-semibold text-emerald-400">AI ENGINE ACTIF</span>
        </div>
        <div class="text-xs text-slate-500" id="ai-status-text">${t(lang, 'active_campaigns')}: 47</div>
        <div class="progress-bar mt-2">
          <div class="progress-fill bg-gradient-to-r from-brand-500 to-purple-500" style="width:73%" id="ai-progress"></div>
        </div>
      </div>
    </div>

    <!-- Super Admin Quick Access -->
    <div class="px-4 pb-2">
      <a href="/admin/login" class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-orange-500/10 transition-all group border border-orange-500/10 hover:border-orange-500/25">
        <div class="w-5 h-5 rounded-md bg-orange-500/15 flex items-center justify-center flex-shrink-0">
          <i class="fas fa-shield-halved text-orange-500 text-xs group-hover:text-orange-400"></i>
        </div>
        <span class="text-xs text-slate-600 group-hover:text-orange-400 transition-colors font-medium">Super Admin</span>
        <i class="fas fa-external-link text-xs text-slate-700 group-hover:text-orange-500 ml-auto"></i>
      </a>
    </div>

    <!-- User Profile -->
    <div class="p-4 border-t border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0" id="user-avatar">JD</div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-white truncate" id="user-name">John Doe</div>
          <div class="text-xs text-slate-500 truncate" id="user-email">john@acmecorp.com</div>
        </div>
        <button onclick="handleLogout()" class="text-slate-500 hover:text-red-400 transition-colors" title="${t(lang, 'logout')}">
          <i class="fas fa-right-from-bracket text-sm"></i>
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="main-content ${isRTL ? 'mr-64' : 'ml-64'} flex-1 flex flex-col min-h-screen">
    <!-- Top Bar -->
    <header class="h-14 topbar-bg glass border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <!-- Mobile menu button -->
        <button class="md:hidden glass rounded-lg w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-all" onclick="openSidebar()">
          <i class="fas fa-bars text-slate-400 text-sm"></i>
        </button>
        <h1 class="text-sm font-bold text-white">${title}</h1>
      </div>
      <div class="flex items-center gap-2">
        <!-- Language Selector -->
        <div class="hidden sm:block">
          ${langSelectorHTML(lang)}
        </div>
        <!-- Theme Toggle -->
        <button id="theme-toggle" onclick="toggleTheme()" class="theme-toggle glass rounded-lg w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-all" title="${t(lang, 'dark_mode')} / ${t(lang, 'light_mode')}">
          <i id="theme-icon" class="fas fa-moon text-slate-400 text-xs"></i>
        </button>
        <!-- AI Optimizer -->
        <button class="hidden sm:flex glass rounded-lg px-3 py-1.5 text-xs items-center gap-2 hover:bg-white/5 transition-all" onclick="showAIStatus()">
          <i class="fas fa-robot text-brand-400 text-xs"></i>
          <span class="text-slate-300">AI</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 blink"></span>
        </button>
        <!-- Notifications -->
        <button class="glass rounded-lg w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-all relative" onclick="toggleNotifications()" id="notif-btn">
          <i class="fas fa-bell text-slate-400 text-xs"></i>
          <span class="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 border border-slate-900" id="notif-badge"></span>
        </button>
        <!-- New Campaign -->
        <a href="/campaigns" class="bg-gradient-to-r from-brand-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-lg">
          <i class="fas fa-plus text-xs"></i>
          <span class="hidden sm:inline">${t(lang, 'new_campaign')}</span>
        </a>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 p-4 md:p-6 animate-fadeIn" id="main-content">
      ${content}
    </main>
  </div>

  <!-- Notifications Panel -->
  <div id="notifications-panel" class="hidden fixed ${isRTL ? 'left-0' : 'right-0'} top-14 w-80 md:w-96 glass border border-white/10 shadow-2xl z-50 rounded-bl-2xl max-h-[80vh] overflow-y-auto">
    <div class="p-4 border-b border-white/10 flex items-center justify-between">
      <h3 class="font-bold text-white text-sm">${t(lang, 'notifications')}</h3>
      <div class="flex items-center gap-2">
        <button onclick="markAllRead()" class="text-xs text-brand-400 hover:text-brand-300">✓ All read</button>
        <button onclick="toggleNotifications()" class="text-slate-500 hover:text-slate-300 ml-2"><i class="fas fa-times text-xs"></i></button>
      </div>
    </div>
    <div class="p-3 space-y-2" id="notif-list">
      ${notificationsHTML()}
    </div>
  </div>

  <!-- AI Status Modal -->
  <div id="ai-status-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onclick="closeAIStatus(event)">
    <div class="glass neon-border rounded-2xl w-full max-w-2xl p-6 animate-fadeIn" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-brain text-white text-sm"></i>
          </div>
          <div>
            <h3 class="font-bold text-white">AI Engine Status</h3>
            <p class="text-xs text-emerald-400">All systems operational</p>
          </div>
        </div>
        <button onclick="closeAIStatus()" class="text-slate-500 hover:text-slate-300 transition-colors"><i class="fas fa-times"></i></button>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-5">
        ${aiStatusCard('Campaign Optimizer', '94.2%', 'accuracy', 'fa-chart-line', 'brand')}
        ${aiStatusCard('Creative Generator', 'Active', 'generating 3 creatives', 'fa-wand-magic-sparkles', 'purple')}
        ${aiStatusCard('Budget Allocator', '$12,450', 'managed today', 'fa-dollar-sign', 'emerald')}
        ${aiStatusCard('Audience Predictor', '87.6%', 'CTR prediction accuracy', 'fa-bullseye', 'amber')}
      </div>
      <div class="glass rounded-xl p-4">
        <div class="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">${t(lang, 'overview')}</div>
        <div class="space-y-2 text-xs">
          ${aiLogEntry('Scaled "Summer Sale" budget +10% — ROAS improved to 4.2x', 'brand', '2 min')}
          ${aiLogEntry('Killed 2 underperforming creatives (CTR < 0.8%) in TikTok', 'red', '8 min')}
          ${aiLogEntry('Generated 4 new UGC video variants for "Product Launch"', 'purple', '15 min')}
          ${aiLogEntry('Detected audience saturation — expanding lookalike to 3%', 'amber', '23 min')}
          ${aiLogEntry('Reallocated $500 Facebook → Google — predicted +18% ROAS', 'emerald', '31 min')}
        </div>
      </div>
    </div>
  </div>

  <!-- Tenant Menu -->
  <div id="tenant-menu" class="hidden fixed ${isRTL ? 'right-4' : 'left-4'} z-50" style="top: 88px;">
    <div class="w-60 glass border border-white/10 rounded-xl shadow-2xl">
      <div class="p-3 border-b border-white/10">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">${t(lang, 'workspace')}</div>
      </div>
      <div class="p-2 space-y-1">
        <button onclick="switchTenant('Acme Corp','A','from-brand-500 to-purple-600')" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all bg-brand-500/10">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">A</div>
          <span class="text-sm text-slate-300 font-medium">Acme Corp</span>
          <i class="fas fa-check text-brand-400 text-xs ml-auto"></i>
        </button>
        <button onclick="switchTenant('TechStart Inc','T','from-emerald-500 to-teal-600')" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white">T</div>
          <span class="text-sm text-slate-300 font-medium">TechStart Inc</span>
        </button>
        <button onclick="switchTenant('Fashion Brand','F','from-pink-500 to-rose-600')" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xs font-bold text-white">F</div>
          <span class="text-sm text-slate-300 font-medium">Fashion Brand</span>
        </button>
        <div class="border-t border-white/10 mt-2 pt-2">
          <button class="w-full text-left px-3 py-2 text-xs text-brand-400 hover:text-brand-300 flex items-center gap-2 hover:bg-white/5 rounded-lg transition-all">
            <i class="fas fa-plus"></i> ${t(lang, 'workspace')} +
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // ── User info from localStorage ─────────────────────────────────────────
    (function() {
      try {
        const u = JSON.parse(localStorage.getItem('adnova_user') || '{}');
        if (u.name) {
          document.getElementById('user-name').textContent = u.name;
          document.getElementById('user-avatar').textContent = u.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
        }
        if (u.email) document.getElementById('user-email').textContent = u.email;
        if (u.company) {
          document.getElementById('tenant-name').textContent = u.company;
          document.getElementById('tenant-abbr').textContent = u.company[0].toUpperCase();
        }
      } catch(e) {}
    })();

    // ── Theme Management ────────────────────────────────────────────────────
    function applyTheme(theme) {
      const html = document.documentElement;
      const icon = document.getElementById('theme-icon');
      if (theme === 'light') {
        html.classList.remove('dark');
        html.classList.add('light');
        if (icon) { icon.className = 'fas fa-sun text-amber-400 text-xs'; }
      } else {
        html.classList.remove('light');
        html.classList.add('dark');
        if (icon) { icon.className = 'fas fa-moon text-slate-400 text-xs'; }
      }
      // Update Chart.js theme if charts exist
      if (typeof window.updateChartsTheme === 'function') {
        window.updateChartsTheme(theme);
      }
    }
    function toggleTheme() {
      const current = localStorage.getItem('adnova_theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('adnova_theme', next);
      applyTheme(next);
    }
    // Apply correct icon on load
    (function() {
      const saved = localStorage.getItem('adnova_theme') || 'dark';
      applyTheme(saved);
    })();

    // ── Logout ──────────────────────────────────────────────────────────────
    function handleLogout() {
      if (confirm('${t(lang, 'logout')} ?')) {
        localStorage.removeItem('adnova_token');
        localStorage.removeItem('adnova_user');
        fetch('/api/auth/logout', { method: 'POST' }).catch(()=>{});
        window.location.href = '/login';
      }
    }

    // ── Notifications ───────────────────────────────────────────────────────
    function toggleNotifications() {
      const p = document.getElementById('notifications-panel');
      p.classList.toggle('hidden');
      document.getElementById('notif-badge').classList.add('hidden');
    }
    function markAllRead() {
      document.getElementById('notif-badge').classList.add('hidden');
      document.querySelectorAll('#notif-list .unread-dot').forEach(d => d.remove());
      toggleNotifications();
    }

    // ── AI Status Modal ─────────────────────────────────────────────────────
    function showAIStatus() { document.getElementById('ai-status-modal').classList.remove('hidden'); }
    function closeAIStatus(e) {
      if (!e || e.target === document.getElementById('ai-status-modal')) {
        document.getElementById('ai-status-modal').classList.add('hidden');
      }
    }

    // ── Tenant Menu ─────────────────────────────────────────────────────────
    function toggleTenantMenu() {
      document.getElementById('tenant-menu').classList.toggle('hidden');
    }
    function switchTenant(name, abbr, gradient) {
      document.getElementById('tenant-name').textContent = name;
      document.getElementById('tenant-abbr').textContent = abbr;
      document.getElementById('tenant-menu').classList.add('hidden');
      try {
        const u = JSON.parse(localStorage.getItem('adnova_user') || '{}');
        u.company = name;
        localStorage.setItem('adnova_user', JSON.stringify(u));
      } catch(e){}
    }

    // ── Mobile Sidebar ──────────────────────────────────────────────────────
    function openSidebar() {
      document.getElementById('main-sidebar').classList.add('open');
      document.getElementById('sidebar-overlay').classList.add('show');
    }
    function closeSidebar() {
      document.getElementById('main-sidebar').classList.remove('open');
      document.getElementById('sidebar-overlay').classList.remove('show');
    }

    // ── Close menus on outside click ────────────────────────────────────────
    document.addEventListener('click', function(e) {
      const tMenu = document.getElementById('tenant-menu');
      const tBtn = document.getElementById('tenant-btn');
      if (tMenu && !tMenu.classList.contains('hidden') && !tMenu.contains(e.target) && !tBtn.contains(e.target)) {
        tMenu.classList.add('hidden');
      }
      const nPanel = document.getElementById('notifications-panel');
      const nBtn = document.getElementById('notif-btn');
      if (nPanel && !nPanel.classList.contains('hidden') && !nPanel.contains(e.target) && !nBtn.contains(e.target)) {
        nPanel.classList.add('hidden');
      }
    });

    // ── Auto-refresh every 30s ──────────────────────────────────────────────
    setInterval(() => {
      if (typeof window.refreshMetrics === 'function') window.refreshMetrics();
    }, 30000);
  </script>
</body>
</html>`
}

function navLink(href: string, icon: string, label: string, active: string): string {
  const isActive = active === href
  const badges: Record<string, string> = {
    '/campaigns': '<span class="ml-auto text-xs bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-full font-semibold">47</span>',
    '/ai-engine': '<span class="ml-auto text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full blink font-semibold">Live</span>',
  }
  return `<a href="${href}" class="sidebar-link ${isActive ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500">
    <i class="fas ${icon} w-4 text-center flex-shrink-0 ${isActive ? 'text-brand-400' : 'text-slate-600'}"></i>
    <span class="flex-1">${label}</span>
    ${badges[href] || ''}
  </a>`
}

function notificationsHTML(): string {
  const items = [
    { icon: 'fa-arrow-trend-up', color: 'emerald', text: 'Campaign "Summer Sale" scaled +10% — ROAS 4.2x', time: '2 min' },
    { icon: 'fa-triangle-exclamation', color: 'amber', text: 'Budget warning: Google Ads at 85% daily limit', time: '15 min' },
    { icon: 'fa-scissors', color: 'red', text: '3 creatives paused — CTR below 0.8% threshold', time: '32 min' },
    { icon: 'fa-wand-magic-sparkles', color: 'purple', text: 'AI generated 6 new video creatives ready', time: '1h' },
    { icon: 'fa-users', color: 'blue', text: 'New lookalike audience: 2.3M potential reach', time: '2h' },
  ]
  return items.map(i => `
    <div class="flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/5 cursor-pointer transition-all">
      <div class="w-7 h-7 rounded-lg bg-${i.color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <i class="fas ${i.icon} text-${i.color}-400 text-xs"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-300 leading-relaxed">${i.text}</p>
        <p class="text-xs text-slate-600 mt-0.5">${i.time}</p>
      </div>
    </div>`).join('')
}

function aiStatusCard(title: string, value: string, sub: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-4">
    <div class="flex items-center gap-2 mb-2">
      <i class="fas ${icon} text-${color}-400 text-sm"></i>
      <span class="text-xs text-slate-500">${title}</span>
    </div>
    <div class="text-xl font-bold text-white">${value}</div>
    <div class="text-xs text-slate-500 mt-0.5">${sub}</div>
  </div>`
}

function aiLogEntry(text: string, color: string, time: string): string {
  return `<div class="flex items-start gap-2 py-1.5 border-b border-white/5">
    <div class="w-1.5 h-1.5 rounded-full bg-${color}-400 mt-1.5 flex-shrink-0"></div>
    <p class="flex-1 text-slate-400 text-xs">${text}</p>
    <span class="text-slate-600 text-xs flex-shrink-0">${time}</span>
  </div>`
}
