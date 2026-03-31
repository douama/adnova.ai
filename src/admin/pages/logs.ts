import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminLogs = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
    <div>
      <h2 class="text-xl font-black text-white">Logs Système</h2>
      <p class="text-xs text-slate-500 mt-0.5">Flux en temps réel — <span id="total-events">284,820</span> événements aujourd'hui</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <select id="log-level-filter" onchange="filterLogs()" class="glass text-xs text-slate-300 px-3 py-2 rounded-lg border-0 outline-none bg-transparent cursor-pointer">
        <option value="">Tous niveaux</option>
        <option value="error">ERROR</option>
        <option value="warn">WARN</option>
        <option value="info">INFO</option>
        <option value="debug">DEBUG</option>
      </select>
      <select id="log-service-filter" onchange="filterLogs()" class="glass text-xs text-slate-300 px-3 py-2 rounded-lg border-0 outline-none bg-transparent cursor-pointer">
        <option value="">Tous services</option>
        <option value="api-gateway">api-gateway</option>
        <option value="ai-engine">ai-engine</option>
        <option value="billing">billing</option>
        <option value="auth">auth</option>
        <option value="campaigns">campaigns</option>
        <option value="creatives">creatives</option>
        <option value="platform-sync">platform-sync</option>
        <option value="payments">payments</option>
        <option value="system">system</option>
        <option value="security">security</option>
      </select>
      <button onclick="exportLogsCSV()" class="admin-glass text-xs px-4 py-2 rounded-lg text-orange-400 hover:bg-orange-500/10 transition-all border border-orange-500/20 flex items-center gap-1">
        <i class="fas fa-download mr-1"></i> Exporter CSV
      </button>
      <button onclick="toggleLiveMode()" id="live-mode-btn" class="admin-glass text-xs px-4 py-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-all border border-emerald-500/20 flex items-center gap-1.5">
        <div class="w-2 h-2 rounded-full bg-emerald-500 blink"></div> Live
      </button>
    </div>
  </div>

  <!-- Stats rapides -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${logStat('Erreurs (24h)', '127', 'red', 'fa-circle-xmark', 'log-stat-errors')}
    ${logStat('Warnings (24h)', '842', 'amber', 'fa-triangle-exclamation', 'log-stat-warns')}
    ${logStat('Info (24h)', '283,851', 'blue', 'fa-circle-info', 'log-stat-info')}
    ${logStat('Latence API moy.', '24ms', 'emerald', 'fa-bolt', 'log-stat-latency')}
  </div>

  <!-- Logs Table -->
  <div class="glass rounded-2xl overflow-hidden">
    <div class="p-4 border-b border-white/5 flex items-center gap-3 flex-wrap">
      <div class="flex items-center gap-2 flex-1 min-w-40">
        <i class="fas fa-search text-slate-600 text-xs"></i>
        <input placeholder="Filtrer les logs (message, tenant, IP...)" id="log-text-filter" oninput="filterLogs()"
          class="bg-transparent text-xs text-slate-300 outline-none placeholder-slate-600 flex-1"/>
      </div>
      <div class="flex items-center gap-3 text-xs text-slate-500">
        <span><span id="visible-count">18</span> / <span id="total-count">18</span> logs affichés</span>
        <div class="flex items-center gap-1.5" id="live-indicator">
          <div class="w-2 h-2 rounded-full bg-emerald-500 blink"></div>
          <span>Live</span>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs" id="logs-table">
        <thead>
          <tr class="bg-white/2 text-slate-600 border-b border-white/5">
            <th class="text-left px-4 py-3 font-semibold cursor-pointer hover:text-slate-400" onclick="sortLogs('level')">Niveau <i class="fas fa-sort text-xs ml-1"></i></th>
            <th class="text-left px-4 py-3 font-semibold cursor-pointer hover:text-slate-400" onclick="sortLogs('service')">Service <i class="fas fa-sort text-xs ml-1"></i></th>
            <th class="text-left px-4 py-3 font-semibold">Message</th>
            <th class="text-left px-4 py-3 font-semibold">Tenant</th>
            <th class="text-right px-4 py-3 font-semibold cursor-pointer hover:text-slate-400" onclick="sortLogs('time')">Timestamp <i class="fas fa-sort text-xs ml-1"></i></th>
          </tr>
        </thead>
        <tbody id="logs-tbody">
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
    <!-- Pagination -->
    <div class="p-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
      <span>Affichage des 18 derniers logs (sur 284,820 total)</span>
      <div class="flex items-center gap-2">
        <button id="prev-page-btn" onclick="changePage(-1)" class="px-3 py-1 glass rounded-lg hover:bg-white/5 text-slate-400 transition-all disabled:opacity-30">← Préc.</button>
        <span class="px-2 text-slate-400">Page <span id="current-page">1</span> / <span id="total-pages">5,697</span></span>
        <button id="next-page-btn" onclick="changePage(1)" class="px-3 py-1 glass rounded-lg hover:bg-white/5 text-slate-400 transition-all">Suiv. →</button>
        <select onchange="changePageSize(this.value)" class="glass rounded-lg px-2 py-1 text-xs text-slate-400 outline-none border-0 cursor-pointer bg-transparent">
          <option value="18">18/page</option>
          <option value="50">50/page</option>
          <option value="100">100/page</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Log Detail Modal (click on row) -->
  <div id="log-detail-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-lg animate-fadeIn" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-white flex items-center gap-2"><i class="fas fa-file-alt text-brand-400"></i> Log Detail</h2>
        <button onclick="closeLogDetail()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5">
        <div class="space-y-3" id="log-detail-content"></div>
      </div>
    </div>
  </div>

  <!-- Logs Toast -->
  <div id="logs-toast" class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"></div>

  <script>
  // ── All logs data (for filter/sort) ─────────────────────────────────────────
  const ALL_LOGS = [
    { level:'error', service:'api-gateway', message:'Rate limit exceeded — tenant T011', tenant:'TechStart Inc.', time:'09:58:12' },
    { level:'warn', service:'ai-engine', message:'GPU utilization above 85% threshold', tenant:'—', time:'09:47:33' },
    { level:'info', service:'billing', message:'Invoice generated — T004 — $799', tenant:'Digital Storm', time:'09:45:00' },
    { level:'error', service:'auth', message:'Failed login attempt — IP: 185.234.12.44 (3rd attempt)', tenant:'—', time:'09:32:11' },
    { level:'info', service:'campaigns', message:'Campaign auto-scaled +10% — T002 — Camp #8492 — ROAS 5.8x', tenant:'Mega Retail Co.', time:'09:28:45' },
    { level:'info', service:'creatives', message:'Creative killed — CTR 0.4% below threshold 0.8%', tenant:'LuxoGroup', time:'09:22:18' },
    { level:'info', service:'platform-sync', message:'Facebook token refreshed OK — T001', tenant:'Apex Marketing', time:'09:15:00' },
    { level:'error', service:'payments', message:'Stripe charge failed — T009 — card_declined', tenant:'Promo Corp', time:'08:54:21' },
    { level:'warn', service:'ai-engine', message:'Prediction model response > 50ms — queue depth 2847', tenant:'—', time:'08:48:12' },
    { level:'info', service:'auth', message:'New tenant registered — T004 Digital Storm Agency', tenant:'Digital Storm', time:'08:42:00' },
    { level:'info', service:'campaigns', message:'Campaign auto-scaled +10% — T001 — Camp #2841 — ROAS 6.2x', tenant:'Apex Marketing', time:'08:38:31' },
    { level:'error', service:'platform-sync', message:'TikTok token expired — T003 — refresh failed', tenant:'LuxoGroup', time:'08:22:44' },
    { level:'info', service:'billing', message:'Subscription renewed — T003 — $799 — Stripe OK', tenant:'LuxoGroup', time:'08:00:00' },
    { level:'warn', service:'api-gateway', message:'Slow response > 500ms — endpoint /api/campaigns', tenant:'—', time:'07:54:18' },
    { level:'info', service:'security', message:'IP 185.234.12.44 auto-blocked after 3 failed attempts', tenant:'—', time:'07:32:11' },
    { level:'info', service:'ai-engine', message:'Model PerformancePredictor v3.2 — daily recalibration complete', tenant:'—', time:'06:00:00' },
    { level:'info', service:'system', message:'Daily backup completed — 284GB — 00:00:48 duration', tenant:'—', time:'05:48:21' },
    { level:'info', service:'system', message:'System health check — all services OK — uptime 99.97%', tenant:'—', time:'05:00:00' },
  ];

  // ── Filter & update table ──────────────────────────────────────────────────
  function filterLogs() {
    const text = (document.getElementById('log-text-filter').value || '').toLowerCase();
    const level = document.getElementById('log-level-filter').value;
    const service = document.getElementById('log-service-filter').value;
    let visible = 0;
    document.querySelectorAll('#logs-tbody tr').forEach(row => {
      const t = row.textContent.toLowerCase();
      const rl = row.dataset.level || '';
      const rs = row.dataset.service || '';
      const matchText = !text || t.includes(text);
      const matchLevel = !level || rl === level;
      const matchService = !service || rs === service;
      const show = matchText && matchLevel && matchService;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const total = document.querySelectorAll('#logs-tbody tr').length;
    document.getElementById('visible-count').textContent = visible.toString();
    document.getElementById('total-count').textContent = total.toString();
  }

  // ── Sort ───────────────────────────────────────────────────────────────────
  let sortDir = {};
  function sortLogs(col) {
    sortDir[col] = !sortDir[col];
    const tbody = document.getElementById('logs-tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const idx = { level: 0, service: 1, time: 4 };
    const colIdx = idx[col] || 0;
    rows.sort((a, b) => {
      const va = a.querySelectorAll('td')[colIdx]?.textContent?.trim() || '';
      const vb = b.querySelectorAll('td')[colIdx]?.textContent?.trim() || '';
      return sortDir[col] ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    rows.forEach(r => tbody.appendChild(r));
  }

  // ── Log row click → detail modal ──────────────────────────────────────────
  function showLogDetail(level, service, message, tenant, time) {
    const levelColors = { error:'red', warn:'amber', info:'blue', debug:'slate' };
    const lc = levelColors[level] || 'slate';
    document.getElementById('log-detail-content').innerHTML = \`
      <div class="flex gap-2 flex-wrap">
        <span class="px-2 py-0.5 rounded text-xs font-bold uppercase bg-\${lc}-500/15 text-\${lc}-400">\${level}</span>
        <span class="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-400 font-mono">\${service}</span>
      </div>
      <div class="glass rounded-xl p-3">
        <div class="text-xs text-slate-500 mb-1">Message</div>
        <div class="text-sm text-slate-200 break-all">\${message}</div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="glass rounded-xl p-3">
          <div class="text-xs text-slate-500 mb-1">Tenant</div>
          <div class="text-sm text-slate-300">\${tenant}</div>
        </div>
        <div class="glass rounded-xl p-3">
          <div class="text-xs text-slate-500 mb-1">Timestamp</div>
          <div class="text-sm font-mono text-slate-300">\${time}</div>
        </div>
      </div>
      <div class="glass rounded-xl p-3">
        <div class="text-xs text-slate-500 mb-1">Trace ID</div>
        <div class="text-xs font-mono text-slate-500">trace_\${Math.random().toString(36).substring(2,12).toUpperCase()}</div>
      </div>
    \`;
    document.getElementById('log-detail-modal').classList.remove('hidden');
  }
  function closeLogDetail() { document.getElementById('log-detail-modal').classList.add('hidden'); }

  // ── Live mode ──────────────────────────────────────────────────────────────
  let liveMode = true;
  let liveInterval = null;
  const LIVE_SAMPLES = [
    ['info','campaigns','Campaign #9821 — ROAS check passed 4.2x','Apex Marketing'],
    ['warn','ai-engine','Creative queue depth: 142 pending generations','—'],
    ['info','auth','Session refreshed — user john@acmecorp.com','Acme Corp'],
    ['error','api-gateway','Timeout on /api/analytics — 5042ms','—'],
    ['info','billing','Auto-renewal notification sent — T007','FashionBrand'],
    ['info','platform-sync','Google Ads token refreshed — T002','Mega Retail Co.'],
  ];
  let sampleIdx = 0;
  function toggleLiveMode() {
    liveMode = !liveMode;
    const btn = document.getElementById('live-mode-btn');
    const indicator = document.getElementById('live-indicator');
    if (liveMode) {
      btn.className = btn.className.replace('text-slate-400 border-white/10','text-emerald-400 border-emerald-500/20');
      btn.innerHTML = '<div class="w-2 h-2 rounded-full bg-emerald-500 blink"></div> Live';
      indicator.style.opacity = '1';
      startLive();
    } else {
      btn.innerHTML = '<div class="w-2 h-2 rounded-full bg-slate-600"></div> Paused';
      indicator.style.opacity = '0.3';
      if (liveInterval) clearInterval(liveInterval);
    }
  }
  function startLive() {
    if (liveInterval) clearInterval(liveInterval);
    liveInterval = setInterval(() => {
      if (!liveMode) return;
      const sample = LIVE_SAMPLES[sampleIdx % LIVE_SAMPLES.length];
      sampleIdx++;
      const tbody = document.getElementById('logs-tbody');
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0') + ':' + now.getSeconds().toString().padStart(2,'0');
      const levelColors = { error:'red', warn:'amber', info:'blue', debug:'slate' };
      const lc = levelColors[sample[0]] || 'slate';
      const tr = document.createElement('tr');
      tr.className = 'table-row border-b border-white/5 hover:bg-white/3 cursor-pointer transition-all animate-fadeIn';
      tr.dataset.level = sample[0];
      tr.dataset.service = sample[1];
      tr.setAttribute('onclick', \`showLogDetail('\${sample[0]}','\${sample[1]}','\${sample[2]}','\${sample[3]}','\${timeStr}')\`);
      tr.innerHTML = \`
        <td class="px-4 py-2.5"><span class="px-2 py-0.5 rounded text-xs font-bold uppercase bg-\${lc}-500/15 text-\${lc}-400">\${sample[0]}</span></td>
        <td class="px-4 py-2.5"><span class="text-slate-400 font-mono text-xs">\${sample[1]}</span></td>
        <td class="px-4 py-2.5 text-slate-300 max-w-xs truncate">\${sample[2]}</td>
        <td class="px-4 py-2.5 text-slate-500">\${sample[3]}</td>
        <td class="px-4 py-2.5 text-right font-mono text-slate-600">\${timeStr}</td>
      \`;
      tbody.prepend(tr);
      // Remove excess rows
      const rows = tbody.querySelectorAll('tr');
      if (rows.length > 50) rows[rows.length-1].remove();
      // Update counter
      const total = document.getElementById('total-events');
      if (total) total.textContent = (parseInt(total.textContent.replace(/,/g,'')) + 1).toLocaleString();
    }, 4000);
  }
  startLive();

  // ── Pagination ─────────────────────────────────────────────────────────────
  let currentPage = 1;
  let pageSize = 18;
  function changePage(dir) {
    const total = parseInt(document.getElementById('total-pages').textContent.replace(/,/g,''));
    currentPage = Math.max(1, Math.min(total, currentPage + dir));
    document.getElementById('current-page').textContent = currentPage.toLocaleString();
    document.getElementById('prev-page-btn').disabled = currentPage <= 1;
    showLogsToast('Page ' + currentPage + ' chargée', 'brand');
  }
  function changePageSize(size) {
    pageSize = parseInt(size);
    const total = Math.ceil(284820 / pageSize);
    document.getElementById('total-pages').textContent = total.toLocaleString();
  }

  // ── Export CSV ─────────────────────────────────────────────────────────────
  function exportLogsCSV() {
    const level = document.getElementById('log-level-filter').value || 'ALL';
    const service = document.getElementById('log-service-filter').value || 'ALL';
    const filtered = ALL_LOGS.filter(l =>
      (!document.getElementById('log-level-filter').value || l.level === level) &&
      (!document.getElementById('log-service-filter').value || l.service === service)
    );
    const data = filtered.length ? filtered : ALL_LOGS;
    const header = 'Level,Service,Message,Tenant,Time';
    const rows = data.map(l => [l.level, l.service, '"' + l.message + '"', l.tenant, l.time].join(','));
    const csv = [header, ...rows].join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adnova-logs-' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    showLogsToast('Export CSV téléchargé (' + data.length + ' logs)', 'brand');
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showLogsToast(msg, color='brand') {
    const colors = { brand:'bg-orange-500/90', emerald:'bg-emerald-500/90', amber:'bg-amber-500/90', red:'bg-red-500/90' };
    const t = document.createElement('div');
    t.className = (colors[color]||colors.brand) + ' text-white text-xs px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm pointer-events-auto flex items-center gap-2 animate-fadeIn';
    t.innerHTML = '<i class="fas fa-check-circle"></i> ' + msg;
    document.getElementById('logs-toast').appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // Close modal on backdrop
  document.getElementById('log-detail-modal')?.addEventListener('click', function(e) {
    if (e.target === this) this.classList.add('hidden');
  });

  // Add click handlers to existing rows
  document.querySelectorAll('#logs-tbody tr').forEach(row => {
    row.classList.add('cursor-pointer', 'hover:bg-white/3');
    row.addEventListener('click', function() {
      const cells = this.querySelectorAll('td');
      const level = this.dataset.level || cells[0]?.textContent?.trim() || '';
      const service = cells[1]?.textContent?.trim() || '';
      const message = cells[2]?.textContent?.trim() || '';
      const tenant = cells[3]?.textContent?.trim() || '';
      const time = cells[4]?.textContent?.trim() || '';
      showLogDetail(level, service, message, tenant, time);
    });
  });
  </script>
  `
  return c.html(adminShell('Logs Système', content, '/admin/logs'))
}

function logStat(label: string, value: string, color: string, icon: string, id: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-9 h-9 rounded-xl bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas ${icon} text-${color}-400 text-sm"></i>
    </div>
    <div>
      <div class="text-lg font-black text-white" id="${id}">${value}</div>
      <div class="text-xs text-slate-500">${label}</div>
    </div>
  </div>`
}

function logRow(level: string, service: string, message: string, tenant: string, time: string): string {
  const levelColors: Record<string,string> = { error: 'red', warn: 'amber', info: 'blue', debug: 'slate' }
  const lc = levelColors[level] || 'slate'
  return `<tr class="table-row border-b border-white/5 hover:bg-white/3 transition-all cursor-pointer" data-level="${level}" data-service="${service}" onclick="showLogDetail('${level}','${service}','${message.replace(/'/g,"\\'")}','${tenant}','${time}')">
    <td class="px-4 py-2.5">
      <span class="px-2 py-0.5 rounded text-xs font-bold uppercase bg-${lc}-500/15 text-${lc}-400">${level}</span>
    </td>
    <td class="px-4 py-2.5"><span class="text-slate-400 font-mono text-xs">${service}</span></td>
    <td class="px-4 py-2.5 text-slate-300 max-w-xs truncate">${message}</td>
    <td class="px-4 py-2.5 text-slate-500">${tenant}</td>
    <td class="px-4 py-2.5 text-right font-mono text-slate-600">${time}</td>
  </tr>`
}
