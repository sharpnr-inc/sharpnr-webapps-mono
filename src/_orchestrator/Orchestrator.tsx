import { OrchestWelcomeCard } from "./components/shared/OrchestWelcomeCard";
import { OverviewPage } from "./OrchestSetupWizard/OverviewPage";

// For example Bar Kitchen etc
export function OrchestratorIndex() {

  return (
    <div className="p-2">
      <div>
        <OrchestWelcomeCard />
      </div>
      <div>
        <OverviewPage />
      </div>
    </div>
  );
}
