import { Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
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
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
  SharpnrSidebarFooter,
  ScrollBar,
  ScrollArea,
  Separator,
} from "@sharpnr/ui";
import {
  BarChart3,
  Bell,
  BookOpen,
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
  Settings,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

/* ───────────────── Types ───────────────── */

type MarketingNavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  to: string;
  exact?: boolean;
};

type MarketingNavGroup = {
  group: string;
  items: MarketingNavItem[];
};

/* ───────────────── Nav Config ───────────────── */

const marketingSidebar: MarketingNavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        id: "mkt_dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard/sharp_marketing",
        exact: true,
      },
      {
        id: "mkt_announcements",
        label: "Announcements",
        icon: Bell,
        to: "/dashboard/sharp_marketing/announcements",
      },
    ],
  },

  {
    group: "CRM",
    items: [
      {
        id: "mkt_contacts",
        label: "Contacts",
        icon: Contact,
        to: "/dashboard/sharp_marketing/contacts",
      },
      {
        id: "mkt_leads",
        label: "Leads",
        icon: Users,
        to: "/dashboard/sharp_marketing/leads",
      },
      {
        id: "mkt_pipeline",
        label: "Pipeline",
        icon: Funnel,
        to: "/dashboard/sharp_marketing/pipeline",
      },
      {
        id: "mkt_deals",
        label: "Deals",
        icon: Handshake,
        to: "/dashboard/sharp_marketing/deals",
      },
    ],
  },

  {
    group: "Campaigns",
    items: [
      {
        id: "mkt_campaigns",
        label: "Campaigns",
        icon: Megaphone,
        to: "/dashboard/sharp_marketing/campaigns",
      },
      {
        id: "mkt_email",
        label: "Email Marketing",
        icon: Mail,
        to: "/dashboard/sharp_marketing/email",
      },
      {
        id: "mkt_sms",
        label: "SMS",
        icon: MessageSquare,
        to: "/dashboard/sharp_marketing/sms",
      },
      {
        id: "mkt_social",
        label: "Social Media",
        icon: Share2,
        to: "/dashboard/sharp_marketing/social",
      },
    ],
  },

  {
    group: "Audience",
    items: [
      {
        id: "mkt_segments",
        label: "Segments",
        icon: Layers,
        to: "/dashboard/sharp_marketing/segments",
      },
      {
        id: "mkt_audience",
        label: "Audience",
        icon: Target,
        to: "/dashboard/sharp_marketing/audience",
      },
      {
        id: "mkt_loyalty",
        label: "Loyalty & Rewards",
        icon: Star,
        to: "/dashboard/sharp_marketing/loyalty",
      },
    ],
  },

  {
    group: "Content",
    items: [
      {
        id: "mkt_templates",
        label: "Templates",
        icon: FileText,
        to: "/dashboard/sharp_marketing/templates",
      },
      {
        id: "mkt_landing",
        label: "Landing Pages",
        icon: Globe,
        to: "/dashboard/sharp_marketing/landing-pages",
      },
      {
        id: "mkt_blog",
        label: "Blog & Content",
        icon: BookOpen,
        to: "/dashboard/sharp_marketing/blog",
      },
    ],
  },

  {
    group: "Automation",
    items: [
      {
        id: "mkt_automation",
        label: "Workflows",
        icon: Workflow,
        to: "/dashboard/sharp_marketing/workflows",
      },
      {
        id: "mkt_triggers",
        label: "Triggers",
        icon: Zap,
        to: "/dashboard/sharp_marketing/triggers",
      },
      {
        id: "mkt_cta",
        label: "CTAs",
        icon: MousePointerClick,
        to: "/dashboard/sharp_marketing/cta",
      },
      {
        id: "mkt_tracking",
        label: "UTM Tracking",
        icon: Link2,
        to: "/dashboard/sharp_marketing/utm",
      },
    ],
  },

  {
    group: "Analytics",
    items: [
      {
        id: "mkt_analytics",
        label: "Analytics",
        icon: BarChart3,
        to: "/dashboard/sharp_marketing/analytics",
      },
      {
        id: "mkt_growth",
        label: "Growth",
        icon: TrendingUp,
        to: "/dashboard/sharp_marketing/growth",
      },
    ],
  },

  {
    group: "System",
    items: [
      {
        id: "mkt_settings",
        label: "Settings",
        icon: Settings,
        to: "/dashboard/sharp_marketing/settings",
        exact: true,
      },
    ],
  },
];

/* ───────────────── Nav Item ───────────────── */

const NavMenuItem: React.FC<{ item: MarketingNavItem }> = ({ item }) => {
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

/* ───────────────── Root Layout ───────────────── */

const SharpMarktRootLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="cursor-default hover:bg-transparent"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-pink-600 text-white shrink-0">
                  <Megaphone className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-semibold">
                    Sharp Marketing
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    CRM & Campaigns
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="pb-2">
              {marketingSidebar.map((group) => (
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
        <SharpnrSidebarFooter />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 items-center justify-between border-b px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
          </div>
          <div className="flex items-center gap-3 px-4">
            <SharpnrLauncher
              currentApp="sharpcrm"
              onNavigate={(to) => navigate({ to })}
            />
            <NotificationBell onClick={() => {}} />

            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SharpMarktRootLayout;
