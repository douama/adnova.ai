import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";
import { useAuth } from "../stores/authStore";
import { AuthCard } from "../components/AuthCard";

export function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ fullName: "", company: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [confirmRequired, setConfirmRequired] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.company.trim() || !form.email.trim()) {
      setError("Tous les champs sont requis.");
      return;
    }
    if (form.password.length < 8) {
      setError("Mot de passe : 8 caractères minimum.");
      return;
    }

    setSubmitting(true);
    try {
      await signUp({
        email: form.email.trim(),
        password: form.password,
        fullName: form.fullName.trim(),
        company: form.company.trim(),
      });

      // Cas 1 : auto-confirm activé côté Supabase → onAuthStateChange a déjà
      // set la session. On redirige vers le dashboard.
      // Cas 2 : confirmation email obligatoire → on affiche un message.
      // L'authStore détectera la session à l'arrivée sur /auth/callback.
      const { data } = await import("../lib/supabase").then((m) =>
        m.supabase.auth.getSession()
      );
      if (data.session) {
        navigate("/onboarding", { replace: true });
      } else {
        setConfirmRequired(true);
      }
    } catch (err) {
      setError(mapSignupError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmRequired) {
    return (
      <AuthCard
        title="Vérifie ta boîte mail"
        subtitle="On t'a envoyé un lien de confirmation"
        footer={{ text: "Mauvais email ?", linkText: "Recommencer", to: "/register" }}
      >
        <div className="space-y-3 text-sm text-slate-700">
          <p>
            On a envoyé un lien à <strong>{form.email}</strong>. Clique dessus pour
            activer ton compte et accéder à AdNova.
          </p>
          <p className="text-xs text-slate-500">
            Pas reçu sous 2 minutes ? Vérifie ton dossier spam, ou{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-brand-600 underline hover:text-brand-700"
            >
              connecte-toi
            </button>
            .
          </p>
        </div>
      </AuthCard>
    );
  }

  const inputClass =
    "rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

  return (
    <AuthCard
      title="Créer ton compte"
      subtitle="Démarre ton workspace AdNova AI · 14 jours d'essai"
      footer={{ text: "Déjà un compte ?", linkText: "Se connecter", to: "/login" }}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Nom complet</span>
          <input
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            autoComplete="name"
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Nom de l'entreprise</span>
          <input
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            autoComplete="organization"
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Email pro</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            autoComplete="email"
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Mot de passe</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClass}
          />
          <span className="text-xs text-slate-500">8 caractères minimum.</span>
        </label>

        {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? "Création…" : "Créer le compte"}
        </button>

        <p className="text-xs text-slate-500">
          En créant un compte, tu acceptes nos <a href="/terms" className="underline">CGU</a> et notre{" "}
          <a href="/privacy" className="underline">politique de confidentialité</a>.
        </p>
      </form>
    </AuthCard>
  );
}

function mapSignupError(err: unknown): string {
  if (err instanceof AuthError) {
    if (err.message.toLowerCase().includes("already registered")) {
      return "Cet email a déjà un compte. Connecte-toi ou utilise le lien magique.";
    }
    if (err.status === 422) return "Email invalide.";
    if (err.status === 429) return "Trop de tentatives. Réessaye dans quelques minutes.";
    return err.message || "Échec de création.";
  }
  return "Erreur réseau. Réessaye.";
}
