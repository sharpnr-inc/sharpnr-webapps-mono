import { Outlet } from "@tanstack/react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { HotelSidebar } from "./HotelSidebar";

export function HotelRootLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full ">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <HotelSidebar />
        </Sidebar>

        {/* Main content */}
        <SidebarInset className=" m-2">
          <div className="flex flex-col">
            <SidebarTrigger />

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
