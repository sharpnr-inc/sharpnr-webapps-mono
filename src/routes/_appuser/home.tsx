import { OrchestratorConsoleIndex } from "@/_orchestrator/console/OrchestratorConsole";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/home")({
  component: OrchestratorConsoleIndex,
  staticData: {
    breadcrumb: "Home",
  },
});
