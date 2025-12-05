import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { BookingAndOrdersNotificationProvider } from "@/context/BookingAndOrdersContext";
import { EmployeePolicyProvider } from "@/context/EmployeePolicyContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { UIRendererProvider } from "@/context/ui-rendererContext";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const storedData = localStorage.getItem("_sharpnr_user_data_");
    const userData = storedData ? JSON.parse(storedData) : null;
    return { empId: userData?.EmployeeID };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UIRendererProvider>
      <EmployeePolicyProvider>
        <HeaderProvider>
          <BookingAndOrdersNotificationProvider>
            <DashboardHeader useremail={"kashifsocl@gmail.com"} />
            <div className="h-screen mt-16">
              <Outlet />
            </div>
          </BookingAndOrdersNotificationProvider>
        </HeaderProvider>
      </EmployeePolicyProvider>
    </UIRendererProvider>
  );
}
