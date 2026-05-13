import type { Context } from 'hono'
import { adminShell } from '../layout'

// ─── Super-admin view: manage influencer/affiliate program ──────────────────
// 20% recurring commission on referred subscriptions. This page lists every
// partner (influencer), tracks their MRR contribution, pending payouts and
// lifetime earnings. All data is mocked — wire to Stripe + DB in Phase 4.
export const renderAdminAffiliates = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
    <div>
      <h2 class="text-xl font-black text-white">Programme Affiliés</h2>
      <p class="text-xs text-slate-500 mt-0.5">Partenaires influenceurs — 20% de commission récurrente sur abonnements référés</p>
    </div>
    <div class="flex items-center gap-3">
      <button onclick="openInviteAffiliate()" class="admin-glass text-xs px-4 py-2 rounded-lg text-orange-400 hover:bg-orange-500/10 transition-all border border-orange-500/20">
        <i class="fas fa-user-plus mr-1.5"></i> Inviter un partenaire
      </button>
      <button onclick="processPayouts()" class="bg-gradient-to-r from-orange-500 to-slate-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg">
        <i class="fas fa-money-bill-transfer mr-1.5"></i> Lancer les payouts du mois
      </button>
    </div>
  </div>

  <!-- KPIs -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${affKpi('Partenaires actifs', '47', '+6 ce mois', 'fa-users', 'orange')}
    ${affKpi('MRR généré', '$184,200', '+22.4%', 'fa-arrow-trend-up', 'brand')}
    ${affKpi('Commissions / mois', '$36,840', '20% du MRR', 'fa-percentage', 'brand')}
    ${affKpi('Payouts en attente', '$11,920', '8 partenaires', 'fa-clock', 'slate')}
  </div>

  <!-- Tier breakdown + commission settings -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <div class="lg:col-span-2 glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">Top 10 Partenaires</h3>
          <p class="text-xs text-slate-500 mt-0.5">Classés par MRR généré sur les 30 derniers jours</p>
        </div>
        <input id="aff-search" oninput="filterAffiliates()" placeholder="Rechercher un partenaire…" class="glass text-xs px-3 py-1.5 rounded-lg text-slate-300 outline-none w-56 border border-white/10 focus:border-orange-500/40"/>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs" id="affiliates-table">
          <thead>
            <tr class="text-slate-600 border-b border-white/5">
              <th class="text-left pb-3 font-semibold">Partenaire</th>
              <th class="text-left pb-3 font-semibold">Tier</th>
              <th class="text-right pb-3 font-semibold">Référés</th>
              <th class="text-right pb-3 font-semibold">MRR généré</th>
              <th class="text-right pb-3 font-semibold">Commission /mois</th>
              <th class="text-right pb-3 font-semibold">Lifetime</th>
              <th class="text-center pb-3 font-semibold">Statut</th>
              <th class="text-right pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${affRow('Léa Marchand', 'lea-marchand', 'YouTube · 412K subs', 'Diamond', 38, 28400, 5680, 84200, 'active')}
            ${affRow('Tom Verhoeven', 'tom-verhoeven', 'LinkedIn · 184K', 'Gold', 24, 19100, 3820, 51200, 'active')}
            ${affRow('Aïcha Diallo', 'aicha-diallo', 'Instagram · 268K', 'Gold', 21, 17300, 3460, 38600, 'active')}
            ${affRow('Marco Lazzari', 'marco-lazzari', 'TikTok · 1.2M', 'Diamond', 19, 15820, 3164, 29400, 'active')}
            ${affRow('Sophie Lehmann', 'sophie-lehmann', 'Twitter · 92K', 'Silver', 16, 12400, 2480, 24800, 'active')}
            ${affRow('Daniel Okafor', 'daniel-okafor', 'Newsletter · 48K', 'Silver', 12, 9600, 1920, 18400, 'active')}
            ${affRow('Yuki Tanaka', 'yuki-tanaka', 'YouTube · 89K', 'Silver', 9, 7200, 1440, 12800, 'active')}
            ${affRow('Eva Costa', 'eva-costa', 'Instagram · 54K', 'Bronze', 6, 4800, 960, 7200, 'pending')}
            ${affRow('Sam Patel', 'sam-patel', 'Blog · adtech.io', 'Bronze', 4, 3200, 640, 4800, 'active')}
            ${affRow('Karim Boudali', 'karim-boudali', 'Podcast · GrowthFR', 'Bronze', 3, 2400, 480, 2400, 'suspended')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Commission settings -->
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-1">Paramètres de commission</h3>
      <p class="text-xs text-slate-500 mb-4">Configuration globale du programme</p>

      <div class="space-y-3">
        <div class="admin-glass rounded-xl p-3 flex items-center justify-between">
          <div>
            <div class="text-xs font-semibold text-white">Taux de commission</div>
            <div class="text-xs text-slate-500 mt-0.5">% sur abonnement référé</div>
          </div>
          <div class="flex items-center gap-2">
            <input id="cfg-aff-rate" type="number" value="20" min="0" max="100" step="1" class="w-16 text-right glass rounded-lg px-2 py-1.5 text-sm font-bold text-orange-400 outline-none border border-white/10 focus:border-orange-500/40"/>
            <span class="text-sm text-orange-400 font-bold">%</span>
          </div>
        </div>

        <div class="admin-glass rounded-xl p-3 flex items-center justify-between">
          <div>
            <div class="text-xs font-semibold text-white">Durée de récurrence</div>
            <div class="text-xs text-slate-500 mt-0.5">Mois de commission par référé</div>
          </div>
          <select class="glass rounded-lg px-2 py-1.5 text-xs text-white border border-white/10 outline-none">
            <option>12 mois</option>
            <option selected>Lifetime (illimité)</option>
            <option>24 mois</option>
            <option>6 mois</option>
          </select>
        </div>

        <div class="admin-glass rounded-xl p-3 flex items-center justify-between">
          <div>
            <div class="text-xs font-semibold text-white">Cookie tracking</div>
            <div class="text-xs text-slate-500 mt-0.5">Durée d'attribution</div>
          </div>
          <select class="glass rounded-lg px-2 py-1.5 text-xs text-white border border-white/10 outline-none">
            <option>30 jours</option>
            <option selected>60 jours</option>
            <option>90 jours</option>
          </select>
        </div>

        <div class="admin-glass rounded-xl p-3 flex items-center justify-between">
          <div>
            <div class="text-xs font-semibold text-white">Payout minimum</div>
            <div class="text-xs text-slate-500 mt-0.5">Seuil de paiement</div>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-xs text-slate-500">$</span>
            <input type="number" value="50" min="0" class="w-16 text-right glass rounded-lg px-2 py-1.5 text-sm font-bold text-white outline-none border border-white/10 focus:border-orange-500/40"/>
          </div>
        </div>

        <div class="admin-glass rounded-xl p-3 flex items-center justify-between">
          <div>
            <div class="text-xs font-semibold text-white">Cadence de paiement</div>
            <div class="text-xs text-slate-500 mt-0.5">Stripe Connect</div>
          </div>
          <select class="glass rounded-lg px-2 py-1.5 text-xs text-white border border-white/10 outline-none">
            <option>Hebdomadaire</option>
            <option selected>Mensuel (le 1er)</option>
            <option>Trimestriel</option>
          </select>
        </div>
      </div>

      <button onclick="saveAffSettings()" class="w-full mt-4 bg-gradient-to-r from-orange-500 to-slate-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all">
        <i class="fas fa-save mr-1.5"></i> Enregistrer
      </button>
    </div>
  </div>

  <!-- Tier ladder -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div>
        <h3 class="font-bold text-white">Tiers d'affiliation</h3>
        <p class="text-xs text-slate-500 mt-0.5">Bonus selon le volume de référés actifs</p>
      </div>
      <span class="text-xs text-slate-500">Le tier est recalculé chaque 1er du mois</span>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      ${tierCard('Bronze', '0 → 5', '20%', '#FF6B2B', 'fa-medal')}
      ${tierCard('Silver', '6 → 15', '22%', '#C0C0D8', 'fa-medal')}
      ${tierCard('Gold', '16 → 30', '25%', '#FF6B2B', 'fa-trophy')}
      ${tierCard('Diamond', '31 +', '30%', '#FF4D00', 'fa-gem')}
    </div>
  </div>

  <!-- Recent activity + payouts queue -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Activité récente</h3>
        <span class="text-xs text-slate-500">Dernières 24h</span>
      </div>
      <div class="space-y-2">
        ${affActivity('user-plus', 'brand', 'Nouveau référé via Léa Marchand', 'Acme Corp · Plan Growth $799/m', '2 min')}
        ${affActivity('arrow-trend-up', 'orange', 'Marco Lazzari passe Gold → Diamond', '31 référés actifs · taux +5%', '14 min')}
        ${affActivity('user-plus', 'brand', 'Nouveau référé via Tom Verhoeven', 'TechStart · Plan Starter $299/m', '43 min')}
        ${affActivity('money-bill-wave', 'brand', 'Payout traité — Aïcha Diallo', '$3,460 envoyé via Stripe Connect', '1h')}
        ${affActivity('user-xmark', 'slate', 'Désabonnement référé — Sophie Lehmann', 'Customer churn · -$799 MRR', '2h')}
        ${affActivity('link', 'slate', 'Tom Verhoeven a généré 3 nouveaux liens UTM', 'campaign-q3-launch · ig-stories · email-blast', '3h')}
        ${affActivity('user-plus', 'brand', 'Nouveau partenaire approuvé', 'eva-costa@influenceur.com · Bronze tier', '5h')}
      </div>
    </div>

    <div class="glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white">File de payouts</h3>
          <p class="text-xs text-slate-500 mt-0.5">Prochain run : 1er mai 2026</p>
        </div>
        <span class="badge-trial text-xs px-2 py-0.5 rounded-full">8 en attente</span>
      </div>
      <div class="space-y-2">
        ${payoutRow('Léa Marchand', 'LM', 'Stripe Connect', 5680, 'ready')}
        ${payoutRow('Tom Verhoeven', 'TV', 'Stripe Connect', 3820, 'ready')}
        ${payoutRow('Aïcha Diallo', 'AD', 'PayPal', 3460, 'ready')}
        ${payoutRow('Marco Lazzari', 'ML', 'Stripe Connect', 3164, 'review')}
        ${payoutRow('Sophie Lehmann', 'SL', 'Virement SEPA', 2480, 'ready')}
        ${payoutRow('Daniel Okafor', 'DO', 'Stripe Connect', 1920, 'ready')}
        ${payoutRow('Yuki Tanaka', 'YT', 'Wise', 1440, 'kyc')}
        ${payoutRow('Sam Patel', 'SP', 'Stripe Connect', 640, 'ready')}
      </div>
      <div class="mt-4 admin-glass rounded-xl p-3 flex items-center justify-between">
        <span class="text-xs text-slate-400">Total à verser ce mois</span>
        <span class="text-base font-bold text-orange-400">$22,604</span>
      </div>
    </div>
  </div>

  <!-- Invite affiliate modal -->
  <div id="invite-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4" onclick="if(event.target===this) closeInviteAffiliate()">
    <div class="glass rounded-2xl w-full max-w-md p-6 animate-fadeIn">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-white">Inviter un partenaire</h3>
        <button onclick="closeInviteAffiliate()" class="text-slate-500 hover:text-white w-7 h-7 admin-glass rounded-lg flex items-center justify-center"><i class="fas fa-times text-xs"></i></button>
      </div>
      <div class="space-y-3">
        <div>
          <label class="text-xs text-slate-500 mb-1 block">Nom du partenaire</label>
          <input id="inv-name" placeholder="Ex. Léa Marchand" class="w-full glass rounded-lg px-3 py-2 text-sm text-white outline-none border border-white/10 focus:border-orange-500/40"/>
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">Email</label>
          <input id="inv-email" type="email" placeholder="partner@influence.com" class="w-full glass rounded-lg px-3 py-2 text-sm text-white outline-none border border-white/10 focus:border-orange-500/40"/>
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">Plateforme principale</label>
          <select id="inv-platform" class="w-full glass rounded-lg px-3 py-2 text-sm text-white outline-none border border-white/10 focus:border-orange-500/40">
            <option>YouTube</option><option>Instagram</option><option>TikTok</option><option>LinkedIn</option><option>Twitter / X</option><option>Newsletter</option><option>Blog</option><option>Podcast</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-slate-500 mb-1 block">Tier initial</label>
          <select id="inv-tier" class="w-full glass rounded-lg px-3 py-2 text-sm text-white outline-none border border-white/10 focus:border-orange-500/40">
            <option>Bronze (20%)</option><option>Silver (22%)</option><option>Gold (25%)</option><option>Diamond (30%)</option>
          </select>
        </div>
      </div>
      <button onclick="sendInvite()" class="w-full mt-5 bg-gradient-to-r from-orange-500 to-slate-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all">
        <i class="fas fa-paper-plane mr-1.5"></i> Envoyer l'invitation
      </button>
    </div>
  </div>

  <!-- Toast -->
  <div id="aff-toast" class="hidden fixed bottom-6 right-6 z-50 glass rounded-xl px-4 py-3 text-sm font-semibold animate-fadeIn"></div>

  <style>
    .aff-tier{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
    .aff-tier-Bronze{background:rgba(255,107,43,0.14);color:#FF6B2B;border:1px solid rgba(255,107,43,0.30)}
    .aff-tier-Silver{background:rgba(168,168,168,0.14);color:#A8A8A8;border:1px solid rgba(168,168,168,0.30)}
    .aff-tier-Gold{background:rgba(255,107,43,0.14);color:#FF6B2B;border:1px solid rgba(255,107,43,0.30)}
    .aff-tier-Diamond{background:rgba(255,77,0,0.14);color:#FF4D00;border:1px solid rgba(255,77,0,0.32)}
    .payout-status{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:2px 7px;border-radius:100px}
    .payout-status.ready{background:rgba(255,77,0,0.14);color:var(--green);border:1px solid rgba(255,77,0,0.30)}
    .payout-status.review{background:rgba(255,107,43,0.14);color:var(--gold);border:1px solid rgba(255,107,43,0.30)}
    .payout-status.kyc{background:rgba(122,122,122,0.14);color:#7A7A7A;border:1px solid rgba(122,122,122,0.30)}
  </style>

  <script>
  function toast(msg, color){
    var el = document.getElementById('aff-toast');
    el.style.color = color || '#FF4D00';
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(function(){ el.classList.add('hidden') }, 2400);
  }

  window.openInviteAffiliate = function(){ document.getElementById('invite-modal').classList.remove('hidden') }
  window.closeInviteAffiliate = function(){ document.getElementById('invite-modal').classList.add('hidden') }
  window.sendInvite = function(){
    var name = document.getElementById('inv-name').value.trim();
    var email = document.getElementById('inv-email').value.trim();
    if (!name || !email) { toast('Nom et email requis', '#7A7A7A'); return }
    closeInviteAffiliate();
    toast('✓ Invitation envoyée à ' + email);
  }

  window.processPayouts = function(){
    if (!confirm('Lancer les payouts pour 8 partenaires (total $22,604) ?')) return;
    toast('✓ Payouts envoyés à Stripe Connect');
  }

  window.saveAffSettings = function(){
    var rate = document.getElementById('cfg-aff-rate').value;
    toast('✓ Commission mise à jour : ' + rate + '%');
  }

  window.filterAffiliates = function(){
    var q = (document.getElementById('aff-search').value || '').toLowerCase();
    document.querySelectorAll('#affiliates-table tbody tr').forEach(function(tr){
      tr.style.display = tr.textContent.toLowerCase().indexOf(q) === -1 ? 'none' : '';
    });
  }

  window.openAffiliateProfile = function(slug, name){
    toast('→ Ouverture fiche : ' + name);
  }
  window.toggleAffiliateStatus = function(slug, name){
    if (!confirm('Suspendre / réactiver ' + name + ' ?')) return;
    toast('✓ Statut basculé pour ' + name);
  }
  </script>
  `
  return c.html(adminShell('Affiliés', content, '/admin/affiliates'))
}

function affKpi(label: string, value: string, sub: string, icon: string, color: string): string {
  const tints: Record<string, string> = {
    orange: 'rgba(255,77,0,0.12)',
    emerald: 'rgba(255,77,0,0.12)',
    amber: 'rgba(255,107,43,0.12)',
    red: 'rgba(122,122,122,0.12)',
  }
  const cols: Record<string, string> = {
    orange: 'var(--orange)', emerald: 'var(--green)', amber: 'var(--gold)', red: '#7A7A7A',
  }
  return `<div class="glass rounded-2xl p-4">
    <div class="flex items-center gap-2 mb-3">
      <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background:${tints[color]};color:${cols[color]}">
        <i class="fas ${icon} text-sm"></i>
      </div>
      <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">${label}</div>
    </div>
    <div class="text-2xl font-black text-white">${value}</div>
    <div class="text-xs text-slate-500 mt-0.5">${sub}</div>
  </div>`
}

function affRow(name: string, slug: string, channel: string, tier: string, refs: number, mrr: number, commission: number, lifetime: number, status: string): string {
  const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  const statusBadge = status === 'active' ? 'badge-active' : status === 'pending' ? 'badge-trial' : 'badge-suspended'
  const statusLabel = status === 'active' ? 'Actif' : status === 'pending' ? 'En attente' : 'Suspendu'
  return `<tr class="border-b border-white/5 table-row">
    <td class="py-3">
      <div class="flex items-center gap-2.5">
        <div class="tenant-avatar" style="width:30px;height:30px;font-size:11px">${initials}</div>
        <div>
          <div class="text-xs font-bold text-white">${name}</div>
          <div class="text-xs text-slate-500">${channel}</div>
        </div>
      </div>
    </td>
    <td class="py-3"><span class="aff-tier aff-tier-${tier}">${tier}</span></td>
    <td class="py-3 text-right font-semibold text-slate-200">${refs}</td>
    <td class="py-3 text-right font-bold text-white">$${mrr.toLocaleString()}</td>
    <td class="py-3 text-right font-bold text-orange-400">$${commission.toLocaleString()}</td>
    <td class="py-3 text-right text-brand-400 font-semibold">$${lifetime.toLocaleString()}</td>
    <td class="py-3 text-center"><span class="${statusBadge}">${statusLabel}</span></td>
    <td class="py-3 text-right">
      <div class="inline-flex items-center gap-1">
        <button onclick="openAffiliateProfile('${slug}','${name.replace(/'/g, '&#39;')}')" class="admin-glass w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white" title="Voir fiche"><i class="fas fa-eye text-xs"></i></button>
        <button onclick="toggleAffiliateStatus('${slug}','${name.replace(/'/g, '&#39;')}')" class="admin-glass w-7 h-7 rounded-lg flex items-center justify-center text-brand-400 hover:bg-brand-500/10" title="Suspendre / réactiver"><i class="fas fa-ban text-xs"></i></button>
      </div>
    </td>
  </tr>`
}

function tierCard(name: string, range: string, rate: string, color: string, icon: string): string {
  return `<div class="admin-glass rounded-xl p-4 relative overflow-hidden">
    <div class="absolute -right-3 -top-3 w-14 h-14 rounded-full opacity-15" style="background:${color}"></div>
    <i class="fas ${icon} text-lg mb-3" style="color:${color}"></i>
    <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">${name}</div>
    <div class="text-2xl font-black text-white mt-1">${rate}</div>
    <div class="text-xs text-slate-500 mt-1">${range} référés actifs</div>
  </div>`
}

function affActivity(icon: string, color: string, title: string, sub: string, time: string): string {
  const tints: Record<string, string> = {
    emerald: 'rgba(255,77,0,0.14)', orange: 'rgba(255,77,0,0.14)',
    amber: 'rgba(255,107,43,0.14)', red: 'rgba(122,122,122,0.14)', blue: 'rgba(168,168,168,0.14)',
  }
  const cols: Record<string, string> = {
    emerald: 'var(--green)', orange: 'var(--orange)', amber: 'var(--gold)', red: '#7A7A7A', blue: '#A8A8A8',
  }
  return `<div class="flex items-start gap-3 admin-glass rounded-xl p-3">
    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:${tints[color]};color:${cols[color]}">
      <i class="fas fa-${icon} text-xs"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-white">${title}</div>
      <div class="text-xs text-slate-500 mt-0.5 truncate">${sub}</div>
    </div>
    <span class="text-xs text-slate-600 flex-shrink-0">${time}</span>
  </div>`
}

function payoutRow(name: string, abbr: string, method: string, amount: number, status: string): string {
  return `<div class="flex items-center gap-3 admin-glass rounded-xl p-3">
    <div class="tenant-avatar" style="width:28px;height:28px;font-size:10px">${abbr}</div>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-white truncate">${name}</div>
      <div class="text-xs text-slate-500">${method}</div>
    </div>
    <div class="text-right flex-shrink-0">
      <div class="text-sm font-bold text-orange-400">$${amount.toLocaleString()}</div>
      <span class="payout-status ${status}">${status === 'ready' ? 'Prêt' : status === 'review' ? 'À valider' : 'KYC'}</span>
    </div>
  </div>`
}
