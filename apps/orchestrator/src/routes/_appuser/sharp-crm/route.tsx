import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  sharpCrmAccountStatusQuery,
  useSharpCrmAccountStatus,
} from "@/app/sharp_crm/api/queries";
import StartSharpCrmService from "@/app/sharp_crm/components/StartSharpCrmService";

export const Route = createFileRoute("/_appuser/sharp-crm")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your SharpCRM service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into a SharpCRM route.
    const status = await context.queryClient.ensureQueryData(
      sharpCrmAccountStatusQuery,
    );

    return { sharpCrmStatus: status.data };
  },
  component: SharpCrmLayout,
});

function SharpCrmLayout() {
  const { data, isPending } = useSharpCrmAccountStatus();

  if (isPending) {
    return (
      <GlobalLoader message="Hold on! We are checking your SharpCRM service" />
    );
  }

  const status = data?.data;

  // serviceStarted false implies isActive null, so isActive alone decides the
  // gate — a never-started org and a switched-off one both land on the
  // activation card, which tells them apart from serviceStarted.
  if (!status?.isActive) {
    return (
      <StartSharpCrmService serviceStarted={status?.serviceStarted ?? false} />
    );
  }

  return <Outlet />;
}
