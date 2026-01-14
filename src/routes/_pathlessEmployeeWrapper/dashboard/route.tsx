import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { HeaderProvider } from "@/context/HeaderContext";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessEmployeeWrapper/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <HeaderProvider>
      <DashboardHeader useremail="kashifsocl@gmail.com" />
      <Outlet />
    </HeaderProvider>
  );
}
