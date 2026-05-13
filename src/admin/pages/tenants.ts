import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminTenants = (c: Context) => {
  const content = `
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div class="flex items-center gap-2 flex-wrap">
      <div class="glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
        <i class="fas fa-search text-slate-500 text-xs"></i>
        <input placeholder="Rechercher client, email, domaine..." class="bg-transparent text-slate-300 placeholder-slate-600 outline-none text-xs w-52" id="tenant-search"/>
      </div>
      <select class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 cursor-pointer">
        <option>Tous les plans</option>
        <option>Starter</option><option>Growth</option><option>Enterprise</option><option>Trial</option>
      </select>
      <select class="glass rounded-xl px-3 py-2 text-xs text-slate-400 outline-none border-0 cursor-pointer">
        <option>Tous statuts</option>
        <option>Actif</option><option>Essai</option><option>Suspendu</option><option>Churned</option>
      </select>
    </div>
    <button onclick="openCreateTenant()" class="bg-gradient-to-r from-orange-600 to-slate-600 hover:from-orange-500 hover:to-slate-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all">
      <i class="fas fa-plus"></i> Créer un client
    </button>
  </div>

  <!-- Stats rapides -->
  <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
    ${tenantStat('2,412', 'Total clients', 'fa-building', 'orange')}
    ${tenantStat('1,847', 'Actifs', 'fa-circle-check', 'brand')}
    ${tenantStat('284', 'En essai', 'fa-clock', 'brand')}
    ${tenantStat('47', 'Suspendus', 'fa-ban', 'slate')}
    ${tenantStat('234', 'Churned', 'fa-user-xmark', 'slate')}
  </div>

  <!-- Table Tenants -->
  <div class="glass rounded-2xl overflow-hidden mb-6">
    <div class="p-4 border-b border-white/5 flex items-center justify-between">
      <h3 class="font-bold text-white text-sm">Tous les clients <span class="text-slate-500 font-normal text-xs ml-1">(2,412)</span></h3>
      <div class="flex items-center gap-2">
        <button onclick="exportTenantsCSV()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
          <i class="fas fa-download text-xs"></i> Export CSV
        </button>
        <button onclick="bulkAction()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
          <i class="fas fa-layer-group text-xs"></i> Actions en lot
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="text-slate-600 bg-white/2 border-b border-white/5">
            <th class="text-left px-4 py-3 font-semibold">
              <input type="checkbox" class="rounded border-slate-700"/>
            </th>
            <th class="text-left px-4 py-3 font-semibold">Client</th>
            <th class="text-left px-4 py-3 font-semibold">Plan</th>
            <th class="text-right px-4 py-3 font-semibold">MRR</th>
            <th class="text-right px-4 py-3 font-semibold">Spend géré</th>
            <th class="text-right px-4 py-3 font-semibold">ROAS</th>
            <th class="text-right px-4 py-3 font-semibold">Campagnes</th>
            <th class="text-right px-4 py-3 font-semibold">Utilisateurs</th>
            <th class="text-left px-4 py-3 font-semibold">Statut</th>
            <th class="text-right px-4 py-3 font-semibold">Inscrit</th>
            <th class="text-right px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody id="tenants-table">
          ${tenantRow('Apex Marketing', 'apex-marketing', 'Enterprise', '$2,400', '$312,000', '6.2x', 18, 12, 'active', '15 jan 2026', 'AM', '#FF4D00')}
          ${tenantRow('Mega Retail Co.', 'mega-retail', 'Enterprise', '$2,400', '$284,000', '5.8x', 24, 8, 'active', '3 jan 2026', 'MR', '#FF4D00')}
          ${tenantRow('Acme Corp', 'acme-corp', 'Growth', '$799', '$124,850', '4.82x', 47, 4, 'active', '12 jan 2026', 'AC', '#f97316')}
          ${tenantRow('LuxoGroup', 'luxogroup', 'Growth', '$799', '$148,500', '4.9x', 31, 6, 'active', '25 mar 2026', 'LG', '#f97316')}
          ${tenantRow('Digital Storm', 'digital-storm', 'Growth', '$799', '$84,200', '4.6x', 14, 3, 'active', 'Aujourd\'hui', 'DS', '#f97316')}
          ${tenantRow('TechStart Inc.', 'techstart', 'Starter', '$299', '$28,400', '3.4x', 12, 2, 'active', '18 fév 2026', 'TS', '#FF6B2B')}
          ${tenantRow('Fashion Brand', 'fashion-brand', 'Starter', '$299', '$19,200', '3.1x', 8, 2, 'trial', '29 mar 2026', 'FB', '#FF6B2B')}
          ${tenantRow('SportNation', 'sportnation', 'Starter', '$299', '$9,100', '2.9x', 5, 1, 'active', '26 mar 2026', 'SN', '#FF6B2B')}
          ${tenantRow('SpamCo', 'spamco', '—', '$0', '$0', '—', 0, 1, 'suspended', '10 mar 2026', 'SC', '#7A7A7A')}
          ${tenantRow('Trendy Store', 'trendy-store', 'Trial', '$0', '$0', '—', 0, 1, 'trial', '27 mar 2026', 'TS', '#FF6B2B')}
          ${tenantRow('FlashRetail Pro', 'flashretail', 'Growth', '$799', '$67,800', '5.1x', 16, 5, 'active', '29 mar 2026', 'FR', '#f97316')}
          ${tenantRow('NovaBrand Inc.', 'novabrand', 'Starter', '$299', '$12,400', '3.8x', 6, 2, 'active', 'Hier', 'NB', '#FF6B2B')}
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="p-4 border-t border-white/5 flex items-center justify-between">
      <span class="text-xs text-slate-500">Affichage 1–12 sur 2,412</span>
      <div class="flex items-center gap-1">
        ${[1,2,3,'...',201].map((p,i) => `<button class="w-8 h-8 rounded-lg glass hover:bg-white/10 text-xs ${p===1?'bg-orange-600/20 text-orange-400':'text-slate-400'} transition-all">${p}</button>`).join('')}
      </div>
    </div>
  </div>

  <!-- Tenant Detail Modal -->
  <div id="tenant-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn border border-orange-500/20">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10">
        <div class="flex items-center gap-3">
          <div id="modal-abbr" class="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-slate-600 flex items-center justify-center font-bold text-white">AC</div>
          <div>
            <h2 id="modal-name" class="font-black text-white text-lg">Acme Corp</h2>
            <p id="modal-sub" class="text-xs text-slate-500">ID: acme-corp · Plan Growth · Actif</p>
          </div>
        </div>
        <button onclick="closeTenantModal()" class="text-slate-500 hover:text-slate-300 text-xl"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Stats -->
        <div class="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          ${modalStat('MRR', '$799/mois', 'fa-dollar-sign', 'orange')}
          ${modalStat('Spend géré', '$124,850', 'fa-bolt', 'brand')}
          ${modalStat('ROAS moyen', '4.82x', 'fa-chart-line', 'slate')}
          ${modalStat('Campagnes', '47 actives', 'fa-bullhorn', 'brand')}
        </div>

        <!-- Actions rapides -->
        <div class="md:col-span-3 flex flex-wrap gap-2">
          <button onclick="impersonateTenant()" class="glass hover:bg-white/10 text-slate-300 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all">
            <i class="fas fa-user-secret text-orange-400"></i> Impersonner
          </button>
          <button onclick="openChangePlanModal()" class="glass hover:bg-white/10 text-slate-300 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all">
            <i class="fas fa-arrow-up text-brand-400"></i> Changer plan
          </button>
          <button onclick="sendTenantEmail()" class="glass hover:bg-white/10 text-slate-300 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all">
            <i class="fas fa-envelope text-slate-400"></i> Envoyer email
          </button>
          <button onclick="resetTenantPassword()" class="glass hover:bg-white/10 text-slate-300 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all">
            <i class="fas fa-key text-brand-400"></i> Reset password
          </button>
          <button id="suspend-modal-btn" onclick="suspendTenant()" class="glass hover:bg-slate-500/10 text-slate-400 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all border border-slate-500/20">
            <i class="fas fa-ban"></i> Suspendre
          </button>
        </div>

        <!-- Détails compte -->
        <div class="md:col-span-2 glass rounded-xl p-4">
          <h4 class="font-semibold text-white text-sm mb-3">Informations compte</h4>
          <div class="space-y-2">
            ${detailRow('Propriétaire', 'John Doe <john@acmecorp.com>')}
            ${detailRow('Secteur', 'Fashion / Apparel')}
            ${detailRow('Timezone', 'Europe/Paris')}
            ${detailRow('Créé le', '12 janvier 2026')}
            ${detailRow('Dernière connexion', 'Aujourd\'hui 14:32')}
            ${detailRow('Utilisateurs', '4 membres')}
            ${detailRow('Plateformes', 'FB, IG, TikTok, Google')}
            ${detailRow('Token API', 'ank_prod_****3f9a')}
          </div>
        </div>

        <!-- Facturation -->
        <div class="glass rounded-xl p-4">
          <h4 class="font-semibold text-white text-sm mb-3">Facturation</h4>
          <div class="space-y-2">
            ${detailRow('Plan actuel', 'Growth — $799/mois')}
            ${detailRow('Prochaine facture', '1er avril 2026')}
            ${detailRow('Méthode', 'Visa •••• 4242')}
            ${detailRow('Statut paiement', '✅ À jour')}
            ${detailRow('Total facturé', '$4,794 (6 mois)')}
            ${detailRow('Spend ce mois', '$124,850')}
            ${detailRow('Limite spend', '$200,000/mois')}
          </div>
          <div class="mt-3 progress-bar">
            <div class="progress-fill bg-gradient-to-r from-orange-500 to-brand-400" style="width:62%"></div>
          </div>
          <div class="text-xs text-slate-500 mt-1">62% de la limite mensuelle</div>
        </div>

        <!-- Notes admin -->
        <!-- Change Plan Modal (inline) -->
        <div id="change-plan-panel" class="md:col-span-3 hidden glass rounded-xl p-4 border border-brand-500/20">
          <h4 class="font-semibold text-white text-sm mb-3 flex items-center gap-2"><i class="fas fa-arrow-up text-brand-400"></i> Changer le plan</h4>
          <div class="flex items-center gap-3">
            <select id="new-plan-select" class="flex-1 glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent cursor-pointer">
              <option>Trial (14 jours)</option>
              <option>Starter — $299/mois</option>
              <option selected>Growth — $799/mois</option>
              <option>Enterprise — Custom</option>
            </select>
            <button onclick="confirmChangePlan()" class="bg-gradient-to-r from-brand-600 to-brand-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all">Confirmer</button>
            <button onclick="document.getElementById('change-plan-panel').classList.add('hidden')" class="glass hover:bg-white/10 text-slate-400 text-xs px-4 py-2.5 rounded-xl transition-all">Annuler</button>
          </div>
        </div>

        <div class="md:col-span-3 glass rounded-xl p-4">
          <h4 class="font-semibold text-white text-sm mb-2">Notes Admin Internes</h4>
          <textarea id="admin-note-textarea" rows="3" placeholder="Ajouter une note interne sur ce client..."
            class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 outline-none focus:border-orange-500 transition-all resize-none">Client VIP. Demande de migration vers Enterprise en cours. Contact: Sarah Kim (CSM).</textarea>
          <button onclick="saveTenantNote()" class="mt-2 bg-orange-600 hover:bg-orange-500 text-white text-xs px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
            <i class="fas fa-save text-xs"></i> Sauvegarder note
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Créer Tenant Modal -->
  <div id="create-tenant-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-lg animate-fadeIn border border-orange-500/20">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-white">Créer un nouveau client</h2>
        <button onclick="closeCreateTenant()" class="text-slate-500 hover:text-slate-300"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Nom société</label>
            <input type="text" placeholder="Acme Corp" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all"/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Email admin</label>
            <input type="email" placeholder="admin@company.com" class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all"/>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Plan</label>
            <select class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none border border-white/10">
              <option>Trial (14 jours)</option>
              <option>Starter — $299/mois</option>
              <option>Growth — $799/mois</option>
              <option>Enterprise — Custom</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1 block">Secteur</label>
            <select class="w-full glass rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none border border-white/10">
              <option>E-commerce</option>
              <option>Fashion</option><option>Tech/SaaS</option>
              <option>Agence Pub</option><option>Autre</option>
            </select>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1 block">Notes internes (optionnel)</label>
          <textarea rows="2" placeholder="Notes sur ce client..." class="w-full glass rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all resize-none"></textarea>
        </div>
        <div class="flex items-center gap-2 p-3 rounded-xl bg-orange-500/8 border border-orange-500/20 text-xs text-orange-300">
          <i class="fas fa-info-circle"></i>
          Un email d'invitation sera automatiquement envoyé au nouvel administrateur.
        </div>
        <div class="flex justify-end gap-3">
          <button onclick="closeCreateTenant()" class="glass hover:bg-white/10 text-slate-400 px-5 py-2 rounded-xl text-xs transition-all">Annuler</button>
          <button id="btn-create-tenant" onclick="createTenant(this)" class="bg-gradient-to-r from-orange-600 to-slate-600 text-white px-6 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all hover:opacity-90 active:scale-95">
            <i class="fas fa-plus"></i> Créer le client
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    let currentTenantName = '';
    let currentTenantSuspended = false;

    // ── Search + Filters ────────────────────────────────────────────────────
    document.getElementById('tenant-search')?.addEventListener('input', function() {
      const q = this.value.toLowerCase();
      document.querySelectorAll('#tenants-table tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });

    // ── Tenant Modal ────────────────────────────────────────────────────────
    function openTenantModal(name, abbr, sub) {
      currentTenantName = name;
      document.getElementById('modal-name').textContent = name;
      document.getElementById('modal-abbr').textContent = abbr;
      document.getElementById('modal-sub').textContent = sub;
      document.getElementById('change-plan-panel').classList.add('hidden');
      document.getElementById('tenant-modal').classList.remove('hidden');
    }
    function closeTenantModal() { document.getElementById('tenant-modal').classList.add('hidden'); }

    // ── Actions ─────────────────────────────────────────────────────────────
    function impersonateTenant() {
      const name = currentTenantName;
      showAdminToast('🔐 Connexion en tant que "' + name + '" — redirection...', 'brand');
      closeTenantModal();
      setTimeout(() => window.location.href = '/dashboard', 2000);
    }
    function openChangePlanModal() {
      document.getElementById('change-plan-panel').classList.remove('hidden');
    }
    function confirmChangePlan() {
      const plan = document.getElementById('new-plan-select').value;
      document.getElementById('change-plan-panel').classList.add('hidden');
      showAdminToast('✓ Plan de "' + currentTenantName + '" changé vers ' + plan, 'brand');
    }
    function sendTenantEmail() {
      const msg = prompt('Message email à envoyer à "' + currentTenantName + '":');
      if (!msg) return;
      showAdminToast('✉️ Email envoyé à "' + currentTenantName + '"', 'brand');
    }
    function resetTenantPassword() {
      if (!confirm('Envoyer un lien de réinitialisation au propriétaire de "' + currentTenantName + '"?')) return;
      showAdminToast('🔑 Lien de reset envoyé à "' + currentTenantName + '"', 'brand');
    }
    function suspendTenant() {
      currentTenantSuspended = !currentTenantSuspended;
      const btn = document.getElementById('suspend-modal-btn');
      if (currentTenantSuspended) {
        btn.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Réactiver';
        btn.className = 'glass hover:bg-brand-500/10 text-brand-400 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all border border-brand-500/20';
        showAdminToast('⛔ Client "' + currentTenantName + '" suspendu — accès révoqué', 'slate');
      } else {
        btn.innerHTML = '<i class="fas fa-ban mr-1"></i>Suspendre';
        btn.className = 'glass hover:bg-slate-500/10 text-slate-400 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all border border-slate-500/20';
        showAdminToast('✓ Client "' + currentTenantName + '" réactivé', 'brand');
      }
    }
    function saveTenantNote() {
      const note = document.getElementById('admin-note-textarea').value;
      showAdminToast('✓ Note sauvegardée pour "' + currentTenantName + '"', 'brand');
    }

    // ── Create Tenant ────────────────────────────────────────────────────────
    function openCreateTenant() {
      // Reset form fields
      document.querySelectorAll('#create-tenant-modal input, #create-tenant-modal textarea').forEach(el => { el.value = ''; });
      document.querySelectorAll('#create-tenant-modal select').forEach(el => { el.selectedIndex = 0; });
      document.getElementById('create-tenant-modal').classList.remove('hidden');
      document.getElementById('create-tenant-modal').addEventListener('click', function onBg(e) {
        if (e.target === this) { closeCreateTenant(); this.removeEventListener('click', onBg); }
      });
    }
    function closeCreateTenant() {
      document.getElementById('create-tenant-modal').classList.add('hidden');
    }
    function createTenant(btn) {
      // Validate required fields
      const nameEl  = document.querySelector('#create-tenant-modal input[placeholder="Acme Corp"]');
      const emailEl = document.querySelector('#create-tenant-modal input[type="email"]');
      const planEl  = document.querySelector('#create-tenant-modal select');
      if (!nameEl || !nameEl.value.trim()) {
        showAdminToast('⚠ Veuillez saisir le nom de la société', 'brand'); return;
      }
      if (!emailEl || !emailEl.value.trim() || !emailEl.value.includes('@')) {
        showAdminToast('⚠ Veuillez saisir un email valide', 'brand'); return;
      }
      const origHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création...';
      btn.disabled = true;
      setTimeout(() => {
        // Inject new row into the tenants table
        const name    = nameEl.value.trim();
        const email   = emailEl.value.trim();
        const planTxt = planEl ? planEl.options[planEl.selectedIndex].text.split(' — ')[0].replace('Trial (14 jours)', 'Trial') : 'Trial';
        const abbr    = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
        const tbody   = document.getElementById('tenants-table');
        if (tbody) {
          const planColors = { 'Trial':'slate', 'Starter':'slate', 'Growth':'orange', 'Enterprise':'brand' };
          const pc = planColors[planTxt] || 'slate';
          const tr = document.createElement('tr');
          tr.className = 'table-row border-b border-white/5 transition-all';
          tr.innerHTML = \`
            <td class="py-3 px-2"><input type="checkbox" class="rounded border-white/20 bg-transparent w-3 h-3"/></td>
            <td class="py-3">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500/30 to-slate-500/30 flex items-center justify-center text-xs font-bold text-orange-300">\${abbr}</div>
                <div><div class="text-xs font-bold text-white">\${name}</div><div class="text-xs text-slate-600">\${email}</div></div>
              </div>
            </td>
            <td class="py-3"><span class="px-2 py-0.5 rounded-full text-xs bg-\${pc}-500/15 text-\${pc}-400 font-semibold">\${planTxt}</span></td>
            <td class="py-3 text-xs font-bold text-brand-400">$0</td>
            <td class="py-3 text-xs text-slate-500">—</td>
            <td class="py-3 text-xs text-slate-400">—</td>
            <td class="py-3 text-xs text-slate-500">0</td>
            <td class="py-3 text-xs text-slate-500">1</td>
            <td class="py-3"><span class="badge-trial text-xs px-2 py-0.5 rounded-full">Trial</span></td>
            <td class="py-3 text-xs text-slate-600">Aujourd'hui</td>
            <td class="py-3">
              <div class="flex items-center gap-1">
                <button onclick="openTenantModal(\${JSON.stringify(name)},\${JSON.stringify(abbr)},\${JSON.stringify(name + ' — ID: new-tenant · Plan Trial · Actif')})" class="glass hover:bg-white/10 text-slate-400 text-xs p-1.5 rounded-lg transition-all"><i class="fas fa-eye text-xs"></i></button>
                <button class="glass hover:bg-brand-500/10 text-brand-400 text-xs p-1.5 rounded-lg transition-all"><i class="fas fa-ban text-xs"></i></button>
              </div>
            </td>
          \`;
          tbody.insertBefore(tr, tbody.firstChild);
        }
        closeCreateTenant();
        btn.innerHTML = origHTML;
        btn.disabled  = false;
        showAdminToast('✓ Client "' + name + '" créé — invitation envoyée à ' + email, 'brand');
      }, 1500);
    }

    // ── Export CSV ────────────────────────────────────────────────────────────
    function exportTenantsCSV() {
      const rows = [['Nom','Plan','MRR','Spend','ROAS','Campagnes','Statut','Date']];
      document.querySelectorAll('#tenants-table tr:not([style*=none])').forEach(row => {
        const cells = [...row.querySelectorAll('td')].map(td => td.textContent.trim().replace(/\\s+/g,' '));
        if (cells.length > 3) rows.push(cells.slice(1, 9));
      });
      const csv = rows.map(r => r.join(',')).join('\\n');
      const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      a.download = 'tenants-export-' + new Date().toISOString().slice(0,10) + '.csv'; a.click();
      showAdminToast('✓ Export CSV téléchargé (' + (rows.length-1) + ' clients)', 'brand');
    }

    // ── Bulk Actions ──────────────────────────────────────────────────────────
    function bulkAction() {
      const checked = document.querySelectorAll('#tenants-table input[type="checkbox"]:checked');
      if (checked.length === 0) { showAdminToast('Sélectionnez au moins un client', 'brand'); return; }
      const action = prompt('Action sur ' + checked.length + ' client(s):\\n1. Envoyer email\\n2. Suspendre\\n3. Changer plan\\n\\nEntrez 1, 2 ou 3:');
      if (!action) return;
      const labels = { '1': 'Email envoyé', '2': 'Clients suspendus', '3': 'Plans mis à jour' };
      showAdminToast('✓ ' + (labels[action]||'Action') + ' pour ' + checked.length + ' client(s)', 'brand');
    }

    // ── Toast ─────────────────────────────────────────────────────────────────
    function showAdminToast(msg, type = 'brand') {
      const colors = { emerald:'bg-brand-500/20 border-brand-500/30 text-brand-300', amber:'bg-brand-500/20 border-brand-500/30 text-brand-300', red:'bg-slate-500/20 border-slate-500/30 text-slate-300' };
      const t = document.createElement('div');
      t.className = 'fixed bottom-5 right-5 z-[9999] px-4 py-3 rounded-xl border text-sm font-semibold backdrop-blur-xl shadow-2xl ' + (colors[type]||colors.emerald);
      t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 4000);
    }
  </script>
  `
  return c.html(adminShell('Clients & Tenants', content, '/admin/tenants'))
}

// ─── Components ───────────────────────────────────────────────────────────
function tenantStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-3 flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center flex-shrink-0">
      <i class="fas ${icon} text-${color}-400 text-xs"></i>
    </div>
    <div><div class="text-lg font-black text-white">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function tenantRow(name: string, id: string, plan: string, mrr: string, spend: string, roas: string, campaigns: number, users: number, status: string, date: string, abbr: string, color: string): string {
  const planColors: Record<string,string> = { Starter:'slate', Growth:'orange', Enterprise:'brand', '—':'slate', Trial:'brand' }
  const pc = planColors[plan] || 'slate'
  const statusMap: Record<string,string> = { active:'badge-active', trial:'badge-trial', suspended:'badge-suspended', churned:'badge-inactive' }
  const statusLabel: Record<string,string> = { active:'Actif', trial:'Essai', suspended:'Suspendu', churned:'Churned' }
  return `<tr class="table-row border-b border-white/5 transition-all cursor-pointer" onclick="openTenantModal('${name}','${abbr}','ID: ${id} · Plan ${plan} · ${statusLabel[status]}')">
    <td class="px-4 py-3"><input type="checkbox" class="rounded border-slate-700" onclick="event.stopPropagation()"/></td>
    <td class="px-4 py-3">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style="background:${color}30;color:${color}">${abbr}</div>
        <div>
          <div class="font-semibold text-slate-200 text-xs">${name}</div>
          <div class="text-slate-600 text-xs">${id}</div>
        </div>
      </div>
    </td>
    <td class="px-4 py-3"><span class="text-xs px-2 py-0.5 rounded-full bg-${pc}-500/15 text-${pc}-400 font-semibold">${plan}</span></td>
    <td class="px-4 py-3 text-right font-bold text-orange-400">${mrr}</td>
    <td class="px-4 py-3 text-right font-semibold text-brand-400">${spend}</td>
    <td class="px-4 py-3 text-right font-bold text-slate-400">${roas}</td>
    <td class="px-4 py-3 text-right text-slate-400">${campaigns > 0 ? campaigns : '—'}</td>
    <td class="px-4 py-3 text-right text-slate-400">${users}</td>
    <td class="px-4 py-3"><span class="${statusMap[status]} text-xs px-2 py-0.5 rounded-full">${statusLabel[status]}</span></td>
    <td class="px-4 py-3 text-right text-slate-600">${date}</td>
    <td class="px-4 py-3 text-right" onclick="event.stopPropagation()">
      <div class="flex items-center justify-end gap-1">
        <button class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all tooltip" onclick="openTenantModal('${name}','${abbr}','ID: ${id}')">
          <i class="fas fa-eye text-slate-400 text-xs"></i>
          <span class="tooltip-text">Détails</span>
        </button>
        <button onclick="openTenantModal('${name}','${abbr}','ID: ${id}');impersonateTenant()" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-orange-500/10 transition-all tooltip">
          <i class="fas fa-user-secret text-orange-400 text-xs"></i>
          <span class="tooltip-text">Impersonner</span>
        </button>
        <button onclick="if(confirm('Suspendre ${name} ?')){this.innerHTML='<i class=\\'fas fa-check-circle text-brand-400 text-xs\\'></i>';this.classList.add('bg-brand-500/10');showAdminToast('⛔ ${name} suspendu','slate')}" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-slate-500/10 transition-all tooltip">
          <i class="fas fa-ban text-slate-400 text-xs"></i>
          <span class="tooltip-text">Suspendre</span>
        </button>
      </div>
    </td>
  </tr>`
}

function modalStat(label: string, value: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-3">
    <div class="flex items-center gap-2 mb-1">
      <i class="fas ${icon} text-${color}-400 text-xs"></i>
      <span class="text-xs text-slate-500">${label}</span>
    </div>
    <div class="font-black text-white">${value}</div>
  </div>`
}

function detailRow(key: string, value: string): string {
  return `<div class="flex items-start justify-between gap-3 py-1.5 border-b border-white/5">
    <span class="text-xs text-slate-600 flex-shrink-0">${key}</span>
    <span class="text-xs text-slate-300 text-right font-medium">${value}</span>
  </div>`
}
