import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { BookingAndOrdersNotificationProvider } from "@/context/BookingAndOrdersContext";
import { EmployeePolicyProvider } from "@/context/EmployeePolicyContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { UIRendererProvider } from "@/context/ui-rendererContext";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UIRendererProvider>
      <EmployeePolicyProvider>
        <HeaderProvider>
          <BookingAndOrdersNotificationProvider>
            <DashboardHeader useremail="kashifsocl@gmail.com" />
            <Outlet />
          </BookingAndOrdersNotificationProvider>
        </HeaderProvider>
      </EmployeePolicyProvider>
    </UIRendererProvider>
  );
}
