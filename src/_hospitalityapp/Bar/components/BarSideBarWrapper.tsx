import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { BarSideBarNav } from "./BarSideBar";

export function BarSideBarWrapper() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <BarSideBarNav />
        </Sidebar>

        {/* Main content */}
        <SidebarInset className="border m-2">
          <div className="flex h-full flex-col">
            {/* Top bar */}
            <header className="flex h-12 items-center border-b px-3">
              <SidebarTrigger />
            </header>

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
