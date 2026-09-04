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
  BarChart3,
  Building2,
  CalendarCheck,
  ClipboardList,
  Contact,
  Funnel,
  HeartHandshake,
  Layers,
  LayoutDashboard,
  Megaphone,
  Package,
  PieChart,
  Plug,
  Receipt,
  Settings,
  Star,
  TrendingUp,
  UserPlus,
  Workflow,
} from "lucide-react";

import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";
import { config } from "@sharpnr/env";

/* ───────────────── Types ───────────────── */

type CrmNavItem = {
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

type CrmNavGroup = {
  group: string;
  items: CrmNavItem[];
};

/* ───────────────── Nav Config ───────────────── */

const crmSidebar: CrmNavGroup[] = [
  {
    group: "Workspace",
    items: [
      {
        id: "crm_dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
        exact: true,
      },
      {
        // The daily driver: calls, meetings, and follow-ups that are due.
        // A CRM without this has nowhere to answer "who do I call back?".
        id: "crm_activities",
        label: "Activities",
        icon: CalendarCheck,
        to: "/activities",
      },
    ],
  },

  {
    group: "Relationships",
    items: [
      {
        id: "crm_leads",
        label: "Leads",
        icon: UserPlus,
        to: "/leads",
      },
      {
        id: "crm_contacts",
        label: "Contacts",
        icon: Contact,
        to: "/contacts",
      },
      {
        // The organizations behind the contacts. Without it the CRM only
        // models B2C, which is the wrong shape for the rest of the suite.
        id: "crm_companies",
        label: "Companies",
        icon: Building2,
        to: "/companies",
      },
      {
        // Distinct from Contacts on purpose: a contact is a person we know, a
        // customer is an account that has actually transacted -- purchase
        // history, lifetime value, loyalty standing, and the billing
        // relationship that Sharp-Accounting invoices against. The old nav had
        // both labels pointing at the same route, which is what made the
        // entity look redundant.
        id: "crm_customers",
        label: "Customers",
        icon: HeartHandshake,
        to: "/customers",
      },
      {
        id: "crm_segments",
        label: "Segments",
        icon: Layers,
        to: "/segments",
      },
    ],
  },

  {
    group: "Sales",
    items: [
      {
        // Deals and pipeline are the same records in a board view and a table
        // view, so they are one destination with a view switch, not two links.
        id: "crm_pipeline",
        label: "Pipeline",
        icon: Funnel,
        to: "/pipeline",
      },
      {
        id: "crm_quotes",
        label: "Quotes",
        icon: Receipt,
        to: "/quotes",
      },
      {
        id: "crm_products",
        label: "Products",
        icon: Package,
        to: "/products",
      },
      {
        id: "crm_forecast",
        label: "Forecast",
        icon: TrendingUp,
        to: "/forecast",
      },
    ],
  },

  {
    group: "Engagement",
    items: [
      {
        // Email, SMS, WhatsApp and social are channels a campaign picks, and
        // templates are assets it uses -- both belong inside this screen.
        id: "crm_campaigns",
        label: "Campaigns",
        icon: Megaphone,
        to: "/campaigns",
      },
      {
        id: "crm_journeys",
        label: "Journeys",
        icon: Workflow,
        to: "/journeys",
      },
      {
        id: "crm_forms",
        label: "Forms",
        icon: ClipboardList,
        to: "/forms",
      },
      {
        id: "crm_loyalty",
        label: "Loyalty & Rewards",
        icon: Star,
        to: "/loyalty",
      },
    ],
  },

  {
    group: "Insights",
    items: [
      {
        // Reports are the ones a user builds; Analytics are the ones we ship.
        id: "crm_reports",
        label: "Reports",
        icon: PieChart,
        to: "/reports",
      },
      {
        id: "crm_analytics",
        label: "Analytics",
        icon: BarChart3,
        to: "/analytics",
      },
    ],
  },

  {
    group: "System",
    items: [
      {
        id: "crm_integrations",
        label: "Integrations",
        icon: Plug,
        to: "/integrations",
      },
      {
        id: "crm_settings",
        label: "Settings",
        icon: Settings,
        to: "/settings",
        exact: true,
      },
    ],
  },
];

/* ───────────────── Nav Item ───────────────── */

const NavMenuItem: React.FC<{ item: CrmNavItem }> = ({ item }) => {
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
const CrmSidebar: React.FC = () => {
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
            {crmSidebar.map((group) => (
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
      <SharpnrSidebarFooter appName="Sharp CRM" />
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
      sidebar={<CrmSidebar />}
      headerActions={
        <>
          <SharpnrLauncher currentApp="sharpcrm" />
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
