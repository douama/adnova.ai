import { Hero } from "../../components/marketing/Hero";
import { LiveDecisionsStrip } from "../../components/marketing/LiveDecisionsStrip";
import { Comparison } from "../../components/marketing/Comparison";
import { HowItWorks } from "../../components/marketing/HowItWorks";
import { Platforms } from "../../components/marketing/Platforms";
import { Pricing } from "../../components/marketing/Pricing";
import { Testimonials } from "../../components/marketing/Testimonials";
import { CTA } from "../../components/marketing/CTA";

export function LandingPage() {
  return (
    <>
      <Hero />
      <LiveDecisionsStrip />
      <Comparison />
      <HowItWorks />
      <Platforms />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}
