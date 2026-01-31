import { organizationStatusQuery } from "@/_orchestrator/OrchestDashboard/api/queries/general";
import { ConsoleLayout } from "@/_orchestrator/OrchestDashboard/components/ConsoleLayout";

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console",
)({
  beforeLoad: async ({ context }) => {
    // const status = await context.queryClient.fetchQuery(
    //   organizationStatusQuery,
    // );
    // //  console.log("[beforeLoad] organization status:", status);
    // return {
    //   configured: status.data.setup_completed, // or status.status === "COMPLETED"
    //   status,
    // };
  },
  component: RouteComponent,
  staticData:{
    breadcrumb:"Console"
  }
});

function RouteComponent() {
  return <ConsoleLayout />;
}

// TODO Add the dashboard header and sidebar here this is the console before user load the console we check and redirect them to the setup wizard
