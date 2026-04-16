import { Link, useRouterState } from "@tanstack/react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  FileText,
  MessageSquare,
  User,
  ClipboardList,
  CheckSquare,
  Building2,
} from "lucide-react";

export function IamSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <SidebarContent>
      <div className="p-2">
        <div
          className={`
        flex items-center gap-3 rounded-lg
        
        ${collapsed ? "justify-center p-2" : "p-2"}
      `}
        >
          <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="h-5 w-5 text-primary" />
          </div>

          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">
                Acme Corporation
              </span>
            </div>
          )}
        </div>
      </div>

      <SidebarGroup>
        <SidebarMenu>
          {/* Profile */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/profile")}>
              <Link to="/">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Requests */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/requests")}>
              <Link to="/requests">
                <ClipboardList />
                <span>Requests</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Tasks */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/tasks")}>
              <Link to="/tasks">
                <CheckSquare />
                <span>Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Messages */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/messages")}>
              <Link to="/messages">
                <MessageSquare />
                <span>Messages</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Legal */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/legal")}>
              <Link to="/legal">
                <FileText />
                <span>Legal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/attendance")}>
              <Link to="/attendance">
                <FileText />
                <span>Attendance</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/apps")}>
              <Link to="/apps">
                <FileText />
                <span>Apps</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
