import { Outlet } from "@tanstack/react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { HotelSidebar } from "./HotelSidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function HotelSideBarWrapper() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <HotelSidebar />
        </Sidebar>

        {/* Main content */}
        <SidebarInset className="border m-2">
          <div className="flex flex-col">
            {/* Top bar */}
            <header className="flex h-12 items-center border-b px-3">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
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
