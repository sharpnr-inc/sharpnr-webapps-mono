import { OrchestratorConsoleIndex } from "@/_orchestrator/console/OrchestratorConsole";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/_console/home")({
  component: OrchestratorConsoleIndex,
  staticData: {
    breadcrumb: "Home",
  },
});
