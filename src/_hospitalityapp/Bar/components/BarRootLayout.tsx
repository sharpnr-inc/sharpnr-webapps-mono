import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { BarSideBarNav } from "./BarSideBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Building2, ChevronsUpDown, Check } from "lucide-react";
import React from "react";

/* ===============================
   Dummy Property Data
================================ */
const properties = [
  "Sharp Residency",
  "Ocean View Hotel",
  "City Center Inn",
] as const;

const defaultProperty = properties[0];

export function BarRootLayout() {
  const [selectedProperty, setSelectedProperty] =
    React.useState<(typeof properties)[number]>(
      defaultProperty
    );

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon">
          {/* ===== Property Switcher ===== */}
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Building2 className="size-4" />
                  </div>

                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">
                      {selectedProperty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Property
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="min-w-[240px]"
              >
                {properties.map((property) => (
                  <DropdownMenuItem
                    key={property}
                    onSelect={() =>
                      setSelectedProperty(property)
                    }
                  >
                    {property}
                    {property === selectedProperty && (
                      <Check className="ml-auto size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Bar module sidebar */}
          <BarSideBarNav />
        </Sidebar>

        {/* Main content */}
        <SidebarInset className="m-2">
          <div className="flex h-full flex-col">
            {/* Top bar */}
            <header className="flex h-12 items-center px-3">
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
