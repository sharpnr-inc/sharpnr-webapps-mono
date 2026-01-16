import { OrchestratorSetupWizardIndex } from "@/_orchestrator/OrchestSetupWizard/OrchestratorSetupIndex";
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
    return <OrchestratorSetupWizardIndex />;
  }

  return <OrchestratorConsoleIndex />;
}
