import type { JobSummary } from "../types";
import { BenefitsSection } from "./benefits-section";
import { GeneralApplication } from "./general-application";
import { OpenRolesSection } from "./open-roles-section";

/** The careers landing page: open roles, then why to join. */
export function CareersPage({ jobs }: { jobs: JobSummary[] }) {
  return (
    <>
      <OpenRolesSection jobs={jobs} />
      <BenefitsSection />
      <GeneralApplication />
    </>
  );
}
