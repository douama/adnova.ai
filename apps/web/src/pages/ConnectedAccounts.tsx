import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { supabase } from "../lib/supabase";
import { useCurrentTenantId } from "../stores/tenantStore";
import type { Database } from "../lib/database.types";

type PlatformConnection = Database["public"]["Tables"]["platform_connections"]["Row"];

export function ConnectedAccounts() {
  const tenantId = useCurrentTenantId();
  const [accounts, setAccounts] = useState<PlatformConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) return;
    setLoading(true);
    supabase
      .from("platform_connections")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setAccounts((data ?? []) as PlatformConnection[]);
        setLoading(false);
      });
  }, [tenantId]);

  const handleConnect = (platform: string) => {
    // OAuth flow → handled by worker in Phase 5. For now, redirect placeholder.
    alert(`OAuth ${platform} disponible en Phase 5 (worker Hono).`);
  };

  const isConnected = (platform: string) =>
    accounts.some((a) => a.platform === platform);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Connected Accounts</h1>
        <p className="mt-1 text-sm text-slate-500">Gérez vos intégrations publicitaires.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PlatformCard
          slug="meta"
          label="Meta Ads"
          letter="M"
          description="Connectez vos comptes publicitaires Facebook et Instagram."
          connected={isConnected("meta")}
          onConnect={handleConnect}
        />
        <PlatformCard
          slug="google"
          label="Google Ads"
          letter="G"
          description="Synchronisez vos campagnes Search et Performance Max."
          connected={isConnected("google")}
          onConnect={handleConnect}
        />
        <PlatformCard
          slug="tiktok"
          label="TikTok Ads"
          letter="T"
          description="Gérez vos campagnes vidéos et UGC sur TikTok."
          connected={isConnected("tiktok")}
          onConnect={handleConnect}
        />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Comptes Actifs</h2>
        {loading ? (
          <p className="text-slate-500">Chargement…</p>
        ) : error ? (
          <p className="text-slate-500">Erreur : {error}</p>
        ) : accounts.length === 0 ? (
          <Card className="border-2 border-dashed p-6 text-center text-slate-500">
            Aucun compte connecté pour le moment.
          </Card>
        ) : (
          <div className="grid gap-4">
            {accounts.map((acc) => (
              <Card key={acc.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium text-slate-900">{acc.account_name ?? acc.account_id}</div>
                  <div className="text-xs uppercase text-slate-500">
                    {acc.platform} · ID : {acc.account_id}
                  </div>
                </div>
                <div
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    acc.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {acc.is_active ? "active" : "inactive"}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type CardProps = {
  slug: string;
  label: string;
  letter: string;
  description: string;
  connected: boolean;
  onConnect: (platform: string) => void;
};

function PlatformCard({ slug, label, letter, description, connected, onConnect }: CardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 font-bold text-slate-700">
            {letter}
          </div>
          {label}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {connected ? (
          <div className="text-sm font-medium text-emerald-600">Connecté</div>
        ) : (
          <Button onClick={() => onConnect(slug)} className="w-full">
            Connecter {label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
