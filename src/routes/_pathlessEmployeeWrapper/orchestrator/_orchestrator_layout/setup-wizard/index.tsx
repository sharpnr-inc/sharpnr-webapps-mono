import { OrchestSetupWizardIndex } from "@/_orchestrator/OrchestSetupWizard/OverviewPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/"
)({
  component: OrchestSetupWizardIndex,
});
