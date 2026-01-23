import { SetupWizardPropertyPage } from "@/_orchestrator/OrchestSetupWizard/SetupWizardPropertyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/step/_steps/property",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SetupWizardPropertyPage />
    </div>
  );
}
