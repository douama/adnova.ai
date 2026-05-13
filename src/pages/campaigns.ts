
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderCampaigns(lang: Lang = 'en'): string {
  const content = `
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div class="flex flex-wrap items-center gap-3">
      <div class="glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
        <i class="fas fa-search text-slate-500 text-xs"></i>
        <input placeholder="Search campaigns..." class="bg-transparent text-slate-300 placeholder-slate-600 outline-none text-sm w-40" id="camp-search" oninput="filterCampaigns()"/>
      </div>
      <select id="camp-platform" class="glass rounded-xl px-4 py-2 text-sm text-slate-400 outline-none border-0 cursor-pointer bg-transparent" onchange="filterCampaigns()">
        <option value="">All Platforms</option>
        <option>Facebook</option><option>Google</option><option>Instagram</option><option>TikTok</option>
        <option>Snapchat</option><option>LinkedIn</option><option>Pinterest</option><option>X (Twitter)</option><option>YouTube</option>
      </select>
      <select id="camp-status" class="glass rounded-xl px-4 py-2 text-sm text-slate-400 outline-none border-0 cursor-pointer bg-transparent" onchange="filterCampaigns()">
        <option value="">All Status</option>
        <option>Scaling</option><option>Live</option><option>Paused</option><option>Draft</option><option>Killed</option>
      </select>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="exportCampaigns()" class="glass hover:bg-white/10 text-slate-400 text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
        <i class="fas fa-download text-xs"></i> Export
      </button>
      <button onclick="openCreateCampaign()" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-500 hover:to-brand-500 text-white text-sm font-bold px-5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg">
        <i class="fas fa-plus text-xs"></i> New Campaign
      </button>
    </div>
  </div>

  <!-- Stats Bar -->
  <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
    ${campStat('47', 'Total', 'fa-bullhorn', 'slate')}
    ${campStat('12', 'Scaling', 'fa-arrow-trend-up', 'brand')}
    ${campStat('28', 'Live', 'fa-play-circle', 'brand')}
    ${campStat('5', 'Paused', 'fa-pause-circle', 'brand')}
    ${campStat('2', 'Killed', 'fa-stop-circle', 'slate')}
  </div>

  <!-- Campaigns Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6" id="campaigns-grid">
    ${campaignCard('c1', 'Summer Collection 2026', ['Facebook','Instagram'], 'scaling', '$18,420', '$96,805', '5.26', '4.2', 38, 'ROAS 5.26x — scaling in 38h', 47852, 2018)}
    ${campaignCard('c2', 'Product Launch Q3', ['Google','TikTok'], 'scaling', '$14,200', '$68,160', '4.80', '3.8', 52, 'Strong performance — scaling in 52h', 38291, 1526)}
    ${campaignCard('c3', 'Brand Awareness Wave', ['Facebook'], 'live', '$9,800', '$41,160', '4.20', '2.9', 16, 'Running within targets — next check 16h', 82314, 2389)}
    ${campaignCard('c4', 'Retargeting Engine Pro', ['Google'], 'live', '$7,350', '$29,400', '4.00', '6.1', 28, 'High CTR retargeting performing well', 12043, 734)}
    ${campaignCard('c5', 'Holiday Flash Sale', ['TikTok','Snapchat'], 'live', '$5,200', '$17,680', '3.40', '5.4', 61, 'Good CTR, monitoring ROAS', 28742, 1551)}
    ${campaignCard('c6', 'New User Acquisition', ['Instagram'], 'paused', '$3,100', '$7,750', '2.50', '1.1', 0, 'ROAS below 3x threshold — AI paused', 14203, 156)}
    ${campaignCard('c7', 'Q4 Sale Preview', ['Facebook','Google'], 'draft', '$0', '$0', '—', '—', 0, 'Draft — ready to launch', 0, 0)}
    ${campaignCard('c8', 'Competitor Conquest', ['Google'], 'live', '$4,400', '$15,840', '3.60', '3.2', 44, 'Competitive keywords performing', 9823, 314)}
    ${campaignCard('c9', 'Influencer Amplify', ['TikTok','Instagram'], 'scaling', '$6,800', '$35,360', '5.20', '8.3', 21, 'UGC-style content scaling fast', 41209, 3421)}
    ${campaignCard('c10', 'LinkedIn B2B Leads', ['LinkedIn'], 'live', '$3,800', '$15,200', '4.00', '2.8', 0, 'Lead gen performing — CPL $42', 18450, 517)}
    ${campaignCard('c11', 'YouTube Brand Story', ['YouTube'], 'live', '$5,600', '$22,400', '4.00', '3.5', 0, 'View-through conversions strong', 94200, 3297)}
    ${campaignCard('c12', 'Pinterest Discovery', ['Pinterest'], 'scaling', '$2,800', '$9,520', '3.40', '4.8', 48, 'Shopping pins converting well', 62310, 2991)}
  </div>

  <!-- ── CREATE / EDIT Campaign Modal ─────────────────────────────────────── -->
  <div id="create-campaign-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto animate-fadeIn" style="border:1px solid rgba(99,102,241,0.4)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
            <i class="fas fa-plus text-white" id="modal-icon"></i>
          </div>
          <div>
            <h2 class="font-bold text-white text-lg" id="modal-title">Create New Campaign</h2>
            <p class="text-xs text-slate-500">AI will optimize automatically</p>
          </div>
        </div>
        <button onclick="closeCreateCampaign()" class="text-slate-500 hover:text-slate-300 text-xl w-9 h-9 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-6 space-y-5">
        <input type="hidden" id="edit-campaign-id" value=""/>
        <!-- Basics -->
        <div class="glass rounded-xl p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><i class="fas fa-flag text-brand-400"></i> Campaign Basics</h3>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Campaign Name *</label>
              <input type="text" id="camp-name" placeholder="e.g., Summer Sale 2026"
                class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Objective</label>
                <select id="camp-objective" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
                  <option>🎯 Conversions</option>
                  <option>🔍 Traffic</option>
                  <option>📣 Brand Awareness</option>
                  <option>🛒 Catalog Sales</option>
                  <option>📲 App Installs</option>
                  <option>👥 Lead Generation</option>
                </select>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Industry</label>
                <select id="camp-industry" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
                  <option>👗 Fashion / Apparel</option>
                  <option>📱 Tech / SaaS</option>
                  <option>🏋️ Health & Fitness</option>
                  <option>🏠 Real Estate</option>
                  <option>🛍️ E-commerce</option>
                  <option>🎓 Education</option>
                  <option>💼 B2B / Enterprise</option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Target URL / Landing Page</label>
              <div class="relative">
                <i class="fas fa-link absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                <input type="url" id="camp-url" placeholder="https://yoursite.com/landing-page"
                  class="w-full glass rounded-xl px-4 py-3 pl-9 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
              </div>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">AI Brief (Optional)</label>
              <textarea id="camp-brief" placeholder="Describe your product, target customer, key benefits, tone..."
                rows="2" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all resize-none bg-transparent"></textarea>
            </div>
          </div>
        </div>

        <!-- Platform Selector -->
        <div class="glass rounded-xl p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><i class="fas fa-plug text-brand-400"></i> Platforms</h3>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-3" id="platform-selector">
            ${platformSelector('Facebook', 'fab fa-facebook-f', '#A8A8A8', true)}
            ${platformSelector('Instagram', 'fab fa-instagram', '#A8A8A8', true)}
            ${platformSelector('TikTok', 'fab fa-tiktok', '#A8A8A8', false)}
            ${platformSelector('Google', 'fab fa-google', '#A8A8A8', true)}
            ${platformSelector('YouTube', 'fab fa-youtube', '#A8A8A8', false)}
            ${platformSelector('LinkedIn', 'fab fa-linkedin-in', '#A8A8A8', false)}
            ${platformSelector('Pinterest', 'fab fa-pinterest-p', '#e60023', false)}
            ${platformSelector('X/Twitter', 'fab fa-x-twitter', '#14171a', false)}
            ${platformSelector('Snapchat', 'fab fa-snapchat', '#F7C900', false)}
          </div>
        </div>

        <!-- Budget & Schedule -->
        <div class="glass rounded-xl p-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><i class="fas fa-wallet text-brand-400"></i> Budget & Schedule</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Daily Budget ($)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input type="number" id="camp-daily" value="500" min="1"
                  class="w-full glass rounded-xl px-4 py-3 pl-7 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
              </div>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Lifetime Budget ($)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                <input type="number" id="camp-lifetime" value="15000" min="1"
                  class="w-full glass rounded-xl px-4 py-3 pl-7 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
              </div>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Start Date</label>
              <input type="date" id="camp-start" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">End Date</label>
              <input type="date" id="camp-end" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
          </div>
        </div>

        <!-- AI Settings -->
        <div class="glass rounded-xl p-4 border border-brand-500/20">
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-brain text-brand-400"></i>
            <span class="font-semibold text-white text-sm">AI Automation</span>
          </div>
          <div class="space-y-2">
            ${aiToggle('ai-gen', 'Auto-generate creatives', 'AI creates images and videos using your brief', true)}
            ${aiToggle('ai-ab', 'Auto A/B testing', 'AI tests multiple variants simultaneously', true)}
            ${aiToggle('ai-kill', 'Auto kill weak ads', 'Pause creatives with CTR below threshold', true)}
            ${aiToggle('ai-scale', 'Auto-scale winners', 'Increase budget +10% every 72h when ROAS > target', true)}
            ${aiToggle('ai-audience', 'Auto audience expansion', 'AI automatically expands lookalike audiences', false)}
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Kill CTR below</label>
              <select id="camp-kill-ctr" class="w-full glass rounded-xl px-3 py-2 text-xs text-slate-300 outline-none border border-white/10 bg-transparent">
                <option>0.5%</option><option selected>0.8%</option><option>1.0%</option><option>1.5%</option>
              </select>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Scale ROAS target</label>
              <select id="camp-scale-roas" class="w-full glass rounded-xl px-3 py-2 text-xs text-slate-300 outline-none border border-white/10 bg-transparent">
                <option>3.0x</option><option selected>3.5x</option><option>4.0x</option><option>5.0x</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button onclick="closeCreateCampaign()" class="glass hover:bg-white/10 text-slate-400 px-6 py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
          <button onclick="saveCampaign()" id="save-camp-btn" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-500 hover:to-brand-500 text-white font-bold px-8 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all">
            <i class="fas fa-rocket" id="save-camp-icon"></i> <span id="save-camp-label">Launch Campaign</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── DELETE Confirmation Modal ─────────────────────────────────────────── -->
  <div id="delete-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md animate-fadeIn border border-slate-500/30">
      <div class="p-6 text-center">
        <div class="w-16 h-16 rounded-full bg-slate-500/20 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-trash-can text-slate-400 text-2xl"></i>
        </div>
        <h3 class="font-bold text-white text-lg mb-2">Delete Campaign?</h3>
        <p class="text-slate-400 text-sm mb-1">You are about to delete:</p>
        <p class="font-bold text-white mb-4" id="delete-camp-name">Campaign Name</p>
        <p class="text-xs text-slate-500 mb-6">This action is <span class="text-slate-400 font-semibold">irreversible</span>. All data, creatives, and analytics will be permanently removed.</p>
        <div class="flex gap-3">
          <button onclick="closeDeleteModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-3 rounded-xl text-sm font-semibold transition-all">Cancel</button>
          <button onclick="confirmDelete()" class="flex-1 bg-gradient-to-r from-slate-600 to-brand-600 hover:from-slate-500 hover:to-brand-500 text-white py-3 rounded-xl text-sm font-bold transition-all">
            <i class="fas fa-trash-can mr-2"></i>Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ── Campaign Detail / Quick Actions Drawer ────────────────────────────── -->
  <div id="campaign-drawer" class="hidden fixed inset-y-0 right-0 w-full max-w-lg glass border-l border-white/10 z-50 overflow-y-auto">
    <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass">
      <h3 class="font-bold text-white" id="drawer-title">Campaign Details</h3>
      <button onclick="closeDrawer()" class="text-slate-500 hover:text-slate-300 w-9 h-9 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5" id="drawer-content"></div>
  </div>
  <div id="drawer-overlay" class="hidden fixed inset-0 bg-black/40 z-40" onclick="closeDrawer()"></div>

  <!-- Toast -->
  <div id="camp-toast" class="hidden fixed bottom-6 right-6 z-[70] glass border border-brand-500/30 rounded-xl px-5 py-3 flex items-center gap-3 animate-fadeIn">
    <i id="toast-icon" class="fas fa-check-circle text-brand-400"></i>
    <span class="text-sm text-white font-semibold" id="camp-toast-msg">Saved!</span>
  </div>

  <style>
    .platform-pill.selected { ring: 2px solid var(--brand); background:rgba(99,102,241,0.15); }
    .camp-card-actions { opacity: 0; transition: opacity 0.2s; }
    .camp-card-wrapper:hover .camp-card-actions { opacity: 1; }
  </style>

  <script>
  // ── Data Store ─────────────────────────────────────────────────────────────
  let CAMPAIGNS = [
    { id:'c1', name:'Summer Collection 2026', platforms:['Facebook','Instagram'], status:'scaling', spend:'$18,420', revenue:'$96,805', roas:'5.26', ctr:'4.2', scaleIn:38, aiNote:'ROAS 5.26x — scaling in 38h', impressions:47852, clicks:2018, daily:1000, lifetime:50000, objective:'Conversions', url:'https://store.com/summer' },
    { id:'c2', name:'Product Launch Q3', platforms:['Google','TikTok'], status:'scaling', spend:'$14,200', revenue:'$68,160', roas:'4.80', ctr:'3.8', scaleIn:52, aiNote:'Strong performance — scaling in 52h', impressions:38291, clicks:1526, daily:800, lifetime:40000, objective:'Conversions', url:'https://store.com/launch' },
    { id:'c3', name:'Brand Awareness Wave', platforms:['Facebook'], status:'live', spend:'$9,800', revenue:'$41,160', roas:'4.20', ctr:'2.9', scaleIn:16, aiNote:'Running within targets — next check 16h', impressions:82314, clicks:2389, daily:600, lifetime:25000, objective:'Brand Awareness', url:'https://store.com' },
    { id:'c4', name:'Retargeting Engine Pro', platforms:['Google'], status:'live', spend:'$7,350', revenue:'$29,400', roas:'4.00', ctr:'6.1', scaleIn:28, aiNote:'High CTR retargeting', impressions:12043, clicks:734, daily:400, lifetime:15000, objective:'Conversions', url:'https://store.com/retarget' },
    { id:'c5', name:'Holiday Flash Sale', platforms:['TikTok','Snapchat'], status:'live', spend:'$5,200', revenue:'$17,680', roas:'3.40', ctr:'5.4', scaleIn:61, aiNote:'Good CTR, monitoring ROAS', impressions:28742, clicks:1551, daily:300, lifetime:12000, objective:'Catalog Sales', url:'https://store.com/sale' },
    { id:'c6', name:'New User Acquisition', platforms:['Instagram'], status:'paused', spend:'$3,100', revenue:'$7,750', roas:'2.50', ctr:'1.1', scaleIn:0, aiNote:'ROAS below 3x — AI paused', impressions:14203, clicks:156, daily:200, lifetime:8000, objective:'Traffic', url:'https://store.com/new' },
    { id:'c7', name:'Q4 Sale Preview', platforms:['Facebook','Google'], status:'draft', spend:'$0', revenue:'$0', roas:'—', ctr:'—', scaleIn:0, aiNote:'Draft — ready to launch', impressions:0, clicks:0, daily:500, lifetime:15000, objective:'Conversions', url:'' },
    { id:'c8', name:'Competitor Conquest', platforms:['Google'], status:'live', spend:'$4,400', revenue:'$15,840', roas:'3.60', ctr:'3.2', scaleIn:44, aiNote:'Competitive keywords performing', impressions:9823, clicks:314, daily:300, lifetime:12000, objective:'Traffic', url:'https://store.com/compare' },
    { id:'c9', name:'Influencer Amplify', platforms:['TikTok','Instagram'], status:'scaling', spend:'$6,800', revenue:'$35,360', roas:'5.20', ctr:'8.3', scaleIn:21, aiNote:'UGC-style content scaling fast', impressions:41209, clicks:3421, daily:500, lifetime:20000, objective:'Brand Awareness', url:'https://store.com/collab' },
    { id:'c10', name:'LinkedIn B2B Leads', platforms:['LinkedIn'], status:'live', spend:'$3,800', revenue:'$15,200', roas:'4.00', ctr:'2.8', scaleIn:0, aiNote:'Lead gen performing — CPL $42', impressions:18450, clicks:517, daily:250, lifetime:10000, objective:'Lead Generation', url:'https://store.com/b2b' },
    { id:'c11', name:'YouTube Brand Story', platforms:['YouTube'], status:'live', spend:'$5,600', revenue:'$22,400', roas:'4.00', ctr:'3.5', scaleIn:0, aiNote:'View-through conversions strong', impressions:94200, clicks:3297, daily:400, lifetime:18000, objective:'Brand Awareness', url:'https://store.com/brand' },
    { id:'c12', name:'Pinterest Discovery', platforms:['Pinterest'], status:'scaling', spend:'$2,800', revenue:'$9,520', roas:'3.40', ctr:'4.8', scaleIn:48, aiNote:'Shopping pins converting well', impressions:62310, clicks:2991, daily:200, lifetime:8000, objective:'Catalog Sales', url:'https://store.com/discover' },
  ];

  let deletingId = null;

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg, type = 'success') {
    const t = document.getElementById('camp-toast');
    const m = document.getElementById('camp-toast-msg');
    const ico = document.getElementById('toast-icon');
    m.textContent = msg;
    ico.className = type === 'error' ? 'fas fa-times-circle text-slate-400' : 'fas fa-check-circle text-brand-400';
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 3500);
  }

  // ── Filter ────────────────────────────────────────────────────────────────
  function filterCampaigns() {
    const search = document.getElementById('camp-search').value.toLowerCase();
    const platform = document.getElementById('camp-platform').value.toLowerCase();
    const status = document.getElementById('camp-status').value.toLowerCase();
    document.querySelectorAll('.camp-card-wrapper').forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const plats = (card.dataset.platforms || '').toLowerCase();
      const st = (card.dataset.status || '').toLowerCase();
      const matchSearch = !search || name.includes(search);
      const matchPlatform = !platform || plats.includes(platform);
      const matchStatus = !status || st === status;
      card.style.display = (matchSearch && matchPlatform && matchStatus) ? '' : 'none';
    });
  }

  // ── Open Create Modal ──────────────────────────────────────────────────────
  function openCreateCampaign() {
    document.getElementById('edit-campaign-id').value = '';
    document.getElementById('modal-title').textContent = 'Create New Campaign';
    document.getElementById('modal-icon').className = 'fas fa-plus text-white';
    document.getElementById('save-camp-label').textContent = 'Launch Campaign';
    document.getElementById('save-camp-icon').className = 'fas fa-rocket';
    // Reset form
    ['camp-name','camp-url','camp-brief','camp-daily','camp-lifetime','camp-start','camp-end'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.value = id === 'camp-daily' ? '500' : id === 'camp-lifetime' ? '15000' : '';
    });
    // Reset platform selection
    document.querySelectorAll('.platform-pill').forEach(p => {
      const def = ['Facebook','Instagram','Google'];
      if(def.includes(p.dataset.platform)) { p.classList.add('ring-2','ring-brand-500','bg-brand-500/10'); }
      else { p.classList.remove('ring-2','ring-brand-500','bg-brand-500/10'); }
    });
    document.getElementById('create-campaign-modal').classList.remove('hidden');
  }
  function closeCreateCampaign() {
    document.getElementById('create-campaign-modal').classList.add('hidden');
  }

  // ── Open Edit Modal ────────────────────────────────────────────────────────
  function editCampaign(id) {
    closeDrawer();
    const c = CAMPAIGNS.find(x => x.id === id);
    if(!c) return;
    document.getElementById('edit-campaign-id').value = id;
    document.getElementById('modal-title').textContent = 'Edit Campaign';
    document.getElementById('modal-icon').className = 'fas fa-edit text-white';
    document.getElementById('save-camp-label').textContent = 'Save Changes';
    document.getElementById('save-camp-icon').className = 'fas fa-save';
    // Fill form
    document.getElementById('camp-name').value = c.name;
    document.getElementById('camp-url').value = c.url || '';
    document.getElementById('camp-brief').value = '';
    document.getElementById('camp-daily').value = c.daily;
    document.getElementById('camp-lifetime').value = c.lifetime;
    // Update platform selection
    document.querySelectorAll('.platform-pill').forEach(p => {
      if(c.platforms.includes(p.dataset.platform)) {
        p.classList.add('ring-2','ring-brand-500','bg-brand-500/10');
      } else {
        p.classList.remove('ring-2','ring-brand-500','bg-brand-500/10');
      }
    });
    document.getElementById('create-campaign-modal').classList.remove('hidden');
  }

  // ── Save Campaign (create or edit) ─────────────────────────────────────────
  function saveCampaign() {
    const name = document.getElementById('camp-name').value.trim();
    if(!name) { showToast('Campaign name is required', 'error'); return; }

    const btn = document.getElementById('save-camp-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    btn.disabled = true;

    setTimeout(() => {
      const id = document.getElementById('edit-campaign-id').value;
      const platforms = [...document.querySelectorAll('.platform-pill.ring-brand-500')].map(p => p.dataset.platform);
      const daily = document.getElementById('camp-daily').value;
      const lifetime = document.getElementById('camp-lifetime').value;

      if(id) {
        // Edit existing
        const idx = CAMPAIGNS.findIndex(x => x.id === id);
        if(idx !== -1) {
          CAMPAIGNS[idx].name = name;
          CAMPAIGNS[idx].platforms = platforms.length ? platforms : CAMPAIGNS[idx].platforms;
          CAMPAIGNS[idx].daily = parseInt(daily) || CAMPAIGNS[idx].daily;
          CAMPAIGNS[idx].lifetime = parseInt(lifetime) || CAMPAIGNS[idx].lifetime;
          // Update card in DOM
          const card = document.querySelector('[data-id="' + id + '"]');
          if(card) {
            card.querySelector('.camp-card-name').textContent = name;
            card.dataset.name = name.toLowerCase();
            card.dataset.platforms = platforms.join(',').toLowerCase();
          }
        }
        showToast('✅ Campaign updated successfully!');
      } else {
        // Create new
        const newId = 'c' + Date.now();
        const newCamp = { id:newId, name, platforms: platforms.length ? platforms : ['Facebook'], status:'draft',
          spend:'$0', revenue:'$0', roas:'—', ctr:'—', scaleIn:0, aiNote:'Just created — awaiting activation',
          impressions:0, clicks:0, daily:parseInt(daily)||500, lifetime:parseInt(lifetime)||15000,
          objective:'Conversions', url: document.getElementById('camp-url').value };
        CAMPAIGNS.push(newCamp);
        // Add card to grid
        const grid = document.getElementById('campaigns-grid');
        const div = document.createElement('div');
        div.innerHTML = buildCampaignCardHTML(newCamp);
        grid.appendChild(div.firstElementChild);
        showToast('🚀 Campaign created! AI is generating creatives...');
      }

      btn.innerHTML = originalHTML;
      btn.disabled = false;
      closeCreateCampaign();
    }, 1200);
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  function openDeleteModal(id) {
    closeDrawer();
    deletingId = id;
    const c = CAMPAIGNS.find(x => x.id === id);
    if(c) document.getElementById('delete-camp-name').textContent = c.name;
    document.getElementById('delete-modal').classList.remove('hidden');
  }
  function closeDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
    deletingId = null;
  }
  function confirmDelete() {
    if(!deletingId) return;
    // Remove from data
    CAMPAIGNS = CAMPAIGNS.filter(x => x.id !== deletingId);
    // Remove from DOM
    const card = document.querySelector('[data-id="' + deletingId + '"]');
    if(card) {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      card.style.transition = 'all 0.3s';
      setTimeout(() => card.remove(), 300);
    }
    closeDeleteModal();
    showToast('🗑️ Campaign deleted');
    // Update stat
    const totalEl = document.querySelector('[data-stat="total"]');
    if(totalEl) totalEl.textContent = CAMPAIGNS.length;
  }

  // ── Campaign Detail Drawer ────────────────────────────────────────────────
  function openCampaignDetail(id) {
    const c = CAMPAIGNS.find(x => x.id === id);
    if(!c) return;
    document.getElementById('drawer-title').textContent = c.name;
    const roasNum = parseFloat(c.roas);
    const roasColor = roasNum >= 4.5 ? '#FF4D00' : roasNum >= 3.5 ? '#3b82f6' : '#FF6B2B';
    const statusColors = { scaling:'#a78bfa', live:'#FF4D00', paused:'#FF6B2B', draft:'#7A7A7A', killed:'#7A7A7A' };
    const sc = statusColors[c.status] || '#7A7A7A';
    document.getElementById('drawer-content').innerHTML = \`
      <div class="space-y-4">
        <!-- Status & Actions -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-bold px-3 py-1 rounded-full" style="background:\${sc}22;color:\${sc}">\${c.status.toUpperCase()}</span>
          <div class="flex items-center gap-2">
            <button onclick="editCampaign('\${c.id}')" class="glass hover:bg-slate-500/10 text-slate-400 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all border border-slate-500/20">
              <i class="fas fa-edit text-xs"></i> Edit
            </button>
            \${c.status === 'paused' ? '<button onclick="changeStatus(\\''+c.id+'\\',\\'live\\')" class="glass hover:bg-brand-500/10 text-brand-400 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all border border-brand-500/20"><i class="fas fa-play text-xs"></i> Resume</button>' : ''}
            \${c.status === 'live' || c.status === 'scaling' ? '<button onclick="changeStatus(\\''+c.id+'\\',\\'paused\\')" class="glass hover:bg-brand-500/10 text-brand-400 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all border border-brand-500/20"><i class="fas fa-pause text-xs"></i> Pause</button>' : ''}
            <button onclick="openDeleteModal('\${c.id}')" class="glass hover:bg-slate-500/10 text-slate-400 text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all border border-slate-500/20">
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>

        <!-- KPIs -->
        <div class="grid grid-cols-2 gap-3">
          <div class="glass rounded-xl p-3 text-center">
            <div class="text-xs text-slate-500 mb-1">Spend</div>
            <div class="text-xl font-black text-white">\${c.spend}</div>
          </div>
          <div class="glass rounded-xl p-3 text-center">
            <div class="text-xs text-slate-500 mb-1">Revenue</div>
            <div class="text-xl font-black text-brand-400">\${c.revenue}</div>
          </div>
          <div class="glass rounded-xl p-3 text-center">
            <div class="text-xs text-slate-500 mb-1">ROAS</div>
            <div class="text-xl font-black" style="color:\${roasColor}">\${c.roas}\${c.roas !== '—' ? 'x' : ''}</div>
          </div>
          <div class="glass rounded-xl p-3 text-center">
            <div class="text-xs text-slate-500 mb-1">CTR</div>
            <div class="text-xl font-black text-white">\${c.ctr}\${c.ctr !== '—' ? '%' : ''}</div>
          </div>
        </div>

        <!-- Impressions / Clicks -->
        \${c.impressions > 0 ? \`<div class="glass rounded-xl p-3 grid grid-cols-2 gap-3">
          <div class="text-center"><div class="text-xs text-slate-500 mb-0.5">Impressions</div><div class="font-bold text-slate-200">\${c.impressions.toLocaleString()}</div></div>
          <div class="text-center"><div class="text-xs text-slate-500 mb-0.5">Clicks</div><div class="font-bold text-slate-200">\${c.clicks.toLocaleString()}</div></div>
        </div>\` : ''}

        <!-- AI Note -->
        <div class="glass rounded-xl p-4 border border-brand-500/20 flex items-start gap-3">
          <i class="fas fa-brain text-brand-400 mt-0.5"></i>
          <div>
            <div class="text-xs font-bold text-brand-400 mb-1">AI Analysis</div>
            <p class="text-sm text-slate-300">\${c.aiNote}</p>
          </div>
        </div>

        <!-- Platforms -->
        <div class="glass rounded-xl p-4">
          <div class="text-xs font-bold text-slate-400 mb-2">Active Platforms</div>
          <div class="flex flex-wrap gap-2">
            \${c.platforms.map(p => '<span class="text-xs glass px-3 py-1 rounded-full text-slate-300"><i class="fab fa-' + p.toLowerCase().replace('x/twitter','x-twitter').replace('google','google') + ' mr-1"></i>' + p + '</span>').join('')}
          </div>
        </div>

        <!-- Budget info -->
        <div class="glass rounded-xl p-4">
          <div class="text-xs font-bold text-slate-400 mb-2">Budget Configuration</div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-400">Daily budget:</span>
            <span class="font-bold text-white">$\${c.daily?.toLocaleString()}</span>
          </div>
          <div class="flex justify-between text-sm mt-1">
            <span class="text-slate-400">Lifetime budget:</span>
            <span class="font-bold text-white">$\${c.lifetime?.toLocaleString()}</span>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="glass rounded-xl p-4 space-y-2">
          <div class="text-xs font-bold text-slate-400 mb-2">Quick Actions</div>
          <button onclick="showToast('Opening Creative Studio for this campaign...')" class="w-full glass hover:bg-brand-500/10 text-brand-400 text-sm py-2.5 rounded-lg flex items-center gap-2 px-4 transition-all border border-brand-500/20">
            <i class="fas fa-palette text-xs"></i> View Creatives
          </button>
          <button onclick="showToast('Analytics loading...')" class="w-full glass hover:bg-slate-500/10 text-slate-400 text-sm py-2.5 rounded-lg flex items-center gap-2 px-4 transition-all border border-slate-500/20">
            <i class="fas fa-chart-line text-xs"></i> View Analytics
          </button>
          <button onclick="duplicateCampaign('\${c.id}')" class="w-full glass hover:bg-brand-500/10 text-brand-400 text-sm py-2.5 rounded-lg flex items-center gap-2 px-4 transition-all border border-brand-500/20">
            <i class="fas fa-copy text-xs"></i> Duplicate Campaign
          </button>
        </div>
      </div>
    \`;
    document.getElementById('campaign-drawer').classList.remove('hidden');
    document.getElementById('drawer-overlay').classList.remove('hidden');
  }
  function closeDrawer() {
    document.getElementById('campaign-drawer').classList.add('hidden');
    document.getElementById('drawer-overlay').classList.add('hidden');
  }

  // ── Status Change ─────────────────────────────────────────────────────────
  function changeStatus(id, newStatus) {
    const c = CAMPAIGNS.find(x => x.id === id);
    if(!c) return;
    c.status = newStatus;
    const card = document.querySelector('[data-id="' + id + '"]');
    if(card) {
      const badge = card.querySelector('.camp-status-badge');
      const statusColors = { scaling:'badge-scaling', live:'badge-live', paused:'badge-paused', draft:'badge-draft', killed:'badge-killed' };
      if(badge) {
        badge.className = 'camp-status-badge ' + (statusColors[newStatus] || 'badge-draft') + ' text-xs px-2 py-1 rounded-full font-semibold capitalize';
        badge.textContent = newStatus;
      }
      card.dataset.status = newStatus;
    }
    closeDrawer();
    showToast('Campaign is now ' + newStatus);
  }

  // ── Duplicate ─────────────────────────────────────────────────────────────
  function duplicateCampaign(id) {
    const c = CAMPAIGNS.find(x => x.id === id);
    if(!c) return;
    const newId = 'c' + Date.now();
    const copy = { ...c, id: newId, name: c.name + ' (Copy)', status: 'draft', spend:'$0', revenue:'$0', roas:'—', ctr:'—', impressions:0, clicks:0 };
    CAMPAIGNS.push(copy);
    const grid = document.getElementById('campaigns-grid');
    const div = document.createElement('div');
    div.innerHTML = buildCampaignCardHTML(copy);
    grid.appendChild(div.firstElementChild);
    closeDrawer();
    showToast('📋 Campaign duplicated as draft');
  }

  // ── Build campaign card HTML dynamically ───────────────────────────────────
  function buildCampaignCardHTML(c) {
    const platColors = { Facebook:'#A8A8A8', Google:'#A8A8A8', Instagram:'#A8A8A8', TikTok:'#A8A8A8', Snapchat:'#F7C900', LinkedIn:'#A8A8A8', Pinterest:'#e60023', 'X/Twitter':'#14171a', YouTube:'#A8A8A8' };
    const platIcons = { Facebook:'fab fa-facebook', Google:'fab fa-google', Instagram:'fab fa-instagram', TikTok:'fab fa-tiktok', Snapchat:'fab fa-snapchat', LinkedIn:'fab fa-linkedin-in', Pinterest:'fab fa-pinterest-p', 'X/Twitter':'fab fa-x-twitter', YouTube:'fab fa-youtube' };
    const statusColors = { scaling:'badge-scaling', live:'badge-live', paused:'badge-paused', draft:'badge-draft', killed:'badge-killed' };
    const roasNum = parseFloat(c.roas);
    const roasColor = roasNum >= 4.5 ? 'brand' : roasNum >= 3.5 ? 'slate' : c.roas === '—' ? 'slate' : 'brand';
    return \`<div class="glass rounded-2xl p-5 card-hover cursor-pointer camp-card-wrapper relative" data-id="\${c.id}" data-name="\${c.name.toLowerCase()}" data-platforms="\${c.platforms.join(',').toLowerCase()}" data-status="\${c.status}">
      <!-- Action buttons (appear on hover) -->
      <div class="camp-card-actions absolute top-3 right-3 flex items-center gap-1 z-10">
        <button onclick="event.stopPropagation();editCampaign('\${c.id}')" title="Edit" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-slate-500/20 text-slate-400 transition-all border border-slate-500/20">
          <i class="fas fa-edit text-xs"></i>
        </button>
        <button onclick="event.stopPropagation();openDeleteModal('\${c.id}')" title="Delete" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-slate-500/20 text-slate-400 transition-all border border-slate-500/20">
          <i class="fas fa-trash text-xs"></i>
        </button>
      </div>
      <div onclick="openCampaignDetail('\${c.id}')">
      <div class="flex items-start justify-between mb-3 pr-16">
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-white text-sm leading-tight camp-card-name">\${c.name}</h3>
          <div class="flex flex-wrap items-center gap-1 mt-1.5">
            \${c.platforms.map(p => '<span class="text-xs px-2 py-0.5 rounded-full" style="background:' + (platColors[p]||'#666') + '30;color:' + (platColors[p]||'#aaa') + '"><i class="' + (platIcons[p]||'fas fa-ad') + ' mr-1"></i>' + p + '</span>').join('')}
          </div>
        </div>
        <span class="camp-status-badge \${statusColors[c.status]||'badge-draft'} text-xs px-2 py-1 rounded-full font-semibold capitalize flex-shrink-0">\${c.status}</span>
      </div>
      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="glass rounded-lg p-2.5"><div class="text-xs text-slate-500">Spend</div><div class="text-sm font-bold text-white">\${c.spend}</div></div>
        <div class="glass rounded-lg p-2.5"><div class="text-xs text-slate-500">Revenue</div><div class="text-sm font-bold text-brand-400">\${c.revenue}</div></div>
        <div class="glass rounded-lg p-2.5"><div class="text-xs text-slate-500">ROAS</div><div class="text-sm font-bold text-\${roasColor}-400">\${c.roas}\${c.roas!=='—'?'x':''}</div></div>
        <div class="glass rounded-lg p-2.5"><div class="text-xs text-slate-500">CTR</div><div class="text-sm font-bold text-slate-200">\${c.ctr}\${c.ctr!=='—'?'%':''}</div></div>
      </div>
      <div class="glass rounded-lg p-2.5 flex items-start gap-2">
        <i class="fas fa-brain text-brand-400 text-xs mt-0.5 flex-shrink-0"></i>
        <p class="text-xs text-slate-400">\${c.aiNote}</p>
      </div>
      </div>
    </div>\`;
  }

  // ── Export ────────────────────────────────────────────────────────────────
  function exportCampaigns() {
    const rows = [['Name','Platforms','Status','Spend','Revenue','ROAS','CTR']];
    CAMPAIGNS.forEach(c => rows.push([c.name, c.platforms.join(';'), c.status, c.spend, c.revenue, c.roas, c.ctr]));
    const csv = rows.map(r => r.map(v => '"' + v + '"').join(',')).join('\\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'adnova-campaigns-' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    showToast('📊 Campaigns exported as CSV');
  }
  </script>
  `
  return shell('Campaigns', content, '/campaigns', lang)
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

function campaignCard(id: string, name: string, platforms: string[], status: string, spend: string, revenue: string, roas: string, ctr: string, scaleIn: number, aiNote: string, impressions: number, clicks: number): string {
  const statusClass = status === 'scaling' ? 'badge-scaling' : status === 'live' ? 'badge-live' : status === 'paused' ? 'badge-paused' : status === 'draft' ? 'badge-draft' : 'badge-killed'
  const platformIcons: Record<string, string> = { Facebook: 'fab fa-facebook', Google: 'fab fa-google', Instagram: 'fab fa-instagram', TikTok: 'fab fa-tiktok', Snapchat: 'fab fa-snapchat', LinkedIn: 'fab fa-linkedin-in', Pinterest: 'fab fa-pinterest-p', 'X/Twitter': 'fab fa-x-twitter', YouTube: 'fab fa-youtube' }
  const platformColors: Record<string, string> = { Facebook: '#A8A8A8', Google: '#A8A8A8', Instagram: '#A8A8A8', TikTok: '#A8A8A8', Snapchat: '#F7C900', LinkedIn: '#A8A8A8', Pinterest: '#e60023', 'X/Twitter': '#14171a', YouTube: '#A8A8A8' }
  const roasNum = parseFloat(roas)
  const roasColor = roasNum >= 4.5 ? 'brand' : roasNum >= 3.5 ? 'slate' : roas === '—' ? 'slate' : 'brand'

  return `<div class="glass rounded-2xl p-5 card-hover cursor-pointer camp-card-wrapper relative" data-id="${id}" data-name="${name.toLowerCase()}" data-platforms="${platforms.join(',').toLowerCase()}" data-status="${status}">
    <!-- Hover action buttons -->
    <div class="camp-card-actions absolute top-3 right-3 flex items-center gap-1 z-10">
      <button onclick="event.stopPropagation();editCampaign('${id}')" title="Edit" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-slate-500/20 text-slate-400 transition-all border border-slate-500/20">
        <i class="fas fa-edit text-xs"></i>
      </button>
      <button onclick="event.stopPropagation();openDeleteModal('${id}')" title="Delete" class="w-7 h-7 glass rounded-lg flex items-center justify-center hover:bg-slate-500/20 text-slate-400 transition-all border border-slate-500/20">
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>
    <div onclick="openCampaignDetail('${id}')">
    <div class="flex items-start justify-between mb-3 pr-16">
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-white text-sm leading-tight camp-card-name">${name}</h3>
        <div class="flex flex-wrap items-center gap-1.5 mt-1.5">
          ${platforms.map(p => `<span class="text-xs px-2 py-0.5 rounded-full" style="background:${platformColors[p] || '#666'}30;color:${platformColors[p] || '#aaa'}">
            <i class="${platformIcons[p] || 'fas fa-ad'} mr-1"></i>${p}
          </span>`).join('')}
        </div>
      </div>
      <span class="camp-status-badge ${statusClass} text-xs px-2 py-1 rounded-full font-semibold capitalize flex-shrink-0">${status}</span>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-3">
      <div class="glass rounded-lg p-2.5">
        <div class="text-xs text-slate-500">Spend</div>
        <div class="text-sm font-bold text-white">${spend}</div>
      </div>
      <div class="glass rounded-lg p-2.5">
        <div class="text-xs text-slate-500">Revenue</div>
        <div class="text-sm font-bold text-brand-400">${revenue}</div>
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
        <div class="progress-fill bg-gradient-to-r from-brand-500 to-brand-500" style="width:${Math.max(10, 100 - (scaleIn / 72 * 100))}%"></div>
      </div>
    </div>` : ''}
    </div>
  </div>`
}

function platformSelector(name: string, icon: string, color: string, selected: boolean): string {
  return `<button onclick="this.classList.toggle('ring-2'); this.classList.toggle('ring-brand-500'); this.classList.toggle('bg-brand-500/10')"
    data-platform="${name}"
    class="platform-pill glass rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-white/10 transition-all ${selected ? 'ring-2 ring-brand-500 bg-brand-500/10' : ''}">
    <i class="${icon} text-xl" style="color:${color}"></i>
    <span class="text-xs text-slate-400">${name}</span>
  </button>`
}

function aiToggle(id: string, label: string, desc: string, checked: boolean): string {
  return `<div class="flex items-center justify-between py-2 border-b border-white/5">
    <div>
      <div class="text-sm font-medium text-slate-300">${label}</div>
      <div class="text-xs text-slate-600">${desc}</div>
    </div>
    <button id="${id}-toggle" onclick="this.classList.toggle('bg-brand-600'); this.classList.toggle('bg-white/10'); this.querySelector('div').classList.toggle('translate-x-4')"
      class="w-10 h-6 rounded-full ${checked ? 'bg-brand-600' : 'bg-white/10'} relative transition-all flex-shrink-0">
      <div class="w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${checked ? 'translate-x-4' : ''}"></div>
    </button>
  </div>`
}
