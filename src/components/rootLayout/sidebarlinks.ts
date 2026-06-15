import {
  AppWindowMac,
  BadgeDollarSign,
  Bell,
  Briefcase,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  FileText,
  Flag,
  FolderOpen,
  GraduationCap,
  HeartPulse,
  LifeBuoy,
  Scale,
  Settings,
  Star,
  Target,
  User,
  Wallet,
} from "lucide-react";

export type IamNavItem = {
  to: string;
  label: string;
  icon: React.ElementType;
  match: string;
  exact?: boolean;
};

export type IamNavGroup = {
  group: string;
  items: IamNavItem[];
};

export const iamSidebar: IamNavGroup[] = [
  {
    group: "Workspace",
    items: [
      {
        to: "/myrequest",
        label: "My Requests",
        icon: ClipboardList,
        match: "/myrequest",
      },
      {
        to: "/tasks",
        label: "My Tasks",
        icon: CheckSquare,
        match: "/tasks",
      },
      {
        to: "/approvals",
        label: "Approvals",
        icon: Briefcase,
        match: "/approvals",
      },
      {
        to: "/announcements",
        label: "Announcements",
        icon: Bell,
        match: "/announcements",
      },
    ],
  },

  {
    group: "Time & Attendance",
    items: [
      {
        to: "/attendance",
        label: "Attendance",
        icon: Flag,
        match: "/attendance",
      },
      {
        to: "/leaves",
        label: "Leaves",
        icon: CalendarDays,
        match: "/leaves",
      },
    ],
  },

  {
    group: "Payroll & Finance",
    items: [
      {
        to: "/payslips",
        label: "Payslips",
        icon: Wallet,
        match: "/payslips",
      },
      {
        to: "/expenses_claims",
        label: "Expenses & Claims",
        icon: BadgeDollarSign,
        match: "/expenses_claims",
      },
      {
        to: "/benefits",
        label: "Benefits",
        icon: HeartPulse,
        match: "/benefits",
      },
    ],
  },

  {
    group: "Performance",
    items: [
      {
        to: "/goals",
        label: "Goals & OKRs",
        icon: Target,
        match: "/goals",
      },
      {
        to: "/reviews",
        label: "Performance Reviews",
        icon: Star,
        match: "/reviews",
      },
      {
        to: "/training",
        label: "Training",
        icon: GraduationCap,
        match: "/training",
      },
    ],
  },

  {
    group: "My Documents",
    items: [
      {
        to: "/documents",
        label: "Documents",
        icon: FolderOpen,
        match: "/documents",
      },
      {
        to: "/legal",
        label: "Legal",
        icon: Scale,
        match: "/legal",
      },
      {
        to: "/contracts",
        label: "Contracts",
        icon: FileText,
        match: "/contracts",
      },
    ],
  },

  {
    group: "Support",
    items: [
      {
        to: "/it_helpdesk",
        label: "IT Helpdesk",
        icon: LifeBuoy,
        match: "/it_helpdesk",
      },
    ],
  },

  {
    group: "Personal",
    items: [
      {
        to: "/profile",
        label: "Profile",
        icon: User,
        match: "/profile",
        exact: true,
      },
      {
        to: "/my-apps",
        label: "My Apps",
        icon: AppWindowMac,
        match: "/my-apps",
      },
      {
        to: "/settings",
        label: "Settings",
        icon: Settings,
        match: "/settings",
        exact: true,
      },
    ],
  },
];
