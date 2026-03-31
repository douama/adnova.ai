
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderAIEngine(lang: Lang = 'en'): string {
  const content = `
  <!-- Hero AI Status -->
  <div class="glass rounded-2xl p-6 mb-6 border border-brand-500/20 relative overflow-hidden" id="ai-hero-card">
    <div class="absolute inset-0 bg-gradient-to-r from-brand-950/50 to-purple-950/50"></div>
    <div class="relative flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-2xl relative" id="ai-brain-icon">
          <i class="fas fa-brain text-white text-2xl" id="ai-brain-icon-i"></i>
          <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" id="ai-status-dot"></span>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h2 class="text-xl font-black text-white">AdNova AI Engine v2.0</h2>
            <span class="badge-live text-xs px-2 py-1 rounded-full font-bold" id="ai-status-badge">ACTIVE</span>
          </div>
          <p class="text-slate-400 text-sm" id="ai-sub">Autonomous optimization across 47 campaigns · 5 platforms · 142 creatives</p>
          <div class="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
            <span><i class="fas fa-clock mr-1"></i>Running for 14d 8h 42m</span>
            <span><i class="fas fa-bolt mr-1 text-brand-400"></i><span id="live-decisions-ai">12,847</span> AI decisions today</span>
            <span><i class="fas fa-dollar-sign mr-1 text-emerald-400"></i>$847 ROI generated today</span>
          </div>
        </div>
      </div>
      <div class="flex gap-3">
        <button onclick="togglePauseAI()" id="pause-ai-btn" class="glass hover:bg-white/10 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
          <i class="fas fa-pause" id="pause-ai-icon"></i><span id="pause-ai-label">Pause AI</span>
        </button>
        <button onclick="openConfigModal()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 flex items-center gap-2">
          <i class="fas fa-sliders"></i>Configure
        </button>
      </div>
    </div>
  </div>

  <!-- AI Module Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6" id="ai-modules-grid">
    ${aiModule('perf', 'Performance Predictor', 'fa-chart-line', 'from-brand-500 to-purple-600', 'active', '94.2%', 'Prediction accuracy', 'Uses historical ROAS, CTR, and audience data to predict campaign performance before launch. Identifies high-potential placements.', [
      ['Predictions today', '284'],
      ['Avg confidence', '87.4%'],
      ['Model version', 'GPT-4o fine-tuned']
    ])}
    ${aiModule('gen', 'Creative Generator', 'fa-wand-magic-sparkles', 'from-purple-500 to-pink-600', 'active', '12,840+', 'Creatives made', 'Generates images, videos, and UGC-style content using your brand brief. Automatically A/B tests and promotes winners.', [
      ['Generated today', '47'],
      ['Win rate', '34%'],
      ['Top format', 'UGC Video']
    ])}
    ${aiModule('budget', 'Budget Optimizer', 'fa-dollar-sign', 'from-emerald-500 to-teal-600', 'active', '$124K', 'Managed today', 'Dynamically reallocates budget across platforms and campaigns based on real-time ROAS signals. Scales winners +10% every 72h.', [
      ['Reallocations today', '18'],
      ['Budget saved', '$2,340'],
      ['Avg ROAS lift', '+0.8x']
    ])}
    ${aiModule('aud', 'Audience Intelligence', 'fa-users', 'from-blue-500 to-cyan-600', 'active', '47', 'Audiences managed', 'Builds predictive lookalike audiences from your best converters. Automatically expands reach when saturation is detected.', [
      ['New audiences built', '3'],
      ['Avg lookalike size', '2.1M'],
      ['Match rate', '84.2%']
    ])}
    ${aiModule('kill', 'Creative Killer', 'fa-scissors', 'from-red-500 to-rose-600', 'active', '37', 'Ads paused today', 'Continuously monitors creative performance. Pauses ads below CTR threshold and reallocates budget to top performers.', [
      ['Kill threshold', 'CTR < 0.8%'],
      ['Budget recovered', '$4,200'],
      ['Avg time to kill', '4.2h']
    ])}
    ${aiModule('copy', 'Copy Engine', 'fa-pen-nib', 'from-amber-500 to-orange-600', 'active', '1,284', 'Headlines written', 'Generates and tests ad headlines, descriptions, and CTAs. Learns which copy converts best for each audience segment.', [
      ['Best headline CTR', '8.4%'],
      ['Variants tested', '248'],
      ['Languages', '14']
    ])}
  </div>

  <!-- AI Decision Log + Config -->
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

    <!-- AI Configuration (read-only, edit via modal) -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
          <i class="fas fa-sliders text-brand-400 text-sm"></i>
        </div>
        <h3 class="font-bold text-white">AI Configuration</h3>
      </div>
      <div class="space-y-2" id="ai-config-list">
        ${aiConfigRow('auto-scale', 'Auto-Scale Threshold', 'ROAS ≥ 3.5x + CTR ≥ 2%', 'brand')}
        ${aiConfigRow('kill-thresh', 'Kill Threshold', 'CTR < 0.8% after 500 impressions', 'red')}
        ${aiConfigRow('scale-amt', 'Scale Amount', '+10% every 72 hours', 'emerald')}
        ${aiConfigRow('max-budget', 'Max Budget Cap', '$5,000/day per campaign', 'amber')}
        ${aiConfigRow('creative-test', 'Creative Test Duration', 'Min 48h or 1,000 impressions', 'blue')}
        ${aiConfigRow('aud-expand', 'Audience Expand Trigger', 'Frequency > 3.5 or CPM +30%', 'purple')}
        ${aiConfigRow('budget-realloc', 'Budget Reallocation', 'Every 6 hours based on ROAS', 'cyan')}
        ${aiConfigRow('model', 'AI Model', 'AdNova v2 + GPT-4o fine-tuned', 'pink')}
      </div>
      <button onclick="openEditRulesModal()" class="w-full mt-4 bg-gradient-to-r from-brand-600 to-purple-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2">
        <i class="fas fa-pencil"></i> Edit AI Rules
      </button>
    </div>
  </div>

  <!-- Performance Model -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">AI Performance Model</h3>
      <span class="text-xs text-slate-500">Last trained: 2 hours ago</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      ${modelMetric('94.2%', 'ROAS Prediction Accuracy', 'emerald')}
      ${modelMetric('87.6%', 'CTR Prediction Accuracy', 'blue')}
      ${modelMetric('91.3%', 'Budget Optimization Score', 'purple')}
      ${modelMetric('2.8M', 'Training Data Points', 'amber')}
    </div>
    <canvas id="aiPerfChart" height="100"></canvas>
  </div>

  <!-- ═══════════════════════ MODALS ═══════════════════════ -->

  <!-- Configure Modal -->
  <div id="config-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-lg animate-fadeIn" style="border:1px solid rgba(99,102,241,0.4)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass rounded-t-2xl">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-sliders text-white text-sm"></i>
          </div>
          <h2 class="font-bold text-white">Configure AI Engine</h2>
        </div>
        <button onclick="closeConfigModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
        <div class="glass rounded-xl p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Module Status</h3>
          <div class="space-y-2" id="module-toggles">
            ${moduleToggle('perf', 'Performance Predictor', true)}
            ${moduleToggle('gen', 'Creative Generator', true)}
            ${moduleToggle('budget', 'Budget Optimizer', true)}
            ${moduleToggle('aud', 'Audience Intelligence', true)}
            ${moduleToggle('kill', 'Creative Killer', true)}
            ${moduleToggle('copy', 'Copy Engine', true)}
          </div>
        </div>
        <div class="glass rounded-xl p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Global Settings</h3>
          <div class="space-y-3">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">AI Aggressiveness</label>
              <div class="flex items-center gap-3">
                <span class="text-xs text-slate-600">Conservative</span>
                <input type="range" min="1" max="5" value="3" class="flex-1 accent-brand-500" id="ai-aggro"/>
                <span class="text-xs text-slate-600">Aggressive</span>
              </div>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Decision Frequency</label>
              <select class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-300 outline-none border border-white/10">
                <option>Every hour</option>
                <option selected>Every 6 hours</option>
                <option>Every 12 hours</option>
                <option>Every 24 hours</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Max Daily Actions</label>
              <input type="number" value="50" class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-200 outline-none border border-white/10"/>
            </div>
          </div>
        </div>
        <div class="glass rounded-xl p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Notifications</h3>
          <div class="space-y-2">
            ${notifToggle('Scale actions', true)}
            ${notifToggle('Creative kills', true)}
            ${notifToggle('Budget alerts', true)}
            ${notifToggle('Model updates', false)}
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button onclick="closeConfigModal()" class="glass hover:bg-white/10 text-slate-400 px-5 py-2 rounded-xl text-sm">Cancel</button>
          <button onclick="saveConfig()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-semibold">Save Configuration</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit AI Rules Modal -->
  <div id="edit-rules-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-xl animate-fadeIn" style="border:1px solid rgba(99,102,241,0.4)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass rounded-t-2xl">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <i class="fas fa-pencil text-white text-sm"></i>
          </div>
          <h2 class="font-bold text-white">Edit AI Rules</h2>
        </div>
        <button onclick="closeEditRulesModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
        ${editableRule('auto-scale', 'Auto-Scale Threshold', 'ROAS target', '3.5', 'x')}
        ${editableRule('kill-ctr', 'Kill CTR Threshold', 'Minimum CTR', '0.8', '%')}
        ${editableRule('kill-imp', 'Kill Min Impressions', 'Before killing', '500', 'impr.')}
        ${editableRule('scale-pct', 'Scale Amount', 'Budget increase', '10', '%')}
        ${editableRule('scale-freq', 'Scale Frequency', 'Hours between scales', '72', 'h')}
        ${editableRule('max-daily', 'Max Daily Budget', 'Per campaign cap', '5000', '$')}
        ${editableRule('test-dur', 'Creative Test Duration', 'Minimum hours', '48', 'h')}
        ${editableRule('freq-expand', 'Audience Expand Frequency', 'Trigger threshold', '3.5', 'freq.')}
        <div class="flex justify-end gap-3 pt-2">
          <button onclick="closeEditRulesModal()" class="glass hover:bg-white/10 text-slate-400 px-5 py-2 rounded-xl text-sm">Cancel</button>
          <button onclick="saveEditedRules()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-semibold">Save Rules</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="ai-toast" class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"></div>

  <script>
  // ── Chart ──────────────────────────────────────────────────────────────────
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

  // ── AI paused state ────────────────────────────────────────────────────────
  let aiPaused = false;
  function togglePauseAI() {
    aiPaused = !aiPaused;
    const btn = document.getElementById('pause-ai-btn');
    const icon = document.getElementById('pause-ai-icon');
    const label = document.getElementById('pause-ai-label');
    const badge = document.getElementById('ai-status-badge');
    const dot = document.getElementById('ai-status-dot');
    const sub = document.getElementById('ai-sub');
    if (aiPaused) {
      icon.className = 'fas fa-play';
      label.textContent = 'Resume AI';
      badge.textContent = 'PAUSED';
      badge.classList.remove('badge-live');
      badge.classList.add('bg-amber-500/20','text-amber-400');
      dot.classList.remove('bg-emerald-500','animate-pulse');
      dot.classList.add('bg-amber-500');
      sub.textContent = 'AI Engine is paused — no autonomous actions';
      showToast('AI Engine paused — all automation suspended', 'amber');
    } else {
      icon.className = 'fas fa-pause';
      label.textContent = 'Pause AI';
      badge.textContent = 'ACTIVE';
      badge.classList.add('badge-live');
      badge.classList.remove('bg-amber-500/20','text-amber-400');
      dot.classList.add('bg-emerald-500','animate-pulse');
      dot.classList.remove('bg-amber-500');
      sub.textContent = 'Autonomous optimization across 47 campaigns · 5 platforms · 142 creatives';
      showToast('AI Engine resumed — autonomous optimization active', 'emerald');
    }
  }

  // ── Module toggle ──────────────────────────────────────────────────────────
  function toggleModule(id) {
    const toggle = document.getElementById('mod-toggle-'+id);
    const dot = document.getElementById('mod-dot-'+id);
    const isOn = toggle.dataset.on === 'true';
    toggle.dataset.on = (!isOn).toString();
    if (!isOn) {
      toggle.classList.remove('bg-slate-700'); toggle.classList.add('bg-brand-600');
      dot.style.transform = 'translateX(16px)';
    } else {
      toggle.classList.remove('bg-brand-600'); toggle.classList.add('bg-slate-700');
      dot.style.transform = 'translateX(0px)';
    }
  }

  // ── Config modal ───────────────────────────────────────────────────────────
  function openConfigModal() { document.getElementById('config-modal').classList.remove('hidden'); }
  function closeConfigModal() { document.getElementById('config-modal').classList.add('hidden'); }
  function saveConfig() {
    closeConfigModal();
    showToast('AI Engine configuration saved successfully', 'emerald');
  }

  // ── Edit Rules modal ───────────────────────────────────────────────────────
  function openEditRulesModal() { document.getElementById('edit-rules-modal').classList.remove('hidden'); }
  function closeEditRulesModal() { document.getElementById('edit-rules-modal').classList.add('hidden'); }
  function saveEditedRules() {
    // Update config list display with new values
    document.querySelectorAll('.editable-rule').forEach(input => {
      const id = input.dataset.ruleId;
      const val = input.value;
      const unit = input.dataset.unit;
      const display = document.getElementById('cfg-val-'+id);
      if (display) display.textContent = val + unit;
    });
    closeEditRulesModal();
    showToast('AI rules updated — changes take effect on next cycle', 'brand');
  }

  // ── Live counter ───────────────────────────────────────────────────────────
  let decisionCount = 12847;
  setInterval(() => {
    if (!aiPaused) {
      decisionCount += Math.floor(Math.random() * 3);
      const el = document.getElementById('live-decisions-ai');
      if (el) el.textContent = decisionCount.toLocaleString();
    }
  }, 2500);

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg, color='brand') {
    const colors = { brand:'bg-brand-500/90', emerald:'bg-emerald-500/90', amber:'bg-amber-500/90', red:'bg-red-500/90' };
    const t = document.createElement('div');
    t.className = \`\${colors[color]||colors.brand} text-white text-xs px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm pointer-events-auto flex items-center gap-2 animate-fadeIn\`;
    t.innerHTML = \`<i class="fas fa-check-circle"></i> \${msg}\`;
    const container = document.getElementById('ai-toast');
    container.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  // Close modals on backdrop click
  ['config-modal','edit-rules-modal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
      if (e.target === this) this.classList.add('hidden');
    });
  });
  </script>
  `
  return shell('AI Engine', content, '/ai-engine', lang)
}

function aiModule(id: string, title: string, icon: string, gradient: string, status: string, metric: string, metricLabel: string, desc: string, stats: [string,string][]): string {
  return `<div class="glass rounded-2xl p-5 card-hover" id="module-card-${id}">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg">
          <i class="fas ${icon} text-white text-sm"></i>
        </div>
        <div>
          <h3 class="font-bold text-white text-sm">${title}</h3>
          <span class="badge-live text-xs px-2 py-0.5 rounded-full" id="module-badge-${id}">${status}</span>
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

function aiConfigRow(id: string, key: string, value: string, color: string): string {
  return `<div class="flex items-center justify-between py-2 border-b border-white/5">
    <span class="text-xs text-slate-500">${key}</span>
    <span class="text-xs font-semibold text-${color}-400" id="cfg-val-${id}">${value}</span>
  </div>`
}

function modelMetric(value: string, label: string, color: string): string {
  return `<div class="glass rounded-xl p-4 text-center">
    <div class="text-2xl font-black text-${color}-400">${value}</div>
    <div class="text-xs text-slate-500 mt-1">${label}</div>
  </div>`
}

function moduleToggle(id: string, label: string, on: boolean): string {
  return `<div class="flex items-center justify-between py-1.5">
    <span class="text-xs text-slate-300">${label}</span>
    <button onclick="toggleModule('${id}')" data-on="${on}" id="mod-toggle-${id}" class="relative w-9 h-5 rounded-full transition-all ${on ? 'bg-brand-600' : 'bg-slate-700'} flex-shrink-0">
      <span id="mod-dot-${id}" class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200" style="transform:translateX(${on ? '16px' : '0px'})"></span>
    </button>
  </div>`
}

function notifToggle(label: string, on: boolean): string {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  return `<div class="flex items-center justify-between py-1">
    <span class="text-xs text-slate-400">${label}</span>
    <input type="checkbox" ${on ? 'checked' : ''} class="accent-brand-500 w-3.5 h-3.5"/>
  </div>`
}

function editableRule(id: string, label: string, sublabel: string, defaultVal: string, unit: string): string {
  return `<div class="glass rounded-xl p-3 flex items-center justify-between gap-3">
    <div>
      <div class="text-xs font-semibold text-slate-300">${label}</div>
      <div class="text-xs text-slate-600">${sublabel}</div>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <input type="number" value="${defaultVal}" step="0.1" data-rule-id="${id}" data-unit="${unit}" class="editable-rule w-20 glass rounded-lg px-2 py-1.5 text-xs text-slate-200 outline-none border border-white/10 focus:border-brand-500 text-right"/>
      <span class="text-xs text-slate-500 w-8">${unit}</span>
    </div>
  </div>`
}
