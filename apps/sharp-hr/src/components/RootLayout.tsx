import { Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  NotificationBell,
  UserCard,
  ModeToggle,
  SharpnrLauncher,
} from "@sharpnr/ui";
import { config } from "@sharpnr/env";
import { useAppUserStore, selectIsLoadingUser } from "@/store/AppUserStore";
import { useLogout } from "@/api/mutation";
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
  SidebarRail,
  ScrollArea,
  ScrollBar,
  useSheet,
  SharpnrSidebarFooter,
  AppShell,
} from "@sharpnr/ui";
import {
  Users,
  UserPlus,
  UserMinus,
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
  FileText,
  HeartPulse,
  AlertTriangle,
  TrendingUp,
  BadgeDollarSign,
} from "lucide-react";

/* ───────────────── Types ───────────────── */

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  to: string;
  exact?: boolean;
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
        id: "hr_dashboard",
        label: "Dashboard",
        icon: BarChart3,
        to: "/dashboard",
        exact: true,
      },
      {
        id: "hr_announcements",
        label: "Announcements",
        icon: Bell,
        to: "/announcements",
      },
      {
        id: "hr_compliance",
        label: "Compliance & Policy",
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
    ],
  },

  {
    label: "Hiring",
    items: [
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
      {
        id: "hr_offboarding",
        label: "Offboarding",
        icon: UserMinus,
        to: "/offboarding",
      },
    ],
  },

  {
    label: "Time & Attendance",
    items: [
      {
        id: "hr_attendance",
        label: "Attendance",
        icon: CalendarDays,
        to: "/attendance",
      },
      { id: "hr_leave", label: "Leave", icon: ClipboardList, to: "/leaves" },
    ],
  },

  {
    label: "Payroll & Benefits",
    items: [
      { id: "hr_payroll", label: "Payroll", icon: Banknote, to: "/payroll" },
      {
        id: "hr_compensation",
        label: "Compensation",
        icon: BadgeDollarSign,
        to: "/compensation",
      },
      {
        id: "hr_benefits",
        label: "Benefits",
        icon: HeartPulse,
        to: "/benefits",
      },
      {
        id: "hr_expenses",
        label: "Expense Claims",
        icon: FileText,
        to: "/expenses",
      },
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
      },
      { id: "hr_goals", label: "Goals & OKRs", icon: TrendingUp, to: "/goals" },
      { id: "hr_training", label: "Training", icon: BookOpen, to: "/training" },
    ],
  },

  {
    label: "Employee Relations",
    items: [
      {
        id: "hr_grievances",
        label: "Grievances",
        icon: AlertTriangle,
        to: "/grievances",
      },
      {
        id: "hr_disciplinary",
        label: "Disciplinary",
        icon: ShieldCheck,
        to: "/disciplinary",
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        id: "hr_settings",
        label: "Settings",
        icon: Settings,
        to: "/settings",
        exact: true,
      },
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

/* ───────────────── Nav Item ───────────────── */

const NavMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
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

const SharpHRRootLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppUserStore();
  const isLoadingUser = useAppUserStore(selectIsLoadingUser);
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
  const { openSheet } = useSheet();

  const handleOpenNotification = () => {
    openSheet(<>HI</>, "3/4");
  };

  return (
    <AppShell
      sidebar={
        <Sidebar collapsible="icon" variant="sidebar">
          <SidebarHeader>
            <OrgCard />
          </SidebarHeader>

          <SidebarContent className="overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="pb-2">
                {navGroups.map((group) => (
                  <SidebarGroup key={group.label}>
                    <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

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
          <SharpnrSidebarFooter appName="Sharp HR" />
        </Sidebar>
      }
      headerActions={
        <>
          <SharpnrLauncher
            currentApp="hr"
            onNavigate={(to) => navigate({ to })}
          />
          <NotificationBell onClick={handleOpenNotification} />
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

export default SharpHRRootLayout;
