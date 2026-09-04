import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  cablesAccountStatusQuery,
  useCablesAccountStatus,
} from "@/app/cables/api/queries";
import StartCablesService from "@/app/cables/components/StartCablesService";

export const Route = createFileRoute("/_appuser/cables")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your Cables service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into a cables route.
    const status = await context.queryClient.ensureQueryData(
      cablesAccountStatusQuery,
    );

    return { cablesStatus: status.data };
  },
  component: CablesLayout,
});

function CablesLayout() {
  const { data, isPending } = useCablesAccountStatus();

  if (isPending) {
    return (
      <GlobalLoader message="Hold on! We are checking your Cables service" />
    );
  }

  const status = data?.data;

  // isStarted false implies isActive false, so isActive alone decides the gate.
  if (!status?.isActive) {
    return <StartCablesService isStarted={status?.isStarted ?? false} />;
  }

  return <Outlet />;
}
