import { OrchestratorConsoleIndex } from "@/_orchestrator/console/OrchestratorConsole";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/",
)({
  component: OrchestratorConsoleIndex,
  staticData: {
    breadcrumb: "Home",
  },
});
