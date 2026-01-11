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
NetworkIcon,
  UtensilsCrossed,
  Wine,
  Hotel,
} from "lucide-react";

export function HospitalityOrchestratorSideBar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <SidebarContent className="sm:pt-16 md:pt-16">
      <SidebarGroup>
        <SidebarGroupLabel>Organization Settings</SidebarGroupLabel>

        <SidebarMenu>
          {/* Overview */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/org-config"
              }
            >
              <Link to="/dashboard/sharp_hospitality/org-config">
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Parent Organization */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/org-config/orchestrator"
              }
            >
              <Link to="/dashboard/sharp_hospitality/org-config/orchestrator">
                <NetworkIcon className="h-4 w-4" />
                <span>Parent Organization</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Restaurant Config */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/org-config/restaurant-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/org-config/restaurant-settings">
                <UtensilsCrossed className="h-4 w-4" />
                <span>Restaurant Config</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Bar Config */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/org-config/bar-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/org-config/bar-settings">
                <Wine className="h-4 w-4" />
                <span>Bar Config</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Hotel Config */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/org-config/hotel-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/org-config/hotel-settings">
                <Hotel className="h-4 w-4" />
                <span>Hotel Config</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
