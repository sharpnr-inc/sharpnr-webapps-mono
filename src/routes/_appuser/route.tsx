import { ConsoleLayout } from "@/components/ConsoleLayout";

// This is the Component for the Setup Guard
// import OrganizationSetupGuard from "@/_orchestrator/console/OrgSetupGuard";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser")({
  // beforeLoad: async ({ context }) => {
  //   const status = await context.queryClient.fetchQuery(
  //     organizationStatusQuery,
  //   );
  //   return {
  //     configured: status.data.setup_completed, // or status.status === "COMPLETED"
  //     status,
  //   };
  // },
  component: ConsoleLayout,
});
