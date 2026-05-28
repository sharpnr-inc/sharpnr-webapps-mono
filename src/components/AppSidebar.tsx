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
  useSidebar,
} from "@sharpnr/ui";
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
import { SharpnrSidebarFooter } from "@sharpnr/ui";
import { useAppUserStore } from "@/store/AppUserStore";
import { motion, AnimatePresence } from "framer-motion";

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
  { to: "/apps", label: "Training", icon: AppWindowMac, match: "/iam/apps" },
];

export function AppSidebar() {
  const { location } = useRouterState();
  const { user } = useAppUserStore();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
              size={"sm"}
              className="cursor-default hover:bg-transparent active:bg-transparent"
              tooltip={user?.org_data.org_name}
            >
              {/* Icon badge — always visible */}
              <motion.div
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground overflow-hidden"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                {/* Subtle top-left sheen */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/15 to-transparent" />
                <Building2 className="h-4 w-4 relative z-10" />
              </motion.div>

              {/* Text block — animates out on collapse */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    key="org-text"
                    className="flex min-w-0 flex-col leading-tight"
                    initial={{ opacity: 0, x: -6, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: "auto" }}
                    exit={{ opacity: 0, x: -6, width: 0 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.span
                      className="truncate text-sm  tracking-tight font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12, delay: 0.04 }}
                    >
                      {user?.org_data.org_name}
                    </motion.span>
                    <motion.span
                      className="truncate text-xs text-muted-foreground font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12, delay: 0.06 }}
                    >
                      {user?.org_data.sharp_id}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
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
                    size={"sm"}
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

        {/* Personal group */}
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personalLinks.map(({ to, label, icon: Icon, match }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    size={"sm"}
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
