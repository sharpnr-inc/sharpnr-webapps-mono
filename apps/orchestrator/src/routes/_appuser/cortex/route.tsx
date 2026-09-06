import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  cortexAccountStatusQuery,
  useCortexAccountStatus,
} from "@/app/cortex/api/queries";
import StartCortexService from "@/app/cortex/components/StartCortexService";

export const Route = createFileRoute("/_appuser/cortex")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your Cortex service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into a Cortex route.
    const status = await context.queryClient.ensureQueryData(
      cortexAccountStatusQuery,
    );

    return { cortexStatus: status.data };
  },
  component: CortexLayout,
});

function CortexLayout() {
  const { data, isPending } = useCortexAccountStatus();

  if (isPending) {
    return (
      <GlobalLoader message="Hold on! We are checking your Cortex service" />
    );
  }

  const status = data?.data;

  // serviceStarted false implies isActive null, so isActive alone decides the
  // gate — a never-started org and a switched-off one both land on the
  // activation card, which tells them apart from serviceStarted.
  if (!status?.isActive) {
    return (
      <StartCortexService serviceStarted={status?.serviceStarted ?? false} />
    );
  }

  return <Outlet />;
}
