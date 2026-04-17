import { Outlet, Link, useRouterState } from "@tanstack/react-router";
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
} from "@/components/ui/sidebar";
import {
  Megaphone,
  Target,
  Mail,
  TrendingUp,
  BarChart3,
  Settings,
} from "lucide-react";

export const marketingSidebarItems = [
  {
    id: "mkt_overview",
    label: "Overview",
    icon: BarChart3,
    to: "/dashboard/sharp_marketing",
  },
  {
    id: "mkt_campaigns",
    label: "Campaigns",
    icon: Megaphone,
    to: "/dashboard/sharp_marketing/campaigns",
  },
  {
    id: "mkt_audience",
    label: "Audience",
    icon: Target,
    to: "/dashboard/sharp_marketing/audience",
  },
  {
    id: "mkt_outreach",
    label: "Outreach",
    icon: Mail,
    to: "/dashboard/sharp_marketing/outreach",
  },
  {
    id: "mkt_growth",
    label: "Growth",
    icon: TrendingUp,
    to: "/dashboard/sharp_marketing/growth",
  },
  {
    id: "mkt_settings",
    label: "Settings",
    icon: Settings,
    to: "/dashboard/sharp_marketing/settings",
  },
];

const SharpMarktRootLayout: React.FC = () => {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (to: string) =>
    to === "/dashboard/sharp_marketing"
      ? pathname === to
      : pathname.startsWith(`${to}/`) || pathname === to;

  return (
    <SidebarProvider>
      {/* ================= Sidebar ================= */}
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Marketing</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {marketingSidebarItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.to)}
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
        </SidebarContent>
      </Sidebar>

      {/* ================= Main Content ================= */}
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <span className="font-medium">Sharp Marketing</span>
        </header>

        <main className="flex-1 p-2">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SharpMarktRootLayout;
