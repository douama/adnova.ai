import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";
import { useAuth } from "../stores/authStore";
import { AuthCard } from "../components/AuthCard";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!email.trim() || password.length < 8) {
      setError("Email valide + mot de passe ≥ 8 caractères requis.");
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function onMagicLink() {
    if (!email.trim()) {
      setError("Renseigne ton email d'abord.");
      return;
    }
    setError(null);
    setMagicLoading(true);
    try {
      await signInWithMagicLink(email.trim());
      setInfo(`Lien magique envoyé à ${email}. Vérifie ta boîte (et les spams).`);
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setMagicLoading(false);
    }
  }

  return (
    <AuthCard
      title="Connexion"
      subtitle="Bienvenue"
      footer={{ text: "Pas encore de compte ?", linkText: "Créer un compte", to: "/register" }}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            minLength={8}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </label>

        {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        {info ? <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{info}</div> : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? "Connexion…" : "Se connecter"}
        </button>

        <button
          type="button"
          onClick={onMagicLink}
          disabled={magicLoading}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {magicLoading ? "Envoi…" : "Recevoir un lien magique par email"}
        </button>
      </form>
    </AuthCard>
  );
}

// Mappe les codes d'erreur Supabase Auth → messages utilisateur lisibles.
// IMPORTANT : Supabase renvoie 400 pour deux cas distincts qu'il faut différencier :
//   - "Invalid login credentials" → mauvais email/password
//   - "Email not confirmed" → user existe mais doit cliquer le lien de confirmation
// Avant ce fix, les deux étaient affichés comme "incorrect" — confusion garantie.
function mapAuthError(err: unknown): string {
  if (err instanceof AuthError) {
    const code = err.code ?? "";
    const msg = err.message.toLowerCase();

    // Email pas confirmé → message explicite avec next step
    if (code === "email_not_confirmed" || msg.includes("email not confirmed")) {
      return "Email non confirmé. Vérifie ta boîte mail (et les spams) pour le lien Supabase.";
    }
    // Bad password ou bad email
    if (code === "invalid_credentials" || msg.includes("invalid login")) {
      return "Email ou mot de passe incorrect.";
    }
    // Email signup confirmé mais déjà existant
    if (code === "email_address_invalid" || (err.status === 422 && msg.includes("invalid"))) {
      return "Email invalide.";
    }
    // Rate limit
    if (err.status === 429 || code === "over_request_rate_limit") {
      return "Trop de tentatives. Réessaye dans quelques minutes.";
    }
    return err.message || "Échec de connexion.";
  }
  return "Erreur réseau. Réessaye.";
}
