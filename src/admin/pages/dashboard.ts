import type { Context } from 'hono'
import { themeBaseCss, themeFontLinks, themeMeta } from '../../lib/theme'

// ─── Inline SVG icon set (replaces Font Awesome) ───────────────────────────
const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
  tenants: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9h0M9 12h0M9 15h0M9 18h0"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  revenue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v18M3 9h18M3 15h18"/><circle cx="12" cy="12" r="3"/></svg>',
  logs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>',
  security: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  config: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  plans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h12"/></svg>',
  billing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20"/><path d="M9 22V12h6v10M9 6h0M15 6h0M9 10h0M15 10h0"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  bullhorn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19 12a4 4 0 0 0-2-3.4M22 12a8 8 0 0 0-4-6.9"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 1 1-5 0H7a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 2 13.5v-1A2.5 2.5 0 0 1 4.5 10V9a2.5 2.5 0 0 1 2.5-2.5h0A2.5 2.5 0 0 1 9.5 4z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 1 0 5 0h0a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0-2.5-2.5V9a2.5 2.5 0 0 0-2.5-2.5h0A2.5 2.5 0 0 0 14.5 4z"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  userX: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
  signOut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 1.4-1.4M11 17l-2.5 2.5a1 1 0 1 1-1.4-1.4l1.5-1.5M3.5 14.5a2 2 0 1 1 2.8-2.8M3.5 14.5l5.5 5.5M14.5 11l-2.5-2.5M14.5 11l3-3a2 2 0 1 1 2.8 2.8L17 14M14.5 11l1.5 1.5M20.5 13.5 13 6l-3.5 3.5"/></svg>',
} as const

type NavRow =
  | { type: 'section'; label: string }
  | { type: 'item'; href: string; label: string; icon: string; active?: boolean; badge?: string }

const NAV_ITEMS: NavRow[] = [
  { type: 'section', label: "Vue d'ensemble" },
  { type: 'item', href: '/admin',           label: 'Dashboard',  icon: ICONS.dashboard, active: true },
  { type: 'item', href: '/admin/tenants',   label: 'Tenants',    icon: ICONS.tenants, badge: '12' },
  { type: 'item', href: '/admin/users',     label: 'Users',      icon: ICONS.users },

  { type: 'section', label: 'Plateforme' },
  { type: 'item', href: '/admin/ai-monitor',label: 'AI Monitor', icon: ICONS.ai },
  { type: 'item', href: '/admin/plans',     label: 'Plans',      icon: ICONS.plans },

  { type: 'section', label: 'Business' },
  { type: 'item', href: '/admin/revenue',   label: 'Revenue',    icon: ICONS.revenue },
  { type: 'item', href: '/admin/billing',   label: 'Billing',    icon: ICONS.billing },
  { type: 'item', href: '/admin/affiliates',label: 'Affiliés',   icon: ICONS.handshake, badge: '47' },

  { type: 'section', label: 'Système' },
  { type: 'item', href: '/admin/logs',      label: 'Logs',       icon: ICONS.logs },
  { type: 'item', href: '/admin/security',  label: 'Security',   icon: ICONS.security },
  { type: 'item', href: '/admin/config',    label: 'Config',     icon: ICONS.config },
]

// ─── Component helpers ─────────────────────────────────────────────────────
function kpiCard(opts: { label: string; value: string; delta: string; icon: string; sub: string; deltaPositive?: boolean }): string {
  const cls = (opts.deltaPositive ?? true) ? 'kpi-delta up' : 'kpi-delta dn'
  return `
    <div class="kpi">
      <div class="kpi-icon">${opts.icon}</div>
      <div class="kpi-label">${opts.label}</div>
      <div class="kpi-value">${opts.value}</div>
      <div class="kpi-meta"><span class="${cls}">${opts.delta}</span><span class="kpi-sub">${opts.sub}</span></div>
    </div>`
}

function planLegendRow(name: string, count: string, color: string, price: string, mrr: string, pct: number): string {
  return `
    <div class="plan-row">
      <div class="plan-row-head">
        <span class="plan-dot" style="background:${color}"></span>
        <span class="plan-name">${name}</span>
        <span class="plan-mrr">${mrr}</span>
      </div>
      <div class="plan-bar"><div class="plan-bar-fill" style="width:${pct}%;background:${color}"></div></div>
      <div class="plan-row-foot"><span>${count}</span><span>${price}</span></div>
    </div>`
}

function clientRow(name: string, plan: string, spend: string, roas: string, status: string, joined: string, initials: string): string {
  const planColor = plan === 'Pro' ? 'pill-orange' : plan === 'Agency' ? 'pill-violet' : plan === 'Enterprise' ? 'pill-green' : plan === 'Trial' ? 'pill-muted' : 'pill-blue'
  const statusBadge = status === 'active' ? '<span class="status-dot active"></span>Active' : '<span class="status-dot trial"></span>Trial'
  return `
    <tr>
      <td><div class="cell-tenant"><div class="tenant-avatar">${initials}</div><span>${name}</span></div></td>
      <td><span class="pill ${planColor}">${plan}</span></td>
      <td class="num">${spend}</td>
      <td class="num">${roas}</td>
      <td>${statusBadge}</td>
      <td class="muted">${joined}</td>
    </tr>`
}

function alertRow(type: 'critical' | 'warn' | 'info', label: string, text: string, when: string): string {
  const icon = type === 'critical' ? ICONS.alert : type === 'warn' ? ICONS.clock : ICONS.check
  return `
    <div class="alert-row alert-${type}">
      <div class="alert-icon">${icon}</div>
      <div class="alert-body">
        <div class="alert-label">${label}</div>
        <div class="alert-text">${text}</div>
      </div>
      <div class="alert-when">${when}</div>
    </div>`
}

function aiStatRow(label: string, value: string): string {
  return `<div class="ai-stat-row"><span class="ai-stat-label">${label}</span><span class="ai-stat-value">${value}</span></div>`
}

function topClientBar(name: string, value: string, pct: number): string {
  return `
    <div class="top-row">
      <div class="top-row-head"><span class="top-row-name">${name}</span><span class="top-row-value">${value}</span></div>
      <div class="top-bar"><div class="top-bar-fill" style="width:${pct}%"></div></div>
    </div>`
}

function adminActionRow(icon: string, color: 'brand' | 'slate' | 'orange' | 'slate', label: string, target: string, when: string): string {
  return `
    <div class="action-row">
      <div class="action-icon action-${color}">${icon}</div>
      <div class="action-body">
        <div class="action-label">${label}</div>
        <div class="action-target">${target}</div>
      </div>
      <div class="action-when">${when}</div>
    </div>`
}

// MRR bars data (12 months) — pure CSS, no Chart.js.
const MRR_BARS = [
  { m: 'Apr', mrr: 980,  clients: 98 },
  { m: 'May', mrr: 1050, clients: 112 },
  { m: 'Jun', mrr: 1120, clients: 124 },
  { m: 'Jul', mrr: 1180, clients: 136 },
  { m: 'Aug', mrr: 1240, clients: 148 },
  { m: 'Sep', mrr: 1310, clients: 162 },
  { m: 'Oct', mrr: 1400, clients: 178 },
  { m: 'Nov', mrr: 1490, clients: 195 },
  { m: 'Dec', mrr: 1580, clients: 210 },
  { m: 'Jan', mrr: 1640, clients: 228 },
  { m: 'Feb', mrr: 1730, clients: 248 },
  { m: 'Mar', mrr: 1847, clients: 264 },
]

function mrrChartHtml(): string {
  const maxMrr = Math.max(...MRR_BARS.map(b => b.mrr))
  const maxCli = Math.max(...MRR_BARS.map(b => b.clients))
  return MRR_BARS.map(b => {
    const h1 = Math.round((b.mrr / maxMrr) * 100)
    const h2 = Math.round((b.clients / maxCli) * 70)
    return `
      <div class="mrr-col" title="${b.m}: $${b.mrr}K · ${b.clients} new clients">
        <div class="mrr-stack">
          <div class="mrr-bar mrr-mrr" style="height:${h1}%"></div>
          <div class="mrr-line" style="bottom:${h2}%"></div>
        </div>
        <div class="mrr-label">${b.m}</div>
      </div>`
  }).join('')
}

// ─── Main render ───────────────────────────────────────────────────────────
export const renderAdminDashboard = (c: Context) => {
  const navHtml = NAV_ITEMS.map(row => row.type === 'section'
    ? `<div class="nav-section">${row.label}</div>`
    : `<a href="${row.href}" class="nav-item${row.active ? ' active' : ''}">
        <span class="nav-icon">${row.icon}</span>
        <span class="nav-label">${row.label}</span>
        ${row.badge ? `<span class="nav-badge">${row.badge}</span>` : ''}
      </a>`).join('')

  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
${themeMeta({ title: 'Admin · Dashboard', description: 'AdNova Super Admin dashboard.', path: '/admin' })}
${themeFontLinks()}
<script>(function(){var t=localStorage.getItem('adnova_admin_theme')||'dark';document.documentElement.classList.add(t==='light'?'light':'dark')})();</script>
<style>
${themeBaseCss()}

/* ─── Admin shell layout (sidebar matches tenant /dashboard pattern) ── */
body{display:flex;min-height:100vh}
.dark body{background:#08080F;color:var(--white);background-image:radial-gradient(ellipse 80% 65% at 8% -5%,rgba(255,77,0,0.10) 0%,transparent 58%),radial-gradient(ellipse 65% 55% at 92% 28%,rgba(255,77,0,0.06) 0%,transparent 52%),radial-gradient(ellipse 55% 45% at 50% 95%,rgba(255,77,0,0.04) 0%,transparent 48%)}
.light body{background:#FFF7F0;color:#0A0A0A;background-image:radial-gradient(ellipse 80% 65% at 8% -5%,rgba(255,77,0,0.10) 0%,transparent 58%),radial-gradient(ellipse 65% 55% at 92% 28%,rgba(255,107,43,0.06) 0%,transparent 52%),radial-gradient(ellipse 55% 45% at 50% 95%,rgba(255,77,0,0.04) 0%,transparent 48%)}
.sidebar{width:264px;flex-shrink:0;border-right:1px solid var(--border);padding:18px 14px;position:sticky;top:0;height:100vh;overflow-y:auto;display:flex;flex-direction:column;gap:14px}
.dark .sidebar{background:rgba(8,8,15,0.78);backdrop-filter:blur(28px) saturate(1.4)}
.light .sidebar{background:rgba(255,255,255,0.85);border-right-color:rgba(0,0,0,0.06);backdrop-filter:blur(28px) saturate(1.4)}

/* Header: bolt mark + brand + tagline */
.sidebar-head{display:flex;align-items:center;gap:11px;padding:4px 6px 12px;border-bottom:1px solid var(--border)}
.sidebar-mark{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--orange),var(--orange2));display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 18px rgba(255,77,0,0.30);animation:orbPulseS 3s ease infinite}
.sidebar-mark svg{width:16px;height:16px;color:#fff}
.sidebar-head-text{min-width:0;line-height:1.15}
.sidebar-head-text .brand{font-weight:800;font-size:22px;color:var(--white);letter-spacing:-0.03em;display:block;line-height:1}
.sidebar-head-text .brand span{color:var(--orange)}
.sidebar-tag{font-size:11px;color:var(--muted2);letter-spacing:-0.005em;font-weight:500}
@keyframes orbPulseS{0%,100%{box-shadow:0 0 0 0 rgba(255,77,0,0.5)}50%{box-shadow:0 0 0 8px rgba(255,77,0,0)}}

/* Workspace chip */
.sidebar-workspace{padding:9px 11px;border-radius:11px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;gap:10px;transition:border-color 0.15s}
.sidebar-workspace:hover{border-color:var(--border2)}
.sidebar-workspace .sf-avatar{width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;font-weight:700;font-size:11px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.sidebar-workspace .sf-name{flex:1;font-weight:600;color:var(--white);font-size:13px;letter-spacing:-0.01em;min-width:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}
.sidebar-workspace .sf-status-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);flex-shrink:0}

/* Nav sections + items */
.nav-list{display:flex;flex-direction:column;gap:2px;flex:1;min-height:0;overflow-y:auto}
.nav-section{font-size:11px;color:var(--orange);text-transform:uppercase;letter-spacing:0.14em;padding:14px 12px 8px;font-weight:700}
.nav-section:first-child{padding-top:2px}
.nav-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;color:var(--muted2);font-size:13px;font-weight:500;transition:background 0.15s,color 0.15s;letter-spacing:-0.005em;text-decoration:none;position:relative;border:1px solid transparent}
.nav-item:hover{color:var(--white);background:rgba(255,255,255,0.03)}
.nav-item.active{background:linear-gradient(90deg,rgba(255,77,0,0.14),rgba(255,77,0,0.04));color:var(--white);border-color:rgba(255,77,0,0.20);box-shadow:inset 0 0 18px rgba(255,77,0,0.05)}
.nav-item.active::before{content:'';position:absolute;left:-1px;top:7px;bottom:7px;width:2px;background:var(--orange);border-radius:2px;box-shadow:0 0 8px rgba(255,77,0,0.6)}
.nav-icon{width:16px;height:16px;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;color:var(--muted);transition:color 0.15s}
.nav-item:hover .nav-icon{color:var(--text)}
.nav-item.active .nav-icon{color:var(--orange)}
.nav-icon svg{width:16px;height:16px}
.nav-label{flex:1;min-width:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}
.nav-badge{margin-left:auto;font-size:10px;padding:2px 8px;border-radius:100px;background:rgba(255,77,0,0.18);color:var(--orange2);font-weight:700;flex-shrink:0}

/* System status panel (matches AI ENGINE ACTIF pattern) */
.sidebar-status{padding:12px 13px;border-radius:11px;background:linear-gradient(135deg,rgba(255,77,0,0.08),rgba(255,107,43,0.04));border:1px solid rgba(255,77,0,0.18)}
.sidebar-status-head{display:flex;align-items:center;gap:7px;margin-bottom:6px}
.sidebar-status-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:blinkS 1.8s ease infinite;flex-shrink:0}
@keyframes blinkS{0%,100%{opacity:1}50%{opacity:0.25}}
.sidebar-status-label{font-size:11px;font-weight:700;color:var(--green);letter-spacing:0.10em;text-transform:uppercase}
.sidebar-status-text{font-size:11px;color:var(--muted2);letter-spacing:-0.005em}
.sidebar-status .pbar{margin-top:8px;height:3px;border-radius:3px;background:rgba(255,255,255,0.05);overflow:hidden}
.sidebar-status .pbar > div{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--orange),var(--orange2));width:78%}

/* Footer (user chip + logout) */
.sidebar-foot{padding:11px 12px;border-radius:11px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;gap:10px;font-size:12px}
.sidebar-foot .sf-avatar{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--orange),var(--orange2));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:11px;flex-shrink:0}
.sidebar-foot .sf-name{font-weight:600;color:var(--white);font-size:12px;line-height:1.3}
.sidebar-foot .sf-role{font-size:10px;color:var(--muted);letter-spacing:0.04em;text-transform:uppercase;margin-top:1px}
.sf-logout{margin-left:auto;color:var(--muted);background:none;border:none;cursor:pointer;padding:6px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all 0.15s}
.sf-logout:hover{color:#A8A8A8;background:rgba(122,122,122,0.08)}
.sf-logout svg{width:14px;height:14px}

.main{flex:1;display:flex;flex-direction:column;min-width:0}
.topbar{position:sticky;top:0;z-index:10;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.dark .topbar{background:rgba(8,8,15,0.85)}
.light .topbar{background:rgba(255,255,255,0.85);border-bottom-color:rgba(0,0,0,0.06)}
.topbar h1{font-size:18px;font-weight:700;letter-spacing:-0.025em}
.dark .topbar h1{color:var(--white)}
.light .topbar h1{color:#0A0A0A}
.topbar-sub{font-size:12px;color:var(--muted);margin-top:2px}
.topbar-right{display:flex;align-items:center;gap:10px}
.live-pill{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:100px;background:rgba(255,77,0,0.10);border:1px solid rgba(255,77,0,0.18);font-size:11px;color:var(--green);font-weight:600;letter-spacing:0.05em;text-transform:uppercase}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:lpulse 1.6s infinite}
@keyframes lpulse{0%,100%{opacity:1}50%{opacity:0.35}}
.tbar-link{font-size:12px;padding:6px 11px;border-radius:8px;border:1px solid var(--border);transition:all 0.2s}
.dark .tbar-link{color:var(--muted2)}
.dark .tbar-link:hover{color:var(--white);border-color:var(--border2);background:var(--card2)}
.light .tbar-link{color:#4B4B6B;border-color:rgba(0,0,0,0.08)}
.light .tbar-link:hover{color:#0A0A0A;background:rgba(255,255,255,0.95);border-color:rgba(0,0,0,0.16)}
.theme-toggle{width:34px;height:34px;border-radius:8px;border:1px solid var(--border);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:13px;transition:transform 0.3s ease,color 0.2s,background 0.2s,border-color 0.2s}
.dark .theme-toggle{background:var(--card);color:var(--muted2)}
.light .theme-toggle{background:rgba(255,255,255,0.70);color:#4B4B6B;border-color:rgba(0,0,0,0.08)}
.theme-toggle:hover{transform:rotate(20deg) scale(1.1)}
.theme-toggle .fa-sun{color:#FF6B2B}
.theme-toggle .fa-moon{color:var(--muted2)}

.content{padding:24px 28px 56px;display:flex;flex-direction:column;gap:20px}

/* ─── KPI cards ──────────────────────────────────────────────── */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.kpi{padding:18px;border-radius:14px;transition:border-color 0.25s,transform 0.25s,box-shadow 0.25s;position:relative;isolation:isolate;overflow:hidden}
.dark .kpi,.dark .card{
  background:linear-gradient(135deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.018) 50%,rgba(255,255,255,0.035) 100%);
  backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);
  border:1px solid rgba(255,255,255,0.10);border-top-color:rgba(255,255,255,0.20);border-left-color:rgba(255,255,255,0.15);
  box-shadow:0 8px 32px rgba(0,0,0,0.35),0 2px 8px rgba(0,0,0,0.20),inset 0 1px 0 rgba(255,255,255,0.12),inset 0 -1px 0 rgba(0,0,0,0.15)
}
.dark .kpi::before,.dark .card::before{
  content:'';position:absolute;top:0;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(255,77,0,0.5) 25%,rgba(255,107,43,0.85) 50%,rgba(255,77,0,0.5) 75%,transparent 100%);
  filter:blur(0.5px);pointer-events:none;z-index:1;border-radius:0 0 50% 50%
}
.dark .kpi::after,.dark .card::after{
  content:'';position:absolute;inset:0;border-radius:inherit;
  background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.03) 50%,transparent 60%);pointer-events:none;z-index:0
}
.light .kpi,.light .card{
  background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.65) 50%,rgba(255,255,255,0.78) 100%);
  backdrop-filter:blur(20px) saturate(1.6);-webkit-backdrop-filter:blur(20px) saturate(1.6);
  border:1px solid rgba(255,255,255,0.92);border-top-color:rgba(255,255,255,1);
  box-shadow:0 8px 32px rgba(255,77,0,0.08),0 2px 8px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.95),inset 0 -1px 0 rgba(0,0,0,0.03)
}
.light .kpi::before,.light .card::before{
  content:'';position:absolute;top:0;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(255,77,0,0.30) 25%,rgba(255,107,43,0.55) 50%,rgba(255,77,0,0.30) 75%,transparent 100%);
  filter:blur(0.5px);pointer-events:none;z-index:1;border-radius:0 0 50% 50%
}
.dark .kpi:hover{transform:translateY(-3px) scale(1.005);border-color:rgba(255,77,0,0.25);box-shadow:0 24px 48px rgba(0,0,0,0.45),0 8px 16px rgba(255,77,0,0.12),inset 0 1px 0 rgba(255,255,255,0.22)}
.light .kpi:hover{transform:translateY(-3px) scale(1.005);border-color:rgba(255,77,0,0.30);box-shadow:0 20px 40px rgba(255,77,0,0.14),0 4px 12px rgba(0,0,0,0.06)}
.kpi > *{position:relative;z-index:2}
.kpi-icon{width:34px;height:34px;border-radius:9px;background:rgba(255,77,0,0.10);color:var(--orange);display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px}
.kpi-icon svg{width:17px;height:17px}
.kpi-label{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px}
.kpi-value{font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1;margin-bottom:8px}
.dark .kpi-value{color:var(--white)}
.light .kpi-value{color:#0A0A0A}
.kpi-meta{display:flex;align-items:center;gap:8px;font-size:11px}
.kpi-delta{font-weight:700;display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:5px}
.kpi-delta.up{background:rgba(255,77,0,0.12);color:var(--green)}
.kpi-delta.dn{background:rgba(122,122,122,0.12);color:#A8A8A8}
.kpi-sub{color:var(--muted)}
.kpi.clickable{cursor:pointer}

/* ─── Card primitive (replaces .glass) — liquid glass via .dark/.light above ─── */
.card{padding:18px;border-radius:14px;position:relative;isolation:isolate;overflow:hidden}
.card > *{position:relative;z-index:2}
.card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.card-head h3{font-size:14px;font-weight:700;letter-spacing:-0.015em}
.dark .card-head h3{color:var(--white)}
.light .card-head h3{color:#0A0A0A}
.card-head .card-sub{font-size:11px;color:var(--muted);margin-top:2px}
.card-link{font-size:11px;color:var(--orange2);font-weight:600;display:inline-flex;align-items:center;gap:3px;transition:color 0.2s}
.card-link:hover{color:var(--orange)}
.legend{display:flex;align-items:center;gap:12px;font-size:11px;color:var(--muted2)}
.legend-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:5px;vertical-align:middle}

/* ─── MRR chart (CSS-only bars) ──────────────────────────────── */
.mrr-chart{display:flex;align-items:flex-end;gap:10px;height:160px;padding-top:8px}
.mrr-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:default}
.mrr-stack{position:relative;width:100%;flex:1;display:flex;align-items:flex-end}
.mrr-bar{width:100%;background:linear-gradient(180deg,var(--orange) 0%,rgba(255,77,0,0.6) 100%);border-radius:4px 4px 0 0;transition:opacity 0.2s}
.mrr-col:hover .mrr-bar{opacity:0.85}
.mrr-line{position:absolute;left:50%;width:6px;height:6px;border-radius:50%;background:var(--white);border:2px solid var(--orange2);transform:translateX(-50%) translateY(50%)}
.mrr-label{font-size:10px;color:var(--muted);font-weight:500;letter-spacing:0.04em}

/* ─── Plans donut substitute (segmented bar + legend) ───────── */
.plans-summary{display:flex;height:8px;border-radius:6px;overflow:hidden;background:var(--card2);margin-bottom:18px}
.plans-summary > div{height:100%}
.plan-rows{display:flex;flex-direction:column;gap:14px}
.plan-row-head{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text)}
.plan-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.plan-name{font-weight:600;color:var(--white)}
.plan-mrr{margin-left:auto;font-weight:700;color:var(--white)}
.plan-bar{height:5px;border-radius:3px;background:rgba(255,255,255,0.05);margin-top:6px;overflow:hidden}
.plan-bar-fill{height:100%;border-radius:3px}
.plan-row-foot{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:4px}

/* ─── Tables ─────────────────────────────────────────────────── */
.tbl{width:100%;border-collapse:collapse;font-size:12px}
.tbl thead th{text-align:left;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;font-size:10px;padding:8px 10px 10px;border-bottom:1px solid var(--border)}
.tbl tbody td{padding:10px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px;color:var(--text)}
.tbl tbody tr:last-child td{border-bottom:none}
.tbl tbody tr{transition:background 0.15s}
.tbl tbody tr:hover{background:rgba(255,255,255,0.02)}
.tbl td.num{text-align:right;font-weight:700;color:var(--white);font-variant-numeric:tabular-nums}
.tbl td.muted{color:var(--muted)}

.cell-tenant{display:flex;align-items:center;gap:10px}
.tenant-avatar{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,var(--orange),var(--orange2));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:11px;flex-shrink:0}
.pill{display:inline-flex;align-items:center;padding:3px 9px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
.pill-orange{background:rgba(255,77,0,0.12);color:var(--orange2)}
.pill-violet{background:rgba(255,107,43,0.12);color:var(--gold)}
.pill-green{background:rgba(255,77,0,0.12);color:var(--green)}
.pill-blue{background:rgba(168,168,168,0.12);color:#A8A8A8}
.pill-muted{background:rgba(152,152,184,0.12);color:var(--muted2)}
.status-dot{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:6px;vertical-align:middle}
.status-dot.active{background:var(--green)}
.status-dot.trial{background:#FF6B2B}

/* ─── Alerts list ────────────────────────────────────────────── */
.alert-row{display:flex;align-items:flex-start;gap:11px;padding:11px 12px;border-radius:10px;background:var(--card);border:1px solid var(--border);transition:border-color 0.2s}
.alert-row + .alert-row{margin-top:8px}
.alert-icon{width:30px;height:30px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.alert-icon svg{width:14px;height:14px}
.alert-body{flex:1;min-width:0}
.alert-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px}
.alert-text{font-size:12px;color:var(--text);line-height:1.4}
.alert-when{font-size:11px;color:var(--muted);flex-shrink:0}
.alert-critical .alert-icon{background:rgba(122,122,122,0.12);color:#7A7A7A}
.alert-critical .alert-label{color:#7A7A7A}
.alert-warn .alert-icon{background:rgba(255,107,43,0.12);color:var(--gold)}
.alert-warn .alert-label{color:var(--gold)}
.alert-info .alert-icon{background:rgba(255,77,0,0.12);color:var(--green)}
.alert-info .alert-label{color:var(--green)}

/* ─── AI stats ───────────────────────────────────────────────── */
.ai-stat-row{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:9px;background:var(--card);border:1px solid var(--border);font-size:12px}
.ai-stat-row + .ai-stat-row{margin-top:8px}
.ai-stat-label{color:var(--muted2);letter-spacing:-0.005em}
.ai-stat-value{font-weight:700;color:var(--white);font-variant-numeric:tabular-nums}

/* ─── Top client bars ────────────────────────────────────────── */
.top-row + .top-row{margin-top:14px}
.top-row-head{display:flex;align-items:center;justify-content:space-between;font-size:12px;margin-bottom:6px}
.top-row-name{color:var(--text);font-weight:500}
.top-row-value{color:var(--white);font-weight:700;font-variant-numeric:tabular-nums}
.top-bar{height:5px;border-radius:3px;background:rgba(255,255,255,0.05);overflow:hidden}
.top-bar-fill{height:100%;background:linear-gradient(90deg,var(--orange) 0%,var(--orange2) 100%);border-radius:3px}

/* ─── Recent actions ─────────────────────────────────────────── */
.action-row{display:flex;align-items:center;gap:11px;padding:9px 12px;border-radius:9px;transition:background 0.15s}
.action-row:hover{background:rgba(255,255,255,0.02)}
.action-row + .action-row{margin-top:4px}
.action-icon{width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.action-icon svg{width:13px;height:13px}
.action-green{background:rgba(255,77,0,0.12);color:var(--green)}
.action-red{background:rgba(122,122,122,0.12);color:#7A7A7A}
.action-orange{background:rgba(255,77,0,0.12);color:var(--orange2)}
.action-blue{background:rgba(168,168,168,0.12);color:#A8A8A8}
.action-body{flex:1;min-width:0}
.action-label{font-size:12px;color:var(--white);font-weight:500}
.action-target{font-size:11px;color:var(--muted);margin-top:1px}
.action-when{font-size:11px;color:var(--muted);flex-shrink:0}

/* ─── Layout grids ───────────────────────────────────────────── */
.row-2-1{display:grid;grid-template-columns:2fr 1fr;gap:16px}
.row-1-1{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.row-1-1-1{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.row-2-1-1{display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px}

/* ─── Modals (deferred render, no impact on first paint) ────── */
.modal{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:50;display:none;align-items:center;justify-content:center;padding:20px}
.modal.open{display:flex}
.modal-box{background:var(--surface);border:1px solid var(--border2);border-radius:18px;width:100%;max-width:760px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border)}
.modal-title{font-size:15px;font-weight:700;color:var(--white)}
.modal-sub{font-size:11px;color:var(--muted);margin-top:2px}
.modal-close{width:30px;height:30px;border-radius:8px;color:var(--muted);background:rgba(255,255,255,0.03);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s}
.modal-close:hover{color:var(--white);background:rgba(255,255,255,0.06)}
.modal-close svg{width:14px;height:14px}
.modal-body{padding:20px;overflow-y:auto;flex:1}
.modal-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}
.modal-kpi{padding:12px;border-radius:10px;background:var(--card);border:1px solid var(--border);text-align:center}
.modal-kpi .v{font-size:16px;font-weight:800;color:var(--white);letter-spacing:-0.02em}
.modal-kpi .l{font-size:10px;color:var(--muted);margin-top:4px;letter-spacing:0.05em;text-transform:uppercase}

/* ─── Responsive ─────────────────────────────────────────────── */
@media(max-width:1100px){
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
  .row-2-1,.row-1-1,.row-1-1-1,.row-2-1-1{grid-template-columns:1fr}
}
@media(max-width:780px){
  .sidebar{position:fixed;left:-260px;z-index:30;transition:left 0.25s}
  .sidebar.open{left:0;box-shadow:0 0 0 100vmax rgba(0,0,0,0.6)}
  .topbar{padding:14px 18px}
  .content{padding:18px 18px 40px}
  .modal-kpis{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>

<aside class="sidebar">
  <a href="/" class="sidebar-head" style="text-decoration:none">
    <div class="sidebar-head-text">
      <span class="brand">AdNova<span>.</span></span>
      <div class="sidebar-tag">Super Admin Console</div>
    </div>
  </a>

  <div class="sidebar-workspace" title="Super Admin workspace">
    <div class="sf-avatar">SA</div>
    <span class="sf-name">Super Admin</span>
    <span class="sf-status-dot"></span>
  </div>

  <nav class="nav-list">
    ${navHtml}
  </nav>

  <div class="sidebar-status">
    <div class="sidebar-status-head">
      <span class="sidebar-status-dot"></span>
      <span class="sidebar-status-label">Système OK</span>
    </div>
    <div class="sidebar-status-text">2,412 tenants · 47K campagnes</div>
    <div class="pbar"><div></div></div>
  </div>

  <div class="sidebar-foot">
    <div class="sf-avatar">SA</div>
    <div>
      <div class="sf-name">Super Admin</div>
      <div class="sf-role">Level 5</div>
    </div>
    <button class="sf-logout" onclick="adminLogout()" title="Sign out">${ICONS.signOut}</button>
  </div>
</aside>

<div class="main">
  <header class="topbar">
    <div>
      <h1>Platform overview</h1>
      <div class="topbar-sub">Real-time metrics across 2,412 tenants</div>
    </div>
    <div class="topbar-right">
      <button class="theme-toggle" onclick="toggleAdminTheme()" title="Dark / Light" aria-label="Toggle theme">
        <i id="admin-theme-icon" class="fas fa-moon"></i>
      </button>
      <span class="live-pill"><span class="live-dot"></span>Live</span>
      <a href="/" class="tbar-link">View landing →</a>
    </div>
  </header>

  <div class="content">

    <!-- KPI row 1 -->
    <div class="kpi-grid">
      ${kpiCard({ label: 'MRR Total',      value: '$1,847,200', delta: '+12.4%', icon: ICONS.dollar,   sub: '2,412 active tenants' })}
      ${kpiCard({ label: 'ARR Projected',  value: '$22.2M',     delta: '+14.1%', icon: ICONS.chart,    sub: 'vs last year' })}
      ${kpiCard({ label: 'Active tenants', value: '2,412',      delta: '+48 mo', icon: ICONS.building, sub: '94.2% retention' })}
      ${kpiCard({ label: 'Spend managed',  value: '$847M /mo',  delta: '+18.3%', icon: ICONS.bolt,     sub: 'all platforms' })}
    </div>

    <!-- KPI row 2 -->
    <div class="kpi-grid">
      ${kpiCard({ label: 'Campaigns',  value: '47,284',   delta: '+1,240', icon: ICONS.bullhorn, sub: 'across 9 platforms' })}
      ${kpiCard({ label: 'AI creatives', value: '12.8M', delta: '+84K /d', icon: ICONS.sparkles, sub: 'generated by AI' })}
      ${kpiCard({ label: 'Uptime',     value: '99.97%',  delta: 'SLA OK', icon: ICONS.server,   sub: 'last 30 days' })}
      ${kpiCard({ label: 'NPS Score',  value: '72',      delta: '+3 pts', icon: ICONS.star,     sub: 'Mar 2026 survey' })}
    </div>

    <!-- Charts row -->
    <div class="row-2-1">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>MRR &amp; new clients</h3>
            <div class="card-sub">Last 12 months</div>
          </div>
          <div class="legend">
            <span><span class="legend-dot" style="background:var(--orange)"></span>MRR</span>
            <span><span class="legend-dot" style="background:var(--white)"></span>New clients</span>
          </div>
        </div>
        <div class="mrr-chart">${mrrChartHtml()}</div>
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <h3>Plan distribution</h3>
            <div class="card-sub">2,412 tenants</div>
          </div>
        </div>
        <div class="plans-summary">
          <div style="background:#A8A8A8;width:51.4%"></div>
          <div style="background:var(--orange);width:37.0%"></div>
          <div style="background:#FF6B2B;width:9.7%"></div>
          <div style="background:var(--green);width:1.9%"></div>
        </div>
        <div class="plan-rows">
          ${planLegendRow('Starter', '1,240 tenants', '#A8A8A8', '$49/mo',  '$60.7K', 51.4)}
          ${planLegendRow('Pro',     '892 tenants',   '#FF4D00', '$149/mo', '$132.9K', 37.0)}
          ${planLegendRow('Agency',  '234 tenants',   '#FF6B2B', '$499/mo', '$116.8K', 9.7)}
          ${planLegendRow('Enterprise','46 tenants',   '#FF4D00', 'Custom',  '$504.0K', 1.9)}
        </div>
      </div>
    </div>

    <!-- Customers + alerts row -->
    <div class="row-2-1">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>New tenants (7 days)</h3>
            <div class="card-sub">Recent sign-ups across all plans</div>
          </div>
          <a href="/admin/tenants" class="card-link">View all ${ICONS.arrowRight}</a>
        </div>
        <table class="tbl">
          <thead>
            <tr>
              <th>Tenant</th><th>Plan</th><th style="text-align:right">Spend managed</th><th style="text-align:right">Avg ROAS</th><th>Status</th><th>Joined</th>
            </tr>
          </thead>
          <tbody>
            ${clientRow('Digital Storm Agency', 'Pro',        '$84,200',  '4.6×', 'active', 'Today',      'DS')}
            ${clientRow('NovaBrand Inc.',       'Starter',    '$12,400',  '3.8×', 'active', 'Yesterday',  'NB')}
            ${clientRow('FlashRetail Pro',      'Pro',        '$67,800',  '5.1×', 'active', '29 Mar',     'FR')}
            ${clientRow('Apex Marketing',       'Enterprise', '$312,000', '6.2×', 'active', '28 Mar',     'AM')}
            ${clientRow('Trendy Store',         'Trial',      '$0',       '—',    'trial',  '27 Mar',     'TS')}
            ${clientRow('SportNation',          'Starter',    '$9,100',   '2.9×', 'active', '26 Mar',     'SN')}
            ${clientRow('LuxoGroup',            'Agency',     '$148,500', '4.9×', 'active', '25 Mar',     'LG')}
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <h3>Active alerts</h3>
            <div class="card-sub">5 new in last hour</div>
          </div>
        </div>
        ${alertRow('critical', 'Critical', 'TechStart: budget overspent +40%', '12m')}
        ${alertRow('critical', 'Security', '3 suspicious login attempts',      '28m')}
        ${alertRow('warn',     'Expiring', 'Fashion Brand trial ends in 2d',   '1h')}
        ${alertRow('warn',     'Performance', 'AI Engine CPU at 87%',           '2h')}
        ${alertRow('warn',     'Billing',  'Promo Corp: payment failed',       '3h')}
        ${alertRow('info',     'Info',     'Digital Storm: plan upgraded to Pro', '4h')}
      </div>
    </div>

    <!-- AI stats + top clients + actions row -->
    <div class="row-1-1-1">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>AI global stats</h3>
            <div class="card-sub">Real-time agent activity</div>
          </div>
        </div>
        ${aiStatRow('Decisions / hour',      '487,240')}
        ${aiStatRow('Campaigns scaled (24h)','1,284')}
        ${aiStatRow('Creatives killed (24h)','8,472')}
        ${aiStatRow('Prediction accuracy',   '94.2%')}
        ${aiStatRow('Active models',         '12')}
        ${aiStatRow('GPUs in use',           '48 / 64')}
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <h3>Top 5 tenants (spend)</h3>
            <div class="card-sub">This month</div>
          </div>
        </div>
        ${topClientBar('Apex Marketing',  '$312K', 100)}
        ${topClientBar('Mega Retail Co.', '$284K', 91)}
        ${topClientBar('LuxoGroup',       '$148K', 47)}
        ${topClientBar('Digital Storm',   '$84K',  27)}
        ${topClientBar('FlashRetail Pro', '$68K',  22)}
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <h3>Recent admin actions</h3>
            <div class="card-sub">Audit trail</div>
          </div>
        </div>
        ${adminActionRow(ICONS.userPlus, 'brand',  'New tenant created',     'Digital Storm Agency',         '2m')}
        ${adminActionRow(ICONS.ban,      'slate',    'Tenant suspended',       'SpamCo — policy violation',    '18m')}
        ${adminActionRow(ICONS.refresh,  'slate',   'Plan upgraded',          'Apex Marketing → Enterprise',  '45m')}
        ${adminActionRow(ICONS.sliders,  'orange', 'AI config changed',      'Max scale: 10% → 15%',         '1h')}
        ${adminActionRow(ICONS.dollar,   'orange', 'Refund issued',          'Fashion Brand — €799',         '2h')}
        ${adminActionRow(ICONS.shield,   'slate',   'IP blocked',             '185.234.xx.xx',                '3h')}
      </div>
    </div>

  </div>
</div>

<script>
(function(){
  window.adminLogout = function(){
    try { localStorage.removeItem('adnova_admin_token'); } catch(e){}
    document.cookie = 'adnova_admin_token=; Path=/admin; Max-Age=0; SameSite=Strict';
    window.location.href = '/admin/login';
  };

  // Theme toggle (shared with admin shell pages)
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
})();
</script>
</body>
</html>`)
}
