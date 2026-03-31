
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderAutomation(lang: Lang = 'en'): string {
  const content = `
  <div class="flex items-center justify-between mb-6">
    <p class="text-slate-400">Build smart automation rules. AI executes them automatically.</p>
    <button onclick="openRuleModal()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2">
      <i class="fas fa-plus"></i> New Rule
    </button>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${autoStat('24', 'Active Rules', 'fa-gears', 'brand')}
    ${autoStat('1,284', 'Actions Today', 'fa-bolt', 'emerald')}
    ${autoStat('$4,200', 'Budget Saved', 'fa-dollar-sign', 'amber')}
    ${autoStat('98.7%', 'Rule Accuracy', 'fa-bullseye', 'blue')}
  </div>

  <!-- Rules Grid -->
  <div class="space-y-3 mb-6">
    ${ruleCard('Auto-Scale Winners', 'fa-arrow-trend-up', 'emerald', true,
      'IF ROAS ≥ 3.5x AND CTR ≥ 2% AND Spend ≥ $500/day',
      'THEN increase daily budget by +10% every 72 hours (max $5,000/day)',
      '12 campaigns', '38 actions today')}
    ${ruleCard('Kill Underperformers', 'fa-scissors', 'red', true,
      'IF CTR < 0.8% AND Impressions ≥ 500 AND Status = Active',
      'THEN pause creative, reallocate budget to top performer, notify team',
      '37 creatives killed', '3 actions today')}
    ${ruleCard('Budget Guardian', 'fa-shield-halved', 'amber', true,
      'IF Daily Spend reaches 90% of budget cap before 6 PM',
      'THEN reduce bids by 20% OR pause lowest ROAS campaigns until midnight',
      'Protected $12,400', '2 triggers today')}
    ${ruleCard('Audience Expander', 'fa-users', 'blue', true,
      'IF Frequency ≥ 3.5 OR CPM increases 30% in 48h',
      'THEN expand lookalike to next % tier, build new interest audience',
      '8 expansions', '1 action today')}
    ${ruleCard('Creative Refresher', 'fa-wand-magic-sparkles', 'purple', true,
      'IF Campaign running > 14 days AND CTR declining > 15%',
      'THEN generate 3 new AI creatives, start A/B test, notify creative team',
      '24 refreshes', '0 today')}
    ${ruleCard('CPA Alert', 'fa-triangle-exclamation', 'orange', false,
      'IF CPA increases > 25% compared to 7-day average',
      'THEN pause campaign, send Slack alert, create optimization report',
      'Paused 4 campaigns', 'Inactive')}
  </div>

  <!-- Rule Builder Modal -->
  <div id="rule-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-fadeIn" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass">
        <h2 class="font-bold text-white">Create Automation Rule</h2>
        <button onclick="closeRuleModal()" class="text-slate-500 hover:text-slate-300"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Rule Name</label>
          <input type="text" placeholder="e.g., Scale High-ROAS Campaigns" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
        </div>
        <!-- Trigger -->
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">IF</span>
            <span class="font-semibold text-white text-sm">Trigger Condition</span>
          </div>
          <div class="grid grid-cols-3 gap-2 mb-2">
            <select class="glass rounded-lg px-3 py-2 text-xs text-slate-300 outline-none border border-white/10">
              <option>ROAS</option><option>CTR</option><option>CPA</option><option>Spend</option><option>Impressions</option><option>Frequency</option>
            </select>
            <select class="glass rounded-lg px-3 py-2 text-xs text-slate-300 outline-none border border-white/10">
              <option>≥ greater than</option><option>≤ less than</option><option>= equals</option><option>↑ increases by</option><option>↓ decreases by</option>
            </select>
            <input type="text" placeholder="3.5" class="glass rounded-lg px-3 py-2 text-xs text-slate-200 outline-none border border-white/10"/>
          </div>
          <button class="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
            <i class="fas fa-plus text-xs"></i> Add AND condition
          </button>
        </div>
        <!-- Action -->
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-8 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">THEN</span>
            <span class="font-semibold text-white text-sm">Action</span>
          </div>
          <select class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-300 outline-none border border-white/10 mb-2">
            <option>Increase budget by %</option>
            <option>Decrease budget by %</option>
            <option>Pause campaign/creative</option>
            <option>Generate new creatives</option>
            <option>Send notification</option>
            <option>Expand audience</option>
            <option>Adjust bid strategy</option>
          </select>
        </div>
        <div class="flex justify-end gap-3">
          <button onclick="closeRuleModal()" class="glass hover:bg-white/10 text-slate-400 px-5 py-2 rounded-xl text-sm">Cancel</button>
          <button onclick="saveRule()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-semibold">Save Rule</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    function openRuleModal() { document.getElementById('rule-modal').classList.remove('hidden'); }
    function closeRuleModal() { document.getElementById('rule-modal').classList.add('hidden'); }
    function saveRule() { closeRuleModal(); }
  </script>
  `
  return shell('Automation', content, '/automation', lang)
}

function autoStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400"></i>
    </div>
    <div><div class="text-xl font-black text-white">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function ruleCard(title: string, icon: string, color: string, active: boolean, trigger: string, action: string, stat1: string, stat2: string): string {
  return `<div class="glass rounded-2xl p-5 hover:bg-white/3 transition-all">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
          <i class="fas ${icon} text-${color}-400"></i>
        </div>
        <div>
          <h3 class="font-bold text-white">${title}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-slate-500">${stat1}</span>
            <span class="text-slate-700">·</span>
            <span class="text-xs text-${color}-400">${stat2}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="this.textContent = this.textContent === 'Pause' ? 'Resume' : 'Pause'" 
          class="text-xs glass hover:bg-white/10 px-3 py-1.5 rounded-lg text-slate-400 transition-all">${active ? 'Pause' : 'Resume'}</button>
        <button class="w-8 h-8 rounded-lg glass hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all">
          <i class="fas fa-pencil text-xs"></i>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="glass rounded-xl p-3">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">IF</span>
        </div>
        <p class="text-xs text-slate-400">${trigger}</p>
      </div>
      <div class="glass rounded-xl p-3">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">THEN</span>
        </div>
        <p class="text-xs text-slate-400">${action}</p>
      </div>
    </div>
  </div>`
}
