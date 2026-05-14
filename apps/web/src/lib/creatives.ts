// ─── Creatives utilities ────────────────────────────────────────────────────
// Helpers pour upload + display des creatives stockés dans le bucket privé
// `creatives/{tenant_id}/{creative_id}.{ext}`.
//
// Note : le bucket est PRIVÉ → on génère des signed URLs avec expiration
// pour afficher les images. Cache de l'URL signée côté composant via
// useEffect pour éviter de re-signer à chaque render.
import { supabase } from "./supabase";
import type { Database } from "./database.types";

type CreativeInsert = Database["public"]["Tables"]["creatives"]["Insert"];

const SIGNED_URL_EXPIRY = 3600; // 1h — assez pour la session courante

export type UploadCreativeInput = {
  tenantId: string;
  file: File;
  type: "image" | "video" | "ugc_video";
  headline?: string;
  primaryText?: string;
  cta?: string;
  landingUrl?: string;
};

export type UploadResult = {
  creativeId: string;
  storagePath: string;
};

/**
 * Upload un fichier dans le bucket `creatives` puis insère une row
 * dans public.creatives. Atomique côté UX : si l'upload Storage échoue,
 * on n'insère rien en DB ; si l'insert DB échoue, on supprime le fichier.
 */
export async function uploadCreative(input: UploadCreativeInput): Promise<UploadResult> {
  const ext = guessExtension(input.file);
  const creativeId = crypto.randomUUID();
  const storagePath = `${input.tenantId}/${creativeId}.${ext}`;

  // 1) Upload Storage (RLS vérifie que tenant_id == 1er segment du path)
  const { error: uploadErr } = await supabase.storage
    .from("creatives")
    .upload(storagePath, input.file, {
      contentType: input.file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadErr) {
    throw new Error(`Upload échoué : ${uploadErr.message}`);
  }

  // 2) Insert row creatives (RLS vérifie tenant_id == is_tenant_member)
  const row: CreativeInsert = {
    id: creativeId,
    tenant_id: input.tenantId,
    type: input.type,
    status: "draft",
    storage_path: storagePath,
    headline: input.headline ?? null,
    primary_text: input.primaryText ?? null,
    cta: input.cta ?? null,
    landing_url: input.landingUrl ?? null,
    generation_engine: "human",
  };

  const { error: dbErr } = await supabase.from("creatives").insert(row);

  if (dbErr) {
    // Rollback : supprime le fichier uploadé pour ne pas laisser d'orphelin
    await supabase.storage.from("creatives").remove([storagePath]);
    throw new Error(`Insert DB échoué : ${dbErr.message}`);
  }

  return { creativeId, storagePath };
}

/**
 * Génère une signed URL pour afficher un creative privé.
 * Renvoie null si erreur (le composant affichera un placeholder).
 */
export async function getSignedCreativeUrl(storagePath: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from("creatives")
    .createSignedUrl(storagePath, SIGNED_URL_EXPIRY);
  if (error || !data) {
    console.warn("getSignedCreativeUrl failed:", error?.message);
    return null;
  }
  return data.signedUrl;
}

/**
 * Génère plusieurs signed URLs en parallèle (batch utilisé par la grid view).
 * Tolère les échecs individuels.
 */
export async function getSignedCreativeUrlBatch(
  paths: Array<string | null>
): Promise<Record<string, string>> {
  const valid = paths.filter((p): p is string => !!p);
  if (valid.length === 0) return {};

  const { data, error } = await supabase.storage
    .from("creatives")
    .createSignedUrls(valid, SIGNED_URL_EXPIRY);

  if (error || !data) return {};

  const out: Record<string, string> = {};
  for (const r of data) {
    if (r.signedUrl && r.path) out[r.path] = r.signedUrl;
  }
  return out;
}

/**
 * Supprime un creative + son fichier Storage. Tenant admin requis (RLS).
 */
export async function deleteCreative(creativeId: string, storagePath: string | null): Promise<void> {
  // 1) Storage d'abord (si fail, on garde la DB row visible plutôt qu'orpheline)
  if (storagePath) {
    const { error: storageErr } = await supabase.storage.from("creatives").remove([storagePath]);
    if (storageErr) console.warn("Storage delete failed (continuing):", storageErr.message);
  }

  // 2) DB row
  const { error } = await supabase.from("creatives").delete().eq("id", creativeId);
  if (error) throw new Error(`Delete échoué : ${error.message}`);
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function guessExtension(file: File): string {
  // Préférer le type MIME (plus fiable que l'extension du nom)
  const mime = file.type.toLowerCase();
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "video/mp4") return "mp4";
  if (mime === "video/quicktime") return "mov";
  if (mime === "video/webm") return "webm";
  // Fallback sur l'extension du filename
  const fromName = file.name.split(".").pop()?.toLowerCase();
  return fromName && fromName.length <= 5 ? fromName : "bin";
}

export function inferCreativeType(file: File): "image" | "video" {
  return file.type.startsWith("video/") ? "video" : "image";
}
