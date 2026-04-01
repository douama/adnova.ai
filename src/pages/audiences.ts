import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderAudiences(lang: Lang = 'en'): string {
  const content = `
  <!-- Header + Actions -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
    <div class="flex items-center gap-2 flex-wrap">
      <div class="glass rounded-xl px-3 py-2 flex items-center gap-2">
        <i class="fas fa-search text-slate-500 text-xs"></i>
        <input id="aud-search" placeholder="Rechercher audience..." class="bg-transparent text-slate-300 placeholder-slate-600 outline-none text-xs w-40"
          oninput="filterAudiences(this.value)"/>
      </div>
      <select id="aud-type-filter" onchange="filterAudiences()" class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 cursor-pointer bg-transparent">
        <option value="">Tous types</option>
        <option value="Lookalike">Lookalike</option>
        <option value="Retargeting">Retargeting</option>
        <option value="Interest">Interest</option>
        <option value="Intent">Intent</option>
      </select>
      <select id="aud-platform-filter" onchange="filterAudiences()" class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 cursor-pointer bg-transparent">
        <option value="">Toutes plateformes</option>
        <option value="Facebook">Facebook</option>
        <option value="Google">Google</option>
        <option value="Instagram">Instagram</option>
        <option value="TikTok">TikTok</option>
      </select>
    </div>
    <button onclick="openAudienceModal()" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all">
      <i class="fas fa-plus"></i> New Audience
    </button>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
    ${audStat('47', 'Total Audiences', 'fa-users', 'brand')}
    ${audStat('12.4M', 'Total Reach', 'fa-globe', 'emerald')}
    ${audStat('84.2%', 'Avg Match Rate', 'fa-bullseye', 'blue')}
    ${audStat('3.2x', 'Lookalike CTR Lift', 'fa-chart-line', 'purple')}
  </div>

  <!-- Audience Cards Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-5" id="audiences-grid">
    ${audienceCard('top-converters-1', 'Top Converters Lookalike 1%', 'Lookalike', '1.2M', '88%', 'emerald', 'Built from 1,200 highest-LTV customers. Best for conversion campaigns.', ['Facebook','Instagram'], '4.8x ROAS avg')}
    ${audienceCard('cart-abandon', 'Retargeting — Cart Abandon', 'Retargeting', '45,200', '97%', 'blue', 'Users who added to cart in last 30 days. High purchase intent.', ['Facebook','Google'], '7.2x ROAS avg')}
    ${audienceCard('fashion-interest', 'Interest: Fashion Shoppers', 'Interest', '3.4M', '71%', 'purple', 'AI-curated interest cluster for fashion-conscious 18-35 females.', ['Facebook','Instagram','TikTok'], '3.1x ROAS avg')}
    ${audienceCard('top-converters-3', 'Top Converters Lookalike 3%', 'Lookalike', '3.6M', '82%', 'cyan', 'Broader expansion from top converter seed. Good for scale.', ['Facebook','Instagram'], '3.8x ROAS avg')}
    ${audienceCard('website-14d', 'Website Visitors 14d', 'Retargeting', '128,400', '95%', 'amber', 'All website visitors last 14 days. Great for brand recall.', ['Facebook','Google'], '5.1x ROAS avg')}
    ${audienceCard('competitor', 'Competitor Audience', 'Intent', '820K', '64%', 'rose', 'Users engaging with competitor brands. High-intent switching.', ['TikTok','Snapchat'], '2.8x ROAS avg')}
  </div>

  <!-- AI Audience Insights -->
  <div class="glass rounded-2xl p-4 mb-4">
    <div class="flex items-center gap-2 mb-3">
      <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
        <i class="fas fa-brain text-brand-400 text-sm"></i>
      </div>
      <h3 class="font-bold text-white">AI Audience Insights</h3>
      <span class="badge-live text-xs px-2 py-0.5 rounded-full ml-auto">Live</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="glass rounded-xl p-3 border border-brand-500/10">
        <div class="flex items-center gap-2 mb-1.5">
          <i class="fas fa-trophy text-amber-400 text-xs"></i>
          <span class="text-xs font-semibold text-white">Predicted Best Audience</span>
        </div>
        <p class="text-xs text-slate-400 leading-relaxed">Cibler <span class="text-brand-400 font-semibold">Fashion Shoppers F18-34 + 1% Lookalike</span> pour votre prochaine campagne. ROAS estimé: <span class="text-emerald-400 font-bold">4.9x</span></p>
        <button onclick="useAudienceInCampaign('Fashion Shoppers F18-34')" class="mt-2 text-xs text-brand-400 hover:text-brand-300 font-semibold">Utiliser dans une campagne →</button>
      </div>
      <div class="glass rounded-xl p-3 border border-amber-500/10">
        <div class="flex items-center gap-2 mb-1.5">
          <i class="fas fa-triangle-exclamation text-amber-400 text-xs"></i>
          <span class="text-xs font-semibold text-white">Saturation Alert</span>
        </div>
        <p class="text-xs text-slate-400 leading-relaxed">Audience Retargeting à fréquence <span class="text-amber-400 font-semibold">4.2x</span>. Expansion vers 3% lookalike recommandée sous 48h.</p>
        <button onclick="expandAudience('Retargeting Cart Abandon')" class="mt-2 text-xs text-amber-400 hover:text-amber-300 font-semibold">Expand maintenant →</button>
      </div>
      <div class="glass rounded-xl p-3 border border-emerald-500/10">
        <div class="flex items-center gap-2 mb-1.5">
          <i class="fas fa-bolt text-emerald-400 text-xs"></i>
          <span class="text-xs font-semibold text-white">New Opportunity</span>
        </div>
        <p class="text-xs text-slate-400 leading-relaxed">AI identifié <span class="text-emerald-400 font-semibold">2.1M utilisateurs TikTok</span> non-ciblés. CPA estimé: <span class="text-emerald-400 font-bold">$8.20</span></p>
        <button onclick="openAudienceModal('tiktok-opportunity')" class="mt-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold">Créer l'audience →</button>
      </div>
    </div>
  </div>

  <!-- ── New Audience Modal ── -->
  <div id="audience-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 glass">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center"><i class="fas fa-users text-brand-400 text-sm"></i></div>
          <h2 class="font-bold text-white" id="audience-modal-title">Nouvelle Audience</h2>
        </div>
        <button onclick="closeAudienceModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 rounded-lg glass flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-4 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Nom de l'audience *</label>
            <input id="aud-name" type="text" placeholder="Ex: Lookalike Top Buyers 1%" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Type</label>
            <select id="aud-type" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 focus:border-brand-500 bg-transparent cursor-pointer">
              <option value="Lookalike">Lookalike</option>
              <option value="Retargeting">Retargeting</option>
              <option value="Interest">Interest</option>
              <option value="Intent">Intent</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1 block">Description</label>
          <textarea id="aud-desc" rows="2" placeholder="Décrivez la source et l'objectif de cette audience..." class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Source Audience</label>
            <select id="aud-source" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 focus:border-brand-500 bg-transparent cursor-pointer">
              <option>Top 1,000 customers (LTV)</option>
              <option>All purchasers (90d)</option>
              <option>Cart abandoners (30d)</option>
              <option>Website visitors (14d)</option>
              <option>Email list (upload)</option>
              <option>Custom seed list</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Taille cible (%)</label>
            <select id="aud-size" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 focus:border-brand-500 bg-transparent cursor-pointer">
              <option>1% (~1.2M)</option>
              <option>2% (~2.4M)</option>
              <option>3% (~3.6M)</option>
              <option>5% (~6M)</option>
              <option>10% (~12M)</option>
            </select>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-2 block">Plateformes cibles</label>
          <div class="flex flex-wrap gap-2" id="aud-platforms">
            ${['Facebook','Google','Instagram','TikTok','LinkedIn','YouTube','Snapchat'].map(p => `
            <label class="flex items-center gap-1.5 cursor-pointer glass px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all">
              <input type="checkbox" name="aud-platform" value="${p}" class="w-3 h-3 rounded accent-indigo-500"/>
              <span class="text-xs text-slate-300">${p}</span>
            </label>`).join('')}
          </div>
        </div>
        <div class="glass rounded-xl p-3 border border-brand-500/10">
          <div class="flex items-center gap-2 mb-2">
            <i class="fas fa-brain text-brand-400 text-xs"></i>
            <span class="text-xs font-semibold text-brand-300">AI Enhancement</span>
          </div>
          <div class="space-y-2">
            ${aiToggle('aud-ai-refresh', 'Auto-refresh audience mensuel', true)}
            ${aiToggle('aud-ai-expand', 'Expansion automatique si saturation', true)}
            ${aiToggle('aud-ai-suppress', 'Supprimer les clients existants', false)}
          </div>
        </div>
        <div class="flex gap-2 pt-1">
          <button onclick="closeAudienceModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm transition-all">Annuler</button>
          <button onclick="saveAudience()" class="flex-1 bg-gradient-to-r from-brand-600 to-purple-600 text-white py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
            <i class="fas fa-save mr-1.5"></i> Créer l'audience
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Use in Campaign Modal ── -->
  <div id="use-campaign-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md" style="border:1px solid rgba(16,185,129,0.3)">
      <div class="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-white flex items-center gap-2"><i class="fas fa-bullhorn text-emerald-400"></i> Utiliser dans une campagne</h2>
        <button onclick="closeUseCampaignModal()" class="text-slate-500 hover:text-slate-300"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-4 space-y-3">
        <p class="text-xs text-slate-400">Audience sélectionnée: <span id="use-audience-name" class="text-white font-semibold"></span></p>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1 block">Sélectionner une campagne</label>
          <select id="use-campaign-select" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent cursor-pointer">
            <option>Summer Collection 2026</option>
            <option>Product Launch Q3</option>
            <option>Brand Awareness Wave</option>
            <option>Retargeting Engine Pro</option>
            <option>New User Acquisition</option>
            <option>+ Créer nouvelle campagne</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1 block">Adset Name</label>
          <input id="use-adset-name" type="text" placeholder="Ex: Lookalike 1% FR - Summer 2026" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500"/>
        </div>
        <div class="flex gap-2 pt-1">
          <button onclick="closeUseCampaignModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm">Annuler</button>
          <button onclick="confirmUseCampaign()" class="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl text-sm font-bold hover:opacity-90">
            <i class="fas fa-check mr-1.5"></i> Ajouter à la campagne
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // ── Filter audiences ──────────────────────────────────────────────────────
    function filterAudiences(query) {
      const search = (document.getElementById('aud-search')?.value || '').toLowerCase()
      const typeFilter = document.getElementById('aud-type-filter')?.value || ''
      const platformFilter = document.getElementById('aud-platform-filter')?.value || ''
      document.querySelectorAll('.audience-card').forEach(card => {
        const name = card.dataset.name?.toLowerCase() || ''
        const type = card.dataset.type || ''
        const platforms = card.dataset.platforms || ''
        const matchSearch = !search || name.includes(search)
        const matchType = !typeFilter || type === typeFilter
        const matchPlatform = !platformFilter || platforms.includes(platformFilter)
        card.style.display = (matchSearch && matchType && matchPlatform) ? '' : 'none'
      })
    }

    // ── Audience Modal ────────────────────────────────────────────────────────
    function openAudienceModal(preset) {
      document.getElementById('audience-modal').classList.remove('hidden')
      if (preset === 'tiktok-opportunity') {
        document.getElementById('aud-name').value = 'TikTok Lookalike — Top Buyers'
        document.getElementById('aud-type').value = 'Lookalike'
        document.getElementById('aud-desc').value = 'AI-identified 2.1M TikTok users matching best customer profile. Estimated CPA: $8.20'
        const tikTok = document.querySelector('input[value="TikTok"]')
        if (tikTok) tikTok.checked = true
      }
    }
    function closeAudienceModal() {
      document.getElementById('audience-modal').classList.add('hidden')
      document.getElementById('aud-name').value = ''
      document.getElementById('aud-desc').value = ''
    }
    function saveAudience() {
      const name = document.getElementById('aud-name').value.trim()
      if (!name) { showToast('Veuillez saisir un nom pour audience', 'error'); return; }
      const type = document.getElementById('aud-type').value
      const platforms = [...document.querySelectorAll('input[name="aud-platform"]:checked')].map(i => i.value)
      if (!platforms.length) { showToast('Sélectionnez au moins une plateforme', 'error'); return; }
      // Add new card to grid
      const grid = document.getElementById('audiences-grid')
      const colors = {Lookalike:'emerald', Retargeting:'blue', Interest:'purple', Intent:'rose', Custom:'cyan'}
      const color = colors[type] || 'brand'
      const id = 'aud-' + Date.now()
      const html = \`<div class="glass rounded-2xl p-4 card-hover audience-card" id="\${id}"
        data-name="\${name.toLowerCase()}" data-type="\${type}" data-platforms="\${platforms.join(',')}">
        <div class="flex items-start justify-between mb-2">
          <span class="text-xs px-2 py-0.5 rounded-full bg-\${color}-500/20 text-\${color}-400 font-semibold">\${type}</span>
          <span class="text-xs text-emerald-400 font-bold">Nouveau</span>
        </div>
        <h3 class="font-bold text-white text-sm mb-1">\${name}</h3>
        <p class="text-xs text-slate-500 mb-2">\${document.getElementById('aud-desc').value || 'Audience créée manuellement'}</p>
        <div class="flex items-center justify-between mb-2">
          <div><div class="text-base font-black text-white">—</div><div class="text-xs text-slate-500">Building...</div></div>
          <div class="text-right"><div class="text-base font-black text-\${color}-400">—</div><div class="text-xs text-slate-500">Match rate</div></div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex gap-1">\${platforms.map(p => '<span class="text-xs glass px-1.5 py-0.5 rounded text-slate-400">'+p+'</span>').join('')}</div>
          <button onclick="useAudienceInCampaign(\\'\${name}\\')" class="text-xs glass hover:bg-white/10 px-2 py-1 rounded-lg text-slate-400 transition-all">Utiliser</button>
        </div>
      </div>\`
      grid.insertAdjacentHTML('afterbegin', html)
      closeAudienceModal()
      showToast('✓ Audience "' + name + '" créée avec succès!', 'success')
    }

    // ── Use in Campaign ───────────────────────────────────────────────────────
    function useAudienceInCampaign(name) {
      document.getElementById('use-audience-name').textContent = name
      document.getElementById('use-adset-name').value = name + ' — ' + new Date().toLocaleDateString('fr-FR')
      document.getElementById('use-campaign-modal').classList.remove('hidden')
    }
    function closeUseCampaignModal() {
      document.getElementById('use-campaign-modal').classList.add('hidden')
    }
    function confirmUseCampaign() {
      const campaign = document.getElementById('use-campaign-select').value
      const audience = document.getElementById('use-audience-name').textContent
      closeUseCampaignModal()
      showToast('✓ Audience "' + audience + '" ajoutée à "' + campaign + '"', 'success')
    }

    // ── Edit Audience ─────────────────────────────────────────────────────────
    function editAudience(id) {
      const card = document.getElementById('card-' + id);
      if (!card) return;
      const name = card.dataset.name || '';
      const type = card.dataset.type || 'Lookalike';
      document.getElementById('audience-modal-title').textContent = 'Modifier audience';
      document.getElementById('aud-name').value = card.querySelector('h3')?.textContent || name;
      document.getElementById('aud-type').value = type;
      document.getElementById('aud-desc').value = card.querySelector('p')?.textContent || '';
      const platforms = (card.dataset.platforms || '').split(',').filter(Boolean);
      document.querySelectorAll('input[name="aud-platform"]').forEach(cb => {
        cb.checked = platforms.includes(cb.value);
      });
      document.getElementById('audience-modal').classList.remove('hidden');
      document.getElementById('audience-modal').dataset.editId = id;
    }

    // ── Delete Audience ───────────────────────────────────────────────────────
    function deleteAudience(id, name) {
      if (!confirm('Supprimer "' + name + '" ? Cette action est irréversible.')) return;
      const card = document.getElementById('card-' + id);
      if (card) {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.remove(); }, 300);
        showToast('🗑 Audience "' + name + '" supprimée', 'error');
      }
    }

    // ── Expand Audience ────────────────────────────────────────────────────────
    function expandAudience(name) {
      showToast('⚡ Expansion de "' + name + '" vers 3% Lookalike en cours...', 'info')
      setTimeout(() => showToast('✓ Expansion planifiée — disponible sous 24h', 'success'), 2000)
    }

    // ── Toast ─────────────────────────────────────────────────────────────────
    function showToast(msg, type = 'success') {
      const colors = { success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300', error: 'bg-red-500/20 border-red-500/30 text-red-300', info: 'bg-brand-500/20 border-brand-500/30 text-brand-300' }
      const t = document.createElement('div')
      t.className = 'fixed bottom-5 right-5 z-[9999] px-4 py-3 rounded-xl border text-sm font-semibold backdrop-blur-xl shadow-2xl ' + (colors[type] || colors.success)
      t.textContent = msg
      document.body.appendChild(t)
      setTimeout(() => t.remove(), 3500)
    }
  </script>
  `
  return shell('Audiences', content, '/audiences', lang)
}

function audStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-3 flex items-center gap-3">
    <div class="w-9 h-9 rounded-xl bg-${color}-500/20 flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400 text-sm"></i>
    </div>
    <div><div class="text-xl font-black text-white">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function audienceCard(id: string, name: string, type: string, size: string, matchRate: string, color: string, desc: string, platforms: string[], roas: string): string {
  const platformIcons: Record<string, string> = { Facebook: 'fab fa-facebook-f', Google: 'fab fa-google', Instagram: 'fab fa-instagram', TikTok: 'fab fa-tiktok', Snapchat: 'fab fa-snapchat' }
  return `<div class="glass rounded-2xl p-4 card-hover audience-card" id="card-${id}"
    data-name="${name.toLowerCase()}" data-type="${type}" data-platforms="${platforms.join(',')}">
    <div class="flex items-start justify-between mb-2">
      <span class="text-xs px-2 py-0.5 rounded-full bg-${color}-500/20 text-${color}-400 font-semibold">${type}</span>
      <span class="text-xs text-emerald-400 font-bold">${roas}</span>
    </div>
    <h3 class="font-bold text-white text-sm mb-1">${name}</h3>
    <p class="text-xs text-slate-500 mb-3 leading-relaxed">${desc}</p>
    <div class="flex items-center justify-between mb-3">
      <div><div class="text-lg font-black text-white">${size}</div><div class="text-xs text-slate-500">Audience size</div></div>
      <div class="text-right"><div class="text-lg font-black text-${color}-400">${matchRate}</div><div class="text-xs text-slate-500">Match rate</div></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex gap-1.5">
        ${platforms.map(p => `<div class="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center"><i class="${platformIcons[p] || 'fas fa-ad'} text-slate-500 text-xs"></i></div>`).join('')}
      </div>
      <div class="flex items-center gap-1">
        <button onclick="useAudienceInCampaign('${name}')" class="text-xs bg-brand-600/20 hover:bg-brand-600/40 text-brand-400 px-2.5 py-1 rounded-lg font-semibold transition-all">
          <i class="fas fa-bullhorn text-xs mr-1"></i>Utiliser
        </button>
        <button onclick="editAudience('${id}')" class="w-7 h-7 glass hover:bg-white/10 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all">
          <i class="fas fa-pencil text-xs"></i>
        </button>
        <button onclick="deleteAudience('${id}','${name}')" class="w-7 h-7 glass hover:bg-red-500/10 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-all">
          <i class="fas fa-trash text-xs"></i>
        </button>
      </div>
    </div>
  </div>`
}

function aiToggle(id: string, label: string, checked: boolean): string {
  return `<div class="flex items-center justify-between">
    <span class="text-xs text-slate-400">${label}</span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" id="${id}" class="sr-only peer" ${checked ? 'checked' : ''}/>
      <div class="w-8 h-4 bg-white/10 peer-focus:ring-2 peer-focus:ring-brand-500/30 rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-600"></div>
    </label>
  </div>`
}
