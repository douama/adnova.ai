import type { Context } from 'hono'
import { adminShell } from '../layout'

export const renderAdminConfig = (c: Context) => {
  const content = `
  <style>
    /* ── Config page form inputs — overrides any Tailwind input default ── */
    .cfg-field{display:flex;flex-direction:column;gap:6px}
    .cfg-field label{font-size:11px;font-weight:600;color:var(--muted2);letter-spacing:0.02em}
    .cfg-input-wrap{position:relative;display:flex;align-items:stretch;gap:6px}
    .cfg-input-wrap input{flex:1;min-width:0;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 12px;font-size:13px;color:var(--white);outline:none;transition:border-color 0.15s,background 0.15s,box-shadow 0.15s;letter-spacing:-0.005em;color-scheme:dark}
    .cfg-input-wrap input::placeholder{color:var(--muted)}
    .cfg-input-wrap input:hover{border-color:var(--border2);background:var(--card2)}
    .cfg-input-wrap input:focus{border-color:var(--orange);background:var(--card2);box-shadow:0 0 0 3px rgba(255,77,0,0.12)}
    /* Kill browser autofill yellow */
    .cfg-input-wrap input:-webkit-autofill,
    .cfg-input-wrap input:-webkit-autofill:hover,
    .cfg-input-wrap input:-webkit-autofill:focus{
      -webkit-text-fill-color:var(--white);
      -webkit-box-shadow:0 0 0 1000px var(--card) inset;
      caret-color:var(--white);
      transition:background-color 5000s ease-in-out 0s;
    }
    /* Hide number input spinners — cleaner look for thresholds */
    .cfg-input-wrap input[type=number]::-webkit-inner-spin-button,
    .cfg-input-wrap input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
    .cfg-input-wrap input[type=number]{-moz-appearance:textfield}
    /* Reveal / copy buttons next to password inputs */
    .cfg-eye{width:36px;flex-shrink:0;background:var(--card);border:1px solid var(--border);border-radius:10px;color:var(--muted2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
    .cfg-eye:hover{color:var(--white);border-color:var(--border2);background:var(--card2)}
    .cfg-eye:active{transform:scale(0.95)}
    /* Section subgroup headings inside Plans card */
    .cfg-subhead{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.14em;margin-top:6px}
  </style>

  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-xl font-black text-white">Configuration Plateforme</h2>
      <p class="text-xs text-slate-500 mt-0.5">Paramètres globaux du système AdNova AI</p>
    </div>
    <div class="flex items-center gap-3">
      <button onclick="saveConfig()" class="bg-gradient-to-r from-orange-500 to-slate-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg">
        <i class="fas fa-save mr-1.5"></i> Enregistrer tout
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- AI Engine Config -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-5">
        <div class="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <i class="fas fa-brain text-orange-400 text-sm"></i>
        </div>
        <h3 class="font-bold text-white">Moteur IA</h3>
      </div>
      <div class="space-y-4">
        ${configInput('Seuil ROAS pour scale', 'ai_scale_threshold', '3.5', 'number')}
        ${configInput('% augmentation budget scale', 'ai_scale_pct', '10', 'number')}
        ${configInput('Intervalle scale (heures)', 'ai_scale_interval', '72', 'number')}
        ${configInput('Seuil CTR kill (min %)', 'ai_kill_ctr', '0.8', 'number')}
        ${configInput('Impressions min avant kill', 'ai_kill_impressions', '1000', 'number')}
        ${configInput('Précision min prédiction (%)', 'ai_min_accuracy', '85', 'number')}
      </div>
    </div>

    <!-- Plans & Limits -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-5">
        <div class="w-8 h-8 rounded-xl bg-slate-500/20 flex items-center justify-center">
          <i class="fas fa-tags text-slate-400 text-sm"></i>
        </div>
        <h3 class="font-bold text-white">Plans & Limites</h3>
      </div>
      <div class="space-y-4">
        <h4 class="cfg-subhead">Starter ($299/m)</h4>
        ${configInput('Campagnes max', 'starter_campaigns', '10', 'number')}
        ${configInput('Créatifs max', 'starter_creatives', '50', 'number')}
        <h4 class="cfg-subhead">Growth ($799/m)</h4>
        ${configInput('Campagnes max', 'growth_campaigns', '50', 'number')}
        ${configInput('Créatifs max', 'growth_creatives', '500', 'number')}
        <h4 class="cfg-subhead">Trial</h4>
        ${configInput('Durée essai (jours)', 'trial_days', '14', 'number')}
      </div>
    </div>

    <!-- Notifications & Emails -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-5">
        <div class="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center">
          <i class="fas fa-envelope text-brand-400 text-sm"></i>
        </div>
        <h3 class="font-bold text-white">Emails & Notifications</h3>
      </div>
      <div class="space-y-4">
        ${configInput('Email expéditeur', 'smtp_from', 'noreply@adnova.ai', 'email')}
        ${configInput('Email support', 'support_email', 'support@adnova.ai', 'email')}
        ${configInput('Email alertes admin', 'admin_alert_email', 'superadmin@adnova.ai', 'email')}
        ${configInput('SMTP Host', 'smtp_host', 'smtp.sendgrid.net', 'text')}
        ${configInput('SMTP Port', 'smtp_port', '587', 'number')}
      </div>
    </div>

    <!-- API & Intégrations -->
    <div class="glass rounded-2xl p-5">
      <div class="flex items-center gap-2 mb-5">
        <div class="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center">
          <i class="fas fa-plug text-brand-400 text-sm"></i>
        </div>
        <h3 class="font-bold text-white">API & Intégrations</h3>
      </div>
      <div class="space-y-4">
        ${configInput('Rate limit API (req/min)', 'api_rate_limit', '1000', 'number')}
        ${configInput('Webhook secret', 'webhook_secret', '••••••••••••••••', 'password')}
        ${configInput('Stripe API Key', 'stripe_key', '••••••••••••••••', 'password')}
        ${configInput('OpenAI API Key', 'openai_key', '••••••••••••••••', 'password')}
        ${configInput('Replicate API Key', 'replicate_key', '••••••••••••••••', 'password')}
      </div>
    </div>
  </div>

  <!-- Feature Flags -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center gap-2 mb-5">
      <div class="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center">
        <i class="fas fa-flag text-brand-400 text-sm"></i>
      </div>
      <h3 class="font-bold text-white">Feature Flags</h3>
      <span class="text-xs text-slate-500 ml-2">Activez/désactivez les fonctionnalités globalement</span>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      ${featureFlag('UGC Video Generation', true, 'brand')}
      ${featureFlag('Auto-Scale Campaigns', true, 'brand')}
      ${featureFlag('Auto-Kill Creatives', true, 'brand')}
      ${featureFlag('AI Copy Engine', true, 'brand')}
      ${featureFlag('Lookalike Audiences', true, 'brand')}
      ${featureFlag('TikTok Integration', true, 'brand')}
      ${featureFlag('Snapchat Integration', true, 'brand')}
      ${featureFlag('White-Label Mode', false, 'slate')}
      ${featureFlag('Beta Features', false, 'slate')}
      ${featureFlag('Maintenance Mode', false, 'slate')}
      ${featureFlag('API Public Access', true, 'brand')}
      ${featureFlag('Advanced Analytics', true, 'brand')}
    </div>
  </div>

  <!-- Danger Zone -->
  <div class="danger-zone rounded-2xl p-5">
    <div class="flex items-center gap-2 mb-4">
      <i class="fas fa-triangle-exclamation text-slate-400"></i>
      <h3 class="font-bold text-slate-400">Zone Dangereuse</h3>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="glass rounded-xl p-4">
        <div class="font-semibold text-white text-sm mb-1">Vider le cache global</div>
        <div class="text-xs text-slate-500 mb-3">Purge tous les caches Redis et CDN. Impact temporaire sur les performances.</div>
        <button class="text-xs text-brand-400 border border-brand-500/30 px-4 py-2 rounded-lg hover:bg-brand-500/10 transition-all w-full">
          <i class="fas fa-trash-can mr-1.5"></i> Vider le cache
        </button>
      </div>
      <div class="glass rounded-xl p-4">
        <div class="font-semibold text-white text-sm mb-1">Mode maintenance</div>
        <div class="text-xs text-slate-500 mb-3">Désactive l'accès à la plateforme pour tous les utilisateurs.</div>
        <button class="text-xs text-slate-400 border border-slate-500/30 px-4 py-2 rounded-lg hover:bg-slate-500/10 transition-all w-full">
          <i class="fas fa-power-off mr-1.5"></i> Activer maintenance
        </button>
      </div>
      <div class="glass rounded-xl p-4">
        <div class="font-semibold text-white text-sm mb-1">Recalibrer tous les modèles IA</div>
        <div class="text-xs text-slate-500 mb-3">Force une recalibration immédiate. Processus de 4-6 heures.</div>
        <button class="text-xs text-orange-400 border border-orange-500/30 px-4 py-2 rounded-lg hover:bg-orange-500/10 transition-all w-full">
          <i class="fas fa-brain mr-1.5"></i> Recalibrer IA
        </button>
      </div>
    </div>
  </div>

  <script>
  function saveConfig() {
    const btn = event.target.closest('button');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-1.5"></i> Enregistrement...';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check mr-1.5"></i> Sauvegardé !';
      btn.classList.add('bg-gradient-to-r', 'from-brand-500', 'to-brand-500');
      btn.classList.remove('from-orange-500', 'to-slate-600');
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-save mr-1.5"></i> Enregistrer tout';
        btn.classList.remove('from-brand-500', 'to-brand-500');
        btn.classList.add('from-orange-500', 'to-slate-600');
      }, 2000);
    }, 1200);
  }
  </script>
  `
  return c.html(adminShell('Configuration', content, '/admin/config'))
}

function configInput(label: string, id: string, value: string, type: string): string {
  const mono = type === 'password' || /key|secret|token|webhook/i.test(id) ? "font-family:'JetBrains Mono','Menlo','Consolas',monospace;letter-spacing:0.02em;" : ''
  const reveal = type === 'password'
    ? `<button type="button" onclick="(function(b){var i=document.getElementById('${id}');var on=i.type==='password';i.type=on?'text':'password';b.firstElementChild.className='fas fa-eye'+(on?'-slash':'')+' text-xs';})(this)" class="cfg-eye" aria-label="Afficher/masquer"><i class="fas fa-eye text-xs"></i></button>
       <button type="button" onclick="(function(b){var i=document.getElementById('${id}');navigator.clipboard&&navigator.clipboard.writeText(i.value);var o=b.firstElementChild.className;b.firstElementChild.className='fas fa-check text-xs';setTimeout(function(){b.firstElementChild.className=o},1200)})(this)" class="cfg-eye" aria-label="Copier"><i class="fas fa-copy text-xs"></i></button>`
    : ''
  return `<div class="cfg-field">
    <label for="${id}">${label}</label>
    <div class="cfg-input-wrap">
      <input type="${type}" id="${id}" value="${value}" autocomplete="off" spellcheck="false" style="${mono}"/>
      ${reveal}
    </div>
  </div>`
}

function featureFlag(label: string, enabled: boolean, color: string): string {
  const active = enabled ? color : 'slate'
  return `<div class="glass rounded-xl p-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-2 h-2 rounded-full ${enabled ? `bg-${active}-400` : 'bg-slate-700'} ${enabled ? 'blink' : ''}"></div>
      <span class="text-xs text-slate-400 font-medium">${label}</span>
    </div>
    <button class="relative w-9 h-5 rounded-full transition-all ${enabled ? 'bg-orange-500' : 'bg-slate-700'}"
      onclick="this.classList.toggle('bg-orange-500');this.classList.toggle('bg-slate-700');this.previousElementSibling.firstElementChild.classList.toggle('bg-${active}-400');this.previousElementSibling.firstElementChild.classList.toggle('bg-slate-700');">
      <div class="absolute top-0.5 ${enabled ? 'right-0.5' : 'left-0.5'} w-4 h-4 bg-white rounded-full shadow transition-all"></div>
    </button>
  </div>`
}
