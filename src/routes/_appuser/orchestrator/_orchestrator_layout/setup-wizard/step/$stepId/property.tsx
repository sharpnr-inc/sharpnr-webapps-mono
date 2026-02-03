import { SetupWizardProperty } from "@/_setup_wizard_/SetupWizard/SetupWizardPropertyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/setup-wizard/step/$stepId/property",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SetupWizardProperty />
    </div>
  );
}
