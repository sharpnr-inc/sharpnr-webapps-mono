import { SetupWizardPropertyPage } from "@/_orchestrator/SetupWizard/SetupLegalEntityPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/step/$stepId/property",
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
