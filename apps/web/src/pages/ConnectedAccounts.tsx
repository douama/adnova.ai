import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { api, ApiError } from "../lib/api";
import { useAuth } from "../stores/authStore";

type AdAccount = {
  id: string;
  platform: string;
  account_name: string;
  status: string;
  created_at: string;
  external_account_id: string;
};

export function ConnectedAccounts() {
  const { session } = useAuth();
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    
    api<{ data: AdAccount[] }>("/api/platforms/accounts", { token: session.accessToken })
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.code : "Failed to load accounts");
      })
      .finally(() => setLoading(false));
  }, [session]);

  const handleConnect = (platform: string) => {
    // Redirect to backend connect route which handles OAuth
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8787";
    window.location.href = `${apiUrl}/api/platforms/connect/${platform}`;
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Connected Accounts</h1>
          <p className="text-sm mt-1 text-slate-500">Gérez vos intégrations publicitaires.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Meta Ads Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold">M</div>
              Meta Ads
            </CardTitle>
            <CardDescription>Connectez vos comptes publicitaires Facebook et Instagram.</CardDescription>
          </CardHeader>
          <CardContent>
            {accounts.some(a => a.platform === "meta") ? (
              <div className="text-sm text-green-600 font-medium">Connecté</div>
            ) : (
              <Button onClick={() => handleConnect("meta")} className="w-full">Connecter Meta</Button>
            )}
          </CardContent>
        </Card>

        {/* Google Ads Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-red-100 flex items-center justify-center text-red-600 font-bold">G</div>
              Google Ads
            </CardTitle>
            <CardDescription>Synchronisez vos campagnes Search et Performance Max.</CardDescription>
          </CardHeader>
          <CardContent>
            {accounts.some(a => a.platform === "google") ? (
              <div className="text-sm text-green-600 font-medium">Connecté</div>
            ) : (
              <Button onClick={() => handleConnect("google")} className="w-full">Connecter Google</Button>
            )}
          </CardContent>
        </Card>

        {/* TikTok Ads Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center text-white font-bold">T</div>
              TikTok Ads
            </CardTitle>
            <CardDescription>Gérez vos campagnes vidéos et UGC sur TikTok.</CardDescription>
          </CardHeader>
          <CardContent>
            {accounts.some(a => a.platform === "tiktok") ? (
              <div className="text-sm text-green-600 font-medium">Connecté</div>
            ) : (
              <Button onClick={() => handleConnect("tiktok")} className="w-full">Connecter TikTok</Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Comptes Actifs</h2>
        {loading ? (
          <p className="text-slate-500">Chargement...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : accounts.length === 0 ? (
          <Card className="p-6 text-center text-slate-500 border-dashed border-2">
            Aucun compte connecté pour le moment.
          </Card>
        ) : (
          <div className="grid gap-4">
            {accounts.map(acc => (
              <Card key={acc.id} className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-slate-900">{acc.account_name}</div>
                  <div className="text-xs text-slate-500 uppercase">{acc.platform} • ID: {acc.external_account_id}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${acc.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {acc.status}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
