import { Outlet } from "@tanstack/react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { RestaurantSidebar } from "./RestaurantSidebar";
import { ModeToggle } from "@/components/header/ThemeToggle";
import SharpnrLauncher from "@/components/header/SharpnrLauncher";
import { UserCard } from "@/components/header/UserCard";
import { NotificationBell } from "@/components/header/NotificationButton";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import { SharpnrSidebarFooter } from "@/components/ui/SharpnrSidebarFooter";

export function RestaurantRootLayout() {
  const queryClient = useQueryClient();

  const restaurants = queryClient.getQueryData([
    "PropertyContext",
    "Restaurant",
    "RestaurantList",
  ]);

  console.log(restaurants);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-full">
        <Sidebar collapsible="icon">
          {/* <div className="p-2">
            <SidebarMenuButton
              size="lg"
              onClick={() =>
                navigate({
                  to: "/restaurant",
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
          </div> */}

          <RestaurantSidebar />
          <SharpnrSidebarFooter />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-12 items-center justify-between border-b px-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
            </div>
            <div className="flex items-center gap-3 px-4">
              <SharpnrLauncher />
              <NotificationBell onClick={() => console.log("HI")} />
              <UserCard />
              <ModeToggle />
            </div>
          </header>

          <main className="p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
