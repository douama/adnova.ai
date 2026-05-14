// Bibliothèque de créatifs du tenant courant.
// Upload manual ; génération IA arrivera plus tard (SDXL/Runway via Edge Function).
import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useCreatives } from "../../lib/queries";
import { useCurrentTenantId } from "../../stores/tenantStore";
import {
  deleteCreative,
  getSignedCreativeUrlBatch,
  inferCreativeType,
  uploadCreative,
} from "../../lib/creatives";

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB (aligned with bucket limit)

export function CreativesPage() {
  const tenantId = useCurrentTenantId();
  const { data: creatives, loading, error, refresh } = useCreatives({ limit: 60 });
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!creatives || creatives.length === 0) {
      setUrls({});
      return;
    }
    const paths = creatives.map((c) => c.storage_path).filter(Boolean);
    if (paths.length === 0) return;
    getSignedCreativeUrlBatch(paths as string[]).then(setUrls);
  }, [creatives]);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !tenantId) return;
    setUploadError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (file.size > MAX_BYTES) {
          throw new Error(`"${file.name}" exceeds 100 MB.`);
        }
        await uploadCreative({
          tenantId,
          file,
          type: inferCreativeType(file),
          headline: file.name.replace(/\.[^.]+$/, ""),
        });
      }
      await refresh();
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(id: string, path: string | null) {
    if (!confirm("Delete this creative?")) return;
    try {
      await deleteCreative(id, path);
      await refresh();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-ink">Creative Studio</h1>
          <p className="mt-1 text-sm text-muted-strong">
            Workspace asset library · manual upload · AI generation coming soon
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-bold text-white transition-all hover:bg-orange-hover hover:shadow-glow-sm hover:-translate-y-0.5 disabled:opacity-55"
        >
          <Upload className="h-3.5 w-3.5" strokeWidth={2} />
          {uploading ? "Uploading…" : "Upload creative"}
        </button>
      </div>

      {uploadError ? (
        <div className="rounded-xl border border-muted/30 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
          {uploadError}
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-bold text-ink">All creatives</h2>
          <p className="mt-0.5 text-xs text-muted">
            Drop files anywhere on the grid to bulk upload.
          </p>
        </div>

        <DropZone disabled={uploading} onDrop={handleFiles}>
          {loading ? (
            <div className="px-5 py-16 text-center text-sm text-muted">Loading…</div>
          ) : error ? (
            <div className="m-5 rounded-lg border border-muted/20 bg-muted/[0.08] px-4 py-3 text-sm text-muted-strong">
              {error}
            </div>
          ) : !creatives || creatives.length === 0 ? (
            <div className="space-y-3 px-5 py-16 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-bg text-muted">
                <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">No creatives yet</p>
                <p className="mt-1 text-xs text-muted">
                  Drag &amp; drop files here or click "Upload creative".
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 lg:grid-cols-4">
              {creatives.map((c) => (
                <CreativeCard
                  key={c.id}
                  creative={c}
                  url={c.storage_path ? urls[c.storage_path] : undefined}
                  onDelete={() => handleDelete(c.id, c.storage_path)}
                />
              ))}
            </div>
          )}
        </DropZone>
      </div>
    </div>
  );
}

type CreativeRow = NonNullable<ReturnType<typeof useCreatives>["data"]>[number];

function CreativeCard({
  creative,
  url,
  onDelete,
}: {
  creative: CreativeRow;
  url: string | undefined;
  onDelete: () => void;
}) {
  const isVideo = creative.type === "video" || creative.type === "ugc_video";
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-bg transition-colors hover:border-border-strong">
      <div className="aspect-square bg-surface">
        {url ? (
          isVideo ? (
            <video
              src={url}
              className="h-full w-full object-cover"
              muted
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          ) : (
            <img
              src={url}
              alt={creative.headline ?? "creative"}
              className="h-full w-full object-cover"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            {isVideo ? "▶ video" : "img"}
          </div>
        )}
      </div>
      <div className="p-3">
        <div
          className="truncate text-sm font-medium text-ink"
          title={creative.headline ?? "(untitled)"}
        >
          {creative.headline ?? "(untitled)"}
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px]">
          <span className="capitalize text-muted">{creative.type.replace("_", " ")}</span>
          <span
            className={`rounded border px-1.5 py-0.5 font-bold uppercase tracking-wider ${
              creative.status === "winner"
                ? "border-orange/30 bg-orange/[0.08] text-orange"
                : creative.status === "killed"
                  ? "border-border bg-white/[0.04] text-muted"
                  : creative.status === "testing"
                    ? "border-border bg-white/[0.04] text-muted-strong"
                    : "border-border bg-white/[0.03] text-muted"
            }`}
          >
            {creative.status}
          </span>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="absolute right-2 top-2 hidden h-7 w-7 items-center justify-center rounded-full bg-bg/90 text-muted-strong shadow-card transition-colors hover:text-ink group-hover:flex"
        title="Delete"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}

function DropZone({
  children,
  disabled,
  onDrop,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onDrop: (files: FileList | null) => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        if (!disabled) onDrop(e.dataTransfer.files);
      }}
      className={`relative transition-colors ${
        hover ? "bg-orange/[0.04] ring-2 ring-inset ring-orange/30" : ""
      }`}
    >
      {children}
      {hover ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold uppercase tracking-wider text-orange">
          Drop files here
        </div>
      ) : null}
    </div>
  );
}
