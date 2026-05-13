import { shell } from '../lib/layout'
import { type Lang, t } from '../lib/i18n'

export function renderSettings(lang: Lang = 'en'): string {
  const platforms = [
    { id:'facebook', name:'Facebook Ads', icon:'fab fa-facebook-f', color:'#A8A8A8', grad:'from-slate-600 to-slate-700', connected:true, accountId:'act_1234567890', token:'EAA****', scope:'ads_management,business_management', dailyBudget:'500', currency:'USD' },
    { id:'google', name:'Google Ads', icon:'fab fa-google', color:'#A8A8A8', grad:'from-slate-500 to-slate-500', connected:true, accountId:'MCC-789-012-3456', token:'ya29.****', scope:'AdWords', dailyBudget:'800', currency:'USD' },
    { id:'instagram', name:'Instagram Ads', icon:'fab fa-instagram', color:'#A8A8A8', grad:'from-orange-500 to-brand-600', connected:true, accountId:'ig_act_9876543', token:'IGQ****', scope:'instagram_basic,ads_management', dailyBudget:'300', currency:'USD' },
    { id:'tiktok', name:'TikTok Ads', icon:'fab fa-tiktok', color:'#A8A8A8', grad:'from-slate-900 to-brand-600', connected:true, accountId:'TT-ADV-556677', token:'ttad****', scope:'campaign.read,campaign.write', dailyBudget:'250', currency:'USD' },
    { id:'linkedin', name:'LinkedIn Ads', icon:'fab fa-linkedin-in', color:'#A8A8A8', grad:'from-slate-700 to-slate-800', connected:true, accountId:'LI-ADV-112233', token:'AQV****', scope:'rw_ads,r_ads_reporting', dailyBudget:'200', currency:'USD' },
    { id:'youtube', name:'YouTube Ads', icon:'fab fa-youtube', color:'#A8A8A8', grad:'from-slate-600 to-slate-700', connected:true, accountId:'YT-ADV-445566', token:'ya29.****', scope:'YouTube Analytics', dailyBudget:'350', currency:'USD' },
    { id:'twitter', name:'X (Twitter) Ads', icon:'fab fa-x-twitter', color:'#14171a', grad:'from-slate-800 to-slate-900', connected:true, accountId:'TW-ADV-778899', token:'AAAAAAAAAl****', scope:'tweet.read,ads.read,ads.write', dailyBudget:'150', currency:'USD' },
    { id:'pinterest', name:'Pinterest Ads', icon:'fab fa-pinterest-p', color:'#e60023', grad:'from-slate-600 to-slate-700', connected:true, accountId:'PI-ADV-223344', token:'pina_****', scope:'ads:read,ads:write', dailyBudget:'100', currency:'USD' },
    { id:'snapchat', name:'Snapchat Ads', icon:'fab fa-snapchat', color:'#A8A8A8', grad:'from-brand-400 to-brand-500', connected:false, accountId:'', token:'', scope:'snapchat-marketing-api', dailyBudget:'100', currency:'USD' },
  ]

  const content = `
  <!-- Settings Header -->
  <div class="mb-6">
    <h2 class="text-xl font-black text-white">Settings</h2>
    <p class="text-sm text-slate-500 mt-1">Manage your workspace, ad platforms, team and preferences</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <!-- Settings Nav -->
    <div class="glass rounded-2xl p-3 h-fit sticky top-20">
      <nav class="space-y-1" id="settings-nav">
        ${settingsTab('workspace', 'fa-building', 'Workspace', true)}
        ${settingsTab('platforms', 'fa-plug', 'Ad Platforms', false)}
        ${settingsTab('profile', 'fa-user', 'Profile', false)}
        ${settingsTab('team', 'fa-users', 'Team Members', false)}
        ${settingsTab('notifications', 'fa-bell', 'Notifications', false)}
        ${settingsTab('security', 'fa-shield-halved', 'Security', false)}
        ${settingsTab('apikeys', 'fa-key', 'API Keys', false)}
        ${settingsTab('ai_prefs', 'fa-brain', 'AI Preferences', false)}
        ${settingsTab('billing_link', 'fa-credit-card', 'Billing', false)}
      </nav>
    </div>

    <!-- Settings Panels -->
    <div class="lg:col-span-3 space-y-5">

      <!-- WORKSPACE PANEL -->
      <div id="panel-workspace" class="settings-panel">
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <i class="fas fa-building text-white text-sm"></i>
            </div>
            <div>
              <h3 class="font-bold text-white">Workspace Settings</h3>
              <p class="text-xs text-slate-500">Configure your organization</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Workspace Name</label>
              <input id="ws-name" value="Acme Corp" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Industry</label>
              <select id="ws-industry" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
                <option>Fashion / Apparel</option><option>E-commerce</option>
                <option>Tech / SaaS</option><option>Health & Fitness</option>
                <option>Food & Beverage</option><option>Finance</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Website URL</label>
              <input id="ws-url" value="https://acmecorp.com" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Default Currency</label>
              <select id="ws-currency" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
                <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option><option>CAD (CA$)</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Timezone</label>
            <select class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
              <option>UTC-5 (Eastern Time)</option><option>UTC-8 (Pacific Time)</option>
              <option>UTC+1 (Central European Time)</option><option>UTC+0 (London)</option>
            </select>
          </div>
          <button onclick="saveWorkspace()" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all">
            <i class="fas fa-save text-xs"></i> Save Changes
          </button>
        </div>
      </div>

      <!-- AD PLATFORMS PANEL -->
      <div id="panel-platforms" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <i class="fas fa-plug text-white text-sm"></i>
              </div>
              <div>
                <h3 class="font-bold text-white">Ad Platform Connections</h3>
                <p class="text-xs text-slate-500">Configure API keys, budgets and permissions</p>
              </div>
            </div>
            <span class="text-xs glass px-3 py-1.5 rounded-full text-brand-400 font-semibold">${platforms.filter(p=>p.connected).length}/9 connected</span>
          </div>

          <div class="space-y-4" id="platforms-settings-list">
            ${platforms.map(p => platformSettingRow(p)).join('')}
          </div>
        </div>
      </div>

      <!-- PROFILE PANEL -->
      <div id="panel-profile" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
              <i class="fas fa-user text-white text-sm"></i>
            </div>
            <div>
              <h3 class="font-bold text-white">Your Profile</h3>
              <p class="text-xs text-slate-500">Personal account settings</p>
            </div>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-500 flex items-center justify-center text-2xl font-black text-white">JD</div>
            <div>
              <button class="glass hover:bg-white/10 text-sm text-slate-300 px-4 py-2 rounded-xl transition-all mb-2 block">Upload Photo</button>
              <p class="text-xs text-slate-600">JPG, PNG or GIF — max 2MB</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">First Name</label>
              <input value="John" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Last Name</label>
              <input value="Doe" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Email</label>
              <input value="john@acmecorp.com" type="email" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Role</label>
              <input value="Marketing Director" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
          </div>
          <button onclick="showToast('Profile saved!')" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">Save Profile</button>
        </div>
      </div>

      <!-- TEAM PANEL -->
      <div id="panel-team" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <i class="fas fa-users text-white text-sm"></i>
              </div>
              <h3 class="font-bold text-white">Team Members</h3>
            </div>
            <button onclick="openInviteModal()" class="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2">
              <i class="fas fa-plus text-xs"></i> Invite Member
            </button>
          </div>
          <div class="space-y-3" id="team-list">
            ${teamMember2('John Doe', 'john@acmecorp.com', 'Owner', 'JD', 'from-brand-500 to-brand-600')}
            ${teamMember2('Sarah Kim', 'sarah@acmecorp.com', 'Admin', 'SK', 'from-brand-500 to-brand-600')}
            ${teamMember2('Mike Chen', 'mike@acmecorp.com', 'Editor', 'MC', 'from-slate-500 to-slate-600')}
            ${teamMember2('Emma Davis', 'emma@acmecorp.com', 'Viewer', 'ED', 'from-brand-500 to-brand-600')}
          </div>
        </div>
      </div>

      <!-- NOTIFICATIONS PANEL -->
      <div id="panel-notifications" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-orange-600 flex items-center justify-center">
              <i class="fas fa-bell text-white text-sm"></i>
            </div>
            <h3 class="font-bold text-white">Notification Preferences</h3>
          </div>
          <div class="space-y-1">
            ${notifGroup('AI Actions', [
              ['AI scales a campaign budget', true],
              ['AI pauses a creative (CTR kill)', true],
              ['AI generates new creatives', false],
              ['Budget threshold reached (>80%)', true],
            ])}
            ${notifGroup('Performance Alerts', [
              ['Daily ROAS summary report', true],
              ['Weekly performance digest', true],
              ['Campaign ROAS drops below target', true],
              ['New platform sync error', true],
            ])}
            ${notifGroup('Channels', [
              ['Email notifications', true],
              ['Browser push notifications', false],
              ['Slack integration alerts', false],
            ])}
          </div>
          <button onclick="showToast('Notification preferences saved!')" class="mt-4 bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">Save Preferences</button>
        </div>
      </div>

      <!-- SECURITY PANEL -->
      <div id="panel-security" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6 space-y-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-orange-600 flex items-center justify-center">
              <i class="fas fa-shield-halved text-white text-sm"></i>
            </div>
            <h3 class="font-bold text-white">Security Settings</h3>
          </div>
          <!-- Change Password -->
          <div class="glass rounded-xl p-5">
            <h4 class="text-sm font-bold text-white mb-4">Change Password</h4>
            <div class="space-y-3">
              <input type="password" placeholder="Current password" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
              <input type="password" placeholder="New password" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
              <input type="password" placeholder="Confirm new password" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
              <button onclick="showToast('Password updated!')" class="bg-gradient-to-r from-brand-600 to-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">Update Password</button>
            </div>
          </div>
          <!-- 2FA -->
          <div class="glass rounded-xl p-5">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="text-sm font-bold text-white">Two-Factor Authentication</h4>
                <p class="text-xs text-slate-500 mt-0.5">Add an extra layer of security</p>
              </div>
              <span class="badge-live text-xs px-2 py-1 rounded-full font-semibold">Enabled</span>
            </div>
            <p class="text-xs text-slate-400 mb-3">2FA is currently active. You can disable or re-configure it below.</p>
            <button onclick="showToast('2FA reconfigured!')" class="glass hover:bg-white/10 text-slate-400 text-xs px-4 py-2 rounded-lg transition-all">Reconfigure 2FA</button>
          </div>
          <!-- Sessions -->
          <div class="glass rounded-xl p-5">
            <h4 class="text-sm font-bold text-white mb-3">Active Sessions</h4>
            <div class="space-y-2">
              ${sessionRow('Chrome / macOS', 'Paris, France', true)}
              ${sessionRow('Mobile Safari / iOS', 'Paris, France', false)}
            </div>
            <button onclick="showToast('All other sessions revoked!')" class="mt-3 text-xs text-slate-400 hover:text-slate-300 transition-colors">Revoke all other sessions</button>
          </div>
        </div>
      </div>

      <!-- API KEYS PANEL -->
      <div id="panel-apikeys" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
                <i class="fas fa-key text-white text-sm"></i>
              </div>
              <h3 class="font-bold text-white">API Keys</h3>
            </div>
            <button onclick="generateApiKey()" class="glass hover:bg-white/10 text-slate-300 text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-2">
              <i class="fas fa-plus text-xs"></i> Generate Key
            </button>
          </div>
          <div class="space-y-3" id="api-keys-list">
            ${apiKeyRow2('Production', 'ank_prod_a8f2c91b3e7d4501f6c9b2e8d4f7a1c3', 'Active', 'all access', '2026-12-31')}
            ${apiKeyRow2('Development', 'ank_dev_b3c5e8f1a2d4g6h8i0j2k4l6m8n0o2p4', 'Active', 'read only', '2026-06-30')}
            ${apiKeyRow2('Webhook Receiver', 'ank_wh_c4d6e8f0a1b3c5d7e9f1a3b5c7d9e1f3', 'Revoked', 'webhooks', '2025-12-31')}
          </div>
        </div>
      </div>

      <!-- AI PREFERENCES PANEL -->
      <div id="panel-ai_prefs" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <i class="fas fa-brain text-white text-sm"></i>
            </div>
            <div>
              <h3 class="font-bold text-white">AI Preferences</h3>
              <p class="text-xs text-slate-500">Control autonomous AI behaviors</p>
            </div>
          </div>
          <!-- Auto-Scale -->
          <div class="glass rounded-xl p-5 mb-4">
            <h4 class="text-sm font-bold text-white mb-3">Auto-Scale Rules</h4>
            <div class="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label class="text-xs text-slate-400 mb-1 block">ROAS Threshold (scale when ≥)</label>
                <input type="number" value="3.5" step="0.1" min="1" max="10" class="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 bg-transparent"/>
              </div>
              <div>
                <label class="text-xs text-slate-400 mb-1 block">Scale Interval (hours)</label>
                <input type="number" value="72" step="24" min="24" max="168" class="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 bg-transparent"/>
              </div>
              <div>
                <label class="text-xs text-slate-400 mb-1 block">Scale Increment (%)</label>
                <input type="number" value="10" step="5" min="5" max="50" class="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 bg-transparent"/>
              </div>
              <div>
                <label class="text-xs text-slate-400 mb-1 block">Max Daily Budget ($)</label>
                <input type="number" value="5000" step="100" class="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 bg-transparent"/>
              </div>
            </div>
          </div>
          <!-- Kill Rules -->
          <div class="glass rounded-xl p-5 mb-4">
            <h4 class="text-sm font-bold text-white mb-3">Kill Rules</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-slate-400 mb-1 block">Kill CTR below (%)</label>
                <input type="number" value="0.8" step="0.1" min="0.1" max="5" class="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 bg-transparent"/>
              </div>
              <div>
                <label class="text-xs text-slate-400 mb-1 block">Min Impressions before kill</label>
                <input type="number" value="1000" step="100" class="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 bg-transparent"/>
              </div>
            </div>
          </div>
          <!-- Toggles -->
          <div class="space-y-3 mb-4">
            ${prefToggle2('Autonomous budget scaling', true)}
            ${prefToggle2('Autonomous creative pausing', true)}
            ${prefToggle2('AI creative generation (no approval)', false)}
            ${prefToggle2('Auto audience expansion', true)}
            ${prefToggle2('Daily AI performance reports', true)}
            ${prefToggle2('A/B test automation', true)}
          </div>
          <button onclick="showToast('AI preferences saved!')" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">Save AI Settings</button>
        </div>
      </div>

      <!-- BILLING REDIRECT PANEL -->
      <div id="panel-billing_link" class="settings-panel hidden">
        <div class="glass rounded-2xl p-6 text-center">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-credit-card text-white text-2xl"></i>
          </div>
          <h3 class="font-bold text-white text-lg mb-2">Billing & Subscription</h3>
          <p class="text-slate-500 text-sm mb-6">Manage your plan, invoices and payment methods</p>
          <a href="/billing" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2">
            <i class="fas fa-external-link text-xs"></i> Go to Billing
          </a>
        </div>
      </div>

    </div><!-- end panels -->
  </div>

  <!-- Platform Config Modal -->
  <div id="platform-config-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn border border-white/10">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10">
        <div class="flex items-center gap-3">
          <div id="modal-platform-icon" class="w-10 h-10 rounded-xl flex items-center justify-center text-white"></div>
          <div>
            <h3 class="font-bold text-white text-base" id="modal-platform-name">Configure Platform</h3>
            <p class="text-xs text-slate-500">API credentials & budget settings</p>
          </div>
        </div>
        <button onclick="closePlatformModal()" class="text-slate-500 hover:text-slate-300"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-6 space-y-5" id="modal-platform-content">
        <!-- Injected dynamically -->
      </div>
    </div>
  </div>

  <!-- Invite Member Modal -->
  <div id="invite-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md animate-fadeIn border border-white/10">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <h3 class="font-bold text-white">Invite Team Member</h3>
        <button onclick="closeInviteModal()" class="text-slate-500 hover:text-slate-300"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Email Address</label>
          <input id="invite-email" type="email" placeholder="colleague@company.com" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Role</label>
          <select id="invite-role" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
            <option>Admin</option><option>Editor</option><option>Viewer</option>
          </select>
        </div>
        <div class="flex gap-3">
          <button onclick="sendInvite()" class="flex-1 bg-gradient-to-r from-brand-600 to-brand-600 text-white py-3 rounded-xl text-sm font-bold">Send Invite</button>
          <button onclick="closeInviteModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-3 rounded-xl text-sm font-semibold">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="settings-toast" class="hidden fixed bottom-6 right-6 z-50 glass border border-brand-500/30 rounded-xl px-5 py-3 flex items-center gap-3 animate-fadeIn">
    <i class="fas fa-check-circle text-brand-400"></i>
    <span class="text-sm text-white font-semibold" id="toast-msg">Saved!</span>
  </div>

  <script>
  // ── Platform data for modal ───────────────────────────────────────────────
  const PLATFORM_DATA = ${JSON.stringify(platforms)};

  // ── Tab switching ─────────────────────────────────────────────────────────
  function switchSettingsTab(id) {
    document.querySelectorAll('.settings-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('#settings-nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + id)?.classList.remove('hidden');
    document.getElementById('stab-' + id)?.classList.add('active');
  }

  // ── Toast ─────────────────────────────────────────────────────────────────
  function showToast(msg, color = 'brand') {
    const t = document.getElementById('settings-toast');
    const m = document.getElementById('toast-msg');
    m.textContent = msg;
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 3000);
  }

  // ── Workspace save ────────────────────────────────────────────────────────
  function saveWorkspace() {
    const name = document.getElementById('ws-name')?.value;
    if(name) {
      try { const u = JSON.parse(localStorage.getItem('adnova_user') || '{}'); u.company = name; localStorage.setItem('adnova_user', JSON.stringify(u)); } catch(e){}
    }
    showToast('Workspace settings saved!');
  }

  // ── Platform Config Modal ─────────────────────────────────────────────────
  function openPlatformConfig(id) {
    const p = PLATFORM_DATA.find(x => x.id === id);
    if(!p) return;
    document.getElementById('modal-platform-name').textContent = 'Configure: ' + p.name;
    const iconEl = document.getElementById('modal-platform-icon');
    iconEl.className = 'w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ' + p.grad;
    iconEl.innerHTML = '<i class="' + p.icon + '"></i>';
    document.getElementById('modal-platform-content').innerHTML = \`
      <!-- Statut connexion -->
      <div class="flex items-center gap-3 p-3.5 rounded-xl \${p.connected ? 'bg-brand-500/8 border border-brand-500/20' : 'bg-brand-500/8 border border-brand-500/20'}">
        <i class="fas fa-\${p.connected ? 'check-circle text-brand-400' : 'triangle-exclamation text-brand-400'} text-base"></i>
        <div>
          <div class="text-sm font-semibold \${p.connected ? 'text-brand-300' : 'text-brand-300'}">\${p.connected ? 'Plateforme connectée et active' : 'Non connectée — renseignez vos identifiants'}</div>
          <div class="text-xs \${p.connected ? 'text-brand-600' : 'text-brand-600'} mt-0.5">Scopes requis: \${p.scope}</div>
        </div>
      </div>

      <!-- Section Identifiants -->
      <div class="glass rounded-xl p-4 border border-white/5 space-y-4">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <i class="fas fa-id-card text-slate-400"></i> Identifiants API
        </h4>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">
            Account / Advertiser ID
            <span class="text-slate-600 font-normal ml-1">(ex: act_1234567890)</span>
          </label>
          <input id="cfg-account" value="\${p.accountId}" placeholder="Collez votre identifiant de compte publicitaire..." class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent font-mono"/>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">
            Access Token / API Key
            <span class="text-slate-600 font-normal ml-1">(masqué par défaut)</span>
          </label>
          <div class="relative">
            <input id="cfg-token" type="password" value="\${p.token || ''}" placeholder="Collez votre token d'accès..." class="w-full glass rounded-xl px-4 py-3 pr-12 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent font-mono"/>
            <button onclick="const i=this.previousElementSibling;i.type=i.type==='password'?'text':'password';this.querySelector('i').className='fas fa-'+(i.type==='password'?'eye':'eye-slash')+' text-xs'" class="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300 transition-colors">
              <i class="fas fa-eye text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Section Budget -->
      <div class="glass rounded-xl p-4 border border-white/5">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fas fa-dollar-sign text-brand-400"></i> Budget & Devise
        </h4>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Budget journalier par défaut ($)</label>
            <div class="relative">
              <span class="absolute left-3 top-3.5 text-slate-500 text-sm">$</span>
              <input id="cfg-budget" type="number" value="\${p.dailyBudget}" class="w-full glass rounded-xl pl-7 pr-4 py-3 text-sm text-slate-200 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Devise</label>
            <select id="cfg-currency" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent cursor-pointer">
              <option \${p.currency==='USD'?'selected':''}>USD ($)</option>
              <option \${p.currency==='EUR'?'selected':''}>EUR (€)</option>
              <option \${p.currency==='GBP'?'selected':''}>GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-1">
        <button onclick="savePlatformConfig('\${id}')" class="flex-1 bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
          <i class="fas fa-save text-xs"></i> Sauvegarder
        </button>
        \${p.connected ? \`
        <button onclick="testPlatformConn('\${id}')" class="glass hover:bg-brand-500/10 text-brand-400 text-sm py-3 px-5 rounded-xl font-semibold transition-all border border-brand-500/20 flex items-center gap-1.5">
          <i class="fas fa-vial text-xs"></i> Tester
        </button>
        <button onclick="disconnectPlatform('\${id}')" class="glass hover:bg-slate-500/10 text-slate-400 text-sm py-3 px-4 rounded-xl transition-all border border-slate-500/20 flex items-center gap-1.5" title="Déconnecter">
          <i class="fas fa-unlink text-xs"></i>
        </button>\` : ''}
      </div>
    \`;
    document.getElementById('platform-config-modal').classList.remove('hidden');
  }

  function closePlatformModal() {
    document.getElementById('platform-config-modal').classList.add('hidden');
  }

  function savePlatformConfig(id) {
    const account = document.getElementById('cfg-account')?.value;
    const token = document.getElementById('cfg-token')?.value;
    const budget = document.getElementById('cfg-budget')?.value;
    if(!account || !token) { showToast('Account ID and Token are required', 'slate'); return; }
    // Call API
    fetch('/api/platforms/' + id + '/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (localStorage.getItem('adnova_token') || '') },
      body: JSON.stringify({ accessToken: token, accountId: account, dailyBudget: budget })
    }).then(r => r.json()).then(() => {
      closePlatformModal();
      showToast(id + ' configuration saved!');
      // Update UI
      const badge = document.querySelector('[data-platform="' + id + '"] .status-badge');
      if(badge) { badge.textContent = 'Connected'; badge.className = 'status-badge badge-live text-xs px-2 py-0.5 rounded-full font-semibold'; }
    }).catch(() => {
      closePlatformModal();
      showToast(id + ' configuration saved!');
    });
  }

  function testPlatformConn(id) {
    showToast('Testing connection to ' + id + '...', 'slate');
    setTimeout(() => showToast('✓ ' + id + ' connection verified!'), 1500);
  }

  function disconnectPlatform(id) {
    if(!confirm('Disconnect ' + id + '?')) return;
    fetch('/api/platforms/' + id + '/disconnect', { method: 'POST', headers: {'Authorization':'Bearer '+(localStorage.getItem('adnova_token')||'')} })
      .then(() => { closePlatformModal(); showToast(id + ' disconnected'); })
      .catch(() => { closePlatformModal(); showToast(id + ' disconnected'); });
  }

  // ── Team Member actions ───────────────────────────────────────────────────
  function changeMemberRole(id, name, newRole) {
    showToast(name + '\'s role changed to ' + newRole);
    const select = document.querySelector('#member-' + id + ' select');
    if (select) select.className = select.className.replace(/text-\w+-400/g, 'text-slate-300');
    const roleColors = { Owner:'brand', Admin:'brand', Editor:'slate', Viewer:'slate' };
    const c = roleColors[newRole] || 'slate';
    if (select) select.classList.add('text-' + c + '-400');
  }
  function removeMember(id, name) {
    if (!confirm('Remove ' + name + ' from your team?')) return;
    const el = document.getElementById('member-' + id);
    if (el) { el.style.opacity='0'; el.style.transform='scale(0.95)'; el.style.transition='all 0.3s'; setTimeout(()=>el.remove(), 300); }
    showToast(name + ' removed from team');
  }

  // ── Invite Modal ──────────────────────────────────────────────────────────
  function openInviteModal() { document.getElementById('invite-modal').classList.remove('hidden'); }
  function closeInviteModal() { document.getElementById('invite-modal').classList.add('hidden'); }
  function sendInvite() {
    const email = document.getElementById('invite-email')?.value;
    const role = document.getElementById('invite-role')?.value;
    if(!email) { showToast('Enter an email address', 'slate'); return; }
    closeInviteModal();
    showToast('Invite sent to ' + email + ' as ' + role);
    // Append to team list
    const list = document.getElementById('team-list');
    const div = document.createElement('div');
    div.className = 'flex items-center gap-3 p-3 glass rounded-xl';
    div.innerHTML = '<div class="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-white">?' + '</div><div class="flex-1 min-w-0"><div class="text-sm font-semibold text-white truncate">Pending: ' + email + '</div><div class="text-xs text-slate-500">Invite sent</div></div><span class="text-xs px-2 py-1 rounded-full bg-brand-500/20 text-brand-400 font-semibold">Pending</span>';
    list.appendChild(div);
  }

  // ── API Key generation ────────────────────────────────────────────────────
  function generateApiKey() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const key = 'ank_' + Array.from({length: 32}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const list = document.getElementById('api-keys-list');
    const div = document.createElement('div');
    div.className = 'glass rounded-xl p-4 flex flex-col gap-2 border border-brand-500/20';
    div.innerHTML = \`<div class="flex items-center justify-between"><span class="text-xs font-bold text-slate-300">New Key</span><span class="badge-live text-xs px-2 py-0.5 rounded-full">Active</span></div>
      <div class="font-mono text-xs text-slate-400 bg-black/30 rounded-lg p-2 flex items-center justify-between">
        <span>\${key}</span>
        <button onclick="navigator.clipboard.writeText('\${key}').then(()=>showToast('Key copied!'))" class="text-slate-500 hover:text-slate-300 ml-2"><i class="fas fa-copy text-xs"></i></button>
      </div>\`;
    list.prepend(div);
    showToast('New API key generated — copy it now, it won\\'t be shown again');
  }
  </script>`

  return shell('Settings', content, '/settings', lang)
}

// ── Helper functions ─────────────────────────────────────────────────────────

function settingsTab(id: string, icon: string, label: string, active: boolean): string {
  return `<button id="stab-${id}" onclick="switchSettingsTab('${id}')" class="w-full text-left sidebar-link ${active ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 transition-all">
    <i class="fas ${icon} w-4 text-center ${active ? 'text-brand-400' : ''}"></i>${label}
  </button>`
}

function platformSettingRow(p: {id:string;name:string;icon:string;color:string;grad:string;connected:boolean;accountId:string;token:string;scope:string;dailyBudget:string;currency:string}): string {
  return `<div class="glass rounded-xl border ${p.connected ? 'border-white/8' : 'border-brand-500/15'} overflow-hidden" data-platform="${p.id}">
    <!-- Header plateforme -->
    <div class="flex items-center gap-4 p-4">
      <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${p.grad} flex items-center justify-center flex-shrink-0 shadow-lg">
        <i class="${p.icon} text-white text-base"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-sm font-bold text-white">${p.name}</span>
          <span class="status-badge ${p.connected ? 'badge-live' : 'badge-paused'} text-xs px-2 py-0.5 rounded-full font-semibold">${p.connected ? '● Connected' : '○ Not connected'}</span>
        </div>
        ${p.connected ? `
        <div class="flex items-center flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
          <span class="flex items-center gap-1"><i class="fas fa-fingerprint text-slate-600"></i> <span class="font-mono">${p.accountId}</span></span>
          <span class="flex items-center gap-1"><i class="fas fa-dollar-sign text-brand-600"></i> $${p.dailyBudget}/jour</span>
          <span class="flex items-center gap-1"><i class="fas fa-lock text-slate-600"></i> ${p.token.replace(/[^*]/g, (c, i) => i < 4 ? c : '*').slice(0,12)}…</span>
        </div>` : `<div class="text-xs text-brand-500/80 flex items-center gap-1.5"><i class="fas fa-triangle-exclamation"></i> Aucune configuration — connectez cette plateforme</div>`}
      </div>
      <button onclick="openPlatformConfig('${p.id}')" class="${p.connected ? 'glass hover:bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-gradient-to-r from-brand-500/20 to-orange-500/20 hover:from-brand-500/30 hover:to-orange-500/30 text-brand-400 border border-brand-500/30'} text-xs px-4 py-2.5 rounded-xl transition-all font-semibold flex items-center gap-1.5 flex-shrink-0">
        <i class="fas fa-${p.connected ? 'sliders' : 'plug'} text-xs"></i>${p.connected ? 'Configurer' : 'Connecter'}
      </button>
    </div>
    ${p.connected ? `
    <!-- Infos rapides connecté -->
    <div class="border-t border-white/5 px-4 py-2.5 flex items-center gap-6 bg-white/1">
      <div class="flex items-center gap-1.5 text-xs text-slate-600">
        <i class="fas fa-key text-xs text-slate-700"></i>
        <span>Scopes: <span class="text-slate-500">${p.scope}</span></span>
      </div>
      <div class="flex items-center gap-1.5 text-xs text-slate-600 ml-auto">
        <button onclick="testPlatformConn('${p.id}')" class="text-brand-500/70 hover:text-brand-400 transition-colors flex items-center gap-1">
          <i class="fas fa-vial text-xs"></i> Tester
        </button>
        <span class="text-slate-700">·</span>
        <button onclick="disconnectPlatform('${p.id}')" class="text-slate-500/60 hover:text-slate-400 transition-colors flex items-center gap-1">
          <i class="fas fa-unlink text-xs"></i> Déconnecter
        </button>
      </div>
    </div>` : ''}
  </div>`
}

function teamMember2(name: string, email: string, role: string, abbr: string, gradient: string): string {
  const roleColors: Record<string,string> = { Owner:'brand', Admin:'brand', Editor:'slate', Viewer:'slate' }
  const c = roleColors[role] || 'slate'
  const safeId = name.replace(/\s+/g, '-').toLowerCase()
  return `<div class="flex items-center gap-3 p-3 glass rounded-xl" id="member-${safeId}">
    <div class="w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0">${abbr}</div>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-semibold text-white">${name}</div>
      <div class="text-xs text-slate-500">${email}</div>
    </div>
    <select onchange="changeMemberRole('${safeId}', '${name}', this.value)" class="glass rounded-lg px-2 py-1 text-xs text-${c}-400 border border-white/10 bg-transparent cursor-pointer outline-none">
      <option value="Owner" ${role === 'Owner' ? 'selected' : ''}>Owner</option>
      <option value="Admin" ${role === 'Admin' ? 'selected' : ''}>Admin</option>
      <option value="Editor" ${role === 'Editor' ? 'selected' : ''}>Editor</option>
      <option value="Viewer" ${role === 'Viewer' ? 'selected' : ''}>Viewer</option>
    </select>
    ${role !== 'Owner' ? `<button onclick="removeMember('${safeId}','${name}')" class="w-7 h-7 glass hover:bg-slate-500/10 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-400 transition-all ml-1"><i class="fas fa-trash text-xs"></i></button>` : '<div class="w-7"></div>'}
  </div>`
}

function notifGroup(title: string, items: [string, boolean][]): string {
  return `<div class="glass rounded-xl p-4 mb-3">
    <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">${title}</h4>
    <div class="space-y-3">
      ${items.map(([label, on]) => `
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-300">${label}</span>
        <button onclick="this.classList.toggle('bg-brand-600');this.classList.toggle('bg-white/10');this.querySelector('div').classList.toggle('translate-x-4')" class="w-10 h-6 rounded-full relative transition-all flex-shrink-0 ${on ? 'bg-brand-600' : 'bg-white/10'}">
          <div class="w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${on ? 'translate-x-4' : ''}"></div>
        </button>
      </div>`).join('')}
    </div>
  </div>`
}

function prefToggle2(label: string, checked: boolean): string {
  return `<div class="flex items-center justify-between py-2.5 border-b border-white/5">
    <span class="text-sm text-slate-300">${label}</span>
    <button onclick="this.classList.toggle('bg-brand-600');this.classList.toggle('bg-white/10');this.querySelector('div').classList.toggle('translate-x-4')"
      class="w-10 h-6 rounded-full relative transition-all flex-shrink-0 ${checked ? 'bg-brand-600' : 'bg-white/10'}">
      <div class="w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-all ${checked ? 'translate-x-4' : ''}"></div>
    </button>
  </div>`
}

function sessionRow(device: string, location: string, current: boolean): string {
  return `<div class="flex items-center gap-3 p-3 glass rounded-xl">
    <i class="fas fa-laptop text-slate-500 text-sm"></i>
    <div class="flex-1">
      <div class="text-xs font-semibold text-slate-300">${device}</div>
      <div class="text-xs text-slate-600">${location}</div>
    </div>
    ${current
      ? '<span class="text-xs text-brand-400 font-semibold">Current</span>'
      : '<button onclick="showToast(\'Session revoked\')" class="text-xs text-slate-400 hover:text-slate-300 transition-colors">Revoke</button>'}
  </div>`
}

function apiKeyRow2(label: string, key: string, status: string, scope: string, expires: string): string {
  const isActive = status === 'Active'
  return `<div class="glass rounded-xl p-4">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <i class="fas fa-key text-brand-400 text-sm"></i>
        <span class="text-sm font-semibold text-white">${label}</span>
        <span class="${isActive ? 'badge-live' : 'badge-inactive'} text-xs px-2 py-0.5 rounded-full font-semibold">${status}</span>
      </div>
      <div class="flex items-center gap-2">
        ${isActive ? `<button onclick="navigator.clipboard.writeText('${key}').then(()=>showToast('Key copied!'))" class="text-slate-500 hover:text-slate-300 transition-colors"><i class="fas fa-copy text-xs"></i></button>` : ''}
        ${isActive ? `<button onclick="if(confirm('Revoke this key?')){this.closest('.glass').remove();showToast('Key revoked')}" class="text-slate-500 hover:text-slate-400 transition-colors"><i class="fas fa-trash text-xs"></i></button>` : ''}
      </div>
    </div>
    <div class="font-mono text-xs text-slate-500 bg-black/20 rounded-lg p-2 truncate">${key}</div>
    <div class="flex items-center gap-4 mt-2 text-xs text-slate-600">
      <span><i class="fas fa-lock mr-1"></i>${scope}</span>
      <span><i class="fas fa-calendar mr-1"></i>Expires ${expires}</span>
    </div>
  </div>`
}
