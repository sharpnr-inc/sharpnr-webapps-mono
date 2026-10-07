import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  accountingAccountStatusQuery,
  useAccountingAccountStatus,
} from "@/app/sharp-accounting/api/queries";
import StartAccountingService from "@/app/sharp-accounting/components/StartAccountingService";

export const Route = createFileRoute("/_appuser/sharp-accounting")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your accounting service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into an accounting route.
    const status = await context.queryClient.ensureQueryData(
      accountingAccountStatusQuery,
    );

    return { accountingStatus: status.data };
  },
  component: AccountingLayout,
});

function AccountingLayout() {
  const { data, isPending } = useAccountingAccountStatus();

  if (isPending) {
    return (
      <GlobalLoader message="Hold on! We are checking your accounting service" />
    );
  }

  const status = data?.data;

  // serviceStarted false implies isActive null, so isActive alone decides the
  // gate — a never-started org and a switched-off one both land on the
  // activation card, which tells them apart from serviceStarted.
  if (!status?.isActive) {
    return (
      <StartAccountingService
        serviceStarted={status?.serviceStarted ?? false}
      />
    );
  }

  return <Outlet />;
}
