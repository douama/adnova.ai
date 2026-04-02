// i18n system — IP-based language detection + 6 language dictionaries
// Supports: en, fr, es, de, pt, ar

export type Lang = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'ar'

export const SUPPORTED_LANGS: Lang[] = ['en', 'fr', 'es', 'de', 'pt', 'ar']

// IP → country → language mapping (top countries per language)
const COUNTRY_LANG: Record<string, Lang> = {
  // French — incl. Canada (bilingual: Accept-Language takes priority for CA)
  FR: 'fr', BE: 'fr', CH: 'fr', SN: 'fr', CI: 'fr', CM: 'fr',
  DZ: 'fr', MA: 'fr', TN: 'fr', LU: 'fr', MC: 'fr', ML: 'fr', BF: 'fr',
  NE: 'fr', TD: 'fr', RW: 'fr', BI: 'fr', DJ: 'fr', KM: 'fr', MG: 'fr',
  // Spanish
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', CL: 'es', VE: 'es',
  EC: 'es', BO: 'es', PY: 'es', UY: 'es', CR: 'es', PA: 'es', DO: 'es',
  GT: 'es', HN: 'es', NI: 'es', SV: 'es', CU: 'es', PR: 'es',
  // German
  DE: 'de', AT: 'de', LI: 'de',
  // Portuguese
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt', GW: 'pt', ST: 'pt',
  // Arabic
  SA: 'ar', AE: 'ar', EG: 'ar', IQ: 'ar', JO: 'ar', KW: 'ar', LB: 'ar',
  LY: 'ar', OM: 'ar', QA: 'ar', SD: 'ar', SY: 'ar', YE: 'ar', BH: 'ar',
  MR: 'ar', PS: 'ar',
  // English (default for US, UK, AU, etc.)
  US: 'en', GB: 'en', AU: 'en', NZ: 'en', ZA: 'en', IE: 'en', IN: 'en',
  SG: 'en', PH: 'en', NG: 'en', GH: 'en', KE: 'en', ZW: 'en', CA: 'en',
  JM: 'en', TT: 'en', BB: 'en',
}

export function detectLang(request: Request): Lang {
  // 1. Check cookie preference (explicit user choice — highest priority)
  const cookieLang = getCookieLang(request)
  if (cookieLang) return cookieLang

  // 2. Accept-Language header with proper q-value weighting
  const acceptLang = request.headers.get('Accept-Language') || ''
  const headerLang = parseAcceptLanguage(acceptLang)

  // 3. Cloudflare CF-IPCountry header
  const country = (request.headers.get('CF-IPCountry') || '').toUpperCase()
  const countryLang = country && COUNTRY_LANG[country] ? COUNTRY_LANG[country] : null

  // For bilingual countries (CA, BE, CH), prefer Accept-Language over IP
  const bilingualCountries = new Set(['CA', 'BE', 'CH', 'LU', 'SG', 'IN', 'ZA'])
  if (bilingualCountries.has(country) && headerLang) return headerLang
  if (headerLang) return headerLang
  if (countryLang) return countryLang

  return 'en'
}

function getCookieLang(request: Request): Lang | null {
  const cookie = request.headers.get('Cookie') || ''
  const match = cookie.match(/adnova_lang=([a-z]{2})/)
  if (match && SUPPORTED_LANGS.includes(match[1] as Lang)) {
    return match[1] as Lang
  }
  return null
}

function parseAcceptLanguage(header: string): Lang | null {
  if (!header) return null
  // Parse with q-values, e.g. "fr-CA,fr;q=0.9,en;q=0.8"
  const entries = header.split(',').map(entry => {
    const [lang, q] = entry.trim().split(';q=')
    const code = lang.trim().substring(0, 2).toLowerCase()
    const quality = q ? parseFloat(q) : 1.0
    return { code, quality }
  }).sort((a, b) => b.quality - a.quality)

  for (const { code } of entries) {
    if (SUPPORTED_LANGS.includes(code as Lang)) return code as Lang
  }
  return null
}

// Translation dictionaries
export type TranslationKey =
  | 'dashboard' | 'campaigns' | 'creatives' | 'analytics' | 'ai_engine'
  | 'automation' | 'audiences' | 'platforms' | 'billing' | 'settings'
  | 'logout' | 'total_spend' | 'revenue' | 'roas' | 'conversions'
  | 'active_campaigns' | 'ai_decisions' | 'new_campaign' | 'this_month'
  | 'vs_last_month' | 'performance' | 'status' | 'connect' | 'connected'
  | 'disconnect' | 'sync' | 'configure' | 'platform_integrations'
  | 'available_platforms' | 'coming_soon' | 'beta' | 'login' | 'register'
  | 'email' | 'password' | 'sign_in' | 'sign_up' | 'loading' | 'error'
  | 'success' | 'save' | 'cancel' | 'delete' | 'edit' | 'view' | 'search'
  | 'filter' | 'export' | 'import' | 'dark_mode' | 'light_mode'
  | 'language' | 'notifications' | 'profile' | 'workspace' | 'upgrade'
  | 'spend' | 'budget' | 'impressions' | 'clicks' | 'ctr' | 'cpc'
  | 'scaling' | 'paused' | 'active' | 'draft' | 'archived'
  | 'ai_optimizer' | 'creative_studio' | 'audience_intelligence'
  | 'welcome' | 'overview' | 'reports' | 'integrations' | 'support'
  | 'platform_speed' | 'syncing' | 'last_sync' | 'account_id'
  | 'monthly_spend' | 'campaigns_count' | 'pixel_status' | 'pixel_active'
  | 'pixel_inactive' | 'reconnect' | 'token_expired' | 'warning'

type Translations = Record<TranslationKey, string>

const dict: Record<Lang, Translations> = {
  en: {
    dashboard: 'Dashboard', campaigns: 'Campaigns', creatives: 'Creative Studio',
    analytics: 'Analytics', ai_engine: 'AI Engine', automation: 'Automation',
    audiences: 'Audiences', platforms: 'Platforms', billing: 'Billing',
    settings: 'Settings', logout: 'Logout', total_spend: 'Total Ad Spend',
    revenue: 'Revenue', roas: 'Blended ROAS', conversions: 'Conversions',
    active_campaigns: 'Active Campaigns', ai_decisions: 'AI Decisions Today',
    new_campaign: 'New Campaign', this_month: 'This month',
    vs_last_month: 'vs last month', performance: 'Performance', status: 'Status',
    connect: 'Connect', connected: 'Connected', disconnect: 'Disconnect',
    sync: 'Sync', configure: 'Configure', platform_integrations: 'Ad Platform Integrations',
    available_platforms: 'Available Platforms', coming_soon: 'Coming Soon',
    beta: 'Beta', login: 'Sign In', register: 'Create Account',
    email: 'Email', password: 'Password', sign_in: 'Sign In', sign_up: 'Get Started',
    loading: 'Loading…', error: 'Error', success: 'Success',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit',
    view: 'View', search: 'Search', filter: 'Filter', export: 'Export',
    import: 'Import', dark_mode: 'Dark Mode', light_mode: 'Light Mode',
    language: 'Language', notifications: 'Notifications', profile: 'Profile',
    workspace: 'Workspace', upgrade: 'Upgrade', spend: 'Spend', budget: 'Budget',
    impressions: 'Impressions', clicks: 'Clicks', ctr: 'CTR', cpc: 'CPC',
    scaling: 'Scaling', paused: 'Paused', active: 'Active', draft: 'Draft',
    archived: 'Archived', ai_optimizer: 'AI Optimizer', creative_studio: 'Creative Studio',
    audience_intelligence: 'Audience Intelligence', welcome: 'Welcome',
    overview: 'Overview', reports: 'Reports', integrations: 'Integrations',
    support: 'Support', platform_speed: 'Platform Speed', syncing: 'Syncing…',
    last_sync: 'Last sync', account_id: 'Account ID', monthly_spend: 'Monthly Spend',
    campaigns_count: 'Campaigns', pixel_status: 'Pixel Status',
    pixel_active: 'Pixel Active', pixel_inactive: 'Pixel Inactive',
    reconnect: 'Reconnect', token_expired: 'Token Expired', warning: 'Warning',
  },
  fr: {
    dashboard: 'Tableau de bord', campaigns: 'Campagnes', creatives: 'Studio créatif',
    analytics: 'Analytiques', ai_engine: 'Moteur IA', automation: 'Automatisation',
    audiences: 'Audiences', platforms: 'Plateformes', billing: 'Facturation',
    settings: 'Paramètres', logout: 'Déconnexion', total_spend: 'Dépenses publicitaires',
    revenue: 'Revenus', roas: 'ROAS global', conversions: 'Conversions',
    active_campaigns: 'Campagnes actives', ai_decisions: 'Décisions IA aujourd\'hui',
    new_campaign: 'Nouvelle campagne', this_month: 'Ce mois',
    vs_last_month: 'vs mois dernier', performance: 'Performance', status: 'Statut',
    connect: 'Connecter', connected: 'Connecté', disconnect: 'Déconnecter',
    sync: 'Synchroniser', configure: 'Configurer', platform_integrations: 'Intégrations publicitaires',
    available_platforms: 'Plateformes disponibles', coming_soon: 'Bientôt disponible',
    beta: 'Bêta', login: 'Connexion', register: 'Créer un compte',
    email: 'Email', password: 'Mot de passe', sign_in: 'Se connecter', sign_up: 'Commencer',
    loading: 'Chargement…', error: 'Erreur', success: 'Succès',
    save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier',
    view: 'Voir', search: 'Rechercher', filter: 'Filtrer', export: 'Exporter',
    import: 'Importer', dark_mode: 'Mode sombre', light_mode: 'Mode clair',
    language: 'Langue', notifications: 'Notifications', profile: 'Profil',
    workspace: 'Espace de travail', upgrade: 'Mise à niveau', spend: 'Dépenses', budget: 'Budget',
    impressions: 'Impressions', clicks: 'Clics', ctr: 'CTR', cpc: 'CPC',
    scaling: 'Mise à l\'échelle', paused: 'En pause', active: 'Actif', draft: 'Brouillon',
    archived: 'Archivé', ai_optimizer: 'Optimiseur IA', creative_studio: 'Studio créatif',
    audience_intelligence: 'Intelligence audience', welcome: 'Bienvenue',
    overview: 'Vue d\'ensemble', reports: 'Rapports', integrations: 'Intégrations',
    support: 'Support', platform_speed: 'Vitesse plateforme', syncing: 'Synchronisation…',
    last_sync: 'Dernière sync', account_id: 'ID compte', monthly_spend: 'Dépenses mensuelles',
    campaigns_count: 'Campagnes', pixel_status: 'Statut Pixel',
    pixel_active: 'Pixel actif', pixel_inactive: 'Pixel inactif',
    reconnect: 'Reconnecter', token_expired: 'Token expiré', warning: 'Avertissement',
  },
  es: {
    dashboard: 'Panel', campaigns: 'Campañas', creatives: 'Estudio creativo',
    analytics: 'Análisis', ai_engine: 'Motor IA', automation: 'Automatización',
    audiences: 'Audiencias', platforms: 'Plataformas', billing: 'Facturación',
    settings: 'Configuración', logout: 'Cerrar sesión', total_spend: 'Gasto en anuncios',
    revenue: 'Ingresos', roas: 'ROAS global', conversions: 'Conversiones',
    active_campaigns: 'Campañas activas', ai_decisions: 'Decisiones IA hoy',
    new_campaign: 'Nueva campaña', this_month: 'Este mes',
    vs_last_month: 'vs mes anterior', performance: 'Rendimiento', status: 'Estado',
    connect: 'Conectar', connected: 'Conectado', disconnect: 'Desconectar',
    sync: 'Sincronizar', configure: 'Configurar', platform_integrations: 'Integraciones publicitarias',
    available_platforms: 'Plataformas disponibles', coming_soon: 'Próximamente',
    beta: 'Beta', login: 'Iniciar sesión', register: 'Crear cuenta',
    email: 'Correo', password: 'Contraseña', sign_in: 'Entrar', sign_up: 'Empezar',
    loading: 'Cargando…', error: 'Error', success: 'Éxito',
    save: 'Guardar', cancel: 'Cancelar', delete: 'Eliminar', edit: 'Editar',
    view: 'Ver', search: 'Buscar', filter: 'Filtrar', export: 'Exportar',
    import: 'Importar', dark_mode: 'Modo oscuro', light_mode: 'Modo claro',
    language: 'Idioma', notifications: 'Notificaciones', profile: 'Perfil',
    workspace: 'Espacio de trabajo', upgrade: 'Actualizar', spend: 'Gasto', budget: 'Presupuesto',
    impressions: 'Impresiones', clicks: 'Clics', ctr: 'CTR', cpc: 'CPC',
    scaling: 'Escalando', paused: 'Pausado', active: 'Activo', draft: 'Borrador',
    archived: 'Archivado', ai_optimizer: 'Optimizador IA', creative_studio: 'Estudio creativo',
    audience_intelligence: 'Inteligencia de audiencia', welcome: 'Bienvenido',
    overview: 'Resumen', reports: 'Informes', integrations: 'Integraciones',
    support: 'Soporte', platform_speed: 'Velocidad plataforma', syncing: 'Sincronizando…',
    last_sync: 'Última sincronización', account_id: 'ID cuenta', monthly_spend: 'Gasto mensual',
    campaigns_count: 'Campañas', pixel_status: 'Estado Pixel',
    pixel_active: 'Pixel activo', pixel_inactive: 'Pixel inactivo',
    reconnect: 'Reconectar', token_expired: 'Token expirado', warning: 'Advertencia',
  },
  de: {
    dashboard: 'Dashboard', campaigns: 'Kampagnen', creatives: 'Kreativstudio',
    analytics: 'Analyse', ai_engine: 'KI-Engine', automation: 'Automatisierung',
    audiences: 'Zielgruppen', platforms: 'Plattformen', billing: 'Abrechnung',
    settings: 'Einstellungen', logout: 'Abmelden', total_spend: 'Werbeausgaben',
    revenue: 'Einnahmen', roas: 'ROAS gesamt', conversions: 'Conversions',
    active_campaigns: 'Aktive Kampagnen', ai_decisions: 'KI-Entscheidungen heute',
    new_campaign: 'Neue Kampagne', this_month: 'Diesen Monat',
    vs_last_month: 'vs. letzter Monat', performance: 'Leistung', status: 'Status',
    connect: 'Verbinden', connected: 'Verbunden', disconnect: 'Trennen',
    sync: 'Synchronisieren', configure: 'Konfigurieren', platform_integrations: 'Werbeplattformen',
    available_platforms: 'Verfügbare Plattformen', coming_soon: 'Demnächst',
    beta: 'Beta', login: 'Anmelden', register: 'Konto erstellen',
    email: 'E-Mail', password: 'Passwort', sign_in: 'Anmelden', sign_up: 'Starten',
    loading: 'Laden…', error: 'Fehler', success: 'Erfolg',
    save: 'Speichern', cancel: 'Abbrechen', delete: 'Löschen', edit: 'Bearbeiten',
    view: 'Ansehen', search: 'Suchen', filter: 'Filtern', export: 'Exportieren',
    import: 'Importieren', dark_mode: 'Dunkelmodus', light_mode: 'Hellmodus',
    language: 'Sprache', notifications: 'Benachrichtigungen', profile: 'Profil',
    workspace: 'Arbeitsbereich', upgrade: 'Upgrade', spend: 'Ausgaben', budget: 'Budget',
    impressions: 'Impressionen', clicks: 'Klicks', ctr: 'CTR', cpc: 'CPC',
    scaling: 'Skalierung', paused: 'Pausiert', active: 'Aktiv', draft: 'Entwurf',
    archived: 'Archiviert', ai_optimizer: 'KI-Optimierer', creative_studio: 'Kreativstudio',
    audience_intelligence: 'Zielgruppenintelligenz', welcome: 'Willkommen',
    overview: 'Übersicht', reports: 'Berichte', integrations: 'Integrationen',
    support: 'Support', platform_speed: 'Plattformgeschwindigkeit', syncing: 'Synchronisiert…',
    last_sync: 'Letzte Sync', account_id: 'Konto-ID', monthly_spend: 'Monatliche Ausgaben',
    campaigns_count: 'Kampagnen', pixel_status: 'Pixel-Status',
    pixel_active: 'Pixel aktiv', pixel_inactive: 'Pixel inaktiv',
    reconnect: 'Neu verbinden', token_expired: 'Token abgelaufen', warning: 'Warnung',
  },
  pt: {
    dashboard: 'Painel', campaigns: 'Campanhas', creatives: 'Estúdio criativo',
    analytics: 'Análises', ai_engine: 'Motor IA', automation: 'Automação',
    audiences: 'Públicos', platforms: 'Plataformas', billing: 'Faturação',
    settings: 'Configurações', logout: 'Sair', total_spend: 'Gasto em anúncios',
    revenue: 'Receita', roas: 'ROAS global', conversions: 'Conversões',
    active_campaigns: 'Campanhas ativas', ai_decisions: 'Decisões IA hoje',
    new_campaign: 'Nova campanha', this_month: 'Este mês',
    vs_last_month: 'vs mês anterior', performance: 'Desempenho', status: 'Status',
    connect: 'Conectar', connected: 'Conectado', disconnect: 'Desconectar',
    sync: 'Sincronizar', configure: 'Configurar', platform_integrations: 'Integrações publicitárias',
    available_platforms: 'Plataformas disponíveis', coming_soon: 'Em breve',
    beta: 'Beta', login: 'Entrar', register: 'Criar conta',
    email: 'Email', password: 'Senha', sign_in: 'Entrar', sign_up: 'Começar',
    loading: 'Carregando…', error: 'Erro', success: 'Sucesso',
    save: 'Salvar', cancel: 'Cancelar', delete: 'Excluir', edit: 'Editar',
    view: 'Ver', search: 'Pesquisar', filter: 'Filtrar', export: 'Exportar',
    import: 'Importar', dark_mode: 'Modo escuro', light_mode: 'Modo claro',
    language: 'Idioma', notifications: 'Notificações', profile: 'Perfil',
    workspace: 'Espaço de trabalho', upgrade: 'Atualizar', spend: 'Gasto', budget: 'Orçamento',
    impressions: 'Impressões', clicks: 'Cliques', ctr: 'CTR', cpc: 'CPC',
    scaling: 'Escalando', paused: 'Pausado', active: 'Ativo', draft: 'Rascunho',
    archived: 'Arquivado', ai_optimizer: 'Otimizador IA', creative_studio: 'Estúdio criativo',
    audience_intelligence: 'Inteligência de audiência', welcome: 'Bem-vindo',
    overview: 'Visão geral', reports: 'Relatórios', integrations: 'Integrações',
    support: 'Suporte', platform_speed: 'Velocidade da plataforma', syncing: 'Sincronizando…',
    last_sync: 'Última sincronização', account_id: 'ID conta', monthly_spend: 'Gasto mensal',
    campaigns_count: 'Campanhas', pixel_status: 'Status do Pixel',
    pixel_active: 'Pixel ativo', pixel_inactive: 'Pixel inativo',
    reconnect: 'Reconectar', token_expired: 'Token expirado', warning: 'Aviso',
  },
  ar: {
    dashboard: 'لوحة القيادة', campaigns: 'الحملات', creatives: 'استوديو الإبداع',
    analytics: 'التحليلات', ai_engine: 'محرك الذكاء الاصطناعي', automation: 'الأتمتة',
    audiences: 'الجماهير', platforms: 'المنصات', billing: 'الفواتير',
    settings: 'الإعدادات', logout: 'تسجيل الخروج', total_spend: 'إجمالي الإنفاق',
    revenue: 'الإيرادات', roas: 'عائد الإنفاق', conversions: 'التحويلات',
    active_campaigns: 'الحملات النشطة', ai_decisions: 'قرارات الذكاء اليوم',
    new_campaign: 'حملة جديدة', this_month: 'هذا الشهر',
    vs_last_month: 'مقابل الشهر الماضي', performance: 'الأداء', status: 'الحالة',
    connect: 'اتصال', connected: 'متصل', disconnect: 'قطع الاتصال',
    sync: 'مزامنة', configure: 'تكوين', platform_integrations: 'تكاملات المنصات',
    available_platforms: 'المنصات المتاحة', coming_soon: 'قريباً',
    beta: 'تجريبي', login: 'تسجيل الدخول', register: 'إنشاء حساب',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', sign_in: 'دخول', sign_up: 'ابدأ',
    loading: 'جارٍ التحميل…', error: 'خطأ', success: 'نجاح',
    save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل',
    view: 'عرض', search: 'بحث', filter: 'تصفية', export: 'تصدير',
    import: 'استيراد', dark_mode: 'الوضع الداكن', light_mode: 'الوضع الفاتح',
    language: 'اللغة', notifications: 'الإشعارات', profile: 'الملف الشخصي',
    workspace: 'مساحة العمل', upgrade: 'ترقية', spend: 'الإنفاق', budget: 'الميزانية',
    impressions: 'الانطباعات', clicks: 'النقرات', ctr: 'نسبة النقر', cpc: 'تكلفة النقرة',
    scaling: 'تطوير', paused: 'متوقف', active: 'نشط', draft: 'مسودة',
    archived: 'مؤرشف', ai_optimizer: 'محسّن الذكاء', creative_studio: 'الاستوديو الإبداعي',
    audience_intelligence: 'ذكاء الجمهور', welcome: 'مرحباً',
    overview: 'نظرة عامة', reports: 'التقارير', integrations: 'التكاملات',
    support: 'الدعم', platform_speed: 'سرعة المنصة', syncing: 'جارٍ المزامنة…',
    last_sync: 'آخر مزامنة', account_id: 'رقم الحساب', monthly_spend: 'الإنفاق الشهري',
    campaigns_count: 'الحملات', pixel_status: 'حالة البيكسل',
    pixel_active: 'البيكسل نشط', pixel_inactive: 'البيكسل غير نشط',
    reconnect: 'إعادة الاتصال', token_expired: 'انتهت صلاحية الرمز', warning: 'تحذير',
  },
}

export function t(lang: Lang, key: TranslationKey): string {
  return dict[lang]?.[key] ?? dict['en'][key] ?? key
}

export function getLangDir(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

export function getLangName(lang: Lang): string {
  const names: Record<Lang, string> = {
    en: 'English', fr: 'Français', es: 'Español',
    de: 'Deutsch', pt: 'Português', ar: 'العربية'
  }
  return names[lang]
}

// Language selector HTML snippet
export function langSelectorHTML(currentLang: Lang): string {
  const flags: Record<Lang, string> = {
    en: '🇺🇸', fr: '🇫🇷', es: '🇪🇸', de: '🇩🇪', pt: '🇧🇷', ar: '🇸🇦'
  }
  const options = SUPPORTED_LANGS.map(l =>
    `<option value="${l}" ${l === currentLang ? 'selected' : ''}>${flags[l]} ${getLangName(l)}</option>`
  ).join('')
  return `<select id="langSelector" onchange="setLang(this.value)"
    class="bg-surface-800 text-white text-xs border border-surface-700 rounded px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-500">
    ${options}
  </select>
  <script>
  function setLang(lang) {
    document.cookie = 'adnova_lang=' + lang + ';path=/;max-age=31536000';
    window.location.reload();
  }
  </script>`
}
