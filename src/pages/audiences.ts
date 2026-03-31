
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderAudiences(lang: Lang = 'en'): string {
  const content = `
  <div class="flex items-center justify-between mb-6">
    <p class="text-slate-400">AI-powered audience management. Predictive targeting for maximum conversions.</p>
    <button class="bg-gradient-to-r from-brand-600 to-purple-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2">
      <i class="fas fa-plus"></i> New Audience
    </button>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${audStat('47', 'Total Audiences', 'fa-users', 'brand')}
    ${audStat('12.4M', 'Total Reach', 'fa-globe', 'emerald')}
    ${audStat('84.2%', 'Avg Match Rate', 'fa-bullseye', 'blue')}
    ${audStat('3.2x', 'Lookalike CTR Lift', 'fa-chart-line', 'purple')}
  </div>

  <!-- Audience Types -->
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
    ${audienceCard('Top Converters Lookalike 1%', 'Lookalike', '1.2M', '88%', 'emerald', 'Built from 1,200 highest-LTV customers. Best for conversion campaigns.', ['Facebook','Instagram'], '4.8x ROAS avg')}
    ${audienceCard('Retargeting — Cart Abandon', 'Retargeting', '45,200', '97%', 'blue', 'Users who added to cart in last 30 days. High purchase intent.', ['Facebook','Google'], '7.2x ROAS avg')}
    ${audienceCard('Interest: Fashion Shoppers', 'Interest', '3.4M', '71%', 'purple', 'AI-curated interest cluster for fashion-conscious 18-35 females.', ['Facebook','Instagram','TikTok'], '3.1x ROAS avg')}
    ${audienceCard('Top Converters Lookalike 3%', 'Lookalike', '3.6M', '82%', 'cyan', 'Broader expansion from top converter seed. Good for scale.', ['Facebook','Instagram'], '3.8x ROAS avg')}
    ${audienceCard('Website Visitors 14d', 'Retargeting', '128,400', '95%', 'amber', 'All website visitors last 14 days. Great for brand recall.', ['Facebook','Google'], '5.1x ROAS avg')}
    ${audienceCard('Competitor Audience', 'Intent', '820K', '64%', 'rose', 'Users engaging with competitor brands. High-intent switching opportunity.', ['TikTok','Snapchat'], '2.8x ROAS avg')}
  </div>

  <!-- AI Audience Builder -->
  <div class="glass rounded-2xl p-5">
    <div class="flex items-center gap-2 mb-4">
      <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
        <i class="fas fa-brain text-brand-400 text-sm"></i>
      </div>
      <h3 class="font-bold text-white">AI Audience Insights</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="glass rounded-xl p-4">
        <div class="text-sm font-semibold text-white mb-2">Predicted Best Audience</div>
        <div class="text-xs text-slate-400">For your next campaign, AI recommends targeting <span class="text-brand-400 font-semibold">Fashion Shoppers F18-34 + 1% Lookalike</span> — estimated 4.9x ROAS</div>
      </div>
      <div class="glass rounded-xl p-4">
        <div class="text-sm font-semibold text-white mb-2">Saturation Alert</div>
        <div class="text-xs text-slate-400">Retargeting audience frequency at <span class="text-amber-400 font-semibold">4.2x</span> — AI recommends expanding to 3% lookalike within 48h</div>
      </div>
      <div class="glass rounded-xl p-4">
        <div class="text-sm font-semibold text-white mb-2">New Opportunity</div>
        <div class="text-xs text-slate-400">AI identified <span class="text-emerald-400 font-semibold">2.1M untapped TikTok users</span> matching your best customer profile. Estimated CPA: $8.20</div>
      </div>
    </div>
  </div>
  `
  return shell('Audiences', content, '/audiences', lang)
}

function audStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400"></i>
    </div>
    <div><div class="text-xl font-black text-white">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function audienceCard(name: string, type: string, size: string, matchRate: string, color: string, desc: string, platforms: string[], roas: string): string {
  const platformIcons: Record<string, string> = { Facebook: 'fab fa-facebook', Google: 'fab fa-google', Instagram: 'fab fa-instagram', TikTok: 'fab fa-tiktok', Snapchat: 'fab fa-snapchat' }
  return `<div class="glass rounded-2xl p-5 card-hover cursor-pointer">
    <div class="flex items-start justify-between mb-3">
      <span class="text-xs px-2 py-1 rounded-full bg-${color}-500/20 text-${color}-400 font-semibold">${type}</span>
      <span class="text-xs text-emerald-400 font-bold">${roas}</span>
    </div>
    <h3 class="font-bold text-white text-sm mb-1">${name}</h3>
    <p class="text-xs text-slate-500 mb-3">${desc}</p>
    <div class="flex items-center justify-between mb-3">
      <div><div class="text-lg font-black text-white">${size}</div><div class="text-xs text-slate-500">Audience size</div></div>
      <div class="text-right"><div class="text-lg font-black text-${color}-400">${matchRate}</div><div class="text-xs text-slate-500">Match rate</div></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex gap-1">
        ${platforms.map(p => `<i class="${platformIcons[p] || 'fas fa-ad'} text-slate-500 text-sm"></i>`).join('')}
      </div>
      <button class="text-xs glass hover:bg-white/10 px-3 py-1 rounded-lg text-slate-400 transition-all">Use in Campaign</button>
    </div>
  </div>`
}
