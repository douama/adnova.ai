import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminDashboard = (c: Context) => {
  const content = `
  <!-- KPIs Globaux Plateforme -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${kpi('MRR Total', '$1,847,200', '+12.4%', 'fa-dollar-sign', 'from-orange-500 to-red-600', '2,400 clients actifs')}
    ${kpi('ARR Projeté', '$22.2M', '+14.1%', 'fa-chart-line', 'from-amber-500 to-orange-600', 'vs année précédente')}
    ${kpi('Clients Actifs', '2,412', '+48 ce mois', 'fa-building', 'from-blue-500 to-cyan-600', '94.2% rétention')}
    ${kpi('Spend géré/mois', '$847M', '+18.3%', 'fa-bolt', 'from-purple-500 to-pink-600', 'sur toutes plateformes')}
  </div>

  <!-- 2ème ligne KPIs -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${kpi('Campagnes actives', '47,284', '+1,240', 'fa-bullhorn', 'from-emerald-500 to-teal-600', 'sur 5 plateformes')}
    ${kpi('Créatifs générés', '12.8M', '+84K/j', 'fa-wand-magic-sparkles', 'from-violet-500 to-purple-600', 'par l\'IA AdNova')}
    ${kpi('Uptime système', '99.97%', 'SLA OK', 'fa-server', 'from-teal-500 to-emerald-600', 'derniers 30 jours')}
    ${kpi('NPS Score', '72', '+3 pts', 'fa-star', 'from-yellow-500 to-amber-600', 'enquête Mars 2026')}
  </div>

  <!-- Charts Row -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <!-- MRR Chart -->
    <div class="lg:col-span-2 glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">MRR & Nouveaux Clients</h3>
          <p class="text-xs text-slate-500">12 derniers mois</p>
        </div>
        <div class="flex items-center gap-3 text-xs">
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block"></span> MRR</span>
          <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span> Clients</span>
        </div>
      </div>
      <canvas id="mrrChart" height="180"></canvas>
    </div>
    <!-- Répartition Plans -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-1">Répartition Plans</h3>
      <p class="text-xs text-slate-500 mb-4">2,412 clients</p>
      <canvas id="plansChart" height="160"></canvas>
      <div class="space-y-2 mt-4">
        ${planLegend('Starter', '1,240 clients', '#6366f1', '$299/m', '37.1M')}
        ${planLegend('Growth', '892 clients', '#f97316', '$799/m', '71.3M')}
        ${planLegend('Enterprise', '280 clients', '#10b981', 'Custom', '56.0M')}
        ${planLegend('Trial', '—', '#94a3b8', 'Free', '—')}
      </div>
    </div>
  </div>

  <!-- Derniers clients + Alertes système -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <!-- Derniers Clients inscrits -->
    <div class="lg:col-span-2 glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Nouveaux Clients (7 jours)</h3>
        <a href="/admin/tenants" class="text-xs text-orange-400 hover:text-orange-300">Voir tous →</a>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="text-slate-600 border-b border-white/5">
              <th class="text-left pb-2 font-semibold">Client</th>
              <th class="text-left pb-2 font-semibold">Plan</th>
              <th class="text-right pb-2 font-semibold">Spend géré</th>
              <th class="text-right pb-2 font-semibold">ROAS moy.</th>
              <th class="text-right pb-2 font-semibold">Statut</th>
              <th class="text-right pb-2 font-semibold">Inscrit</th>
            </tr>
          </thead>
          <tbody>
            ${clientRow('Digital Storm Agency', 'Growth', '$84,200', '4.6x', 'active', 'Aujourd\'hui', 'DS')}
            ${clientRow('NovaBrand Inc.', 'Starter', '$12,400', '3.8x', 'active', 'Hier', 'NB')}
            ${clientRow('FlashRetail Pro', 'Growth', '$67,800', '5.1x', 'active', '29 mars', 'FR')}
            ${clientRow('Apex Marketing', 'Enterprise', '$312,000', '6.2x', 'active', '28 mars', 'AM')}
            ${clientRow('Trendy Store', 'Trial', '$0', '—', 'trial', '27 mars', 'TS')}
            ${clientRow('SportNation', 'Starter', '$9,100', '2.9x', 'active', '26 mars', 'SN')}
            ${clientRow('LuxoGroup', 'Growth', '$148,500', '4.9x', 'active', '25 mars', 'LG')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Alertes système -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Alertes Actives</h3>
        <span class="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">5 nouvelles</span>
      </div>
      <div class="space-y-2">
        ${alertItem('fa-triangle-exclamation', 'red', 'Critique', 'TechStart : dépassement budget +40%', '12min')}
        ${alertItem('fa-user-xmark', 'red', 'Sécurité', '3 tentatives connexion suspectes', '28min')}
        ${alertItem('fa-clock', 'amber', 'Expiration', 'Fashion Brand : essai expire dans 2j', '1h')}
        ${alertItem('fa-server', 'orange', 'Performance', 'CPU AI Engine à 87%', '2h')}
        ${alertItem('fa-credit-card', 'amber', 'Paiement', 'Promo Corp : paiement en échec', '3h')}
        ${alertItem('fa-check-circle', 'emerald', 'Info', 'Digital Storm : plan Growth activé', '4h')}
      </div>
    </div>
  </div>

  <!-- Métriques IA + Géographie -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Métriques IA Globales -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
          <i class="fas fa-brain text-orange-400 text-sm"></i>
        </div>
        <h3 class="font-bold text-white">IA — Stats Globales</h3>
      </div>
      <div class="space-y-3">
        ${aiGlobalStat('Décisions IA / heure', '487,240', 'orange')}
        ${aiGlobalStat('Campagnes scalées (24h)', '1,284', 'emerald')}
        ${aiGlobalStat('Créatifs tués (24h)', '8,472', 'red')}
        ${aiGlobalStat('Précision prédiction', '94.2%', 'blue')}
        ${aiGlobalStat('Modèles actifs', '12', 'purple')}
        ${aiGlobalStat('GPU utilisés', '48 / 64', 'amber')}
      </div>
    </div>

    <!-- Top Clients par Spend -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">Top 5 Clients (Spend)</h3>
      <div class="space-y-3">
        ${topClientBar('Apex Marketing', '$312K', 100, 'orange')}
        ${topClientBar('Mega Retail Co.', '$284K', 91, 'amber')}
        ${topClientBar('LuxoGroup', '$148K', 47, 'blue')}
        ${topClientBar('Digital Storm', '$84K', 27, 'purple')}
        ${topClientBar('FlashRetail Pro', '$68K', 22, 'emerald')}
      </div>
    </div>

    <!-- Activité récente -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">Actions Admin Récentes</h3>
      <div class="space-y-2">
        ${adminAction('user-plus', 'emerald', 'Nouveau compte créé', 'Digital Storm Agency', '2m')}
        ${adminAction('ban', 'red', 'Compte suspendu', 'SpamCo (violations)', '18m')}
        ${adminAction('arrows-rotate', 'blue', 'Plan mis à jour', 'Apex → Enterprise', '45m')}
        ${adminAction('sliders', 'orange', 'Config IA modifiée', 'Limite scale: 10% → 15%', '1h')}
        ${adminAction('dollar-sign', 'amber', 'Remboursement effectué', 'Fashion Brand — €799', '2h')}
        ${adminAction('shield-halved', 'purple', 'IP bloquée', '185.234.xx.xx', '3h')}
      </div>
    </div>
  </div>

  <script>
  // MRR Chart
  new Chart(document.getElementById('mrrChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Avr','Mai','Jui','Jul','Aoû','Sep','Oct','Nov','Déc','Jan','Fév','Mar'],
      datasets: [
        {
          label: 'MRR ($K)', type: 'bar',
          data: [980,1050,1120,1180,1240,1310,1400,1490,1580,1640,1730,1847],
          backgroundColor: 'rgba(249,115,22,0.4)', borderColor:'#f97316', borderWidth:1, borderRadius:4, yAxisID:'y'
        },
        {
          label: 'Nouveaux clients', type: 'line',
          data: [98,112,124,136,148,162,178,195,210,228,248,264],
          borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.1)', fill:true,
          tension:0.4, pointRadius:3, borderWidth:2, yAxisID:'y1'
        }
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{labels:{color:'#94a3b8',font:{size:10}}}},
      scales:{
        x:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#475569',font:{size:10}}},
        y:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#475569',font:{size:10},callback:v=>'$'+(v/1000).toFixed(0)+'K'},position:'left'},
        y1:{grid:{display:false},ticks:{color:'#3b82f6',font:{size:10}},position:'right'}
      }
    }
  });

  // Plans Donut
  new Chart(document.getElementById('plansChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels:['Starter','Growth','Enterprise','Trial'],
      datasets:[{
        data:[1240,892,280,198],
        backgroundColor:['rgba(99,102,241,0.8)','rgba(249,115,22,0.8)','rgba(16,185,129,0.8)','rgba(148,163,184,0.5)'],
        borderWidth:0, hoverOffset:4
      }]
    },
    options:{ responsive:true, maintainAspectRatio:false, cutout:'72%', plugins:{legend:{display:false}} }
  });
  </script>
  `
  return c.html(adminShell('Dashboard Super Admin', content, '/admin'))
}

// ─── Components ───────────────────────────────────────────────────────────
function kpi(label: string, value: string, change: string, icon: string, gradient: string, sub: string): string {
  const isPos = change.includes('+') || change.includes('OK')
  return `<div class="glass rounded-2xl p-4 card-hover">
    <div class="flex items-start justify-between mb-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0">
        <i class="fas ${icon} text-white text-sm"></i>
      </div>
      <span class="text-xs font-bold px-2 py-1 rounded-full ${isPos ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}">${change}</span>
    </div>
    <div class="text-xl font-black text-white leading-tight">${value}</div>
    <div class="text-xs font-semibold text-slate-400 mt-0.5">${label}</div>
    <div class="text-xs text-slate-600 mt-0.5">${sub}</div>
  </div>`
}

function planLegend(plan: string, clients: string, color: string, price: string, rev: string): string {
  return `<div class="flex items-center justify-between text-xs">
    <div class="flex items-center gap-2">
      <div class="w-2.5 h-2.5 rounded-full" style="background:${color}"></div>
      <span class="text-slate-400 font-medium">${plan}</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-slate-600">${clients}</span>
      <span class="text-slate-500">${price}</span>
    </div>
  </div>`
}

function clientRow(name: string, plan: string, spend: string, roas: string, status: string, date: string, abbr: string): string {
  const planColors: Record<string,string> = { Starter:'brand', Growth:'orange', Enterprise:'emerald', Trial:'slate' }
  const pc = planColors[plan] || 'slate'
  const st = status === 'active' ? 'badge-active' : status === 'trial' ? 'badge-trial' : 'badge-suspended'
  return `<tr class="table-row border-b border-white/5 transition-all cursor-pointer" onclick="window.location.href='/admin/tenants'">
    <td class="py-2.5">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center text-xs font-bold text-orange-300">${abbr}</div>
        <span class="font-medium text-slate-200">${name}</span>
      </div>
    </td>
    <td class="py-2.5"><span class="px-2 py-0.5 rounded-full text-xs bg-${pc}-500/15 text-${pc}-400 font-semibold">${plan}</span></td>
    <td class="py-2.5 text-right font-semibold text-emerald-400">${spend}</td>
    <td class="py-2.5 text-right text-blue-400 font-bold">${roas}</td>
    <td class="py-2.5 text-right"><span class="${st} text-xs px-2 py-0.5 rounded-full capitalize">${status === 'active' ? 'Actif' : status === 'trial' ? 'Essai' : 'Suspendu'}</span></td>
    <td class="py-2.5 text-right text-slate-600">${date}</td>
  </tr>`
}

function alertItem(icon: string, color: string, badge: string, text: string, time: string): string {
  return `<div class="flex items-start gap-2.5 p-2.5 glass rounded-xl hover:bg-white/3 transition-all cursor-pointer">
    <div class="w-7 h-7 rounded-lg bg-${color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
      <i class="fas fa-${icon} text-${color}-400 text-xs"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1.5 mb-0.5">
        <span class="text-xs font-bold text-${color}-400">${badge}</span>
      </div>
      <p class="text-xs text-slate-400 leading-snug">${text}</p>
      <p class="text-xs text-slate-700 mt-0.5">${time}</p>
    </div>
  </div>`
}

function aiGlobalStat(label: string, value: string, color: string): string {
  return `<div class="flex items-center justify-between py-1.5 border-b border-white/5">
    <span class="text-xs text-slate-500">${label}</span>
    <span class="text-xs font-bold text-${color}-400">${value}</span>
  </div>`
}

function topClientBar(name: string, spend: string, pct: number, color: string): string {
  return `<div>
    <div class="flex items-center justify-between mb-1">
      <span class="text-xs text-slate-400">${name}</span>
      <span class="text-xs font-bold text-${color}-400">${spend}</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill bg-gradient-to-r from-${color}-600 to-${color}-400" style="width:${pct}%"></div>
    </div>
  </div>`
}

function adminAction(icon: string, color: string, action: string, detail: string, time: string): string {
  return `<div class="flex items-start gap-2.5 py-2 border-b border-white/5">
    <div class="w-6 h-6 rounded-md bg-${color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
      <i class="fas fa-${icon} text-${color}-400 text-xs"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-slate-300">${action}</div>
      <div class="text-xs text-slate-600 truncate">${detail}</div>
    </div>
    <span class="text-xs text-slate-700 flex-shrink-0">${time}</span>
  </div>`
}
