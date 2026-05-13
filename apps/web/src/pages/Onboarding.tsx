import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { api } from "../lib/api";

export function OnboardingPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const completeOnboarding = async () => {
    setSubmitting(true);
    try {
      // Dummy API call for Phase 1 skeleton
      // await api("/api/me/onboarding", { method: "POST", token: session?.accessToken });
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
          <CardTitle>Welcome to AdNova AI</CardTitle>
          <CardDescription>Let's set up your workspace (Step {step} of 2)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">What is your role?</label>
                <select className="flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/20">
                  <option>Marketer</option>
                  <option>Agency Owner</option>
                  <option>E-commerce Founder</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Connect your first ad platform</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => {}}>Meta Ads</Button>
                  <Button variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200" onClick={() => {}}>Google Ads</Button>
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">You can also do this later.</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" className="bg-white text-slate-700 border-slate-200 hover:bg-slate-50" onClick={() => setStep(s => s - 1)}>
              Back
            </Button>
          )}
          {step < 2 ? (
            <Button className="ml-auto" onClick={() => setStep(s => s + 1)}>Next</Button>
          ) : (
            <Button className="ml-auto" disabled={submitting} onClick={completeOnboarding}>
              {submitting ? "Finishing..." : "Go to Dashboard"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
