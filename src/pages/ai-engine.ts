
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderAIEngine(lang: Lang = 'en'): string {
  const content = `
  <!-- Hero AI Status -->
  <div class="glass rounded-2xl p-6 mb-6 border border-brand-500/20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-brand-950/50 to-purple-950/50"></div>
    <div class="relative flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-2xl">
          <i class="fas fa-brain text-white text-2xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h2 class="text-xl font-black text-white">AdNova AI Engine v2.0</h2>
            <span class="badge-live text-xs px-2 py-1 rounded-full font-bold">ACTIVE</span>
          </div>
          <p class="text-slate-400 text-sm">Autonomous optimization across 47 campaigns · 5 platforms · 142 creatives</p>
          <div class="flex items-center gap-4 mt-2 text-xs text-slate-500">
            <span><i class="fas fa-clock mr-1"></i>Running for 14d 8h 42m</span>
            <span><i class="fas fa-bolt mr-1 text-brand-400"></i>12,847 AI decisions today</span>
            <span><i class="fas fa-dollar-sign mr-1 text-emerald-400"></i>$847 ROI generated today</span>
          </div>
        </div>
      </div>
      <div class="flex gap-3">
        <button class="glass hover:bg-white/10 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
          <i class="fas fa-pause mr-2"></i>Pause AI
        </button>
        <button class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
          <i class="fas fa-sliders mr-2"></i>Configure
        </button>
      </div>
    </div>
  </div>

  <!-- AI Module Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
    ${aiModule('Performance Predictor', 'fa-chart-line', 'from-brand-500 to-purple-600', 'active', '94.2%', 'Prediction accuracy', 'Uses historical ROAS, CTR, and audience data to predict campaign performance before launch. Identifies high-potential placements.', [
      ['Predictions today', '284'],
      ['Avg confidence', '87.4%'],
      ['Model version', 'GPT-4o fine-tuned']
    ])}
    ${aiModule('Creative Generator', 'fa-wand-magic-sparkles', 'from-purple-500 to-pink-600', 'active', '12,840+', 'Creatives made', 'Generates images, videos, and UGC-style content using your brand brief. Automatically A/B tests and promotes winners.', [
      ['Generated today', '47'],
      ['Win rate', '34%'],
      ['Top format', 'UGC Video']
    ])}
    ${aiModule('Budget Optimizer', 'fa-dollar-sign', 'from-emerald-500 to-teal-600', 'active', '$124K', 'Managed today', 'Dynamically reallocates budget across platforms and campaigns based on real-time ROAS signals. Scales winners +10% every 72h.', [
      ['Reallocations today', '18'],
      ['Budget saved', '$2,340'],
      ['Avg ROAS lift', '+0.8x']
    ])}
    ${aiModule('Audience Intelligence', 'fa-users', 'from-blue-500 to-cyan-600', 'active', '47', 'Audiences managed', 'Builds predictive lookalike audiences from your best converters. Automatically expands reach when saturation is detected.', [
      ['New audiences built', '3'],
      ['Avg lookalike size', '2.1M'],
      ['Match rate', '84.2%']
    ])}
    ${aiModule('Creative Killer', 'fa-scissors', 'from-red-500 to-rose-600', 'active', '37', 'Ads paused today', 'Continuously monitors creative performance. Pauses ads below CTR threshold and reallocates budget to top performers.', [
      ['Kill threshold', 'CTR < 0.8%'],
      ['Budget recovered', '$4,200'],
      ['Avg time to kill', '4.2h']
    ])}
    ${aiModule('Copy Engine', 'fa-pen-nib', 'from-amber-500 to-orange-600', 'active', '1,284', 'Headlines written', 'Generates and tests ad headlines, descriptions, and CTAs. Learns which copy converts best for each audience segment.', [
      ['Best headline CTR', '8.4%'],
      ['Variants tested', '248'],
      ['Languages', '14']
    ])}
  </div>

  <!-- AI Decision Log -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
            <i class="fas fa-list-check text-brand-400 text-sm"></i>
          </div>
          <h3 class="font-bold text-white">AI Decision Log</h3>
        </div>
        <span class="badge-live text-xs px-2 py-1 rounded-full">Live</span>
      </div>
      <div class="space-y-2 max-h-80 overflow-y-auto" id="ai-log">
        ${aiLogItem('arrow-trend-up', 'emerald', 'Scale', '"Summer Collection" budget +10% — ROAS 5.26x ≥ 5.0x target', '2m ago')}
        ${aiLogItem('scissors', 'red', 'Kill', 'Paused creative "old-banner-v1" — CTR 0.31% < 0.8% threshold', '8m ago')}
        ${aiLogItem('wand-magic-sparkles', 'purple', 'Create', 'Generated 3 UGC video variants for TikTok campaign', '15m ago')}
        ${aiLogItem('users', 'blue', 'Audience', 'Built 3% lookalike from top 1K converters — 2.4M reach', '22m ago')}
        ${aiLogItem('dollar-sign', 'amber', 'Budget', 'Moved $1.2K from Snapchat to TikTok — +18% predicted ROAS', '31m ago')}
        ${aiLogItem('chart-line', 'cyan', 'Test', 'A/B test concluded: Video B wins — 34% better CTR, scaling', '45m ago')}
        ${aiLogItem('brain', 'brand', 'Learn', 'Model updated with 2,840 new conversion signals', '1h ago')}
        ${aiLogItem('arrow-trend-up', 'emerald', 'Scale', '"Product Launch" budget +10% — criteria met', '2h ago')}
      </div>
    </div>

    <!-- AI Configuration -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
          <i class="fas fa-sliders text-brand-400 text-sm"></i>
        </div>
        <h3 class="font-bold text-white">AI Configuration</h3>
      </div>
      <div class="space-y-4">
        ${aiConfig('Auto-Scale Threshold', 'ROAS ≥ 3.5x + CTR ≥ 2%', 'brand')}
        ${aiConfig('Kill Threshold', 'CTR < 0.8% after 500 impressions', 'red')}
        ${aiConfig('Scale Amount', '+10% every 72 hours', 'emerald')}
        ${aiConfig('Max Budget Cap', '$5,000/day per campaign', 'amber')}
        ${aiConfig('Creative Test Duration', 'Min 48h or 1,000 impressions', 'blue')}
        ${aiConfig('Audience Expand Trigger', 'Frequency > 3.5 or CPM +30%', 'purple')}
        ${aiConfig('Budget Reallocation', 'Every 6 hours based on ROAS', 'cyan')}
        ${aiConfig('AI Model', 'AdNova v2 + GPT-4o fine-tuned', 'pink')}
      </div>
      <button class="w-full mt-4 bg-gradient-to-r from-brand-600 to-purple-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90">
        Edit AI Rules
      </button>
    </div>
  </div>

  <!-- Performance Model -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">AI Performance Model</h3>
      <span class="text-xs text-slate-500">Last trained: 2 hours ago</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      ${modelMetric('94.2%', 'ROAS Prediction Accuracy', 'emerald')}
      ${modelMetric('87.6%', 'CTR Prediction Accuracy', 'blue')}
      ${modelMetric('91.3%', 'Budget Optimization Score', 'purple')}
      ${modelMetric('2.8M', 'Training Data Points', 'amber')}
    </div>
    <canvas id="aiPerfChart" height="100"></canvas>
  </div>

  <script>
  // AI Performance Chart
  new Chart(document.getElementById('aiPerfChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Day 1','Day 3','Day 5','Day 7','Day 9','Day 11','Day 13','Today'],
      datasets: [
        { label: 'ROAS Accuracy', data: [78,81,84,86,88,91,93,94.2], borderColor:'#6366f1', fill:false, tension:0.4, pointRadius:3, borderWidth:2 },
        { label: 'CTR Accuracy', data: [72,75,78,80,82,85,86,87.6], borderColor:'#3b82f6', fill:false, tension:0.4, pointRadius:3, borderWidth:2 },
        { label: 'Budget Score', data: [80,83,85,87,88,90,91,91.3], borderColor:'#8b5cf6', fill:false, tension:0.4, pointRadius:3, borderWidth:2 },
      ]
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ labels:{ color:'#94a3b8', font:{size:10} } } },
      scales:{
        x:{ grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#64748b',font:{size:9}} },
        y:{ grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#64748b',font:{size:9}, callback:v=>v+'%'}, min:65 }
      }
    }
  });
  </script>
  `
  return shell('AI Engine', content, '/ai-engine', lang)
}

function aiModule(title: string, icon: string, gradient: string, status: string, metric: string, metricLabel: string, desc: string, stats: [string,string][]): string {
  return `<div class="glass rounded-2xl p-5 card-hover">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg">
          <i class="fas ${icon} text-white text-sm"></i>
        </div>
        <div>
          <h3 class="font-bold text-white text-sm">${title}</h3>
          <span class="badge-live text-xs px-2 py-0.5 rounded-full">${status}</span>
        </div>
      </div>
      <div class="text-right">
        <div class="text-xl font-black text-white">${metric}</div>
        <div class="text-xs text-slate-500">${metricLabel}</div>
      </div>
    </div>
    <p class="text-xs text-slate-400 leading-relaxed mb-3">${desc}</p>
    <div class="space-y-1 border-t border-white/5 pt-3">
      ${stats.map(([k, v]) => `<div class="flex items-center justify-between text-xs">
        <span class="text-slate-600">${k}</span><span class="text-slate-300 font-medium">${v}</span>
      </div>`).join('')}
    </div>
  </div>`
}

function aiLogItem(icon: string, color: string, badge: string, text: string, time: string): string {
  return `<div class="flex items-start gap-2 p-2.5 glass rounded-lg hover:bg-white/5 transition-all">
    <div class="w-6 h-6 rounded-md bg-${color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
      <i class="fas fa-${icon} text-${color}-400 text-xs"></i>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-xs text-slate-300 leading-relaxed">${text}</p>
      <p class="text-xs text-slate-600 mt-0.5">${time}</p>
    </div>
    <span class="text-xs px-1.5 py-0.5 rounded bg-${color}-500/10 text-${color}-400 flex-shrink-0">${badge}</span>
  </div>`
}

function aiConfig(key: string, value: string, color: string): string {
  return `<div class="flex items-center justify-between py-2 border-b border-white/5">
    <span class="text-xs text-slate-500">${key}</span>
    <span class="text-xs font-semibold text-${color}-400">${value}</span>
  </div>`
}

function modelMetric(value: string, label: string, color: string): string {
  return `<div class="glass rounded-xl p-4 text-center">
    <div class="text-2xl font-black text-${color}-400">${value}</div>
    <div class="text-xs text-slate-500 mt-1">${label}</div>
  </div>`
}
