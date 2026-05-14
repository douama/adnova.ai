// ─── ConfigMissingScreen ───────────────────────────────────────────────────
// Affiché par main.tsx quand env.isConfigured est false. Évite la page
// blanche : on dit à l'utilisateur ce qui manque et où le configurer.
// Monté avant tout le reste (avant BrowserRouter, ErrorBoundary, etc.) pour
// que rien n'essaie d'init Supabase avec une URL vide.
import { env } from "../lib/env";

export function ConfigMissingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-white p-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-amber-50 text-amber-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900">Configuration manquante</h1>
        <p className="mt-2 text-sm text-slate-600">
          L'application n'arrive pas à se connecter à Supabase. Les variables
          d'environnement suivantes ne sont pas définies pour cet environnement :
        </p>
        <ul className="mt-3 inline-block rounded-md bg-slate-50 px-4 py-2 text-left font-mono text-sm text-slate-800">
          {env.missingVars.map((v) => (
            <li key={v}>· {v}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-500">
          Si tu es admin :{" "}
          <a
            className="underline"
            href="https://vercel.com/ad-nova-ai/adnova.ai/settings/environment-variables"
            target="_blank"
            rel="noreferrer"
          >
            Vercel → Settings → Environment Variables
          </a>{" "}
          · vérifie que les vars sont bien activées pour <strong>Production</strong>, puis re-déclenche un build.
        </p>
      </div>
    </div>
  );
}
