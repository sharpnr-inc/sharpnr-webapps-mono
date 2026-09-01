import { Outlet } from "@tanstack/react-router";
import {
  AppShell,
  Sidebar,
  SidebarMenuButton,
  SharpnrSidebarFooter,
} from "@sharpnr/ui";
import { RestaurantSidebar } from "./RestaurantSidebar";
import AppLauncher from "@/components/header/AppLauncher";
import { AppUserCard } from "@/components/header/AppUserCard";
import { NotificationBell, ModeToggle } from "@sharpnr/ui";
import { useQueryClient } from "@tanstack/react-query";
import { Building2 } from "lucide-react";

export function RestaurantRootLayout() {
  const queryClient = useQueryClient();

  const restaurants = queryClient.getQueryData([
    "PropertyContext",
    "Restaurant",
    "RestaurantList",
  ]);

  console.log(restaurants);

  return (
    <AppShell
      defaultOpen={false}
      sidebar={
        <Sidebar collapsible="icon">
          <div className="p-2">
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 className="size-4" />
              </div>

              <div className="flex flex-col gap-0.5 leading-none"></div>
            </SidebarMenuButton>
          </div>

          <RestaurantSidebar />
          <SharpnrSidebarFooter appName="Hospitality" />
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
