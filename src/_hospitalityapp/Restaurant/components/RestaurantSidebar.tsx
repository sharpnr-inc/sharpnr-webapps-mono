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
  Calendar,
  CalendarCheck2,
  BarChart3,
  BedDoubleIcon,
} from "lucide-react";

export function RestaurantSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;
  return (
    <SidebarContent className="sm:pt-16 md:pt-16">
      <SidebarGroup>
        <SidebarGroupLabel>Restaurant Managements</SidebarGroupLabel>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/restaurant"}
            >
              <Link to="/dashboard/sharp_hospitality/restaurant">
                <BarChart3 />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/"}
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/table">
                <CalendarCheck2 />
                <span>Table Managements</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/restaurant/general-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/general-settings">
                <BedDoubleIcon />
                <span>General Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/restaurant/kitchen"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/kitchen">
                <BedDoubleIcon />
                <span>Kitchen</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/restaurant/inventory"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/inventory">
                <BedDoubleIcon />
                <span>Inventory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/restaurant/sales-terminal"
              }
            >
              <Link to="/dashboard/sharp_hospitality/restaurant/sales-terminal">
                <BedDoubleIcon />
                <span>Sales Terminal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
