
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderAutomation(lang: Lang = 'en'): string {
  const content = `
  <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
    <p class="text-slate-400 text-sm">Build smart automation rules. AI executes them automatically.</p>
    <button onclick="openRuleModal()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-lg">
      <i class="fas fa-plus"></i> New Rule
    </button>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${autoStat('24', 'Active Rules', 'fa-gears', 'brand', 'stat-rules')}
    ${autoStat('1,284', 'Actions Today', 'fa-bolt', 'emerald', 'stat-actions')}
    ${autoStat('$4,200', 'Budget Saved', 'fa-dollar-sign', 'amber', 'stat-saved')}
    ${autoStat('98.7%', 'Rule Accuracy', 'fa-bullseye', 'blue', 'stat-accuracy')}
  </div>

  <!-- Rules Grid -->
  <div class="space-y-3 mb-6" id="rules-container">
    ${ruleCard('r1', 'Auto-Scale Winners', 'fa-arrow-trend-up', 'emerald', true,
      'IF ROAS ≥ 3.5x AND CTR ≥ 2% AND Spend ≥ $500/day',
      'THEN increase daily budget by +10% every 72 hours (max $5,000/day)',
      '12 campaigns', '38 actions today')}
    ${ruleCard('r2', 'Kill Underperformers', 'fa-scissors', 'red', true,
      'IF CTR < 0.8% AND Impressions ≥ 500 AND Status = Active',
      'THEN pause creative, reallocate budget to top performer, notify team',
      '37 creatives killed', '3 actions today')}
    ${ruleCard('r3', 'Budget Guardian', 'fa-shield-halved', 'amber', true,
      'IF Daily Spend reaches 90% of budget cap before 6 PM',
      'THEN reduce bids by 20% OR pause lowest ROAS campaigns until midnight',
      'Protected $12,400', '2 triggers today')}
    ${ruleCard('r4', 'Audience Expander', 'fa-users', 'blue', true,
      'IF Frequency ≥ 3.5 OR CPM increases 30% in 48h',
      'THEN expand lookalike to next % tier, build new interest audience',
      '8 expansions', '1 action today')}
    ${ruleCard('r5', 'Creative Refresher', 'fa-wand-magic-sparkles', 'purple', true,
      'IF Campaign running > 14 days AND CTR declining > 15%',
      'THEN generate 3 new AI creatives, start A/B test, notify creative team',
      '24 refreshes', '0 today')}
    ${ruleCard('r6', 'CPA Alert', 'fa-triangle-exclamation', 'orange', false,
      'IF CPA increases > 25% compared to 7-day average',
      'THEN pause campaign, send Slack alert, create optimization report',
      'Paused 4 campaigns', 'Inactive')}
  </div>

  <!-- ═══════════════════════ CREATE / EDIT RULE MODAL ═══════════════════════ -->
  <div id="rule-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn" style="border:1px solid rgba(99,102,241,0.35)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10 rounded-t-2xl">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-gears text-white text-sm" id="rule-modal-icon"></i>
          </div>
          <div>
            <h2 class="font-bold text-white" id="rule-modal-title">Create Automation Rule</h2>
            <p class="text-xs text-slate-500">Define conditions and actions</p>
          </div>
        </div>
        <button onclick="closeRuleModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>

      <div class="p-5 space-y-4">
        <input type="hidden" id="edit-rule-id" value=""/>

        <!-- Rule Name -->
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Rule Name</label>
          <input type="text" id="rule-name" placeholder="e.g., Scale High-ROAS Campaigns" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
        </div>

        <!-- Trigger Conditions -->
        <div class="glass rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="w-7 h-6 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">IF</span>
              <span class="font-semibold text-white text-sm">Trigger Conditions</span>
            </div>
          </div>
          <div class="space-y-2" id="conditions-list">
            ${conditionRow(0, true)}
          </div>
          <button onclick="addCondition()" class="mt-2 text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-all">
            <i class="fas fa-plus text-xs"></i> Add AND condition
          </button>
        </div>

        <!-- Action -->
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-9 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">THEN</span>
            <span class="font-semibold text-white text-sm">Action</span>
          </div>
          <select id="rule-action" class="w-full glass rounded-lg px-3 py-2.5 text-xs text-slate-300 outline-none border border-white/10 focus:border-brand-500 transition-all mb-2">
            <option value="budget_increase">Increase budget by %</option>
            <option value="budget_decrease">Decrease budget by %</option>
            <option value="pause">Pause campaign/creative</option>
            <option value="generate">Generate new creatives</option>
            <option value="notify">Send notification</option>
            <option value="expand_audience">Expand audience</option>
            <option value="adjust_bid">Adjust bid strategy</option>
          </select>
          <input type="number" id="rule-action-value" placeholder="Value (if applicable, e.g. 10 for 10%)" class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
        </div>

        <!-- Schedule -->
        <div class="glass rounded-xl p-4">
          <div class="flex items-center gap-2 mb-3">
            <span class="font-semibold text-white text-sm"><i class="fas fa-clock mr-2 text-slate-500"></i>Schedule & Priority</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Check Frequency</label>
              <select id="rule-freq" class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-300 outline-none border border-white/10">
                <option>Every hour</option>
                <option selected>Every 6 hours</option>
                <option>Every 12 hours</option>
                <option>Every 24 hours</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Priority</label>
              <select id="rule-priority" class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-300 outline-none border border-white/10">
                <option>High</option>
                <option selected>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-1">
          <button onclick="closeRuleModal()" class="glass hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all">Cancel</button>
          <button onclick="saveRule()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2">
            <i class="fas fa-save"></i> Save Rule
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete confirm modal -->
  <div id="delete-rule-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-sm p-6 animate-fadeIn" style="border:1px solid rgba(239,68,68,0.3)">
      <div class="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-trash text-red-400 text-xl"></i>
      </div>
      <h3 class="font-bold text-white text-center mb-2">Delete Rule?</h3>
      <p class="text-xs text-slate-400 text-center mb-5">This rule will be permanently deleted. All automations will stop.</p>
      <div class="flex gap-3">
        <button onclick="closeDeleteModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm transition-all">Cancel</button>
        <button onclick="confirmDeleteRule()" class="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-all">Delete</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="auto-toast" class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none"></div>

  <script>
  let conditionCount = 1;
  let ruleToDelete = null;
  let editingRuleId = null;

  // ── Conditions ─────────────────────────────────────────────────────────────
  function addCondition() {
    const list = document.getElementById('conditions-list');
    const idx = conditionCount++;
    const div = document.createElement('div');
    div.id = 'cond-' + idx;
    div.className = 'flex items-center gap-2';
    div.innerHTML = \`
      <span class="text-xs text-slate-600 font-bold w-8 text-center flex-shrink-0">AND</span>
      <select class="flex-1 glass rounded-lg px-2 py-2 text-xs text-slate-300 outline-none border border-white/10">
        <option>ROAS</option><option>CTR</option><option>CPA</option><option>Spend</option><option>Impressions</option><option>Frequency</option>
      </select>
      <select class="glass rounded-lg px-2 py-2 text-xs text-slate-300 outline-none border border-white/10 w-28">
        <option>≥ gte</option><option>≤ lte</option><option>= equals</option><option>↑ increases</option><option>↓ decreases</option>
      </select>
      <input type="text" placeholder="Value" class="w-16 glass rounded-lg px-2 py-2 text-xs text-slate-200 outline-none border border-white/10"/>
      <button onclick="removeCondition(\${idx})" class="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all flex-shrink-0">
        <i class="fas fa-times text-xs"></i>
      </button>
    \`;
    list.appendChild(div);
  }
  function removeCondition(idx) {
    document.getElementById('cond-'+idx)?.remove();
  }

  // ── Open / Close modal ────────────────────────────────────────────────────
  function openRuleModal(ruleId) {
    editingRuleId = ruleId || null;
    document.getElementById('edit-rule-id').value = ruleId || '';
    document.getElementById('rule-modal-title').textContent = ruleId ? 'Edit Automation Rule' : 'Create Automation Rule';
    document.getElementById('rule-modal-icon').className = ruleId ? 'fas fa-pencil text-white text-sm' : 'fas fa-gears text-white text-sm';
    // Reset conditions to 1
    const list = document.getElementById('conditions-list');
    list.innerHTML = '';
    conditionCount = 1;
    const div = document.createElement('div');
    div.id = 'cond-0';
    div.className = 'flex items-center gap-2';
    div.innerHTML = \`
      <span class="text-xs text-slate-600 font-bold w-8 text-center flex-shrink-0 invisible">AND</span>
      <select class="flex-1 glass rounded-lg px-2 py-2 text-xs text-slate-300 outline-none border border-white/10">
        <option>ROAS</option><option>CTR</option><option>CPA</option><option>Spend</option><option>Impressions</option><option>Frequency</option>
      </select>
      <select class="glass rounded-lg px-2 py-2 text-xs text-slate-300 outline-none border border-white/10 w-28">
        <option>≥ gte</option><option>≤ lte</option><option>= equals</option><option>↑ increases</option><option>↓ decreases</option>
      </select>
      <input type="text" placeholder="3.5" class="w-16 glass rounded-lg px-2 py-2 text-xs text-slate-200 outline-none border border-white/10"/>
    \`;
    list.appendChild(div);
    document.getElementById('rule-modal').classList.remove('hidden');
  }
  function closeRuleModal() { document.getElementById('rule-modal').classList.add('hidden'); }

  // ── Save rule ──────────────────────────────────────────────────────────────
  function saveRule() {
    const name = document.getElementById('rule-name').value.trim();
    if (!name) {
      document.getElementById('rule-name').classList.add('border-red-500');
      showAutoToast('Please enter a rule name', 'red');
      return;
    }
    document.getElementById('rule-name').classList.remove('border-red-500');

    if (editingRuleId) {
      // Update existing rule card title
      const el = document.querySelector('#rule-card-' + editingRuleId + ' .rule-title');
      if (el) el.textContent = name;
      showAutoToast('Rule "' + name + '" updated successfully', 'brand');
    } else {
      // Append new rule card
      const container = document.getElementById('rules-container');
      const id = 'r' + Date.now();
      const action = document.getElementById('rule-action');
      const actionText = action.options[action.selectedIndex].text;
      const card = document.createElement('div');
      card.id = 'rule-card-' + id;
      card.className = 'glass rounded-2xl p-5 hover:bg-white/3 transition-all border border-brand-500/20 animate-fadeIn';
      card.innerHTML = \`
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
              <i class="fas fa-gears text-brand-400"></i>
            </div>
            <div>
              <h3 class="font-bold text-white rule-title">\${name}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">Active</span>
                <span class="text-slate-700">·</span>
                <span class="text-xs text-slate-400">Just created</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="toggleRule('\${id}', this)" class="text-xs glass hover:bg-white/10 px-3 py-1.5 rounded-lg text-slate-400 transition-all">Pause</button>
            <button onclick="openRuleModal('\${id}')" class="w-8 h-8 rounded-lg glass hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all">
              <i class="fas fa-pencil text-xs"></i>
            </button>
            <button onclick="deleteRule('\${id}')" class="w-8 h-8 rounded-lg glass hover:bg-red-500/10 flex items-center justify-center text-red-400 transition-all">
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="glass rounded-xl p-3">
            <span class="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">IF</span>
            <p class="text-xs text-slate-400 mt-1">Conditions configured</p>
          </div>
          <div class="glass rounded-xl p-3">
            <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">THEN</span>
            <p class="text-xs text-slate-400 mt-1">\${actionText}</p>
          </div>
        </div>
      \`;
      container.prepend(card);
      // Update stats counter
      const statEl = document.getElementById('stat-rules');
      if (statEl) statEl.textContent = (parseInt(statEl.textContent) + 1).toString();
      showAutoToast('Rule "' + name + '" created and activated', 'emerald');
    }
    document.getElementById('rule-name').value = '';
    closeRuleModal();
  }

  // ── Toggle rule active/paused ──────────────────────────────────────────────
  function toggleRule(id, btn) {
    const isPaused = btn.textContent.trim() === 'Resume';
    btn.textContent = isPaused ? 'Pause' : 'Resume';
    showAutoToast(isPaused ? 'Rule resumed — AI will execute it' : 'Rule paused — no actions will be taken', isPaused ? 'emerald' : 'amber');
  }

  // ── Delete rule ─────────────────────────────────────────────────────────────
  function deleteRule(id) {
    ruleToDelete = id;
    document.getElementById('delete-rule-modal').classList.remove('hidden');
  }
  function closeDeleteModal() { document.getElementById('delete-rule-modal').classList.add('hidden'); ruleToDelete = null; }
  function confirmDeleteRule() {
    if (ruleToDelete) {
      const card = document.getElementById('rule-card-' + ruleToDelete);
      if (card) card.remove();
    }
    closeDeleteModal();
    showAutoToast('Rule deleted permanently', 'red');
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showAutoToast(msg, color='brand') {
    const colors = { brand:'bg-brand-500/90', emerald:'bg-emerald-500/90', amber:'bg-amber-500/90', red:'bg-red-500/90' };
    const t = document.createElement('div');
    t.className = \`\${colors[color]||colors.brand} text-white text-xs px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm pointer-events-auto flex items-center gap-2 animate-fadeIn\`;
    t.innerHTML = \`<i class="fas fa-\${color==='red'?'exclamation-circle':'check-circle'}"></i> \${msg}\`;
    const container = document.getElementById('auto-toast');
    container.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  // Close on backdrop
  ['rule-modal','delete-rule-modal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function(e) {
      if (e.target === this) this.classList.add('hidden');
    });
  });

  // Existing rule cards toggle / edit bindings
  document.querySelectorAll('[data-rule-id]').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.ruleId;
      const action = this.dataset.action;
      if (action === 'toggle') toggleRule(id, this);
      if (action === 'edit') openRuleModal(id);
      if (action === 'delete') deleteRule(id);
    });
  });
  </script>
  `
  return shell('Automation', content, '/automation', lang)
}

function autoStat(val: string, label: string, icon: string, color: string, id: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400"></i>
    </div>
    <div><div class="text-xl font-black text-white" id="${id}">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function conditionRow(idx: number, first: boolean): string {
  return `<div id="cond-${idx}" class="flex items-center gap-2">
    <span class="text-xs text-slate-600 font-bold w-8 text-center flex-shrink-0 ${first ? 'invisible' : ''}">AND</span>
    <select class="flex-1 glass rounded-lg px-2 py-2 text-xs text-slate-300 outline-none border border-white/10">
      <option>ROAS</option><option>CTR</option><option>CPA</option><option>Spend</option><option>Impressions</option><option>Frequency</option>
    </select>
    <select class="glass rounded-lg px-2 py-2 text-xs text-slate-300 outline-none border border-white/10 w-28">
      <option>≥ gte</option><option>≤ lte</option><option>= equals</option><option>↑ increases</option><option>↓ decreases</option>
    </select>
    <input type="text" placeholder="3.5" class="w-16 glass rounded-lg px-2 py-2 text-xs text-slate-200 outline-none border border-white/10"/>
  </div>`
}

function ruleCard(id: string, title: string, icon: string, color: string, active: boolean, trigger: string, action: string, stat1: string, stat2: string): string {
  return `<div class="glass rounded-2xl p-5 hover:bg-white/3 transition-all" id="rule-card-${id}">
    <div class="flex items-start justify-between mb-3 flex-wrap gap-2">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
          <i class="fas ${icon} text-${color}-400"></i>
        </div>
        <div>
          <h3 class="font-bold text-white rule-title">${title}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-xs text-slate-500">${stat1}</span>
            <span class="text-slate-700">·</span>
            <span class="text-xs text-${color}-400">${stat2}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleRule('${id}', this)" class="text-xs glass hover:bg-white/10 px-3 py-1.5 rounded-lg text-slate-400 transition-all">${active ? 'Pause' : 'Resume'}</button>
        <button onclick="openRuleModal('${id}')" class="w-8 h-8 rounded-lg glass hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all">
          <i class="fas fa-pencil text-xs"></i>
        </button>
        <button onclick="deleteRule('${id}')" class="w-8 h-8 rounded-lg glass hover:bg-red-500/10 flex items-center justify-center text-red-400 transition-all">
          <i class="fas fa-trash text-xs"></i>
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
