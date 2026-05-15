import { Hero } from "../../components/marketing/Hero";
import { LiveDecisionsStrip } from "../../components/marketing/LiveDecisionsStrip";
import { FeatureBento } from "../../components/marketing/FeatureBento";
import { HowItWorks } from "../../components/marketing/HowItWorks";
import { Pricing } from "../../components/marketing/Pricing";
import { Testimonials } from "../../components/marketing/Testimonials";
import { UGCShowcase } from "../../components/marketing/UGCShowcase";
import { FAQ } from "../../components/marketing/FAQ";
import { CTA } from "../../components/marketing/CTA";

export function LandingPage() {
  return (
    <>
      <Hero />
      <LiveDecisionsStrip />
      <FeatureBento />
      <HowItWorks />
      <Testimonials />
      <UGCShowcase />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
