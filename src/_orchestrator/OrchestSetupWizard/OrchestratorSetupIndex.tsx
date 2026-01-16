import { OrchestWelcomeCard } from "../components/shared/OrchestWelcomeCard";
import { OrchestSetupWizardIndex} from "./OverviewPage";

// For example Bar Kitchen etc
export function OrchestratorSetupWizardIndex() {

  return (
    <div className="p-2">
      <div>
        <OrchestWelcomeCard />
      </div>
      <div>
        <OrchestSetupWizardIndex />
      </div>
    </div>
  );
}
