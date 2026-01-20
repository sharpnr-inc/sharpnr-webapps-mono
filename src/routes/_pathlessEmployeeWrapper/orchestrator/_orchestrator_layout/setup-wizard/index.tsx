import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/"
)({
   beforeLoad: () => {
    throw redirect({
      to: "/orchestrator/setup-wizard/step",
      params: {
        step: "organization", // ✅ ONLY the value
      },
    });
  },
  // component: OrgSetupWizLayout,
});

