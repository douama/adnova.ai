export const BRAND = {
  name: 'AdNova AI',
  tagline: 'Autonomous Advertising Intelligence',
  version: '2.0',
}

export function shell(title: string, content: string, activePage: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} — ${BRAND.name}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0f4ff',
              100: '#e0e9ff',
              200: '#c7d7fe',
              300: '#a5bbfc',
              400: '#8194f8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
            },
            surface: {
              50: '#f8fafc',
              100: '#f1f5f9',
              200: '#e2e8f0',
              800: '#1e293b',
              850: '#172033',
              900: '#0f172a',
              950: '#080e1a',
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
          animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'spin-slow': 'spin 3s linear infinite',
            'float': 'float 6s ease-in-out infinite',
            'glow': 'glow 2s ease-in-out infinite',
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            glow: {
              '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
              '50%': { boxShadow: '0 0 40px rgba(99,102,241,0.6)' },
            }
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
    .gradient-text { background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
    .glass-hover:hover { background: rgba(255,255,255,0.06); border-color: rgba(99,102,241,0.4); }
    .neon-border { border: 1px solid rgba(99,102,241,0.5); box-shadow: 0 0 20px rgba(99,102,241,0.15), inset 0 0 20px rgba(99,102,241,0.05); }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
    .platform-fb { background: linear-gradient(135deg, #1877f2, #0d5dbf); }
    .platform-ig { background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4); }
    .platform-tt { background: linear-gradient(135deg, #010101, #ff0050, #00f2ea); }
    .platform-sc { background: linear-gradient(135deg, #fffc00, #f5c400); }
    .platform-gl { background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335); }
    .stat-up { color: #10b981; }
    .stat-down { color: #ef4444; }
    .badge-live { background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
    .badge-paused { background: rgba(245,158,11,0.2); color: #f59e0b; border: 1px solid rgba(245,158,11,0.3); }
    .badge-draft { background: rgba(148,163,184,0.2); color: #94a3b8; border: 1px solid rgba(148,163,184,0.3); }
    .badge-killed { background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
    .badge-scaling { background: rgba(99,102,241,0.2); color: #818cf8; border: 1px solid rgba(99,102,241,0.3); }
    .progress-bar { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.1); overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.8s ease; }
    .ai-pulse::before { content: ''; position: absolute; inset: -2px; border-radius: inherit; background: linear-gradient(135deg, #6366f1, #8b5cf6); opacity: 0; transition: opacity 0.3s; z-index: -1; }
    .ai-pulse:hover::before { opacity: 1; }
    .sidebar-link { transition: all 0.2s ease; border-left: 3px solid transparent; }
    .sidebar-link:hover, .sidebar-link.active { background: rgba(99,102,241,0.15); border-left-color: #6366f1; color: #818cf8; }
    .sidebar-link.active { background: rgba(99,102,241,0.2); color: #a5b4fc; }
    .metric-card { position: relative; overflow: hidden; }
    .metric-card::after { content: ''; position: absolute; top: -50%; right: -50%; width: 100%; height: 100%; background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%); pointer-events: none; }
    .animate-fadeIn { animation: fadeIn 0.5s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .tooltip { position: relative; }
    .tooltip:hover .tooltip-text { visibility: visible; opacity: 1; }
    .tooltip-text { visibility: hidden; opacity: 0; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 6px 10px; border-radius: 6px; font-size: 12px; white-space: nowrap; position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); transition: opacity 0.2s; z-index: 50; }
    .sparkline { width: 80px; height: 30px; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .blink { animation: blink 1.5s ease infinite; }
  </style>
</head>
<body class="bg-surface-950 text-slate-200 font-sans min-h-screen flex">

  <!-- Sidebar -->
  <aside class="w-64 min-h-screen glass border-r border-white/5 flex flex-col fixed left-0 top-0 z-40">
    <!-- Logo -->
    <div class="p-6 border-b border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg">
          <i class="fas fa-bolt text-white text-lg"></i>
        </div>
        <div>
          <div class="font-black text-white text-lg tracking-tight">${BRAND.name}</div>
          <div class="text-xs text-slate-500">${BRAND.tagline}</div>
        </div>
      </div>
    </div>

    <!-- Tenant Selector -->
    <div class="px-4 py-3 border-b border-white/5">
      <button onclick="toggleTenantMenu()" class="w-full glass rounded-lg px-3 py-2 flex items-center gap-2 text-sm hover:bg-white/5 transition-all">
        <div class="w-6 h-6 rounded-md bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">A</div>
        <span class="flex-1 text-left text-slate-300 font-medium truncate">Acme Corp</span>
        <i class="fas fa-chevron-down text-slate-500 text-xs"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
      <div class="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2">Main</div>
      ${navLink('/dashboard', 'fa-chart-line', 'Dashboard', activePage)}
      ${navLink('/campaigns', 'fa-bullhorn', 'Campaigns', activePage)}
      ${navLink('/creatives', 'fa-wand-magic-sparkles', 'Creative Studio', activePage)}
      ${navLink('/analytics', 'fa-chart-bar', 'Analytics', activePage)}
      <div class="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2 mt-4">AI & Automation</div>
      ${navLink('/ai-engine', 'fa-brain', 'AI Engine', activePage)}
      ${navLink('/automation', 'fa-gears', 'Automation', activePage)}
      ${navLink('/audiences', 'fa-users', 'Audiences', activePage)}
      <div class="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-2 mt-4">Configuration</div>
      ${navLink('/platforms', 'fa-plug', 'Platforms', activePage)}
      ${navLink('/billing', 'fa-credit-card', 'Billing', activePage)}
      ${navLink('/settings', 'fa-gear', 'Settings', activePage)}
    </nav>

    <!-- AI Status Indicator -->
    <div class="p-4 border-t border-white/5">
      <div class="glass rounded-xl p-3">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 rounded-full bg-emerald-400 blink"></div>
          <span class="text-xs font-semibold text-emerald-400">AI ENGINE ACTIVE</span>
        </div>
        <div class="text-xs text-slate-500">Processing 47 campaigns</div>
        <div class="progress-bar mt-2">
          <div class="progress-fill bg-gradient-to-r from-brand-500 to-purple-500" style="width:73%"></div>
        </div>
      </div>
    </div>

    <!-- User Profile -->
    <div class="p-4 border-t border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">JD</div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-white truncate">John Doe</div>
          <div class="text-xs text-slate-500 truncate">john@acmecorp.com</div>
        </div>
        <button class="text-slate-500 hover:text-slate-300 transition-colors">
          <i class="fas fa-ellipsis-vertical text-xs"></i>
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="ml-64 flex-1 flex flex-col min-h-screen">
    <!-- Top Bar -->
    <header class="h-16 glass border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
      <div class="flex items-center gap-4">
        <h1 class="text-lg font-bold text-white">${title}</h1>
        <div id="page-badge"></div>
      </div>
      <div class="flex items-center gap-3">
        <!-- AI Optimizer Status -->
        <button class="glass rounded-lg px-3 py-2 text-xs flex items-center gap-2 hover:bg-white/5 transition-all" onclick="showAIStatus()">
          <i class="fas fa-robot text-brand-400"></i>
          <span class="text-slate-300">AI Optimizer</span>
          <span class="w-2 h-2 rounded-full bg-emerald-400 blink"></span>
        </button>
        <!-- Notifications -->
        <button class="glass rounded-lg w-9 h-9 flex items-center justify-center hover:bg-white/5 transition-all relative" onclick="toggleNotifications()">
          <i class="fas fa-bell text-slate-400 text-sm"></i>
          <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
        <!-- Quick Create -->
        <button onclick="window.location.href='/campaigns'" class="bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg">
          <i class="fas fa-plus text-xs"></i>
          New Campaign
        </button>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 p-6 animate-fadeIn" id="main-content">
      ${content}
    </main>
  </div>

  <!-- Notifications Panel -->
  <div id="notifications-panel" class="hidden fixed right-0 top-16 w-96 glass border border-white/10 shadow-2xl z-50 rounded-bl-2xl max-h-[80vh] overflow-y-auto">
    <div class="p-4 border-b border-white/10 flex items-center justify-between">
      <h3 class="font-bold text-white">Notifications</h3>
      <button onclick="toggleNotifications()" class="text-slate-500 hover:text-slate-300"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-3 space-y-2">
      ${notificationsHTML()}
    </div>
  </div>

  <!-- AI Status Modal -->
  <div id="ai-status-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="glass neon-border rounded-2xl w-full max-w-2xl p-6 animate-fadeIn">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-brain text-white"></i>
          </div>
          <div>
            <h3 class="font-bold text-white text-lg">AI Engine Status</h3>
            <p class="text-xs text-emerald-400">All systems operational</p>
          </div>
        </div>
        <button onclick="closeAIStatus()" class="text-slate-500 hover:text-slate-300"><i class="fas fa-times text-lg"></i></button>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6">
        ${aiStatusCard('Campaign Optimizer', '94.2%', 'accuracy', 'fa-chart-line', 'brand')}
        ${aiStatusCard('Creative Generator', 'Active', 'generating 3 creatives', 'fa-wand-magic-sparkles', 'purple')}
        ${aiStatusCard('Budget Allocator', '$12,450', 'managed today', 'fa-dollar-sign', 'emerald')}
        ${aiStatusCard('Audience Predictor', '87.6%', 'CTR prediction accuracy', 'fa-bullseye', 'amber')}
      </div>
      <div class="glass rounded-xl p-4">
        <div class="text-sm font-semibold text-slate-300 mb-3">AI Activity Log</div>
        <div class="space-y-2 text-xs">
          ${aiLogEntry('Scaled "Summer Sale" campaign budget by 10% — ROAS improved to 4.2x', 'brand', '2 min ago')}
          ${aiLogEntry('Killed 2 underperforming creatives (CTR < 0.8%) in TikTok campaign', 'red', '8 min ago')}
          ${aiLogEntry('Generated 4 new UGC video variants for "Product Launch" campaign', 'purple', '15 min ago')}
          ${aiLogEntry('Detected audience saturation — expanding lookalike to 3%', 'amber', '23 min ago')}
          ${aiLogEntry('Reallocated $500 from Facebook to Google — predicted +18% ROAS', 'emerald', '31 min ago')}
        </div>
      </div>
    </div>
  </div>

  <!-- Tenant Menu -->
  <div id="tenant-menu" class="hidden fixed left-4 top-36 w-60 glass border border-white/10 rounded-xl shadow-2xl z-50">
    <div class="p-3 border-b border-white/10">
      <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Switch Workspace</div>
    </div>
    <div class="p-2 space-y-1">
      ${tenantItem('Acme Corp', 'A', 'from-brand-500 to-purple-600', true)}
      ${tenantItem('TechStart Inc', 'T', 'from-emerald-500 to-teal-600', false)}
      ${tenantItem('Fashion Brand', 'F', 'from-pink-500 to-rose-600', false)}
      <div class="border-t border-white/10 mt-2 pt-2">
        <button class="w-full text-left px-3 py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-2 hover:bg-white/5 rounded-lg">
          <i class="fas fa-plus text-brand-400"></i> Create New Workspace
        </button>
      </div>
    </div>
  </div>

  <script>
    function toggleNotifications() {
      const p = document.getElementById('notifications-panel');
      p.classList.toggle('hidden');
    }
    function showAIStatus() {
      document.getElementById('ai-status-modal').classList.remove('hidden');
    }
    function closeAIStatus() {
      document.getElementById('ai-status-modal').classList.add('hidden');
    }
    function toggleTenantMenu() {
      const m = document.getElementById('tenant-menu');
      m.classList.toggle('hidden');
    }
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#tenant-menu') && !e.target.closest('button[onclick="toggleTenantMenu()"]')) {
        document.getElementById('tenant-menu')?.classList.add('hidden');
      }
    });
    // Auto-refresh metrics every 30s
    let refreshInterval = setInterval(() => {
      if (window.refreshMetrics) window.refreshMetrics();
    }, 30000);
  </script>
</body>
</html>`
}

function navLink(href: string, icon: string, label: string, active: string): string {
  const isActive = active === href || (href !== '/' && active.startsWith(href))
  return `<a href="${href}" class="sidebar-link ${isActive ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400">
    <i class="fas ${icon} w-4 text-center ${isActive ? 'text-brand-400' : ''}"></i>
    ${label}
    ${href === '/campaigns' ? '<span class="ml-auto text-xs bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-full">47</span>' : ''}
    ${href === '/ai-engine' ? '<span class="ml-auto text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full blink">Live</span>' : ''}
  </a>`
}

function notificationsHTML(): string {
  const items = [
    { icon: 'fa-arrow-trend-up', color: 'emerald', text: 'Campaign "Summer Sale" scaled +10% — ROAS 4.2x', time: '2m ago' },
    { icon: 'fa-triangle-exclamation', color: 'amber', text: 'Budget warning: Google Ads at 85% daily limit', time: '15m ago' },
    { icon: 'fa-scissors', color: 'red', text: '3 creatives paused — CTR below threshold (0.8%)', time: '32m ago' },
    { icon: 'fa-sparkles', color: 'purple', text: 'AI generated 6 new video creatives ready for review', time: '1h ago' },
    { icon: 'fa-users', color: 'blue', text: 'New lookalike audience built: 2.3M potential reach', time: '2h ago' },
  ]
  return items.map(i => `
    <div class="flex items-start gap-3 p-3 glass rounded-lg hover:bg-white/5 cursor-pointer transition-all">
      <div class="w-8 h-8 rounded-lg bg-${i.color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <i class="fas ${i.icon} text-${i.color}-400 text-xs"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-300 leading-relaxed">${i.text}</p>
        <p class="text-xs text-slate-600 mt-1">${i.time}</p>
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
    <div class="text-xs text-slate-500">${sub}</div>
  </div>`
}

function aiLogEntry(text: string, color: string, time: string): string {
  return `<div class="flex items-start gap-2 py-1.5 border-b border-white/5">
    <div class="w-1.5 h-1.5 rounded-full bg-${color}-400 mt-1.5 flex-shrink-0"></div>
    <p class="flex-1 text-slate-400">${text}</p>
    <span class="text-slate-600 flex-shrink-0">${time}</span>
  </div>`
}

function tenantItem(name: string, abbr: string, gradient: string, active: boolean): string {
  return `<button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all ${active ? 'bg-brand-500/10' : ''}">
    <div class="w-7 h-7 rounded-md bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white">${abbr}</div>
    <span class="text-sm text-slate-300 font-medium">${name}</span>
    ${active ? '<i class="fas fa-check text-brand-400 text-xs ml-auto"></i>' : ''}
  </button>`
}
