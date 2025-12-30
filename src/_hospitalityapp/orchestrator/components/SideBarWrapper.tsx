import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { HospitalityOrchestratorSideBar } from "./OrchestratorSidebar";

export function HospitalityOrchestratorRootLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          <HospitalityOrchestratorSideBar />
        </Sidebar>

        {/* Main content */}
        <SidebarInset className="border m-2">
          <div className="flex flex-col">
            {/* Top bar */}
            <header className="flex h-12 items-center border-b px-3">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className=" h-4" />
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
            <main className="flex-1 overflow-auto p-2">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
