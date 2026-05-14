// ─── /creatives ────────────────────────────────────────────────────────────
// Bibliothèque de créatifs du tenant courant.
// Phase 4 : upload manuel + grid view. Phase 5 ajoutera la génération IA
// (SDXL / Runway / HeyGen) via Edge Function.
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useCreatives } from "../lib/queries";
import { useCurrentTenantId } from "../stores/tenantStore";
import {
  deleteCreative,
  getSignedCreativeUrlBatch,
  inferCreativeType,
  uploadCreative,
} from "../lib/creatives";

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB (aligned with bucket limit)

export function CreativesPage() {
  const tenantId = useCurrentTenantId();
  const { data: creatives, loading, error, refresh } = useCreatives({ limit: 60 });
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Re-sign les URLs à chaque changement de la liste de creatives
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
          throw new Error(`"${file.name}" dépasse 100 MB.`);
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
      setUploadError(e instanceof Error ? e.message : "Upload échoué.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(id: string, path: string | null) {
    if (!confirm("Supprimer ce créatif ?")) return;
    try {
      await deleteCreative(id, path);
      await refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Creative Studio</h1>
          <p className="mt-1 text-sm text-slate-500">
            Bibliothèque de créatifs du workspace · upload manuel (génération IA en Phase 5)
          </p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Upload…" : "Uploader un créatif"}
          </Button>
        </div>
      </div>

      {uploadError ? (
        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{uploadError}</div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Tous les créatifs</CardTitle>
          <CardDescription>
            Cliquez sur un créatif pour voir ses détails. Drag-drop des fichiers sur la grille pour
            uploader en masse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropZone disabled={uploading} onDrop={handleFiles}>
            {loading ? (
              <div className="py-12 text-center text-sm text-slate-500">Chargement…</div>
            ) : error ? (
              <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">Erreur : {error}</div>
            ) : !creatives || creatives.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  ◰
                </div>
                <p className="mt-3 text-sm font-medium text-slate-900">
                  Aucun créatif pour l'instant
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Glisse-dépose des images ici ou clique "Uploader un créatif".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Single creative card ──────────────────────────────────────────────────
type CreativeRow = ReturnType<typeof useCreatives>["data"] extends Array<infer T> | null ? T : never;

function CreativeCard({
  creative,
  url,
  onDelete,
}: {
  creative: NonNullable<CreativeRow>;
  url: string | undefined;
  onDelete: () => void;
}) {
  const isVideo = creative.type === "video" || creative.type === "ugc_video";
  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="aspect-square bg-slate-100">
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
            <img src={url} alt={creative.headline ?? "creative"} className="h-full w-full object-cover" />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            {isVideo ? "▶ vidéo" : "img"}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="truncate text-sm font-medium text-slate-900" title={creative.headline ?? "(sans titre)"}>
          {creative.headline ?? "(sans titre)"}
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
          <span className="capitalize">{creative.type.replace("_", " ")}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              creative.status === "winner"
                ? "bg-emerald-100 text-emerald-700"
                : creative.status === "killed"
                ? "bg-slate-200 text-slate-600"
                : creative.status === "testing"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {creative.status}
          </span>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="absolute right-2 top-2 hidden h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm hover:text-red-600 group-hover:flex"
        title="Supprimer"
      >
        ×
      </button>
    </div>
  );
}

// ─── Drag & drop zone ──────────────────────────────────────────────────────
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
      className={`relative rounded-md transition-colors ${
        hover ? "bg-orange-50 ring-2 ring-orange-300" : ""
      }`}
    >
      {children}
      {hover ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium text-orange-700">
          Déposez les fichiers ici
        </div>
      ) : null}
    </div>
  );
}
