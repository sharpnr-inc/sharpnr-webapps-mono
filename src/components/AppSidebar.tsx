import { Building2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
  SharpnrSidebarFooter,
} from "@sharpnr/ui";
import { useAppUserStore } from "@/store/AppUserStore";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { orchestratorGroups, type SidebarLink } from "./SidebarLinks";

function SidebarLinkItem({ item }: { item: SidebarLink }) {
  const Icon = item.icon;
  const { location } = useRouterState();

  const isActive = item.exact
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path ?? "");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="bg-transparent"
        size="sm"
        isActive={isActive}
        asChild={!!item.path}
      >
        {item.path ? (
          <Link to={item.path}>
            <Icon />
            <span>{item.label}</span>
          </Link>
        ) : (
          <>
            <Icon />
            <span>{item.label}</span>
          </>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function OrchestratorShell() {
  const { state } = useSidebar();
  const { user } = useAppUserStore();
  const nav = useNavigate();
  const { location } = useRouterState();

  const isCollapsed = state === "collapsed";
  const isHomeActive = location.pathname === "/home";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isHomeActive}
              size="lg"
              variant="outline"
              tooltip={user?.org_data.org_name}
              className="cursor-pointer"
              onClick={() => nav({ to: "/home" })}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-sm font-bold">
                    {user?.org_data.org_name}
                  </span>
                  <span className="truncate text-xs font-mono">
                    {user?.org_data.sharp_id}
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {orchestratorGroups.map((group: any) => (
          <SidebarGroup key={group.groupLabel}>
            <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((item: any) => (
                  <SidebarLinkItem key={item.label} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SharpnrSidebarFooter />
    </Sidebar>
  );
}
