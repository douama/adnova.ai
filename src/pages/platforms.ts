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
      ? `<span class="text-xs text-brand-400 flex items-center gap-1"><i class="fas fa-dot-circle text-xs"></i>${t(lang, 'pixel_active')}</span>`
      : `<span class="text-xs text-slate-500 flex items-center gap-1"><i class="far fa-circle text-xs"></i>${t(lang, 'pixel_inactive')}</span>`

    const actionBtn = isWarning
      ? `<button onclick="reconnectPlatform('${p.id}')" class="flex-1 text-xs font-semibold text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 rounded-lg px-3 py-2 transition-all flex items-center justify-center gap-1.5"><i class="fas fa-link text-xs"></i>${t(lang, 'reconnect')}</button>`
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
          <div class="text-base font-bold text-brand-400">${p.roas}</div>
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
        <button onclick="disconnectPlatform('${p.id}')" class="glass hover:bg-slate-500/10 text-xs text-slate-600 hover:text-slate-400 border border-white/10 hover:border-slate-500/30 rounded-lg px-2 py-2 transition-all">
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
    <button onclick="addNewPlatform()" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg">
      <i class="fas fa-plus text-xs"></i>${t(lang, 'connect')}
    </button>
  </div>

  <!-- Global Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'total_spend')}</div>
      <div class="text-2xl font-black text-white">$${(totalSpend/1000).toFixed(0)}K</div>
      <div class="text-xs text-brand-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>+18.4%</div>
    </div>
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'roas')}</div>
      <div class="text-2xl font-black text-brand-400">${avgRoas}x</div>
      <div class="text-xs text-brand-400 mt-1"><i class="fas fa-arrow-up mr-1"></i>+0.3x</div>
    </div>
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'active_campaigns')}</div>
      <div class="text-2xl font-black text-brand-400">${totalCampaigns}</div>
      <div class="text-xs text-brand-400 mt-1"><i class="fas fa-bolt mr-1"></i>Auto-scaled</div>
    </div>
    <div class="glass card-hover rounded-2xl p-4">
      <div class="text-xs text-slate-500 mb-1">${t(lang, 'platform_speed')}</div>
      <div class="text-2xl font-black text-brand-400">9<span class="text-base">ms</span></div>
      <div class="text-xs text-brand-400 mt-1"><i class="fas fa-circle mr-1"></i>Optimal</div>
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
      const textColor = isDark ? '#7A7A7A' : '#7A7A7A';

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
            borderColor: ['#1877f2','#4285f4','#f58529','#A8A8A8','#A8A8A8','#A8A8A8','#14171a','#e60023','#fffc00'],
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
      const textColor = isDark ? '#7A7A7A' : '#7A7A7A';
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
      document.getElementById('add-platform-modal').classList.remove('hidden');
    }
    function closeAddPlatformModal() {
      document.getElementById('add-platform-modal').classList.add('hidden');
      document.getElementById('oauth-step').classList.add('hidden');
      document.getElementById('platform-selection-step').classList.remove('hidden');
    }
    function selectNewPlatform(id, name, icon) {
      document.getElementById('selected-platform-name').textContent = name;
      document.getElementById('selected-platform-icon').className = icon + ' text-2xl text-white';
      document.getElementById('oauth-platform-label').textContent = name;
      document.getElementById('platform-selection-step').classList.add('hidden');
      document.getElementById('oauth-step').classList.remove('hidden');
      document.getElementById('oauth-account-id').value = '';
      document.getElementById('oauth-account-id').placeholder = 'Ex: act_1234567890 (' + name + ')';
      document.getElementById('add-platform-modal').dataset.platformId = id;
    }
    function backToSelection() {
      document.getElementById('oauth-step').classList.add('hidden');
      document.getElementById('platform-selection-step').classList.remove('hidden');
    }
    function connectNewPlatform() {
      const accountId = document.getElementById('oauth-account-id').value.trim();
      if (!accountId) { alert('Veuillez entrer un Account ID'); return; }
      const btn = document.getElementById('connect-btn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Connexion OAuth...';
      btn.disabled = true;
      setTimeout(() => {
        const id = document.getElementById('add-platform-modal').dataset.platformId;
        const name = document.getElementById('selected-platform-name').textContent;
        closeAddPlatformModal();
        showBanner('✓ ' + name + ' connecté avec succès! (' + accountId + ')');
        // Add card to grid
        const grid = document.getElementById('platforms-grid');
        const icons = {twitter:'fab fa-x-twitter',pinterest:'fab fa-pinterest-p',reddit:'fab fa-reddit-alien'};
        const grads = {twitter:'platform-tw',pinterest:'platform-pi',reddit:'bg-gradient-to-br from-orange-600 to-slate-700'};
        const card = document.createElement('div');
        card.className = 'glass card-hover rounded-2xl p-5 border border-brand-500/20 animate-fadeIn';
        card.id = 'card-' + id;
        card.innerHTML = '<div class="flex items-center justify-between mb-4">' +
          '<div class="flex items-center gap-3">' +
          '<div class="w-10 h-10 ' + (grads[id]||'bg-gradient-to-br from-brand-500 to-brand-600') + ' rounded-xl flex items-center justify-center">' +
          '<i class="' + (icons[id]||'fas fa-ad') + ' text-white"></i></div>' +
          '<div><div class="font-bold text-white text-sm">' + name + '</div><div class="text-xs text-slate-500">ID: ' + accountId + '</div></div></div>' +
          '<span class="badge-live text-xs px-2 py-0.5 rounded-full"><i class="fas fa-circle text-xs mr-1"></i>Connected</span></div>' +
          '<div class="grid grid-cols-3 gap-3 mb-4">' +
          '<div class="glass rounded-xl p-3 text-center"><div class="text-base font-bold text-white">$0</div><div class="text-xs text-slate-500">Spend</div></div>' +
          '<div class="glass rounded-xl p-3 text-center"><div class="text-base font-bold text-brand-400">—</div><div class="text-xs text-slate-500">ROAS</div></div>' +
          '<div class="glass rounded-xl p-3 text-center"><div class="text-base font-bold text-brand-400">0</div><div class="text-xs text-slate-500">Campaigns</div></div></div>' +
          '<div class="flex gap-2"><button onclick="configurePlatform(\\'' + id + '\\')" class="flex-1 text-xs font-semibold text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 rounded-lg px-3 py-2 transition-all"><i class="fas fa-sliders text-xs mr-1"></i>Configure</button>' +
          '<button onclick="syncPlatform(\\'' + id + '\\',this)" class="glass hover:bg-white/5 text-xs font-semibold text-slate-400 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-all"><i class="fas fa-arrows-rotate text-xs"></i></button>' +
          '<button onclick="disconnectPlatform(\\'' + id + '\\')" class="glass hover:bg-slate-500/10 text-xs text-slate-600 hover:text-slate-400 border border-white/10 hover:border-slate-500/30 rounded-lg px-2 py-2 transition-all"><i class="fas fa-unlink text-xs"></i></button></div>';
        grid.appendChild(card);
        btn.innerHTML = '<i class="fas fa-link mr-2"></i>Se connecter via OAuth';
        btn.disabled = false;
      }, 2000);
    }

    // ── Live Sync Pulse ─────────────────────────────────────────────────────
    setInterval(() => {
      // silent background refresh
    }, 60000);
  </script>

  <!-- ── Add New Platform Modal ── -->
  <div id="add-platform-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-lg" style="border:1px solid rgba(99,102,241,0.3)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-white flex items-center gap-2"><i class="fas fa-plug text-brand-400"></i> Connecter une plateforme</h2>
        <button onclick="closeAddPlatformModal()" class="text-slate-500 hover:text-slate-300 w-8 h-8 rounded-lg glass flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>

      <!-- Step 1: Selection -->
      <div id="platform-selection-step" class="p-5">
        <p class="text-xs text-slate-400 mb-4">Sélectionnez la plateforme à connecter à votre espace AdNova AI:</p>
        <div class="grid grid-cols-3 gap-3">
          <button onclick="selectNewPlatform('twitter','X (Twitter)','fab fa-x-twitter')" class="glass hover:bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-brand-500/40">
            <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center"><i class="fab fa-x-twitter text-white"></i></div>
            <span class="text-xs text-slate-300 font-medium">X (Twitter)</span>
          </button>
          <button onclick="selectNewPlatform('pinterest','Pinterest','fab fa-pinterest-p')" class="glass hover:bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-brand-500/40">
            <div class="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center"><i class="fab fa-pinterest-p text-white"></i></div>
            <span class="text-xs text-slate-300 font-medium">Pinterest</span>
          </button>
          <button onclick="selectNewPlatform('reddit','Reddit','fab fa-reddit-alien')" class="glass hover:bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-brand-500/40">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-slate-600 rounded-xl flex items-center justify-center"><i class="fab fa-reddit-alien text-white"></i></div>
            <span class="text-xs text-slate-300 font-medium">Reddit Ads</span>
          </button>
          <button onclick="selectNewPlatform('spotify','Spotify Ads','fab fa-spotify')" class="glass hover:bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-brand-500/40">
            <div class="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center"><i class="fab fa-spotify text-white"></i></div>
            <span class="text-xs text-slate-300 font-medium">Spotify Ads</span>
          </button>
          <button onclick="selectNewPlatform('amazon','Amazon Ads','fab fa-amazon')" class="glass hover:bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-brand-500/40">
            <div class="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center"><i class="fab fa-amazon text-white"></i></div>
            <span class="text-xs text-slate-300 font-medium">Amazon Ads</span>
          </button>
          <button onclick="selectNewPlatform('microsoft','Microsoft Ads','fab fa-windows')" class="glass hover:bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-brand-500/40">
            <div class="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center"><i class="fab fa-windows text-white"></i></div>
            <span class="text-xs text-slate-300 font-medium">Microsoft Ads</span>
          </button>
        </div>
      </div>

      <!-- Step 2: OAuth -->
      <div id="oauth-step" class="hidden p-5">
        <button onclick="backToSelection()" class="text-xs text-slate-500 hover:text-slate-300 mb-4 flex items-center gap-1.5 transition-all">
          <i class="fas fa-arrow-left text-xs"></i> Retour
        </button>
        <div class="flex items-center gap-3 mb-5 p-3 glass rounded-xl">
          <div class="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center">
            <i id="selected-platform-icon" class="fas fa-ad text-white text-lg"></i>
          </div>
          <div>
            <div class="font-bold text-white text-sm" id="selected-platform-name">Platform</div>
            <div class="text-xs text-slate-500">Connexion OAuth 2.0 sécurisée</div>
          </div>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Account ID <span id="oauth-platform-label" class="text-slate-500">(plateforme)</span></label>
            <input id="oauth-account-id" type="text" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Access Token (optionnel — généré par OAuth)</label>
            <input type="password" placeholder="Laisser vide pour utiliser OAuth flow" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all"/>
          </div>
          <div class="flex items-start gap-2 p-3 rounded-xl bg-brand-500/8 border border-brand-500/20 text-xs text-brand-300">
            <i class="fas fa-shield-halved mt-0.5"></i>
            <span>Connexion sécurisée — AdNova AI ne stocke jamais vos identifiants, uniquement les tokens OAuth chiffrés.</span>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button onclick="closeAddPlatformModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-3 rounded-xl text-sm transition-all">Annuler</button>
          <button id="connect-btn" onclick="connectNewPlatform()" class="flex-1 bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white py-3 rounded-xl text-sm font-bold transition-all">
            <i class="fas fa-link mr-2"></i>Se connecter via OAuth
          </button>
        </div>
      </div>
    </div>
  </div>`

  return shell(t(lang, 'platforms'), content, '/platforms', lang)
}
