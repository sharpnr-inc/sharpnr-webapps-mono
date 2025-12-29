import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouterState, Link } from "@tanstack/react-router";
import { BookOpen, ListTree } from "lucide-react";

export function BarSideBarNav() {
  const { location } = useRouterState();
  const pathname = location.pathname;
  return (
    <SidebarContent className="sm:pt-16 md:pt-16">
      <SidebarGroup>
        <SidebarGroupLabel>Bar Management</SidebarGroupLabel>

        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={
              pathname === "/dashboard/sharp_hospitality/bar"
            }
          >
            <Link to="/dashboard/sharp_hospitality/bar">
              <BookOpen />
              <span>Overview</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/bar/sale-counter"
              }
            >
              <Link to="/dashboard/sharp_hospitality/bar/sale-counter">
                <BookOpen />
                <span>Sale counter</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/bar/tables-management"
              }
            >
              <Link to="/dashboard/sharp_hospitality/bar/tables-management">
                <ListTree />
                <span>Tables</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
