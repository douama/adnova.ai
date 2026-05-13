import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

// ─── Decision Log / Replay — tenant view ────────────────────────────────────
// Every autonomous decision the AI made for this tenant, with:
//   • what · why · which data was used · impact measured after
//   • "Replay" → simulates "what if AdNova had NOT taken this action"
//   • One-click rollback (mock — would call ad platform APIs)
// This page is AdNova's anti-Smartly USP : auditable autonomous execution
// with Claude reasoning, vs Smartly's rules-based automation that gives logs
// but no reasoning + no replay simulation.
export function renderDecisions(lang: Lang = 'en'): string {
  const decisions = [
    {
      id: 'd-4821', type: 'scale', icon: '↗', action: 'Scale budget +10%', actionColor: 'brand',
      campaign: 'Summer Collection 2026', platform: 'Meta', when: 'il y a 2 min', mode: 'autonomous',
      reason: 'ROAS sur les 72 dernières heures à 5.26× (cible 3.5×). CTR stable à 4.2%. Audience pas saturée (frequency 1.8). Conditions de scale remplies.',
      data: [
        { k: 'ROAS 72h',    before: '5.26×',  after: '5.18×',  delta: 'positive' },
        { k: 'Budget /jour', before: '$840',  after: '$924',   delta: 'positive' },
        { k: 'CTR',          before: '4.20%', after: '4.35%',  delta: 'positive' },
        { k: 'CPA',          before: '$18.40', after: '$19.10', delta: 'neutral' },
      ],
      impact: '+$2,340 revenue projeté sur 7 jours', impactPositive: true,
      tags: ['rule:auto-scale', 'guardrail:roas-min-3.5', 'confidence:94%'],
    },
    {
      id: 'd-4820', type: 'kill', icon: '✕', action: 'Pause 3 créatifs', actionColor: 'slate',
      campaign: 'Holiday Flash Sale', platform: 'TikTok', when: 'il y a 11 min', mode: 'autonomous',
      reason: 'CTR moyen 0.31% sur 5 423 impressions, sous le seuil 0.8%. Aucune conversion en 24h. 92% de probabilité que la dépense restante (~$120/j) brûle sans retour.',
      data: [
        { k: 'CTR',          before: '0.31%', after: '—', delta: 'negative' },
        { k: 'Impressions',  before: '5,423', after: '—', delta: 'neutral' },
        { k: 'Conversions',  before: '0',     after: '—', delta: 'negative' },
        { k: 'Spend évité',  before: '—',     after: '$840', delta: 'positive' },
      ],
      impact: '$840 budget économisé', impactPositive: true,
      tags: ['rule:auto-kill', 'guardrail:ctr-min-0.8%', 'confidence:97%'],
    },
    {
      id: 'd-4819', type: 'create', icon: '✨', action: 'Génération 4 variantes vidéo', actionColor: 'orange',
      campaign: 'Product Launch Q3', platform: 'Multi (Meta + TikTok)', when: 'il y a 18 min', mode: 'autonomous',
      reason: 'Hook actuel "Découvrez notre nouveauté" performe à 1.2% CTR (médiane catégorie : 2.8%). 4 hooks alternatifs générés via Claude + visuel Runway pour A/B test.',
      data: [
        { k: 'Hooks générés',   before: '1', after: '5', delta: 'positive' },
        { k: 'CTR attendu',     before: '1.2%', after: '2.4-3.1%', delta: 'positive' },
        { k: 'Coût génération', before: '—', after: '$2.40', delta: 'neutral' },
      ],
      impact: 'A/B test lancé — résultats sous 48h', impactPositive: true,
      tags: ['rule:creative-refresh', 'engine:claude+runway', 'confidence:81%'],
    },
    {
      id: 'd-4818', type: 'budget', icon: '⇄', action: 'Réallocation $1,200 TikTok → Google', actionColor: 'slate',
      campaign: 'Retargeting Pro', platform: 'Cross-platform', when: 'il y a 31 min', mode: 'autonomous',
      reason: 'Google Search ROAS 6.8× (saturation 67% du budget). TikTok ROAS 2.1× (sous cible 3.5×). Modèle prédit +23% ROAS global après réallocation.',
      data: [
        { k: 'TikTok budget', before: '$3,200', after: '$2,000', delta: 'negative' },
        { k: 'Google budget', before: '$4,800', after: '$6,000', delta: 'positive' },
        { k: 'ROAS global',   before: '4.40×',  after: '5.41×',  delta: 'positive' },
      ],
      impact: '+18% ROAS global projeté · validation post 48h', impactPositive: true,
      tags: ['rule:budget-optim', 'engine:claude', 'confidence:88%'],
    },
    {
      id: 'd-4817', type: 'audience', icon: '👥', action: 'Lookalike 1% → 3%', actionColor: 'brand',
      campaign: 'Brand Awareness Wave', platform: 'Meta', when: 'il y a 1h', mode: 'autonomous',
      reason: 'Audience source saturée (frequency 4.2, cap 4.0). Lookalike 1% épuisée. Élargissement à 3% pour maintenir le scale sans rogner sur la qualité.',
      data: [
        { k: 'Frequency',     before: '4.20', after: '2.10', delta: 'positive' },
        { k: 'Reach',         before: '142K', after: '480K', delta: 'positive' },
        { k: 'CPM attendu',   before: '$8.20', after: '$9.40', delta: 'neutral' },
      ],
      impact: 'Reach +2.1M projeté · CPA stable', impactPositive: true,
      tags: ['rule:audience-expand', 'guardrail:frequency-cap-4', 'confidence:91%'],
    },
    {
      id: 'd-4816', type: 'guardrail', icon: '🛡', action: 'Garde-fou : action bloquée', actionColor: 'brand',
      campaign: 'New User Acquisition', platform: 'Instagram', when: 'il y a 2h', mode: 'blocked',
      reason: 'L\'IA voulait scale +25% sur cette campagne (ROAS 4.1×). Bloqué par votre règle : "Max scale 15% par 24h". Décision soumise à validation manuelle.',
      data: [
        { k: 'Action proposée', before: '+25%', after: '15% max', delta: 'neutral' },
        { k: 'ROAS',            before: '4.10×', after: '4.10×', delta: 'neutral' },
      ],
      impact: 'Décision en attente · validez ou ignorez', impactPositive: false,
      tags: ['guardrail:max-scale-15%-24h', 'awaits-approval'],
      needsApproval: true,
    },
  ]

  const content = `
  <!-- Header + filters -->
  <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
    <div>
      <h2 class="text-xl font-black text-white flex items-center gap-3">
        Decision Log
        <span class="dl-mode-badge"><span class="dl-mode-dot"></span>Mode : Autonomous</span>
      </h2>
      <p class="text-xs text-slate-500 mt-0.5">Chaque action prise par l'IA — auditable, rejouable, annulable.</p>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="changeAIMode()" class="glass border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-white/5">
        <i class="fas fa-sliders mr-1"></i> Changer le mode
      </button>
      <button onclick="exportDecisionLog()" class="glass border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-white/5">
        <i class="fas fa-download mr-1"></i> Export
      </button>
    </div>
  </div>

  <!-- KPIs -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    ${dlKpi('Décisions (24h)', '1,284', '+18%', 'fa-bolt', 'orange')}
    ${dlKpi('Budget économisé', '$4,820', 'kills + réalloc.', 'fa-piggy-bank', 'brand')}
    ${dlKpi('Confidence moy.', '92%', 'sur 30j', 'fa-gauge-high', 'slate')}
    ${dlKpi('En attente validation', '3', 'guardrails déclenchés', 'fa-shield-halved', 'brand')}
  </div>

  <!-- Mode selector -->
  <div class="glass rounded-2xl p-5 mb-4">
    <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
      <div>
        <h3 class="font-bold text-white text-sm">Niveau d'autonomie</h3>
        <p class="text-xs text-slate-500 mt-0.5">Combien de pouvoir vous laissez à l'IA — vous switchez quand vous voulez.</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      ${modeCard('advisory',    'Advisory',   'L\'IA recommande, vous validez chaque action manuellement.',                                       false)}
      ${modeCard('guardrails',  'Guardrails', 'L\'IA exécute dans des bornes que vous définissez (ROAS min, budget max, etc.).',                false)}
      ${modeCard('autonomous',  'Autonomous', 'L\'IA décide et exécute librement. Vous auditez a posteriori via ce Decision Log.',              true)}
    </div>
  </div>

  <!-- Filters -->
  <div class="glass rounded-2xl p-3 mb-4 flex items-center gap-2 flex-wrap">
    <span class="text-xs text-slate-500 mr-2 px-2">Filtres :</span>
    ${filterPill('Tous', 'all', true)}
    ${filterPill('Scale', 'scale')}
    ${filterPill('Kill', 'kill')}
    ${filterPill('Créatif', 'create')}
    ${filterPill('Budget', 'budget')}
    ${filterPill('Audience', 'audience')}
    ${filterPill('Garde-fou', 'guardrail')}
    <div class="ml-auto flex items-center gap-2">
      <input id="dl-search" oninput="dlSearch()" placeholder="Rechercher campagne…" class="glass border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none w-56"/>
    </div>
  </div>

  <!-- Decision feed -->
  <div class="space-y-3" id="dl-feed">
    ${decisions.map(d => decisionCard(d)).join('')}
  </div>

  <!-- Replay modal -->
  <div id="replay-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4" onclick="if(event.target===this) closeReplay()">
    <div class="glass rounded-2xl w-full max-w-2xl p-6 animate-fadeIn">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-bold text-white flex items-center gap-2"><i class="fas fa-clock-rotate-left text-orange-400"></i> Replay : What if AdNova hadn't acted?</h3>
          <p class="text-xs text-slate-500 mt-1" id="replay-sub">Décision <span id="replay-id">d-4821</span> · <span id="replay-action">Scale +10%</span></p>
        </div>
        <button onclick="closeReplay()" class="text-slate-500 hover:text-white w-7 h-7 glass rounded-lg flex items-center justify-center"><i class="fas fa-times text-xs"></i></button>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="glass border border-white/10 rounded-xl p-4">
          <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Réel (AdNova a agi)</div>
          <div class="text-3xl font-black text-brand-400" id="replay-real">+$2,340</div>
          <div class="text-xs text-slate-500 mt-1">revenue sur 7 jours</div>
        </div>
        <div class="glass border border-white/10 rounded-xl p-4">
          <div class="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Simulation (sans AdNova)</div>
          <div class="text-3xl font-black text-slate-400" id="replay-sim">+$1,890</div>
          <div class="text-xs text-slate-500 mt-1">revenue projeté</div>
        </div>
      </div>

      <div class="admin-glass rounded-xl p-4 mb-3" style="background:linear-gradient(135deg,rgba(255,77,0,0.10),rgba(255,107,43,0.04));border:1px solid rgba(255,77,0,0.25)">
        <div class="flex items-center gap-2 mb-2">
          <i class="fas fa-trophy text-orange-400"></i>
          <span class="text-sm font-bold text-white">Delta IA</span>
        </div>
        <div class="text-2xl font-black text-orange-400" id="replay-delta">+$450 (+23.8%)</div>
        <div class="text-xs text-slate-500 mt-1">L'action IA a généré ce surplus vs scénario sans intervention.</div>
      </div>

      <div class="flex gap-2 flex-wrap">
        <button onclick="rollbackDecision()" class="flex-1 glass border border-slate-500/30 bg-slate-500/5 hover:bg-slate-500/10 rounded-lg px-4 py-2.5 text-xs text-slate-400 font-semibold">
          <i class="fas fa-rotate-left mr-1.5"></i> Rollback cette décision
        </button>
        <button onclick="closeReplay()" class="glass border border-white/10 rounded-lg px-4 py-2.5 text-xs text-slate-300 hover:bg-white/5">
          Fermer
        </button>
      </div>
    </div>
  </div>

  <div id="dl-toast" class="hidden fixed bottom-6 right-6 z-50 glass rounded-xl px-4 py-3 text-sm font-semibold text-brand-400 animate-fadeIn"></div>

  <style>
    .dl-mode-badge{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;background:rgba(255,77,0,0.10);color:var(--orange);border:1px solid rgba(255,77,0,0.30)}
    .dl-mode-dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:dlb 1.6s ease infinite}
    @keyframes dlb{0%,100%{opacity:1}50%{opacity:0.3}}
    .dl-card{padding:18px 20px;border-radius:14px;background:rgba(255,255,255,0.02);border:1px solid var(--border);position:relative;transition:border-color 0.2s,transform 0.2s}
    .dl-card:hover{border-color:rgba(255,77,0,0.20)}
    .dl-card::before{content:'';position:absolute;left:0;top:14px;bottom:14px;width:2px;border-radius:2px 0 0 2px}
    .dl-card.t-scale::before{background:var(--green);box-shadow:0 0 10px var(--green)}
    .dl-card.t-kill::before{background:#7A7A7A;box-shadow:0 0 10px rgba(122,122,122,0.7)}
    .dl-card.t-create::before{background:var(--orange);box-shadow:0 0 10px var(--orange)}
    .dl-card.t-budget::before{background:#A8A8A8;box-shadow:0 0 10px rgba(168,168,168,0.6)}
    .dl-card.t-audience::before{background:var(--green);box-shadow:0 0 10px var(--green)}
    .dl-card.t-guardrail::before{background:var(--gold);box-shadow:0 0 10px var(--gold)}
    .dl-head{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap}
    .dl-ic{width:36px;height:36px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;font-weight:700}
    .dl-card.t-scale .dl-ic{background:rgba(255,77,0,0.15);color:var(--green)}
    .dl-card.t-kill .dl-ic{background:rgba(122,122,122,0.15);color:#7A7A7A}
    .dl-card.t-create .dl-ic{background:rgba(255,77,0,0.15);color:var(--orange)}
    .dl-card.t-budget .dl-ic{background:rgba(168,168,168,0.15);color:#A8A8A8}
    .dl-card.t-audience .dl-ic{background:rgba(255,77,0,0.15);color:var(--green)}
    .dl-card.t-guardrail .dl-ic{background:rgba(255,107,43,0.15);color:var(--gold)}
    .dl-title{flex:1;min-width:0}
    .dl-action{font-size:14px;font-weight:700;color:#fff;letter-spacing:-0.005em;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .dl-meta{font-size:11px;color:var(--muted);margin-top:3px}
    .dl-when{font-size:11px;color:var(--muted);flex-shrink:0;text-align:right}
    .dl-conf{display:inline-flex;align-items:center;padding:1px 7px;border-radius:100px;font-size:10px;font-weight:700;background:rgba(255,255,255,0.04);border:1px solid var(--border);color:var(--muted2);letter-spacing:0.04em}
    .dl-mode-tag{display:inline-flex;align-items:center;padding:1px 7px;border-radius:100px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em}
    .dl-mode-tag.autonomous{background:rgba(255,77,0,0.12);color:var(--orange);border:1px solid rgba(255,77,0,0.28)}
    .dl-mode-tag.blocked{background:rgba(255,107,43,0.12);color:var(--gold);border:1px solid rgba(255,107,43,0.28)}
    .dl-reason{font-size:13px;color:var(--text);line-height:1.6;padding:11px 13px;border-radius:10px;background:rgba(255,255,255,0.015);border:1px solid var(--border);margin-bottom:10px;display:flex;gap:9px;align-items:flex-start}
    .dl-reason::before{content:'\\f0eb';font-family:'Font Awesome 6 Free';font-weight:900;color:var(--orange);font-size:14px;flex-shrink:0;margin-top:1px}
    .dl-data{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:10px}
    .dl-data-cell{padding:9px 11px;border-radius:9px;background:rgba(255,255,255,0.015);border:1px solid var(--border)}
    .dl-data-k{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;font-weight:600}
    .dl-data-v{font-size:13px;color:#fff;font-weight:700;margin-top:3px;display:flex;align-items:center;gap:6px;font-variant-numeric:tabular-nums}
    .dl-data-arr{color:var(--muted);font-size:10px}
    .dl-data-after.positive{color:var(--green)}
    .dl-data-after.negative{color:#7A7A7A}
    .dl-data-after.neutral{color:var(--muted2)}
    .dl-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding-top:11px;border-top:1px solid var(--border)}
    .dl-impact{font-size:12px;color:var(--muted2)}
    .dl-impact strong{color:var(--green);font-weight:700;margin-right:6px}
    .dl-impact.neg strong{color:#7A7A7A}
    .dl-tags{display:flex;gap:5px;flex-wrap:wrap}
    .dl-tag{display:inline-flex;align-items:center;padding:2px 7px;border-radius:5px;font-size:10px;font-family:'JetBrains Mono','Menlo',monospace;letter-spacing:0.01em;background:rgba(255,255,255,0.03);border:1px solid var(--border);color:var(--muted2)}
    .dl-actions{display:flex;gap:6px;margin-top:11px;flex-wrap:wrap}
    .dl-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;border-radius:9px;font-size:12px;font-weight:600;border:1px solid var(--border);background:rgba(255,255,255,0.02);color:var(--muted2);cursor:pointer;transition:all 0.15s}
    .dl-btn:hover{background:rgba(255,77,0,0.06);color:var(--orange);border-color:rgba(255,77,0,0.30)}
    .dl-btn.approve{background:rgba(255,77,0,0.08);border-color:rgba(255,77,0,0.30);color:var(--green)}
    .dl-btn.approve:hover{background:rgba(255,77,0,0.16)}
    .dl-btn.reject{background:rgba(122,122,122,0.06);border-color:rgba(122,122,122,0.25);color:#7A7A7A}
    .dl-btn.reject:hover{background:rgba(122,122,122,0.14)}

    .filter-pill{padding:5px 12px;border-radius:100px;font-size:11px;font-weight:600;border:1px solid var(--border);background:rgba(255,255,255,0.02);color:var(--muted2);cursor:pointer;letter-spacing:0.02em;transition:all 0.15s}
    .filter-pill:hover{border-color:var(--border2);color:#fff}
    .filter-pill.active{background:rgba(255,77,0,0.12);color:var(--orange);border-color:rgba(255,77,0,0.30)}

    .mode-card{padding:14px;border-radius:12px;background:rgba(255,255,255,0.02);border:1px solid var(--border);cursor:pointer;transition:all 0.2s;position:relative}
    .mode-card:hover{border-color:rgba(255,77,0,0.25)}
    .mode-card.active{background:linear-gradient(135deg,rgba(255,77,0,0.10),rgba(255,107,43,0.03));border-color:rgba(255,77,0,0.35);box-shadow:0 0 18px rgba(255,77,0,0.10)}
    .mode-card.active::after{content:'\\f00c';font-family:'Font Awesome 6 Free';font-weight:900;position:absolute;top:10px;right:12px;color:var(--orange);font-size:12px}
    .mode-card h4{font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;letter-spacing:-0.01em}
    .mode-card p{font-size:12px;color:var(--muted2);line-height:1.5}
  </style>

  <script>
  function dlToast(msg, color){
    var el = document.getElementById('dl-toast');
    el.style.color = color || '#FF4D00';
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(window._dlT);
    window._dlT = setTimeout(function(){ el.classList.add('hidden') }, 2400);
  }

  window.changeAIMode = function(){
    document.getElementById('dl-mode-section')?.scrollIntoView({behavior:'smooth'});
    dlToast('Choisissez un mode ci-dessous');
  };

  window.setMode = function(mode){
    document.querySelectorAll('.mode-card').forEach(function(c){
      c.classList.toggle('active', c.dataset.mode === mode);
    });
    dlToast('✓ Mode IA basculé : ' + mode);
  };

  window.exportDecisionLog = function(){
    dlToast('✓ Export Decision Log (.csv) téléchargé');
  };

  window.filterDecisions = function(type){
    document.querySelectorAll('.filter-pill').forEach(function(p){
      p.classList.toggle('active', p.dataset.filter === type);
    });
    document.querySelectorAll('.dl-card').forEach(function(c){
      c.style.display = type === 'all' || c.dataset.type === type ? '' : 'none';
    });
  };

  window.dlSearch = function(){
    var q = (document.getElementById('dl-search').value || '').toLowerCase();
    document.querySelectorAll('.dl-card').forEach(function(c){
      c.style.display = c.textContent.toLowerCase().indexOf(q) === -1 ? 'none' : '';
    });
  };

  window.openReplay = function(id, action, real, sim){
    document.getElementById('replay-id').textContent = id;
    document.getElementById('replay-action').textContent = action;
    document.getElementById('replay-real').textContent = real;
    document.getElementById('replay-sim').textContent = sim;
    var rN = parseFloat((real||'').replace(/[^0-9.-]/g,'')) || 0;
    var sN = parseFloat((sim||'').replace(/[^0-9.-]/g,'')) || 0;
    var d = rN - sN;
    var pct = sN === 0 ? 0 : (d / sN) * 100;
    document.getElementById('replay-delta').textContent = (d >= 0 ? '+' : '') + '$' + d.toLocaleString() + ' (' + (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%)';
    document.getElementById('replay-modal').classList.remove('hidden');
  };

  window.closeReplay = function(){
    document.getElementById('replay-modal').classList.add('hidden');
  };

  window.rollbackDecision = function(){
    if (!confirm('Annuler cette décision et restaurer l\\'état précédent ?')) return;
    closeReplay();
    dlToast('✓ Décision annulée — état restauré sur la plateforme', '#7A7A7A');
  };

  window.approveDecision = function(id){
    dlToast('✓ Décision ' + id + ' approuvée et exécutée');
    var card = document.querySelector('[data-id="' + id + '"]');
    if (card) card.style.opacity = '0.5';
  };

  window.rejectDecision = function(id){
    dlToast('✗ Décision ' + id + ' rejetée', '#7A7A7A');
    var card = document.querySelector('[data-id="' + id + '"]');
    if (card) card.style.opacity = '0.5';
  };
  </script>
  `
  return shell('Decision Log', content, '/decisions', lang)
}

function dlKpi(label: string, value: string, sub: string, icon: string, color: string): string {
  const tints: Record<string, string> = {
    orange: 'rgba(255,77,0,0.12)', emerald: 'rgba(255,77,0,0.12)',
    amber: 'rgba(255,107,43,0.12)', blue: 'rgba(168,168,168,0.12)',
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

function modeCard(mode: string, name: string, desc: string, active: boolean): string {
  return `<div class="mode-card ${active ? 'active' : ''}" data-mode="${mode}" onclick="setMode('${mode}')">
    <h4>${name}</h4>
    <p>${desc}</p>
  </div>`
}

function filterPill(label: string, filter: string, active = false): string {
  return `<button class="filter-pill ${active ? 'active' : ''}" data-filter="${filter}" onclick="filterDecisions('${filter}')">${label}</button>`
}

function decisionCard(d: any): string {
  const dataCells = d.data.map((c: any) => `
    <div class="dl-data-cell">
      <div class="dl-data-k">${c.k}</div>
      <div class="dl-data-v">
        <span style="color:var(--muted)">${c.before}</span>
        <span class="dl-data-arr">→</span>
        <span class="dl-data-after ${c.delta}">${c.after}</span>
      </div>
    </div>`).join('')

  const tags = d.tags.map((t: string) => `<span class="dl-tag">${t}</span>`).join('')
  const confidence = (d.tags.find((t: string) => t.startsWith('confidence:')) || '').replace('confidence:', '')
  const replayBtn = d.type !== 'guardrail'
    ? `<button class="dl-btn" onclick="openReplay('${d.id}','${d.action.replace(/'/g, "\\'")}','${d.impact.match(/\\$[0-9,]+/)?.[0] || '+$2,340'}','+$1,890')"><i class="fas fa-clock-rotate-left"></i> Replay</button>
       <button class="dl-btn"><i class="fas fa-rotate-left"></i> Rollback</button>
       <button class="dl-btn"><i class="fas fa-share"></i> Share</button>`
    : ''
  const approvalBtns = d.needsApproval
    ? `<div class="dl-actions">
        <button class="dl-btn approve" onclick="approveDecision('${d.id}')"><i class="fas fa-check"></i> Approuver</button>
        <button class="dl-btn reject" onclick="rejectDecision('${d.id}')"><i class="fas fa-times"></i> Rejeter</button>
      </div>`
    : ''

  return `<div class="dl-card t-${d.type}" data-id="${d.id}" data-type="${d.type}">
    <div class="dl-head">
      <div class="dl-ic">${d.icon}</div>
      <div class="dl-title">
        <div class="dl-action">
          ${d.action}
          ${confidence ? `<span class="dl-conf">${confidence} conf.</span>` : ''}
          <span class="dl-mode-tag ${d.mode}">${d.mode}</span>
        </div>
        <div class="dl-meta">${d.campaign} · ${d.platform} · <span style="font-family:'JetBrains Mono',monospace">${d.id}</span></div>
      </div>
      <div class="dl-when">${d.when}</div>
    </div>

    <div class="dl-reason">${d.reason}</div>

    <div class="dl-data">${dataCells}</div>

    <div class="dl-foot">
      <div class="dl-impact ${d.impactPositive ? '' : 'neg'}"><strong>Impact</strong>${d.impact}</div>
      <div class="dl-tags">${tags}</div>
    </div>

    ${replayBtn ? `<div class="dl-actions">${replayBtn}</div>` : ''}
    ${approvalBtns}
  </div>`
}
