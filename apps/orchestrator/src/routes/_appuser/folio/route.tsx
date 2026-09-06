import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GlobalLoader } from "@sharpnr/ui";
import {
  folioAccountStatusQuery,
  useFolioAccountStatus,
} from "@/app/folio/api/queries";
import StartFolioService from "@/app/folio/components/StartFolioService";

export const Route = createFileRoute("/_appuser/folio")({
  pendingComponent: () => (
    <GlobalLoader message="Hold on! We are checking your Folio service" />
  ),
  beforeLoad: async ({ context }) => {
    // Warm the cache so the gate below renders from data instead of flashing
    // a loader on every navigation into a Folio route.
    const status = await context.queryClient.ensureQueryData(
      folioAccountStatusQuery,
    );

    return { folioStatus: status.data };
  },
  component: FolioLayout,
});

function FolioLayout() {
  const { data, isPending } = useFolioAccountStatus();

  if (isPending) {
    return (
      <GlobalLoader message="Hold on! We are checking your Folio service" />
    );
  }

  const status = data?.data;

  // serviceStarted false implies isActive null, so isActive alone decides the
  // gate — a never-started org and a switched-off one both land on the
  // activation card, which tells them apart from serviceStarted.
  if (!status?.isActive) {
    return (
      <StartFolioService serviceStarted={status?.serviceStarted ?? false} />
    );
  }

  return <Outlet />;
}
