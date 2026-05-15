// Ad Pack Wizard — one-click full creative pack from a product image or URL.
// Generates 3 images + 1 video + 1 UGC sequentially with live progress.
// Step 3: inline editing of copy fields + launch to connected ad platform.
import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Image as ImageIcon,
  Video,
  Camera,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Pencil,
  Save,
  Rocket,
  ExternalLink,
  ChevronRight,
  Package,
  RefreshCw,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useCurrentTenantId } from "../../stores/tenantStore";
import { getSignedCreativeUrlBatch } from "../../lib/creatives";

// ─── Types ───────────────────────────────────────────────────────────────────

type WizardStep = "product" | "creating" | "pack";
type SlotKind = "image" | "video" | "ugc";
type SlotStatus = "waiting" | "generating" | "done" | "error";

type CreativeSlot = {
  key: string;
  kind: SlotKind;
  label: string;
  status: SlotStatus;
  creativeId?: string;
  storagePath?: string;
  url?: string;
  headline?: string;
  errorMsg?: string;
};

type AdPackInfo = {
  id: string;
  name: string;
  analysis_prompt: string;
  prompt_chars: number;
  analysis_meta: {
    product_title?: string;
    product_summary?: string;
    target_audience?: string;
    key_features?: string[];
    emotional_hook?: string;
  };
};

type PlatformConn = {
  platform: string;
  account_id: string;
  account_name: string | null;
};

type EditForm = {
  headline: string;
  primary_text: string;
  cta: string;
  landing_url: string;
};

const PLATFORM_LABELS: Record<string, string> = {
  meta: "Meta Ads",
  google: "Google Ads",
  tiktok: "TikTok Ads",
  linkedin: "LinkedIn Ads",
  snapchat: "Snapchat Ads",
  pinterest: "Pinterest Ads",
  x: "X Ads",
};

const PLATFORM_COLORS: Record<string, string> = {
  meta: "border-blue-500/30 bg-blue-500/[0.06] text-blue-400",
  google: "border-red-500/30 bg-red-500/[0.06] text-red-400",
  tiktok: "border-pink-500/30 bg-pink-500/[0.06] text-pink-400",
  linkedin: "border-sky-500/30 bg-sky-500/[0.06] text-sky-400",
  snapchat: "border-yellow-500/30 bg-yellow-500/[0.06] text-yellow-400",
  pinterest: "border-rose-500/30 bg-rose-500/[0.06] text-rose-400",
  x: "border-gray-500/30 bg-gray-500/[0.06] text-gray-400",
};

const INITIAL_SLOTS: CreativeSlot[] = [
  { key: "img1", kind: "image", label: "Image 1", status: "waiting" },
  { key: "img2", kind: "image", label: "Image 2", status: "waiting" },
  { key: "img3", kind: "image", label: "Image 3", status: "waiting" },
  { key: "vid",  kind: "video", label: "Video Ad", status: "waiting" },
  { key: "ugc",  kind: "ugc",   label: "UGC Video", status: "waiting" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function AdPackWizard({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const tenantId = useCurrentTenantId();

  // Step
  const [step, setStep] = useState<WizardStep>("product");

  // Product source
  const [productSource, setProductSource] = useState<"upload" | "url">("upload");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [productPageUrl, setProductPageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Creation
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [pack, setPack] = useState<AdPackInfo | null>(null);
  const [slots, setSlots] = useState<CreativeSlot[]>(INITIAL_SLOTS);
  const [analysisProgress, setAnalysisProgress] = useState<string>("");

  // Pack editor
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ headline: "", primary_text: "", cta: "Shop Now", landing_url: "" });
  const [savingEdit, setSavingEdit] = useState(false);

  // Platform launch
  const [platforms, setPlatforms] = useState<PlatformConn[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCreativeKey, setSelectedCreativeKey] = useState<string>("img1");
  const [launching, setLaunching] = useState(false);
  const [launchResult, setLaunchResult] = useState<{ url: string; message: string } | null>(null);
  const [launchError, setLaunchError] = useState<string | null>(null);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setStep("product");
      setUploadedImageUrl(null);
      setProductPageUrl("");
      setProductSource("upload");
      setUploadErr(null);
      setCreateError(null);
      setPack(null);
      setSlots(INITIAL_SLOTS);
      setEditingKey(null);
      setSignedUrls({});
      setSelectedPlatform(null);
      setLaunchResult(null);
      setLaunchError(null);
      setCreating(false);
      setAnalysisProgress("");
    }
  }, [open]);

  // ESC key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !creating) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, creating, onClose]);

  // Load signed URLs when slots finish
  useEffect(() => {
    const paths = slots.filter((s) => s.storagePath).map((s) => s.storagePath!);
    if (paths.length === 0) return;
    getSignedCreativeUrlBatch(paths).then((urlMap) => {
      setSignedUrls((prev) => ({ ...prev, ...urlMap }));
    });
  }, [slots]);

  // Load connected platforms when reaching pack step
  useEffect(() => {
    if (step !== "pack" || !tenantId) return;
    supabase
      .from("platform_connections")
      .select("platform, account_id, account_name")
      .eq("tenant_id", tenantId)
      .eq("is_active", true)
      .then(({ data }) => {
        if (data) setPlatforms(data as PlatformConn[]);
      });
  }, [step, tenantId]);

  // ─── File upload ─────────────────────────────────────────────────────────

  async function handleFileUpload(file: File) {
    if (!tenantId) return;
    if (file.size > 20 * 1024 * 1024) {
      setUploadErr("File too large (max 20 MB)");
      return;
    }
    setUploading(true);
    setUploadErr(null);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
      const path = `${tenantId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("product-sources")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;
      const { data: signed } = await supabase.storage
        .from("product-sources")
        .createSignedUrl(path, 7200); // 2h — enough for the whole wizard session
      if (signed?.signedUrl) setUploadedImageUrl(signed.signedUrl);
    } catch (e) {
      setUploadErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // ─── Full pack generation ─────────────────────────────────────────────────

  function updateSlot(key: string, patch: Partial<CreativeSlot>) {
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  }

  const runFullPack = useCallback(async () => {
    if (!tenantId) return;

    const productImageUrl = productSource === "upload" ? uploadedImageUrl : null;
    const productUrl = productSource === "url" ? productPageUrl.trim() : null;

    if (!productImageUrl && !productUrl) {
      setCreateError("Add a product image or URL first.");
      return;
    }

    setCreating(true);
    setCreateError(null);
    setSlots(INITIAL_SLOTS);
    setStep("creating");
    setAnalysisProgress("Analyzing product with AI…");

    // ── Step 1: Analyze ──────────────────────────────────────────────────
    let packInfo: AdPackInfo | null = null;
    try {
      const { data, error: fnErr } = await supabase.functions.invoke<{
        ad_pack?: AdPackInfo;
        error?: string;
        detail?: string;
      }>("analyze-product", {
        body: {
          tenant_id: tenantId,
          product_image_url: productImageUrl,
          product_url: productUrl,
          engine: "image",
          requested_images: 3,
          requested_videos: 1,
          requested_ugc: 1,
        },
      });
      if (fnErr) throw new Error(fnErr.message);
      if (!data) throw new Error("No response from analyze-product");
      if (data.error) throw new Error(`${data.error}${data.detail ? ` · ${data.detail.slice(0, 120)}` : ""}`);
      if (!data.ad_pack) throw new Error("No ad pack returned");
      packInfo = data.ad_pack;
      setPack(packInfo);
      setAnalysisProgress("Pack created · generating creatives…");
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : "Analysis failed");
      setCreating(false);
      setStep("product");
      return;
    }

    // ── Step 2: Build base body ──────────────────────────────────────────
    const baseBody: Record<string, unknown> = {
      tenant_id: tenantId,
      ad_pack_id: packInfo.id,
      prompt: packInfo.analysis_prompt,
    };
    if (productImageUrl) baseBody.product_image_url = productImageUrl;
    if (productUrl) baseBody.product_url = productUrl;
    if (packInfo.analysis_meta.product_title) baseBody.product_title = packInfo.analysis_meta.product_title;
    if (packInfo.analysis_meta.product_summary) baseBody.product_description = packInfo.analysis_meta.product_summary;

    // ── Step 3: Generate each slot sequentially ──────────────────────────
    const orders: Array<{ key: string; fn: string; extra: Record<string, unknown> }> = [
      { key: "img1", fn: "generate-creative-image", extra: { size: "1024x1024", style: "Photoreal" } },
      { key: "img2", fn: "generate-creative-image", extra: { size: "1024x1536", style: "Lifestyle" } },
      { key: "img3", fn: "generate-creative-image", extra: { size: "1536x1024", style: "Vibrant" } },
      {
        key: "vid",
        fn: "generate-creative-video",
        extra: { duration: 4, aspect: "9:16" },
      },
      {
        key: "ugc",
        fn: "generate-creative-ugc",
        extra: {
          script: buildUgcScript(packInfo),
        },
      },
    ];

    for (const order of orders) {
      updateSlot(order.key, { status: "generating" });
      try {
        const body = { ...baseBody, ...order.extra };
        // UGC uses 'script' not 'prompt'
        if (order.fn === "generate-creative-ugc") {
          delete body.prompt;
        }
        const { data, error: fnErr } = await supabase.functions.invoke<{
          creative?: { id: string; storage_path: string; headline: string };
          error?: string;
          detail?: string;
        }>(order.fn, { body });
        if (fnErr) throw new Error(fnErr.message);
        if (!data) throw new Error("No response");
        if (data.error) throw new Error(`${data.error}${data.detail ? ` · ${data.detail.slice(0, 80)}` : ""}`);
        if (!data.creative) throw new Error("No creative returned");
        updateSlot(order.key, {
          status: "done",
          creativeId: data.creative.id,
          storagePath: data.creative.storage_path,
          headline: data.creative.headline,
        });
      } catch (e) {
        updateSlot(order.key, {
          status: "error",
          errorMsg: e instanceof Error ? e.message.slice(0, 100) : "Generation failed",
        });
        // Continue to next slot even on error
      }
    }

    setCreating(false);
    setStep("pack");
    onSuccess();
  }, [tenantId, productSource, uploadedImageUrl, productPageUrl, onSuccess]);

  // ─── Inline editing ───────────────────────────────────────────────────────

  function openEdit(slot: CreativeSlot) {
    setEditingKey(slot.key);
    setEditForm({
      headline: slot.headline ?? "",
      primary_text: "",
      cta: "Shop Now",
      landing_url: "",
    });
    // Load current values from DB
    if (slot.creativeId) {
      supabase
        .from("creatives")
        .select("headline, primary_text, cta, landing_url")
        .eq("id", slot.creativeId)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setEditForm({
              headline: data.headline ?? "",
              primary_text: (data.primary_text as string | null) ?? "",
              cta: (data.cta as string | null) ?? "Shop Now",
              landing_url: (data.landing_url as string | null) ?? "",
            });
          }
        });
    }
  }

  async function saveEdit(slot: CreativeSlot) {
    if (!slot.creativeId) return;
    setSavingEdit(true);
    try {
      await supabase
        .from("creatives")
        .update({
          headline: editForm.headline || null,
          primary_text: editForm.primary_text || null,
          cta: editForm.cta || null,
          landing_url: editForm.landing_url || null,
        })
        .eq("id", slot.creativeId);
      updateSlot(slot.key, { headline: editForm.headline });
      setEditingKey(null);
    } finally {
      setSavingEdit(false);
    }
  }

  // ─── Platform launch ──────────────────────────────────────────────────────

  async function launchToPlatform() {
    if (!tenantId || !selectedPlatform) return;
    const slot = slots.find((s) => s.key === selectedCreativeKey);
    if (!slot?.creativeId) return;

    setLaunching(true);
    setLaunchError(null);
    setLaunchResult(null);

    try {
      const { data, error: fnErr } = await supabase.functions.invoke<{
        manager_url?: string;
        external_id?: string;
        message?: string;
        error?: string;
        detail?: string;
      }>("publish-creative", {
        body: {
          tenant_id: tenantId,
          creative_id: slot.creativeId,
          platform: selectedPlatform,
        },
      });
      if (fnErr) throw new Error(fnErr.message);
      if (!data) throw new Error("No response");
      if (data.error) throw new Error(`${data.error}${data.detail ? ` · ${data.detail.slice(0, 120)}` : ""}`);
      setLaunchResult({
        url: data.manager_url ?? "#",
        message: data.message ?? "Creative uploaded to your ad account.",
      });
    } catch (e) {
      setLaunchError(e instanceof Error ? e.message : "Launch failed");
    } finally {
      setLaunching(false);
    }
  }

  if (!open) return null;

  const doneSlots = slots.filter((s) => s.status === "done");
  const errorSlots = slots.filter((s) => s.status === "error");
  const allDone = slots.every((s) => s.status === "done" || s.status === "error");
  const progress = slots.filter((s) => s.status !== "waiting").length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={creating ? undefined : onClose}
      />
      <div className="glass-strong glass-highlight relative w-full max-w-3xl rounded-2xl my-4 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border glass-strong px-6 py-4">
          <div className="flex items-center gap-3">
            <Package className="h-4 w-4 text-orange" strokeWidth={2} />
            <div>
              <h2 className="text-sm font-bold text-ink">Create Full Ad Pack</h2>
              <p className="text-[11px] text-muted">3 images · 1 video · 1 UGC — one click</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Step indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted">
              <StepDot active={step === "product"} done={step !== "product"} n={1} label="Product" />
              <div className="h-px w-4 bg-border" />
              <StepDot active={step === "creating"} done={step === "pack"} n={2} label="Creating" />
              <div className="h-px w-4 bg-border" />
              <StepDot active={step === "pack"} done={false} n={3} label="Edit & Launch" />
            </div>
            <button
              onClick={onClose}
              disabled={creating}
              className="rounded-md p-1 text-muted-strong transition-colors hover:bg-white/[0.04] hover:text-ink disabled:opacity-40"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* ── STEP 1: PRODUCT ──────────────────────────────────────────────── */}
          {step === "product" && (
            <>
              {/* Source toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setProductSource("upload")}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors ${
                    productSource === "upload"
                      ? "border-orange/40 bg-orange/[0.08] text-orange"
                      : "border-border bg-white/[0.03] text-body hover:border-border-strong"
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  Upload product image
                </button>
                <button
                  onClick={() => setProductSource("url")}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors ${
                    productSource === "url"
                      ? "border-orange/40 bg-orange/[0.08] text-orange"
                      : "border-border bg-white/[0.03] text-body hover:border-border-strong"
                  }`}
                >
                  <LinkIcon className="h-4 w-4" />
                  Product page URL
                </button>
              </div>

              {/* Upload area */}
              {productSource === "upload" && (
                <>
                  {uploadedImageUrl ? (
                    <div className="flex items-center gap-4 rounded-xl border border-orange/30 bg-orange/[0.04] p-4">
                      <img
                        src={uploadedImageUrl}
                        alt="Product"
                        className="h-24 w-24 rounded-lg object-cover border border-border"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-ink">Product image ready</div>
                        <div className="mt-1 text-xs text-muted">
                          Claude will analyze this image and generate ads that match your product's exact appearance.
                        </div>
                        <button
                          onClick={() => setUploadedImageUrl(null)}
                          className="mt-2 text-xs text-muted hover:text-orange"
                        >
                          Replace image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      className="flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-bg text-sm text-muted-strong transition-colors hover:border-orange/40 hover:text-orange"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const f = e.dataTransfer.files?.[0];
                        if (f) void handleFileUpload(f);
                      }}
                    >
                      <Upload className="h-6 w-6" strokeWidth={1.5} />
                      <span>{uploading ? "Uploading…" : "Drop your product image here or click"}</span>
                      <span className="text-[11px] text-muted">PNG · JPG · WebP · max 20 MB</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) void handleFileUpload(f);
                        }}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  )}
                  {uploadErr && (
                    <p className="text-xs text-red-400">{uploadErr}</p>
                  )}
                </>
              )}

              {/* URL input */}
              {productSource === "url" && (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={productPageUrl}
                    onChange={(e) => setProductPageUrl(e.target.value)}
                    placeholder="https://yourstore.com/products/awesome-product"
                    className="field-input"
                  />
                  <p className="text-[11px] text-muted">
                    Claude fetches the page, extracts images and product details, then generates ads faithful to the product.
                  </p>
                </div>
              )}

              {/* What gets generated info */}
              <div className="rounded-xl border border-border bg-white/[0.02] p-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong mb-3">
                  What gets generated
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { icon: <ImageIcon className="h-3.5 w-3.5" />, label: "Image 1", sub: "1:1 Photoreal" },
                    { icon: <ImageIcon className="h-3.5 w-3.5" />, label: "Image 2", sub: "2:3 Lifestyle" },
                    { icon: <ImageIcon className="h-3.5 w-3.5" />, label: "Image 3", sub: "3:2 Vibrant" },
                    { icon: <Video className="h-3.5 w-3.5" />, label: "Video", sub: "9:16 · 4s" },
                    { icon: <Camera className="h-3.5 w-3.5" />, label: "UGC", sub: "Avatar · EN" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-bg p-2 text-center">
                      <div className="text-muted-strong">{item.icon}</div>
                      <div className="text-[10px] font-bold text-ink">{item.label}</div>
                      <div className="text-[9px] text-muted">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {createError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {createError}
                </div>
              )}

              <button
                onClick={runFullPack}
                disabled={
                  creating ||
                  (productSource === "upload" && !uploadedImageUrl) ||
                  (productSource === "url" && productPageUrl.trim().length < 10)
                }
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-4 w-4" strokeWidth={2} />
                Create Full Ad Pack — 3 Images · 1 Video · 1 UGC
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* ── STEP 2: CREATING ─────────────────────────────────────────────── */}
          {step === "creating" && (
            <>
              {/* Analysis status */}
              <div className="flex items-center gap-3 rounded-xl border border-orange/30 bg-orange/[0.06] px-4 py-3">
                {creating && !allDone ? (
                  <Loader2 className="h-4 w-4 animate-spin text-orange" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-orange" />
                )}
                <div>
                  <div className="text-sm font-bold text-orange">{analysisProgress}</div>
                  {pack && (
                    <div className="text-xs text-muted mt-0.5">
                      Pack: {pack.analysis_meta.product_title ?? pack.name} · {pack.prompt_chars} char prompt
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-strong font-medium">Generating creatives</span>
                  <span className="tabular-nums text-muted">{doneSlots.length + errorSlots.length} / 5</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full bg-orange transition-all duration-500"
                    style={{ width: `${(progress / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Slot grid */}
              <div className="grid grid-cols-5 gap-3">
                {slots.map((slot) => (
                  <SlotCard key={slot.key} slot={slot} url={slot.storagePath ? signedUrls[slot.storagePath] : undefined} />
                ))}
              </div>

              {allDone && (
                <button
                  onClick={() => setStep("pack")}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white hover:bg-orange-hover hover:shadow-glow-sm"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  View & Edit Pack
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </>
          )}

          {/* ── STEP 3: PACK EDITOR ──────────────────────────────────────────── */}
          {step === "pack" && (
            <>
              {/* Pack header */}
              {pack && (
                <div className="rounded-xl border border-orange/30 bg-orange/[0.06] px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-orange">
                        {pack.analysis_meta.product_title ?? pack.name}
                      </div>
                      {pack.analysis_meta.product_summary && (
                        <div className="mt-1 text-xs text-muted line-clamp-2">
                          {pack.analysis_meta.product_summary}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5 text-orange" />
                      <span className="text-xs text-orange font-medium">
                        {doneSlots.length} / 5 generated
                      </span>
                    </div>
                  </div>
                  {pack.analysis_meta.key_features && pack.analysis_meta.key_features.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {pack.analysis_meta.key_features.slice(0, 4).map((f) => (
                        <span
                          key={f}
                          className="rounded-md border border-orange/20 bg-orange/[0.04] px-2 py-0.5 text-[10px] text-muted-strong"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Creative grid — 3 images then 2 wide */}
              <div className="space-y-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-strong">
                  Creatives — click to edit copy fields
                </div>

                {/* Images row */}
                <div className="grid grid-cols-3 gap-3">
                  {slots.filter((s) => s.kind === "image").map((slot) => (
                    <EditableCreativeCard
                      key={slot.key}
                      slot={slot}
                      url={slot.storagePath ? signedUrls[slot.storagePath] : undefined}
                      isEditing={editingKey === slot.key}
                      onEdit={() => openEdit(slot)}
                      onCancelEdit={() => setEditingKey(null)}
                      editForm={editForm}
                      setEditForm={setEditForm}
                      onSave={() => saveEdit(slot)}
                      saving={savingEdit}
                    />
                  ))}
                </div>

                {/* Video + UGC row */}
                <div className="grid grid-cols-2 gap-3">
                  {slots.filter((s) => s.kind !== "image").map((slot) => (
                    <EditableCreativeCard
                      key={slot.key}
                      slot={slot}
                      url={slot.storagePath ? signedUrls[slot.storagePath] : undefined}
                      isEditing={editingKey === slot.key}
                      onEdit={() => openEdit(slot)}
                      onCancelEdit={() => setEditingKey(null)}
                      editForm={editForm}
                      setEditForm={setEditForm}
                      onSave={() => saveEdit(slot)}
                      saving={savingEdit}
                    />
                  ))}
                </div>
              </div>

              {/* Launch section */}
              <div className="rounded-xl border border-border bg-white/[0.02] p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-ink flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-orange" />
                    Launch to Platform
                  </div>
                  {platforms.length === 0 && (
                    <span className="text-[11px] text-muted">
                      No connected platforms · go to Settings → Ad Platforms
                    </span>
                  )}
                </div>

                {platforms.length > 0 && (
                  <>
                    {/* Platform selector */}
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((p) => {
                        const colorClass = PLATFORM_COLORS[p.platform] ?? "border-border bg-white/[0.03] text-muted-strong";
                        return (
                          <button
                            key={p.platform}
                            onClick={() => setSelectedPlatform(p.platform)}
                            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                              selectedPlatform === p.platform
                                ? colorClass
                                : "border-border bg-white/[0.03] text-body hover:border-border-strong"
                            }`}
                          >
                            {PLATFORM_LABELS[p.platform] ?? p.platform}
                            {p.account_name && (
                              <span className="ml-1 text-muted">· {p.account_name}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Creative selector */}
                    {selectedPlatform && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-strong block mb-1.5">
                            Select creative to upload
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {slots.filter((s) => s.status === "done").map((s) => (
                              <button
                                key={s.key}
                                onClick={() => setSelectedCreativeKey(s.key)}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                                  selectedCreativeKey === s.key
                                    ? "border-orange/40 bg-orange/[0.08] text-orange"
                                    : "border-border bg-white/[0.03] text-body hover:border-border-strong"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {launchError && (
                          <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2 text-xs text-red-400">
                            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            {launchError}
                          </div>
                        )}

                        {launchResult ? (
                          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                              <CheckCircle2 className="h-4 w-4" />
                              {launchResult.message}
                            </div>
                            <a
                              href={launchResult.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
                            >
                              Open Ads Manager
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <button
                              onClick={() => setLaunchResult(null)}
                              className="ml-4 text-xs text-muted hover:text-ink"
                            >
                              Launch another
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={launchToPlatform}
                            disabled={launching || !selectedCreativeKey}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {launching ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Rocket className="h-3.5 w-3.5" />
                            )}
                            {launching ? "Uploading to ads account…" : `Upload & Open in ${PLATFORM_LABELS[selectedPlatform] ?? selectedPlatform}`}
                            {!launching && <ExternalLink className="h-3 w-3" />}
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Generate again */}
              <div className="flex items-center justify-between text-xs text-muted">
                <button
                  onClick={() => { setStep("product"); setPack(null); setSlots(INITIAL_SLOTS); }}
                  className="flex items-center gap-1.5 hover:text-ink"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Generate a new pack
                </button>
                <button onClick={onClose} className="hover:text-ink">
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepDot({ active, done, n, label }: { active: boolean; done: boolean; n: number; label: string }) {
  return (
    <div className={`flex items-center gap-1 ${active ? "text-orange" : done ? "text-emerald-400" : "text-muted"}`}>
      <div
        className={`h-5 w-5 rounded-full border text-[10px] font-bold flex items-center justify-center ${
          active
            ? "border-orange/50 bg-orange/[0.12]"
            : done
            ? "border-emerald-500/30 bg-emerald-500/[0.10]"
            : "border-border bg-white/[0.03]"
        }`}
      >
        {done ? <CheckCircle2 className="h-3 w-3" /> : n}
      </div>
      <span className="text-[11px]">{label}</span>
    </div>
  );
}

function SlotCard({ slot, url }: { slot: CreativeSlot; url?: string }) {
  const isVideo = slot.kind === "video" || slot.kind === "ugc";
  const icon =
    slot.kind === "image" ? <ImageIcon className="h-5 w-5" strokeWidth={1.5} /> :
    slot.kind === "video" ? <Video className="h-5 w-5" strokeWidth={1.5} /> :
    <Camera className="h-5 w-5" strokeWidth={1.5} />;

  return (
    <div
      className={`relative aspect-square rounded-xl border overflow-hidden transition-colors ${
        slot.status === "done"
          ? "border-orange/30"
          : slot.status === "generating"
          ? "border-orange/20"
          : slot.status === "error"
          ? "border-red-500/20"
          : "border-border"
      } bg-surface`}
    >
      {slot.status === "done" && url ? (
        isVideo ? (
          <video src={url} className="h-full w-full object-cover" muted playsInline />
        ) : (
          <img src={url} alt={slot.label} className="h-full w-full object-cover" />
        )
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1.5">
          <div
            className={`${
              slot.status === "generating" ? "text-orange animate-pulse" :
              slot.status === "error" ? "text-red-400" :
              "text-muted"
            }`}
          >
            {slot.status === "generating" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : slot.status === "error" ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              icon
            )}
          </div>
        </div>
      )}
      {slot.status === "done" && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
          <CheckCircle2 className="h-3 w-3 text-orange ml-auto" />
        </div>
      )}
      <div className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-black/50 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
        {slot.label}
      </div>
    </div>
  );
}

function EditableCreativeCard({
  slot,
  url,
  isEditing,
  onEdit,
  onCancelEdit,
  editForm,
  setEditForm,
  onSave,
  saving,
}: {
  slot: CreativeSlot;
  url?: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  editForm: EditForm;
  setEditForm: (f: EditForm) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const isVideo = slot.kind === "video" || slot.kind === "ugc";

  if (slot.status === "error") {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3 flex flex-col items-center justify-center gap-2 aspect-square">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <div className="text-xs text-red-400 text-center">{slot.label} failed</div>
        <div className="text-[10px] text-muted text-center line-clamp-2">{slot.errorMsg}</div>
      </div>
    );
  }

  if (slot.status !== "done") {
    return (
      <div className="rounded-xl border border-border bg-surface aspect-square flex items-center justify-center">
        <Loader2 className="h-5 w-5 text-muted animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-bg overflow-hidden">
      {/* Preview */}
      <div className="aspect-video relative group">
        {url ? (
          isVideo ? (
            <video
              src={url}
              className="h-full w-full object-cover"
              muted
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
            />
          ) : (
            <img src={url} alt={slot.label} className="h-full w-full object-cover" />
          )
        ) : (
          <div className="h-full w-full bg-surface" />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          {!isEditing && (
            <button
              onClick={onEdit}
              className="hidden group-hover:flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-ink hover:bg-white"
            >
              <Pencil className="h-3 w-3" />
              Edit copy
            </button>
          )}
        </div>
        <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
          {slot.label}
        </span>
      </div>

      {/* Edit form */}
      {isEditing ? (
        <div className="p-3 space-y-2 border-t border-border">
          <input
            className="field-input text-xs py-1.5"
            placeholder="Headline (80 chars)"
            maxLength={80}
            value={editForm.headline}
            onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
          />
          <textarea
            className="field-input text-xs py-1.5 resize-none"
            placeholder="Primary text (125 chars)"
            maxLength={125}
            rows={2}
            value={editForm.primary_text}
            onChange={(e) => setEditForm({ ...editForm, primary_text: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="field-input text-xs py-1.5"
              placeholder="CTA (e.g. Shop Now)"
              value={editForm.cta}
              onChange={(e) => setEditForm({ ...editForm, cta: e.target.value })}
            />
            <input
              className="field-input text-xs py-1.5"
              placeholder="Landing URL"
              type="url"
              value={editForm.landing_url}
              onChange={(e) => setEditForm({ ...editForm, landing_url: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-lg bg-orange px-3 text-[11px] font-bold text-white disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="inline-flex h-7 items-center rounded-lg border border-border px-3 text-[11px] text-muted hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2.5">
          <div className="truncate text-xs font-medium text-ink" title={slot.headline}>
            {slot.headline ?? "(untitled)"}
          </div>
          <button
            onClick={onEdit}
            className="mt-1 flex items-center gap-1 text-[10px] text-muted hover:text-orange"
          >
            <Pencil className="h-2.5 w-2.5" />
            Edit copy
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildUgcScript(pack: AdPackInfo): string {
  const meta = pack.analysis_meta;
  const title = meta.product_title ?? pack.name;
  const features = (meta.key_features ?? []).slice(0, 3).join(", ");
  const hook = meta.emotional_hook ?? "";
  const summary = meta.product_summary?.slice(0, 150) ?? "";

  const parts = [
    `Hey, I just have to tell you about ${title}!`,
    summary,
    features ? `What I love about it: ${features}.` : "",
    hook,
    "You can find the link in my bio — seriously, check it out!",
  ].filter(Boolean);

  return parts.join(" ").slice(0, 1500);
}
