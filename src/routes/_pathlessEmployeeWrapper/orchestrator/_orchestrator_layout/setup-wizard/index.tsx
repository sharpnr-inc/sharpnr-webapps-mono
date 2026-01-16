import { OrgSetupWrapper } from "@/_orchestrator/OrchestSetupWizard/OrgSetupWrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/"
)({
  component: OrgSetupWrapper,
});
