import {
  Outlet,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import {
  NotificationBell,
  ModeToggle,
  SharpnrLauncher,
  UserCard,
} from "@sharpnr/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarRail,
  SharpnrSidebarFooter,
  AppShell,
  ScrollBar,
  ScrollArea,
  useSidebar,
} from "@sharpnr/ui";
import {
  Bot,
  Boxes,
  Building2,
  ClipboardCheck,
  Database,
  FileCheck,
  KeyRound,
  Laptop,
  LayoutDashboard,
  Lock,
  MonitorSmartphone,
  Package,
  ScrollText,
  Server,
  Settings,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";
import { config } from "@sharpnr/env";

/* ───────────────── Types ───────────────── */

type CortexNavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  /**
   * Typed against the generated route tree rather than `string`, so a nav
   * entry pointing at a route that does not exist fails the build instead of
   * shipping a link that silently 404s.
   */
  to: NonNullable<LinkProps["to"]>;
  exact?: boolean;
};

type CortexNavGroup = {
  group: string;
  items: CortexNavItem[];
};

/* ───────────────── Nav Config ───────────────── */

const cortexSidebar: CortexNavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        id: "ctx_dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
        exact: true,
      },
      {
        id: "ctx_audit_logs",
        label: "Audit Logs",
        icon: ScrollText,
        to: "/audit-logs",
      },
    ],
  },

  {
    group: "Access",
    items: [
      {
        id: "ctx_users",
        label: "Users",
        icon: Users,
        to: "/users",
      },
      {
        id: "ctx_roles",
        label: "Roles",
        icon: ShieldCheck,
        to: "/roles",
      },
      {
        id: "ctx_policies",
        label: "Policies",
        icon: FileCheck,
        to: "/policies",
      },
      {
        id: "ctx_access_requests",
        label: "Access Requests",
        icon: UserCheck,
        to: "/access-requests",
      },
    ],
  },

  {
    group: "Resources",
    items: [
      {
        id: "ctx_resources",
        label: "Resources",
        icon: Boxes,
        to: "/resources",
      },
      {
        id: "ctx_databases",
        label: "Databases",
        icon: Database,
        to: "/databases",
      },
      {
        id: "ctx_infrastructure",
        label: "Infrastructure",
        icon: Server,
        to: "/infrastructure",
      },
    ],
  },

  {
    group: "Devices",
    items: [
      {
        id: "ctx_devices",
        label: "Devices",
        icon: Laptop,
        to: "/devices",
      },
      {
        id: "ctx_endpoints",
        label: "Endpoint Security",
        icon: MonitorSmartphone,
        to: "/endpoints",
      },
      {
        id: "ctx_assets",
        label: "Assets",
        icon: Package,
        to: "/assets",
      },
    ],
  },

  {
    group: "Credentials",
    items: [
      {
        id: "ctx_api_keys",
        label: "API Keys",
        icon: KeyRound,
        to: "/api-keys",
      },
      {
        id: "ctx_service_accounts",
        label: "Service Accounts",
        icon: Bot,
        to: "/service-accounts",
      },
      {
        id: "ctx_secrets",
        label: "Secrets",
        icon: Lock,
        to: "/secrets",
      },
    ],
  },

  {
    group: "System",
    items: [
      {
        id: "ctx_compliance",
        label: "Compliance",
        icon: ClipboardCheck,
        to: "/compliance",
      },
      {
        id: "ctx_settings",
        label: "Settings",
        icon: Settings,
        to: "/settings",
        exact: true,
      },
    ],
  },
];

/* ───────────────── Nav Item ───────────────── */

const NavMenuItem: React.FC<{ item: CortexNavItem }> = ({ item }) => {
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
const CortexSidebar: React.FC = () => {
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
            {cortexSidebar.map((group) => (
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
      <SharpnrSidebarFooter appName="Cortex" />
    </Sidebar>
  );
};

/* ───────────────── Root Layout ───────────────── */

const RootLayout: React.FC = () => {
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  return (
    <AppShell
      sidebar={<CortexSidebar />}
      headerActions={
        <>
          <SharpnrLauncher currentApp="cortex" />
          <NotificationBell onClick={() => {}} />
          <UserCard
            user={user}
            isLoading={isLoadingUser}
            onLogout={() => logoutUser()}
            isLoggingOut={isLoggingOut}
            iamUrl={config.iamAppUrl}
          />
          <ModeToggle />
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default RootLayout;
