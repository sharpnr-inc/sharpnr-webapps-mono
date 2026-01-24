import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/setup-wizard/",
)({
  beforeLoad: ({ context }) => {
    throw redirect({
      to: "/orchestrator/setup-wizard/step/$stepId/organization",
      params: {
        stepId: "sehgohsgvoiheroigvh",
      },
    });
  },
});

//*This page will call the API and for the Steps
// *and each step page will invalidate the API call cache as soon as user did minimum task in that
// *we drive user to Next step process
