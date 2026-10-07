import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  hrmsAccountStatusQuery,
  useHrmsAccountStatus,
} from "@/app/sharp-hr/api/queries";
import StartSharpHrService from "@/app/sharp-hr/components/StartSharpHrService";

export const Route = createFileRoute("/_appuser/sharp-hr")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your SharpHR service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into a SharpHR route.
    const status = await context.queryClient.ensureQueryData(
      hrmsAccountStatusQuery,
    );

    return { hrmsStatus: status.data };
  },
  component: SharpHrLayout,
});

function SharpHrLayout() {
  const { data, isPending } = useHrmsAccountStatus();

  if (isPending) {
    return (
      <GlobalLoader message="Hold on! We are checking your SharpHR service" />
    );
  }

  const status = data?.data;

  // serviceStarted false implies isActive null, so isActive alone decides the
  // gate — a never-started org and a switched-off one both land on the
  // activation card, which tells them apart from serviceStarted.
  if (!status?.isActive) {
    return (
      <StartSharpHrService serviceStarted={status?.serviceStarted ?? false} />
    );
  }

  return <Outlet />;
}
