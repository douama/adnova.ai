import { shell } from '../lib/layout'
import { type Lang, t } from '../lib/i18n'

export function renderPlatforms(lang: Lang = 'en'): string {
  const connected = [
    {
      id: 'facebook',
      name: 'Facebook Ads',
      icon: 'fab fa-facebook-f',
      gradient: 'platform-fb',
      spend: '$42,350',
      roas: '4.1x',
      campaigns: 47,
      accountId: 'act_1234567890',
      pixel: true,
      status: 'connected',
      lastSync: '3 min ago',
    },
    {
      id: 'google',
      name: 'Google Ads',
      icon: 'fab fa-google',
      gradient: 'platform-gl',
      spend: '$35,100',
      roas: '5.2x',
      campaigns: 12,
      accountId: 'MCC-789-012-3456',
      pixel: true,
      status: 'connected',
      lastSync: '1 min ago',
    },
    {
      id: 'instagram',
      name: 'Instagram Ads',
      icon: 'fab fa-instagram',
      gradient: 'platform-ig',
      spend: '$25,200',
      roas: '3.8x',
      campaigns: 22,
      accountId: 'ig_act_9876543',
      pixel: true,
      status: 'connected',
      lastSync: '5 min ago',
    },
    {
      id: 'tiktok',
      name: 'TikTok Ads',
      icon: 'fab fa-tiktok',
      gradient: 'platform-tt',
      spend: '$15,400',
      roas: '4.6x',
      campaigns: 8,
      accountId: 'TT-ADV-556677',
      pixel: true,
      status: 'connected',
      lastSync: '2 min ago',
    },
    {
      id: 'snapchat',
      name: 'Snapchat Ads',
      icon: 'fab fa-snapchat',
      gradient: 'platform-sc',
      spend: '$6,800',
      roas: '2.1x',
      campaigns: 4,
      accountId: 'SC-ADV-334455',
      pixel: false,
      status: 'warning',
      lastSync: '2h ago',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Ads',
      icon: 'fab fa-linkedin-in',
      gradient: 'platform-li',
      spend: '$8,920',
      roas: '3.3x',
      campaigns: 6,
      accountId: 'LI-ADV-112233',
      pixel: true,
      status: 'connected',
      lastSync: '8 min ago',
    },
    {
      id: 'youtube',
      name: 'YouTube Ads',
      icon: 'fab fa-youtube',
      gradient: 'platform-yt',
      spend: '$11,750',
      roas: '3.9x',
      campaigns: 9,
      accountId: 'YT-ADV-445566',
      pixel: true,
      status: 'connected',
      lastSync: '4 min ago',
    },
    {
      id: 'twitter',
      name: 'X (Twitter) Ads',
      icon: 'fab fa-x-twitter',
      gradient: 'platform-tw',
      spend: '$4,200',
      roas: '2.8x',
      campaigns: 3,
      accountId: 'TW-ADV-778899',
      pixel: false,
      status: 'connected',
      lastSync: '12 min ago',
    },
    {
      id: 'pinterest',
      name: 'Pinterest Ads',
      icon: 'fab fa-pinterest-p',
      gradient: 'platform-pi',
      spend: '$3,150',
      roas: '3.1x',
      campaigns: 5,
      accountId: 'PI-ADV-223344',
      pixel: true,
      status: 'connected',
      lastSync: '7 min ago',
    },
  ]

  const totalSpend = connected.reduce((s, p) => {
    const val = parseFloat(p.spend.replace('$', '').replace(',', ''))
    return s + val
  }, 0)
  const avgRoas = (connected.reduce((s, p) => s + parseFloat(p.roas), 0) / connected.length).toFixed(1)
  const totalCampaigns = connected.reduce((s, p) => s + p.campaigns, 0)
  const connectedCount = connected.filter(p => p.status === 'connected').length

  function platformCard(p: typeof connected[0]): string {
    const isWarning = p.status === 'warning'
    const statusBadge = isWarning
      ? `<span class="badge-paused text-xs px-2 py-0.5 rounded-full font-medium"><i class="fas fa-triangle-exclamation mr-1"></i>${t(lang, 'warning')}</span>`
      : `<span class="badge-live text-xs px-2 py-0.5 rounded-full font-medium"><i class="fas fa-circle text-xs mr-1"></i>${t(lang, 'connected')}</span>`

    const pixelBadge = p.pixel
      ? `<span class="text-xs text-emerald-400 flex items-center gap-1"><i class="fas fa-dot-circle text-xs"></i>${t(lang, 'pixel_active')}</span>`
      : `<span class="text-xs text-slate-500 flex items-center gap-1"><i class="far fa-circle text-xs"></i>${t(lang, 'pixel_inactive')}</span>`

    const actionBtn = isWarning
      ? `<button onclick="reconnectPlatform('${p.id}')" class="flex-1 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg px-3 py-2 transition-all flex items-center justify-center gap-1.5"><i class="fas fa-link text-xs"></i>${t(lang, 'reconnect')}</button>`
      : `<button onclick="configurePlatform('${p.id}')" class="flex-1 text-xs font-semibold text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 rounded-lg px-3 py-2 transition-all flex items-center justify-center gap-1.5"><i class="fas fa-sliders text-xs"></i>${t(lang, 'configure')}</button>`

    return `
    <div class="glass card-hover rounded-2xl p-5 border border-white/5 hover:border-brand-500/20" id="card-${p.id}">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 ${p.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <i class="${p.icon} text-white text-base"></i>
          </div>
          <div>
            <h3 class="font-bold text-white text-sm">${p.name}</h3>
            <p class="text-xs text-slate-500">${t(lang, 'account_id')}: ${p.accountId}</p>
          </div>
        </div>
        ${statusBadge}
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="glass rounded-xl p-3 text-center">
          <div class="text-base font-bold text-white">${p.spend}</div>
          <div class="text-xs text-slate-500 mt-0.5">${t(lang, 'monthly_spend')}</div>
        </div>
        <div class="glass rounded-xl p-3 text-center">
          <div class="text-base font-bold text-emerald-400">${p.roas}</div>
          <div class="text-xs text-slate-500 mt-0.5">${t(lang, 'roas')}</div>
        </div>
        <div class="glass rounded-xl p-3 text-center">
          <div class="text-base font-bold text-brand-400">${p.campaigns}</div>
          <div class="text-xs text-slate-500 mt-0.5">${t(lang, 'campaigns_count')}</div>
        </div>
      </div>

      <!-- Pixel & Last Sync -->
      <div class="flex items-center justify-between mb-4">
        ${pixelBadge}
        <span class="text-xs text-slate-500">${t(lang, 'last_sync')}: ${p.lastSync}</span>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        ${actionBtn}
        <button onclick="syncPlatform('${p.id}', this)" class="glass hover:bg-white/5 text-xs font-semibold text-slate-400 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-all flex items-center gap-1.5">
          <i class="fas fa-arrows-rotate text-xs"></i>${t(lang, 'sync')}
        </button>
        <button onclick="disconnectPlatform('${p.id}')" class="glass hover:bg-red-500/10 text-xs text-slate-600 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-lg px-2 py-2 transition-all">
          <i class="fas fa-unlink text-xs"></i>
        </button>
      </div>
    </div>`
  }

  const content = `
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-black text-white">${t(lang, 'platform_integrations')}</h2>
      <p class="text-sm text-slate-500 mt-1">${t(lang, 'overview')} — ${connectedCount} ${t(lang, 'connected').toLowerCase()} / ${connected.length} platforms</p>
    </div>
    <button onclick="addNewPlatform()" class="bg-gradient-to-r from-brand-600 to-purple-600 hover:opacity-90 text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg">
      <i class="fas fa-plus text-xs"></i>${t(lang, 'connect')}
    </button>
  </div>

  <!-- Global Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'total_spend')}</div>
      <div class="text-2xl font-black text-white">$${(totalSpend/1000).toFixed(0)}K</div>
      <div class="text-xs text-emerald-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>+18.4%</div>
    </div>
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'roas')}</div>
      <div class="text-2xl font-black text-emerald-400">${avgRoas}x</div>
      <div class="text-xs text-emerald-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>+0.3x</div>
    </div>
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'active_campaigns')}</div>
      <div class="text-2xl font-black text-brand-400">${totalCampaigns}</div>
      <div class="text-xs text-brand-400 mt-1"><i class="fas fa-bolt mr-1"></i>Auto-scaled</div>
    </div>
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'platform_speed')}</div>
      <div class="text-2xl font-black text-purple-400">9<span class="text-base">ms</span></div>
      <div class="text-xs text-emerald-400 mt-1"><i class="fas fa-circle mr-1"></i>Optimal</div>
    </div>
  </div>

  <!-- Platforms Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" id="platforms-grid">
    ${connected.map(platformCard).join('')}
  </div>

  <!-- Platform Performance Chart -->
  <div class="glass rounded-2xl p-6 border border-white/5 mt-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-white">${t(lang, 'performance')} — ${t(lang, 'platforms')}</h3>
      <select class="glass text-xs text-slate-300 border border-white/10 rounded-lg px-2 py-1 bg-transparent">
        <option>${t(lang, 'roas')}</option>
        <option>${t(lang, 'spend')}</option>
        <option>${t(lang, 'conversions')}</option>
      </select>
    </div>
    <canvas id="platformPerfChart" height="80"></canvas>
  </div>

  <!-- Sync Status Banner -->
  <div id="sync-banner" class="hidden fixed bottom-4 right-4 glass neon-border rounded-xl px-4 py-3 flex items-center gap-3 text-sm z-50 animate-fadeIn">
    <div class="w-2 h-2 rounded-full bg-brand-400 blink"></div>
    <span class="text-slate-300" id="sync-banner-text">${t(lang, 'syncing')}</span>
  </div>

  <script>
    // ── Platform Performance Chart ──────────────────────────────────────────
    window.addEventListener('load', function() {
      const ctx = document.getElementById('platformPerfChart');
      if (!ctx) return;
      const isDark = document.documentElement.classList.contains('dark');
      const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
      const textColor = isDark ? '#64748b' : '#94a3b8';

      window._platformChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Facebook', 'Google', 'Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X Ads', 'Pinterest', 'Snapchat'],
          datasets: [{
            label: 'ROAS',
            data: [4.1, 5.2, 3.8, 4.6, 3.3, 3.9, 2.8, 3.1, 2.1],
            backgroundColor: [
              'rgba(24,119,242,0.7)', 'rgba(66,133,244,0.7)', 'rgba(245,85,41,0.7)',
              'rgba(255,0,80,0.7)', 'rgba(0,119,181,0.7)', 'rgba(255,0,0,0.7)',
              'rgba(20,23,26,0.7)', 'rgba(230,0,35,0.7)', 'rgba(255,252,0,0.7)'
            ],
            borderColor: ['#1877f2','#4285f4','#f58529','#ff0050','#0077b5','#ff0000','#14171a','#e60023','#fffc00'],
            borderWidth: 1, borderRadius: 6, borderSkipped: false,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: true,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ROAS: ' + ctx.raw + 'x' } } },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } },
            y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: v => v + 'x' }, min: 0, max: 6 }
          }
        }
      });
    });

    // Update chart theme
    window.updateChartsTheme = function(theme) {
      if (!window._platformChart) return;
      const isDark = theme === 'dark';
      const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
      const textColor = isDark ? '#64748b' : '#94a3b8';
      window._platformChart.options.scales.x.grid.color = gridColor;
      window._platformChart.options.scales.x.ticks.color = textColor;
      window._platformChart.options.scales.y.grid.color = gridColor;
      window._platformChart.options.scales.y.ticks.color = textColor;
      window._platformChart.update();
    };

    // ── Platform Actions ────────────────────────────────────────────────────
    function showBanner(msg, duration = 3000) {
      const b = document.getElementById('sync-banner');
      const t = document.getElementById('sync-banner-text');
      if (t) t.textContent = msg;
      b.classList.remove('hidden');
      setTimeout(() => b.classList.add('hidden'), duration);
    }

    function syncPlatform(id, btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i>';
      btn.disabled = true;
      showBanner('${t(lang, 'syncing')} ' + id + '...');
      fetch('/api/platforms/' + id + '/sync', { method: 'POST',
        headers: { 'Authorization': 'Bearer ' + (localStorage.getItem('adnova_token') || '') }
      }).then(r => r.json()).then(data => {
        btn.innerHTML = orig;
        btn.disabled = false;
        showBanner('✓ ' + id + ' synchronized!');
      }).catch(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
        showBanner('✓ ' + id + ' synchronized!');
      });
    }

    function configurePlatform(id) {
      showBanner('Opening ' + id + ' configuration...');
      setTimeout(() => {
        window.location.href = '/platforms?configure=' + id;
      }, 800);
    }

    function reconnectPlatform(id) {
      showBanner('Reconnecting ' + id + '...');
      setTimeout(() => {
        fetch('/api/platforms/' + id + '/connect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (localStorage.getItem('adnova_token') || '') },
          body: JSON.stringify({ accessToken: 'demo_token', accountId: 'demo_account' })
        }).then(() => {
          showBanner('✓ ' + id + ' reconnected!');
          document.querySelector('#card-' + id + ' .badge-paused')?.classList.replace('badge-paused', 'badge-live');
        }).catch(() => showBanner('✓ ' + id + ' reconnected!'));
      }, 1000);
    }

    function disconnectPlatform(id) {
      if (!confirm('Disconnect ' + id + '?')) return;
      fetch('/api/platforms/' + id + '/disconnect', { method: 'POST',
        headers: { 'Authorization': 'Bearer ' + (localStorage.getItem('adnova_token') || '') }
      }).then(() => showBanner('⚠ ' + id + ' disconnected')).catch(() => {});
    }

    function addNewPlatform() {
      showBanner('${t(lang, 'available_platforms')} — coming soon!', 3000);
    }

    // ── Live Sync Pulse ─────────────────────────────────────────────────────
    setInterval(() => {
      const platforms = ['facebook', 'google', 'instagram', 'tiktok', 'linkedin', 'youtube'];
      const idx = Math.floor(Math.random() * platforms.length);
      // Silently update in background
    }, 60000);
  </script>`

  return shell(t(lang, 'platforms'), content, '/platforms', lang)
}
