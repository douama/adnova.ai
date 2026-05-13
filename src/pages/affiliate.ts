import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

// ─── Tenant view: "Programme Partenaire" ────────────────────────────────────
// Every customer can become an affiliate and earn 20% recurring commission on
// every subscription they refer. UI-only mock — wire to Stripe Connect + DB.
export function renderAffiliate(lang: Lang = 'en'): string {
  const refLink = 'https://adnova.ai/r/acme-corp'
  const content = `
  <!-- Hero -->
  <div class="glass rounded-2xl p-6 mb-4 relative overflow-hidden">
    <div class="absolute -right-10 -top-10 w-48 h-48 rounded-full" style="background:radial-gradient(circle,rgba(255,77,0,0.18) 0%,transparent 70%);pointer-events:none"></div>
    <div class="flex items-start justify-between gap-6 flex-wrap relative">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style="background:rgba(255,77,0,0.10);border:1px solid rgba(255,77,0,0.30)">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-400 blink"></span>
          <span class="text-xs font-bold text-orange-400 uppercase tracking-widest">Programme Partenaire — Actif</span>
        </div>
        <h1 class="text-3xl font-black text-white mb-2">Gagnez <span class="text-orange-400">20%</span> à vie sur chaque parrainage</h1>
        <p class="text-slate-400 text-sm leading-relaxed">Partagez AdNova auprès de votre audience et touchez 20% de commission récurrente sur tous les abonnements de vos référés — chaque mois, à vie, sans plafond.</p>
      </div>
      <div class="flex flex-col items-end gap-2 flex-shrink-0">
        <div class="text-right">
          <div class="text-xs text-slate-500 uppercase tracking-widest">Solde du mois</div>
          <div class="text-4xl font-black text-brand-400" id="aff-balance">$2,840</div>
          <div class="text-xs text-slate-500">Versement le 1er mai 2026</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Referral link -->
  <div class="glass rounded-2xl p-5 mb-4">
    <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
      <div>
        <h3 class="font-bold text-white text-sm">Votre lien de parrainage</h3>
        <p class="text-xs text-slate-500 mt-0.5">Toute inscription via ce lien vous attribuera 20% de l'abonnement</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="newUtmLink()" class="glass border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5">
          <i class="fas fa-plus mr-1"></i> Nouveau lien UTM
        </button>
      </div>
    </div>

    <div class="flex items-center gap-2 flex-wrap">
      <div class="flex-1 min-w-[280px] flex items-center gap-2 glass rounded-xl px-4 py-3 border border-white/10">
        <i class="fas fa-link text-orange-400 text-xs"></i>
        <input id="ref-link" readonly value="${refLink}" class="flex-1 bg-transparent text-sm text-white outline-none font-mono"/>
      </div>
      <button onclick="copyRefLink()" class="bg-gradient-to-r from-orange-500 to-slate-600 text-white text-xs font-bold px-4 py-3 rounded-xl hover:opacity-90 transition-all">
        <i id="copy-icon" class="fas fa-copy mr-1.5"></i><span id="copy-label">Copier</span>
      </button>
      <button onclick="shareRef('twitter')" class="glass border border-white/10 rounded-xl w-11 h-11 flex items-center justify-center text-slate-300 hover:bg-white/5" title="Partager sur X / Twitter"><i class="fab fa-x-twitter"></i></button>
      <button onclick="shareRef('linkedin')" class="glass border border-white/10 rounded-xl w-11 h-11 flex items-center justify-center text-slate-300 hover:bg-white/5" title="Partager sur LinkedIn"><i class="fab fa-linkedin-in"></i></button>
      <button onclick="shareRef('email')" class="glass border border-white/10 rounded-xl w-11 h-11 flex items-center justify-center text-slate-300 hover:bg-white/5" title="Partager par email"><i class="fas fa-envelope"></i></button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      ${trackPill('Twitter / X', 'twitter', 142, 'fa-twitter')}
      ${trackPill('LinkedIn', 'linkedin', 86, 'fa-linkedin-in')}
      ${trackPill('YouTube Bio', 'yt-bio', 348, 'fa-youtube')}
      ${trackPill('Newsletter', 'newsletter', 64, 'fa-envelope')}
    </div>
  </div>

  <!-- KPIs -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    ${kpi('Clics 30j', '640', '+18.4%', 'fa-mouse-pointer', 'orange')}
    ${kpi('Inscriptions', '24', '3.75% conv.', 'fa-user-plus', 'brand')}
    ${kpi('Abonnés actifs', '14', '$11,200 MRR', 'fa-handshake', 'brand')}
    ${kpi('Gains lifetime', '$18,420', '+$2,840 ce mois', 'fa-sack-dollar', 'slate')}
  </div>

  <!-- Tier progression -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
    <div class="lg:col-span-2 glass rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h3 class="font-bold text-white">Votre Tier</h3>
          <p class="text-xs text-slate-500 mt-0.5">Plus vous parrainez, plus votre taux grimpe</p>
        </div>
        <div class="aff-tier aff-tier-Silver">Silver · 22%</div>
      </div>

      <div class="space-y-2 mb-4">
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-400">14 abonnés actifs</span>
          <span class="text-orange-400 font-semibold">2 abonnés avant Gold (25%)</span>
        </div>
        <div class="h-2 rounded-full bg-white/5 overflow-hidden relative">
          <div class="absolute inset-y-0 left-0 rounded-full" style="width:87.5%;background:linear-gradient(90deg,var(--orange),var(--orange2))"></div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-2">
        ${tierPip('Bronze', '0-5', '20%', '#FF6B2B', false, true)}
        ${tierPip('Silver', '6-15', '22%', '#C0C0D8', true, true)}
        ${tierPip('Gold', '16-30', '25%', '#FF6B2B', false, false)}
        ${tierPip('Diamond', '31+', '30%', '#FF4D00', false, false)}
      </div>
    </div>

    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-1">Versement</h3>
      <p class="text-xs text-slate-500 mb-4">Méthode de paiement</p>

      <div class="glass border border-white/10 rounded-xl p-4 mb-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-orange-500/15 flex items-center justify-center">
            <i class="fas fa-credit-card text-orange-400"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-bold text-white">Stripe Connect</div>
            <div class="text-xs text-slate-500">acct_••••••J7K3 · Vérifié</div>
          </div>
          <span class="badge-active">OK</span>
        </div>
      </div>

      <button class="w-full glass border border-white/10 rounded-xl py-2 text-xs text-slate-300 hover:bg-white/5 mb-2">
        <i class="fas fa-arrow-right-arrow-left mr-1"></i> Changer la méthode
      </button>
      <div class="text-xs text-slate-500 leading-relaxed mt-3">
        <i class="fas fa-info-circle text-orange-400 mr-1"></i> Versement mensuel le 1er — seuil minimum $50. Vos gains accumulés sont versés automatiquement.
      </div>
    </div>
  </div>

  <!-- Referrals list -->
  <div class="glass rounded-2xl p-5 mb-4">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div>
        <h3 class="font-bold text-white">Vos référés</h3>
        <p class="text-xs text-slate-500 mt-0.5">Statut et commissions de chaque inscription</p>
      </div>
      <div class="flex items-center gap-2">
        <select id="ref-filter" onchange="filterRefs(this.value)" class="glass border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none">
          <option value="">Tous</option>
          <option value="active">Actifs</option>
          <option value="trial">En essai</option>
          <option value="churned">Désabonnés</option>
        </select>
        <button onclick="exportRefs()" class="glass border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5">
          <i class="fas fa-download mr-1"></i> Export
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs" id="refs-table">
        <thead>
          <tr class="text-slate-600 border-b border-white/5">
            <th class="text-left pb-3 font-semibold">Référé</th>
            <th class="text-left pb-3 font-semibold">Plan</th>
            <th class="text-left pb-3 font-semibold">Source</th>
            <th class="text-right pb-3 font-semibold">MRR</th>
            <th class="text-right pb-3 font-semibold">Commission /mois</th>
            <th class="text-right pb-3 font-semibold">Lifetime</th>
            <th class="text-center pb-3 font-semibold">Statut</th>
            <th class="text-right pb-3 font-semibold">Depuis</th>
          </tr>
        </thead>
        <tbody>
          ${refRow('Apex Marketing', 'AM', 'Enterprise', 'YouTube Bio', 2400, 480, 5760, 'active', '6 mois')}
          ${refRow('LuxoGroup', 'LG', 'Growth', 'Newsletter', 799, 160, 1920, 'active', '4 mois')}
          ${refRow('Digital Storm', 'DS', 'Growth', 'Twitter / X', 799, 160, 1440, 'active', '3 mois')}
          ${refRow('TechStart Inc.', 'TS', 'Starter', 'LinkedIn', 299, 60, 720, 'active', '4 mois')}
          ${refRow('NovaBrand Inc.', 'NB', 'Starter', 'YouTube Bio', 299, 60, 540, 'active', '3 mois')}
          ${refRow('Fashion Brand', 'FB', 'Starter', 'Twitter / X', 299, 60, 60, 'trial', '14 jours')}
          ${refRow('SportNation', 'SN', 'Starter', 'Newsletter', 299, 60, 240, 'active', '2 mois')}
          ${refRow('Coffee Roasters', 'CR', 'Growth', 'Twitter / X', 799, 160, 320, 'churned', 'Désab. 12 mar')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Resources -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div class="glass rounded-2xl p-5">
      <div class="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center mb-3">
        <i class="fas fa-palette text-orange-400"></i>
      </div>
      <h4 class="font-bold text-white text-sm mb-1">Kit créatif</h4>
      <p class="text-xs text-slate-500 mb-3">Logos, bannières, mockups, vidéos prêts à publier (Figma + Canva).</p>
      <a href="/press-kit" class="text-xs text-orange-400 font-semibold inline-flex items-center gap-1">Télécharger <i class="fas fa-arrow-right text-xs"></i></a>
    </div>
    <div class="glass rounded-2xl p-5">
      <div class="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center mb-3">
        <i class="fas fa-book-open text-brand-400"></i>
      </div>
      <h4 class="font-bold text-white text-sm mb-1">Guide affilié</h4>
      <p class="text-xs text-slate-500 mb-3">Best practices, hooks qui convertissent, templates email & posts.</p>
      <a href="#" onclick="event.preventDefault();window.scrollTo({top:0,behavior:'smooth'})" class="text-xs text-brand-400 font-semibold inline-flex items-center gap-1">Lire le guide <i class="fas fa-arrow-right text-xs"></i></a>
    </div>
    <div class="glass rounded-2xl p-5">
      <div class="w-10 h-10 rounded-xl bg-slate-500/15 flex items-center justify-center mb-3">
        <i class="fas fa-comments text-slate-400"></i>
      </div>
      <h4 class="font-bold text-white text-sm mb-1">Discord partenaires</h4>
      <p class="text-xs text-slate-500 mb-3">Rejoignez la communauté privée — 240+ affiliés actifs, AMA mensuel.</p>
      <a href="#" onclick="event.preventDefault();showAffToast('Lien Discord copié')" class="text-xs text-slate-400 font-semibold inline-flex items-center gap-1">Rejoindre <i class="fas fa-arrow-right text-xs"></i></a>
    </div>
  </div>

  <div id="aff-toast" class="hidden fixed bottom-6 right-6 z-50 glass rounded-xl px-4 py-3 text-sm font-semibold text-brand-400 animate-fadeIn"></div>

  <style>
    .aff-tier{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
    .aff-tier-Bronze{background:rgba(255,107,43,0.14);color:#FF6B2B;border:1px solid rgba(255,107,43,0.30)}
    .aff-tier-Silver{background:rgba(168,168,168,0.14);color:#A8A8A8;border:1px solid rgba(168,168,168,0.30)}
    .aff-tier-Gold{background:rgba(255,107,43,0.14);color:#FF6B2B;border:1px solid rgba(255,107,43,0.30)}
    .aff-tier-Diamond{background:rgba(255,77,0,0.14);color:#FF4D00;border:1px solid rgba(255,77,0,0.32)}
    .tier-pip{padding:10px;border-radius:11px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);text-align:center;position:relative;transition:all 0.2s}
    .tier-pip.done{opacity:0.85}
    .tier-pip.current{background:linear-gradient(135deg,rgba(255,77,0,0.14),rgba(255,107,43,0.05));border-color:rgba(255,77,0,0.35);box-shadow:0 0 18px rgba(255,77,0,0.15)}
    .tier-pip i{font-size:18px;margin-bottom:6px;display:block}
    .tier-pip .nm{font-size:11px;font-weight:700;color:#fff;letter-spacing:0.05em;text-transform:uppercase}
    .tier-pip .rg{font-size:10px;color:var(--muted);margin-top:2px}
    .tier-pip .rt{font-size:14px;color:var(--orange);font-weight:800;margin-top:4px}
    .track-pill{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:11px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06)}
    .track-pill i{width:22px;text-align:center;color:var(--orange2)}
    .track-pill .lb{font-size:11px;color:var(--muted2)}
    .track-pill .cn{font-size:13px;font-weight:700;color:#fff;margin-left:auto}
    .badge-active{display:inline-flex;align-items:center;padding:2px 8px;border-radius:100px;background:rgba(255,77,0,0.12);color:var(--green);border:1px solid rgba(255,77,0,0.30);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
    .badge-trial{display:inline-flex;align-items:center;padding:2px 8px;border-radius:100px;background:rgba(255,107,43,0.12);color:var(--gold);border:1px solid rgba(255,107,43,0.30);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
    .badge-churned{display:inline-flex;align-items:center;padding:2px 8px;border-radius:100px;background:rgba(122,122,122,0.12);color:#7A7A7A;border:1px solid rgba(122,122,122,0.30);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em}
    .blink{animation:affBlink 1.6s ease infinite}
    @keyframes affBlink{0%,100%{opacity:1}50%{opacity:0.35}}
  </style>

  <script>
  window.showAffToast = function(msg, color){
    var el = document.getElementById('aff-toast');
    el.style.color = color || '#FF4D00';
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(window._affTo);
    window._affTo = setTimeout(function(){ el.classList.add('hidden') }, 2400);
  };

  window.copyRefLink = function(){
    var v = document.getElementById('ref-link').value;
    var done = function(){
      document.getElementById('copy-icon').className = 'fas fa-check mr-1.5';
      document.getElementById('copy-label').textContent = 'Copié';
      setTimeout(function(){
        document.getElementById('copy-icon').className = 'fas fa-copy mr-1.5';
        document.getElementById('copy-label').textContent = 'Copier';
      }, 1800);
      showAffToast('✓ Lien copié dans le presse-papier');
    };
    if (navigator.clipboard) navigator.clipboard.writeText(v).then(done).catch(done);
    else { var i = document.getElementById('ref-link'); i.select(); document.execCommand('copy'); done(); }
  };

  window.newUtmLink = function(){
    var name = prompt('Nom du canal (ex: instagram-story, podcast-ep42) :');
    if (!name) return;
    var base = document.getElementById('ref-link').value.split('?')[0];
    document.getElementById('ref-link').value = base + '?utm_source=' + encodeURIComponent(name);
    showAffToast('✓ Lien UTM généré');
  };

  window.shareRef = function(channel){
    var v = document.getElementById('ref-link').value;
    var msg = 'Je viens d\\'optimiser mes campagnes pub avec AdNova — IA qui scale toute seule, +30% ROAS en 2 semaines.';
    var url;
    if (channel === 'twitter') url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(msg + ' ') + '&url=' + encodeURIComponent(v);
    else if (channel === 'linkedin') url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(v);
    else url = 'mailto:?subject=' + encodeURIComponent('AdNova AI — pub autonome') + '&body=' + encodeURIComponent(msg + '\\n\\n' + v);
    window.open(url, '_blank');
  };

  window.filterRefs = function(status){
    document.querySelectorAll('#refs-table tbody tr').forEach(function(tr){
      tr.style.display = !status || tr.getAttribute('data-status') === status ? '' : 'none';
    });
  };

  window.exportRefs = function(){
    var rows = [['Référé','Plan','Source','MRR','Commission','Lifetime','Statut','Depuis']];
    document.querySelectorAll('#refs-table tbody tr').forEach(function(tr){
      if (tr.style.display === 'none') return;
      var cells = [].slice.call(tr.querySelectorAll('td')).map(function(td){ return td.textContent.trim().replace(/\\s+/g,' ') });
      rows.push(cells);
    });
    var csv = rows.map(function(r){ return r.join(',') }).join('\\n');
    var a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'mes-affilies-' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    showAffToast('✓ Export CSV téléchargé');
  };
  </script>
  `
  return shell('Programme Partenaire', content, '/affiliate', lang)
}

function trackPill(label: string, code: string, clicks: number, icon: string): string {
  return `<div class="track-pill">
    <i class="fab ${icon}"></i>
    <span class="lb">${label}</span>
    <span class="cn">${clicks}</span>
  </div>`
}

function kpi(label: string, value: string, sub: string, icon: string, color: string): string {
  const tints: Record<string, string> = {
    orange: 'rgba(255,77,0,0.12)',
    emerald: 'rgba(255,77,0,0.12)',
    amber: 'rgba(255,107,43,0.12)',
    blue: 'rgba(168,168,168,0.12)',
  }
  const cols: Record<string, string> = {
    orange: 'var(--orange)', emerald: 'var(--green)', amber: 'var(--gold)', blue: '#A8A8A8',
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

function tierPip(name: string, range: string, rate: string, color: string, current: boolean, done: boolean): string {
  const klass = current ? 'current' : (done ? 'done' : '')
  const ic = name === 'Diamond' ? 'fa-gem' : name === 'Gold' ? 'fa-trophy' : 'fa-medal'
  return `<div class="tier-pip ${klass}">
    <i class="fas ${ic}" style="color:${color}"></i>
    <div class="nm">${name}</div>
    <div class="rg">${range}</div>
    <div class="rt">${rate}</div>
  </div>`
}

function refRow(name: string, abbr: string, plan: string, source: string, mrr: number, commission: number, lifetime: number, status: string, since: string): string {
  const badge = status === 'active' ? 'badge-active' : status === 'trial' ? 'badge-trial' : 'badge-churned'
  const label = status === 'active' ? 'Actif' : status === 'trial' ? 'Essai' : 'Désabonné'
  return `<tr class="border-b border-white/5" data-status="${status}">
    <td class="py-3">
      <div class="flex items-center gap-2.5">
        <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;font-weight:700;font-size:10px;display:inline-flex;align-items:center;justify-content:center">${abbr}</div>
        <div class="text-xs font-bold text-white">${name}</div>
      </div>
    </td>
    <td class="py-3 text-slate-300 text-xs">${plan}</td>
    <td class="py-3 text-slate-400 text-xs">${source}</td>
    <td class="py-3 text-right font-semibold text-slate-200 text-xs">$${mrr.toLocaleString()}</td>
    <td class="py-3 text-right font-bold text-orange-400 text-xs">+$${commission}/m</td>
    <td class="py-3 text-right font-bold text-brand-400 text-xs">$${lifetime.toLocaleString()}</td>
    <td class="py-3 text-center"><span class="${badge}">${label}</span></td>
    <td class="py-3 text-right text-slate-500 text-xs">${since}</td>
  </tr>`
}
