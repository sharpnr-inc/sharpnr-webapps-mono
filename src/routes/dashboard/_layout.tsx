// src/routes/dashboard/_layout.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import Header from "@/components/shared/Header";
import SidebarMain from "@/components/Sidebar/Sidebar";
import { usePolicySSE } from "@/hooks/usePolicy";

export const Route = createFileRoute("/dashboard/_layout")({
  beforeLoad: () => {
    const empId = localStorage.getItem("empid");
    return { empId };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const { empId } = Route.useRouteContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const policy = usePolicySSE(empId);
  console.log(policy)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* HEADER */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={toggleSidebar}
            />
            <div className="fixed lg:relative w-64 lg:w-72 h-full z-30 lg:z-auto">
              <SidebarMain />
            </div>
          </>
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-auto mt-[4rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
