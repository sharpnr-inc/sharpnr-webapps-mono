import { Outlet, Link } from "@tanstack/react-router";
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
    id: "hr_attendance",
    label: "Attendance",
    icon: CalendarDays,
    to: "/dashboard/sharp_hr/attendance",
  },
  {
    id: "hr_leave",
    label: "Leave Requests",
    icon: ClipboardList,
    to: "/dashboard/sharp_hr/leave",
  },
  {
    id: "hr_recruitment",
    label: "Recruitment",
    icon: UserPlus,
    to: "/dashboard/sharp_hr/recruitment",
  },
  {
    id: "hr_settings",
    label: "Settings",
    icon: Settings,
    to: "/dashboard/sharp_hr/settings",
  },
];

interface SharpHRRootLayoutProps {}

const SharpHRRootLayout: React.FC<SharpHRRootLayoutProps> = () => {
  return (
    <SidebarProvider>
      {/* ================= Sidebar ================= */}
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* ================= Organization Card ================= */}

          <SidebarGroup>
            <div className="p-2">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-sidebar-accent group-data-[collapsible=icon]:px-2">
                {/* Icon always visible */}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="h-4 w-4" />
                </div>

                {/* Text hidden when sidebar is collapsed */}
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
                      <SidebarMenuButton asChild>
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
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger />
          <span className="font-medium">Sharp HR</span>
        </header>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SharpHRRootLayout;
