import { HospitalityOrchestratorRootLayout } from "@/_hospitalityapp/orchestrator/components/SideBarWrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/sharp_hospitality/org-config")(
  {
    component: HospitalityOrchestratorRootLayout,
  }
);
