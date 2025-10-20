import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSideBar from "@/components/Sidebar/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { HeaderProvider } from "@/context/HeaderContext";
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

  const getGreetings = (email: string) => {
    return `Welcome back, ${email.split("@")[0]}! 👋`;
  };

  return (
    <SidebarProvider>
      <HeaderProvider>
        <DashboardSideBar />
        <SidebarInset>
          <DashboardHeader
            useremail={"kashifsocl@gmail.com"}
            getGreeting={getGreetings}
          />
          <div className="h-screen">
            <Outlet />
          </div>
        </SidebarInset>
      </HeaderProvider>
    </SidebarProvider>
  );
}
