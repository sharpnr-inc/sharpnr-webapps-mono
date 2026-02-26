import { Outlet, useNavigate } from "@tanstack/react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { RestaurantSidebar } from "./RestaurantSidebar";
import { Building2 } from "lucide-react";

import { RouteBreadcrumbs } from "@/components/custom/router-breadcrumbs";
import { useSelectedRestaurant } from "../store/selectors";

export function RestaurantRootLayout() {
  const selectedRestaurant = useSelectedRestaurant();
  const navigate = useNavigate();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-full">
        <Sidebar collapsible="icon">
          <div className="p-2">
            <SidebarMenuButton
              size="lg"
              onClick={() =>
                navigate({
                  to: "/dashboard/sharp_hospitality/restaurant",
                })
              }
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 className="size-4" />
              </div>

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">
                  {selectedRestaurant?.Name ?? "Select Restaurant"}
                </span>

                <span className="text-xs text-muted-foreground">
                  {selectedRestaurant?.Property?.Name ?? "Property"}
                </span>
              </div>
            </SidebarMenuButton>
          </div>

          <RestaurantSidebar />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-12 items-center gap-2 px-4">
            <SidebarTrigger />
            <div className="h-4 w-[1px] bg-border mx-2" />
            <RouteBreadcrumbs />
          </header>

          <main className="p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
