import { OrchestratorSetupWizardWelcomePage } from "@/_orchestrator/SetupWizard/OrchestratorSetupWelcomePage";
import { OrchestratorConsoleIndex } from "@/_orchestrator/OrchestDashboard/OrchestratorConsole";
import { createFileRoute } from "@tanstack/react-router";
import { organizationStatusQuery } from "@/_orchestrator/OrchestDashboard/api/queries/general";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/",
)({
  beforeLoad: async ({ context }) => {
    // const status = await context.queryClient.fetchQuery(
    //   organizationStatusQuery,
    // );

    // //  console.log("[beforeLoad] organization status:", status);

    // return {
    //   configured: status.data.setup_completed, // or status.status === "COMPLETED"
    //   status,
    // };
  },
  component: RouteComponent,
});

function RouteComponent() {
  // const { configured } = Route.useRouteContext();

  const configured = true

  if (!configured) {
    return <OrchestratorSetupWizardWelcomePage />;
  }

  return <OrchestratorConsoleIndex />;
}

// *So this page checks the if organization is configured or not if configured then
// *Then moves throw the user to the Setup index page
// *OrchestratorSetupWizardWelcomePage page is the Welcome page for the New organization
