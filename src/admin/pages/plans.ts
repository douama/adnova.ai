import type { Context } from 'hono'
import { adminShell } from '../layout'
import { PLANS } from '../../pages/landing'

export const renderAdminPlans = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-black text-white">Plans & Tarification</h2>
      <p class="text-xs text-slate-500 mt-0.5">Gérez les plans d'abonnement et leurs limites — cliquez sur <strong class="text-orange-400">Modifier</strong> pour éditer</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2 text-xs text-emerald-400 glass px-3 py-1.5 rounded-xl">
        <i class="fas fa-check-circle"></i> Synced with landing
      </div>
      <button onclick="openNewPlanModal()" class="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center gap-1.5">
        <i class="fas fa-plus"></i> Nouveau Plan
      </button>
    </div>
  </div>

  <!-- Plans Cards (éditables) -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" id="plans-grid">
    ${adminPlanCard(PLANS[0], 1240, 370760, '37.1%', '94.2%', 0)}
    ${adminPlanCard(PLANS[1], 892, 713108, '37.0%', '96.8%', 1)}
    ${adminPlanCard(PLANS[2], 280, 3360000, '26.0%', '99.1%', 2)}
  </div>

  <!-- Plan Stats Table -->
  <div class="glass rounded-2xl p-5 mb-6">
    <h3 class="font-bold text-white mb-4">Comparaison des Métriques par Plan</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="text-slate-600 border-b border-white/5">
            <th class="text-left pb-3 font-semibold">Métrique</th>
            <th class="text-center pb-3 font-semibold text-indigo-400">Starter</th>
            <th class="text-center pb-3 font-semibold text-orange-400">Growth</th>
            <th class="text-center pb-3 font-semibold text-emerald-400">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          ${planMetric('Clients actifs', '1,240', '892', '280')}
          ${planMetric('MRR généré', '$370K', '$713K', '$3.36M')}
          ${planMetric('ROAS moyen', '3.4x', '4.9x', '6.2x')}
          ${planMetric('Spend géré/mois', '$12M', '$89M', '$312M')}
          ${planMetric('Campagnes actives', '12,400', '22,300', '12,584')}
          ${planMetric('Créatifs générés/j', '2,480K', '5,460K', '4,860K')}
          ${planMetric('Taux de rétention', '91.4%', '95.8%', '98.9%')}
          ${planMetric('NPS moyen', '62', '74', '89')}
          ${planMetric('Churn mensuel', '3.2%', '1.8%', '0.4%')}
          ${planMetric('Upgrades/mois', '+48', '+28', '+4')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Upgrade/Downgrade History -->
  <div class="glass rounded-2xl p-5">
    <h3 class="font-bold text-white mb-4">Mouvements de Plans Récents</h3>
    <div class="space-y-2">
      ${planMove('Apex Marketing', 'Growth', 'Enterprise', 'upgrade', '28 mars 2026')}
      ${planMove('Digital Storm', 'Starter', 'Growth', 'upgrade', '31 mars 2026')}
      ${planMove('Trendy Store', '—', 'Trial', 'new', '27 mars 2026')}
      ${planMove('Fashion Brand', '—', 'Trial', 'new', '29 mars 2026')}
      ${planMove('OldBrand Corp', 'Growth', 'Starter', 'downgrade', '25 mars 2026')}
      ${planMove('SpamCo', 'Starter', '—', 'suspended', '01 mars 2026')}
    </div>
  </div>

  <!-- ── Modal Édition Plan ──────────────────────────────────────────── -->
  <div id="edit-plan-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onclick="if(event.target===this)closeEditPlanModal()">
    <div class="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-orange-500/20 animate-fadeIn">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center"><i class="fas fa-edit text-white text-sm"></i></div>
          <div>
            <h3 class="font-bold text-white" id="edit-plan-title">Modifier le plan</h3>
            <p class="text-xs text-slate-500">Modifiez les limites et le prix — sauvegardez pour appliquer</p>
          </div>
        </div>
        <button onclick="closeEditPlanModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times text-xs"></i></button>
      </div>
      <div class="p-6 space-y-5">
        <!-- Section Prix -->
        <div class="glass rounded-xl p-4 border border-white/5">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><i class="fas fa-dollar-sign text-orange-400"></i> Tarification</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Nom du plan</label>
              <input id="ep-name" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Prix mensuel ($)</label>
              <input id="ep-price" type="number" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent"/>
            </div>
          </div>
        </div>

        <!-- Section Limites -->
        <div class="glass rounded-xl p-4 border border-white/5">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><i class="fas fa-sliders text-blue-400"></i> Limites & Quotas</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Spend publicitaire max</label>
              <input id="ep-adspend" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent" placeholder="ex: $10K/mois"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Campagnes actives max</label>
              <input id="ep-campaigns" type="number" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Plateformes connectées</label>
              <input id="ep-platforms" type="number" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Utilisateurs max</label>
              <input id="ep-users" type="number" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Créatifs / mois</label>
              <input id="ep-creatives" type="number" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent"/>
            </div>
          </div>
        </div>

        <!-- Section Features -->
        <div class="glass rounded-xl p-4 border border-white/5">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><i class="fas fa-list-check text-emerald-400"></i> Fonctionnalités incluses</h4>
            <button onclick="addFeatureLine()" class="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"><i class="fas fa-plus text-xs"></i> Ajouter</button>
          </div>
          <div id="ep-features-list" class="space-y-2">
            <!-- Injected dynamically -->
          </div>
        </div>

        <div class="flex items-center gap-3 pt-2">
          <button onclick="saveEditPlan()" class="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
            <i class="fas fa-save text-xs"></i> Sauvegarder les modifications
          </button>
          <button onclick="closeEditPlanModal()" class="glass hover:bg-white/10 text-slate-400 py-3 px-6 rounded-xl text-sm font-semibold transition-all">Annuler</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Modal Nouveau Plan ──────────────────────────────────────────── -->
  <div id="new-plan-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onclick="if(event.target===this)document.getElementById('new-plan-modal').classList.add('hidden')">
    <div class="glass rounded-2xl w-full max-w-md border border-emerald-500/20 animate-fadeIn">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"><i class="fas fa-plus text-white text-sm"></i></div>
          <h3 class="font-bold text-white">Créer un nouveau plan</h3>
        </div>
        <button onclick="document.getElementById('new-plan-modal').classList.add('hidden')" class="text-slate-500 hover:text-slate-300 w-8 h-8 glass rounded-lg flex items-center justify-center"><i class="fas fa-times text-xs"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Nom du plan</label>
          <input id="np-name" placeholder="ex: Pro" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-emerald-500 transition-all bg-transparent"/>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Prix mensuel ($, 0 = Sur devis)</label>
          <input id="np-price" type="number" placeholder="499" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-emerald-500 transition-all bg-transparent"/>
        </div>
        <div class="flex gap-3">
          <button onclick="createNewPlan()" class="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
            <i class="fas fa-plus text-xs"></i> Créer
          </button>
          <button onclick="document.getElementById('new-plan-modal').classList.add('hidden')" class="glass hover:bg-white/10 text-slate-400 py-3 px-5 rounded-xl text-sm font-semibold">Annuler</button>
        </div>
      </div>
    </div>
  </div>

  <script>
  // Plans data (editable copy)
  let PLANS_EDIT = ${JSON.stringify(PLANS.map((p,i) => ({ ...p, idx: i })))};

  let currentEditIdx = -1;

  function openEditPlan(idx) {
    currentEditIdx = idx;
    const p = PLANS_EDIT[idx];
    document.getElementById('edit-plan-title').textContent = 'Modifier — ' + p.name;
    document.getElementById('ep-name').value = p.name || '';
    document.getElementById('ep-price').value = p.price || 0;
    document.getElementById('ep-adspend').value = p.adSpend || '';
    document.getElementById('ep-campaigns').value = p.campaigns || '';
    document.getElementById('ep-platforms').value = p.platforms || '';
    document.getElementById('ep-users').value = p.users || '';
    document.getElementById('ep-creatives').value = p.creatives || '';

    // Render features
    const fl = document.getElementById('ep-features-list');
    fl.innerHTML = '';
    (p.features || []).forEach((f, fi) => addFeatureLine(f, fi));

    document.getElementById('edit-plan-modal').classList.remove('hidden');
  }

  function closeEditPlanModal() {
    document.getElementById('edit-plan-modal').classList.add('hidden');
    currentEditIdx = -1;
  }

  function addFeatureLine(value = '', idx = Date.now()) {
    const fl = document.getElementById('ep-features-list');
    const div = document.createElement('div');
    div.className = 'flex items-center gap-2 feature-line';
    div.dataset.fi = String(idx);
    div.innerHTML = \`
      <i class="fas fa-check text-emerald-400 text-xs flex-shrink-0 w-4"></i>
      <input value="\${value}" placeholder="Fonctionnalité..." class="flex-1 glass rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all bg-transparent"/>
      <button onclick="this.closest('.feature-line').remove()" class="w-6 h-6 glass hover:bg-red-500/10 rounded flex items-center justify-center text-slate-600 hover:text-red-400 transition-all flex-shrink-0">
        <i class="fas fa-minus text-xs"></i>
      </button>
    \`;
    fl.appendChild(div);
    div.querySelector('input').focus();
  }

  function saveEditPlan() {
    if (currentEditIdx < 0) return;
    const p = PLANS_EDIT[currentEditIdx];
    const name = document.getElementById('ep-name').value.trim();
    const price = parseInt(document.getElementById('ep-price').value) || 0;
    const adSpend = document.getElementById('ep-adspend').value.trim();
    const campaigns = parseInt(document.getElementById('ep-campaigns').value) || 0;
    const platforms = parseInt(document.getElementById('ep-platforms').value) || 0;
    const users = parseInt(document.getElementById('ep-users').value) || 0;
    const creatives = parseInt(document.getElementById('ep-creatives').value) || 0;
    const features = [...document.querySelectorAll('#ep-features-list .feature-line input')]
      .map(i => i.value.trim()).filter(Boolean);

    if (!name) { showAdminToast('⚠ Le nom du plan est requis', 'amber'); return; }

    // Update in-memory
    PLANS_EDIT[currentEditIdx] = { ...p, name, price, adSpend, campaigns, platforms, users, creatives, features };

    // Update card UI
    const card = document.querySelector('[data-plan-idx="' + currentEditIdx + '"]');
    if (card) {
      card.querySelector('.plan-card-name').textContent = name;
      card.querySelector('.plan-card-price').innerHTML = price > 0
        ? '$' + price + '<span class="text-sm font-normal text-slate-500">/mois</span>'
        : '<span class="text-lg">Sur devis</span>';
      const featuresList = card.querySelector('.plan-card-features');
      if (featuresList) {
        featuresList.innerHTML = features.slice(0, 5).map(f =>
          '<li class="flex items-center gap-2 text-xs text-slate-400"><i class="fas fa-check text-xs" style="color:' + (p.color||'#f97316') + '"></i> ' + f + '</li>'
        ).join('') + (features.length > 5 ? '<li class="text-xs text-slate-600">+ ' + (features.length - 5) + ' autres...</li>' : '');
      }
      const limitsEl = card.querySelector('.plan-card-limits');
      if (limitsEl) {
        limitsEl.innerHTML = [
          adSpend ? '<span><i class="fas fa-bolt text-amber-400 mr-1"></i>' + adSpend + '</span>' : '',
          campaigns ? '<span><i class="fas fa-bullhorn text-blue-400 mr-1"></i>' + campaigns + ' campagnes</span>' : '',
          platforms ? '<span><i class="fas fa-plug text-purple-400 mr-1"></i>' + platforms + ' plateformes</span>' : '',
          users ? '<span><i class="fas fa-users text-emerald-400 mr-1"></i>' + users + ' users</span>' : '',
        ].filter(Boolean).join('');
      }
    }

    closeEditPlanModal();
    showAdminToast('✓ Plan "' + name + '" mis à jour', 'emerald');
  }

  function openNewPlanModal() {
    document.getElementById('np-name').value = '';
    document.getElementById('np-price').value = '';
    document.getElementById('new-plan-modal').classList.remove('hidden');
  }

  function createNewPlan() {
    const name = document.getElementById('np-name').value.trim();
    const price = parseInt(document.getElementById('np-price').value) || 0;
    if (!name) { showAdminToast('⚠ Nom du plan requis', 'amber'); return; }
    const newPlan = { id: name.toLowerCase().replace(/\\s/g,'-'), name, price, color:'#94a3b8', features:[], adSpend:'', campaigns:0, platforms:0, users:0, creatives:0 };
    const idx = PLANS_EDIT.length;
    PLANS_EDIT.push({ ...newPlan, idx });
    const grid = document.getElementById('plans-grid');
    const div = document.createElement('div');
    div.className = 'glass rounded-2xl p-6 card-hover relative overflow-hidden';
    div.setAttribute('data-plan-idx', String(idx));
    div.innerHTML = \`
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="text-xl font-black text-white plan-card-name">\${name}</div>
          <div class="text-2xl font-black mt-1 text-slate-400 plan-card-price">\${price > 0 ? '$' + price + '<span class="text-sm font-normal text-slate-500">/mois</span>' : '<span class="text-lg">Sur devis</span>'}</div>
        </div>
        <button onclick="openEditPlan(\${idx})" class="text-xs border border-slate-500/40 text-slate-400 px-3 py-1.5 rounded-lg hover:opacity-80 transition-all">
          <i class="fas fa-edit mr-1"></i> Modifier
        </button>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="glass rounded-xl p-2.5 text-center"><div class="text-base font-black text-white">0</div><div class="text-xs text-slate-500">clients</div></div>
        <div class="glass rounded-xl p-2.5 text-center"><div class="text-base font-black text-white">$0</div><div class="text-xs text-slate-500">MRR</div></div>
      </div>
      <ul class="plan-card-features space-y-1.5 mb-4 text-xs text-slate-600"><li>— Aucune fonctionnalité définie —</li></ul>
      <div class="plan-card-limits flex flex-wrap gap-2 text-xs text-slate-600"></div>
    \`;
    grid.appendChild(div);
    document.getElementById('new-plan-modal').classList.add('hidden');
    showAdminToast('✓ Plan "' + name + '" créé — cliquez sur Modifier pour configurer', 'emerald');
  }

  function showAdminToast(msg, type = 'emerald') {
    const colors = { emerald:'bg-emerald-500/20 border-emerald-500/30 text-emerald-300', amber:'bg-amber-500/20 border-amber-500/30 text-amber-300', red:'bg-red-500/20 border-red-500/30 text-red-300' };
    const t = document.createElement('div');
    t.className = 'fixed bottom-5 right-5 z-[9999] px-4 py-3 rounded-xl border text-sm font-semibold backdrop-blur-xl shadow-2xl ' + (colors[type]||colors.emerald);
    t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 4000);
  }
  </script>
  `
  return c.html(adminShell('Plans & Tarification', content, '/admin/plans'))
}

// ─── New function using PLANS source of truth (with edit support) ─────────
function adminPlanCard(plan: { id: string; name: string; price: number; color: string; features: string[]; adSpend: string; campaigns: number; platforms: number; users: number; creatives: number }, clients: number, mrr: number, growth: string, retention: string, idx: number): string {
  const priceStr = plan.price > 0 ? `$${plan.price}<span class="text-sm font-normal text-slate-500">/mois</span>` : `<span class="text-lg">Sur devis</span>`
  return `<div class="glass rounded-2xl p-6 card-hover relative overflow-hidden" data-plan-idx="${idx}">
    <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10" style="background:${plan.color}"></div>
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="text-xl font-black text-white plan-card-name">${plan.name}</div>
        <div class="text-2xl font-black mt-1 plan-card-price" style="color:${plan.color}">${priceStr}</div>
      </div>
      <button onclick="openEditPlan(${idx})" class="text-xs border px-3 py-1.5 rounded-lg hover:opacity-80 transition-all flex items-center gap-1.5 font-semibold" style="color:${plan.color};border-color:${plan.color}40">
        <i class="fas fa-edit"></i> Modifier
      </button>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div class="glass rounded-xl p-2.5 text-center">
        <div class="text-base font-black text-white">${clients.toLocaleString()}</div>
        <div class="text-xs text-slate-500">clients</div>
      </div>
      <div class="glass rounded-xl p-2.5 text-center">
        <div class="text-base font-black text-white">$${(mrr/1000).toFixed(0)}K</div>
        <div class="text-xs text-slate-500">MRR</div>
      </div>
    </div>
    <ul class="plan-card-features space-y-1.5 mb-4">
      ${plan.features.slice(0, 5).map(f => `<li class="flex items-center gap-2 text-xs text-slate-400">
        <i class="fas fa-check text-xs" style="color:${plan.color}"></i> ${f}
      </li>`).join('')}
      ${plan.features.length > 5 ? `<li class="text-xs text-slate-600">+ ${plan.features.length - 5} autres fonctionnalités...</li>` : ''}
    </ul>
    <div class="plan-card-limits flex flex-wrap gap-2 mb-4 text-xs">
      <span class="glass rounded-lg px-2 py-1 text-slate-400 flex items-center gap-1"><i class="fas fa-bolt text-amber-400"></i>${plan.adSpend}</span>
      <span class="glass rounded-lg px-2 py-1 text-slate-400 flex items-center gap-1"><i class="fas fa-bullhorn text-blue-400"></i>${plan.campaigns} camp.</span>
      <span class="glass rounded-lg px-2 py-1 text-slate-400 flex items-center gap-1"><i class="fas fa-plug text-purple-400"></i>${plan.platforms} plat.</span>
      <span class="glass rounded-lg px-2 py-1 text-slate-400 flex items-center gap-1"><i class="fas fa-users text-emerald-400"></i>${plan.users} users</span>
    </div>
    <div class="flex gap-2 text-xs">
      <span class="flex-1 text-center py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">Rétention: ${retention}</span>
      <span class="flex-1 text-center py-1.5 rounded-lg bg-blue-500/10 text-blue-400">Croissance: ${growth}</span>
    </div>
  </div>`
}

function planMetric(label: string, starter: string, growth: string, enterprise: string): string {
  return `<tr class="table-row border-b border-white/5">
    <td class="py-2.5 text-slate-400">${label}</td>
    <td class="py-2.5 text-center text-indigo-400 font-semibold">${starter}</td>
    <td class="py-2.5 text-center text-orange-400 font-semibold">${growth}</td>
    <td class="py-2.5 text-center text-emerald-400 font-semibold">${enterprise}</td>
  </tr>`
}

function planMove(tenant: string, from: string, to: string, type: string, date: string): string {
  const icons: Record<string,string> = { upgrade: 'fa-arrow-up text-emerald-400', downgrade: 'fa-arrow-down text-amber-400', new: 'fa-plus text-blue-400', suspended: 'fa-ban text-red-400' }
  const labels: Record<string,string> = { upgrade: 'Upgrade', downgrade: 'Downgrade', new: 'Inscription', suspended: 'Suspendu' }
  return `<div class="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/3 transition-all">
    <div class="flex items-center gap-3">
      <div class="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
        <i class="fas ${icons[type]} text-xs"></i>
      </div>
      <div>
        <span class="text-xs font-semibold text-slate-200">${tenant}</span>
        <div class="text-xs text-slate-600">${from !== '—' ? from + ' → ' : ''}${to}</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs text-slate-500">${date}</span>
      <span class="text-xs font-bold px-2 py-0.5 rounded-full ${type === 'upgrade' ? 'bg-emerald-500/15 text-emerald-400' : type === 'downgrade' ? 'bg-amber-500/15 text-amber-400' : type === 'new' ? 'bg-blue-500/15 text-blue-400' : 'bg-red-500/15 text-red-400'}">${labels[type]}</span>
    </div>
  </div>`
}
