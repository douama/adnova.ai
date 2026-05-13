# Hero Video — Production Brief

**Durée cible :** 60 secondes
**Format :** 1920×1080 (16:9), MP4 H.264, ~12–18 MB
**Voix-off :** française, ton calme et autoritaire (think : narrateur de documentaire premium, pas commercial)
**Musique :** sub-bass synth minimaliste, montée discrète sur la fin, pas de drop tape-à-l'œil
**Livrable final :** `public/assets/hero-walkthrough.mp4` (le `<source>` du player pointe déjà ici)

---

## Storyboard — 8 scènes, 5 chapitres

### Chapitre 1 · Hook (0:00 – 0:08)

**Scène 1 — 0:00 → 0:04** · Fond noir profond. Le logo `AdNova.` apparaît en orange. Un fil de néon orange traverse l'écran.
**Voix-off :** *« Vos campagnes pub tournent. »*

**Scène 2 — 0:04 → 0:08** · Cut sec sur un dashboard de campagne qui se met à jour TOUT SEUL : un bouton "Scale +12%" se déclenche, un budget passe de $840 à $924, un toast vert apparaît.
**Voix-off :** *« Vous, vous dormez. »*

---

### Chapitre 2 · Live decisions (0:08 – 0:25)

**Scène 3 — 0:08 → 0:15** · Plan large sur le **Decision Feed** du dashboard ([landing — section `.decisions-rail`](src/pages/landing.ts)). Les 3 cartes (Scale, Kill, Génère) s'enchaînent en stop-motion 1.4s chacune. Caméra zoome lentement.
**Voix-off :** *« Chaque seconde, AdNova prend une décision. Scale les gagnants. Kill ce qui brûle. Réalloue le budget là où le ROAS grimpe. »*

**Scène 4 — 0:15 → 0:25** · Plan moyen sur le panneau **Decision Log** ([page `/decisions`](src/pages/decisions.ts)). Survol d'une carte : la raison s'affiche (*"ROAS 5.26× sur 72h, conditions remplies, confidence 94%"*), les data cells animent leur compteur (avant → après).
**Voix-off :** *« Chaque action est tracée, raisonnée, rejouable. Vous savez ce qu'elle a fait. Pourquoi. Et ce qui se serait passé sans elle. »*

---

### Chapitre 3 · Creative gen (0:25 – 0:40)

**Scène 5 — 0:25 → 0:33** · Cut sur l'**AI Creative Studio**. Un brief texte court apparaît à gauche (*"Mode FW26 · femme · 25-34 · ton minimaliste"*). À droite, 4 visuels SDXL se génèrent en cascade (1.5s chacun). Puis une vidéo UGC HeyGen démarre dans un slot vidéo.
**Voix-off :** *« Et si elle a besoin de créas ? Elle les fait. Image. Vidéo. UGC. En quelques secondes, sur votre charte graphique. »*

**Scène 6 — 0:33 → 0:40** · Split screen : à gauche un visuel "Bannière statique" grisé avec badge "Killed · CTR 0.31%". À droite, 3 nouvelles variantes vidéo qui rotates avec badges "A/B running".
**Voix-off :** *« Test. Mesure. Garde ce qui marche. Tue le reste. »*

---

### Chapitre 4 · Decision Log audit (0:40 – 0:52)

**Scène 7 — 0:40 → 0:52** · Plan rapproché sur le bouton **Replay** d'une décision. Au clic, modal s'ouvre côte-à-côte : « Réel +$2,340 » | « Sim sans IA +$1,890 » → « Delta : +$450 (+23.8%) ». Le chiffre 23.8% pulse en orange.
**Voix-off :** *« Auditez chaque décision. Rejouez ce qui se serait passé sans l'IA. Rollback en un clic si besoin. Vous gardez la main, AdNova garde la cadence. »*

---

### Chapitre 5 · CTA (0:52 – 1:00)

**Scène 8 — 0:52 → 1:00** · Retour fond noir. Mention en gros : **« 14 jours d'essai. Sans CB. »**. Sous le texte, l'URL `adnova.ai` en orange. Le logo `AdNova.` revient avec un léger glow.
**Voix-off :** *« 14 jours d'essai. Sans carte bancaire. Vos campagnes en mode autopilote dès aujourd'hui. »*
**Texte écran :** `adnova.ai · Built on Claude.`

---

## Captures à utiliser comme B-roll

Pendant le tournage / capture d'écran :

1. **Dashboard tenant** → http://localhost:5173/dashboard (la grille KPI + chart Revenue)
2. **Decision feed sur la landing** → http://localhost:5173/#decisions (les 3 cartes orange/rouge/vert)
3. **Decision Log full page** → http://localhost:5173/decisions
4. **Modal Replay** → ouvrir Decision Log, cliquer "Replay" sur une décision
5. **Studio créatif (mock)** → http://localhost:5173/creatives
6. **/admin/ai-monitor** → graphes "Décisions IA / heure" pour B-roll data viz

**Astuce capture :** utiliser CleanShot X (Mac) ou Loom en mode "Record screen" 1080p 60fps, puis monter dans Descript ou Final Cut. Couper les transitions à 2 frames pour donner le rythme "snap" qui rend le produit nerveux.

---

## Spec son

- **Voix-off** : enregistrer en cabine ou Whisperroom, mic Neumann TLM 103 ou équivalent. Pas de réverb. Compression douce (~3:1).
- **Musique** : suggestion gratuite — *"Resolutions"* sur Pixabay (sub-bass + arp synth, 60s loop). Sinon Artlist.io > "Tech Minimal" pack.
- **SFX** : 1 "swoosh" doux sur chaque cut. 1 "tick" digital sur chaque toast vert dans le dashboard. 1 "pulse" UI sur l'apparition du chiffre 23.8% final.
- **Mix** : voix à -10 LUFS, musique à -22 LUFS, SFX à -16 LUFS. Master à -14 LUFS (norme YouTube/web).

---

## Once delivered

1. Place le MP4 final dans `public/assets/hero-walkthrough.mp4`
2. (Optionnel) Génère une preview `hero-walkthrough.webm` plus légère et ajoute un second `<source>` dans le modal
3. Mets à jour le `poster` du `<video>` avec une frame représentative (la scène 7 — le Replay modal — est probablement la meilleure)
4. Push, c'est prêt. Le fallback texte s'efface automatiquement dès que la vidéo est lisible.
