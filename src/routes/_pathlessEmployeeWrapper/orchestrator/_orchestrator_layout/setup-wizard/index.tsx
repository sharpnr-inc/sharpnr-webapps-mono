import { OrgSetupWizLayout } from "@/_orchestrator/OrchestSetupWizard/OrgSetupWizLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/"
)({
  component: OrgSetupWizLayout,
});

