import { Outlet } from "@tanstack/react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { HotelSidebar } from "./HotelSidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Building2, ChevronsUpDown, Check } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import SharpnrLauncher from "@/components/header/SharpnrLauncher";
import { NotificationBell } from "@/components/header/NotificationButton";
import { UserCard } from "@/components/header/UserCard";
import { ModeToggle } from "@/components/header/ThemeToggle";

/* ===============================
   Dummy Property Data
================================ */
const properties = [
  "Sharp Residency",
  "Ocean View Hotel",
  "City Center Inn",
] as const;

const defaultProperty = properties[0];

export function HotelRootLayout() {
  const [selectedProperty, setSelectedProperty] =
    React.useState<(typeof properties)[number]>(defaultProperty);

  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full">
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
                    <span className="font-medium">{selectedProperty}</span>
                    <span className="text-xs text-muted-foreground">
                      Property
                    </span>
                  </div>

                  <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="min-w-60">
                {properties.map((property) => (
                  <DropdownMenuItem
                    key={property}
                    onSelect={() => setSelectedProperty(property)}
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

          {/* Hotel module sidebar */}
          <HotelSidebar />
        </Sidebar>

        {/* Main content */}
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
          <main className=" p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
