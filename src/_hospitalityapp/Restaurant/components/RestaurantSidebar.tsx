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
} from "lucide-react";

export function RestaurantSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Restaurant Management</SidebarGroupLabel>

        <SidebarMenu>
          {/* Overview */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/restaurant"}
            >
              <Link to="/dashboard/sharp_hospitality/restaurant">
                <LayoutDashboard />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Tables */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/restaurant/table"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/table">
                <Grid3x3 />
                <span>Table Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Kitchen */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/restaurant/kitchen"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/kitchen">
                <ChefHat />
                <span>Kitchen</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Inventory */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/restaurant/inventory"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/inventory">
                <Boxes />
                <span>Inventory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Sales Terminal */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/restaurant/sales-terminal"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/sales-terminal">
                <ShoppingCart />
                <span>Sales Terminal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Settings */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/restaurant/general-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/general-settings">
                <Settings />
                <span>General Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
