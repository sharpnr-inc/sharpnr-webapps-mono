import DynamicIslandHost from "@/components/custom/DynamicIslandHost";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { HeaderProvider } from "@/context/HeaderContext";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* <DynamicIslandHost /> */}

      <Outlet />
    </>
    // <HeaderProvider>

    // </HeaderProvider>
  );
}
