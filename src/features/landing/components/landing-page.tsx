import { useTranslations } from "next-intl";

import { ContactSection } from "./contact-section";
import { DemoRequestDialog } from "./demo-dialog/demo-request-dialog";
import { GhanaSection } from "./ghana-section";
import { HeadteachersSection } from "./headteachers/headteachers-section";
import { Hero } from "./hero";
import { LandingProviders } from "./landing-providers";
import { MemorySection } from "./memory-section";
import { PlatformStrip } from "./platform-strip";
import { ProblemSection } from "./problem/problem-section";
import { RecordSection } from "./record-section";
import { ResponsibleSection } from "./responsible/responsible-section";
import { RolesSection } from "./roles/roles-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header/site-header";
import { StoriesSection } from "./stories/stories-section";
import { WhySection } from "./why-section";

/** The SmartSakuu marketing landing page. */
export function LandingPage() {
  const t = useTranslations("Landing.Common");

  return (
    <LandingProviders>
      <a className="skip-link" href="#main">
        {t("skipLink")}
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <PlatformStrip />
        <ProblemSection />
        <WhySection />
        <RecordSection />
        <RolesSection />
        <StoriesSection />
        <MemorySection />
        <ResponsibleSection />
        <GhanaSection />
        <HeadteachersSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <DemoRequestDialog />
    </LandingProviders>
  );
}
