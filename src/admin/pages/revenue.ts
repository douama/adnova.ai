import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminRevenue = (c: Context) => {
  const content = `
  <!-- KPIs Revenus -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${revKPI('MRR Actuel', '$1,847,200', '+12.4%', 'fa-dollar-sign', 'orange')}
    ${revKPI('ARR Projeté', '$22,166,400', '+14.1%', 'fa-chart-line', 'brand')}
    ${revKPI('Churn MRR', '-$24,800', '-1.3%', 'fa-arrow-trend-down', 'slate')}
    ${revKPI('Net New MRR', '+$198,600', '+12.0%', 'fa-arrow-trend-up', 'slate')}
  </div>

  <!-- Revenue par Plan + Churn -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-4">MRR par Plan</h3>
      <div style="position:relative;height:260px"><canvas id="revenueByPlanChart"></canvas></div>
    </div>
    <div class="glass rounded-2xl p-5">
      <h3 class="font-bold text-white mb-1">Taux de Churn</h3>
      <p class="text-xs text-slate-500 mb-4">Évolution mensuelle</p>
      <div style="position:relative;height:260px"><canvas id="churnChart"></canvas></div>
    </div>
  </div>

  <!-- Breakdown Plans -->
  <div class="glass rounded-2xl p-5 mb-6">
    <h3 class="font-bold text-white mb-4">Revenus Détaillés par Plan</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="text-slate-600 border-b border-white/5">
            <th class="text-left pb-3 font-semibold">Plan</th>
            <th class="text-right pb-3 font-semibold">Clients</th>
            <th class="text-right pb-3 font-semibold">Prix unitaire</th>
            <th class="text-right pb-3 font-semibold">MRR</th>
            <th class="text-right pb-3 font-semibold">% Total</th>
            <th class="text-right pb-3 font-semibold">Churn</th>
            <th class="text-right pb-3 font-semibold">LTV moyen</th>
          </tr>
        </thead>
        <tbody>
          ${revenueRow('Starter', '1,240', '$299', '$370,760', '20.1%', '3.2%', '$2,243', 'slate')}
          ${revenueRow('Growth', '892', '$799', '$712,508', '38.6%', '1.8%', '$7,989', 'orange')}
          ${revenueRow('Enterprise', '280', 'Avg $2,800', '$784,000', '42.4%', '0.7%', '$48,000', 'brand')}
          ${revenueRow('Trial → Conv.', '284', '$0', '$0', '—', '—', '—', 'brand')}
        </tbody>
        <tfoot>
          <tr class="border-t border-white/10">
            <td class="pt-3 font-bold text-white">Total</td>
            <td class="pt-3 text-right font-bold text-white">2,412</td>
            <td class="pt-3 text-right">—</td>
            <td class="pt-3 text-right font-black text-orange-400">$1,847,268</td>
            <td class="pt-3 text-right font-bold text-white">100%</td>
            <td class="pt-3 text-right text-slate-400">Moy. 1.9%</td>
            <td class="pt-3 text-right">—</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <!-- Factures récentes -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">Transactions Récentes</h3>
      <button onclick="exportStripe()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
        <i class="fas fa-download text-xs"></i> Export Stripe
      </button>
      <button onclick="exportRevCSV()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ml-1">
        <i class="fas fa-file-csv text-xs"></i> CSV
      </button>
    </div>
    <div class="space-y-2">
      ${transaction('Digital Storm Agency', 'Growth', '$799.00', 'success', "Aujourd'hui 09:14")}
      ${transaction('NovaBrand Inc.', 'Starter', '$299.00', 'success', 'Hier 18:32')}
      ${transaction('Apex Marketing', 'Enterprise', '$2,800.00', 'success', '30 mar 2026')}
      ${transaction('Fashion Brand', 'Starter', '$299.00', 'failed', '29 mar 2026')}
      ${transaction('LuxoGroup', 'Growth', '$799.00', 'success', '25 mar 2026')}
    </div>
  </div>

  <script>
  function exportStripe() {
    showRevToast('⏳ Export Stripe en cours...', 'brand');
    setTimeout(() => showRevToast('✓ Export Stripe téléchargé (derniers 30 jours)', 'brand'), 1500);
  }
  function exportRevCSV() {
    const rows = [['Client','Plan','Montant','Statut','Date']];
    document.querySelectorAll('.transaction-row').forEach(row => {
      const cells = [...row.querySelectorAll('[data-cell]')].map(c => c.textContent.trim());
      rows.push(cells);
    });
    const csv = [['Client','Plan','Montant','Statut','Date'], ["Digital Storm Agency","Growth","$799.00","R\u00e9ussi","Aujourd'hui 09:14"], ['NovaBrand Inc.','Starter','$299.00','Réussi','Hier 18:32'], ['Apex Marketing','Enterprise','$2,800.00','Réussi','30 mar 2026'], ['Fashion Brand','Starter','$299.00','Échoué','29 mar 2026'], ['LuxoGroup','Growth','$799.00','Réussi','25 mar 2026']].map(r => r.join(',')).join('\\n');
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'revenue-' + new Date().toISOString().slice(0,10) + '.csv'; a.click();
    showRevToast('✓ CSV téléchargé', 'brand');
  }
  function showRevToast(msg, type = 'brand') {
    const colors = { emerald:'bg-brand-500/20 border-brand-500/30 text-brand-300', amber:'bg-brand-500/20 border-brand-500/30 text-brand-300' };
    const t = document.createElement('div');
    t.className = 'fixed bottom-5 right-5 z-[9999] px-4 py-3 rounded-xl border text-sm font-semibold backdrop-blur-xl shadow-2xl ' + (colors[type]||colors.emerald);
    t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 3500);
  }
  window.addEventListener('load', function() {
  if (typeof Chart === 'undefined') return;
  new Chart(document.getElementById('revenueByPlanChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['Oct','Nov','Déc','Jan','Fév','Mar'],
      datasets: [
        { label:'Starter', data:[280000,310000,340000,362000,368000,370760], borderColor:'#FF6B2B', backgroundColor:'rgba(255,107,43,0.10)', fill:true, tension:0.4, borderWidth:2, pointRadius:2 },
        { label:'Growth', data:[480000,534000,588000,638000,692000,712508], borderColor:'#FF4D00', backgroundColor:'rgba(255,77,0,0.12)', fill:true, tension:0.4, borderWidth:2, pointRadius:2 },
        { label:'Enterprise', data:[560000,610000,660000,700000,748000,784000], borderColor:'#FF4D00', backgroundColor:'rgba(255,77,0,0.10)', fill:true, tension:0.4, borderWidth:2, pointRadius:2 },
      ]
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins:{legend:{labels:{color:'#7A7A7A',font:{size:10}}}},
      scales:{
        x:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#7A7A7A',font:{size:10}}},
        y:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#7A7A7A',font:{size:10},callback:v=>'$'+(v/1000).toFixed(0)+'K'}}
      }
    }
  });
  new Chart(document.getElementById('churnChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Oct','Nov','Déc','Jan','Fév','Mar'],
      datasets: [
        { label:'Churn (%)', data:[2.8,2.4,2.1,2.0,1.9,1.9], backgroundColor:'rgba(122,122,122,0.4)', borderColor:'#7A7A7A', borderWidth:1, borderRadius:4 },
        { label:'Rétention (%)', data:[97.2,97.6,97.9,98.0,98.1,98.1], backgroundColor:'rgba(255,77,0,0.2)', borderColor:'#FF4D00', borderWidth:1, borderRadius:4, yAxisID:'y1' }
      ]
    },
    options: { responsive:true, maintainAspectRatio:false,
      plugins:{legend:{labels:{color:'#7A7A7A',font:{size:10}}}},
      scales:{
        x:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#7A7A7A',font:{size:10}}},
        y:{grid:{color:'rgba(255,255,255,0.03)'},ticks:{color:'#7A7A7A',font:{size:10},callback:v=>v+'%'}},
        y1:{display:false}
      }
    }
  });
  }); // end window.addEventListener load
  </script>
  `
  return c.html(adminShell('Revenus & MRR', content, '/admin/revenue'))
}

function revKPI(label: string, value: string, change: string, icon: string, color: string): string {
  const isPos = change.includes('+')
  return `<div class="glass rounded-2xl p-5">
    <div class="flex items-start justify-between mb-3">
      <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center"><i class="fas ${icon} text-${color}-400"></i></div>
      <span class="text-xs font-bold px-2 py-1 rounded-full ${isPos ? 'bg-brand-500/15 text-brand-400' : 'bg-slate-500/15 text-slate-400'}">${change}</span>
    </div>
    <div class="text-xl font-black text-white">${value}</div>
    <div class="text-xs text-slate-400 mt-0.5">${label}</div>
  </div>`
}

function revenueRow(plan: string, clients: string, price: string, mrr: string, pct: string, churn: string, ltv: string, color: string): string {
  return `<tr class="table-row border-b border-white/5">
    <td class="py-3"><span class="px-2 py-0.5 rounded-full text-xs bg-${color}-500/15 text-${color}-400 font-semibold">${plan}</span></td>
    <td class="py-3 text-right text-slate-300">${clients}</td>
    <td class="py-3 text-right text-slate-400">${price}</td>
    <td class="py-3 text-right font-black text-orange-400">${mrr}</td>
    <td class="py-3 text-right text-slate-400">${pct}</td>
    <td class="py-3 text-right text-slate-400">${churn}</td>
    <td class="py-3 text-right text-brand-400 font-semibold">${ltv}</td>
  </tr>`
}

function transaction(client: string, plan: string, amount: string, status: string, date: string): string {
  return `<div class="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/3 transition-all">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg ${status === 'success' ? 'bg-brand-500/20' : 'bg-slate-500/20'} flex items-center justify-center">
        <i class="fas ${status === 'success' ? 'fa-check' : 'fa-xmark'} text-${status === 'success' ? 'brand' : 'slate'}-400 text-xs"></i>
      </div>
      <div>
        <div class="text-xs font-semibold text-slate-200">${client}</div>
        <div class="text-xs text-slate-600">Plan ${plan} · ${date}</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-sm font-black ${status === 'success' ? 'text-brand-400' : 'text-slate-400'}">${amount}</span>
      <span class="text-xs px-2 py-0.5 rounded-full ${status === 'success' ? 'badge-active' : 'badge-inactive'}">${status === 'success' ? 'Réussi' : 'Échoué'}</span>
    </div>
  </div>`
}
