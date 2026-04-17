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
  Boxes,
  ShoppingCart,
  LucideListOrdered,
  Table2Icon,
  Calendar,
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
    to: "/restaurant/overview",
    icon: LayoutDashboard,
    match: (pathname) =>
      pathname === "/restaurant/overview",
  },
  {
    label: "Dine In",
    to: "/restaurant/table-management",
    icon: Table2Icon,
    match: (pathname) => pathname.startsWith("/restaurant/table-management"),
  },
  {
    label: "Reservations",
    to: "/restaurant/reservations",
    icon: Calendar,
    match: (pathname) =>
      pathname.startsWith(
        "/restaurant/reservations",
      ),
  },
  {
    label: "Inventory",
    to: "/restaurant/inventory",
    icon: Boxes,
    match: (pathname) =>
      pathname.startsWith("/restaurant/inventory"),
  },
  {
    label: "Pickup",
    to: "/restaurant/sales-terminal",
    icon: ShoppingCart,
    match: (pathname) =>
      pathname.startsWith(
        "/restaurant/sales-terminal",
      ),
  },
  {
    label: "Orders",
    to: "/restaurant/orders",
    icon: LucideListOrdered,
    match: (pathname) =>
      pathname.startsWith("/restaurant/orders"),
  },
  // {
  //   label: "General Settings",
  //   to: "/restaurant/general-settings",
  //   icon: Settings,
  //   match: (pathname) =>
  //     pathname.startsWith(
  //       "/restaurant/general-settings",
  //     ),
  // },
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
