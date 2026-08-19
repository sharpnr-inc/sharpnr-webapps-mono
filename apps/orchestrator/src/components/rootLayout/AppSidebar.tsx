import { Building2, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  useSidebar,
  SharpnrSidebarFooter,
  ScrollArea,
} from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { useAppUserStore } from "@/store/AppUserStore";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  orchestratorGroups,
  type SidebarLink,
  type SidebarGroup as SidebarGroupData,
} from "./SidebarLinks";

function isLinkActive(item: SidebarLink, pathname: string) {
  if (!item.path) return false;
  return item.exact ? pathname === item.path : pathname.startsWith(item.path);
}

function SidebarLinkItem({ item }: { item: SidebarLink }) {
  const Icon = item.icon;
  const { location } = useRouterState();

  // Treat an empty / missing children array as a plain link.
  const children = item.children ?? [];
  const hasChildren = children.length > 0;

  const childActive = hasChildren
    ? children.some((child) => isLinkActive(child, location.pathname))
    : false;

  const selfActive = isLinkActive(item, location.pathname);

  // Keep the group expanded when one of its children is the active route.
  const [open, setOpen] = useState(childActive);

  /* ── Plain link (no nested children) ──────────────────── */
  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          className="bg-transparent"
          size="sm"
          isActive={!!selfActive}
          tooltip={item.tooltip}
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

  /* ── Collapsible group with nested links ──────────────── */
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="bg-transparent"
        size="sm"
        isActive={selfActive || childActive}
        tooltip={item.tooltip}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icon />
        <span>
          {item.label}
          {item.badge && (
            <sup className="ml-1 text-[0.6rem] font-semibold uppercase text-primary">
              {item.badge}
            </sup>
          )}
        </span>
        <ChevronRight
          className={cn(
            "ml-auto transition-transform duration-200",
            open && "rotate-90",
          )}
        />
      </SidebarMenuButton>

      {open && (
        <SidebarMenuSub>
          {children.map((child) => {
            const ChildIcon = child.icon;
            return (
              <SidebarMenuSubItem key={child.label}>
                <SidebarMenuSubButton
                  size="sm"
                  isActive={isLinkActive(child, location.pathname)}
                  asChild={!!child.path}
                >
                  {child.path ? (
                    <Link to={child.path}>
                      <ChildIcon />
                      <span>{child.label}</span>
                    </Link>
                  ) : (
                    <>
                      <ChildIcon />
                      <span>{child.label}</span>
                    </>
                  )}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
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
        <ScrollArea className="h-full w-full">
          {orchestratorGroups.map((group: SidebarGroupData) => (
            <SidebarGroup key={group.groupLabel}>
              <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.links.map((item: SidebarLink) => (
                    <SidebarLinkItem key={item.label} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>

      <SharpnrSidebarFooter />
    </Sidebar>
  );
}
