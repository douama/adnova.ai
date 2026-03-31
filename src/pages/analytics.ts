
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderAnalytics(lang: Lang = 'en'): string {
  const content = `
  <!-- Date Range + Export -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
    <div class="flex items-center gap-1.5 flex-wrap">
      ${dateBtn('Today', false, '1d')}
      ${dateBtn('7D', false, '7d')}
      ${dateBtn('30D', true, '30d')}
      ${dateBtn('90D', false, '90d')}
      <button onclick="openCustomDateModal()" class="glass hover:bg-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-400 transition-all">
        <i class="fas fa-calendar mr-1"></i>Custom
      </button>
    </div>
    <div class="flex items-center gap-2">
      <select id="platform-filter" onchange="filterByPlatform(this.value)" class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 bg-transparent cursor-pointer">
        <option value="">All Platforms</option>
        <option value="Facebook">Facebook</option>
        <option value="Google">Google</option>
        <option value="Instagram">Instagram</option>
        <option value="TikTok">TikTok</option>
        <option value="Snapchat">Snapchat</option>
      </select>
      <button onclick="exportCSV()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all">
        <i class="fas fa-file-csv text-xs"></i> CSV
      </button>
      <button onclick="exportPDF()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all">
        <i class="fas fa-file-pdf text-xs text-red-400"></i> PDF
      </button>
    </div>
  </div>
  <div class="text-xs text-slate-500 mb-4" id="date-range-label">Période: <span class="text-slate-300 font-semibold">30 derniers jours</span> · Mis à jour: <span class="text-brand-400" id="last-updated"></span></div>

  <!-- Top KPIs -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${analyticsKPI('Total Revenue', '$601,225', '+24.3%', 'fa-dollar-sign', 'emerald', 'vs last period')}
    ${analyticsKPI('Total Ad Spend', '$124,850', '+18.4%', 'fa-credit-card', 'brand', 'vs last period')}
    ${analyticsKPI('Blended ROAS', '4.82x', '+0.6x', 'fa-chart-line', 'blue', 'revenue/spend')}
    ${analyticsKPI('Total Conversions', '8,294', '+22.1%', 'fa-check-circle', 'amber', 'all platforms')}
  </div>

  <!-- Charts Row -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- ROAS Over Time -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">ROAS Over Time</h3>
        <span class="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-full">↑ 14.2%</span>
      </div>
      <canvas id="roasChart" height="200"></canvas>
    </div>
    <!-- CPA Trend -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Cost Per Acquisition</h3>
        <span class="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-full">↓ 8.6%</span>
      </div>
      <canvas id="cpaChart" height="200"></canvas>
    </div>
  </div>

  <!-- Full Width Funnel -->
  <div class="glass rounded-2xl p-5 mb-6">
    <h3 class="font-bold text-white mb-4">Conversion Funnel — All Platforms</h3>
    <div class="grid grid-cols-5 gap-3">
      ${funnelStep('Impressions', '2.4M', '100%', 'brand', true)}
      ${funnelStep('Clicks', '72,340', '3.01%', 'blue', true)}
      ${funnelStep('Landing Page', '58,872', '81.4%', 'purple', true)}
      ${funnelStep('Add to Cart', '18,438', '31.3%', 'amber', true)}
      ${funnelStep('Purchase', '8,294', '45.0%', 'emerald', false)}
    </div>
  </div>

  <!-- Platform Breakdown Table -->
  <div class="glass rounded-2xl p-5 mb-6">
    <h3 class="font-bold text-white mb-4">Platform Performance Breakdown</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-xs text-slate-500 border-b border-white/5">
            <th class="text-left pb-3">Platform</th>
            <th class="text-right pb-3">Spend</th>
            <th class="text-right pb-3">Revenue</th>
            <th class="text-right pb-3">ROAS</th>
            <th class="text-right pb-3">CPC</th>
            <th class="text-right pb-3">CTR</th>
            <th class="text-right pb-3">Conversions</th>
            <th class="text-right pb-3">CPA</th>
            <th class="text-left pb-3 pl-4">Trend</th>
          </tr>
        </thead>
        <tbody id="platform-table-body">
          ${platformRow('Facebook', 'fab fa-facebook', '#1877F2', '$42,350', '$173,635', '4.10x', '$0.84', '3.1%', '3,420', '$12.38', [3.8,3.9,4.0,4.2,4.1,4.3,4.1])}
          ${platformRow('Google', 'fab fa-google', '#4285F4', '$35,100', '$182,520', '5.20x', '$1.12', '4.8%', '2,810', '$12.49', [4.8,5.0,4.9,5.1,5.3,5.2,5.2])}
          ${platformRow('Instagram', 'fab fa-instagram', '#E1306C', '$25,200', '$95,760', '3.80x', '$0.71', '2.7%', '1,402', '$17.97', [3.4,3.6,3.8,3.7,3.9,3.8,3.8])}
          ${platformRow('TikTok', 'fab fa-tiktok', '#010101', '$15,400', '$70,840', '4.60x', '$0.43', '8.2%', '418', '$36.84', [4.0,4.2,4.4,4.5,4.6,4.7,4.6])}
          ${platformRow('Snapchat', 'fab fa-snapchat', '#FFFC00', '$6,800', '$14,280', '2.10x', '$0.36', '1.9%', '244', '$27.87', [2.2,2.0,1.9,2.1,2.0,1.8,2.1])}
        </tbody>
      </table>
    </div>
  </div>

  <!-- AI Insights -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center gap-2 mb-4">
      <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
        <i class="fas fa-brain text-brand-400 text-sm"></i>
      </div>
      <h3 class="font-bold text-white">AI Analytics Insights</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${insightCard('fa-arrow-trend-up', 'emerald', 'Growth Opportunity', 'TikTok ROAS trending up 18% — increase budget by $5K/day predicted to yield +$23K revenue this week.')}
      ${insightCard('fa-triangle-exclamation', 'amber', 'Budget Alert', 'Google CPC increased 12% this week. AI recommends shifting 15% of budget to Instagram for better ROAS.')}
      ${insightCard('fa-lightbulb', 'purple', 'Creative Insight', 'Video creatives outperforming static by 2.8x CTR. Recommend converting 4 top static ads to video format.')}
    </div>
  </div>

  <script>
  // ROAS Chart
  new Chart(document.getElementById('roasChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['W1','W2','W3','W4','W5','W6','W7','W8'],
      datasets: [{
        label: 'Blended ROAS', data: [3.8, 4.0, 4.1, 3.9, 4.3, 4.5, 4.7, 4.82],
        borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.15)', fill: true,
        tension: 0.4, pointRadius: 4, borderWidth: 2.5, pointBackgroundColor: '#6366f1'
      },{
        label: 'Target ROAS', data: [3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5],
        borderColor: '#ef4444', borderDash: [6,4], borderWidth: 1.5, pointRadius: 0, fill: false
      }]
    },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 10 }, callback: v => v + 'x' } }
      }
    }
  });
  // CPA Chart
  new Chart(document.getElementById('cpaChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['FB','Google','IG','TikTok','Snap'],
      datasets: [{
        label: 'CPA ($)', data: [12.38, 12.49, 17.97, 36.84, 27.87],
        backgroundColor: ['rgba(24,119,242,0.6)','rgba(66,133,244,0.6)','rgba(225,48,108,0.6)','rgba(255,0,80,0.6)','rgba(255,252,0,0.6)'],
        borderRadius: 6, borderWidth: 0
      }]
    },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 10 }, callback: v => '$' + v } }
      }
    }
  });
  // Date range init
  document.getElementById('last-updated').textContent = new Date().toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'})

  // Date buttons
  document.querySelectorAll('.date-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.date-btn').forEach(b => {
        b.className = b.className.replace('bg-brand-600/30 text-brand-400','').replace('  ',' ') + ' text-slate-400'
      })
      this.className = this.className.replace('text-slate-400','') + ' bg-brand-600/30 text-brand-400'
      const range = this.dataset.range
      const labels = { '1d': "Aujourd'hui", '7d': '7 derniers jours', '30d': '30 derniers jours', '90d': '90 derniers jours' }
      document.querySelector('#date-range-label span').textContent = labels[range] || range
      updateChartsForRange(range)
    })
  })

  function updateChartsForRange(range) {
    const dataMap = {
      '1d': { roas:[4.5,4.6,4.7,4.8,4.9,4.8,4.82], labels:['00h','04h','08h','12h','16h','20h','Now'] },
      '7d': { roas:[4.2,4.4,4.3,4.6,4.7,4.9,4.82], labels:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'] },
      '30d': { roas:[3.8,4.0,4.1,3.9,4.3,4.5,4.7,4.82], labels:['S1','S2','S3','S4','S5','S6','S7','S8'] },
      '90d': { roas:[3.2,3.5,3.8,4.0,4.1,4.3,4.5,4.7,4.82], labels:['M1','M2','M3','M4','M5','M6','M7','M8','M9'] }
    }
    const d = dataMap[range] || dataMap['30d']
    if(window.roasChartInst) {
      window.roasChartInst.data.labels = d.labels
      window.roasChartInst.data.datasets[0].data = d.roas
      window.roasChartInst.update()
    }
  }

  // Store chart instances for updates
  const roasCtx = document.getElementById('roasChart')?.getContext('2d')
  if(roasCtx && window.roasChartInst) { window.roasChartInst.destroy() }
  if(roasCtx) window.roasChartInst = Chart.getChart('roasChart') || null

  function filterByPlatform(platform) {
    document.querySelectorAll('#platform-table-body tr').forEach(row => {
      row.style.display = !platform || row.dataset.platform === platform ? '' : 'none'
    })
  }

  function exportCSV() {
    const rows = [['Platform','Spend','Revenue','ROAS','CTR','Conversions']]
    document.querySelectorAll('#platform-table-body tr:not([style*=none])').forEach(row => {
      const cells = [...row.querySelectorAll('td')].map(td => td.textContent.trim())
      if(cells.length > 1) rows.push(cells)
    })
    const csv = rows.map(r => r.join(',')).join('\\n')
    const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv)
    a.download = 'adnova-analytics-' + new Date().toISOString().slice(0,10) + '.csv'; a.click()
    showToast('✓ Export CSV téléchargé', 'success')
  }

  function exportPDF() {
    showToast('⏳ Génération du rapport PDF...', 'info')
    setTimeout(() => showToast('✓ Rapport PDF envoyé par email', 'success'), 1800)
  }

  function openCustomDateModal() {
    const start = prompt('Date de début (YYYY-MM-DD):', new Date(Date.now()-30*864e5).toISOString().slice(0,10))
    if(!start) return
    const end = prompt('Date de fin (YYYY-MM-DD):', new Date().toISOString().slice(0,10))
    if(!end) return
    document.querySelector('#date-range-label span').textContent = start + ' → ' + end
    showToast('✓ Période personnalisée appliquée', 'success')
  }

  function showToast(msg, type) {
    const colors = { success:'bg-emerald-500/20 border-emerald-500/30 text-emerald-300', error:'bg-red-500/20 border-red-500/30 text-red-300', info:'bg-brand-500/20 border-brand-500/30 text-brand-300' }
    const t = document.createElement('div')
    t.className = 'fixed bottom-5 right-5 z-[9999] px-4 py-3 rounded-xl border text-sm font-semibold backdrop-blur-xl ' + (colors[type]||colors.success)
    t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(),3000)
  }
  </script>
  `
  return shell('Analytics', content, '/analytics', lang)
}

function dateBtn(label: string, active: boolean = false, range: string = ''): string {
  return `<button data-range="${range}" class="date-btn glass hover:bg-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${active ? 'bg-brand-600/30 text-brand-400' : 'text-slate-400'}">${label}</button>`
}

function analyticsKPI(label: string, value: string, change: string, icon: string, color: string, sub: string): string {
  const pos = change.startsWith('+') || change.startsWith('↑')
  return `<div class="glass rounded-2xl p-5">
    <div class="flex items-start justify-between mb-3">
      <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center">
        <i class="fas ${icon} text-${color}-400"></i>
      </div>
      <span class="text-xs font-bold ${pos ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'} px-2 py-1 rounded-full">${change}</span>
    </div>
    <div class="text-2xl font-black text-white">${value}</div>
    <div class="text-sm text-slate-400 mt-0.5">${label}</div>
    <div class="text-xs text-slate-600 mt-1">${sub}</div>
  </div>`
}

function funnelStep(label: string, value: string, rate: string, color: string, arrow: boolean): string {
  return `<div class="flex items-center gap-2">
    <div class="flex-1 glass rounded-xl p-4 text-center">
      <div class="text-xs text-slate-500 mb-1">${label}</div>
      <div class="text-xl font-black text-white">${value}</div>
      <div class="text-xs text-${color}-400 font-semibold mt-1">${rate}</div>
    </div>
    ${arrow ? '<i class="fas fa-chevron-right text-slate-700 flex-shrink-0"></i>' : ''}
  </div>`
}

function platformRow(name: string, icon: string, color: string, spend: string, rev: string, roas: string, cpc: string, ctr: string, conv: string, cpa: string, trend: number[]): string {
  const roasNum = parseFloat(roas)
  const roasColor = roasNum >= 4.5 ? 'text-emerald-400' : roasNum >= 3.5 ? 'text-blue-400' : 'text-amber-400'
  const trendUp = trend[trend.length - 1] >= trend[0]
  return `<tr class="border-b border-white/5 hover:bg-white/3 transition-all" data-platform="${name}">
    <td class="py-3">
      <div class="flex items-center gap-2">
        <i class="${icon} text-sm" style="color:${color}"></i>
        <span class="font-medium text-slate-200">${name}</span>
      </div>
    </td>
    <td class="py-3 text-right text-slate-400">${spend}</td>
    <td class="py-3 text-right font-semibold text-emerald-400">${rev}</td>
    <td class="py-3 text-right font-bold ${roasColor}">${roas}</td>
    <td class="py-3 text-right text-slate-400">${cpc}</td>
    <td class="py-3 text-right text-slate-400">${ctr}</td>
    <td class="py-3 text-right text-slate-300">${conv}</td>
    <td class="py-3 text-right text-slate-400">${cpa}</td>
    <td class="py-3 pl-4">
      <span class="text-xs ${trendUp ? 'text-emerald-400' : 'text-red-400'}">
        <i class="fas fa-arrow-${trendUp ? 'up' : 'down'} mr-1"></i>${trendUp ? '+' : ''}${((trend[trend.length-1] - trend[0]) / trend[0] * 100).toFixed(1)}%
      </span>
    </td>
  </tr>`
}

function insightCard(icon: string, color: string, title: string, text: string): string {
  return `<div class="glass rounded-xl p-4 border border-${color}-500/10">
    <div class="flex items-center gap-2 mb-2">
      <i class="fas ${icon} text-${color}-400"></i>
      <span class="text-sm font-semibold text-white">${title}</span>
    </div>
    <p class="text-xs text-slate-400 leading-relaxed">${text}</p>
  </div>`
}
