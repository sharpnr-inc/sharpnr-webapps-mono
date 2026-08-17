import { Link, useRouterState } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@sharpnr/ui";
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  LucideListOrdered,
  Table2Icon,
  Calendar,
  Settings,
} from "lucide-react";
import { Route } from "@/routes/workspace/_modules/restaurant/$restaurantID/route";

/* ===============================
   Types
================================ */
type RestaurantSidebarItem = {
  label: string;
  to: LinkProps["to"];
  params: LinkProps["params"];
  icon: React.ComponentType<any>;
  match: (pathname: string) => boolean;
};

/* ===============================
   Menu Configuration
================================ */
const getRestaurantSidebarMenu = (
  restaurantID: string,
): RestaurantSidebarItem[] => [
  {
    label: "Overview",
    to: "/workspace/restaurant/$restaurantID/overview",
    params: { restaurantID },
    icon: LayoutDashboard,
    match: (pathname) => pathname.includes("/overview"),
  },
  {
    label: "Dine In",
    to: "/workspace/restaurant/$restaurantID/table-management",
    params: { restaurantID },
    icon: Table2Icon,
    match: (pathname) => pathname.includes("/table-management"),
  },
  {
    label: "Reservations",
    to: "/workspace/restaurant/$restaurantID/reservations",
    params: { restaurantID },
    icon: Calendar,
    match: (pathname) => pathname.includes("/reservations"),
  },
  {
    label: "Inventory",
    to: "/workspace/restaurant/$restaurantID/inventory",
    params: { restaurantID },
    icon: Boxes,
    match: (pathname) => pathname.includes("/inventory"),
  },
  {
    label: "Pickup",
    to: "/workspace/restaurant/$restaurantID/sales-terminal",
    params: { restaurantID },
    icon: ShoppingCart,
    match: (pathname) => pathname.includes("/sales-terminal"),
  },
  {
    label: "Orders",
    to: "/workspace/restaurant/$restaurantID/orders",
    params: { restaurantID },
    icon: LucideListOrdered,
    match: (pathname) => pathname.includes("/orders"),
  },
  {
    label: "General Settings",
    to: "/workspace/restaurant/$restaurantID/general-settings",
    params: { restaurantID },
    icon: Settings,
    match: (pathname) => pathname.includes("/general-settings"),
  },
];

/* ===============================
   Component
================================ */
export function RestaurantSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { restaurantID } = Route.useParams();
  const menu = getRestaurantSidebarMenu(restaurantID);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Restaurant Management</SidebarGroupLabel>

        <SidebarMenu>
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = item.match(pathname);

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={item.to} params={item.params}>
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
