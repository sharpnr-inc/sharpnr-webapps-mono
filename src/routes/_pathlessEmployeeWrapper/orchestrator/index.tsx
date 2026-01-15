import { OrchestratorIndex } from "@/_orchestrator/Orchestrator";
import { OrchestratorSetupWizard } from "@/_orchestrator/OrchestSetupWizard/OrchestratorSetupWizard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessEmployeeWrapper/orchestrator/")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return (
    <>
      <OrchestratorIndex />
      {/* <OrchestratorSetupWizard/> */}
    </>
  );
}
