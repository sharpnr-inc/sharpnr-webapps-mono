import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Building2 as OrgIcon } from "lucide-react";

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
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Users,
  UserPlus,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Settings,
  Banknote,
  Star,
  BookOpen,
  Building2,
  Bell,
  ShieldCheck,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import SharpnrLauncher from "@/components/header/SharpnrLauncher";
import { NotificationBell } from "@/components/header/NotificationButton";
import { UserCard } from "@/components/header/UserCard";
import { ModeToggle } from "@/components/header/ThemeToggle";
import { useSheet } from "@/hooks/useSheet";

/* ───────────────── Types ───────────────── */

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  to: string;
  tooltip?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

/* ───────────────── Organization ───────────────── */

const organization = {
  name: "Sharpnr Organization",
  plan: "Enterprise",
  logo: OrgIcon,
};

/* ───────────────── Navigation ───────────────── */

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        id: "hr_overview",
        label: "Dashboard",
        icon: BarChart3,
        to: "/dashboard",
      },
      {
        id: "hr_announcements",
        label: "Announcements",
        icon: Bell,
        to: "/annoucements",
      },
      {
        id: "hr_policies",
        label: "Compliance & Policies",
        icon: ShieldCheck,
        to: "/compliance_policies",
      },
    ],
  },

  {
    label: "People",
    items: [
      { id: "hr_employees", label: "Employees", icon: Users, to: "/employees" },
      {
        id: "hr_departments",
        label: "Departments",
        icon: Building2,
        to: "/departments",
      },
      {
        id: "hr_recruitment",
        label: "Recruitment",
        icon: UserPlus,
        to: "/recruitment",
      },
      {
        id: "hr_onboarding",
        label: "Onboarding",
        icon: BookOpen,
        to: "/onboarding",
      },
    ],
  },

  {
    label: "Operations",
    items: [
      { id: "hr_leave", label: "Leave", icon: ClipboardList, to: "/leaves" },
      {
        id: "hr_attendance",
        label: "Attendance",
        icon: CalendarDays,
        to: "/attendance",
      },
      { id: "hr_payroll", label: "Payroll", icon: Banknote, to: "/payroll" },
    ],
  },

  {
    label: "Growth",
    items: [
      {
        id: "hr_performance",
        label: "Performance",
        icon: Star,
        to: "/performance",
        tooltip: "Employee Performance",
      },
      {
        id: "hr_training",
        label: "Training",
        icon: ShieldCheck,
        to: "/training",
      },
    ],
  },

  {
    label: "System",
    items: [
      { id: "hr_settings", label: "Settings", icon: Settings, to: "/settings" },
    ],
  },
];

/* ───────────────── Org Card ───────────────── */

const OrgCard: React.FC = () => {
  const Logo = organization.logo;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent active:bg-transparent"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-violet-600 text-white shrink-0">
            <Logo className="size-4" />
          </div>

          <div className="grid flex-1 text-left text-sm">
            <span className="truncate font-semibold">{organization.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {organization.plan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

/* ───────────────── Root Layout ───────────────── */

const SharpHRRootLayout: React.FC = () => {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (to: string) =>
    to === "/"
      ? pathname === to
      : pathname.startsWith(`${to}/`) || pathname === to;

  const { openSheet } = useSheet();

  const handleOpenNotification = () => {
    openSheet(<>HI</>, "3/4");
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <OrgCard />
        </SidebarHeader>

        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <SidebarMenuItem key={item.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(item.to)}
                            >
                              <Link to={item.to}>
                                <Icon />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>

                          <TooltipContent side="right">
                            {item.tooltip ?? item.label}
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 items-center justify-between border-b px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
          </div>

          <div className="flex items-center gap-3 px-4">
            <SharpnrLauncher />
            <NotificationBell onClick={() => handleOpenNotification()} />
            <UserCard />
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SharpHRRootLayout;
