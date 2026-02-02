import { Link, useRouterState } from "@tanstack/react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Grid3x3,
  Boxes,
  ShoppingCart,
  Settings,
  LucideListOrdered,
} from "lucide-react";
import type { ToPathOption } from "@tanstack/react-router";

/* ===============================
   Types
================================ */
type RestaurantSidebarItem = {
  label: string;
  to: ToPathOption;
  icon: React.ComponentType<any>;
  match: (pathname: string) => boolean;
};

/* ===============================
   Menu Configuration
================================ */
const restaurantSidebarMenu: RestaurantSidebarItem[] = [
  {
    label: "Overview",
    to: "/dashboard/sharp_hospitality/restaurant",
    icon: LayoutDashboard,
    match: (pathname) => pathname === "/dashboard/sharp_hospitality/restaurant",
  },
  {
    label: "Table Management",
    to: "/dashboard/sharp_hospitality/restaurant/table-management",
    icon: Grid3x3,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/restaurant/table-management"),
  },
  {
    label: "Reservations",
    to: "/dashboard/sharp_hospitality/restaurant/reservations",
    icon: Grid3x3,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/restaurant/reservations"),
  },
  {
    label: "Inventory",
    to: "/dashboard/sharp_hospitality/restaurant/inventory",
    icon: Boxes,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/restaurant/inventory"),
  },
  {
    label: "Sales Terminal",
    to: "/dashboard/sharp_hospitality/restaurant/sales-terminal",
    icon: ShoppingCart,
    match: (pathname) =>
      pathname.startsWith(
        "/dashboard/sharp_hospitality/restaurant/sales-terminal",
      ),
  },
  {
    label: "Orders",
    to: "/dashboard/sharp_hospitality/restaurant/orders",
    icon: LucideListOrdered,
    match: (pathname) =>
      pathname.startsWith(
        "/dashboard/sharp_hospitality/restaurant/orders",
      ),
  },
  {
    label: "General Settings",
    to: "/dashboard/sharp_hospitality/restaurant/general-settings",
    icon: Settings,
    match: (pathname) =>
      pathname.startsWith(
        "/dashboard/sharp_hospitality/restaurant/general-settings",
      ),
  },
];

/* ===============================
   Component
================================ */
export function RestaurantSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Restaurant Management</SidebarGroupLabel>

        <SidebarMenu>
          {restaurantSidebarMenu.map((item) => {
            const Icon = item.icon;
            const isActive = item.match(pathname);

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={item.to}>
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
