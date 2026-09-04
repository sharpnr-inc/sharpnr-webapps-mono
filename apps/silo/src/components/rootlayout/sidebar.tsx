import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SharpnrSidebarFooter,
  ScrollArea,
  ScrollBar,
  useSidebar,
} from "@sharpnr/ui";
import { Building2 } from "lucide-react";

import { siloSidebar, type SiloNavItem } from "./navs";
import { useAppUserStore } from "@/store/AppUserStore";

/* ───────────────── Nav Item ───────────────── */

const NavMenuItem: React.FC<{ item: SiloNavItem }> = ({ item }) => {
  const { location } = useRouterState();
  const Icon = item.icon;

  const isActive = item.exact
    ? location.pathname === item.to
    : location.pathname.startsWith(item.to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size="sm"
        asChild
        isActive={isActive}
        tooltip={item.label}
      >
        <Link to={item.to}>
          <Icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

/* ───────────────── Sidebar ───────────────── */

/**
 * Its own component rather than JSX inlined into <AppShell sidebar={…}>:
 * `useSidebar` only works below the provider that AppShell renders, so the
 * header needs to be a child of it to know whether the rail is collapsed.
 */
export function AppSidebar() {
  const { location } = useRouterState();
  const { state } = useSidebar();
  const { user } = useAppUserStore();
  const navigate = useNavigate();

  const isCollapsed = state === "collapsed";
  const isDashboardActive = location.pathname === "/dashboard";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              variant="outline"
              isActive={isDashboardActive}
              tooltip={user?.org_data.org_name}
              className="cursor-pointer"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                <Building2 className="size-4" />
              </div>

              {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm min-w-0">
                  <span className="truncate font-semibold">
                    {user?.org_data.org_name}
                  </span>
                  <span className="truncate text-xs font-mono text-muted-foreground">
                    {user?.org_data.sharp_id}
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="pb-2">
            {siloSidebar.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel>{group.group}</SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <NavMenuItem key={item.id} item={item} />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SidebarContent>

      <SidebarRail />
      <SharpnrSidebarFooter appName="Silo" />
    </Sidebar>
  );
}
