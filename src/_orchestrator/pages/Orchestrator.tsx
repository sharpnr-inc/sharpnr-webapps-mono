// This sis the Main index page of orchestrator and We need to Layout
// We we first Pull data we need to know the sector of the Organization
// then based on that we fetch what modules they have

import { OrgConfigSetup } from "./configspages/OrgConfigSetup";
import { OverviewPage } from "./overview/OverviewPage";

// For example Bar Kitchen etc
export function OrchestratorIndex() {
  // TODO so the first issue is we need API for the fetching Orchestrator details
  // so we need the Data like the .....
  // think of orchestrator like a Admin console of google workspace

  /*
  so the Overview is fetch the details like Org name 
  its legal compliances and Based on the sector Org type can configure overview section
  */

  return (
    <div className="p-2">
      <div>
        <OrgConfigSetup />
      </div>
      <div>
        <OverviewPage />
      </div>
    </div>
  );
}
