import { SetupLegalEntityPage } from "@/_setup_wizard_/SetupLegalEntityPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/setup-wizard/step/$stepId/legal-entity",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SetupLegalEntityPage />
    </div>
  );
}
