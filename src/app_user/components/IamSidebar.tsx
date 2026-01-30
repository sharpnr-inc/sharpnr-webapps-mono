import { Link, useRouterState } from "@tanstack/react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  FileText,
  MessageSquare,
  User,
  ClipboardList,
  CheckSquare,
} from "lucide-react";

export function IamSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <SidebarContent >
      <SidebarGroup>
        <SidebarGroupLabel>IAM</SidebarGroupLabel>

        <SidebarMenu>
          {/* Profile */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/profile")}>
              <Link to="/iam/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Requests */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/requests")}>
              <Link to="/iam/requests">
                <ClipboardList />
                <span>Requests</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Tasks */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/tasks")}>
              <Link to="/iam/tasks">
                <CheckSquare />
                <span>Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Messages */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/messages")}>
              <Link to="/iam/messages">
                <MessageSquare />
                <span>Messages</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Legal */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/iam/legal")}>
              <Link to="/iam/legal">
                <FileText />
                <span>Legal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
