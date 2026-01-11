import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouterState, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Grid3x3,
  UserRound,
  ChefHat,
  Boxes,
} from "lucide-react";

export function BarSideBarNav() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <SidebarContent className="sm:pt-16 md:pt-16">
      <SidebarGroup>
        <SidebarGroupLabel>Bar Management</SidebarGroupLabel>

        {/* Overview */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === "/dashboard/sharp_hospitality/bar"}
          >
            <Link to="/dashboard/sharp_hospitality/bar">
              <LayoutDashboard />
              <span>Overview</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenu>
          {/* Sale Counter */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/bar/sale-counter"
              }
            >
              <Link to="/dashboard/sharp_hospitality/bar/sale-counter">
                <ShoppingCart />
                <span>Sale Counter</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Tables */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/bar/tables-management"
              }
            >
              <Link to="/dashboard/sharp_hospitality/bar/tables-management">
                <Grid3x3 />
                <span>Tables</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Bar Tender */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/bar/bar-tender"
              }
            >
              <Link to="/dashboard/sharp_hospitality/bar/bar-tender">
                <UserRound />
                <span>Bar Tender</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Kitchen */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/bar/bar-kitchen"
              }
            >
              <Link to="/dashboard/sharp_hospitality/bar/bar-kitchen">
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
                pathname ===
                "/dashboard/sharp_hospitality/bar/inventory"
              }
            >
              <Link to="/dashboard/sharp_hospitality/bar/inventory">
                <Boxes />
                <span>Inventory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
