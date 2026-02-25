import { Outlet } from "@tanstack/react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { RestaurantSidebar } from "./RestaurantSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, Building2 } from "lucide-react";
import React from "react";
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/route";
import { RouteBreadcrumbs } from "@/components/custom/router-breadcrumbs";

export function RestaurantRootLayout() {
  const { properties } = Route.useLoaderData();

  const [selectedPropertyId, setSelectedPropertyId] = React.useState<
    string | undefined
  >(properties?.[0]?.PropertyID);

  const selectedProperty = properties?.find(
    (p: any) => p.PropertyID === selectedPropertyId,
  );

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-full">
        <Sidebar collapsible="icon">
          {/* ===== Property Switcher ===== */}
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Building2 className="size-4" />
                  </div>

                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">
                      {selectedProperty?.PropertyName ?? "Select Property"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Property
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="min-w-[240px]">
                {properties?.map((property: any) => (
                  <DropdownMenuItem
                    key={property.PropertyID}
                    onSelect={() => setSelectedPropertyId(property.PropertyID)}
                  >
                    {property.PropertyName}

                    {property.PropertyID === selectedPropertyId && (
                      <Check className="ml-auto size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
