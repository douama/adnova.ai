import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { ApiError } from "../lib/api";
import { AuthCard } from "../components/AuthCard";
import { registerSchema } from "@adnova/shared/schemas/auth";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: "", organizationName: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    try {
      await register(parsed.data);
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Registration failed (${err.code}).`);
      } else {
        setError("Network error. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start your AdNova AI workspace"
      footer={{ text: "Already have an account?", linkText: "Sign in", to: "/login" }}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Full name</span>
          <input
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            autoComplete="name"
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Organization name</span>
          <input
            value={form.organizationName}
            onChange={(e) => setForm((f) => ({ ...f, organizationName: e.target.value }))}
            autoComplete="organization"
            required
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Work email</span>
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
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClass}
          />
          <span className="text-xs text-slate-500">At least 8 characters.</span>
        </label>
        {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? "Creating…" : "Create account"}
        </button>
      </form>
    </AuthCard>
  );
}
