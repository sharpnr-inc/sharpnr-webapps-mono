import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSideBar from "@/components/Sidebar/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BookingAndOrdersNotificationProvider } from "@/context/BookingandOrdersContext";
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
        <SidebarProvider>
          <HeaderProvider>
            <BookingAndOrdersNotificationProvider>
              <DashboardSideBar />
              <SidebarInset>
                <DashboardHeader useremail={"kashifsocl@gmail.com"} />
                <div className="h-screen">
                  <Outlet />
                </div>
              </SidebarInset>
            </BookingAndOrdersNotificationProvider>
          </HeaderProvider>
        </SidebarProvider>
      </EmployeePolicyProvider>
    </UIRendererProvider>
  );
}
