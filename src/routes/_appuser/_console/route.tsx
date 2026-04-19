import { ConsoleLayout } from "@/_orchestrator/components/ConsoleLayout";
import OrganizationSetupGuard from "@/_orchestrator/console/OrgSetupGuard";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console",
)({
  // beforeLoad: async ({ context }) => {
  //   const status = await context.queryClient.fetchQuery(
  //     organizationStatusQuery,
  //   );
  //   return {
  //     configured: status.data.setup_completed, // or status.status === "COMPLETED"
  //     status,
  //   };
  // },
  component: RouteComponent,
  staticData: {
    breadcrumb: "Console",
  },
});

function RouteComponent() {
  return (
    <OrganizationSetupGuard>
      <ConsoleLayout />
    </OrganizationSetupGuard>
  );
}
