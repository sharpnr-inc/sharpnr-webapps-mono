import { OrchestratorHomepage } from "@/app/home/pages/OrchestratorHomePage";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/home")({
  component: OrchestratorHomepage,
  staticData: {
    breadcrumb: "Home",
  },
});
