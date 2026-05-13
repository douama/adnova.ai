// ─── Admin shell — wraps the 9 admin sub-pages with sidebar + topbar ──────
//
// 2026-05-13: rewritten to match the landing page design system + the
// standalone admin dashboard (/admin):
//   • Geist + Fraunces fonts (no Inter)
//   • #08080F background + #FF4D00 orange accent (no amber/red gradients)
//   • Same sidebar layout as the standalone /admin dashboard, so the user
//     sees a single coherent admin experience when navigating menu items.
//   • Tailwind CDN kept (sub-pages use utility classes heavily) but `brand-*`
//     and `orange-*` colors remapped to the #FF4D00 signal-orange ramp.
//   • Font Awesome kept (sub-pages use fa-* icons extensively).
//   • Light theme dropped — the landing has one identity, admin matches.

import { themeBaseCss, themeFontLinks, themeMeta } from '../lib/theme'

export function adminShell(title: string, content: string, activePage: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${themeMeta({ title: `${title} · Super Admin`, description: 'AdNova Super Admin console.', path: activePage || '/admin' })}
${themeFontLinks()}
<script>(function(){var t=localStorage.getItem('adnova_admin_theme')||'dark';document.documentElement.classList.add(t==='light'?'light':'dark')})();</script>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin/>
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/></noscript>
<script>window.tailwind={config:{darkMode:'class',theme:{extend:{fontFamily:{sans:['Geist','system-ui','sans-serif']},colors:{brand:{50:'#FFF4ED',100:'#FFE6D5',200:'#FFCBA8',300:'#FFA876',400:'#FF8042',500:'#FF4D00',600:'#E64500',700:'#B83700',800:'#8A2A00',900:'#5C1C00'},orange:{50:'#FFF4ED',100:'#FFE6D5',200:'#FFCBA8',300:'#FFA876',400:'#FF8042',500:'#FF4D00',600:'#E64500',700:'#B83700',800:'#8A2A00',900:'#5C1C00'}}}}}}</script>
<script src="https://cdn.tailwindcss.com" defer></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js" defer></script>
<style>
${themeBaseCss()}

/* ── Shell layout (sidebar + topbar + content) ─────────────────── */
body{display:flex;min-height:100vh;color:var(--white)}

/* ── Sidebar (matches tenant /dashboard sidebar pattern) ───────── */
.admin-sidebar{width:264px;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border);padding:18px 14px;position:sticky;top:0;height:100vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px;z-index:40}

/* Header: logo block (bolt icon + brand + tagline) */
.admin-sidebar-head{display:flex;align-items:center;gap:11px;padding:4px 6px 12px;border-bottom:1px solid var(--border)}
.admin-sidebar-mark{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--orange),var(--orange2));display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 18px rgba(255,77,0,0.30);animation:orbPulse 3s ease infinite}
.admin-sidebar-mark i{color:#fff;font-size:14px}
.admin-sidebar-head-text{min-width:0;line-height:1.15}
.admin-sidebar-head-text .brand{font-weight:800;font-size:22px;color:var(--white);letter-spacing:-0.03em;display:block;line-height:1}
.admin-sidebar-head-text .brand span{color:var(--orange)}
.admin-sidebar-tag{font-size:11px;color:var(--muted2);letter-spacing:-0.005em;font-weight:500}

/* Workspace selector (tenant-style chip) */
.admin-workspace{padding:9px 11px;border-radius:11px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;gap:10px;cursor:default;transition:border-color 0.15s}
.admin-workspace:hover{border-color:var(--border2)}
.admin-workspace .sf-avatar{width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.admin-workspace .sf-name{flex:1;font-weight:600;color:var(--white);font-size:13px;letter-spacing:-0.01em;text-align:left;min-width:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}
.admin-workspace .sf-status{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);flex-shrink:0}

/* Nav sections */
.admin-nav-group{display:flex;flex-direction:column;gap:2px}
.admin-nav-section{font-size:11px;color:var(--orange);text-transform:uppercase;letter-spacing:0.14em;padding:14px 12px 8px;font-weight:700}
.admin-nav-section:first-child{padding-top:2px}

/* Nav links — wider hit area, orange active state with left accent */
.admin-nav-link{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;color:var(--muted2);font-size:13px;font-weight:500;transition:background 0.15s,color 0.15s;letter-spacing:-0.005em;text-decoration:none;position:relative;border:1px solid transparent}
.admin-nav-link:hover{color:var(--white);background:rgba(255,255,255,0.03)}
.admin-nav-link.active{background:linear-gradient(90deg,rgba(255,77,0,0.14),rgba(255,77,0,0.04));color:var(--white);border-color:rgba(255,77,0,0.20);box-shadow:inset 0 0 18px rgba(255,77,0,0.05)}
.admin-nav-link.active::before{content:'';position:absolute;left:-1px;top:7px;bottom:7px;width:2px;background:var(--orange);border-radius:2px;box-shadow:0 0 8px rgba(255,77,0,0.6)}
.admin-nav-link i{width:16px;height:16px;font-size:13px;text-align:center;flex-shrink:0;color:var(--muted);transition:color 0.15s}
.admin-nav-link:hover i{color:var(--text)}
.admin-nav-link.active i{color:var(--orange)}
.admin-nav-link span:first-of-type{flex:1;min-width:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}
.admin-nav-badge{margin-left:auto;font-size:10px;padding:2px 8px;border-radius:100px;background:rgba(255,77,0,0.18);color:var(--orange2);font-weight:700;letter-spacing:0.02em;flex-shrink:0}
.admin-nav-dot{margin-left:auto;width:7px;height:7px;border-radius:50%;background:#7A7A7A;box-shadow:0 0 8px rgba(122,122,122,0.7);animation:adot 2s infinite;flex-shrink:0}
@keyframes adot{0%,100%{opacity:1}50%{opacity:0.4}}

/* Bottom system status panel */
.admin-sidebar-status{margin-top:auto;padding:12px 13px;border-radius:11px;background:linear-gradient(135deg,rgba(255,77,0,0.08),rgba(255,107,43,0.04));border:1px solid rgba(255,77,0,0.18)}
.admin-sidebar-status-head{display:flex;align-items:center;gap:7px;margin-bottom:6px}
.admin-sidebar-status-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:blink 1.8s ease infinite;flex-shrink:0}
.admin-sidebar-status-label{font-size:11px;font-weight:700;color:var(--green);letter-spacing:0.10em;text-transform:uppercase}
.admin-sidebar-status-text{font-size:11px;color:var(--muted2);letter-spacing:-0.005em}
.admin-sidebar-status .progress-bar{margin-top:8px;height:3px}

/* Footer link (logout / back) */
.admin-sidebar-foot{padding-top:4px}
.admin-sidebar-foot a{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;font-size:12px;color:var(--muted);transition:all 0.15s;border:1px solid transparent}
.admin-sidebar-foot a:hover{color:var(--white);background:rgba(255,255,255,0.03);border-color:var(--border)}
.admin-sidebar-foot a i{font-size:11px;width:14px;text-align:center;flex-shrink:0}
.admin-sidebar-foot a .ext{margin-left:auto;font-size:10px;color:var(--muted)}

/* ── Main + topbar ─────────────────────────────────────────────── */
.admin-main{flex:1;display:flex;flex-direction:column;min-width:0}
.admin-topbar{position:sticky;top:0;z-index:30;background:rgba(8,8,15,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:13px 24px;display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:56px}
.admin-topbar-left{display:flex;align-items:center;gap:14px;min-width:0}
.admin-burger{display:none;background:none;border:1px solid var(--border);width:34px;height:34px;border-radius:8px;color:var(--muted2);cursor:pointer;align-items:center;justify-content:center}
.admin-burger:hover{color:var(--white);border-color:var(--border2)}
.admin-topbar h1{font-size:15px;font-weight:700;color:var(--white);letter-spacing:-0.015em;display:flex;align-items:center;gap:10px}
.admin-pill{display:inline-flex;align-items:center;padding:2px 9px;border-radius:100px;background:rgba(255,77,0,0.10);border:1px solid rgba(255,77,0,0.2);font-size:9px;font-weight:700;color:var(--orange);letter-spacing:0.1em;text-transform:uppercase}
.admin-topbar-right{display:flex;align-items:center;gap:8px}
.admin-search{display:flex;align-items:center;gap:8px;padding:6px 11px;border-radius:8px;background:var(--card);border:1px solid var(--border);font-size:12px;color:var(--muted2)}
.admin-search input{background:transparent;border:none;outline:none;color:var(--white);font-size:12px;width:160px;letter-spacing:-0.005em}
.admin-search input::placeholder{color:var(--muted)}
.admin-icon-btn{width:32px;height:32px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--muted2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;position:relative;transition:all 0.15s}
.admin-icon-btn:hover{color:var(--white);border-color:var(--border2);background:var(--card2)}
.admin-icon-btn .badge-dot{position:absolute;top:5px;right:5px;width:6px;height:6px;border-radius:50%;background:#7A7A7A;box-shadow:0 0 4px rgba(122,122,122,0.7)}
.admin-date{font-size:11px;color:var(--muted);padding:0 6px;letter-spacing:-0.005em;display:none}
@media(min-width:900px){.admin-date{display:inline}}
.admin-logout{display:inline-flex;align-items:center;gap:7px;padding:6px 12px;border-radius:8px;border:1px solid rgba(122,122,122,0.18);background:rgba(122,122,122,0.05);color:#A8A8A8;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.15s}
.admin-logout:hover{background:rgba(122,122,122,0.10);color:#7A7A7A;border-color:rgba(122,122,122,0.3)}
.admin-logout i{font-size:10px}

/* ── Page content area ─────────────────────────────────────────── */
.admin-content{padding:24px;animation:adfade 0.35s ease}
@keyframes adfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* ═══ LIQUID GLASS — admin (matches tenant /dashboard look) ═══════ */

/* Dark liquid glass */
.dark .glass,.dark .admin-glass{
  background:linear-gradient(135deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.018) 50%,rgba(255,255,255,0.035) 100%);
  backdrop-filter:blur(20px) saturate(1.8);
  -webkit-backdrop-filter:blur(20px) saturate(1.8);
  border:1px solid rgba(255,255,255,0.10);
  border-top-color:rgba(255,255,255,0.20);
  border-left-color:rgba(255,255,255,0.15);
  border-radius:14px;
  box-shadow:0 8px 32px rgba(0,0,0,0.35),0 2px 8px rgba(0,0,0,0.20),inset 0 1px 0 rgba(255,255,255,0.12),inset 0 -1px 0 rgba(0,0,0,0.15);
  position:relative;isolation:isolate;color:var(--white);transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s
}
.dark .admin-glass{border-radius:11px}
.dark .glass::before,.dark .admin-glass::before{
  content:'';position:absolute;top:0;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(255,77,0,0.5) 25%,rgba(255,107,43,0.85) 50%,rgba(255,77,0,0.5) 75%,transparent 100%);
  border-radius:0 0 50% 50%;filter:blur(0.5px);pointer-events:none;z-index:1
}
.dark .glass::after,.dark .admin-glass::after{
  content:'';position:absolute;inset:0;border-radius:inherit;
  background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.03) 50%,transparent 60%);
  pointer-events:none;z-index:0
}
.dark .glass:hover,.dark .admin-glass:hover{
  border-color:rgba(255,77,0,0.25);
  box-shadow:0 12px 40px rgba(0,0,0,0.40),0 4px 12px rgba(255,77,0,0.08),inset 0 1px 0 rgba(255,255,255,0.18),inset 0 -1px 0 rgba(0,0,0,0.12)
}

/* Light liquid glass */
.light .glass,.light .admin-glass{
  background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.78) 100%);
  backdrop-filter:blur(20px) saturate(1.6);
  -webkit-backdrop-filter:blur(20px) saturate(1.6);
  border:1px solid rgba(255,255,255,0.92);
  border-top-color:rgba(255,255,255,1);
  border-radius:14px;
  box-shadow:0 8px 32px rgba(255,77,0,0.08),0 2px 8px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.95),inset 0 -1px 0 rgba(0,0,0,0.03);
  position:relative;isolation:isolate;color:#0A0A0A;transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s
}
.light .admin-glass{border-radius:11px}
.light .glass::before,.light .admin-glass::before{
  content:'';position:absolute;top:0;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(255,77,0,0.30) 25%,rgba(255,107,43,0.55) 50%,rgba(255,77,0,0.30) 75%,transparent 100%);
  border-radius:0 0 50% 50%;filter:blur(0.5px);pointer-events:none;z-index:1
}
.light .glass:hover,.light .admin-glass:hover{
  border-color:rgba(255,77,0,0.30);
  box-shadow:0 14px 40px rgba(255,77,0,0.12),0 4px 12px rgba(0,0,0,0.06)
}

.card-hover{transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s}
.dark .card-hover:hover{transform:translateY(-3px) scale(1.005);box-shadow:0 24px 48px rgba(0,0,0,0.45),0 8px 16px rgba(255,77,0,0.12),inset 0 1px 0 rgba(255,255,255,0.22)}
.light .card-hover:hover{transform:translateY(-3px) scale(1.005);box-shadow:0 20px 40px rgba(255,77,0,0.14),0 4px 12px rgba(0,0,0,0.06)}

/* Sidebar / topbar (used by legacy inline styles + admin shell) */
.sidebar-bg{background:var(--surface)}
.frosted{background:var(--surface);border:1px solid var(--border)}
.dark .frosted{background:rgba(8,8,15,0.82);backdrop-filter:blur(40px) saturate(1.8);border:1px solid rgba(255,255,255,0.08);box-shadow:0 20px 60px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.08)}
.light .frosted{background:rgba(255,255,255,0.88);backdrop-filter:blur(40px) saturate(1.5);border:1px solid rgba(0,0,0,0.06);box-shadow:0 20px 60px rgba(0,0,0,0.10),inset 0 1px 0 rgba(255,255,255,0.95)}
.topbar-bg{backdrop-filter:blur(16px)}
.dark .topbar-bg{background:rgba(8,8,15,0.92)}
.light .topbar-bg{background:rgba(255,255,255,0.85);box-shadow:0 1px 0 rgba(0,0,0,0.04)}

/* ═══ LIGHT MODE — body / sidebar / text overrides ═════════════════ */
.light body{
  background:#FFF7F0;color:#0A0A0A;
  background-image:
    radial-gradient(ellipse 80% 65% at 8% -5%,rgba(255,77,0,0.10) 0%,transparent 58%),
    radial-gradient(ellipse 65% 55% at 92% 28%,rgba(255,107,43,0.06) 0%,transparent 52%),
    radial-gradient(ellipse 55% 45% at 50% 95%,rgba(255,77,0,0.04) 0%,transparent 48%)
}
.light .admin-sidebar{background:rgba(255,255,255,0.85);border-right-color:rgba(0,0,0,0.06);backdrop-filter:blur(28px) saturate(1.4)}
.light .admin-sidebar-head{border-bottom-color:rgba(0,0,0,0.06)}
.light .admin-sidebar-head-text .brand{color:#0A0A0A}
.light .admin-sidebar-tag{color:#6B6B8E}
.light .admin-workspace{background:rgba(255,255,255,0.70);border-color:rgba(0,0,0,0.08)}
.light .admin-workspace .sf-name{color:#0A0A0A}
.light .admin-nav-link{color:#4B4B6B}
.light .admin-nav-link:hover{background:rgba(0,0,0,0.03);color:#0A0A0A}
.light .admin-nav-link.active{background:linear-gradient(90deg,rgba(255,77,0,0.16),rgba(255,77,0,0.05));color:#0A0A0A}
.light .admin-nav-link i{color:#8B8BA8}
.light .admin-nav-link:hover i{color:#3B3B5B}
.light .admin-sidebar-status{background:linear-gradient(135deg,rgba(255,77,0,0.10),rgba(255,107,43,0.05));border-color:rgba(255,77,0,0.22)}
.light .admin-sidebar-status-text{color:#4B4B6B}
.light .admin-sidebar-foot a{color:#6B6B8E}
.light .admin-sidebar-foot a:hover{background:rgba(0,0,0,0.04);color:#0A0A0A;border-color:rgba(0,0,0,0.08)}
.light .admin-topbar{border-bottom-color:rgba(0,0,0,0.06)}
.light .admin-topbar h1{color:#0A0A0A}
.light .admin-burger{border-color:rgba(0,0,0,0.10);color:#4B4B6B}
.light .admin-burger:hover{color:#0A0A0A;border-color:rgba(0,0,0,0.20)}
.light .admin-search{background:rgba(255,255,255,0.70);border-color:rgba(0,0,0,0.08);color:#4B4B6B}
.light .admin-search input{color:#0A0A0A}
.light .admin-search input::placeholder{color:#8B8BA8}
.light .admin-icon-btn{background:rgba(255,255,255,0.70);border-color:rgba(0,0,0,0.08);color:#4B4B6B}
.light .admin-icon-btn:hover{background:rgba(255,255,255,0.95);border-color:rgba(0,0,0,0.16);color:#0A0A0A}
.light .admin-date{color:#6B6B8E}

/* Theme toggle button */
.theme-toggle{transition:transform 0.3s ease,color 0.2s ease}
.theme-toggle:hover{transform:rotate(20deg) scale(1.1)}
.theme-toggle i.fa-sun{color:#FF6B2B}
.theme-toggle i.fa-moon{color:var(--muted2)}

/* Status badges */
.badge-active{background:rgba(255,77,0,0.12);color:var(--green);border:1px solid rgba(255,77,0,0.25);padding:2px 9px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;display:inline-flex;align-items:center;gap:5px}
.badge-inactive{background:rgba(122,122,122,0.12);color:#7A7A7A;border:1px solid rgba(122,122,122,0.25);padding:2px 9px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
.badge-trial{background:rgba(255,107,43,0.12);color:var(--gold);border:1px solid rgba(255,107,43,0.25);padding:2px 9px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
.badge-suspended{background:rgba(152,152,184,0.12);color:var(--muted2);border:1px solid rgba(152,152,184,0.22);padding:2px 9px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}

/* Super badge (sidebar/topbar branding) */
.super-badge{background:var(--orange);color:#fff;font-weight:700;font-size:9px;padding:2px 8px;border-radius:100px;letter-spacing:0.08em;text-transform:uppercase}

/* Glow halos (toned down) */
.admin-glow{box-shadow:0 0 18px rgba(255,77,0,0.30)}
.liquid-glow-orange{box-shadow:0 0 18px rgba(255,77,0,0.25)}
.admin-link.active,.admin-link:hover{background:rgba(255,77,0,0.10);color:var(--orange)}

/* Progress bars */
.progress-bar{height:4px;border-radius:3px;background:rgba(255,255,255,0.05);overflow:hidden;position:relative}
.progress-fill{height:100%;border-radius:3px;transition:width 1s cubic-bezier(0.23,1,0.32,1);background:linear-gradient(90deg,var(--orange),var(--orange2))}

/* Table rows hover */
.table-row{transition:background 0.15s}
.table-row:hover{background:rgba(255,255,255,0.02)}

/* Icon buttons */
.icon-btn{transition:all 0.2s}
.icon-btn:hover{background:rgba(255,255,255,0.04)}

/* Animations */
.animate-fadeIn{animation:adfade 0.35s ease}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
.blink{animation:blink 1.8s ease infinite}
.orb-pulse{animation:orbPulse 3s ease infinite}
@keyframes orbPulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(255,77,0,0.5)}50%{transform:scale(1.04);box-shadow:0 0 0 8px rgba(255,77,0,0)}}

/* Danger zone */
.danger-zone{border:1px solid rgba(122,122,122,0.22);background:rgba(122,122,122,0.04);border-radius:14px}

/* Tooltip */
.tooltip{position:relative}
.tooltip-text{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:var(--card);backdrop-filter:blur(12px);color:var(--white);font-size:11px;white-space:nowrap;padding:5px 10px;border-radius:8px;border:1px solid var(--border2);box-shadow:0 8px 24px rgba(0,0,0,0.5);opacity:0;pointer-events:none;transition:opacity 0.2s;z-index:99}
.tooltip:hover .tooltip-text{opacity:1}

/* Modal backdrop (legacy) */
.modal-backdrop{background:rgba(0,0,0,0.7);backdrop-filter:blur(8px)}

/* Inputs/selects/textareas focus */
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--orange) !important;box-shadow:0 0 0 3px rgba(255,77,0,0.12)}

/* Scrollbar */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,77,0,0.35);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,77,0,0.65)}

/* ── Mobile ─────────────────────────────────────────────────── */
@media(max-width:900px){
  .admin-sidebar{position:fixed;left:-260px;transition:left 0.25s ease;z-index:60}
  .admin-sidebar.open{left:0;box-shadow:0 0 0 100vmax rgba(0,0,0,0.55)}
  .admin-burger{display:flex}
  .admin-content{padding:18px}
  .admin-search{display:none}
}

/* Alerts panel */
#admin-alerts-panel{position:fixed;right:0;top:56px;width:min(380px,92vw);max-height:80vh;background:var(--surface);border:1px solid var(--border2);border-right:none;border-top:none;border-bottom-left-radius:14px;z-index:55;overflow-y:auto;animation:adfade 0.25s ease}
#admin-alerts-panel.hidden{display:none}
#admin-alerts-panel header{padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
#admin-alerts-panel header h3{font-size:13px;font-weight:700;color:var(--white)}
#admin-alerts-panel header button{background:none;border:none;color:var(--muted);cursor:pointer;width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center}
#admin-alerts-panel header button:hover{color:var(--white);background:rgba(255,255,255,0.05)}
.alert-card{display:flex;align-items:flex-start;gap:10px;padding:11px 12px;border-radius:10px;background:var(--card);border:1px solid var(--border);transition:border-color 0.2s}
.alert-card + .alert-card{margin-top:8px}
.alert-card:hover{border-color:rgba(255,255,255,0.15)}
.alert-card .ai-icon{width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0}
.alert-card .ai-body{flex:1;min-width:0}
.alert-card .ai-body p{font-size:12px;color:var(--text);line-height:1.4}
.alert-card .ai-when{font-size:10px;color:var(--muted);margin-top:3px}
.alerts-list{padding:12px}

/* Light theme overrides — removed: admin matches landing (dark only) */
</style>
</head>
<body>

<aside id="admin-sidebar" class="admin-sidebar">
  <a href="/" class="admin-sidebar-head" style="text-decoration:none">
    <div class="admin-sidebar-head-text">
      <span class="brand">AdNova<span>.</span></span>
      <div class="admin-sidebar-tag">Super Admin Console</div>
    </div>
  </a>

  <div class="admin-workspace" title="Super Admin workspace">
    <div class="sf-avatar">SA</div>
    <span class="sf-name">Super Admin</span>
    <span class="sf-status" title="Online"></span>
  </div>

  <nav class="admin-nav-group" style="flex:1;overflow-y:auto;min-height:0">
    <div class="admin-nav-section">Vue d'ensemble</div>
    ${adminNavLink('/admin', 'fa-gauge-high', 'Dashboard', activePage)}
    ${adminNavLink('/admin/tenants', 'fa-building', 'Tenants', activePage)}
    ${adminNavLink('/admin/users', 'fa-users', 'Users', activePage)}

    <div class="admin-nav-section">Plateforme</div>
    ${adminNavLink('/admin/ai-monitor', 'fa-brain', 'AI Monitor', activePage)}
    ${adminNavLink('/admin/plans', 'fa-tags', 'Plans', activePage)}

    <div class="admin-nav-section">Business</div>
    ${adminNavLink('/admin/revenue', 'fa-chart-line', 'Revenue', activePage)}
    ${adminNavLink('/admin/billing', 'fa-credit-card', 'Billing', activePage)}
    ${adminNavLink('/admin/affiliates', 'fa-handshake', 'Affiliés', activePage)}

    <div class="admin-nav-section">Système</div>
    ${adminNavLink('/admin/logs', 'fa-terminal', 'Logs', activePage)}
    ${adminNavLink('/admin/security', 'fa-shield-halved', 'Security', activePage)}
    ${adminNavLink('/admin/config', 'fa-sliders', 'Config', activePage)}
  </nav>

  <div class="admin-sidebar-status">
    <div class="admin-sidebar-status-head">
      <span class="admin-sidebar-status-dot"></span>
      <span class="admin-sidebar-status-label">Système OK</span>
    </div>
    <div class="admin-sidebar-status-text">12 tenants actifs · 47 campagnes</div>
    <div class="progress-bar"><div class="progress-fill" style="width:78%"></div></div>
  </div>

  <div class="admin-sidebar-foot">
    <a href="/"><i class="fas fa-arrow-left"></i><span>Retour à la landing</span><i class="fas fa-external-link ext"></i></a>
  </div>
</aside>

<div class="admin-main">
  <header class="admin-topbar">
    <div class="admin-topbar-left">
      <button class="admin-burger" onclick="openAdminSidebar()" aria-label="Open menu"><i class="fas fa-bars"></i></button>
      <h1>${title}<span class="admin-pill">Super Admin</span></h1>
    </div>
    <div class="admin-topbar-right">
      <label class="admin-search">
        <i class="fas fa-search"></i>
        <input placeholder="Search…" id="admin-search"/>
      </label>
      <button class="admin-icon-btn theme-toggle" onclick="toggleAdminTheme()" title="Dark / Light" aria-label="Toggle theme">
        <i id="admin-theme-icon" class="fas fa-moon"></i>
      </button>
      <button class="admin-icon-btn" onclick="toggleAdminAlerts()" title="Alerts" aria-label="Alerts">
        <i class="fas fa-bell"></i>
        <span class="badge-dot"></span>
      </button>
      <span class="admin-date" id="admin-date"></span>
      <button class="admin-logout" onclick="adminLogout()">
        <i class="fas fa-right-from-bracket"></i><span style="display:none" class="lbl-md">Sign out</span>
      </button>
    </div>
  </header>

  <main class="admin-content">
    ${content}
  </main>
</div>

<aside id="admin-alerts-panel" class="hidden">
  <header>
    <h3>System alerts</h3>
    <button onclick="toggleAdminAlerts()" aria-label="Close"><i class="fas fa-times"></i></button>
  </header>
  <div class="alerts-list">${adminAlerts()}</div>
</aside>

<script>
(function(){
  // Inject current date
  var el = document.getElementById('admin-date');
  if(el) el.textContent = new Date().toLocaleDateString('en-US',{day:'2-digit',month:'short',year:'numeric'});

  // Theme toggle (dark/light) — persisted in localStorage
  function applyAdminTheme(t){
    var html = document.documentElement;
    if(t==='light'){ html.classList.remove('dark'); html.classList.add('light'); }
    else            { html.classList.remove('light'); html.classList.add('dark'); }
    var icon = document.getElementById('admin-theme-icon');
    if(icon) icon.className = 'fas fa-' + (t==='light' ? 'sun' : 'moon');
  }
  window.toggleAdminTheme = function(){
    var cur = localStorage.getItem('adnova_admin_theme') || 'dark';
    var next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem('adnova_admin_theme', next);
    applyAdminTheme(next);
  };
  applyAdminTheme(localStorage.getItem('adnova_admin_theme') || 'dark');

  window.adminLogout = function(){
    if(!confirm('Sign out of Super Admin session?')) return;
    try { localStorage.removeItem('adnova_admin_token'); } catch(e){}
    var isHttps = window.location.protocol === 'https:';
    document.cookie = 'adnova_admin_token=; Path=/admin; Max-Age=0; SameSite=Strict' + (isHttps ? '; Secure' : '');
    window.location.href = '/admin/login';
  };

  window.toggleAdminAlerts = function(){
    document.getElementById('admin-alerts-panel').classList.toggle('hidden');
  };

  document.addEventListener('click', function(e){
    var panel = document.getElementById('admin-alerts-panel');
    if(panel.classList.contains('hidden')) return;
    if(panel.contains(e.target)) return;
    if(e.target.closest('[onclick="toggleAdminAlerts()"]')) return;
    panel.classList.add('hidden');
  });

  var search = document.getElementById('admin-search');
  if(search) search.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && this.value) window.location.href = '/admin/tenants?search=' + encodeURIComponent(this.value);
  });

  window.openAdminSidebar = function(){ document.getElementById('admin-sidebar').classList.add('open'); };
  window.closeAdminSidebar = function(){ document.getElementById('admin-sidebar').classList.remove('open'); };
})();
</script>
</body>
</html>`
}

function adminNavLink(href: string, icon: string, label: string, active: string): string {
  const isActive = active === href
  const badges: Record<string, string> = {
    '/admin/tenants': '<span class="admin-nav-badge">3</span>',
    '/admin/logs': '<span class="admin-nav-dot" aria-label="New alerts"></span>',
  }
  return `<a href="${href}" class="admin-nav-link${isActive ? ' active' : ''}">
    <i class="fas ${icon}"></i>
    <span>${label}</span>
    ${badges[href] || ''}
  </a>`
}

function adminAlerts(): string {
  const alerts = [
    { icon: 'fa-triangle-exclamation', color: 'rgba(255,107,43,0.15)', iconColor: '#FF6B2B', text: 'TechStart Inc: budget overspent +40% today', time: '12 min' },
    { icon: 'fa-user-xmark',           color: 'rgba(122,122,122,0.15)', iconColor: '#7A7A7A', text: '3 suspicious login attempts — IP: 185.xx.xx.xx', time: '28 min' },
    { icon: 'fa-clock',                color: 'rgba(168,168,168,0.15)', iconColor: '#A8A8A8', text: 'Fashion Brand: trial expires in 2 days', time: '1h' },
    { icon: 'fa-server',               color: 'rgba(255,77,0,0.15)', iconColor: '#FF6B2B', text: 'AI Engine CPU usage at 87% — unusual spike', time: '2h' },
    { icon: 'fa-check-circle',         color: 'rgba(255,77,0,0.15)', iconColor: '#FF4D00', text: 'New tenant: "Digital Storm" — Pro plan activated', time: '3h' },
  ]
  return alerts.map(a => `
    <div class="alert-card">
      <div class="ai-icon" style="background:${a.color};color:${a.iconColor}">
        <i class="fas ${a.icon}"></i>
      </div>
      <div class="ai-body">
        <p>${a.text}</p>
        <div class="ai-when">${a.time}</div>
      </div>
    </div>`).join('')
}
