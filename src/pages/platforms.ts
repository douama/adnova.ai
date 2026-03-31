import type { Context } from 'hono'
import { shell } from '../lib/layout'

export const renderPlatforms = (c: Context) => {
  const content = `
  <div class="mb-6">
    <p class="text-slate-400">Connect your ad platforms. AI will manage campaigns, budgets, and creatives automatically.</p>
  </div>

  <!-- Connected Platforms -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
    ${platformCard('Facebook Ads', 'fab fa-facebook', '#1877F2', 'Connected', 'john.doe@acmecorp.com · Acme Corp Ad Account', true, '47', '$42,350', '4.1x', [
      ['Ad Account ID', 'act_1234567890'],
      ['Campaigns', '18 active'],
      ['Daily Budget', '$1,850'],
      ['Pixel Status', 'Active — 2,840 events/day'],
    ])}
    ${platformCard('Google Ads', 'fab fa-google', '#4285F4', 'Connected', 'Customer ID: 123-456-7890', true, '12', '$35,100', '5.2x', [
      ['Account ID', '123-456-7890'],
      ['Campaign Types', 'Search, Shopping, Display'],
      ['Daily Budget', '$1,200'],
      ['Conversion Tracking', 'Active'],
    ])}
    ${platformCard('Instagram Ads', 'fab fa-instagram', '#E1306C', 'Connected', 'via Facebook Business Manager', true, '22', '$25,200', '3.8x', [
      ['Account', 'Linked via Facebook'],
      ['Story Ads', '8 active'],
      ['Reels Ads', '6 active'],
      ['Shopping', 'Enabled'],
    ])}
    ${platformCard('TikTok Ads', 'fab fa-tiktok', '#010101', 'Connected', 'Advertiser ID: 7089234561', true, '8', '$15,400', '4.6x', [
      ['Advertiser ID', '7089234561'],
      ['Spark Ads', 'Enabled'],
      ['Pixel Events', '1,240/day'],
      ['Content Library', '47 videos'],
    ])}
    ${platformCard('Snapchat Ads', 'fab fa-snapchat', '#F7C900', 'Warning', 'Token refresh required', false, '4', '$6,800', '2.1x', [
      ['Business ID', 'snap_acme_001'],
      ['Status', 'Token expired'],
      ['Campaigns', '4 paused'],
      ['AR Lenses', 'Not configured'],
    ])}
  </div>

  <!-- Available Integrations -->
  <div class="glass rounded-2xl p-5">
    <h3 class="font-bold text-white mb-4">Available Integrations</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      ${availablePlatform('Pinterest Ads', 'fab fa-pinterest', '#E60023', 'Coming Soon')}
      ${availablePlatform('Twitter/X Ads', 'fab fa-x-twitter', '#000000', 'Beta')}
      ${availablePlatform('LinkedIn Ads', 'fab fa-linkedin', '#0A66C2', 'Connect')}
      ${availablePlatform('YouTube Ads', 'fab fa-youtube', '#FF0000', 'via Google')}
    </div>
  </div>
  `
  return c.html(shell('Platforms', content, '/platforms'))
}

function platformCard(name: string, icon: string, color: string, status: string, sub: string, connected: boolean, campaigns: string, spend: string, roas: string, details: [string,string][]): string {
  return `<div class="glass rounded-2xl p-5 ${!connected ? 'border border-amber-500/20' : ''}">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style="background:${color}20">
          <i class="${icon} text-2xl" style="color:${color}"></i>
        </div>
        <div>
          <h3 class="font-bold text-white">${name}</h3>
          <p class="text-xs text-slate-500">${sub}</p>
        </div>
      </div>
      <span class="text-xs px-3 py-1.5 rounded-full font-bold ${connected ? 'badge-live' : 'badge-paused'}">${status}</span>
    </div>
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="glass rounded-lg p-2.5 text-center">
        <div class="text-sm font-bold text-white">${campaigns}</div>
        <div class="text-xs text-slate-500">Campaigns</div>
      </div>
      <div class="glass rounded-lg p-2.5 text-center">
        <div class="text-sm font-bold text-emerald-400">${spend}</div>
        <div class="text-xs text-slate-500">Monthly</div>
      </div>
      <div class="glass rounded-lg p-2.5 text-center">
        <div class="text-sm font-bold text-blue-400">${roas}</div>
        <div class="text-xs text-slate-500">ROAS</div>
      </div>
    </div>
    <div class="space-y-1.5 mb-4">
      ${details.map(([k,v]) => `<div class="flex items-center justify-between text-xs py-1 border-b border-white/5">
        <span class="text-slate-500">${k}</span><span class="text-slate-300 font-medium">${v}</span>
      </div>`).join('')}
    </div>
    <div class="flex gap-2">
      ${connected ? `
        <button class="flex-1 glass hover:bg-white/10 text-slate-400 text-xs py-2 rounded-lg transition-all">
          <i class="fas fa-gear mr-1"></i>Configure
        </button>
        <button class="flex-1 glass hover:bg-white/10 text-slate-400 text-xs py-2 rounded-lg transition-all">
          <i class="fas fa-arrows-rotate mr-1"></i>Sync
        </button>
      ` : `
        <button onclick="reconnectPlatform('${name}')" class="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-xs py-2 rounded-lg font-semibold transition-all">
          <i class="fas fa-plug mr-1"></i>Reconnect
        </button>
      `}
    </div>
  </div>`
}

function availablePlatform(name: string, icon: string, color: string, label: string): string {
  return `<button class="glass hover:bg-white/10 rounded-xl p-4 flex items-center gap-3 transition-all text-left">
    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${color}20">
      <i class="${icon} text-xl" style="color:${color}"></i>
    </div>
    <div>
      <div class="text-sm font-semibold text-white">${name}</div>
      <div class="text-xs text-slate-500">${label}</div>
    </div>
  </button>`
}
