// This sis the Main index page of orchestrator and We need to Layout
// We we first Pull data we need to know the sector of the Organization
// then based on that we fetch what modules they have

import { HospitalityWrapperSection } from "./hospitality_configs/HospitalityWrapper";
import { OverviewPage } from "./overview/OverviewPage";

// For example Bar Kitchen etc
export function OrchestratorIndex() {
  return (
    <div className="p-2">
      {/* Orchestrator Overview sections */}
      <div>
        <OverviewPage />
      </div>

      <div>
        <HospitalityWrapperSection />
      </div>
    </div>
  );
}
