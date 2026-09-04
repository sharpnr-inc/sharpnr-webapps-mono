import {
  Outlet,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { NotificationBell, ModeToggle, SharpnrLauncher } from "@sharpnr/ui";
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
  Bell,
  BookOpen,
  Building2,
  Contact,
  FileText,
  Funnel,
  Globe,
  Handshake,
  Layers,
  LayoutDashboard,
  Link2,
  Mail,
  Megaphone,
  MessageSquare,
  MousePointerClick,
  PersonStanding,
  Settings,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { useAppUserStore } from "@/store/AppUserStore";

/* ───────────────── Types ───────────────── */

type CrmNavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  to: string;
  exact?: boolean;
};

type CrmNavGroup = {
  group: string;
  items: CrmNavItem[];
};

/* ───────────────── Nav Config ───────────────── */

const crmSidebar: CrmNavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
        exact: true,
      },
      {
        id: "crm_announcements",
        label: "Announcements",
        icon: Bell,
        to: "/dashboard/announcements",
      },
    ],
  },

  {
    group: "CRM",
    items: [
      {
        id: "crm_contacts",
        label: "Contacts",
        icon: Contact,
        to: "/dashboard/contacts",
      },

      {
        id: "customers",
        label: "Customers",
        icon: PersonStanding,
        to: "/dashboard/contacts",
      },
      {
        id: "crm_leads",
        label: "Leads",
        icon: Users,
        to: "/dashboard/leads",
      },
      {
        id: "crm_pipeline",
        label: "Pipeline",
        icon: Funnel,
        to: "/dashboard/pipeline",
      },
      {
        id: "crm_deals",
        label: "Deals",
        icon: Handshake,
        to: "/dashboard/deals",
      },
    ],
  },

  {
    group: "Campaigns",
    items: [
      {
        id: "crm_campaigns",
        label: "Campaigns",
        icon: Megaphone,
        to: "/dashboard/campaigns",
      },
      {
        id: "crm_email",
        label: "Email Marketing",
        icon: Mail,
        to: "/dashboard/email",
      },
      {
        id: "crm_sms",
        label: "SMS",
        icon: MessageSquare,
        to: "/dashboard/sms",
      },
      {
        id: "crm_social",
        label: "Social Media",
        icon: Share2,
        to: "/dashboard/social",
      },
    ],
  },

  {
    group: "Audience",
    items: [
      {
        id: "crm_segments",
        label: "Segments",
        icon: Layers,
        to: "/dashboard/segments",
      },
      {
        id: "crm_audience",
        label: "Audience",
        icon: Target,
        to: "/dashboard/audience",
      },
      {
        id: "crm_loyalty",
        label: "Loyalty & Rewards",
        icon: Star,
        to: "/dashboard/loyalty",
      },
    ],
  },

  {
    group: "Content",
    items: [
      {
        id: "crm_templates",
        label: "Templates",
        icon: FileText,
        to: "/dashboard/templates",
      },
      {
        id: "crm_landing",
        label: "Landing Pages",
        icon: Globe,
        to: "/dashboard/landing-pages",
      },
      {
        id: "crm_blog",
        label: "Blog & Content",
        icon: BookOpen,
        to: "/dashboard/blog",
      },
    ],
  },

  {
    group: "Automation",
    items: [
      {
        id: "crm_automation",
        label: "Workflows",
        icon: Workflow,
        to: "/dashboard/workflows",
      },
      {
        id: "crm_triggers",
        label: "Triggers",
        icon: Zap,
        to: "/dashboard/triggers",
      },
      {
        id: "crm_cta",
        label: "CTAs",
        icon: MousePointerClick,
        to: "/dashboard/cta",
      },
      {
        id: "crm_tracking",
        label: "UTM Tracking",
        icon: Link2,
        to: "/dashboard/utm",
      },
    ],
  },

  {
    group: "Analytics",
    items: [
      {
        id: "crm_analytics",
        label: "Analytics",
        icon: BarChart3,
        to: "/dashboard/analytics",
      },
      {
        id: "crm_growth",
        label: "Growth",
        icon: TrendingUp,
        to: "/dashboard/growth",
      },
    ],
  },

  {
    group: "System",
    items: [
      {
        id: "crm_settings",
        label: "Settings",
        icon: Settings,
        to: "/dashboard/settings",
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
  return (
    <AppShell
      sidebar={<CrmSidebar />}
      headerActions={
        <>
          <SharpnrLauncher currentApp="sharpcrm" />
          <NotificationBell onClick={() => {}} />
          <ModeToggle />
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default RootLayout;
