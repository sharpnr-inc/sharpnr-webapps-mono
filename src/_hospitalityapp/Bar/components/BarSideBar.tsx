import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  Table,
} from "lucide-react";
import type { ToPathOption } from "@tanstack/react-router";

/* ===============================
   Types
================================ */
type BarSidebarItem = {
  label: string;
  to: ToPathOption;
  icon: React.ComponentType<any>;
  match: (pathname: string) => boolean;
};

/* ===============================
   Menu Configuration
================================ */
const barSidebarMenu: BarSidebarItem[] = [
  {
    label: "Overview",
    to: "/dashboard/sharp_hospitality/bar",
    icon: LayoutDashboard,
    match: (pathname) => pathname === "/dashboard/sharp_hospitality/bar",
  },
  {
    label: "Table Management",
    to: "/dashboard/sharp_hospitality/bar/table_management",
    icon: Table,
    match: (pathname) => pathname === "/dashboard/sharp_hospitality/bar/table_management",
  },
  {
    label: "Sale Counter",
    to: "/dashboard/sharp_hospitality/bar/bar_pos",
    icon: ShoppingCart,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/bar/bar_pos"),
  },
  {
    label: "Inventory",
    to: "/dashboard/sharp_hospitality/bar/inventory",
    icon: Boxes,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/bar/inventory"),
  },

  {
    label: "General Setting",
    to: "/dashboard/sharp_hospitality/bar/settings",
    icon: Boxes,
    match: (pathname) =>
      pathname.startsWith("/dashboard/sharp_hospitality/bar/settings"),
  },
];

/* ===============================
   Component
================================ */
export function BarSideBarNav() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Bar Management</SidebarGroupLabel>

        <SidebarMenu>
          {barSidebarMenu.map((item) => {
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
