import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  stockwaveAccountStatusQuery,
  useStockwaveAccountStatus,
} from "@/app/stockwave/api/queries";
import StartStockwaveService from "@/app/stockwave/components/StartStockwaveService";

export const Route = createFileRoute("/_appuser/stockwave")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your Stockwave service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into a Stockwave route.
    const status = await context.queryClient.ensureQueryData(
      stockwaveAccountStatusQuery,
    );

    return { stockwaveStatus: status.data };
  },
  component: StockwaveLayout,
});

function StockwaveLayout() {
  const { data, isPending } = useStockwaveAccountStatus();

  if (isPending) {
    return (
      <GlobalLoader message="Hold on! We are checking your Stockwave service" />
    );
  }

  const status = data?.data;

  // serviceStarted false implies isActive null, so isActive alone decides the
  // gate — a never-started org and a switched-off one both land on the
  // activation card, which tells them apart from serviceStarted.
  if (!status?.isActive) {
    return (
      <StartStockwaveService serviceStarted={status?.serviceStarted ?? false} />
    );
  }

  return <Outlet />;
}
