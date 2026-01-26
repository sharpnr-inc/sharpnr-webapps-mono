import { Outlet } from "@tanstack/react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { RestaurantSidebar } from "./RestaurantSidebar";
export function RestaurantRootLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <RestaurantSidebar />
        </Sidebar>

        {/* Main content */}
        <SidebarInset className=" m-2">
          <div className="flex flex-col">

            <div className="p-2">
            <SidebarTrigger />
            </div>

            {/* Page content */}
            <main className="flex-1 overflow-auto p-3">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
