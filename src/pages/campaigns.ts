import type { Context } from 'hono'
import { shell } from '../lib/layout'

export const renderCampaigns = (c: Context) => {
  const content = `
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div class="flex items-center gap-3">
      <div class="glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
        <i class="fas fa-search text-slate-500 text-xs"></i>
        <input placeholder="Search campaigns..." class="bg-transparent text-slate-300 placeholder-slate-600 outline-none text-sm w-48" id="camp-search" oninput="filterCampaigns()"/>
      </div>
      <select id="camp-platform" class="glass rounded-xl px-4 py-2 text-sm text-slate-400 outline-none border-0 cursor-pointer" onchange="filterCampaigns()">
        <option value="">All Platforms</option>
        <option>Facebook</option><option>Google</option><option>Instagram</option><option>TikTok</option><option>Snapchat</option>
      </select>
      <select id="camp-status" class="glass rounded-xl px-4 py-2 text-sm text-slate-400 outline-none border-0 cursor-pointer" onchange="filterCampaigns()">
        <option value="">All Status</option>
        <option>Scaling</option><option>Live</option><option>Paused</option><option>Draft</option>
      </select>
    </div>
    <div class="flex items-center gap-2">
      <button class="glass hover:bg-white/10 text-slate-400 text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
        <i class="fas fa-download text-xs"></i> Export
      </button>
      <button onclick="openCreateCampaign()" class="bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white text-sm font-bold px-5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg">
        <i class="fas fa-plus text-xs"></i> New Campaign
      </button>
    </div>
  </div>

  <!-- Stats Bar -->
  <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
    ${campStat('47', 'Total', 'fa-bullhorn', 'slate')}
    ${campStat('12', 'Scaling', 'fa-arrow-trend-up', 'brand')}
    ${campStat('28', 'Live', 'fa-play-circle', 'emerald')}
    ${campStat('5', 'Paused', 'fa-pause-circle', 'amber')}
    ${campStat('2', 'Killed', 'fa-stop-circle', 'red')}
  </div>

  <!-- Campaigns Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6" id="campaigns-grid">
    ${campaignCard('Summer Collection 2026', ['Facebook','Instagram'], 'scaling', '$18,420', '$96,805', '5.26', '4.2', 38, 'ROAS 5.26x — scaling in 38h', 47852, 2018)}
    ${campaignCard('Product Launch Q3', ['Google','TikTok'], 'scaling', '$14,200', '$68,160', '4.80', '3.8', 52, 'Strong performance — scaling in 52h', 38291, 1526)}
    ${campaignCard('Brand Awareness Wave', ['Facebook'], 'live', '$9,800', '$41,160', '4.20', '2.9', 16, 'Running within targets — next check 16h', 82314, 2389)}
    ${campaignCard('Retargeting Engine Pro', ['Google'], 'live', '$7,350', '$29,400', '4.00', '6.1', 28, 'High CTR retargeting performing well', 12043, 734)}
    ${campaignCard('Holiday Flash Sale', ['TikTok','Snapchat'], 'live', '$5,200', '$17,680', '3.40', '5.4', 61, 'Good CTR, monitoring ROAS', 28742, 1551)}
    ${campaignCard('New User Acquisition', ['Instagram'], 'paused', '$3,100', '$7,750', '2.50', '1.1', 0, 'ROAS below 3x threshold — AI paused', 14203, 156)}
    ${campaignCard('Q4 Sale Preview', ['Facebook','Google'], 'draft', '$0', '$0', '—', '—', 0, 'Draft — ready to launch', 0, 0)}
    ${campaignCard('Competitor Conquest', ['Google'], 'live', '$4,400', '$15,840', '3.60', '3.2', 44, 'Competitive keywords performing', 9823, 314)}
    ${campaignCard('Influencer Amplify', ['TikTok','Instagram'], 'scaling', '$6,800', '$35,360', '5.20', '8.3', 21, 'UGC-style content scaling fast', 41209, 3421)}
  </div>

  <!-- Create Campaign Modal -->
  <div id="create-campaign-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-plus text-white"></i>
          </div>
          <div>
            <h2 class="font-bold text-white text-lg">Create New Campaign</h2>
            <p class="text-xs text-slate-500">AI will optimize automatically</p>
          </div>
        </div>
        <button onclick="closeCreateCampaign()" class="text-slate-500 hover:text-slate-300 text-xl"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-6 space-y-6">
        <!-- Step indicator -->
        <div class="flex items-center gap-2" id="step-indicator">
          ${step(1, 'Basics', true)}
          <div class="flex-1 h-px bg-white/10"></div>
          ${step(2, 'Platforms', false)}
          <div class="flex-1 h-px bg-white/10"></div>
          ${step(3, 'Budget', false)}
          <div class="flex-1 h-px bg-white/10"></div>
          ${step(4, 'AI Config', false)}
        </div>

        <!-- Step 1: Basics -->
        <div id="step-1">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Campaign Name</label>
              <input type="text" placeholder="e.g., Summer Sale 2026" 
                class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Campaign Objective</label>
                <select class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10">
                  <option>🎯 Conversions</option>
                  <option>🔍 Traffic</option>
                  <option>📣 Brand Awareness</option>
                  <option>🛒 Catalog Sales</option>
                  <option>📲 App Installs</option>
                </select>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Industry</label>
                <select class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10">
                  <option>👗 Fashion / Apparel</option>
                  <option>📱 Tech / SaaS</option>
                  <option>🏋️ Health & Fitness</option>
                  <option>🏠 Real Estate</option>
                  <option>🛍️ E-commerce</option>
                  <option>🎓 Education</option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Target URL / Landing Page</label>
              <div class="relative">
                <i class="fas fa-link absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                <input type="url" placeholder="https://yoursite.com/landing-page"
                  class="w-full glass rounded-xl px-4 py-3 pl-9 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
              </div>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">AI Brief (Optional)</label>
              <textarea placeholder="Describe your product, target customer, key benefits, tone... AI will use this to generate creatives"
                rows="3" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all resize-none"></textarea>
            </div>
          </div>
        </div>

        <!-- Platform Selector -->
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-3 block">Select Platforms</label>
          <div class="grid grid-cols-5 gap-3">
            ${platformSelector('Facebook', 'fab fa-facebook', '#1877F2', true)}
            ${platformSelector('Instagram', 'fab fa-instagram', '#E1306C', true)}
            ${platformSelector('TikTok', 'fab fa-tiktok', '#010101', false)}
            ${platformSelector('Snapchat', 'fab fa-snapchat', '#F7C900', false)}
            ${platformSelector('Google', 'fab fa-google', '#4285F4', true)}
          </div>
        </div>

        <!-- Budget & Schedule -->
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-3 block">Budget & Schedule</label>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Daily Budget</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input type="number" value="500" class="w-full glass rounded-xl px-4 py-3 pl-8 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
              </div>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Lifetime Budget</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input type="number" value="15000" class="w-full glass rounded-xl px-4 py-3 pl-8 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
              </div>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Start Date</label>
              <input type="date" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">End Date</label>
              <input type="date" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
            </div>
          </div>
        </div>

        <!-- AI Settings -->
        <div class="glass rounded-xl p-5">
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-brain text-brand-400"></i>
            <span class="font-semibold text-white text-sm">AI Automation Settings</span>
          </div>
          <div class="space-y-3">
            ${aiToggle('Auto-generate creatives', 'AI creates images and videos using your brief', true)}
            ${aiToggle('Auto A/B testing', 'AI tests multiple creative variants simultaneously', true)}
            ${aiToggle('Auto kill weak ads', 'Pause creatives with CTR below threshold', true)}
            ${aiToggle('Auto-scale winners', 'Increase budget +10% every 72h for winning campaigns', true)}
            ${aiToggle('Auto audience expansion', 'AI automatically expands to lookalike audiences', false)}
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Kill CTR Threshold</label>
              <select class="w-full glass rounded-xl px-3 py-2 text-xs text-slate-300 outline-none border border-white/10">
                <option>0.5% CTR</option><option selected>0.8% CTR</option><option>1.0% CTR</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Scale ROAS Target</label>
              <select class="w-full glass rounded-xl px-3 py-2 text-xs text-slate-300 outline-none border border-white/10">
                <option>3.0x ROAS</option><option selected>3.5x ROAS</option><option>4.0x ROAS</option><option>5.0x ROAS</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button onclick="closeCreateCampaign()" class="glass hover:bg-white/10 text-slate-400 px-6 py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
          <button onclick="createCampaign()" class="bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold px-8 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all">
            <i class="fas fa-rocket"></i> Launch Campaign
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    function openCreateCampaign() { document.getElementById('create-campaign-modal').classList.remove('hidden'); }
    function closeCreateCampaign() { document.getElementById('create-campaign-modal').classList.add('hidden'); }
    function createCampaign() {
      const btn = event.target.closest('button');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Launching...';
      btn.disabled = true;
      setTimeout(() => {
        closeCreateCampaign();
        showToast('🚀 Campaign created! AI is generating creatives...', 'success');
        btn.innerHTML = '<i class="fas fa-rocket"></i> Launch Campaign';
        btn.disabled = false;
      }, 2000);
    }
    function showToast(msg, type) {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-6 right-6 glass px-5 py-3 rounded-xl text-sm font-medium text-white z-50 animate-fadeIn border border-emerald-500/30';
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }
    function filterCampaigns() {
      // Demo filter visual
    }
    function togglePlatform(el) {
      el.classList.toggle('ring-2');
      el.classList.toggle('ring-brand-500');
    }
  </script>
  `
  return c.html(shell('Campaigns', content, '/campaigns'))
}

function campStat(value: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-3 flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400 text-xs"></i>
    </div>
    <div>
      <div class="text-xl font-black text-white">${value}</div>
      <div class="text-xs text-slate-500">${label}</div>
    </div>
  </div>`
}

function campaignCard(name: string, platforms: string[], status: string, spend: string, revenue: string, roas: string, ctr: string, scaleIn: number, aiNote: string, impressions: number, clicks: number): string {
  const statusClass = status === 'scaling' ? 'badge-scaling' : status === 'live' ? 'badge-live' : status === 'paused' ? 'badge-paused' : status === 'draft' ? 'badge-draft' : 'badge-killed'
  const platformIcons: Record<string, string> = { Facebook: 'fab fa-facebook', Google: 'fab fa-google', Instagram: 'fab fa-instagram', TikTok: 'fab fa-tiktok', Snapchat: 'fab fa-snapchat' }
  const platformColors: Record<string, string> = { Facebook: '#1877F2', Google: '#4285F4', Instagram: '#E1306C', TikTok: '#ff0050', Snapchat: '#F7C900' }
  const roasNum = parseFloat(roas)
  const roasColor = roasNum >= 4.5 ? 'emerald' : roasNum >= 3.5 ? 'blue' : roas === '—' ? 'slate' : 'amber'

  return `<div class="glass rounded-2xl p-5 card-hover cursor-pointer" onclick="openCampaignDetail('${name}')">
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1 min-w-0 pr-2">
        <h3 class="font-bold text-white text-sm leading-tight">${name}</h3>
        <div class="flex items-center gap-1.5 mt-1.5">
          ${platforms.map(p => `<span class="text-xs px-2 py-0.5 rounded-full" style="background:${platformColors[p]}30;color:${platformColors[p]}">
            <i class="${platformIcons[p]} mr-1"></i>${p}
          </span>`).join('')}
        </div>
      </div>
      <span class="${statusClass} text-xs px-2 py-1 rounded-full font-semibold capitalize flex-shrink-0">${status}</span>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-3">
      <div class="glass rounded-lg p-2.5">
        <div class="text-xs text-slate-500">Spend</div>
        <div class="text-sm font-bold text-white">${spend}</div>
      </div>
      <div class="glass rounded-lg p-2.5">
        <div class="text-xs text-slate-500">Revenue</div>
        <div class="text-sm font-bold text-emerald-400">${revenue}</div>
      </div>
      <div class="glass rounded-lg p-2.5">
        <div class="text-xs text-slate-500">ROAS</div>
        <div class="text-sm font-bold text-${roasColor}-400">${roas}${roas !== '—' ? 'x' : ''}</div>
      </div>
      <div class="glass rounded-lg p-2.5">
        <div class="text-xs text-slate-500">CTR</div>
        <div class="text-sm font-bold text-slate-200">${ctr}${ctr !== '—' ? '%' : ''}</div>
      </div>
    </div>

    ${impressions > 0 ? `<div class="flex items-center justify-between text-xs text-slate-600 mb-3">
      <span>${impressions.toLocaleString()} impressions</span>
      <span>${clicks.toLocaleString()} clicks</span>
    </div>` : ''}

    <div class="glass rounded-lg p-2.5 flex items-start gap-2">
      <i class="fas fa-brain text-brand-400 text-xs mt-0.5 flex-shrink-0"></i>
      <p class="text-xs text-slate-400 leading-relaxed">${aiNote}</p>
    </div>

    ${status === 'scaling' ? `<div class="mt-3">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-slate-500">Scale timer</span>
        <span class="text-xs text-brand-400 font-semibold">in ${scaleIn}h</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill bg-gradient-to-r from-brand-500 to-purple-500" style="width:${Math.max(10,100 - (scaleIn/72*100))}%"></div>
      </div>
    </div>` : ''}
  </div>`
}

function platformSelector(name: string, icon: string, color: string, selected: boolean): string {
  return `<button onclick="this.classList.toggle('ring-2'); this.classList.toggle('ring-brand-500')" 
    class="glass rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-white/10 transition-all ${selected ? 'ring-2 ring-brand-500' : ''}">
    <i class="${icon} text-xl" style="color:${color}"></i>
    <span class="text-xs text-slate-400">${name}</span>
  </button>`
}

function step(num: number, label: string, active: boolean): string {
  return `<div class="flex items-center gap-2">
    <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${active ? 'bg-brand-600 text-white' : 'bg-white/10 text-slate-500'}">${num}</div>
    <span class="text-xs ${active ? 'text-brand-400' : 'text-slate-500'}">${label}</span>
  </div>`
}

function aiToggle(label: string, desc: string, checked: boolean): string {
  return `<div class="flex items-center justify-between py-2 border-b border-white/5">
    <div>
      <div class="text-sm font-medium text-slate-300">${label}</div>
      <div class="text-xs text-slate-600">${desc}</div>
    </div>
    <button onclick="this.classList.toggle('bg-brand-600'); this.classList.toggle('bg-white/10'); this.querySelector('div').classList.toggle('translate-x-4')" 
      class="w-10 h-6 rounded-full ${checked ? 'bg-brand-600' : 'bg-white/10'} relative transition-all flex-shrink-0">
      <div class="w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${checked ? 'translate-x-4' : ''}"></div>
    </button>
  </div>`
}
