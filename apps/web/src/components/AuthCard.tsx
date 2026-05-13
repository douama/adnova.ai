import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function AuthCard({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle?: string;
  footer?: { text: string; linkText: string; to: string };
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="text-xl font-semibold text-brand-700">AdNova AI</div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        {children}
        {footer ? (
          <p className="mt-6 text-center text-sm text-slate-500">
            {footer.text}{" "}
            <Link to={footer.to} className="font-medium text-brand-600 hover:underline">
              {footer.linkText}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
