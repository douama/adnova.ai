import type { Context } from 'hono'
import { shell } from '../lib/layout'
import { detectLang, t } from '../lib/i18n'

export const renderDashboard = (c: Context) => {
  const lang = detectLang(c.req.raw)

  const content = `
  <!-- KPI Cards Row — data loaded via API -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6" id="kpi-grid">
    ${kpiCard('id-spend', t(lang,'total_spend'), '$124,850', '+18.4%', 'fa-dollar-sign', 'from-brand-500 to-purple-600', t(lang,'this_month'))}
    ${kpiCard('id-roas', t(lang,'roas'), '4.82x', '+0.6x', 'fa-chart-line', 'from-emerald-500 to-teal-600', 'Revenue per dollar')}
    ${kpiCard('id-campaigns', t(lang,'active_campaigns'), '47', '+3', 'fa-bullhorn', 'from-blue-500 to-cyan-600', '12 scaling · 35 running')}
    ${kpiCard('id-conversions', t(lang,'conversions'), '8,294', '+22.1%', 'fa-check-circle', 'from-amber-500 to-orange-600', 'Last 30 days')}
  </div>

  <!-- Charts Row -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <!-- Main Revenue Chart -->
    <div class="lg:col-span-2 glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">Revenue &amp; Ad Spend</h3>
          <p class="text-xs text-slate-500 mt-0.5">Last 30 days — all platforms</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="chart-tab active-tab text-xs px-3 py-1.5 rounded-lg font-medium transition-all" onclick="setChartRange('30d',this)">30D</button>
          <button class="chart-tab text-xs px-3 py-1.5 rounded-lg font-medium transition-all" onclick="setChartRange('7d',this)">7D</button>
          <button class="chart-tab text-xs px-3 py-1.5 rounded-lg font-medium transition-all" onclick="setChartRange('90d',this)">90D</button>
        </div>
      </div>
      <div style="position:relative;height:180px">
        <canvas id="revenueChart"></canvas>
      </div>
    </div>

    <!-- Platform Breakdown Donut -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">Platform Split</h3>
          <p class="text-xs text-slate-500 mt-0.5">Spend distribution</p>
        </div>
      </div>
      <div style="position:relative;height:160px">
        <canvas id="platformChart"></canvas>
      </div>
      <div class="space-y-2 mt-4" id="platform-legend">
        ${platformLegend('Facebook', '28%', '#1877F2')}
        ${platformLegend('Google', '23%', '#4285F4')}
        ${platformLegend('Instagram', '16%', '#E1306C')}
        ${platformLegend('TikTok', '10%', '#ff0050')}
        ${platformLegend('LinkedIn', '6%', '#0077b5')}
        ${platformLegend('YouTube', '8%', '#ff0000')}
        ${platformLegend('Others', '9%', '#94a3b8')}
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
        ${aiAction('arrow-trend-up', 'emerald', '"Summer Collection" budget scaled +10% — ROAS hit 5.2x', '2m ago', 'Scale')}
        ${aiAction('scissors', 'red', 'Killed 2 TikTok creatives — CTR 0.31% below 0.8% threshold', '8m ago', 'Kill')}
        ${aiAction('wand-magic-sparkles', 'purple', 'Generated 4 new AI video variants for "Product Launch"', '15m ago', 'Create')}
        ${aiAction('bullseye', 'blue', 'Expanded Facebook lookalike from 1% to 3% — reach +2.1M', '23m ago', 'Audience')}
        ${aiAction('dollar-sign', 'amber', 'Reallocated $1,200 from FB to Google — predicted +23% ROAS', '31m ago', 'Budget')}
        ${aiAction('chart-line', 'cyan', 'A/B test: Creative B wins with 34% better CTR', '45m ago', 'Test')}
      </div>
    </div>

    <!-- Platform Status -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">${t(lang,'platforms')} ${t(lang,'status')}</h3>
      <div class="space-y-2" id="platform-status-list">
        ${platformStatus('Facebook Ads', 'fab fa-facebook-f', '#1877F2', true, '$42,350', '4.1x')}
        ${platformStatus('Google Ads', 'fab fa-google', '#4285F4', true, '$35,100', '5.2x')}
        ${platformStatus('Instagram', 'fab fa-instagram', '#E1306C', true, '$25,200', '3.8x')}
        ${platformStatus('TikTok', 'fab fa-tiktok', '#010101', true, '$15,400', '4.6x')}
        ${platformStatus('LinkedIn', 'fab fa-linkedin-in', '#0077b5', true, '$8,920', '3.3x')}
        ${platformStatus('YouTube', 'fab fa-youtube', '#ff0000', true, '$11,750', '3.9x')}
        ${platformStatus('Snapchat', 'fab fa-snapchat', '#FFFC00', false, '$6,800', '2.1x')}
      </div>
      <button onclick="window.location.href='/platforms'" class="w-full mt-3 glass hover:bg-white/10 text-slate-400 text-xs py-2 rounded-lg transition-all">
        ${t(lang,'configure')} Platforms →
      </button>
    </div>
  </div>

  <!-- Top Campaigns Table -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-bold text-white">Top Performing ${t(lang,'campaigns')}</h3>
        <p class="text-xs text-slate-500">Sorted by ROAS — AI-managed</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="filterTopCampaigns()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-all">
          <i class="fas fa-filter mr-1"></i>${t(lang,'filter')}
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
            <th class="text-left pb-3 font-semibold">${t(lang,'status')}</th>
            <th class="text-right pb-3 font-semibold">${t(lang,'spend')}</th>
            <th class="text-right pb-3 font-semibold">${t(lang,'revenue')}</th>
            <th class="text-right pb-3 font-semibold">${t(lang,'roas')}</th>
            <th class="text-right pb-3 font-semibold">${t(lang,'ctr')}</th>
            <th class="text-right pb-3 font-semibold">Next Scale</th>
          </tr>
        </thead>
        <tbody id="campaigns-tbody">
          ${campaignRow('Summer Collection', ['fab fa-facebook-f','fab fa-instagram'], 'scaling', '$18,420', '$96,805', '5.26x', '4.2%', '38h')}
          ${campaignRow('Product Launch Q3', ['fab fa-google','fab fa-tiktok'], 'scaling', '$14,200', '$68,160', '4.80x', '3.8%', '52h')}
          ${campaignRow('Brand Awareness', ['fab fa-facebook-f'], 'live', '$9,800', '$41,160', '4.20x', '2.9%', '16h')}
          ${campaignRow('Retargeting Pro', ['fab fa-google'], 'live', '$7,350', '$29,400', '4.00x', '6.1%', '28h')}
          ${campaignRow('Holiday Flash Sale', ['fab fa-tiktok','fab fa-snapchat'], 'live', '$5,200', '$17,680', '3.40x', '5.4%', '61h')}
          ${campaignRow('LinkedIn B2B', ['fab fa-linkedin-in'], 'live', '$4,460', '$14,718', '3.30x', '1.8%', '44h')}
          ${campaignRow('YouTube Brand', ['fab fa-youtube'], 'live', '$5,875', '$22,913', '3.90x', '2.3%', '19h')}
          ${campaignRow('New User Acq.', ['fab fa-instagram'], 'paused', '$3,100', '$7,750', '2.50x', '1.1%', '—')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Bottom Row: Creative Performance + Auto-Scale -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Creative Performance -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Creative ${t(lang,'performance')}</h3>
        <button onclick="window.location.href='/creatives'" class="text-xs text-brand-400 hover:text-brand-300">Studio →</button>
      </div>
      <div class="space-y-3">
        ${creativeRow('Summer-Hero-V3.mp4', 'Video', '6.2%', 98, true)}
        ${creativeRow('Product-Showcase-B.jpg', 'Image', '4.8%', 91, true)}
        ${creativeRow('UGC-Testimonial-V2.mp4', 'UGC Video', '4.1%', 85, true)}
        ${creativeRow('Banner-Static-01.jpg', 'Image', '1.2%', 38, false)}
        ${creativeRow('Old-Promo-V1.mp4', 'Video', '0.6%', 12, false)}
      </div>
    </div>

    <!-- Auto-Scale Schedule -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">Auto-Scale Schedule</h3>
          <p class="text-xs text-slate-500">Next +10% ${t(lang,'budget')} increases</p>
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
        <p class="text-xs text-slate-400">AI scales when: ROAS &gt; 3.5x, CTR &gt; 2%, Spend &gt; $1K/day</p>
      </div>
    </div>
  </div>

  <style>
    .chart-tab { color: #64748b; }
    .chart-tab:hover { background: rgba(99,102,241,0.1); color: #818cf8; }
    .active-tab { background: rgba(99,102,241,0.2) !important; color: #a5b4fc !important; }
  </style>

  <script>
  // ── Theme-aware Chart helpers ───────────────────────────────────────────
  function getChartColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
      grid: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
      text: isDark ? '#64748b' : '#94a3b8',
      legendText: isDark ? '#94a3b8' : '#475569',
    };
  }

  // ── Revenue Chart ───────────────────────────────────────────────────────
  let revenueChart;
  const CHART_DATA = {
    '7d': {
      labels: ['Apr 25','Apr 26','Apr 27','Apr 28','Apr 29','Apr 30','May 1'],
      rev: [62000,65000,71000,68000,75000,80000,82000],
      spend: [13800,14200,15500,14800,16200,17500,18000]
    },
    '30d': {
      labels: ['Apr 1','Apr 5','Apr 8','Apr 11','Apr 14','Apr 17','Apr 20','Apr 23','Apr 26','Apr 29','May 1'],
      rev: [28000,32000,38000,35000,45000,52000,49000,58000,71000,68000,82000],
      spend: [7000,8200,9100,8800,10200,11500,10800,13000,15200,14800,18000]
    },
    '90d': {
      labels: ['Feb 1','Feb 15','Mar 1','Mar 15','Apr 1','Apr 15','May 1'],
      rev: [22000,28000,35000,45000,58000,71000,82000],
      spend: [5200,7000,9100,11500,14800,16200,18000]
    }
  };

  window.addEventListener('load', function() {
    const c = getChartColors();
    const rCtx = document.getElementById('revenueChart');
    const pCtx = document.getElementById('platformChart');
    if (!rCtx || !pCtx) return;

    revenueChart = new Chart(rCtx, {
      type: 'line',
      data: {
        labels: CHART_DATA['30d'].labels,
        datasets: [
          {
            label: 'Revenue',
            data: CHART_DATA['30d'].rev,
            borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)',
            fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#6366f1', borderWidth: 2
          },
          {
            label: 'Ad Spend',
            data: CHART_DATA['30d'].spend,
            borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.05)',
            fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#8b5cf6', borderWidth: 2,
            borderDash: [5,3]
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: c.legendText, font: { size: 11 } } } },
        scales: {
          x: { grid: { color: c.grid }, ticks: { color: c.text, font: { size: 10 } } },
          y: { grid: { color: c.grid }, ticks: { color: c.text, font: { size: 10 }, callback: v => '$' + (v/1000).toFixed(0) + 'K' } }
        }
      }
    });

    // Platform Donut
    window._platformDonut = new Chart(pCtx, {
      type: 'doughnut',
      data: {
        labels: ['Facebook','Google','Instagram','TikTok','LinkedIn','YouTube','Others'],
        datasets: [{
          data: [28, 23, 16, 10, 6, 8, 9],
          backgroundColor: ['#1877F2','#4285F4','#E1306C','#ff0050','#0077b5','#ff0000','#94a3b8'],
          borderWidth: 0, hoverOffset: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '70%',
        plugins: { legend: { display: false } }
      }
    });
  });

  // ── Theme change hook ────────────────────────────────────────────────────
  window.updateChartsTheme = function(theme) {
    const c = getChartColors();
    [revenueChart].forEach(chart => {
      if (!chart) return;
      chart.options.scales.x.grid.color = c.grid;
      chart.options.scales.x.ticks.color = c.text;
      chart.options.scales.y.grid.color = c.grid;
      chart.options.scales.y.ticks.color = c.text;
      chart.options.plugins.legend.labels.color = c.legendText;
      chart.update('none');
    });
  };

  // ── Chart range ──────────────────────────────────────────────────────────
  function setChartRange(range, btn) {
    document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active-tab'));
    btn.classList.add('active-tab');
    if (!revenueChart || !CHART_DATA[range]) return;
    revenueChart.data.labels = CHART_DATA[range].labels;
    revenueChart.data.datasets[0].data = CHART_DATA[range].rev;
    revenueChart.data.datasets[1].data = CHART_DATA[range].spend;
    revenueChart.update();
  }

  // ── Live KPI refresh via API ─────────────────────────────────────────────
  window.refreshMetrics = async function() {
    try {
      const token = localStorage.getItem('adnova_token') || '';
      const res = await fetch('/api/dashboard/stats', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (!res.ok) return;
      const data = await res.json();
      const stats = data.stats || data;

      // Update KPI cards
      if (stats.totalSpend) setKPI('id-spend', '$' + (stats.totalSpend/1000).toFixed(0) + 'K');
      if (stats.roas) setKPI('id-roas', stats.roas + 'x');
      if (stats.activeCampaigns) setKPI('id-campaigns', stats.activeCampaigns);
      if (stats.conversions) setKPI('id-conversions', stats.conversions.toLocaleString());
    } catch(e) { /* silent fail */ }
  };

  function setKPI(id, val) {
    const el = document.getElementById(id + '-val');
    if (el) el.textContent = val;
  }

  // ── Live AI Feed ─────────────────────────────────────────────────────────
  const feedItems = [
    { icon: 'arrow-trend-up', color: 'emerald', text: 'Scaling "Holiday Sale" +10% — ROAS threshold met', action: 'Scale' },
    { icon: 'brain', color: 'purple', text: 'Model updated with 2,840 new conversion signals', action: 'Learn' },
    { icon: 'users', color: 'blue', text: 'New lookalike audience — 1.8M high-intent prospects', action: 'Audience' },
    { icon: 'scissors', color: 'red', text: 'Paused 1 creative — CTR dropped below 0.8%', action: 'Kill' },
    { icon: 'dollar-sign', color: 'amber', text: 'Budget reallocation: TikTok → LinkedIn +$800', action: 'Budget' },
    { icon: 'wand-magic-sparkles', color: 'pink', text: 'Generated 3 Pinterest video variants — A/B test active', action: 'Create' },
  ];
  let feedIdx = 0;
  setInterval(() => {
    const feed = document.getElementById('ai-feed');
    if (!feed) return;
    const item = feedItems[feedIdx % feedItems.length];
    const now = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    const div = document.createElement('div');
    div.className = 'flex items-start gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-all border border-' + item.color + '-500/10 animate-fadeIn';
    div.innerHTML = '<div class="w-8 h-8 rounded-lg bg-' + item.color + '-500/20 flex items-center justify-center flex-shrink-0"><i class="fas fa-' + item.icon + ' text-' + item.color + '-400 text-xs"></i></div><div class="flex-1 min-w-0"><p class="text-xs text-slate-300 leading-relaxed">' + item.text + '</p><p class="text-xs text-slate-600 mt-0.5">' + now + '</p></div><span class="text-xs px-2 py-0.5 rounded-full bg-' + item.color + '-500/20 text-' + item.color + '-400">' + item.action + '</span>';
    feed.insertBefore(div, feed.firstChild);
    if (feed.children.length > 8) feed.removeChild(feed.lastChild);
    feedIdx++;
  }, 9000);

  // ── Filter campaigns table ───────────────────────────────────────────────
  function filterTopCampaigns() {
    const filters = ['All', 'Scaling', 'Live', 'Paused'];
    let idx = (window._filterIdx||0);
    idx = (idx + 1) % filters.length;
    window._filterIdx = idx;
    const filter = filters[idx];
    document.querySelectorAll('#campaigns-tbody tr').forEach(row => {
      const status = row.querySelector('[class*="badge"]')?.textContent?.toLowerCase() || '';
      row.style.display = filter === 'All' || status.includes(filter.toLowerCase()) ? '' : 'none';
    });
    const btn = document.querySelector('[onclick="filterTopCampaigns()"]');
    if (btn) btn.innerHTML = '<i class="fas fa-filter mr-1"></i>' + filter;
  }

  // ── Live KPI live counter anim ────────────────────────────────────────────
  let spendCounter = 124850;
  setInterval(() => {
    spendCounter += Math.floor(Math.random() * 15 + 5);
    const el = document.getElementById('id-spend-val');
    if (el) {
      const val = spendCounter >= 1000000 ? '$' + (spendCounter/1000000).toFixed(2) + 'M' : '$' + (spendCounter/1000).toFixed(1) + 'K';
      el.textContent = val;
    }
  }, 8000);

  // Initial load
  window.refreshMetrics();
  </script>
  `
  return c.html(shell(t(lang,'dashboard'), content, '/dashboard', lang))
}

function kpiCard(id: string, label: string, value: string, change: string, icon: string, gradient: string, sub: string): string {
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
    <div class="text-2xl font-black text-white" id="${id}-val">${value}</div>
    <div class="text-sm font-semibold text-slate-400 mt-0.5">${label}</div>
    <div class="text-xs text-slate-600 mt-1">${sub}</div>
  </div>`
}

function platformLegend(name: string, pct: string, color: string): string {
  return `<div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${color}"></div>
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

function platformStatus(name: string, icon: string, color: string, connected: boolean, spend: string, roas: string): string {
  return `<div class="flex items-center gap-3 p-2 glass rounded-xl hover:bg-white/5 transition-all">
    <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background:${color}25">
      <i class="${icon} text-sm" style="color:${color}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-white">${name}</div>
      <div class="text-xs text-slate-500">${spend} · ${roas}</div>
    </div>
    <span class="text-xs px-1.5 py-0.5 rounded-full font-semibold ${connected ? 'badge-live' : 'badge-paused'}">${connected ? '●' : '⚠'}</span>
  </div>`
}

function campaignRow(name: string, icons: string[], status: string, spend: string, revenue: string, roas: string, ctr: string, scale: string): string {
  const statusClass = status === 'scaling' ? 'badge-scaling' : status === 'live' ? 'badge-live' : status === 'paused' ? 'badge-paused' : 'badge-draft'
  const roasNum = parseFloat(roas)
  const roasColor = roasNum >= 4.5 ? 'text-emerald-400' : roasNum >= 3.5 ? 'text-blue-400' : 'text-amber-400'
  return `<tr class="border-b border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer table-row" onclick="window.location.href='/campaigns'">
    <td class="py-3 font-medium text-slate-200 whitespace-nowrap">${name}</td>
    <td class="py-3">
      <div class="flex gap-1">${icons.map(i => `<i class="${i} text-slate-400 text-xs"></i>`).join('')}</div>
    </td>
    <td class="py-3"><span class="${statusClass} text-xs px-2 py-0.5 rounded-full font-semibold capitalize">${status}</span></td>
    <td class="py-3 text-right text-slate-300 whitespace-nowrap">${spend}</td>
    <td class="py-3 text-right font-semibold text-white whitespace-nowrap">${revenue}</td>
    <td class="py-3 text-right font-bold ${roasColor} whitespace-nowrap">${roas}</td>
    <td class="py-3 text-right text-slate-300">${ctr}</td>
    <td class="py-3 text-right text-xs text-slate-500">${scale}</td>
  </tr>`
}

function creativeRow(name: string, type: string, ctr: string, score: number, winning: boolean): string {
  const color = score >= 80 ? 'emerald' : score >= 50 ? 'amber' : 'red'
  return `<div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg ${type.includes('Video') ? 'bg-purple-500/20' : 'bg-blue-500/20'} flex items-center justify-center flex-shrink-0">
      <i class="fas ${type.includes('Video') ? 'fa-video' : 'fa-image'} text-xs ${type.includes('Video') ? 'text-purple-400' : 'text-blue-400'}"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-slate-300 truncate">${name}</div>
      <div class="text-xs text-slate-500">${type} · CTR ${ctr}</div>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <div class="w-12 progress-bar">
        <div class="progress-fill bg-${color}-500" style="width:${score}%"></div>
      </div>
      <span class="text-xs font-bold text-${color}-400 w-8 text-right">${score}%</span>
      ${winning ? '<i class="fas fa-crown text-amber-400 text-xs"></i>' : '<i class="fas fa-skull text-red-500/40 text-xs"></i>'}
    </div>
  </div>`
}

function scaleItem(name: string, current: string, next: string, pct: number, label: string, color: string): string {
  const progress = Math.max(10, 100 - pct)
  return `<div class="glass rounded-xl p-3">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-semibold text-slate-300">${name}</span>
      <span class="text-xs text-${color}-400 font-semibold">${label}</span>
    </div>
    <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
      <span>${current} → <span class="text-${color}-400 font-semibold">${next}</span></span>
      <span>+10%</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill bg-gradient-to-r from-${color}-600 to-${color}-400" style="width:${progress}%"></div>
    </div>
  </div>`
}
