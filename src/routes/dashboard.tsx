import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSideBar from "@/components/Sidebar/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePolicySSE } from "@/hooks/usePolicy";
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
  const { empId } = Route.useRouteContext();
  const policy = usePolicySSE(empId);
  console.log(policy);

  return (
    <SidebarProvider>
      <DashboardSideBar />
      <SidebarInset>
        <DashboardHeader />
        <div className="h-screen">
        <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
