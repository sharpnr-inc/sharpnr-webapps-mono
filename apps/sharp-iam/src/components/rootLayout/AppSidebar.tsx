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
  SharpnrSidebarFooter,
  ScrollArea,
  ScrollBar,
  useSidebar,
} from "@sharpnr/ui";
import { iamSidebar, type IamNavItem } from "./sidebarlinks";
import { useAppUserStore } from "@/store/AppUserStore";
import { Building2 } from "lucide-react";

export function AppSidebar() {
  const { location } = useRouterState();
  const { state } = useSidebar();
  const { user } = useAppUserStore();
  const nav = useNavigate();

  const isCollapsed = state === "collapsed";
  const isHomeActive = location.pathname === "/home";

  const isActive = (item: IamNavItem) =>
    item.exact
      ? location.pathname === item.match
      : location.pathname.startsWith(item.match);

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

      <SidebarContent className="overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="pb-2">
            {iamSidebar.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel>{group.group}</SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            size="sm"
                            asChild
                            isActive={isActive(item)}
                            tooltip={item.label}
                          >
                            <Link to={item.to}>
                              <Icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SidebarContent>

      <SharpnrSidebarFooter appName="SharpIAM" />
    </Sidebar>
  );
}
