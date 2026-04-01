import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminAIMonitor = (c: Context) => {
  const content = `
  <!-- Global AI Health -->
  <div class="glass rounded-2xl p-5 mb-6 border border-orange-500/15">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-xl">
          <i class="fas fa-brain text-white text-xl"></i>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h2 class="text-lg font-black text-white">AI Engine — Vue Globale</h2>
            <span class="badge-active text-xs px-2 py-0.5 rounded-full font-bold">OPÉRATIONNEL</span>
          </div>
          <p class="text-xs text-slate-400">2,412 tenants actifs · 47,284 campagnes · 12 modèles déployés</p>
          <div class="flex gap-4 mt-1 text-xs text-slate-600">
            <span><i class="fas fa-bolt text-orange-400 mr-1"></i>487,240 décisions/heure</span>
            <span><i class="fas fa-microchip text-blue-400 mr-1"></i>48/64 GPUs actifs</span>
            <span><i class="fas fa-memory text-purple-400 mr-1"></i>RAM: 78%</span>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button id="global-pause-btn" onclick="toggleGlobalPause()" class="glass hover:bg-white/10 text-slate-400 text-xs px-4 py-2 rounded-xl transition-all">
          <i class="fas fa-pause mr-1"></i>Pause globale
        </button>
        <button onclick="openMaintenanceModal()" class="bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 text-xs px-4 py-2 rounded-xl transition-all">
          <i class="fas fa-wrench mr-1"></i>Maintenance
        </button>
      </div>
    </div>
  </div>

  <!-- Infrastructure Metrics -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${infraMetric('CPU Global', '73%', 'fa-microchip', 73, 'blue')}
    ${infraMetric('RAM Utilisée', '78%', 'fa-memory', 78, 'purple')}
    ${infraMetric('GPU Load', '75%', 'fa-bolt', 75, 'orange')}
    ${infraMetric('API Latence', '42ms', 'fa-wifi', 42, 'emerald')}
  </div>

  <!-- Charts -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">Décisions IA / heure (24h)</h3>
      <canvas id="aiDecisionsChart" height="200"></canvas>
    </div>
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">Répartition Actions IA</h3>
      <canvas id="aiActionsChart" height="200"></canvas>
    </div>
  </div>

  <!-- Modèles IA déployés -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">Modèles IA Déployés</h3>
      <button onclick="openDeployModal()" class="glass hover:bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-plus mr-1"></i>Déployer modèle</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${aiModel('AdNova-Predictor-v2', 'Performance prediction', '94.2%', 'Actif', '2.1M', 'emerald', '12h')}
      ${aiModel('Creative-Gen-v3', 'Image/Video generation', '—', 'Actif', '847K/j', 'purple', '6h')}
      ${aiModel('Budget-Opt-v2', 'Budget optimization', '91.3%', 'Actif', '2.4M', 'blue', '3h')}
      ${aiModel('Copy-Engine-v1', 'Ad copy generation', '88.7%', 'Actif', '380K', 'amber', '24h')}
      ${aiModel('Audience-ML-v2', 'Lookalike building', '84.2%', 'Actif', '124K', 'cyan', '48h')}
      ${aiModel('Creative-Scorer-v1', 'CTR prediction', '87.6%', 'Actif', '5.8M', 'pink', '6h')}
    </div>
  </div>

  <!-- Erreurs & Incidents -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">Incidents Récents</h3>
      <span class="text-xs badge-active px-2 py-1 rounded-full">0 incident actif</span>
    </div>
    <div class="space-y-2">
      ${incident('Résolu', 'emerald', 'Pic CPU 92% — AI predictor', 'Auto-scaled: +4 GPUs ajoutés', '29 mar 2026 14:32', '8 min')}
      ${incident('Résolu', 'emerald', 'Latence API +120ms', 'Cache invalidé — Redis flushed', '28 mar 2026 09:18', '3 min')}
      ${incident('Résolu', 'amber', 'Erreur rate +0.3%', 'TikTok API timeout — retry logic', '27 mar 2026 22:45', '15 min')}
    </div>
  </div>

  <!-- Maintenance Modal -->
  <div id="maintenance-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md border border-orange-500/30">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-white flex items-center gap-2"><i class="fas fa-wrench text-orange-400"></i> Mode Maintenance</h2>
        <button onclick="closeMaintModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 rounded-lg glass flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
          <i class="fas fa-triangle-exclamation mt-0.5 flex-shrink-0"></i>
          <span>Le mode maintenance suspend temporairement toutes les décisions IA pour <strong>tous les tenants</strong>. Les campagnes restent actives mais sans optimisation.</span>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Durée de maintenance</label>
          <select id="maint-duration" class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent cursor-pointer">
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 heure</option>
            <option value="120">2 heures</option>
            <option value="0">Durée indéfinie</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Motif (affiché aux tenants)</label>
          <textarea id="maint-reason" rows="2" placeholder="Ex: Mise à jour du modèle IA v2.1 — amélioration des performances..." class="w-full glass rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-orange-500 transition-all resize-none"></textarea>
        </div>
        <div class="flex gap-2">
          <button onclick="closeMaintModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm transition-all">Annuler</button>
          <button onclick="activateMaintenance()" class="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90 text-white py-2.5 rounded-xl text-sm font-bold transition-all">
            <i class="fas fa-wrench mr-1.5"></i>Activer maintenance
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Deploy Model Modal -->
  <div id="deploy-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md border border-orange-500/30">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-white flex items-center gap-2"><i class="fas fa-rocket text-emerald-400"></i> Déployer un modèle IA</h2>
        <button onclick="closeDeployModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 rounded-lg glass flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Modèle à déployer</label>
          <select class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent cursor-pointer">
            <option>AdNova-Predictor-v2.1 (nouveau)</option>
            <option>Creative-Gen-v4 (beta)</option>
            <option>Budget-Opt-v3 (stable)</option>
            <option>Audience-ML-v3 (stable)</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Stratégie de déploiement</label>
          <select class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent cursor-pointer">
            <option>Canary (5% tenants d'abord)</option>
            <option>Blue/Green (switch instantané)</option>
            <option>Rolling (10% toutes les 30min)</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button onclick="closeDeployModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-2.5 rounded-xl text-sm transition-all">Annuler</button>
          <button onclick="deployModel()" class="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white py-2.5 rounded-xl text-sm font-bold transition-all">
            <i class="fas fa-rocket mr-1.5"></i>Déployer
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
  let aiPaused = false;
  function toggleGlobalPause() {
    aiPaused = !aiPaused;
    const btn = document.getElementById('global-pause-btn');
    const badge = document.querySelector('.badge-active');
    if (aiPaused) {
      btn.innerHTML = '<i class="fas fa-play mr-1"></i>Reprendre';
      btn.className = 'bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs px-4 py-2 rounded-xl transition-all';
      if (badge) { badge.className = 'badge-paused text-xs px-2 py-0.5 rounded-full font-bold'; badge.textContent = 'EN PAUSE'; }
      showAdminToast('⏸ AI Engine mis en pause globale — toutes décisions suspendues', 'amber');
    } else {
      btn.innerHTML = '<i class="fas fa-pause mr-1"></i>Pause globale';
      btn.className = 'glass hover:bg-white/10 text-slate-400 text-xs px-4 py-2 rounded-xl transition-all';
      if (badge) { badge.className = 'badge-active text-xs px-2 py-0.5 rounded-full font-bold'; badge.textContent = 'OPÉRATIONNEL'; }
      showAdminToast('▶️ AI Engine réactivé — décisions reprises', 'emerald');
    }
  }
  function openMaintenanceModal() { document.getElementById('maintenance-modal').classList.remove('hidden'); }
  function closeMaintModal() { document.getElementById('maintenance-modal').classList.add('hidden'); }
  function activateMaintenance() {
    const duration = document.getElementById('maint-duration').value;
    const reason = document.getElementById('maint-reason').value || 'Maintenance planifiée';
    closeMaintModal();
    const label = duration === '0' ? 'indéfinie' : duration + ' min';
    showAdminToast('🔧 Mode maintenance activé (' + label + ') — ' + reason, 'amber');
    if (duration !== '0') {
      setTimeout(() => showAdminToast('✓ Maintenance terminée — AI Engine opérationnel', 'emerald'), parseInt(duration) * 1000);
    }
  }
  function openDeployModal() { document.getElementById('deploy-modal').classList.remove('hidden'); }
  function closeDeployModal() { document.getElementById('deploy-modal').classList.add('hidden'); }
  function deployModel() {
    closeDeployModal();
    showAdminToast('🚀 Déploiement lancé — monitoring actif pour les 30 prochaines minutes', 'emerald');
  }
  function showAdminToast(msg, type = 'emerald') {
    const colors = { emerald:'bg-emerald-500/20 border-emerald-500/30 text-emerald-300', amber:'bg-amber-500/20 border-amber-500/30 text-amber-300', red:'bg-red-500/20 border-red-500/30 text-red-300' };
    const t = document.createElement('div');
    t.className = 'fixed bottom-5 right-5 z-[9999] px-4 py-3 rounded-xl border text-sm font-semibold backdrop-blur-xl shadow-2xl ' + (colors[type]||colors.emerald);
    t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 4000);
  }
  window.addEventListener('load', function() {
    if (typeof Chart === 'undefined') return;
    new Chart(document.getElementById('aiDecisionsChart').getContext('2d'), {
      type: 'line',
      data: {
        labels: Array.from({length:24}, (_,i) => i+'h'),
        datasets: [{
          label: 'Décisions/heure',
          data: [380000,320000,280000,240000,210000,230000,310000,420000,480000,510000,487000,495000,502000,490000,483000,476000,488000,495000,487000,480000,472000,465000,458000,487240],
          borderColor: '#f97316', backgroundColor: 'rgba(249,115,22,0.1)', fill:true, tension:0.4, pointRadius:2, borderWidth:2
        }]
      },
      options: { responsive:true, maintainAspectRatio:false,
        plugins:{legend:{display:false}},
        scales:{
          x:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#475569',font:{size:9}}},
          y:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#475569',font:{size:9},callback:function(v){return (v/1000).toFixed(0)+'K'}}}
        }
      }
    });
    new Chart(document.getElementById('aiActionsChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Budget realloc.','Creative kill','Scale +10%','Audience expand','Creative generate','Other'],
        datasets:[{ data:[35,24,18,12,8,3],
          backgroundColor:['rgba(249,115,22,0.8)','rgba(239,68,68,0.8)','rgba(16,185,129,0.8)','rgba(59,130,246,0.8)','rgba(139,92,246,0.8)','rgba(148,163,184,0.5)'],
          borderWidth:0, hoverOffset:4 }]
      },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'65%', plugins:{legend:{position:'right',labels:{color:'#94a3b8',font:{size:10}}}} }
    });
  });
  </script>
  `
  return c.html(adminShell('Monitoring IA', content, '/admin/ai-monitor'))
}

function infraMetric(label: string, value: string, icon: string, pct: number, color: string): string {
  const barColor = pct > 85 ? 'red' : pct > 70 ? 'amber' : color
  return `<div class="glass rounded-2xl p-4">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <i class="fas ${icon} text-${color}-400 text-sm"></i>
        <span class="text-xs text-slate-400">${label}</span>
      </div>
      <span class="text-lg font-black text-white">${value}</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill bg-${barColor}-500" style="width:${typeof pct === 'number' && pct <= 100 ? pct : 50}%"></div>
    </div>
    <div class="flex items-center justify-between mt-1">
      <span class="text-xs text-${barColor}-400">${pct > 85 ? '⚠ Élevé' : pct > 70 ? 'Normal' : '✓ OK'}</span>
    </div>
  </div>`
}

function aiModel(name: string, desc: string, accuracy: string, status: string, requests: string, color: string, lastRetrain: string): string {
  return `<div class="glass rounded-xl p-4 card-hover">
    <div class="flex items-center justify-between mb-2">
      <div class="w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center">
        <i class="fas fa-brain text-${color}-400 text-xs"></i>
      </div>
      <span class="badge-active text-xs px-2 py-0.5 rounded-full">${status}</span>
    </div>
    <div class="font-bold text-white text-sm">${name}</div>
    <div class="text-xs text-slate-500 mb-2">${desc}</div>
    <div class="space-y-1 text-xs">
      <div class="flex justify-between"><span class="text-slate-600">Précision</span><span class="text-${color}-400 font-bold">${accuracy}</span></div>
      <div class="flex justify-between"><span class="text-slate-600">Requêtes/j</span><span class="text-slate-300">${requests}</span></div>
      <div class="flex justify-between"><span class="text-slate-600">Dernier entraîn.</span><span class="text-slate-500">il y a ${lastRetrain}</span></div>
    </div>
  </div>`
}

function incident(status: string, color: string, title: string, resolution: string, time: string, duration: string): string {
  return `<div class="flex items-start gap-3 p-3 glass rounded-xl">
    <span class="badge-${color === 'emerald' ? 'active' : 'trial'} text-xs px-2 py-1 rounded-full flex-shrink-0 mt-0.5">${status}</span>
    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold text-slate-200">${title}</div>
      <div class="text-xs text-slate-500 mt-0.5">${resolution}</div>
    </div>
    <div class="text-right flex-shrink-0">
      <div class="text-xs text-slate-500">${time}</div>
      <div class="text-xs text-${color}-400">Durée: ${duration}</div>
    </div>
  </div>`
}
