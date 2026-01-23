import { OrchestratorSetupWizardWelcomePage } from "@/_orchestrator/OrchestSetupWizard/OrchestratorSetupWelcomePage";
import { OrchestratorConsoleIndex } from "@/_orchestrator/OrchestDashboard/OrchestratorConsole";
import { createFileRoute } from "@tanstack/react-router";

var isConfigured = false;
export const Route = createFileRoute(
  "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/_console/"
)({
  beforeLoad: async () => {
      return {
      configured: isConfigured,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { configured } = Route.useRouteContext();

  if (!configured) {
    return <OrchestratorSetupWizardWelcomePage />;
  }

  return <OrchestratorConsoleIndex />;
}


// *So this page checks the if organization is configured or not if configured then 
// *Then moves throw the user to the Setup index page
// *OrchestratorSetupWizardWelcomePage page is the Welcome page for the New organization