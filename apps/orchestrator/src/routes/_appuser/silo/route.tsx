import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  siloAccountStatusQuery,
  useSiloAccountStatus,
} from "@/app/silo/api/queries";
import StartSiloService from "@/app/silo/components/StartSiloService";

export const Route = createFileRoute("/_appuser/silo")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your Silo service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into a Silo route.
    const status = await context.queryClient.ensureQueryData(
      siloAccountStatusQuery,
    );

    return { siloStatus: status.data };
  },
  component: SiloLayout,
});

function SiloLayout() {
  const { data, isPending } = useSiloAccountStatus();

  if (isPending) {
    return <GlobalLoader message="Hold on! We are checking your Silo service" />;
  }

  const status = data?.data;

  // serviceStarted false implies isActive null, so isActive alone decides the
  // gate — a never-started org and a switched-off one both land on the
  // activation card, which tells them apart from serviceStarted.
  if (!status?.isActive) {
    return <StartSiloService serviceStarted={status?.serviceStarted ?? false} />;
  }

  return <Outlet />;
}
