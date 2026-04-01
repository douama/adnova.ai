import type { Context } from 'hono'

export const renderOnboarding = (c: Context) => {
  return c.html(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Setup Your Workspace — AdNova AI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    body { background:#040812; font-family:'Inter',sans-serif; }
    .glass { background:rgba(255,255,255,0.04); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.08); }
    .input-field { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#e2e8f0; transition:all 0.2s; width:100%; }
    .input-field:focus { outline:none; border-color:#6366f1; background:rgba(99,102,241,0.06); box-shadow:0 0 0 3px rgba(99,102,241,0.12); }
    .input-field::placeholder { color:#475569; }
    .step-dot { width:8px; height:8px; border-radius:50%; transition:all 0.4s; }
    .platform-card { cursor:pointer; transition:all 0.2s; border:2px solid rgba(255,255,255,0.06); }
    .platform-card.selected { border-color:#6366f1; background:rgba(99,102,241,0.12); }
    .platform-card:hover { border-color:rgba(99,102,241,0.4); background:rgba(99,102,241,0.06); }
    .progress-track { height:3px; background:rgba(255,255,255,0.07); border-radius:2px; overflow:hidden; }
    .progress-fill-ob { height:100%; background:linear-gradient(90deg,#6366f1,#8b5cf6); border-radius:2px; transition:width 0.5s ease; }
    @keyframes fadeSlideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    .fade-in { animation:fadeSlideIn 0.4s ease forwards; }
    @keyframes spin { to{transform:rotate(360deg)} }
    .spin { animation:spin 1s linear infinite; }
    @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.15)} 50%{box-shadow:0 0 40px rgba(99,102,241,0.35)} }
    .pulse-glow { animation:pulse-glow 2.5s ease infinite; }
    .oauth-connecting { animation:pulse-glow 1.5s ease infinite; }
    .grid-bg { background-image:linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px); background-size:50px 50px; }
  </style>
</head>
<body class="text-slate-200 min-h-screen grid-bg">

  <!-- Top progress bar -->
  <div class="fixed top-0 left-0 right-0 z-50 h-1 progress-track">
    <div class="progress-fill-ob" id="top-progress" style="width:20%"></div>
  </div>

  <!-- Header -->
  <header class="flex items-center justify-between px-6 py-4 border-b border-white/5">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center pulse-glow">
        <i class="fas fa-bolt text-white text-sm"></i>
      </div>
      <span class="font-black text-white">AdNova AI</span>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2" id="steps-dots">
        <div class="step-dot bg-brand-500" id="dot-0"></div>
        <div class="w-8 h-px bg-white/10"></div>
        <div class="step-dot bg-white/20" id="dot-1"></div>
        <div class="w-8 h-px bg-white/10"></div>
        <div class="step-dot bg-white/20" id="dot-2"></div>
        <div class="w-8 h-px bg-white/10"></div>
        <div class="step-dot bg-white/20" id="dot-3"></div>
        <div class="w-8 h-px bg-white/10"></div>
        <div class="step-dot bg-white/20" id="dot-4"></div>
      </div>
      <span class="text-xs text-slate-500 ml-2">Step <span id="step-label">1</span>/5</span>
    </div>
    <button onclick="skipOnboarding()" class="text-xs text-slate-600 hover:text-slate-400 transition-colors">Skip setup →</button>
  </header>

  <main class="max-w-2xl mx-auto px-4 py-10">

    <!-- ═══ STEP 1 — Workspace ═══════════════════════════════════════════════ -->
    <div id="step-1" class="fade-in">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-2xl pulse-glow">
          <i class="fas fa-building text-white text-2xl"></i>
        </div>
        <h1 class="text-3xl font-black text-white mb-2">Set up your workspace</h1>
        <p class="text-slate-400">Tell us about your business so we can tailor the AI to your goals.</p>
      </div>
      <div class="glass rounded-2xl p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Company Name *</label>
            <input type="text" id="ws-company" placeholder="Acme Corp" class="input-field rounded-xl px-4 py-3 text-sm" required/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Industry *</label>
            <select id="ws-industry" class="input-field rounded-xl px-4 py-3 text-sm">
              <option value="">Select industry...</option>
              <option>E-commerce / Retail</option>
              <option>Fashion / Apparel</option>
              <option>Tech / SaaS</option>
              <option>Health & Wellness</option>
              <option>Food & Beverage</option>
              <option>Finance / Fintech</option>
              <option>Travel & Hospitality</option>
              <option>Education</option>
              <option>Advertising Agency</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Website URL</label>
            <input type="url" id="ws-url" placeholder="https://yoursite.com" class="input-field rounded-xl px-4 py-3 text-sm"/>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Monthly Ad Budget</label>
            <select id="ws-budget" class="input-field rounded-xl px-4 py-3 text-sm">
              <option>Under $5,000</option>
              <option>$5K – $20K</option>
              <option selected>$20K – $100K</option>
              <option>$100K – $500K</option>
              <option>$500K+</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Primary Goal</label>
            <select id="ws-goal" class="input-field rounded-xl px-4 py-3 text-sm">
              <option>Maximize ROAS</option>
              <option>Scale revenue</option>
              <option>Reduce CPA</option>
              <option>Brand awareness</option>
              <option>Lead generation</option>
            </select>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Timezone</label>
          <select id="ws-tz" class="input-field rounded-xl px-4 py-3 text-sm">
            <option>UTC</option>
            <option>America/New_York (EST)</option>
            <option>America/Los_Angeles (PST)</option>
            <option selected>Europe/Paris (CET)</option>
            <option>Europe/London (GMT)</option>
            <option>Asia/Tokyo (JST)</option>
            <option>Asia/Singapore (SGT)</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button onclick="goStep(2)" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
          Continue <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- ═══ STEP 2 — Connect Platforms ═══════════════════════════════════════ -->
    <div id="step-2" class="hidden">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <i class="fas fa-plug text-white text-2xl"></i>
        </div>
        <h1 class="text-3xl font-black text-white mb-2">Connect your ad platforms</h1>
        <p class="text-slate-400">AdNova AI will sync your campaigns and start optimizing within minutes.</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6" id="platforms-grid">
        ${platformCard('facebook', 'fab fa-facebook-f', '#1877F2', 'Facebook Ads', 'Campaigns, Audiences, Pixels')}
        ${platformCard('google', 'fab fa-google', '#4285F4', 'Google Ads', 'Search, Display, Shopping')}
        ${platformCard('instagram', 'fab fa-instagram', '#E1306C', 'Instagram Ads', 'Stories, Reels, Feed')}
        ${platformCard('tiktok', 'fab fa-tiktok', '#010101', 'TikTok Ads', 'In-Feed, TopView, Spark')}
        ${platformCard('linkedin', 'fab fa-linkedin-in', '#0077b5', 'LinkedIn Ads', 'B2B, Lead Gen, Sponsored')}
        ${platformCard('youtube', 'fab fa-youtube', '#ff0000', 'YouTube Ads', 'Video, Bumper, TrueView')}
        ${platformCard('snapchat', 'fab fa-snapchat', '#FFFC00', 'Snapchat Ads', 'Stories, AR, Collection')}
        ${platformCard('pinterest', 'fab fa-pinterest-p', '#e60023', 'Pinterest Ads', 'Shopping, Video, Idea')}
        ${platformCard('twitter', 'fab fa-x-twitter', '#14171a', 'X (Twitter) Ads', 'Promoted, Trend Takeover')}
      </div>
      <div id="connect-status" class="glass rounded-xl p-3 mb-4 hidden flex items-center gap-2 text-xs text-slate-300">
        <i class="fas fa-circle-check text-emerald-400"></i>
        <span id="connect-status-text">Connected!</span>
      </div>
      <p class="text-xs text-slate-600 text-center mb-6">You can always connect more platforms later in Settings.</p>
      <div class="flex justify-between items-center mt-2">
        <button onclick="goStep(1)" class="glass hover:bg-white/10 text-slate-400 px-6 py-2.5 rounded-xl text-sm transition-all">← Back</button>
        <button onclick="goStep(3)" id="platforms-next" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
          Continue <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- ═══ STEP 3 — AI Configuration ════════════════════════════════════════ -->
    <div id="step-3" class="hidden">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <i class="fas fa-brain text-white text-2xl"></i>
        </div>
        <h1 class="text-3xl font-black text-white mb-2">Configure the AI</h1>
        <p class="text-slate-400">Set your performance targets. The AI will optimize to hit these goals 24/7.</p>
      </div>
      <div class="glass rounded-2xl p-6 space-y-5">
        <!-- Target ROAS -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-semibold text-white">Target ROAS</label>
            <span class="text-brand-400 font-black text-lg" id="roas-display">3.5x</span>
          </div>
          <input type="range" min="1" max="10" step="0.5" value="3.5" id="roas-slider"
            oninput="document.getElementById('roas-display').textContent = parseFloat(this.value).toFixed(1) + 'x'"
            class="w-full accent-brand-500 h-2"/>
          <div class="flex justify-between text-xs text-slate-600 mt-1"><span>1.0x</span><span>5.0x</span><span>10x</span></div>
        </div>
        <!-- Max daily budget -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-semibold text-white">Max Daily Budget per Campaign</label>
            <span class="text-emerald-400 font-black text-lg" id="budget-display">$5,000</span>
          </div>
          <input type="range" min="100" max="50000" step="100" value="5000" id="budget-slider"
            oninput="document.getElementById('budget-display').textContent = '$' + parseInt(this.value).toLocaleString()"
            class="w-full accent-emerald-500 h-2"/>
          <div class="flex justify-between text-xs text-slate-600 mt-1"><span>$100</span><span>$10K</span><span>$50K</span></div>
        </div>
        <!-- AI modules -->
        <div>
          <label class="text-sm font-semibold text-white block mb-3">Enable AI Modules</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${aiModuleToggle('scale', 'fa-arrow-trend-up', 'Auto-Scale Winners', 'Budget +10% when ROAS ≥ target', true)}
            ${aiModuleToggle('kill', 'fa-scissors', 'Creative Killer', 'Pause ads with CTR < 0.8%', true)}
            ${aiModuleToggle('gen', 'fa-wand-magic-sparkles', 'Creative Generator', 'Auto-generate new ad variants', true)}
            ${aiModuleToggle('audience', 'fa-users', 'Audience Intelligence', 'Build lookalike audiences', true)}
            ${aiModuleToggle('copy', 'fa-pen-nib', 'Copy Engine', 'Test headlines & CTAs', false)}
            ${aiModuleToggle('budget', 'fa-dollar-sign', 'Budget Optimizer', 'Reallocate across platforms', true)}
          </div>
        </div>
        <!-- Notifications -->
        <div>
          <label class="text-sm font-semibold text-white block mb-3">Notification Preferences</label>
          <div class="space-y-2">
            ${notifPref('scale', 'Scale actions', 'When AI increases budgets', true)}
            ${notifPref('kill', 'Creative kills', 'When ads are paused', true)}
            ${notifPref('weekly', 'Weekly report', 'Performance summary every Monday', true)}
            ${notifPref('anomaly', 'Anomaly alerts', 'Unusual spend or performance dips', true)}
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mt-6">
        <button onclick="goStep(2)" class="glass hover:bg-white/10 text-slate-400 px-6 py-2.5 rounded-xl text-sm transition-all">← Back</button>
        <button onclick="goStep(4)" class="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
          Continue <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>

    <!-- ═══ STEP 4 — Invite Team ══════════════════════════════════════════════ -->
    <div id="step-4" class="hidden">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <i class="fas fa-users text-white text-2xl"></i>
        </div>
        <h1 class="text-3xl font-black text-white mb-2">Invite your team</h1>
        <p class="text-slate-400">Collaborate with your team. You can always add more members later.</p>
      </div>
      <div class="glass rounded-2xl p-6 space-y-4">
        <div id="invite-list" class="space-y-3">
          <div class="invite-row flex items-center gap-2">
            <input type="email" placeholder="colleague@company.com" class="input-field rounded-xl px-4 py-2.5 text-sm flex-1"/>
            <select class="input-field rounded-xl px-3 py-2.5 text-xs w-32">
              <option>Admin</option><option>Editor</option><option selected>Viewer</option>
            </select>
            <button onclick="removeInvite(this)" class="w-8 h-9 rounded-xl glass flex items-center justify-center hover:bg-red-500/10 transition-all flex-shrink-0">
              <i class="fas fa-times text-red-400 text-xs"></i>
            </button>
          </div>
        </div>
        <button onclick="addInvite()" class="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1.5 transition-all">
          <i class="fas fa-plus text-xs"></i> Add another person
        </button>
        <div class="glass rounded-xl p-3 flex items-start gap-2 bg-brand-500/5 border border-brand-500/15">
          <i class="fas fa-info-circle text-brand-400 mt-0.5 flex-shrink-0 text-sm"></i>
          <p class="text-xs text-slate-400">Team members will receive an email invitation to join your workspace.</p>
        </div>
      </div>
      <div class="flex justify-between items-center mt-6">
        <button onclick="goStep(3)" class="glass hover:bg-white/10 text-slate-400 px-6 py-2.5 rounded-xl text-sm transition-all">← Back</button>
        <div class="flex items-center gap-3">
          <button onclick="goStep(5)" class="glass hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all">Skip for now</button>
          <button onclick="sendInvitesAndContinue()" class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            Send Invites <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ STEP 5 — Launch ══════════════════════════════════════════════════ -->
    <div id="step-5" class="hidden text-center">
      <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-2xl pulse-glow">
        <i class="fas fa-rocket text-white text-3xl"></i>
      </div>
      <h1 class="text-4xl font-black text-white mb-3">You're all set!</h1>
      <p class="text-slate-400 text-lg mb-8">Your AI is initializing and will start optimizing your campaigns.</p>

      <!-- Summary chips -->
      <div class="flex flex-wrap justify-center gap-2 mb-8" id="setup-summary">
        <span class="glass rounded-full px-4 py-1.5 text-xs font-medium text-emerald-400"><i class="fas fa-check mr-1"></i> Workspace configured</span>
        <span class="glass rounded-full px-4 py-1.5 text-xs font-medium text-blue-400" id="summary-platforms"><i class="fas fa-plug mr-1"></i> 0 platforms connected</span>
        <span class="glass rounded-full px-4 py-1.5 text-xs font-medium text-brand-400"><i class="fas fa-brain mr-1"></i> AI configured</span>
        <span class="glass rounded-full px-4 py-1.5 text-xs font-medium text-amber-400" id="summary-team"><i class="fas fa-users mr-1"></i> 0 invites sent</span>
      </div>

      <!-- AI init animation -->
      <div class="glass rounded-2xl p-6 mb-8 max-w-md mx-auto border border-brand-500/20">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
            <i class="fas fa-brain text-white text-sm"></i>
          </div>
          <div class="text-left">
            <div class="text-sm font-bold text-white">AI Engine Initializing</div>
            <div class="text-xs text-slate-500">Setting up your autonomous advertising</div>
          </div>
          <div class="ml-auto">
            <div class="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full spin" id="ai-spinner"></div>
            <i class="fas fa-check-circle text-emerald-400 hidden text-xl" id="ai-done-icon"></i>
          </div>
        </div>
        <div class="space-y-2" id="init-steps">
          <div class="init-step flex items-center gap-2 text-xs text-slate-500" data-delay="500">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700" id="init-dot-0"></div> Loading AI models...
          </div>
          <div class="init-step flex items-center gap-2 text-xs text-slate-500" data-delay="1200">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700" id="init-dot-1"></div> Syncing platform data...
          </div>
          <div class="init-step flex items-center gap-2 text-xs text-slate-500" data-delay="2000">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700" id="init-dot-2"></div> Running first predictions...
          </div>
          <div class="init-step flex items-center gap-2 text-xs text-slate-500" data-delay="2800">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700" id="init-dot-3"></div> Configuring automation rules...
          </div>
          <div class="init-step flex items-center gap-2 text-xs text-slate-500" data-delay="3500">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-700" id="init-dot-4"></div> All systems operational ✓
          </div>
        </div>
      </div>

      <button id="launch-btn" onclick="launchDashboard()" disabled
        class="opacity-50 cursor-not-allowed bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center gap-3 mx-auto">
        <i class="fas fa-rocket"></i> Launch Dashboard
      </button>
    </div>

  </main>

  <script>
  tailwind.config = { darkMode:'class', theme:{ extend:{ colors:{ brand:{ 400:'#818cf8',500:'#6366f1',600:'#4f46e5',900:'#1e1b4b',950:'#0f0d27' } } } } }

  let currentStep = 1;
  let connectedPlatforms = [];
  let invitesSent = 0;

  const STEP_PROGRESS = { 1:20, 2:40, 3:60, 4:80, 5:100 };

  function goStep(n) {
    if (n === 1) {
      const company = document.getElementById('ws-company').value.trim();
      if (n > currentStep && !company) {
        document.getElementById('ws-company').focus();
        document.getElementById('ws-company').style.borderColor = '#ef4444';
        return;
      }
    }
    document.getElementById('step-' + currentStep).classList.add('hidden');
    document.getElementById('step-' + n).classList.remove('hidden');
    document.getElementById('step-' + n).classList.add('fade-in');

    // Update dots
    for (let i = 0; i < 5; i++) {
      const dot = document.getElementById('dot-' + i);
      if (i < n) { dot.style.background = '#6366f1'; dot.style.width = '10px'; dot.style.height = '10px'; }
      else if (i === n - 1) { dot.style.background = '#6366f1'; }
      else { dot.style.background = 'rgba(255,255,255,0.2)'; dot.style.width = '8px'; dot.style.height = '8px'; }
    }
    document.getElementById('step-label').textContent = n;
    document.getElementById('top-progress').style.width = STEP_PROGRESS[n] + '%';
    currentStep = n;

    if (n === 5) initAI();
  }

  // ── Platform cards ─────────────────────────────────────────────────────────
  document.querySelectorAll('.platform-card').forEach(card => {
    card.addEventListener('click', function() {
      const id = this.dataset.platform;
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        const icon = this.querySelector('.connect-icon');
        icon.className = 'connect-icon fas fa-plus text-slate-600 text-xs';
        connectedPlatforms = connectedPlatforms.filter(p => p !== id);
      } else {
        // Simulate OAuth connect
        simulateOAuth(this, id);
      }
      updateSummaryPlatforms();
    });
  });

  function simulateOAuth(card, id) {
    const btn = card.querySelector('.connect-icon');
    const name = card.querySelector('.platform-name').textContent;
    btn.className = 'connect-icon fas fa-spinner spin text-brand-400 text-xs';
    card.classList.add('oauth-connecting');

    // Show status
    const status = document.getElementById('connect-status');
    status.classList.remove('hidden');
    document.getElementById('connect-status-text').textContent = 'Connecting to ' + name + ' via OAuth...';

    setTimeout(() => {
      card.classList.remove('oauth-connecting');
      card.classList.add('selected');
      btn.className = 'connect-icon fas fa-check text-emerald-400 text-xs';
      connectedPlatforms.push(id);
      document.getElementById('connect-status-text').textContent = '✓ ' + name + ' connected successfully — syncing campaigns...';
      updateSummaryPlatforms();
    }, 1800);
  }

  function updateSummaryPlatforms() {
    const el = document.getElementById('summary-platforms');
    if (el) el.innerHTML = '<i class="fas fa-plug mr-1"></i> ' + connectedPlatforms.length + ' platform' + (connectedPlatforms.length !== 1 ? 's' : '') + ' connected';
  }

  // ── Invite team ────────────────────────────────────────────────────────────
  function addInvite() {
    const list = document.getElementById('invite-list');
    const div = document.createElement('div');
    div.className = 'invite-row flex items-center gap-2 fade-in';
    div.innerHTML = \`
      <input type="email" placeholder="colleague@company.com" class="input-field rounded-xl px-4 py-2.5 text-sm flex-1"/>
      <select class="input-field rounded-xl px-3 py-2.5 text-xs w-32">
        <option>Admin</option><option>Editor</option><option selected>Viewer</option>
      </select>
      <button onclick="removeInvite(this)" class="w-8 h-9 rounded-xl glass flex items-center justify-center hover:bg-red-500/10 transition-all flex-shrink-0">
        <i class="fas fa-times text-red-400 text-xs"></i>
      </button>
    \`;
    list.appendChild(div);
  }
  function removeInvite(btn) {
    btn.closest('.invite-row').remove();
  }

  function sendInvitesAndContinue() {
    const emails = Array.from(document.querySelectorAll('.invite-row input[type=email]'))
      .map(i => i.value.trim()).filter(e => e && e.includes('@'));
    invitesSent = emails.length;
    const el = document.getElementById('summary-team');
    if (el && invitesSent > 0) el.innerHTML = '<i class="fas fa-users mr-1"></i> ' + invitesSent + ' invite' + (invitesSent > 1 ? 's' : '') + ' sent';
    goStep(5);
  }

  // ── AI init animation ──────────────────────────────────────────────────────
  function initAI() {
    const dots = document.querySelectorAll('[id^="init-dot-"]');
    const rows = document.querySelectorAll('.init-step');
    dots.forEach((dot, i) => {
      const delay = parseInt(rows[i].dataset.delay) || (i * 700);
      setTimeout(() => {
        dot.style.background = '#6366f1';
        rows[i].style.color = '#cbd5e1';
        if (i === dots.length - 1) {
          setTimeout(() => {
            document.getElementById('ai-spinner').classList.add('hidden');
            document.getElementById('ai-done-icon').classList.remove('hidden');
            document.getElementById('launch-btn').disabled = false;
            document.getElementById('launch-btn').classList.remove('opacity-50','cursor-not-allowed');
            document.getElementById('launch-btn').classList.add('hover:scale-105','shadow-2xl');
          }, 500);
        }
      }, delay);
    });
  }

  function launchDashboard() {
    const btn = document.getElementById('launch-btn');
    btn.innerHTML = '<i class="fas fa-spinner spin"></i> Launching...';
    btn.disabled = true;
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1200);
  }

  function skipOnboarding() {
    window.location.href = '/dashboard';
  }
  </script>
</body>
</html>`)
}

function platformCard(id: string, icon: string, color: string, name: string, sub: string): string {
  return `<div class="platform-card glass rounded-xl p-4 select-none" data-platform="${id}">
    <div class="flex items-center justify-between mb-3">
      <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:${color}20">
        <i class="${icon} text-sm" style="color:${color}"></i>
      </div>
      <i class="connect-icon fas fa-plus text-slate-600 text-xs"></i>
    </div>
    <div class="font-semibold text-white text-xs platform-name">${name}</div>
    <div class="text-xs text-slate-600 mt-0.5">${sub}</div>
  </div>`
}

function aiModuleToggle(id: string, icon: string, label: string, desc: string, checked: boolean): string {
  return `<label class="flex items-start gap-3 cursor-pointer glass rounded-xl p-3 hover:bg-white/5 transition-all">
    <input type="checkbox" id="mod-${id}" ${checked ? 'checked' : ''} class="accent-brand-500 w-3.5 h-3.5 mt-0.5 flex-shrink-0"/>
    <div>
      <div class="flex items-center gap-2">
        <i class="fas ${icon} text-brand-400 text-xs"></i>
        <span class="text-xs font-semibold text-slate-200">${label}</span>
      </div>
      <div class="text-xs text-slate-600 mt-0.5">${desc}</div>
    </div>
  </label>`
}

function notifPref(id: string, label: string, desc: string, checked: boolean): string {
  return `<div class="flex items-center justify-between py-2 border-b border-white/5">
    <div>
      <div class="text-xs font-medium text-slate-300">${label}</div>
      <div class="text-xs text-slate-600">${desc}</div>
    </div>
    <input type="checkbox" id="notif-${id}" ${checked ? 'checked' : ''} class="accent-brand-500 w-3.5 h-3.5"/>
  </div>`
}
