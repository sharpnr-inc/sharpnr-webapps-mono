import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Users,
  UserPlus,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Settings,
  Building2,
} from "lucide-react";
import { RouteBreadcrumbs } from "@/components/custom/router-breadcrumbs";

export const hrSidebarItems = [
  {
    id: "hr_overview",
    label: "Overview",
    icon: BarChart3,
    to: "/dashboard/sharp_hr",
  },
  {
    id: "hr_employees",
    label: "Employees",
    icon: Users,
    to: "/dashboard/sharp_hr/employees",
  },
  {
    id: "hr_leave",
    label: "Leave Requests",
    icon: ClipboardList,
    to: "/dashboard/sharp_hr/leaves",
  },
  {
    id: "hr_recruitment",
    label: "Recruitment",
    icon: UserPlus,
    to: "/dashboard/sharp_hr/recruitment",
  },
  {
    id: "hr_attendance",
    label: "Reports",
    icon: CalendarDays,
    to: "/dashboard/sharp_hr/reports",
  },
  {
    id: "hr_settings",
    label: "Settings",
    icon: Settings,
    to: "/dashboard/sharp_hr/settings",
  },
];

const SharpHRRootLayout: React.FC = () => {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (to: string) =>
    to === "/dashboard/sharp_hr"
      ? pathname === to
      : pathname.startsWith(`${to}/`) || pathname === to;

  return (
    <SidebarProvider>
      {/* ================= Sidebar ================= */}
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* ================= Organization Switcher (static for now) ================= */}
          <SidebarGroup>
            <div className="p-2">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-sidebar-accent group-data-[collapsible=icon]:px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="h-4 w-4" />
                </div>

                <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="font-medium">Sharpnr LLP</span>
                  <span className="text-xs text-muted-foreground">
                    Organization
                  </span>
                </div>
              </div>
            </div>
          </SidebarGroup>

          {/* ================= Menu ================= */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {hrSidebarItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={isActive(item.to)}>
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
        <header className="flex h-14 items-center gap-2 px-4 ">
          <SidebarTrigger />
          <div className="h-4 w-[1px] bg-border mx-2" />{" "}
          {/* Custom vertical line */}
          <RouteBreadcrumbs />
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SharpHRRootLayout;
