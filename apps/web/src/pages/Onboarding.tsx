import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const completeOnboarding = async () => {
    setSubmitting(true);
    try {
      // En Phase 2, le tenant + subscription sont déjà créés par le trigger
      // handle_new_user à la signup. Cet onboarding sert juste à collecter
      // des préférences (rôle, plateformes) qu'on enregistrera plus tard.
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bienvenue sur AdNova AI</CardTitle>
          <CardDescription>Configuration de ton workspace (étape {step} / 2)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Quel est ton rôle ?</label>
              <select className="flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/20">
                <option>Marketer</option>
                <option>Agency Owner</option>
                <option>E-commerce Founder</option>
                <option>Autre</option>
              </select>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Connecte ta première plateforme</label>
              <div className="grid grid-cols-2 gap-2">
                <Button className="bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => {}}>
                  Meta Ads
                </Button>
                <Button className="bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => {}}>
                  Google Ads
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Tu peux le faire plus tard.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              onClick={() => setStep((s) => s - 1)}
            >
              Retour
            </Button>
          )}
          {step < 2 ? (
            <Button className="ml-auto" onClick={() => setStep((s) => s + 1)}>
              Suivant
            </Button>
          ) : (
            <Button className="ml-auto" disabled={submitting} onClick={completeOnboarding}>
              {submitting ? "Finalisation…" : "Aller au dashboard"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
