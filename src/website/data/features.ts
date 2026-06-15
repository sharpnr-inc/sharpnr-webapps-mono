import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Network,
  ListChecks,
  CalendarCheck,
  ReceiptText,
  Wallet,
  Clock,
  Target,
  History,
  Megaphone,
  FileText,
  UserCog,
  CalendarClock,
  CalendarDays,
  BadgeCheck,
  BarChart3,
  Bell,
  Boxes,
} from "lucide-react";

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

export const FEATURES: Feature[] = [
  {
    id: "login",
    title: "Secure Employee Login",
    description:
      "Single sign-on backed by Sharpnr identity. Multi-factor ready and session-aware across every device.",
    icon: ShieldCheck,
  },
  {
    id: "dashboard",
    title: "Employee Dashboard",
    description:
      "A personalised home base summarising tasks, requests, announcements and what needs attention today.",
    icon: LayoutDashboard,
  },
  {
    id: "team",
    title: "Team Management",
    description:
      "Managers oversee direct reports, reassign work and keep teams aligned from a single view.",
    icon: Users,
  },
  {
    id: "directory",
    title: "Organization Directory",
    description:
      "Browse the full org chart, find colleagues by role or department and reach the right person fast.",
    icon: Network,
  },
  {
    id: "tasks",
    title: "Assigned Tasks",
    description:
      "View, update and complete assigned tasks with clear priorities, due dates and progress tracking.",
    icon: ListChecks,
  },
  {
    id: "leaves",
    title: "Leave & Approvals",
    description:
      "Apply for leave, check balances and follow each approval through every stage in real time.",
    icon: CalendarCheck,
  },
  {
    id: "expenses",
    title: "Expense & Reimbursement",
    description:
      "Submit expenses with receipts and track reimbursement status without chasing finance.",
    icon: ReceiptText,
  },
  {
    id: "payroll",
    title: "Payroll & Payslips",
    description:
      "Securely access payslips, salary breakdowns and tax documents whenever they are needed.",
    icon: Wallet,
  },
  {
    id: "attendance",
    title: "Attendance & Timesheets",
    description:
      "Clock in and out, log hours and review timesheets with a complete, accurate attendance record.",
    icon: Clock,
  },
  {
    id: "reviews",
    title: "Reviews & Goals",
    description:
      "Set goals, track progress and run performance reviews that keep growth conversations on record.",
    icon: Target,
  },
  {
    id: "activity",
    title: "Activity & Work History",
    description:
      "A transparent log of activity and work history for accountability and easy reference.",
    icon: History,
  },
  {
    id: "announcements",
    title: "Company Announcements",
    description:
      "Stay informed with org-wide and team announcements delivered straight to the portal.",
    icon: Megaphone,
  },
  {
    id: "documents",
    title: "Document Access",
    description:
      "Access and download policies, contracts and shared files from one organised library.",
    icon: FileText,
  },
  {
    id: "profile",
    title: "Profile Management",
    description:
      "Keep personal details, contact info and emergency contacts current and accurate.",
    icon: UserCog,
  },
  {
    id: "shift",
    title: "Shift & Schedule",
    description:
      "View upcoming shifts and schedules so everyone knows where they are expected and when.",
    icon: CalendarClock,
  },
  {
    id: "holiday",
    title: "Holiday Calendar",
    description:
      "Plan ahead with a shared holiday calendar covering company and regional observances.",
    icon: CalendarDays,
  },
  {
    id: "approvals",
    title: "Manager Approvals",
    description:
      "Review and action approval requests for leave, expenses and tasks from one queue.",
    icon: BadgeCheck,
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description:
      "Turn workforce data into clear reports and analytics for confident decisions.",
    icon: BarChart3,
  },
  {
    id: "notifications",
    title: "Notifications & Reminders",
    description:
      "Timely notifications and reminders keep deadlines, approvals and updates from slipping.",
    icon: Bell,
  },
  {
    id: "platform",
    title: "Sharp Platform Integration",
    description:
      "Connected to the entire Sharpnr platform so people, finance and operations stay in sync.",
    icon: Boxes,
  },
];
