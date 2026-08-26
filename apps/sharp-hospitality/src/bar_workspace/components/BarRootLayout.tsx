import { Sidebar, AppShell } from "@sharpnr/ui";
import { Outlet } from "@tanstack/react-router";
import { BarSideBarNav } from "./BarSideBar";
import AppLauncher from "@/components/header/AppLauncher";
import { NotificationBell, ModeToggle } from "@sharpnr/ui";
import { AppUserCard } from "@/components/header/AppUserCard";

export function BarRootLayout() {
  return (
    <AppShell
      defaultOpen
      insetClassName="m-2"
      mainClassName="p-2"
      sidebar={
        <Sidebar collapsible="icon">
          {/* Bar module sidebar */}
          <BarSideBarNav />
        </Sidebar>
      }
      headerActions={
        <>
          <AppLauncher />
          <NotificationBell onClick={() => console.log("HI")} />
          <AppUserCard />
          <ModeToggle />
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
}
