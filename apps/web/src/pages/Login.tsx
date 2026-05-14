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

// Mappe les codes d'erreur Supabase Auth → messages utilisateur lisibles
function mapAuthError(err: unknown): string {
  if (err instanceof AuthError) {
    switch (err.status) {
      case 400:
        return err.message.toLowerCase().includes("invalid login")
          ? "Email ou mot de passe incorrect."
          : err.message;
      case 422:
        return "Email invalide ou compte non confirmé. Vérifie ta boîte mail.";
      case 429:
        return "Trop de tentatives. Réessaye dans quelques minutes.";
      default:
        return err.message || "Échec de connexion.";
    }
  }
  return "Erreur réseau. Réessaye.";
}
