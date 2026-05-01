import { Link, useRouterState } from "@tanstack/react-router";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  MessageSquare,
  User,
  ClipboardList,
  CheckSquare,
  Building2,
  AppWindowMac,
  Flag,
  Scale,
} from "lucide-react";
import { SharpnrSidebarFooter } from "./ui/SharpnrSidebarFooter";

const workspaceLinks = [
  {
    to: "/requests",
    label: "Requests",
    icon: ClipboardList,
    match: "/iam/requests",
  },
  { to: "/tasks", label: "Tasks", icon: CheckSquare, match: "/iam/tasks" },
  {
    to: "/messages",
    label: "Messages",
    icon: MessageSquare,
    match: "/iam/messages",
  },
  { to: "/legal", label: "Legal", icon: Scale, match: "/iam/legal" },
];

const personalLinks = [
  { to: "/", label: "Profile", icon: User, match: "/iam/profile" },
  {
    to: "/attendance",
    label: "Attendance",
    icon: Flag,
    match: "/iam/attendance",
  },
  { to: "/apps", label: "Apps", icon: AppWindowMac, match: "/iam/apps" },
];

export function AppSidebar() {
  const { location } = useRouterState();

  const isActive = (to: string, match: string) =>
    location.pathname === "/"
      ? to === "/"
      : location.pathname.startsWith(match);

  return (
    <Sidebar collapsible="icon">
      {/* Brand header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default hover:bg-transparent active:bg-transparent"
              tooltip="Acme Corporation"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">Acme</span>
                <span className="text-xs text-muted-foreground">
                  Corporation
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Workspace group */}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceLinks.map(({ to, label, icon: Icon, match }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(to, match)}
                    tooltip={label}
                  >
                    <Link to={to}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Personal group */}
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personalLinks.map(({ to, label, icon: Icon, match }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(to, match)}
                    tooltip={label}
                  >
                    <Link to={to}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SharpnrSidebarFooter />
    </Sidebar>
  );
}
