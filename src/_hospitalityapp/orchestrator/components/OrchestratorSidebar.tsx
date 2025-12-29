import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Link2, ListTree } from "lucide-react";

export function HospitalityOrchestratorSideBar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <SidebarContent className="sm:pt-16 md:pt-16">
      <SidebarGroup>
        <SidebarGroupLabel>Organization setting</SidebarGroupLabel>
        <SidebarMenu>
          {/* Overview */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/org-config"}
            >
              <Link to="/dashboard/sharp_hospitality/org-config">
                <BookOpen className="h-4 w-4" />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Parent Organization / Orchestrator */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/org-config/orchestrator"}
            >
              <Link to="/dashboard/sharp_hospitality/org-config/orchestrator">
                <ListTree className="h-4 w-4" />
                <span>Parent Organization</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Restaurant Config */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/org-config/restaurant-settings"}
            >
              <Link to="/dashboard/sharp_hospitality/org-config/restaurant-settings">
                <Link2 className="h-4 w-4" />
                <span>Restaurant config</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Bar Config */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/org-config/bar-settings"}
            >
              <Link to="/dashboard/sharp_hospitality/org-config/bar-settings">
                <Link2 className="h-4 w-4" />
                <span>Bar config</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Hotel Config */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/org-config/hotel-settings"}
            >
              <Link to="/dashboard/sharp_hospitality/org-config/hotel-settings">
                <Link2 className="h-4 w-4" />
                <span>Hotel config</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}