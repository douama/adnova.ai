import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminPlans = (c: Context) => {
  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-black text-white">Plans & Tarification</h2>
      <p class="text-xs text-slate-500 mt-0.5">Gérez les plans d'abonnement et leurs limites</p>
    </div>
    <button class="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg">
      <i class="fas fa-plus mr-1.5"></i> Nouveau Plan
    </button>
  </div>

  <!-- Plans Cards -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    ${planCard('Starter', 299, 1240, 370760, '#6366f1',
      ['10 campagnes actives', '50 créatifs générés/mois', '2 plateformes (FB + Google)', '2 utilisateurs', '$10K ad spend max', 'Optimisation IA de base', 'Analytics standard', 'Support email'],
      '37.1%', '94.2%'
    )}
    ${planCard('Growth', 799, 892, 713108, '#f97316',
      ['50 campagnes actives', '500 créatifs générés/mois', '5 plateformes (toutes)', '10 utilisateurs', '$100K ad spend max', 'IA complète + UGC vidéo', 'A/B testing', 'Lookalike audiences', 'Analytics avancé', 'Support prioritaire'],
      '37.0%', '96.8%'
    )}
    ${planCard('Enterprise', 0, 280, 3360000, '#10b981',
      ['Campagnes illimitées', 'Créatifs illimités', 'Toutes plateformes', 'Utilisateurs illimités', 'Ad spend illimité', 'Modèles IA custom', 'CSM dédié', 'SLA 99.9%', 'White-label', 'API privée'],
      '26.0%', '99.1%'
    )}
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
  `
  return c.html(adminShell('Plans & Tarification', content, '/admin/plans'))
}

function planCard(name: string, price: number, clients: number, mrr: number, color: string, features: string[], growth: string, retention: string): string {
  const priceStr = price > 0 ? `$${price}<span class="text-sm font-normal text-slate-500">/mois</span>` : `<span class="text-lg">Sur devis</span>`
  return `<div class="glass rounded-2xl p-6 card-hover relative overflow-hidden">
    <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10" style="background:${color}"></div>
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="text-xl font-black text-white">${name}</div>
        <div class="text-2xl font-black mt-1" style="color:${color}">${priceStr}</div>
      </div>
      <button class="text-xs border px-3 py-1.5 rounded-lg hover:opacity-80 transition-all" style="color:${color};border-color:${color}40">
        <i class="fas fa-edit mr-1"></i> Modifier
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
    <ul class="space-y-1.5 mb-4">
      ${features.slice(0, 5).map(f => `<li class="flex items-center gap-2 text-xs text-slate-400">
        <i class="fas fa-check text-xs" style="color:${color}"></i> ${f}
      </li>`).join('')}
      ${features.length > 5 ? `<li class="text-xs text-slate-600">+ ${features.length - 5} autres fonctionnalités...</li>` : ''}
    </ul>
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
