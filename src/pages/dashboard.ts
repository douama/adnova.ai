import type { Context } from 'hono'
import { shell } from '../lib/layout'

export const renderDashboard = (c: Context) => {
  const content = `
  <!-- KPI Cards Row -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${kpiCard('Total Ad Spend', '$124,850', '+18.4%', 'fa-dollar-sign', 'from-brand-500 to-purple-600', 'This month across all platforms')}
    ${kpiCard('Blended ROAS', '4.82x', '+0.6x', 'fa-chart-line', 'from-emerald-500 to-teal-600', 'Revenue per dollar spent')}
    ${kpiCard('Active Campaigns', '47', '+3', 'fa-bullhorn', 'from-blue-500 to-cyan-600', '12 scaling · 35 running')}
    ${kpiCard('Conversions', '8,294', '+22.1%', 'fa-check-circle', 'from-amber-500 to-orange-600', 'Last 30 days')}
  </div>

  <!-- Charts Row -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <!-- Main Revenue Chart -->
    <div class="lg:col-span-2 glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">Revenue & Ad Spend</h3>
          <p class="text-xs text-slate-500 mt-0.5">Last 30 days — all platforms</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="chart-tab active-tab text-xs px-3 py-1.5 rounded-lg font-medium transition-all" onclick="setChartRange('30d',this)">30D</button>
          <button class="chart-tab text-xs px-3 py-1.5 rounded-lg font-medium transition-all" onclick="setChartRange('7d',this)">7D</button>
          <button class="chart-tab text-xs px-3 py-1.5 rounded-lg font-medium transition-all" onclick="setChartRange('90d',this)">90D</button>
        </div>
      </div>
      <canvas id="revenueChart" height="180"></canvas>
    </div>

    <!-- Platform Breakdown Donut -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">Platform Split</h3>
          <p class="text-xs text-slate-500 mt-0.5">Spend distribution</p>
        </div>
      </div>
      <canvas id="platformChart" height="160"></canvas>
      <div class="space-y-2 mt-4">
        ${platformLegend('Facebook', '34%', '#1877F2')}
        ${platformLegend('Google', '28%', '#4285F4')}
        ${platformLegend('Instagram', '20%', '#E1306C')}
        ${platformLegend('TikTok', '12%', '#ff0050')}
        ${platformLegend('Snapchat', '6%', '#FFFC00')}
      </div>
    </div>
  </div>

  <!-- AI Actions + Platform Status Row -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <!-- AI Recent Actions -->
    <div class="lg:col-span-2 glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-brain text-white text-xs"></i>
          </div>
          <div>
            <h3 class="font-bold text-white">AI Activity Feed</h3>
            <p class="text-xs text-slate-500">Real-time optimization actions</p>
          </div>
        </div>
        <span class="badge-live text-xs px-2 py-1 rounded-full font-semibold">LIVE</span>
      </div>
      <div class="space-y-2" id="ai-feed">
        ${aiAction('arrow-trend-up', 'emerald', '"Summer Collection" budget scaled +10% — ROAS hit 5.2x threshold', '2m ago', 'Scale')}
        ${aiAction('scissors', 'red', 'Killed 2 TikTok creatives — CTR 0.31% below 0.8% kill threshold', '8m ago', 'Kill')}
        ${aiAction('wand-magic-sparkles', 'purple', 'Generated 4 new AI video variants for "Product Launch" campaign', '15m ago', 'Create')}
        ${aiAction('bullseye', 'blue', 'Expanded Facebook audience from 1% to 3% lookalike — reach +2.1M', '23m ago', 'Audience')}
        ${aiAction('dollar-sign', 'amber', 'Reallocated $1,200 from FB to Google — predicted +23% ROAS lift', '31m ago', 'Budget')}
        ${aiAction('chart-line', 'cyan', 'A/B test concluded: Creative B wins with 34% better CTR', '45m ago', 'Test')}
      </div>
    </div>

    <!-- Platform Status -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">Platform Status</h3>
      <div class="space-y-3">
        ${platformStatus('Facebook Ads', 'fab fa-facebook', '#1877F2', 'Connected', '$42,350', '4.1x ROAS', true)}
        ${platformStatus('Google Ads', 'fab fa-google', '#4285F4', 'Connected', '$35,100', '5.2x ROAS', true)}
        ${platformStatus('Instagram', 'fab fa-instagram', '#E1306C', 'Connected', '$25,200', '3.8x ROAS', true)}
        ${platformStatus('TikTok', 'fab fa-tiktok', '#010101', 'Connected', '$15,400', '4.6x ROAS', true)}
        ${platformStatus('Snapchat', 'fab fa-snapchat', '#FFFC00', 'Warning', '$6,800', '2.1x ROAS', false)}
      </div>
      <button onclick="window.location.href='/platforms'" class="w-full mt-4 glass hover:bg-white/10 text-slate-400 text-xs py-2 rounded-lg transition-all">
        Manage Connections →
      </button>
    </div>
  </div>

  <!-- Top Campaigns Table -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-bold text-white">Top Performing Campaigns</h3>
        <p class="text-xs text-slate-500">Sorted by ROAS — AI-managed</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-all">
          <i class="fas fa-filter mr-1"></i> Filter
        </button>
        <button onclick="window.location.href='/campaigns'" class="bg-brand-600 hover:bg-brand-500 text-white text-xs px-3 py-1.5 rounded-lg transition-all">
          View All →
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-xs text-slate-500 border-b border-white/5">
            <th class="text-left pb-3 font-semibold">Campaign</th>
            <th class="text-left pb-3 font-semibold">Platform</th>
            <th class="text-left pb-3 font-semibold">Status</th>
            <th class="text-right pb-3 font-semibold">Spend</th>
            <th class="text-right pb-3 font-semibold">Revenue</th>
            <th class="text-right pb-3 font-semibold">ROAS</th>
            <th class="text-right pb-3 font-semibold">CTR</th>
            <th class="text-right pb-3 font-semibold">Next Scale</th>
          </tr>
        </thead>
        <tbody class="space-y-1">
          ${campaignRow('Summer Collection', ['fab fa-facebook','fab fa-instagram'], 'scaling', '$18,420', '$96,805', '5.26x', '4.2%', '38h', '#4CAF50')}
          ${campaignRow('Product Launch Q3', ['fab fa-google','fab fa-tiktok'], 'scaling', '$14,200', '$68,160', '4.80x', '3.8%', '52h', '#4CAF50')}
          ${campaignRow('Brand Awareness', ['fab fa-facebook'], 'live', '$9,800', '$41,160', '4.20x', '2.9%', '16h', '#818cf8')}
          ${campaignRow('Retargeting Pro', ['fab fa-google'], 'live', '$7,350', '$29,400', '4.00x', '6.1%', '28h', '#818cf8')}
          ${campaignRow('Holiday Flash Sale', ['fab fa-tiktok','fab fa-snapchat'], 'live', '$5,200', '$17,680', '3.40x', '5.4%', '61h', '#818cf8')}
          ${campaignRow('New User Acq.', ['fab fa-instagram'], 'paused', '$3,100', '$7,750', '2.50x', '1.1%', '—', '#f59e0b')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Bottom Row: Creative Performance + Budget Allocation -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Creative Performance -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Creative Performance</h3>
        <button onclick="window.location.href='/creatives'" class="text-xs text-brand-400 hover:text-brand-300">View Studio →</button>
      </div>
      <div class="space-y-3">
        ${creativeRow('Summer-Hero-V3.mp4', 'Video', '6.2%', 98, true)}
        ${creativeRow('Product-Showcase-B.jpg', 'Image', '4.8%', 91, true)}
        ${creativeRow('UGC-Testimonial-V2.mp4', 'UGC Video', '4.1%', 85, true)}
        ${creativeRow('Banner-Static-01.jpg', 'Image', '1.2%', 38, false)}
        ${creativeRow('Old-Promo-V1.mp4', 'Video', '0.6%', 12, false)}
      </div>
    </div>

    <!-- 72h Scale Schedule -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">Auto-Scale Schedule</h3>
          <p class="text-xs text-slate-500">Next +10% budget increases</p>
        </div>
        <span class="text-xs glass px-2 py-1 rounded-full text-slate-400">Every 72h</span>
      </div>
      <div class="space-y-3">
        ${scaleItem('Summer Collection', '$18,420', '$20,262', 38, 'in 38h', 'emerald')}
        ${scaleItem('Product Launch Q3', '$14,200', '$15,620', 52, 'in 52h', 'blue')}
        ${scaleItem('Brand Awareness', '$9,800', '$10,780', 16, 'in 16h', 'purple')}
        ${scaleItem('Retargeting Pro', '$7,350', '$8,085', 28, 'in 28h', 'amber')}
      </div>
      <div class="glass rounded-xl p-3 mt-4 flex items-center gap-3">
        <i class="fas fa-info-circle text-brand-400"></i>
        <p class="text-xs text-slate-400">AI scales campaigns meeting: ROAS > 3.5x, CTR > 2%, Spend > $1K/day</p>
      </div>
    </div>
  </div>

  <style>
    .chart-tab { color: #64748b; }
    .chart-tab:hover { background: rgba(99,102,241,0.1); color: #818cf8; }
    .active-tab { background: rgba(99,102,241,0.2) !important; color: #a5b4fc !important; }
  </style>

  <script>
  // Revenue & Spend Chart
  const rCtx = document.getElementById('revenueChart').getContext('2d');
  const labels = ['Mar 1','Mar 5','Mar 8','Mar 11','Mar 14','Mar 17','Mar 20','Mar 23','Mar 26','Mar 29','Mar 31'];
  const revenueChart = new Chart(rCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: [28000,32000,38000,35000,45000,52000,49000,58000,71000,68000,82000],
          borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)',
          fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#6366f1', borderWidth: 2
        },
        {
          label: 'Ad Spend',
          data: [7000,8200,9100,8800,10200,11500,10800,13000,15200,14800,18000],
          borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.05)',
          fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#8b5cf6', borderWidth: 2, borderDash: [5,3]
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8', font: { size: 11 } } } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 10 }, callback: v => '$' + (v/1000).toFixed(0) + 'K' } }
      }
    }
  });

  // Platform Donut Chart
  const pCtx = document.getElementById('platformChart').getContext('2d');
  new Chart(pCtx, {
    type: 'doughnut',
    data: {
      labels: ['Facebook','Google','Instagram','TikTok','Snapchat'],
      datasets: [{
        data: [34, 28, 20, 12, 6],
        backgroundColor: ['#1877F2','#4285F4','#E1306C','#ff0050','#FFFC00'],
        borderWidth: 0, hoverOffset: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '70%',
      plugins: { legend: { display: false } }
    }
  });

  function setChartRange(range, btn) {
    document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active-tab'));
    btn.classList.add('active-tab');
    const datasets = {
      '7d': { rev: [62000,65000,71000,68000,75000,80000,82000], spend: [13800,14200,15500,14800,16200,17500,18000] },
      '30d': { rev: [28000,32000,38000,35000,45000,52000,49000,58000,71000,68000,82000], spend: [7000,8200,9100,8800,10200,11500,10800,13000,15200,14800,18000] },
      '90d': { rev: [15000,18000,22000,25000,28000,32000,38000,35000,45000,52000,49000,58000,71000,68000,82000], spend: [4000,4800,5200,6000,7000,8200,9100,8800,10200,11500,10800,13000,15200,14800,18000] }
    };
    revenueChart.data.datasets[0].data = datasets[range].rev;
    revenueChart.data.datasets[1].data = datasets[range].spend;
    revenueChart.update();
  }

  // Live AI feed animation
  const feedItems = [
    { icon: 'arrow-trend-up', color: 'emerald', text: 'Scaling "Holiday Sale" by +10% — ROAS threshold met', action: 'Scale' },
    { icon: 'brain', color: 'purple', text: 'Predictive model updated with 2,840 new conversion signals', action: 'Learn' },
    { icon: 'users', color: 'blue', text: 'Built new lookalike audience — 1.8M high-intent prospects', action: 'Audience' },
  ];
  let feedIndex = 0;
  setInterval(() => {
    const feed = document.getElementById('ai-feed');
    const item = feedItems[feedIndex % feedItems.length];
    const div = document.createElement('div');
    div.className = 'flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-all border border-' + item.color + '-500/10 animate-fadeIn';
    div.innerHTML = \`<div class="w-8 h-8 rounded-lg bg-\${item.color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas fa-\${item.icon} text-\${item.color}-400 text-xs"></i></div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-300 leading-relaxed">\${item.text}</p>
        <p class="text-xs text-slate-600 mt-0.5">Just now</p>
      </div>
      <span class="text-xs px-2 py-0.5 rounded-full bg-\${item.color}-500/20 text-\${item.color}-400">\${item.action}</span>\`;
    feed.insertBefore(div, feed.firstChild);
    if (feed.children.length > 8) feed.removeChild(feed.lastChild);
    feedIndex++;
  }, 8000);
  </script>
  `
  return c.html(shell('Dashboard', content, '/dashboard'))
}

function kpiCard(label: string, value: string, change: string, icon: string, gradient: string, sub: string): string {
  const isPos = change.startsWith('+')
  return `<div class="metric-card glass rounded-2xl p-5 card-hover">
    <div class="flex items-start justify-between mb-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg">
        <i class="fas ${icon} text-white text-sm"></i>
      </div>
      <span class="text-xs font-bold px-2 py-1 rounded-full ${isPos ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}">
        ${change}
      </span>
    </div>
    <div class="text-2xl font-black text-white">${value}</div>
    <div class="text-sm font-semibold text-slate-400 mt-0.5">${label}</div>
    <div class="text-xs text-slate-600 mt-1">${sub}</div>
  </div>`
}

function platformLegend(name: string, pct: string, color: string): string {
  return `<div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-2.5 h-2.5 rounded-full" style="background:${color}"></div>
      <span class="text-xs text-slate-400">${name}</span>
    </div>
    <span class="text-xs font-semibold text-slate-300">${pct}</span>
  </div>`
}

function aiAction(icon: string, color: string, text: string, time: string, badge: string): string {
  return `<div class="flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-all border border-${color}-500/10">
    <div class="w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas fa-${icon} text-${color}-400 text-xs"></i>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-xs text-slate-300 leading-relaxed">${text}</p>
      <p class="text-xs text-slate-600 mt-0.5">${time}</p>
    </div>
    <span class="text-xs px-2 py-0.5 rounded-full bg-${color}-500/20 text-${color}-400 flex-shrink-0">${badge}</span>
  </div>`
}

function platformStatus(name: string, icon: string, color: string, status: string, spend: string, roas: string, connected: boolean): string {
  return `<div class="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-all">
    <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:${color}20">
      <i class="${icon} text-sm" style="color:${color}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-white">${name}</div>
      <div class="text-xs text-slate-500">${spend} · ${roas}</div>
    </div>
    <span class="text-xs px-2 py-1 rounded-full font-semibold ${connected ? 'badge-live' : 'badge-paused'}">${status}</span>
  </div>`
}

function campaignRow(name: string, icons: string[], status: string, spend: string, revenue: string, roas: string, ctr: string, scale: string, color: string): string {
  const statusClass = status === 'scaling' ? 'badge-scaling' : status === 'live' ? 'badge-live' : status === 'paused' ? 'badge-paused' : 'badge-draft'
  const roasNum = parseFloat(roas)
  const roasColor = roasNum >= 4.5 ? 'text-emerald-400' : roasNum >= 3.5 ? 'text-blue-400' : 'text-amber-400'
  return `<tr class="border-b border-white/5 hover:bg-white/3 transition-all cursor-pointer" onclick="window.location.href='/campaigns'">
    <td class="py-3 font-medium text-slate-200">${name}</td>
    <td class="py-3">
      <div class="flex gap-1">
        ${icons.map(i => `<i class="${i} text-slate-400 text-xs"></i>`).join('')}
      </div>
    </td>
    <td class="py-3"><span class="${statusClass} text-xs px-2 py-1 rounded-full font-semibold capitalize">${status}</span></td>
    <td class="py-3 text-right text-slate-300">${spend}</td>
    <td class="py-3 text-right font-semibold text-white">${revenue}</td>
    <td class="py-3 text-right font-bold ${roasColor}">${roas}</td>
    <td class="py-3 text-right text-slate-300">${ctr}</td>
    <td class="py-3 text-right text-xs text-slate-500">${scale}</td>
  </tr>`
}

function creativeRow(name: string, type: string, ctr: string, score: number, winning: boolean): string {
  const color = score >= 80 ? 'emerald' : score >= 50 ? 'amber' : 'red'
  return `<div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg ${type === 'Video' || type === 'UGC Video' ? 'bg-purple-500/20' : 'bg-blue-500/20'} flex items-center justify-center flex-shrink-0">
      <i class="fas ${type.includes('Video') ? 'fa-video' : 'fa-image'} text-xs ${type.includes('Video') ? 'text-purple-400' : 'text-blue-400'}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-medium text-slate-300 truncate">${name}</div>
      <div class="flex items-center gap-2 mt-1">
        <div class="progress-bar flex-1">
          <div class="progress-fill bg-${color}-500" style="width:${score}%"></div>
        </div>
        <span class="text-xs text-${color}-400">${ctr}</span>
      </div>
    </div>
    <span class="text-xs px-2 py-0.5 rounded-full ${winning ? 'badge-live' : 'badge-killed'}">${winning ? 'Active' : 'Killed'}</span>
  </div>`
}

function scaleItem(name: string, current: string, next: string, pct: number, time: string, color: string): string {
  return `<div class="flex items-center gap-3 p-3 glass rounded-xl">
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-medium text-slate-300">${name}</span>
        <span class="text-xs text-${color}-400 font-semibold">${time}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill bg-gradient-to-r from-${color}-500 to-${color}-400" style="width:${pct}%"></div>
      </div>
      <div class="flex items-center justify-between mt-1">
        <span class="text-xs text-slate-500">${current}</span>
        <span class="text-xs text-emerald-400 font-semibold">→ ${next}</span>
      </div>
    </div>
  </div>`
}
