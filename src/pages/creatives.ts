
import { shell } from '../lib/layout'
import { type Lang } from '../lib/i18n'

export function renderCreatives(lang: Lang = 'en'): string {
  const content = `
  <!-- Header Tabs & Actions -->
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div class="flex flex-wrap items-center gap-2">
      <button class="creative-tab active-ct glass rounded-xl px-4 py-2 text-sm font-semibold transition-all" onclick="setCreativeTab('all',this)">
        <i class="fas fa-th mr-1.5"></i>All
      </button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('images',this)">
        <i class="fas fa-image mr-1.5"></i>Images
      </button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('videos',this)">
        <i class="fas fa-video mr-1.5"></i>Videos
      </button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('ugc',this)">
        <i class="fas fa-user-check mr-1.5"></i>UGC
      </button>
      <button class="creative-tab glass rounded-xl px-4 py-2 text-sm text-slate-400 transition-all" onclick="setCreativeTab('copy',this)">
        <i class="fas fa-pen mr-1.5"></i>Ad Copy
      </button>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="openEditorModal()" class="glass hover:bg-slate-500/10 text-slate-400 text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all border border-slate-500/20">
        <i class="fas fa-pencil-ruler"></i> Manual Editor
      </button>
      <button onclick="openGenerateModal()" class="bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-500 hover:to-brand-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all">
        <i class="fas fa-wand-magic-sparkles"></i> Generate with AI
      </button>
    </div>
  </div>

  <!-- AI Generation Status Banner -->
  <div class="glass rounded-2xl p-4 mb-6 border border-brand-500/20 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center animate-pulse">
        <i class="fas fa-wand-magic-sparkles text-white text-sm"></i>
      </div>
      <div>
        <div class="font-semibold text-white text-sm">AI is generating 3 new creatives</div>
        <div class="text-xs text-slate-400">UGC-style video for "Summer Collection" · ETA 2 min</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="progress-bar w-32">
        <div class="progress-fill bg-gradient-to-r from-brand-500 to-brand-500" style="width:67%" id="gen-progress"></div>
      </div>
      <span class="text-xs text-brand-400 font-semibold" id="gen-pct">67%</span>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    ${creativeStat('142', 'Total Creatives', 'fa-photo-film', 'brand')}
    ${creativeStat('67', 'Active / Running', 'fa-play-circle', 'brand')}
    ${creativeStat('38', 'In A/B Test', 'fa-flask', 'slate')}
    ${creativeStat('37', 'Killed by AI', 'fa-ban', 'slate')}
  </div>

  <!-- Creatives Grid -->
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6" id="creatives-grid">
    ${creativeCard('cr1', 'Summer-Hero-V3', 'video', 6.2, 'active', 'Summer Collection', 'TikTok,Instagram', true, 98)}
    ${creativeCard('cr2', 'Product-Showcase-B', 'image', 4.8, 'active', 'Product Launch', 'Facebook,Google', true, 91)}
    ${creativeCard('cr3', 'UGC-Testimonial-V2', 'ugc', 4.1, 'active', 'Summer Collection', 'TikTok', false, 85)}
    ${creativeCard('cr4', 'Flash-Sale-Countdown', 'video', 3.9, 'active', 'Holiday Sale', 'Instagram', false, 78)}
    ${creativeCard('cr5', 'New-Look-Static', 'image', 3.4, 'testing', 'Brand Awareness', 'Facebook', false, 72)}
    ${creativeCard('cr6', 'Holiday-Banner-V2', 'image', 3.1, 'testing', 'Holiday Sale', 'Google', false, 65)}
    ${creativeCard('cr7', 'Story-Ad-V4', 'video', 2.8, 'testing', 'Product Launch', 'Instagram', false, 58)}
    ${creativeCard('cr8', 'Carousel-Blue', 'image', 1.9, 'testing', 'Brand Awareness', 'Facebook', false, 41)}
    ${creativeCard('cr9', 'Old-Promo-V1', 'video', 0.6, 'killed', 'Product Launch', 'TikTok', false, 12)}
    ${creativeCard('cr10', 'Banner-Static-01', 'image', 1.2, 'killed', 'Retargeting', 'Google', false, 28)}
    ${creativeCard('cr11', 'Retarget-Text-01', 'copy', 5.1, 'active', 'Retargeting Pro', 'Google,Facebook', true, 94)}
    ${creativeCard('cr12', 'Copy-Headline-B2', 'copy', 3.7, 'testing', 'Brand Awareness', 'Facebook', false, 71)}
  </div>

  <!-- A/B Test Panel -->
  <div class="glass rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-slate-500/20 flex items-center justify-center">
          <i class="fas fa-flask text-slate-400 text-sm"></i>
        </div>
        <div>
          <h3 class="font-bold text-white">Active A/B Tests</h3>
          <p class="text-xs text-slate-500">AI automatically picks the winner</p>
        </div>
      </div>
      <button onclick="openABTestModal()" class="glass hover:bg-slate-500/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg border border-slate-500/20 flex items-center gap-1.5">
        <i class="fas fa-plus text-xs"></i> New A/B Test
      </button>
    </div>
    <div class="space-y-4">
      ${abTestRow('Summer Collection Creative Test', 'Summer-Hero-V3', 'Summer-Hero-V4', 6.2, 4.8, 72, 'A winning', 'brand')}
      ${abTestRow('Product Page Image vs Video', 'Product-Static-A', 'Product-Video-B', 3.1, 4.2, 45, 'B winning', 'slate')}
      ${abTestRow('Holiday Headline Test', 'Flash-Sale-Headline-A', 'Flash-Sale-Headline-B', 2.8, 2.9, 31, 'Too early', 'brand')}
    </div>
  </div>

  <!-- ── AI GENERATE MODAL ─────────────────────────────────────────────────── -->
  <div id="generate-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn" style="border:1px solid rgba(139,92,246,0.4)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 glass z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
            <i class="fas fa-wand-magic-sparkles text-white"></i>
          </div>
          <div>
            <h2 class="font-bold text-white text-lg">AI Creative Generator</h2>
            <p class="text-xs text-slate-500">Powered by AdNova AI Engine v2</p>
          </div>
        </div>
        <button onclick="closeGenerateModal()" class="text-slate-500 hover:text-slate-300 w-9 h-9 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-6 space-y-5">
        <!-- Type Selector -->
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-2 block">Creative Type</label>
          <div class="grid grid-cols-4 gap-2">
            ${genTypeBtn('fa-image', 'AI Image', 'brand', true)}
            ${genTypeBtn('fa-video', 'AI Video', 'brand', false)}
            ${genTypeBtn('fa-user-check', 'UGC Style', 'slate', false)}
            ${genTypeBtn('fa-pen', 'Ad Copy', 'brand', false)}
          </div>
        </div>

        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Creative Brief / Prompt *</label>
          <textarea id="gen-prompt" rows="4" placeholder="Describe what you want: product, mood, target audience, style, colors, key message...
Example: 'Young woman confidently wearing our summer dress at the beach, golden hour, vibrant colors, lifestyle photography style, for 18-35 female audience'"
            class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all resize-none bg-transparent"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Platform Format</label>
            <select id="gen-format" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
              <option>📱 Square 1:1 (All platforms)</option>
              <option>📺 Landscape 16:9 (YouTube/FB)</option>
              <option>📱 Story 9:16 (IG/TikTok)</option>
              <option>🎞️ Portrait 4:5 (Instagram Feed)</option>
              <option>📌 Pin 2:3 (Pinterest)</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Style</label>
            <select id="gen-style" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
              <option>📸 Lifestyle Photography</option>
              <option>🎨 Illustration</option>
              <option>👔 Professional/Corporate</option>
              <option>🎭 UGC / Authentic</option>
              <option>✨ Luxury Premium</option>
              <option>🎉 Bold & Colorful</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Campaign</label>
            <select id="gen-campaign" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
              <option>Summer Collection 2026</option>
              <option>Product Launch Q3</option>
              <option>Brand Awareness Wave</option>
              <option>Holiday Flash Sale</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Variants</label>
            <div class="flex items-center gap-2 pt-1">
              ${variantBtn(1)}&nbsp;${variantBtn(2)}&nbsp;${variantBtn(3, true)}&nbsp;${variantBtn(5)}&nbsp;${variantBtn(8)}
            </div>
          </div>
        </div>

        <!-- Headline & Brand Text -->
        <div class="glass rounded-xl p-4">
          <h4 class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Text Overlay</h4>
          <div class="grid grid-cols-1 gap-3">
            <div>
              <label class="text-xs text-slate-500 mb-1 block">Headline</label>
              <input id="gen-headline" type="text" placeholder="Summer Sale — Up to 60% Off!" class="w-full glass rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
            <div>
              <label class="text-xs text-slate-500 mb-1 block">CTA Button Text</label>
              <input id="gen-cta" type="text" placeholder="Shop Now" class="w-full glass rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-brand-500 transition-all bg-transparent"/>
            </div>
          </div>
        </div>

        <div class="glass rounded-xl p-4 border border-brand-500/20">
          <div class="flex items-center gap-2 mb-3">
            <i class="fas fa-brain text-brand-400 text-sm"></i>
            <span class="text-sm font-semibold text-white">AI Enhancements</span>
          </div>
          <div class="space-y-2">
            ${genToggle('gen-headline-ai', 'Add AI-generated headline overlay', true)}
            ${genToggle('gen-logo', 'Add brand logo watermark', true)}
            ${genToggle('gen-adapt', 'Auto-adapt for all selected platforms', true)}
            ${genToggle('gen-copy', 'Generate matching ad copy text', true)}
            ${genToggle('gen-variant', 'Create A/B color variation', false)}
            ${genToggle('gen-hook', 'Add scroll-stopping hook (video only)', true)}
          </div>
        </div>

        <button onclick="generateCreatives()" id="gen-btn" class="w-full bg-gradient-to-r from-brand-600 to-brand-600 hover:from-brand-500 hover:to-brand-500 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg">
          <i class="fas fa-wand-magic-sparkles"></i> Generate 3 Creatives Now
        </button>
      </div>
    </div>
  </div>

  <!-- ── MANUAL EDITOR MODAL ───────────────────────────────────────────────── -->
  <div id="editor-modal" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-stretch">
    <!-- Left panel: tools -->
    <div class="w-64 glass border-r border-white/10 p-4 flex flex-col gap-4 overflow-y-auto">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
          <i class="fas fa-pencil-ruler text-white text-xs"></i>
        </div>
        <div>
          <h3 class="font-bold text-white text-sm">Creative Editor</h3>
          <p class="text-xs text-slate-500">Manual Ad Builder</p>
        </div>
      </div>

      <!-- Format selector -->
      <div>
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Canvas Size</label>
        <div class="grid grid-cols-2 gap-1.5">
          <button onclick="setCanvasSize(400,400,this)" class="editor-size-btn text-xs glass rounded-lg py-2 text-slate-300 hover:bg-white/10 transition-all active-size">1:1 Square</button>
          <button onclick="setCanvasSize(480,270,this)" class="editor-size-btn text-xs glass rounded-lg py-2 text-slate-400 hover:bg-white/10 transition-all">16:9 Land.</button>
          <button onclick="setCanvasSize(270,480,this)" class="editor-size-btn text-xs glass rounded-lg py-2 text-slate-400 hover:bg-white/10 transition-all">9:16 Story</button>
          <button onclick="setCanvasSize(320,400,this)" class="editor-size-btn text-xs glass rounded-lg py-2 text-slate-400 hover:bg-white/10 transition-all">4:5 Feed</button>
        </div>
      </div>

      <!-- Background -->
      <div>
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Background</label>
        <div class="grid grid-cols-4 gap-1.5 mb-2">
          <button onclick="setBg('#1a1a2e')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:#1a1a2e"></button>
          <button onclick="setBg('#0f3460')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:#0f3460"></button>
          <button onclick="setBg('linear-gradient(135deg,#667eea,#764ba2)')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:linear-gradient(135deg,#667eea,#764ba2)"></button>
          <button onclick="setBg('linear-gradient(135deg,#f953c6,#b91d73)')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:linear-gradient(135deg,#f953c6,#b91d73)"></button>
          <button onclick="setBg('linear-gradient(135deg,#11998e,#38ef7d)')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:linear-gradient(135deg,#11998e,#38ef7d)"></button>
          <button onclick="setBg('linear-gradient(135deg,#fc4a1a,#f7b733)')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:linear-gradient(135deg,#fc4a1a,#f7b733)"></button>
          <button onclick="setBg('#ffffff')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:#ffffff"></button>
          <button onclick="setBg('#000000')" class="w-8 h-8 rounded-lg border-2 border-white/20 hover:border-white/50 transition-all" style="background:#000000"></button>
        </div>
        <input type="color" onchange="setBg(this.value)" class="w-full h-7 rounded cursor-pointer" title="Custom color"/>
      </div>

      <!-- Add Elements -->
      <div>
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Add Element</label>
        <div class="space-y-1.5">
          <button onclick="addText('Headline Here', 28, '#ffffff', 'bold')" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2 transition-all">
            <i class="fas fa-heading text-slate-400 w-4"></i> Add Headline
          </button>
          <button onclick="addText('Your tagline...', 16, '#e2e8f0', 'normal')" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2 transition-all">
            <i class="fas fa-align-left text-slate-400 w-4"></i> Add Subtext
          </button>
          <button onclick="addCTA('Shop Now')" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2 transition-all">
            <i class="fas fa-mouse-pointer text-brand-400 w-4"></i> Add CTA Button
          </button>
          <button onclick="addShape('rect')" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2 transition-all">
            <i class="fas fa-square text-brand-400 w-4"></i> Add Rectangle
          </button>
          <button onclick="addShape('circle')" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2 transition-all">
            <i class="fas fa-circle text-brand-400 w-4"></i> Add Circle
          </button>
          <button onclick="addBadge('SALE -50%')" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2 transition-all">
            <i class="fas fa-tag text-brand-400 w-4"></i> Add Promo Badge
          </button>
          <label class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer">
            <i class="fas fa-image text-brand-400 w-4"></i> Upload Image
            <input type="file" accept="image/*" class="hidden" onchange="addImage(event)"/>
          </label>
        </div>
      </div>

      <!-- Element Properties -->
      <div id="element-props" class="hidden">
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Element Style</label>
        <div class="space-y-2">
          <div>
            <label class="text-xs text-slate-500 mb-1 block">Text Color</label>
            <input type="color" id="prop-color" onchange="updateSelectedColor(this.value)" class="w-full h-7 rounded cursor-pointer"/>
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">Font Size</label>
            <input type="range" id="prop-size" min="8" max="80" value="24" oninput="updateSelectedSize(this.value)" class="w-full"/>
          </div>
          <div>
            <label class="text-xs text-slate-500 mb-1 block">Opacity</label>
            <input type="range" id="prop-opacity" min="10" max="100" value="100" oninput="updateSelectedOpacity(this.value)" class="w-full"/>
          </div>
          <button onclick="deleteSelected()" class="w-full bg-slate-500/20 hover:bg-slate-500/30 text-slate-400 text-xs py-2 rounded-lg transition-all flex items-center justify-center gap-1.5">
            <i class="fas fa-trash text-xs"></i> Delete Element
          </button>
        </div>
      </div>
    </div>

    <!-- Center: Canvas -->
    <div class="flex-1 flex flex-col items-center justify-center bg-black/40 p-6 overflow-auto">
      <div class="mb-4 flex items-center gap-3">
        <button onclick="zoomCanvas(-0.1)" class="glass hover:bg-white/10 text-slate-400 w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"><i class="fas fa-minus"></i></button>
        <span class="text-xs text-slate-400" id="zoom-label">100%</span>
        <button onclick="zoomCanvas(0.1)" class="glass hover:bg-white/10 text-slate-400 w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"><i class="fas fa-plus"></i></button>
        <button onclick="clearCanvas()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-all ml-2"><i class="fas fa-eraser mr-1"></i>Clear</button>
        <button onclick="undoLast()" class="glass hover:bg-white/10 text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-undo mr-1"></i>Undo</button>
      </div>

      <!-- Canvas Area -->
      <div id="canvas-wrapper" style="transform-origin:top center; transition:transform 0.2s">
        <div id="ad-canvas" style="width:400px;height:400px;background:#1a1a2e;position:relative;overflow:hidden;border-radius:8px;box-shadow:0 25px 60px rgba(0,0,0,0.8);cursor:default"
          onclick="deselectAll(event)">
          <!-- Elements are added here dynamically -->
          <div class="ad-element" data-type="text" style="position:absolute;top:40px;left:50%;transform:translateX(-50%);width:90%;text-align:center;font-size:28px;font-weight:bold;color:#ffffff;cursor:move;user-select:none;text-shadow:0 2px 8px rgba(0,0,0,0.5)"
            onmousedown="startDrag(event)" onclick="selectElement(event,this)">
            Your Ad Headline
          </div>
          <div class="ad-element" data-type="text" style="position:absolute;top:100px;left:50%;transform:translateX(-50%);width:80%;text-align:center;font-size:16px;color:#e2e8f0;cursor:move;user-select:none;opacity:0.85"
            onmousedown="startDrag(event)" onclick="selectElement(event,this)">
            Discover amazing products at unbeatable prices
          </div>
          <div class="ad-element ad-cta" data-type="cta" style="position:absolute;bottom:40px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;padding:12px 32px;border-radius:50px;font-size:14px;font-weight:bold;cursor:move;user-select:none;white-space:nowrap;box-shadow:0 4px 20px rgba(124,58,237,0.5)"
            onmousedown="startDrag(event)" onclick="selectElement(event,this)">
            Shop Now →
          </div>
        </div>
      </div>
    </div>

    <!-- Right panel: properties & export -->
    <div class="w-56 glass border-l border-white/10 p-4 flex flex-col gap-4 overflow-y-auto">
      <div>
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Creative Name</label>
        <input type="text" id="creative-name" placeholder="my-ad-creative" class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-200 outline-none border border-white/10 focus:border-slate-500 bg-transparent"/>
      </div>
      <div>
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Campaign</label>
        <select id="creative-campaign" class="w-full glass rounded-lg px-3 py-2 text-xs text-slate-300 outline-none border border-white/10 bg-transparent">
          <option>Summer Collection 2026</option>
          <option>Product Launch Q3</option>
          <option>Brand Awareness Wave</option>
          <option>Holiday Flash Sale</option>
        </select>
      </div>
      <div>
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Platforms</label>
        <div class="space-y-1.5">
          ${editorPlatform('Facebook', '#A8A8A8', true)}
          ${editorPlatform('Instagram', '#A8A8A8', true)}
          ${editorPlatform('TikTok', '#A8A8A8', false)}
          ${editorPlatform('Google', '#A8A8A8', false)}
          ${editorPlatform('YouTube', '#A8A8A8', false)}
          ${editorPlatform('LinkedIn', '#A8A8A8', false)}
        </div>
      </div>

      <!-- Elements list -->
      <div>
        <label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Layers</label>
        <div id="layers-list" class="space-y-1 max-h-40 overflow-y-auto text-xs">
          <div class="glass rounded px-2 py-1.5 text-slate-300 flex items-center gap-2"><i class="fas fa-heading text-slate-400 w-3"></i>Headline</div>
          <div class="glass rounded px-2 py-1.5 text-slate-300 flex items-center gap-2"><i class="fas fa-align-left text-slate-400 w-3"></i>Subtext</div>
          <div class="glass rounded px-2 py-1.5 text-slate-300 flex items-center gap-2"><i class="fas fa-mouse-pointer text-brand-400 w-3"></i>CTA Button</div>
        </div>
      </div>

      <div class="flex-1"></div>

      <!-- Save / Export -->
      <div class="space-y-2">
        <button onclick="saveCreative()" class="w-full bg-gradient-to-r from-brand-600 to-brand-600 hover:opacity-90 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
          <i class="fas fa-cloud-arrow-up text-xs"></i> Save to Studio
        </button>
        <button onclick="exportCreative('png')" class="w-full glass hover:bg-white/10 text-slate-300 text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
          <i class="fas fa-download text-xs"></i> Export PNG
        </button>
        <button onclick="closeEditorModal()" class="w-full glass hover:bg-slate-500/10 text-slate-400 text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
          <i class="fas fa-times text-xs"></i> Close Editor
        </button>
      </div>
    </div>
  </div>

  <!-- ── Creative Detail Modal ─────────────────────────────────────────────── -->
  <div id="creative-detail-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-xl animate-fadeIn" style="border:1px solid rgba(255,255,255,0.1)">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <h3 class="font-bold text-white" id="detail-title">Creative Details</h3>
        <button onclick="closeDetailModal()" class="text-slate-500 hover:text-slate-300 w-9 h-9 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5" id="detail-content"></div>
    </div>
  </div>

  <!-- ── A/B Test Setup Modal ──────────────────────────────────────────────── -->
  <div id="abtest-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="glass rounded-2xl w-full max-w-md animate-fadeIn border border-slate-500/30">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-slate-500/20 flex items-center justify-center"><i class="fas fa-flask text-slate-400 text-sm"></i></div>
          <h3 class="font-bold text-white">New A/B Test</h3>
        </div>
        <button onclick="closeABTestModal()" class="text-slate-500 hover:text-slate-300 w-9 h-9 glass rounded-lg flex items-center justify-center"><i class="fas fa-times"></i></button>
      </div>
      <div class="p-5 space-y-4">
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Test Name</label>
          <input type="text" id="ab-name" placeholder="e.g., Holiday Banner A vs B" class="w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border border-white/10 focus:border-slate-500 transition-all bg-transparent"/>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Variant A</label>
            <select class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
              <option>Summer-Hero-V3</option>
              <option>Product-Showcase-B</option>
              <option>UGC-Testimonial-V2</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Variant B</label>
            <select class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
              <option>Flash-Sale-Countdown</option>
              <option>New-Look-Static</option>
              <option>Holiday-Banner-V2</option>
            </select>
          </div>
        </div>
        <div>
          <label class="text-xs font-semibold text-slate-400 mb-1.5 block">Duration</label>
          <select class="w-full glass rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none border border-white/10 bg-transparent">
            <option>7 days</option><option selected>14 days</option><option>30 days</option>
          </select>
        </div>
        <div class="flex gap-3 pt-2">
          <button onclick="startABTest()" class="flex-1 bg-gradient-to-r from-slate-600 to-slate-600 hover:opacity-90 text-white py-3 rounded-xl text-sm font-bold">Start A/B Test</button>
          <button onclick="closeABTestModal()" class="flex-1 glass hover:bg-white/10 text-slate-400 py-3 rounded-xl text-sm font-semibold">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <style>
    .creative-tab.active-ct { background:rgba(139,92,246,0.2); color:#c4b5fd; border-color:rgba(139,92,246,0.4); }
    .creative-tab { border:1px solid rgba(255,255,255,0.08); }
    .creative-card:hover .creative-overlay { opacity: 1; }
    .creative-overlay { opacity: 0; transition: opacity 0.2s; }
    .ad-element.selected { outline: 2px dashed #7c3aed; outline-offset: 2px; }
    .editor-size-btn.active-size { background: rgba(99,102,241,0.2); color: #a5b4fc; }
  </style>

  <script>
    // ── AI Generate ──────────────────────────────────────────────────────────
    function setCreativeTab(tab, btn) {
      document.querySelectorAll('.creative-tab').forEach(b => b.classList.remove('active-ct'));
      btn.classList.add('active-ct');
      document.querySelectorAll('.creative-grid-item').forEach(card => {
        const t = card.dataset.type;
        card.style.display = (tab === 'all' || t === tab) ? '' : 'none';
      });
    }

    function openGenerateModal() { document.getElementById('generate-modal').classList.remove('hidden'); }
    function closeGenerateModal() { document.getElementById('generate-modal').classList.add('hidden'); }

    function generateCreatives() {
      const prompt = document.getElementById('gen-prompt').value.trim();
      if(!prompt) { showCrToast('Please enter a creative brief/prompt', 'error'); return; }
      const btn = document.getElementById('gen-btn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI is generating...';
      btn.disabled = true;
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 12 + 3;
        if (p >= 100) {
          clearInterval(interval);
          btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate 3 Creatives Now';
          btn.disabled = false;
          closeGenerateModal();
          // Add 3 new creative cards to the grid
          const grid = document.getElementById('creatives-grid');
          const types = ['image','video','ugc'];
          const names = ['AI-Gen-' + Date.now(), 'AI-Video-' + Date.now(), 'UGC-Style-' + Date.now()];
          const ctrs = [4.2 + Math.random()*2, 3.8 + Math.random()*2, 3.1 + Math.random()*2];
          const camp = document.getElementById('gen-campaign').value;
          for(let i=0;i<3;i++){
            const div = document.createElement('div');
            div.innerHTML = buildCreativeCardHTML('cr_ai_' + i, names[i], types[i], parseFloat(ctrs[i].toFixed(1)), 'active', camp, 'Facebook', false, Math.floor(60 + Math.random()*35));
            div.firstElementChild.classList.add('creative-grid-item');
            div.firstElementChild.dataset.type = types[i];
            grid.prepend(div.firstElementChild);
          }
          showCrToast('✨ 3 AI creatives generated successfully!');
        }
      }, 300);
    }

    // ── Toast ──────────────────────────────────────────────────────────────
    function showCrToast(msg, type = 'success') {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-6 right-6 glass px-5 py-3 rounded-xl text-sm font-medium text-white z-[100] animate-fadeIn border ' + (type === 'error' ? 'border-slate-500/30' : 'border-brand-500/30');
      toast.innerHTML = (type === 'error' ? '<i class="fas fa-times-circle text-slate-400 mr-2"></i>' : '<i class="fas fa-check-circle text-brand-400 mr-2"></i>') + msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }

    // ── Creative Detail ───────────────────────────────────────────────────
    function openCreativeDetail(id) {
      // Minimal detail modal
      document.getElementById('detail-title').textContent = 'Creative #' + id;
      document.getElementById('detail-content').innerHTML = \`
        <div class="space-y-4">
          <div class="aspect-video rounded-xl bg-gradient-to-br from-brand-900 to-brand-900 flex items-center justify-center">
            <i class="fas fa-photo-film text-brand-400 text-5xl opacity-50"></i>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="glass rounded-xl p-3 text-center"><div class="text-xs text-slate-500">CTR</div><div class="font-bold text-brand-400">5.2%</div></div>
            <div class="glass rounded-xl p-3 text-center"><div class="text-xs text-slate-500">Score</div><div class="font-bold text-brand-400">91</div></div>
            <div class="glass rounded-xl p-3 text-center"><div class="text-xs text-slate-500">Status</div><div class="font-bold text-brand-400">Active</div></div>
          </div>
          <div class="flex gap-3">
            <button onclick="openEditorModal();closeDetailModal()" class="flex-1 glass hover:bg-slate-500/10 text-slate-400 py-2.5 rounded-xl text-sm font-semibold border border-slate-500/20">
              <i class="fas fa-edit mr-1.5"></i>Edit
            </button>
            <button onclick="showCrToast('Creative duplicated');closeDetailModal()" class="flex-1 glass hover:bg-brand-500/10 text-brand-400 py-2.5 rounded-xl text-sm font-semibold border border-brand-500/20">
              <i class="fas fa-copy mr-1.5"></i>Duplicate
            </button>
            <button onclick="if(confirm('Delete this creative?')){this.closest('.glass').closest('[id]').querySelector('#detail-content').innerHTML='';closeDetailModal();showCrToast('Creative deleted')}" class="glass hover:bg-slate-500/10 text-slate-400 py-2.5 px-4 rounded-xl text-sm border border-slate-500/20">
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      \`;
      document.getElementById('creative-detail-modal').classList.remove('hidden');
    }
    function closeDetailModal() { document.getElementById('creative-detail-modal').classList.add('hidden'); }

    // ── A/B Test ──────────────────────────────────────────────────────────
    function openABTestModal() { document.getElementById('abtest-modal').classList.remove('hidden'); }
    function closeABTestModal() { document.getElementById('abtest-modal').classList.add('hidden'); }
    function startABTest() {
      const name = document.getElementById('ab-name').value.trim();
      if(!name) { showCrToast('Enter a test name', 'error'); return; }
      closeABTestModal();
      showCrToast('🧪 A/B test "' + name + '" started!');
    }

    // ── Progress Ticker ────────────────────────────────────────────────────
    const prog = document.getElementById('gen-progress');
    const pct = document.getElementById('gen-pct');
    if(prog && pct) {
      let w = 67;
      setInterval(() => {
        w = Math.min(100, w + 0.3);
        prog.style.width = w + '%';
        pct.textContent = Math.round(w) + '%';
        if(w >= 100) { prog.style.background = '#FF4D00'; pct.style.color = '#FF4D00'; }
      }, 2000);
    }

    // ── Manual Editor ─────────────────────────────────────────────────────
    let selectedEl = null;
    let canvasScale = 1;
    let history = [];

    function openEditorModal() { document.getElementById('editor-modal').classList.remove('hidden'); }
    function closeEditorModal() { document.getElementById('editor-modal').classList.add('hidden'); }

    function setCanvasSize(w, h, btn) {
      const canvas = document.getElementById('ad-canvas');
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      document.querySelectorAll('.editor-size-btn').forEach(b => b.classList.remove('active-size'));
      btn.classList.add('active-size');
    }

    function zoomCanvas(delta) {
      canvasScale = Math.max(0.3, Math.min(2, canvasScale + delta));
      document.getElementById('canvas-wrapper').style.transform = 'scale(' + canvasScale + ')';
      document.getElementById('zoom-label').textContent = Math.round(canvasScale * 100) + '%';
    }

    function setBg(bg) {
      const canvas = document.getElementById('ad-canvas');
      if(bg.includes('gradient')) { canvas.style.background = bg; }
      else { canvas.style.background = bg; }
    }

    function addText(text, size, color, weight) {
      const canvas = document.getElementById('ad-canvas');
      const el = document.createElement('div');
      el.className = 'ad-element';
      el.dataset.type = 'text';
      el.style.cssText = \`position:absolute;top:\${40 + canvas.querySelectorAll('.ad-element').length * 30}px;left:50%;transform:translateX(-50%);width:90%;text-align:center;font-size:\${size}px;font-weight:\${weight};color:\${color};cursor:move;user-select:none;padding:4px\`;
      el.textContent = text;
      el.setAttribute('contenteditable','true');
      el.addEventListener('mousedown', e => startDrag(e));
      el.addEventListener('click', e => selectElement(e, el));
      canvas.appendChild(el);
      addLayerEntry('text', text.substring(0,15));
      saveHistory();
    }

    function addCTA(text) {
      const canvas = document.getElementById('ad-canvas');
      const el = document.createElement('div');
      el.className = 'ad-element ad-cta';
      el.dataset.type = 'cta';
      el.style.cssText = \`position:absolute;bottom:40px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;padding:12px 32px;border-radius:50px;font-size:14px;font-weight:bold;cursor:move;user-select:none;white-space:nowrap;box-shadow:0 4px 20px rgba(124,58,237,0.5)\`;
      el.textContent = text;
      el.setAttribute('contenteditable','true');
      el.addEventListener('mousedown', e => startDrag(e));
      el.addEventListener('click', e => selectElement(e, el));
      canvas.appendChild(el);
      addLayerEntry('cta', text);
      saveHistory();
    }

    function addShape(type) {
      const canvas = document.getElementById('ad-canvas');
      const el = document.createElement('div');
      el.className = 'ad-element';
      el.dataset.type = 'shape';
      const w = type === 'circle' ? '80px' : '120px';
      const h = '80px';
      el.style.cssText = \`position:absolute;top:50px;left:50%;transform:translateX(-50%);width:\${w};height:\${h};background:rgba(99,102,241,0.5);border-radius:\${type==='circle'?'50%':'8px'};cursor:move;user-select:none;border:2px solid rgba(99,102,241,0.8)\`;
      el.addEventListener('mousedown', e => startDrag(e));
      el.addEventListener('click', e => selectElement(e, el));
      canvas.appendChild(el);
      addLayerEntry('shape', type);
      saveHistory();
    }

    function addBadge(text) {
      const canvas = document.getElementById('ad-canvas');
      const el = document.createElement('div');
      el.className = 'ad-element';
      el.dataset.type = 'badge';
      el.style.cssText = 'position:absolute;top:20px;right:20px;transform:none;background:linear-gradient(135deg,#FF6B2B,#7A7A7A);color:#fff;padding:8px 16px;border-radius:50px;font-size:13px;font-weight:900;cursor:move;user-select:none;box-shadow:0 4px 15px rgba(122,122,122,0.5);letter-spacing:0.5px';
      el.textContent = text;
      el.setAttribute('contenteditable','true');
      el.addEventListener('mousedown', e => startDrag(e));
      el.addEventListener('click', e => selectElement(e, el));
      canvas.appendChild(el);
      addLayerEntry('badge', text);
      saveHistory();
    }

    function addImage(event) {
      const file = event.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const canvas = document.getElementById('ad-canvas');
        const el = document.createElement('img');
        el.className = 'ad-element';
        el.dataset.type = 'image';
        el.src = e.target.result;
        el.style.cssText = 'position:absolute;top:30px;left:50%;transform:translateX(-50%);max-width:80%;max-height:60%;cursor:move;user-select:none;border-radius:4px;object-fit:contain';
        el.addEventListener('mousedown', evt => startDrag(evt));
        el.addEventListener('click', evt => selectElement(evt, el));
        canvas.appendChild(el);
        addLayerEntry('image', file.name.substring(0,15));
      };
      reader.readAsDataURL(file);
    }

    function addLayerEntry(type, label) {
      const icons = { text:'fa-heading text-slate-400', cta:'fa-mouse-pointer text-brand-400', shape:'fa-square text-brand-400', badge:'fa-tag text-brand-400', image:'fa-image text-brand-400' };
      const list = document.getElementById('layers-list');
      const div = document.createElement('div');
      div.className = 'glass rounded px-2 py-1.5 text-slate-300 flex items-center gap-2 text-xs';
      div.innerHTML = '<i class="fas ' + (icons[type]||'fa-layer-group text-slate-400') + ' w-3"></i>' + label;
      list.appendChild(div);
    }

    function selectElement(e, el) {
      e.stopPropagation();
      deselectAll();
      el.classList.add('selected');
      selectedEl = el;
      document.getElementById('element-props').classList.remove('hidden');
    }

    function deselectAll(e) {
      if(e && e.target.closest('.ad-element')) return;
      document.querySelectorAll('.ad-element').forEach(el => el.classList.remove('selected'));
      selectedEl = null;
      document.getElementById('element-props').classList.add('hidden');
    }

    function updateSelectedColor(val) {
      if(selectedEl) selectedEl.style.color = val;
    }
    function updateSelectedSize(val) {
      if(selectedEl) selectedEl.style.fontSize = val + 'px';
    }
    function updateSelectedOpacity(val) {
      if(selectedEl) selectedEl.style.opacity = val / 100;
    }
    function deleteSelected() {
      if(selectedEl) { selectedEl.remove(); selectedEl = null; document.getElementById('element-props').classList.add('hidden'); saveHistory(); }
    }

    // ── Drag & Drop ───────────────────────────────────────────────────────
    let dragging = null, ox = 0, oy = 0;
    function startDrag(e) {
      if(e.target.isContentEditable && document.activeElement === e.target) return;
      e.preventDefault();
      dragging = e.currentTarget;
      const rect = dragging.getBoundingClientRect();
      ox = e.clientX - rect.left;
      oy = e.clientY - rect.top;
      dragging.style.transform = 'none';
      document.onmousemove = onDrag;
      document.onmouseup = stopDrag;
    }
    function onDrag(e) {
      if(!dragging) return;
      const canvas = document.getElementById('ad-canvas');
      const cr = canvas.getBoundingClientRect();
      const x = (e.clientX - cr.left - ox) / canvasScale;
      const y = (e.clientY - cr.top - oy) / canvasScale;
      dragging.style.left = Math.max(0, x) + 'px';
      dragging.style.top = Math.max(0, y) + 'px';
      dragging.style.bottom = 'auto';
    }
    function stopDrag() { dragging = null; document.onmousemove = null; document.onmouseup = null; saveHistory(); }

    function clearCanvas() {
      if(!confirm('Clear all elements from canvas?')) return;
      document.querySelectorAll('.ad-element').forEach(el => el.remove());
      document.getElementById('layers-list').innerHTML = '';
      showCrToast('Canvas cleared');
    }

    function saveHistory() {
      const canvas = document.getElementById('ad-canvas');
      history.push(canvas.innerHTML);
      if(history.length > 20) history.shift();
    }
    function undoLast() {
      if(history.length < 2) { showCrToast('Nothing to undo', 'error'); return; }
      history.pop();
      document.getElementById('ad-canvas').innerHTML = history[history.length-1] || '';
      showCrToast('Undo successful');
    }

    function saveCreative() {
      const name = document.getElementById('creative-name').value || 'Manual-Creative-' + Date.now();
      // Add to grid
      const grid = document.getElementById('creatives-grid');
      const div = document.createElement('div');
      div.innerHTML = buildCreativeCardHTML('cr_manual_' + Date.now(), name, 'image', 0, 'active', 'New Creative', 'Facebook', false, 75);
      div.firstElementChild.classList.add('creative-grid-item');
      div.firstElementChild.dataset.type = 'image';
      grid.prepend(div.firstElementChild);
      showCrToast('✅ "' + name + '" saved to Creative Studio!');
      closeEditorModal();
    }

    function exportCreative(format) {
      const name = document.getElementById('creative-name')?.value || 'adnova-creative';
      const canvas = document.getElementById('ad-canvas');
      if (!canvas) { showCrToast('No canvas to export', 'error'); return; }
      showCrToast('⏳ Exporting "' + name + '" as ' + format.toUpperCase() + '...', 'info');
      // SVG/HTML export (fallback for demo — production uses html2canvas)
      setTimeout(() => {
        const w = parseInt(canvas.style.width) || 400;
        const h = parseInt(canvas.style.height) || 400;
        const bg = canvas.style.background || '#1a1a2e';
        // Build SVG with elements
        const elements = canvas.querySelectorAll('.canvas-el');
        let svgContent = '';
        elements.forEach(el => {
          const left = parseInt(el.style.left) || 0;
          const top = parseInt(el.style.top) || 0;
          const text = el.textContent.trim();
          const fontSize = parseInt(el.style.fontSize) || 16;
          const color = el.style.color || '#ffffff';
          if (text) svgContent += '<text x="' + (left+w/2) + '" y="' + (top+fontSize) + '" font-size="' + fontSize + '" fill="' + color + '" text-anchor="middle">' + text + '</text>';
        });
        const svg = '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><rect width="' + w + '" height="' + h + '" fill="' + bg.replace(/linear-gradient[^)]+\)/,'#1a1a2e') + '"/>' + svgContent + '</svg>';
        const blob = new Blob([svg], {type:'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = name + '.' + (format === 'png' ? 'svg' : format);
        a.click(); URL.revokeObjectURL(url);
        showCrToast('✓ "' + name + '" exporté en ' + format.toUpperCase() + '!', 'success');
      }, 800);
    }

    // ── Build creative card HTML ───────────────────────────────────────────
    function buildCreativeCardHTML(id, name, type, ctr, status, campaign, platforms, starred, score) {
      const colors = { video:'brand', image:'slate', ugc:'brand', copy:'brand' };
      const icons = { video:'fa-video', image:'fa-image', ugc:'fa-user-check', copy:'fa-pen' };
      const grads = { video:'from-brand-900 to-brand-800', image:'from-slate-900 to-slate-800', ugc:'from-brand-900 to-brand-800', copy:'from-brand-900 to-brand-800' };
      const statusBadge = status === 'active' ? 'badge-live' : status === 'testing' ? 'badge-scaling' : 'badge-killed';
      const c = colors[type] || 'slate';
      const scoreColor = score >= 80 ? 'brand' : score >= 50 ? 'brand' : 'slate';
      return \`<div class="glass rounded-xl overflow-hidden card-hover cursor-pointer creative-card creative-grid-item" data-id="\${id}" data-type="\${type}" onclick="openCreativeDetail('\${id}')">
        <div class="bg-gradient-to-br \${grads[type]||'from-slate-800 to-slate-700'} aspect-square relative flex items-center justify-center">
          <i class="fas \${icons[type]||'fa-image'} text-\${c}-400 text-3xl opacity-40"></i>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="creative-overlay absolute inset-0 flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm">
            <button onclick="event.stopPropagation();openCreativeDetail('\${id}')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"><i class="fas fa-eye text-white text-xs"></i></button>
            <button onclick="event.stopPropagation();openEditorModal()" class="w-8 h-8 rounded-lg bg-brand-600 hover:bg-brand-500 flex items-center justify-center"><i class="fas fa-edit text-white text-xs"></i></button>
            <button onclick="event.stopPropagation();showCrToast('Creative duplicated')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"><i class="fas fa-copy text-white text-xs"></i></button>
          </div>
          <div class="absolute top-2 left-2 flex items-center gap-1">
            <span class="text-xs px-1.5 py-0.5 rounded-md bg-\${c}-500/80 text-white font-semibold capitalize">\${type}</span>
            \${starred ? '<span class="text-xs px-1.5 py-0.5 rounded-md bg-brand-500/80 text-white"><i class="fas fa-star text-xs"></i></span>' : ''}
          </div>
          \${ctr > 0 ? '<div class="absolute top-2 right-2"><span class="text-xs px-1.5 py-0.5 rounded-md bg-black/60 text-' + scoreColor + '-400 font-bold">' + ctr.toFixed(1) + '% CTR</span></div>' : ''}
        </div>
        <div class="p-3">
          <div class="text-xs font-semibold text-slate-200 truncate mb-1">\${name}</div>
          <div class="text-xs text-slate-500 truncate mb-2">\${campaign}</div>
          <div class="flex items-center justify-between">
            <span class="\${statusBadge} text-xs px-1.5 py-0.5 rounded-full font-semibold capitalize">\${status}</span>
            <div class="flex items-center gap-1">
              <div class="w-12 progress-bar"><div class="progress-fill bg-\${scoreColor}-500" style="width:\${score}%"></div></div>
              <span class="text-xs text-\${scoreColor}-400">\${score}</span>
            </div>
          </div>
        </div>
      </div>\`;
    }
  </script>
  `
  return shell('Creative Studio', content, '/creatives', lang)
}

function creativeStat(val: string, label: string, icon: string, color: string): string {
  return `<div class="glass rounded-xl p-4 flex items-center gap-3">
    <div class="w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400"></i>
    </div>
    <div><div class="text-2xl font-black text-white">${val}</div><div class="text-xs text-slate-500">${label}</div></div>
  </div>`
}

function creativeCard(id: string, name: string, type: string, ctr: number, status: string, campaign: string, platforms: string, starred: boolean, score: number): string {
  const typeColors: Record<string, string> = { video: 'brand', image: 'slate', ugc: 'brand', copy: 'brand' }
  const typeIcons: Record<string, string> = { video: 'fa-video', image: 'fa-image', ugc: 'fa-user-check', copy: 'fa-pen' }
  const statusBadge = status === 'active' ? 'badge-live' : status === 'testing' ? 'badge-scaling' : 'badge-killed'
  const color = typeColors[type] || 'slate'
  const icon = typeIcons[type] || 'fa-image'
  const scoreColor = score >= 80 ? 'brand' : score >= 50 ? 'brand' : 'slate'
  const gradients: Record<string, string> = {
    video: 'from-brand-900 to-brand-800', image: 'from-slate-900 to-slate-800',
    ugc: 'from-brand-900 to-brand-800', copy: 'from-brand-900 to-brand-800'
  }
  return `<div class="glass rounded-xl overflow-hidden card-hover cursor-pointer creative-card creative-grid-item" data-id="${id}" data-type="${type}" onclick="openCreativeDetail('${id}')">
    <div class="bg-gradient-to-br ${gradients[type] || 'from-slate-800 to-slate-700'} aspect-square relative flex items-center justify-center">
      <i class="fas ${icon} text-${color}-400 text-3xl opacity-40"></i>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="creative-overlay absolute inset-0 flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm">
        <button onclick="event.stopPropagation();openCreativeDetail('${id}')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">
          <i class="fas fa-eye text-white text-xs"></i>
        </button>
        <button onclick="event.stopPropagation();openEditorModal()" class="w-8 h-8 rounded-lg bg-brand-600 hover:bg-brand-500 flex items-center justify-center">
          <i class="fas fa-edit text-white text-xs"></i>
        </button>
        <button onclick="event.stopPropagation();showCrToast('Creative duplicated')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">
          <i class="fas fa-copy text-white text-xs"></i>
        </button>
      </div>
      <div class="absolute top-2 left-2 flex items-center gap-1">
        <span class="text-xs px-1.5 py-0.5 rounded-md bg-${color}-500/80 text-white font-semibold capitalize">${type}</span>
        ${starred ? '<span class="text-xs px-1.5 py-0.5 rounded-md bg-brand-500/80 text-white"><i class="fas fa-star text-xs"></i></span>' : ''}
      </div>
      <div class="absolute top-2 right-2">
        <span class="text-xs px-1.5 py-0.5 rounded-md bg-black/60 text-${scoreColor}-400 font-bold">${ctr}% CTR</span>
      </div>
    </div>
    <div class="p-3">
      <div class="text-xs font-semibold text-slate-200 truncate mb-1">${name}</div>
      <div class="text-xs text-slate-500 truncate mb-2">${campaign}</div>
      <div class="flex items-center justify-between">
        <span class="${statusBadge} text-xs px-1.5 py-0.5 rounded-full font-semibold capitalize">${status}</span>
        <div class="flex items-center gap-1">
          <div class="w-12 progress-bar">
            <div class="progress-fill bg-${scoreColor}-500" style="width:${score}%"></div>
          </div>
          <span class="text-xs text-${scoreColor}-400">${score}</span>
        </div>
      </div>
    </div>
  </div>`
}

function abTestRow(name: string, varA: string, varB: string, ctrA: number, ctrB: number, conf: number, winner: string, color: string): string {
  const aWin = ctrA > ctrB
  return `<div class="glass rounded-xl p-4">
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-semibold text-white">${name}</span>
      <span class="text-xs px-2 py-1 rounded-full bg-${color}-500/20 text-${color}-400">${winner}</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="glass rounded-lg p-3 ${aWin ? 'border border-brand-500/30' : ''}">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold text-slate-300">Variant A</span>
          ${aWin ? '<span class="text-xs text-brand-400"><i class="fas fa-trophy"></i></span>' : ''}
        </div>
        <div class="text-xs text-slate-500 truncate mb-1">${varA}</div>
        <div class="text-lg font-bold ${aWin ? 'text-brand-400' : 'text-slate-300'}">${ctrA}% CTR</div>
      </div>
      <div class="glass rounded-lg p-3 ${!aWin && winner !== 'Too early' ? 'border border-slate-500/30' : ''}">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold text-slate-300">Variant B</span>
          ${!aWin && winner !== 'Too early' ? '<span class="text-xs text-slate-400"><i class="fas fa-trophy"></i></span>' : ''}
        </div>
        <div class="text-xs text-slate-500 truncate mb-1">${varB}</div>
        <div class="text-lg font-bold ${!aWin && winner !== 'Too early' ? 'text-slate-400' : 'text-slate-300'}">${ctrB}% CTR</div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-3">
      <div class="flex items-center gap-2 flex-1">
        <span class="text-xs text-slate-500">Confidence:</span>
        <div class="progress-bar flex-1">
          <div class="progress-fill bg-gradient-to-r from-${color}-500 to-${color}-400" style="width:${conf}%"></div>
        </div>
        <span class="text-xs text-${color}-400">${conf}%</span>
      </div>
    </div>
  </div>`
}

function genTypeBtn(icon: string, label: string, color: string, active: boolean): string {
  return `<button onclick="document.querySelectorAll('.gen-type-btn').forEach(b=>b.classList.remove('active-gen','border-brand-500/50','bg-brand-500/10')); this.classList.add('active-gen','border-brand-500/50','bg-brand-500/10')"
    class="gen-type-btn glass hover:bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2 transition-all border ${active ? 'border-brand-500/50 bg-brand-500/10 active-gen' : 'border-white/10'}">
    <i class="fas ${icon} text-${color}-400 text-lg"></i>
    <span class="text-xs text-slate-400">${label}</span>
  </button>`
}

function variantBtn(n: number, active: boolean = false): string {
  return `<button onclick="document.querySelectorAll('.var-btn').forEach(b=>{b.classList.remove('bg-brand-600','text-white');b.classList.add('text-slate-400')}); this.classList.add('bg-brand-600','text-white'); this.classList.remove('text-slate-400')"
    class="var-btn w-10 h-10 rounded-lg glass flex items-center justify-center text-sm font-bold transition-all ${active ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-white/10'}">${n}</button>`
}

function genToggle(id: string, label: string, checked: boolean): string {
  return `<div class="flex items-center justify-between py-1.5">
    <span class="text-xs text-slate-400">${label}</span>
    <button id="${id}-toggle" onclick="this.classList.toggle('bg-brand-600'); this.classList.toggle('bg-white/10'); this.querySelector('div').classList.toggle('translate-x-4')"
      class="w-9 h-5 rounded-full relative transition-all flex-shrink-0 ${checked ? 'bg-brand-600' : 'bg-white/10'}">
      <div class="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 left-0.5 transition-all ${checked ? 'translate-x-4' : ''}"></div>
    </button>
  </div>`
}

function editorPlatform(name: string, color: string, checked: boolean): string {
  return `<label class="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" ${checked ? 'checked' : ''} class="accent-brand-500 w-3.5 h-3.5"/>
    <span class="text-xs text-slate-300">${name}</span>
  </label>`
}
