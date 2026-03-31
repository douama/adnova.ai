import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminLogs = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-black text-white">Logs Système</h2>
      <p class="text-xs text-slate-500 mt-0.5">Flux en temps réel — 284,820 événements aujourd'hui</p>
    </div>
    <div class="flex items-center gap-3">
      <select class="glass text-xs text-slate-300 px-3 py-2 rounded-lg border-0 outline-none bg-transparent cursor-pointer">
        <option>Tous niveaux</option><option>ERROR</option><option>WARN</option><option>INFO</option>
      </select>
      <select class="glass text-xs text-slate-300 px-3 py-2 rounded-lg border-0 outline-none bg-transparent cursor-pointer">
        <option>Tous services</option><option>api-gateway</option><option>ai-engine</option><option>billing</option><option>auth</option>
      </select>
      <button class="admin-glass text-xs px-4 py-2 rounded-lg text-orange-400 hover:bg-orange-500/10 transition-all border border-orange-500/20">
        <i class="fas fa-download mr-1.5"></i> Exporter
      </button>
    </div>
  </div>

  <!-- Stats rapides -->
  <div class="grid grid-cols-4 gap-4 mb-6">
    ${logStat('Erreurs (24h)', '127', 'red', 'fa-circle-xmark')}
    ${logStat('Warnings (24h)', '842', 'amber', 'fa-triangle-exclamation')}
    ${logStat('Info (24h)', '283,851', 'blue', 'fa-circle-info')}
    ${logStat('Latence API moy.', '24ms', 'emerald', 'fa-bolt')}
  </div>

  <!-- Logs Table -->
  <div class="glass rounded-2xl overflow-hidden">
    <div class="p-4 border-b border-white/5 flex items-center gap-3">
      <div class="flex items-center gap-2 flex-1">
        <i class="fas fa-search text-slate-600 text-xs"></i>
        <input placeholder="Filtrer les logs..." class="bg-transparent text-xs text-slate-300 outline-none placeholder-slate-600 flex-1" id="log-filter"/>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 rounded-full bg-red-500 blink"></div>
        <span class="text-xs text-slate-500">Live</span>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs" id="logs-table">
        <thead>
          <tr class="bg-white/2 text-slate-600 border-b border-white/5">
            <th class="text-left px-4 py-3 font-semibold">Niveau</th>
            <th class="text-left px-4 py-3 font-semibold">Service</th>
            <th class="text-left px-4 py-3 font-semibold">Message</th>
            <th class="text-left px-4 py-3 font-semibold">Tenant</th>
            <th class="text-right px-4 py-3 font-semibold">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          ${logRow('error', 'api-gateway', 'Rate limit exceeded — tenant T011', 'TechStart Inc.', '09:58:12')}
          ${logRow('warn', 'ai-engine', 'GPU utilization above 85% threshold', '—', '09:47:33')}
          ${logRow('info', 'billing', 'Invoice generated — T004 — $799', 'Digital Storm', '09:45:00')}
          ${logRow('error', 'auth', 'Failed login attempt — IP: 185.234.12.44 (3rd attempt)', '—', '09:32:11')}
          ${logRow('info', 'campaigns', 'Campaign auto-scaled +10% — T002 — Camp #8492 — ROAS 5.8x', 'Mega Retail Co.', '09:28:45')}
          ${logRow('info', 'creatives', 'Creative killed — CTR 0.4% below threshold 0.8%', 'LuxoGroup', '09:22:18')}
          ${logRow('info', 'platform-sync', 'Facebook token refreshed OK — T001', 'Apex Marketing', '09:15:00')}
          ${logRow('error', 'payments', 'Stripe charge failed — T009 — card_declined', 'Promo Corp', '08:54:21')}
          ${logRow('warn', 'ai-engine', 'Prediction model response > 50ms — queue depth 2847', '—', '08:48:12')}
          ${logRow('info', 'auth', 'New tenant registered — T004 Digital Storm Agency', 'Digital Storm', '08:42:00')}
          ${logRow('info', 'campaigns', 'Campaign auto-scaled +10% — T001 — Camp #2841 — ROAS 6.2x', 'Apex Marketing', '08:38:31')}
          ${logRow('error', 'platform-sync', 'TikTok token expired — T003 — refresh failed', 'LuxoGroup', '08:22:44')}
          ${logRow('info', 'billing', 'Subscription renewed — T003 — $799 — Stripe OK', 'LuxoGroup', '08:00:00')}
          ${logRow('warn', 'api-gateway', 'Slow response > 500ms — endpoint /api/campaigns', '—', '07:54:18')}
          ${logRow('info', 'security', 'IP 185.234.12.44 auto-blocked after 3 failed attempts', '—', '07:32:11')}
          ${logRow('info', 'ai-engine', 'Model PerformancePredictor v3.2 — daily recalibration complete', '—', '06:00:00')}
          ${logRow('info', 'system', 'Daily backup completed — 284GB — 00:00:48 duration', '—', '05:48:21')}
          ${logRow('info', 'system', 'System health check — all services OK — uptime 99.97%', '—', '05:00:00')}
        </tbody>
      </table>
    </div>
    <div class="p-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-600">
      <span>Affichage 18 sur 284,820 logs</span>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 glass rounded-lg hover:bg-white/5 text-slate-400">← Préc.</button>
        <span class="px-2">1 / 5,697</span>
        <button class="px-3 py-1 glass rounded-lg hover:bg-white/5 text-slate-400">Suiv. →</button>
      </div>
    </div>
  </div>

  <script>
  document.getElementById('log-filter')?.addEventListener('input', function() {
    const val = this.value.toLowerCase();
    document.querySelectorAll('#logs-table tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(val) ? '' : 'none';
    });
  });
  </script>
  `
  return c.html(adminShell('Logs Système', content, '/admin/logs'))
}

function logStat(label: string, value: string, color: string, icon: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-9 h-9 rounded-xl bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas ${icon} text-${color}-400 text-sm"></i>
    </div>
    <div>
      <div class="text-lg font-black text-white">${value}</div>
      <div class="text-xs text-slate-500">${label}</div>
    </div>
  </div>`
}

function logRow(level: string, service: string, message: string, tenant: string, time: string): string {
  const levelColors: Record<string,string> = { error: 'red', warn: 'amber', info: 'blue', debug: 'slate' }
  const lc = levelColors[level] || 'slate'
  return `<tr class="table-row border-b border-white/5">
    <td class="px-4 py-2.5">
      <span class="px-2 py-0.5 rounded text-xs font-bold uppercase bg-${lc}-500/15 text-${lc}-400">${level}</span>
    </td>
    <td class="px-4 py-2.5"><span class="text-slate-400 font-mono text-xs">${service}</span></td>
    <td class="px-4 py-2.5 text-slate-300 max-w-xs truncate">${message}</td>
    <td class="px-4 py-2.5 text-slate-500">${tenant}</td>
    <td class="px-4 py-2.5 text-right font-mono text-slate-600">${time}</td>
  </tr>`
}
