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
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,300;1,14..32,400&display=swap" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js" defer></script>
  <script>
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
            'liquid': 'liquidShift 8s ease-in-out infinite',
            'shimmer': 'shimmer 2.5s linear infinite',
            'prism': 'prismShift 6s ease-in-out infinite',
          },
          keyframes: {
            float: { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-10px)'} },
            liquidShift: {
              '0%,100%': {borderRadius:'60% 40% 30% 70% / 60% 30% 70% 40%'},
              '33%': {borderRadius:'30% 60% 70% 40% / 50% 60% 30% 60%'},
              '66%': {borderRadius:'50% 50% 40% 60% / 40% 70% 50% 50%'},
            },
            shimmer: {
              '0%': {backgroundPosition:'-500px 0'},
              '100%': {backgroundPosition:'500px 0'},
            },
            prismShift: {
              '0%,100%': {filter:'hue-rotate(0deg)'},
              '50%': {filter:'hue-rotate(30deg)'},
            }
          }
        }
      }
    }
  </script>
  <style>
    /* ══════════════════════════════════════════════════
       LIQUID GLASS DESIGN SYSTEM
       Verre liquide · Réfraction · Profondeur · Prisme
    ══════════════════════════════════════════════════ */

    /* ── Base & Scrollbar ── */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.6); }

    /* ── Body ── */
    .dark body {
      background: #03050d;
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      background-image:
        radial-gradient(ellipse 80% 50% at 20% 10%, rgba(99,102,241,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.10) 0%, transparent 55%),
        radial-gradient(ellipse 50% 30% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%);
      min-height: 100vh;
    }
    .light body {
      background: #f0f4ff;
      color: #0f172a;
      font-family: 'Inter', sans-serif;
      background-image:
        radial-gradient(ellipse 80% 50% at 20% 10%, rgba(99,102,241,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.08) 0%, transparent 55%);
    }

    /* ══ LIQUID GLASS CORE ══ */

    /* --- Main glass layer --- */
    .dark .glass {
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.055) 0%,
        rgba(255,255,255,0.018) 50%,
        rgba(255,255,255,0.035) 100%
      );
      backdrop-filter: blur(20px) saturate(1.8);
      -webkit-backdrop-filter: blur(20px) saturate(1.8);
      border: 1px solid rgba(255,255,255,0.10);
      border-top-color: rgba(255,255,255,0.20);
      border-left-color: rgba(255,255,255,0.15);
      box-shadow:
        0 8px 32px rgba(0,0,0,0.35),
        0 2px 8px rgba(0,0,0,0.20),
        inset 0 1px 0 rgba(255,255,255,0.12),
        inset 0 -1px 0 rgba(0,0,0,0.15);
      position: relative;
      isolation: isolate;
    }

    .light .glass {
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.88) 0%,
        rgba(255,255,255,0.65) 50%,
        rgba(255,255,255,0.78) 100%
      );
      backdrop-filter: blur(20px) saturate(1.6);
      -webkit-backdrop-filter: blur(20px) saturate(1.6);
      border: 1px solid rgba(255,255,255,0.90);
      border-top-color: rgba(255,255,255,1);
      box-shadow:
        0 8px 32px rgba(99,102,241,0.08),
        0 2px 8px rgba(0,0,0,0.06),
        inset 0 1px 0 rgba(255,255,255,0.95),
        inset 0 -1px 0 rgba(0,0,0,0.04);
    }

    /* --- Prism highlight (top edge rainbow) --- */
    .dark .glass::before {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(139,92,246,0.6) 20%,
        rgba(99,102,241,0.8) 35%,
        rgba(59,130,246,0.6) 50%,
        rgba(16,185,129,0.5) 65%,
        rgba(99,102,241,0.4) 80%,
        transparent 100%
      );
      border-radius: 0 0 50% 50%;
      filter: blur(0.5px);
      pointer-events: none;
      z-index: 1;
    }

    /* --- Inner liquid shimmer --- */
    .dark .glass::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        transparent 40%,
        rgba(255,255,255,0.03) 50%,
        transparent 60%
      );
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
    }

    /* --- Sidebar glass (deeper) --- */
    .dark .sidebar-bg {
      background: linear-gradient(
        180deg,
        rgba(5,8,20,0.97) 0%,
        rgba(8,12,28,0.95) 100%
      );
      backdrop-filter: blur(40px) saturate(1.5);
      border-color: rgba(99,102,241,0.12);
      box-shadow:
        inset -1px 0 0 rgba(255,255,255,0.05),
        4px 0 40px rgba(0,0,0,0.5);
    }
    .light .sidebar-bg {
      background: rgba(255,255,255,0.96);
      backdrop-filter: blur(40px);
      border-color: rgba(0,0,0,0.07);
    }

    /* --- Topbar glass --- */
    .dark .topbar-bg {
      background: linear-gradient(
        90deg,
        rgba(3,5,13,0.92) 0%,
        rgba(5,8,20,0.88) 100%
      );
      backdrop-filter: blur(30px) saturate(1.6);
      border-color: rgba(99,102,241,0.10);
      box-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4);
    }
    .light .topbar-bg {
      background: rgba(255,255,255,0.94);
      backdrop-filter: blur(30px);
      border-color: rgba(0,0,0,0.07);
      box-shadow: 0 1px 0 rgba(255,255,255,1), 0 4px 16px rgba(0,0,0,0.06);
    }

    /* --- Hover glass effect --- */
    .dark .glass:hover {
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.08) 0%,
        rgba(255,255,255,0.03) 50%,
        rgba(255,255,255,0.06) 100%
      );
      border-color: rgba(99,102,241,0.25);
      box-shadow:
        0 12px 40px rgba(0,0,0,0.4),
        0 4px 12px rgba(99,102,241,0.08),
        inset 0 1px 0 rgba(255,255,255,0.18),
        inset 0 -1px 0 rgba(0,0,0,0.12);
      transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    }

    /* ══ CARD HOVER — Liquid lift ══ */
    .card-hover {
      transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
      will-change: transform, box-shadow;
    }
    .dark .card-hover:hover {
      transform: translateY(-3px) scale(1.005);
      box-shadow:
        0 24px 48px rgba(0,0,0,0.45),
        0 8px 16px rgba(99,102,241,0.12),
        inset 0 1px 0 rgba(255,255,255,0.22);
    }
    .light .card-hover:hover {
      transform: translateY(-3px) scale(1.005);
      box-shadow:
        0 20px 40px rgba(99,102,241,0.12),
        0 4px 12px rgba(0,0,0,0.06);
    }

    /* ══ SIDEBAR LINKS ══ */
    .sidebar-link {
      transition: all 0.2s cubic-bezier(0.23,1,0.32,1);
      border-${isRTL ? 'right' : 'left'}: 2px solid transparent;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
    }
    .dark .sidebar-link::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(99,102,241,0.04));
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .dark .sidebar-link:hover::before, .dark .sidebar-link.active::before { opacity: 1; }
    .dark .sidebar-link:hover, .dark .sidebar-link.active {
      background: rgba(99,102,241,0.12);
      border-${isRTL ? 'right' : 'left'}-color: #6366f1;
      color: #a5b4fc;
      box-shadow: inset 0 0 20px rgba(99,102,241,0.06);
    }
    .dark .sidebar-link.active {
      background: linear-gradient(90deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08));
      color: #c7d2fe;
    }
    .light .sidebar-link:hover, .light .sidebar-link.active {
      background: rgba(99,102,241,0.08);
      border-${isRTL ? 'right' : 'left'}-color: #6366f1;
      color: #4f46e5;
    }
    .light .sidebar-link.active { background: rgba(99,102,241,0.12); color: #4338ca; }

    /* ══ BADGE STYLES — Liquid tint ══ */
    .badge-live {
      background: linear-gradient(135deg, rgba(16,185,129,0.18), rgba(52,211,153,0.10));
      color: #34d399;
      border: 1px solid rgba(52,211,153,0.30);
      box-shadow: 0 0 12px rgba(52,211,153,0.12), inset 0 1px 0 rgba(255,255,255,0.08);
    }
    .badge-paused {
      background: linear-gradient(135deg, rgba(245,158,11,0.18), rgba(251,191,36,0.10));
      color: #fbbf24;
      border: 1px solid rgba(251,191,36,0.28);
      box-shadow: 0 0 12px rgba(251,191,36,0.10), inset 0 1px 0 rgba(255,255,255,0.08);
    }
    .badge-draft {
      background: linear-gradient(135deg, rgba(148,163,184,0.15), rgba(203,213,225,0.08));
      color: #94a3b8;
      border: 1px solid rgba(148,163,184,0.25);
    }
    .badge-killed {
      background: linear-gradient(135deg, rgba(239,68,68,0.18), rgba(248,113,113,0.10));
      color: #f87171;
      border: 1px solid rgba(248,113,113,0.28);
      box-shadow: 0 0 12px rgba(239,68,68,0.10), inset 0 1px 0 rgba(255,255,255,0.06);
    }
    .badge-scaling {
      background: linear-gradient(135deg, rgba(99,102,241,0.20), rgba(139,92,246,0.12));
      color: #a5b4fc;
      border: 1px solid rgba(99,102,241,0.32);
      box-shadow: 0 0 12px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.08);
    }

    /* ══ PROGRESS BAR — Liquid fill ══ */
    .progress-bar {
      height: 3px;
      border-radius: 4px;
      background: rgba(255,255,255,0.05);
      overflow: visible;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 1s cubic-bezier(0.23,1,0.32,1);
      position: relative;
    }
    .progress-fill::after {
      content: '';
      position: absolute;
      right: -1px; top: -1px;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: inherit;
      box-shadow: 0 0 8px currentColor;
    }

    /* ══ GRADIENT TEXT ══ */
    .gradient-text {
      background: linear-gradient(135deg, #818cf8, #a78bfa, #f472b6, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% auto;
      animation: textShimmer 4s linear infinite;
    }
    @keyframes textShimmer {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }

    /* ══ NEON BORDER ══ */
    .neon-border {
      border: 1px solid rgba(99,102,241,0.4);
      box-shadow:
        0 0 20px rgba(99,102,241,0.15),
        0 0 40px rgba(99,102,241,0.06),
        inset 0 0 20px rgba(99,102,241,0.03);
    }

    /* ══ ANIMATIONS ══ */
    .animate-fadeIn { animation: fadeIn 0.45s cubic-bezier(0.23,1,0.32,1); }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px) scale(0.99); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
    .blink { animation: blink 2s ease infinite; }

    /* ══ PLATFORM ICONS ══ */
    .platform-fb { background: linear-gradient(135deg,#1877f2,#0d5dbf); }
    .platform-ig { background: linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4); }
    .platform-tt { background: linear-gradient(135deg,#010101,#ff0050,#00f2ea); }
    .platform-sc { background: linear-gradient(135deg,#fffc00,#f5c400); }
    .platform-gl { background: linear-gradient(135deg,#4285f4,#34a853,#fbbc05,#ea4335); }
    .platform-pi { background: linear-gradient(135deg,#e60023,#ad081b); }
    .platform-tw { background: linear-gradient(135deg,#000000,#14171a); }
    .platform-li { background: linear-gradient(135deg,#0077b5,#005885); }
    .platform-yt { background: linear-gradient(135deg,#ff0000,#cc0000); }

    /* ══ TABLE ROWS ══ */
    .dark .table-row { transition: all 0.2s ease; }
    .dark .table-row:hover {
      background: linear-gradient(90deg, rgba(99,102,241,0.05), rgba(139,92,246,0.03), transparent);
      box-shadow: inset 0 0 0 1px rgba(99,102,241,0.08);
    }
    .light .table-row:hover { background: rgba(99,102,241,0.04); }

    /* ══ LIGHT MODE OVERRIDES ══ */
    .light .text-slate-200 { color: #1e293b !important; }
    .light .text-slate-300 { color: #334155 !important; }
    .light .text-slate-400 { color: #475569 !important; }
    .light .text-slate-500 { color: #64748b !important; }
    .light .text-slate-600 { color: #94a3b8 !important; }
    .light .text-white { color: #0f172a !important; }

    /* ══ LIQUID ICON BUTTONS ══ */
    .icon-btn {
      position: relative;
      overflow: hidden;
      transition: all 0.25s cubic-bezier(0.23,1,0.32,1);
    }
    .icon-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%);
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .icon-btn:hover::after { opacity: 1; }
    .icon-btn:active { transform: scale(0.95); }

    /* ══ MODAL BACKDROP ══ */
    .modal-backdrop {
      background: rgba(0,0,0,0.65);
      backdrop-filter: blur(8px) saturate(0.8);
    }

    /* ══ INPUT FIELDS — Liquid style ══ */
    .dark input, .dark select, .dark textarea {
      color-scheme: dark;
    }
    .dark input:focus, .dark select:focus, .dark textarea:focus {
      outline: none;
      border-color: rgba(99,102,241,0.5) !important;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.10), inset 0 1px 0 rgba(255,255,255,0.05);
    }

    /* ══ TOOLTIP ══ */
    .tooltip { position: relative; }
    .tooltip-text {
      position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
      background: rgba(15,23,42,0.95); backdrop-filter: blur(12px);
      color: #e2e8f0; font-size: 11px; white-space: nowrap;
      padding: 5px 10px; border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.10);
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      opacity: 0; pointer-events: none; transition: opacity 0.2s;
    }
    .tooltip:hover .tooltip-text { opacity: 1; }

    /* ══ MOBILE ══ */
    @media (max-width: 768px) {
      .sidebar-desktop { transform: translateX(${isRTL ? '100%' : '-100%'}); transition: transform 0.35s cubic-bezier(0.23,1,0.32,1); }
      .sidebar-desktop.open { transform: translateX(0); }
      .main-content { margin-${isRTL ? 'right' : 'left'}: 0 !important; }
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
      z-index: 35;
    }
    .sidebar-overlay.show { display: block; }
    .theme-toggle { transition: all 0.3s ease; }
    .theme-toggle:hover { transform: rotate(20deg) scale(1.1); }

    /* ══ SHIMMER LOADING ══ */
    .shimmer-load {
      background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%);
      background-size: 500px 100%;
      animation: shimmer 2s linear infinite;
    }
    @keyframes shimmer {
      0% { background-position: -500px 0; }
      100% { background-position: 500px 0; }
    }

    /* ══ LIQUID GLOW on brand elements ══ */
    .liquid-glow {
      box-shadow:
        0 0 24px rgba(99,102,241,0.30),
        0 0 48px rgba(99,102,241,0.12),
        0 0 80px rgba(99,102,241,0.06);
    }

    /* ══ FROSTED PANEL (deeper blur) ══ */
    .dark .frosted {
      background: rgba(3,5,13,0.80);
      backdrop-filter: blur(40px) saturate(1.8);
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08);
    }

    /* ══ AI Engine pulsing orb ══ */
    @keyframes orbPulse {
      0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
      50% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(99,102,241,0); }
    }
    .orb-pulse { animation: orbPulse 3s ease infinite; }
  </style>
</head>
<body class="text-slate-200 min-h-screen flex">

  <!-- Mobile overlay -->
  <div class="sidebar-overlay" id="sidebar-overlay" onclick="closeSidebar()"></div>

  <!-- Sidebar -->
  <aside id="main-sidebar" class="sidebar-desktop sidebar-bg w-64 min-h-screen border-r flex flex-col fixed ${isRTL ? 'right-0' : 'left-0'} top-0 z-40" style="border-color:rgba(99,102,241,0.10);">
    <!-- Logo -->
    <div class="p-5 border-b" style="border-color:rgba(255,255,255,0.05);">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg liquid-glow flex-shrink-0 orb-pulse">
          <i class="fas fa-bolt text-white"></i>
        </div>
        <div>
          <div class="font-black text-white text-base tracking-tight">${BRAND.name}</div>
          <div class="text-xs" style="color:rgba(148,163,184,0.6);">${BRAND.tagline}</div>
        </div>
      </div>
    </div>

    <!-- Tenant Selector -->
    <div class="px-4 py-3 border-b" style="border-color:rgba(255,255,255,0.04);">
      <button onclick="toggleTenantMenu()" id="tenant-btn" class="w-full glass rounded-xl px-3 py-2 flex items-center gap-2 text-sm transition-all">
        <div class="w-6 h-6 rounded-md bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0" id="tenant-abbr">A</div>
        <span class="flex-1 text-left text-slate-300 font-medium truncate" id="tenant-name">Acme Corp</span>
        <i class="fas fa-chevron-down text-slate-600 text-xs"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">
      <div class="text-xs font-semibold uppercase tracking-widest px-3 py-2" style="color:rgba(99,102,241,0.5);">${t(lang, 'overview')}</div>
      ${navLink('/dashboard', 'fa-chart-line', t(lang, 'dashboard'), activePage)}
      ${navLink('/campaigns', 'fa-bullhorn', t(lang, 'campaigns'), activePage)}
      ${navLink('/creatives', 'fa-wand-magic-sparkles', t(lang, 'creatives'), activePage)}
      ${navLink('/analytics', 'fa-chart-bar', t(lang, 'analytics'), activePage)}
      <div class="text-xs font-semibold uppercase tracking-widest px-3 py-2 mt-3" style="color:rgba(99,102,241,0.5);">${t(lang, 'ai_engine')} & ${t(lang, 'automation')}</div>
      ${navLink('/ai-engine', 'fa-brain', t(lang, 'ai_engine'), activePage)}
      ${navLink('/automation', 'fa-gears', t(lang, 'automation'), activePage)}
      ${navLink('/audiences', 'fa-users', t(lang, 'audiences'), activePage)}
      <div class="text-xs font-semibold uppercase tracking-widest px-3 py-2 mt-3" style="color:rgba(99,102,241,0.5);">${t(lang, 'settings')}</div>
      ${navLink('/platforms', 'fa-plug', t(lang, 'platforms'), activePage)}
      ${navLink('/billing', 'fa-credit-card', t(lang, 'billing'), activePage)}
      ${navLink('/settings', 'fa-gear', t(lang, 'settings'), activePage)}
    </nav>

    <!-- AI Status -->
    <div class="p-4 border-t" style="border-color:rgba(255,255,255,0.04);">
      <div class="glass rounded-xl p-3" style="background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.05));border-color:rgba(99,102,241,0.18);">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-2 h-2 rounded-full bg-emerald-400 blink flex-shrink-0" style="box-shadow:0 0 6px #34d399;"></div>
          <span class="text-xs font-bold" style="color:#6ee7b7;letter-spacing:0.08em;">AI ENGINE ACTIF</span>
        </div>
        <div class="text-xs text-slate-500" id="ai-status-text">${t(lang, 'active_campaigns')}: 47</div>
        <div class="progress-bar mt-2">
          <div class="progress-fill bg-gradient-to-r from-brand-500 to-purple-500" style="width:73%" id="ai-progress"></div>
        </div>
      </div>
    </div>

    <!-- Super Admin Quick Access -->
    <div class="px-4 pb-2">
      <a href="/admin/login" class="flex items-center gap-2 px-3 py-2 rounded-xl transition-all group" style="border:1px solid rgba(249,115,22,0.12);background:rgba(249,115,22,0.04);">
        <div class="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style="background:rgba(249,115,22,0.15);">
          <i class="fas fa-shield-halved text-xs" style="color:#fb923c;"></i>
        </div>
        <span class="text-xs font-medium transition-colors" style="color:rgba(148,163,184,0.6);">Super Admin</span>
        <i class="fas fa-external-link text-xs ml-auto" style="color:rgba(249,115,22,0.4);"></i>
      </a>
    </div>

    <!-- User Profile -->
    <div class="p-4 border-t" style="border-color:rgba(255,255,255,0.04);">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0" id="user-avatar">JD</div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-white truncate" id="user-name">John Doe</div>
          <div class="text-xs truncate" style="color:rgba(148,163,184,0.5);" id="user-email">john@acmecorp.com</div>
        </div>
        <button onclick="handleLogout()" class="transition-colors" style="color:rgba(148,163,184,0.4);" title="${t(lang, 'logout')}">
          <i class="fas fa-right-from-bracket text-sm"></i>
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="main-content ${isRTL ? 'mr-64' : 'ml-64'} flex-1 flex flex-col min-h-screen">
    <!-- Top Bar -->
    <header class="h-14 topbar-bg border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30" style="border-color:rgba(255,255,255,0.05);">
      <div class="flex items-center gap-3">
        <button class="md:hidden glass rounded-lg w-8 h-8 flex items-center justify-center transition-all icon-btn" onclick="openSidebar()">
          <i class="fas fa-bars text-slate-400 text-sm"></i>
        </button>
        <h1 class="text-sm font-bold text-white">${title}</h1>
      </div>
      <div class="flex items-center gap-2">
        <div class="hidden sm:block">
          ${langSelectorHTML(lang)}
        </div>
        <button id="theme-toggle" onclick="toggleTheme()" class="theme-toggle glass rounded-lg w-8 h-8 flex items-center justify-center transition-all icon-btn" title="${t(lang, 'dark_mode')} / ${t(lang, 'light_mode')}">
          <i id="theme-icon" class="fas fa-moon text-slate-400 text-xs"></i>
        </button>
        <button class="hidden sm:flex glass rounded-xl px-3 py-1.5 text-xs items-center gap-2 transition-all" onclick="showAIStatus()" style="border-color:rgba(99,102,241,0.15);">
          <i class="fas fa-robot text-brand-400 text-xs"></i>
          <span class="text-slate-300">AI</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 blink" style="box-shadow:0 0 4px #34d399;"></span>
        </button>
        <button class="glass rounded-lg w-8 h-8 flex items-center justify-center transition-all relative icon-btn" onclick="toggleNotifications()" id="notif-btn">
          <i class="fas fa-bell text-slate-400 text-xs"></i>
          <span class="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500" style="border:1.5px solid #03050d;box-shadow:0 0 6px rgba(239,68,68,0.6);" id="notif-badge"></span>
        </button>
        <a href="/campaigns" class="bg-gradient-to-r from-brand-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all" style="box-shadow:0 4px 14px rgba(99,102,241,0.3);">
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
  <div id="notifications-panel" class="hidden fixed ${isRTL ? 'left-0' : 'right-0'} top-14 w-80 md:w-96 glass frosted shadow-2xl z-50 rounded-bl-2xl max-h-[80vh] overflow-y-auto animate-fadeIn">
    <div class="p-4 border-b flex items-center justify-between" style="border-color:rgba(255,255,255,0.06);">
      <h3 class="font-bold text-white text-sm">${t(lang, 'notifications')}</h3>
      <div class="flex items-center gap-2">
        <button onclick="markAllRead()" class="text-xs text-brand-400 hover:text-brand-300 transition-colors">✓ All read</button>
        <button onclick="toggleNotifications()" class="text-slate-500 hover:text-slate-300 ml-2 transition-colors"><i class="fas fa-times text-xs"></i></button>
      </div>
    </div>
    <div class="p-3 space-y-2" id="notif-list">
      ${notificationsHTML()}
    </div>
  </div>

  <!-- AI Status Modal -->
  <div id="ai-status-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onclick="closeAIStatus(event)">
    <div class="glass frosted neon-border rounded-2xl w-full max-w-2xl p-6 animate-fadeIn" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0 liquid-glow">
            <i class="fas fa-brain text-white text-sm"></i>
          </div>
          <div>
            <h3 class="font-bold text-white">AI Engine Status</h3>
            <p class="text-xs text-emerald-400">All systems operational</p>
          </div>
        </div>
        <button onclick="closeAIStatus()" class="text-slate-500 hover:text-slate-300 transition-colors icon-btn w-7 h-7 glass rounded-lg flex items-center justify-center"><i class="fas fa-times text-xs"></i></button>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-5">
        ${aiStatusCard('Campaign Optimizer', '94.2%', 'accuracy', 'fa-chart-line', 'brand')}
        ${aiStatusCard('Creative Generator', 'Active', 'generating 3 creatives', 'fa-wand-magic-sparkles', 'purple')}
        ${aiStatusCard('Budget Allocator', '$12,450', 'managed today', 'fa-dollar-sign', 'emerald')}
        ${aiStatusCard('Audience Predictor', '87.6%', 'CTR prediction accuracy', 'fa-bullseye', 'amber')}
      </div>
      <div class="glass rounded-xl p-4" style="background:rgba(99,102,241,0.04);border-color:rgba(99,102,241,0.12);">
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
  <div id="tenant-menu" class="hidden fixed ${isRTL ? 'right-4' : 'left-4'} z-50 animate-fadeIn" style="top: 88px;">
    <div class="w-60 glass frosted rounded-xl shadow-2xl">
      <div class="p-3 border-b" style="border-color:rgba(255,255,255,0.06);">
        <div class="text-xs font-semibold uppercase tracking-widest" style="color:rgba(99,102,241,0.6);">${t(lang, 'workspace')}</div>
      </div>
      <div class="p-2 space-y-1">
        <button onclick="switchTenant('Acme Corp','A','from-brand-500 to-purple-600')" class="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all" style="background:rgba(99,102,241,0.10);border:1px solid rgba(99,102,241,0.15);">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">A</div>
          <span class="text-sm text-slate-300 font-medium">Acme Corp</span>
          <i class="fas fa-check text-brand-400 text-xs ml-auto"></i>
        </button>
        <button onclick="switchTenant('TechStart Inc','T','from-emerald-500 to-teal-600')" class="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white">T</div>
          <span class="text-sm text-slate-300 font-medium">TechStart Inc</span>
        </button>
        <button onclick="switchTenant('Fashion Brand','F','from-pink-500 to-rose-600')" class="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xs font-bold text-white">F</div>
          <span class="text-sm text-slate-300 font-medium">Fashion Brand</span>
        </button>
        <div class="border-t pt-2 mt-2" style="border-color:rgba(255,255,255,0.06);">
          <button class="w-full text-left px-3 py-2 text-xs text-brand-400 hover:text-brand-300 flex items-center gap-2 rounded-xl hover:bg-white/5 transition-all">
            <i class="fas fa-plus"></i> ${t(lang, 'workspace')} +
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
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

    function applyTheme(theme) {
      const html = document.documentElement;
      const icon = document.getElementById('theme-icon');
      if (theme === 'light') {
        html.classList.remove('dark'); html.classList.add('light');
        if (icon) icon.className = 'fas fa-sun text-amber-400 text-xs';
      } else {
        html.classList.remove('light'); html.classList.add('dark');
        if (icon) icon.className = 'fas fa-moon text-slate-400 text-xs';
      }
      if (typeof window.updateChartsTheme === 'function') window.updateChartsTheme(theme);
    }
    function toggleTheme() {
      const current = localStorage.getItem('adnova_theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('adnova_theme', next);
      applyTheme(next);
    }
    (function() { applyTheme(localStorage.getItem('adnova_theme') || 'dark'); })();

    function handleLogout() {
      if (confirm('${t(lang, 'logout')} ?')) {
        localStorage.removeItem('adnova_token');
        localStorage.removeItem('adnova_user');
        fetch('/api/auth/logout', { method: 'POST' }).catch(()=>{});
        window.location.href = '/login';
      }
    }

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
    function showAIStatus() { document.getElementById('ai-status-modal').classList.remove('hidden'); }
    function closeAIStatus(e) {
      if (!e || e.target === document.getElementById('ai-status-modal')) {
        document.getElementById('ai-status-modal').classList.add('hidden');
      }
    }
    function toggleTenantMenu() { document.getElementById('tenant-menu').classList.toggle('hidden'); }
    function switchTenant(name, abbr, gradient) {
      document.getElementById('tenant-name').textContent = name;
      document.getElementById('tenant-abbr').textContent = abbr;
      document.getElementById('tenant-menu').classList.add('hidden');
      try {
        const u = JSON.parse(localStorage.getItem('adnova_user') || '{}');
        u.company = name; localStorage.setItem('adnova_user', JSON.stringify(u));
      } catch(e){}
    }
    function openSidebar() {
      document.getElementById('main-sidebar').classList.add('open');
      document.getElementById('sidebar-overlay').classList.add('show');
    }
    function closeSidebar() {
      document.getElementById('main-sidebar').classList.remove('open');
      document.getElementById('sidebar-overlay').classList.remove('show');
    }
    document.addEventListener('click', function(e) {
      const tMenu = document.getElementById('tenant-menu');
      const tBtn = document.getElementById('tenant-btn');
      if (tMenu && !tMenu.classList.contains('hidden') && !tMenu.contains(e.target) && !tBtn.contains(e.target)) tMenu.classList.add('hidden');
      const nPanel = document.getElementById('notifications-panel');
      const nBtn = document.getElementById('notif-btn');
      if (nPanel && !nPanel.classList.contains('hidden') && !nPanel.contains(e.target) && !nBtn.contains(e.target)) nPanel.classList.add('hidden');
    });
    setInterval(() => { if (typeof window.refreshMetrics === 'function') window.refreshMetrics(); }, 30000);
  </script>
</body>
</html>`
}

function navLink(href: string, icon: string, label: string, active: string): string {
  const isActive = active === href
  const badges: Record<string, string> = {
    '/campaigns': '<span class="ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold" style="background:rgba(99,102,241,0.18);color:#a5b4fc;">47</span>',
    '/ai-engine': '<span class="ml-auto text-xs px-1.5 py-0.5 rounded-full blink font-semibold" style="background:rgba(52,211,153,0.15);color:#6ee7b7;">Live</span>',
  }
  return `<a href="${href}" class="sidebar-link ${isActive ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500">
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
    <div class="flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/5 cursor-pointer transition-all card-hover">
      <div class="w-7 h-7 rounded-xl bg-${i.color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5" style="box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);">
        <i class="fas ${i.icon} text-${i.color}-400 text-xs"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-300 leading-relaxed">${i.text}</p>
        <p class="text-xs mt-0.5" style="color:rgba(148,163,184,0.4);">${i.time}</p>
      </div>
    </div>`).join('')
}

function aiStatusCard(title: string, value: string, sub: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-4 card-hover">
    <div class="flex items-center gap-2 mb-2">
      <i class="fas ${icon} text-${color}-400 text-sm"></i>
      <span class="text-xs text-slate-500">${title}</span>
    </div>
    <div class="text-xl font-bold text-white">${value}</div>
    <div class="text-xs text-slate-500 mt-0.5">${sub}</div>
  </div>`
}

function aiLogEntry(text: string, color: string, time: string): string {
  return `<div class="flex items-start gap-2 py-1.5 border-b" style="border-color:rgba(255,255,255,0.04);">
    <div class="w-1.5 h-1.5 rounded-full bg-${color}-400 mt-1.5 flex-shrink-0" style="box-shadow:0 0 6px currentColor;"></div>
    <p class="flex-1 text-slate-400 text-xs">${text}</p>
    <span class="text-xs flex-shrink-0" style="color:rgba(148,163,184,0.35);">${time}</span>
  </div>`
}
