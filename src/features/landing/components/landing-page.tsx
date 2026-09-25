import { useTranslations } from "next-intl";

import { ContactDetailsSection } from "./contact-details-section";
import { ContactSection } from "./contact-section";
import { DemoRequestDialog } from "./demo-dialog/demo-request-dialog";
import { DigitizeSection } from "./digitize-section";
import { ExamSection } from "./exam-section";
import { GhanaSection } from "./ghana-section";
import { HeadteachersSection } from "./headteachers/headteachers-section";
import { Hero } from "./hero";
import { LandingProviders } from "./landing-providers";
import { MemorySection } from "./memory-section";
import { ProblemSection } from "./problem/problem-section";
import { RecordSection } from "./record-section";
import { ResponsibleSection } from "./responsible/responsible-section";
import { RolesSection } from "./roles/roles-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header/site-header";
import { StoriesSection } from "./stories/stories-section";
import { ValueSection } from "./value-section";
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
        <ProblemSection />
        <WhySection />
        <DigitizeSection />
        <RecordSection />
        <ValueSection />
        <RolesSection />

        <ExamSection />
        <GhanaSection />
        <MemorySection />
        <ResponsibleSection />

        <ContactSection />
        <ContactDetailsSection />
      </main>
      <SiteFooter />
      <DemoRequestDialog />
    </LandingProviders>
  );
}
