import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@sharpnr/ui";
import { Outlet } from "@tanstack/react-router";
import { BarSideBarNav } from "./BarSideBar";
import { Separator } from "@sharpnr/ui";
import AppLauncher from "@/components/header/AppLauncher";
import { NotificationBell, ModeToggle } from "@sharpnr/ui";
import { AppUserCard } from "@/components/header/AppUserCard";

export function BarRootLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          {/* ===== Property Switcher ===== */}

          {/* Bar module sidebar */}
          <BarSideBarNav />
        </Sidebar>

        {/* Main content */}
        <SidebarInset className="m-2">
          <div className="flex h-full flex-col">
            {/* Top bar */}
            <header className="flex h-12 items-center justify-between border-b px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
              </div>
              <div className="flex items-center gap-3 px-4">
                <AppLauncher />
                <NotificationBell onClick={() => console.log("HI")} />
                <AppUserCard />
                <ModeToggle />
              </div>
            </header>

            {/* Page content */}
            <main className="p-2">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
