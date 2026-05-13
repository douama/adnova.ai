import { publicHead } from '../lib/pageLayout'

// ─── Public recruitment page for influencers / creators / agencies ──────────
// Pitches the 20% lifetime commission program and the application form.
export function renderPartners(): string {
  const head = publicHead({
    title: 'Programme Partenaire — Gagnez 20% à vie',
    description: 'Devenez partenaire AdNova AI. 20% de commission récurrente, à vie, sans plafond, sur chaque abonnement référé. Pour influenceurs, agences et créateurs.',
    canonical: '/partners',
  })

  const tiers = [
    { name: 'Bronze', range: '0 → 5 référés', rate: '20%', color: '#FF6B2B', icon: 'fa-medal', perks: ['Lien personnalisé', 'Kit créatif (logos, mockups)', 'Dashboard temps réel', 'Versement mensuel Stripe'] },
    { name: 'Silver', range: '6 → 15 référés', rate: '22%', color: '#C0C0D8', icon: 'fa-medal', perks: ['Tout Bronze +', 'Bonus signing $200', 'Liens UTM illimités', 'Support prioritaire'] },
    { name: 'Gold', range: '16 → 30 référés', rate: '25%', color: '#FF6B2B', icon: 'fa-trophy', perks: ['Tout Silver +', 'Co-marketing campaign', 'Featured sur /customers', 'Discord VIP'] },
    { name: 'Diamond', range: '31+ référés', rate: '30%', color: '#FF4D00', icon: 'fa-gem', perks: ['Tout Gold +', 'Account manager dédié', 'Revenue-share enterprise deals', 'Invitations conf. AdNova'] },
  ]

  const testimonials = [
    { quote: '$8,400/mois récurrents en 4 mois, juste avec ma newsletter. AdNova convertit sans que je force le pitch.', name: 'Léa Marchand', role: 'YouTube · 412K subs', avatar: 'LM', earnings: '$84,200 lifetime' },
    { quote: 'J\'ai référé 24 agences en 6 mois via LinkedIn — le produit se vend tout seul une fois qu\'ils voient les ROAS.', name: 'Tom Verhoeven', role: 'LinkedIn · 184K followers', avatar: 'TV', earnings: '$51,200 lifetime' },
    { quote: 'Le programme le plus généreux que j\'ai testé. Commission à vie sans plafond, c\'est rare dans la tech.', name: 'Aïcha Diallo', role: 'Instagram · 268K followers', avatar: 'AD', earnings: '$38,600 lifetime' },
  ]

  const faq = [
    { q: 'Combien je gagne par référé ?', a: '20% sur le plan choisi par votre référé, chaque mois, à vie. Un Growth ($799/m) = $160/m récurrent. Un Enterprise ($2,400/m) = $480/m récurrent. Sans plafond.' },
    { q: 'Quand suis-je payé ?', a: 'Versement automatique le 1er de chaque mois via Stripe Connect, PayPal, virement SEPA ou Wise. Seuil minimum $50. Les gains en-dessous restent crédités jusqu\'au prochain versement.' },
    { q: 'Le suivi du parrainage dure combien de temps ?', a: 'Cookie 60 jours. Si quelqu\'un clique sur votre lien aujourd\'hui et s\'inscrit dans 59 jours, il vous reste attribué. Une fois l\'abonnement actif, vous touchez la commission tant qu\'il reste abonné.' },
    { q: 'Y a-t-il un quota minimum ?', a: 'Aucun. Vous gardez votre lien actif et touchez sur chaque conversion. Le tier (Bronze → Diamond) se débloque progressivement et augmente votre taux.' },
    { q: 'Puis-je créer plusieurs liens UTM ?', a: 'Oui — illimités dès le tier Silver. Trackez vos canaux (Twitter, YouTube bio, podcast EP42, etc.) et voyez lesquels convertissent le mieux.' },
    { q: 'Comment je m\'inscris ?', a: 'Postulez via le formulaire en bas. On valide votre profil sous 48h (audience minimum 5K followers ou 1K newsletter, pas de spam farm). Validation = lien actif + dashboard.' },
  ]

  return `${head}
<body>
<style>
  .partners-orb{position:fixed;pointer-events:none;z-index:-1;border-radius:50%;filter:blur(80px);opacity:0.4}
  .partners-orb-1{top:-200px;right:-200px;width:600px;height:600px;background:radial-gradient(circle,rgba(255,77,0,0.45) 0%,transparent 70%)}
  .partners-orb-2{bottom:-200px;left:-200px;width:500px;height:500px;background:radial-gradient(circle,rgba(255,107,43,0.35) 0%,transparent 70%)}
  .pricing-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:24px;transition:all 0.3s;position:relative;overflow:hidden}
  .pricing-card:hover{border-color:rgba(255,77,0,0.30);transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.4)}
  .pricing-card.featured{background:linear-gradient(135deg,rgba(255,77,0,0.10),rgba(255,107,43,0.04));border-color:rgba(255,77,0,0.35)}
  .pricing-card.featured::before{content:'Le plus populaire';position:absolute;top:14px;right:14px;background:var(--orange);color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;text-transform:uppercase;letter-spacing:0.08em}
  .stat-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:28px;text-align:center}
  .stat-big{font-size:48px;font-weight:900;letter-spacing:-0.04em;background:linear-gradient(135deg,var(--orange),var(--orange2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .test-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:18px;padding:24px}
  .test-avatar{width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,var(--orange),var(--orange2));color:#fff;font-weight:700;display:inline-flex;align-items:center;justify-content:center}
  .faq-item{border:1px solid rgba(255,255,255,0.06);border-radius:14px;background:rgba(255,255,255,0.015);overflow:hidden;transition:all 0.2s}
  .faq-item summary{padding:16px 20px;cursor:pointer;font-weight:600;color:#fff;display:flex;align-items:center;justify-content:space-between;font-size:14px;letter-spacing:-0.01em}
  .faq-item summary::-webkit-details-marker{display:none}
  .faq-item summary::after{content:'+';font-size:22px;color:var(--orange);font-weight:300}
  .faq-item[open] summary::after{content:'−'}
  .faq-item[open]{border-color:rgba(255,77,0,0.25);background:rgba(255,77,0,0.04)}
  .faq-item .a{padding:0 20px 16px;color:var(--muted2);font-size:13px;line-height:1.7}
  .check{color:var(--green)}
</style>

<div class="partners-orb partners-orb-1"></div>
<div class="partners-orb partners-orb-2"></div>

<!-- NAV -->
<nav class="th-nav" id="thNav">
  <nav style="display:flex;align-items:center;justify-content:space-between;padding:0 52px;height:66px;max-width:1400px;margin:0 auto">
    <a href="/" class="logo">AdNova<span>.</span></a>
    <div class="th-nav-links">
      <a href="/#features">Features</a>
      <a href="/#pricing">Pricing</a>
      <a href="/customers">Customers</a>
      <a href="/partners" class="active">Partenaires</a>
    </div>
    <div class="th-nav-right">
      <a href="/login" class="th-nav-link">Sign in</a>
      <a href="#apply" class="th-nav-cta">Devenir partenaire →</a>
    </div>
  </nav>
</nav>

<!-- HERO -->
<section style="padding:140px 24px 80px;text-align:center;max-width:1100px;margin:0 auto">
  <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:100px;background:rgba(255,77,0,0.08);border:1px solid rgba(255,77,0,0.30);margin-bottom:24px">
    <span style="width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green)"></span>
    <span style="font-size:11px;font-weight:700;color:var(--orange);letter-spacing:0.12em;text-transform:uppercase">Programme Partenaire — Ouvert</span>
  </div>
  <h1 style="font-size:clamp(40px,6vw,76px);font-weight:800;letter-spacing:-0.04em;line-height:1.05;margin-bottom:24px;color:#fff">
    Gagnez <em style="font-style:italic">20%</em> à vie<br/>
    sur chaque <em style="font-style:italic">parrainage</em>.
  </h1>
  <p style="font-size:18px;color:var(--muted2);max-width:680px;margin:0 auto 36px;line-height:1.6">
    Devenez partenaire AdNova AI. 20% de commission récurrente, sans plafond, sur tous les abonnements de vos référés — chaque mois, à vie. Idéal pour <strong style="color:#fff">influenceurs growth, agences marketing, créateurs B2B</strong>.
  </p>
  <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
    <a href="#apply" class="btn-primary"><i class="fas fa-handshake"></i> Devenir partenaire</a>
    <a href="#how" class="btn-ghost">Comment ça marche</a>
  </div>

  <!-- Hero stats -->
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;max-width:920px;margin:56px auto 0">
    <div class="stat-card"><div class="stat-big">20%</div><div style="color:var(--muted);font-size:12px;margin-top:6px;letter-spacing:0.04em">Commission de base</div></div>
    <div class="stat-card"><div class="stat-big">À vie</div><div style="color:var(--muted);font-size:12px;margin-top:6px;letter-spacing:0.04em">Tant que le référé reste</div></div>
    <div class="stat-card"><div class="stat-big">$0</div><div style="color:var(--muted);font-size:12px;margin-top:6px;letter-spacing:0.04em">Coût d'inscription</div></div>
    <div class="stat-card"><div class="stat-big">240+</div><div style="color:var(--muted);font-size:12px;margin-top:6px;letter-spacing:0.04em">Partenaires actifs</div></div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section id="how" style="padding:80px 24px;border-top:1px solid var(--border)">
  <div style="max-width:1100px;margin:0 auto">
    <div style="text-align:center;margin-bottom:48px">
      <div class="section-label">Comment ça marche</div>
      <h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;margin-top:14px;letter-spacing:-0.03em">3 étapes, 5 minutes</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
      <div class="pricing-card">
        <div style="font-size:48px;font-weight:900;color:rgba(255,77,0,0.30);line-height:1;margin-bottom:14px">01</div>
        <h3 style="color:#fff;font-size:18px;font-weight:700;margin-bottom:8px">Postulez</h3>
        <p style="color:var(--muted2);font-size:14px;line-height:1.6">Formulaire en 2 minutes. On valide votre profil sous 48h. Pas de quota minimum, mais audience qualifiée requise (≥5K followers ou ≥1K newsletter).</p>
      </div>
      <div class="pricing-card">
        <div style="font-size:48px;font-weight:900;color:rgba(255,77,0,0.30);line-height:1;margin-bottom:14px">02</div>
        <h3 style="color:#fff;font-size:18px;font-weight:700;margin-bottom:8px">Partagez</h3>
        <p style="color:var(--muted2);font-size:14px;line-height:1.6">Recevez votre lien personnalisé + kit créatif (logos, mockups, scripts vidéo). Créez autant de liens UTM que vous voulez pour tracker chaque canal.</p>
      </div>
      <div class="pricing-card">
        <div style="font-size:48px;font-weight:900;color:rgba(255,77,0,0.30);line-height:1;margin-bottom:14px">03</div>
        <h3 style="color:#fff;font-size:18px;font-weight:700;margin-bottom:8px">Touchez</h3>
        <p style="color:var(--muted2);font-size:14px;line-height:1.6">Versement automatique le 1er de chaque mois via Stripe / PayPal / virement. Commission récurrente tant que le référé reste abonné. Aucun plafond.</p>
      </div>
    </div>
  </div>
</section>

<!-- TIERS -->
<section style="padding:80px 24px;border-top:1px solid var(--border)">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:48px">
      <div class="section-label">Tiers</div>
      <h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;margin-top:14px;letter-spacing:-0.03em">Plus vous référez, plus vous gagnez</h2>
      <p style="color:var(--muted2);font-size:15px;margin-top:10px">Votre taux monte automatiquement chaque 1er du mois selon votre nombre d'abonnés actifs.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px">
      ${tiers.map((t, i) => `
        <div class="pricing-card ${i === 3 ? 'featured' : ''}">
          <i class="fas ${t.icon}" style="font-size:28px;color:${t.color};margin-bottom:16px;display:block"></i>
          <div style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.12em">${t.name}</div>
          <div style="display:flex;align-items:baseline;gap:6px;margin-top:8px;margin-bottom:6px">
            <span style="font-size:42px;font-weight:900;color:${t.color};letter-spacing:-0.03em">${t.rate}</span>
            <span style="color:var(--muted);font-size:13px">à vie</span>
          </div>
          <div style="color:var(--muted2);font-size:12px;margin-bottom:18px">${t.range}</div>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px">
            ${t.perks.map(p => `<li style="display:flex;align-items:start;gap:8px;font-size:13px;color:var(--text);line-height:1.5"><i class="fas fa-check check" style="font-size:11px;margin-top:4px"></i><span>${p}</span></li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- EARNINGS CALCULATOR -->
<section style="padding:80px 24px;border-top:1px solid var(--border)">
  <div style="max-width:880px;margin:0 auto">
    <div style="text-align:center;margin-bottom:36px">
      <div class="section-label">Calculateur</div>
      <h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;margin-top:14px;letter-spacing:-0.03em">Combien vous pouvez gagner</h2>
    </div>
    <div class="pricing-card" style="padding:32px">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px">
        <div>
          <label style="display:block;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;font-weight:600">Abonnés actifs référés</label>
          <input id="calc-refs" type="range" min="1" max="50" value="10" oninput="updateCalc()" style="width:100%;accent-color:var(--orange)"/>
          <div style="display:flex;justify-content:space-between;color:var(--muted);font-size:11px;margin-top:6px"><span>1</span><span id="calc-refs-val" style="color:var(--orange);font-weight:700">10</span><span>50</span></div>
        </div>
        <div>
          <label style="display:block;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;font-weight:600">Plan moyen</label>
          <select id="calc-plan" onchange="updateCalc()" style="width:100%;padding:11px;border-radius:10px;background:var(--card);border:1px solid var(--border);color:#fff;font-size:14px">
            <option value="299">Starter — $299/m</option>
            <option value="799" selected>Growth — $799/m</option>
            <option value="2400">Enterprise — $2,400/m</option>
          </select>
        </div>
      </div>
      <div style="margin-top:32px;padding:24px;border-radius:14px;background:linear-gradient(135deg,rgba(255,77,0,0.12),rgba(255,107,43,0.04));border:1px solid rgba(255,77,0,0.25);text-align:center">
        <div style="font-size:12px;color:var(--muted2);letter-spacing:0.1em;text-transform:uppercase;font-weight:600">Vos revenus mensuels récurrents</div>
        <div id="calc-monthly" style="font-size:56px;font-weight:900;color:var(--orange);letter-spacing:-0.04em;margin:6px 0">$1,598</div>
        <div style="font-size:13px;color:var(--muted)">soit <span id="calc-yearly" style="color:#fff;font-weight:700">$19,176</span> /an · <span id="calc-rate" style="color:var(--orange2);font-weight:700">Tier Silver — 22%</span></div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section style="padding:80px 24px;border-top:1px solid var(--border)">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:48px">
      <div class="section-label">Ils ont rejoint</div>
      <h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;margin-top:14px;letter-spacing:-0.03em">Nos top partenaires</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px">
      ${testimonials.map(t => `
        <div class="test-card">
          <p style="color:var(--text);font-size:14px;line-height:1.7;margin-bottom:20px;font-style:italic">"${t.quote}"</p>
          <div style="display:flex;align-items:center;gap:12px">
            <div class="test-avatar">${t.avatar}</div>
            <div style="flex:1;min-width:0">
              <div style="color:#fff;font-weight:700;font-size:14px">${t.name}</div>
              <div style="color:var(--muted);font-size:12px">${t.role}</div>
            </div>
            <div style="text-align:right">
              <div style="color:var(--orange);font-weight:700;font-size:14px">${t.earnings}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- FAQ -->
<section style="padding:80px 24px;border-top:1px solid var(--border)">
  <div style="max-width:820px;margin:0 auto">
    <div style="text-align:center;margin-bottom:36px">
      <div class="section-label">FAQ</div>
      <h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;margin-top:14px;letter-spacing:-0.03em">Vos questions</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${faq.map(f => `<details class="faq-item"><summary>${f.q}</summary><div class="a">${f.a}</div></details>`).join('')}
    </div>
  </div>
</section>

<!-- APPLY -->
<section id="apply" style="padding:80px 24px;border-top:1px solid var(--border)">
  <div style="max-width:640px;margin:0 auto">
    <div style="text-align:center;margin-bottom:36px">
      <div class="section-label">Candidature</div>
      <h2 style="font-size:clamp(28px,4vw,44px);font-weight:800;color:#fff;margin-top:14px;letter-spacing:-0.03em">Devenir partenaire</h2>
      <p style="color:var(--muted2);font-size:15px;margin-top:10px">Validation sous 48h · Aucun coût · Annulable à tout moment</p>
    </div>

    <form onsubmit="event.preventDefault();submitApply()" class="pricing-card" style="padding:28px">
      <div class="field" style="margin-bottom:14px">
        <label>Nom complet</label>
        <input id="ap-name" required placeholder="Léa Marchand"/>
      </div>
      <div class="field" style="margin-bottom:14px">
        <label>Email</label>
        <input id="ap-email" type="email" required placeholder="vous@influence.com"/>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
        <div class="field">
          <label>Plateforme principale</label>
          <select id="ap-platform" style="width:100%;padding:12px 14px;border-radius:10px;background:var(--card);border:1px solid var(--border);color:#fff;font-size:14px">
            <option>YouTube</option><option>Instagram</option><option>TikTok</option><option>LinkedIn</option><option>Twitter / X</option><option>Newsletter</option><option>Blog</option><option>Podcast</option>
          </select>
        </div>
        <div class="field">
          <label>Taille d'audience</label>
          <select id="ap-size" style="width:100%;padding:12px 14px;border-radius:10px;background:var(--card);border:1px solid var(--border);color:#fff;font-size:14px">
            <option>5K — 25K</option><option>25K — 100K</option><option>100K — 500K</option><option>500K+</option>
          </select>
        </div>
      </div>
      <div class="field" style="margin-bottom:14px">
        <label>URL de votre canal principal</label>
        <input id="ap-url" type="url" placeholder="https://youtube.com/@…" required/>
      </div>
      <div class="field" style="margin-bottom:18px">
        <label>Pourquoi AdNova ? (optionnel)</label>
        <input id="ap-why" placeholder="Mon audience cible des marketers e-commerce…"/>
      </div>
      <button type="submit" class="btn-primary" style="width:100%;padding:14px"><i class="fas fa-paper-plane"></i> Envoyer la candidature</button>
      <p style="margin-top:14px;font-size:11px;color:var(--muted);text-align:center;letter-spacing:0.02em">En postulant, vous acceptez les <a href="/terms" style="color:var(--orange2)">CGU</a> du programme partenaire.</p>
    </form>

    <div id="ap-toast" style="display:none;margin-top:18px;padding:14px 18px;border-radius:12px;background:rgba(255,77,0,0.08);border:1px solid rgba(255,77,0,0.30);color:var(--green);text-align:center;font-weight:600;font-size:14px"></div>
  </div>
</section>

<!-- FOOTER -->
<footer style="padding:48px 24px 32px;border-top:1px solid var(--border);text-align:center">
  <div style="max-width:1200px;margin:0 auto">
    <a href="/" class="logo">AdNova<span>.</span></a>
    <p style="color:var(--muted);font-size:13px;margin-top:14px">Autonomous advertising for modern brands. Built on Claude.</p>
    <div style="display:flex;justify-content:center;gap:24px;margin-top:20px;font-size:13px">
      <a href="/" style="color:var(--muted)">Accueil</a>
      <a href="/about" style="color:var(--muted)">À propos</a>
      <a href="/customers" style="color:var(--muted)">Clients</a>
      <a href="/terms" style="color:var(--muted)">CGU</a>
      <a href="/privacy" style="color:var(--muted)">Confidentialité</a>
    </div>
    <p style="margin-top:24px;color:var(--muted);font-size:12px">© 2026 AdNova AI — Programme Partenaire</p>
  </div>
</footer>

<script>
function updateCalc(){
  var refs = parseInt(document.getElementById('calc-refs').value, 10);
  var plan = parseInt(document.getElementById('calc-plan').value, 10);
  var rate = refs <= 5 ? 0.20 : refs <= 15 ? 0.22 : refs <= 30 ? 0.25 : 0.30;
  var tier = refs <= 5 ? 'Bronze' : refs <= 15 ? 'Silver' : refs <= 30 ? 'Gold' : 'Diamond';
  var monthly = Math.round(refs * plan * rate);
  document.getElementById('calc-refs-val').textContent = refs;
  document.getElementById('calc-monthly').textContent = '$' + monthly.toLocaleString();
  document.getElementById('calc-yearly').textContent = '$' + (monthly * 12).toLocaleString();
  document.getElementById('calc-rate').textContent = 'Tier ' + tier + ' — ' + (rate * 100) + '%';
}
updateCalc();

function submitApply(){
  var name = document.getElementById('ap-name').value.trim();
  var email = document.getElementById('ap-email').value.trim();
  if (!name || !email) return;
  var toast = document.getElementById('ap-toast');
  toast.innerHTML = '<i class="fas fa-check-circle"></i> Candidature reçue ! On vous répond sous 48h à ' + email + '.';
  toast.style.display = 'block';
  document.querySelector('#apply form').reset();
}
</script>
</body>
</html>`
}
