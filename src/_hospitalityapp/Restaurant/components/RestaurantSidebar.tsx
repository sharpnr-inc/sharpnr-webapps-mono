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
  ChefHat,
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
    to: "/dashboard/sharp_hospitality/restaurant/table",
    icon: Grid3x3,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/restaurant/table"),
  },
  {
    label: "Reservations",
    to: "/dashboard/sharp_hospitality/restaurant/table",
    icon: Grid3x3,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/restaurant/table"),
  },
  {
    label: "Kitchen",
    to: "/dashboard/sharp_hospitality/restaurant/kitchen",
    icon: ChefHat,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/restaurant/kitchen"),
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
    to: "/dashboard/sharp_hospitality/restaurant/general-settings",
    icon: LucideListOrdered,
    match: (pathname) =>
      pathname.startsWith(
        "/dashboard/sharp_hospitality/restaurant/general-settings",
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
