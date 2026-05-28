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
        to: "/requests",
        label: "My Requests",
        icon: ClipboardList,
        match: "/iam/requests",
      },
      {
        to: "/tasks",
        label: "My Tasks",
        icon: CheckSquare,
        match: "/iam/tasks",
      },
      {
        to: "/approvals",
        label: "Approvals",
        icon: Briefcase,
        match: "/iam/approvals",
      },
      {
        to: "/announcements",
        label: "Announcements",
        icon: Bell,
        match: "/iam/announcements",
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
        match: "/iam/attendance",
      },
      {
        to: "/leave",
        label: "Leave",
        icon: CalendarDays,
        match: "/iam/leave",
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
        match: "/iam/payslips",
      },
      {
        to: "/expenses",
        label: "Expenses & Claims",
        icon: BadgeDollarSign,
        match: "/iam/expenses",
      },
      {
        to: "/benefits",
        label: "Benefits",
        icon: HeartPulse,
        match: "/iam/benefits",
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
        match: "/iam/goals",
      },
      {
        to: "/reviews",
        label: "Performance Reviews",
        icon: Star,
        match: "/iam/reviews",
      },
      {
        to: "/training",
        label: "Training",
        icon: GraduationCap,
        match: "/iam/training",
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
        match: "/iam/documents",
      },
      {
        to: "/legal",
        label: "Legal",
        icon: Scale,
        match: "/iam/legal",
      },
      {
        to: "/contracts",
        label: "Contracts",
        icon: FileText,
        match: "/iam/contracts",
      },
    ],
  },

  {
    group: "Support",
    items: [
      {
        to: "/helpdesk",
        label: "IT Helpdesk",
        icon: LifeBuoy,
        match: "/iam/helpdesk",
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
        match: "/iam/profile",
        exact: true,
      },
      {
        to: "/apps",
        label: "My Apps",
        icon: AppWindowMac,
        match: "/iam/apps",
      },
      {
        to: "/settings",
        label: "Settings",
        icon: Settings,
        match: "/iam/settings",
        exact: true,
      },
    ],
  },
];
