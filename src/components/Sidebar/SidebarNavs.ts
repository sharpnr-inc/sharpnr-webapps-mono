import {
  UserCog,
  ClipboardList,
  Database,
  BarChart3,
  CalendarDays,
  Settings,
  Utensils,
  BookOpen,
  Package,
  Sparkles,
  Bell,
  MessageSquare,
  Shield,
  Wrench,
  Cookie,
  HotelIcon,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon; // Store the component, not JSX
  to: string;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

export const EmployeeNavs: NavSection[] = [
  {
    id: "employee",
    title: "Employee Sections",
    items: [
      {
        id: "attendance",
        label: "Attendance",
        icon: UserCog,
        to: "/dashboard/employee/employee-attendance",
      },
      {
        id: "leaves",
        label: "Leaves",
        icon: ClipboardList,
        to: "/dashboard/employee/leaves",
      },
      {
        id: "reviews",
        label: "Reviews",
        icon: Database,
        to: "/dashboard/employee/reviews",
      },
      {
        id: "greivences",
        label: "Greivences",
        icon: BarChart3,
        to: "/dashboard/employee/greivences",
      },
      {
        id: "requests",
        label: "Requests",
        icon: CalendarDays,
        to: "/dashboard/employee/requests",
      },
      {
        id: "overtime",
        label: "Overtime",
        icon: BarChart3,
        to: "/dashboard/employee/overtime",
      },
      {
        id: "feedback",
        label: "Feedback",
        icon: BarChart3,
        to: "/dashboard/employee/feedback",
      },
    ],
  },
];

export const SharpHospitalityNavs = [
  {
    id: "sharphotel",
    title: "Sharp Hospitality",

    items: [
      {
        id: "hotel_index",
        label: "Hotel",
        icon: HotelIcon,
        to: "/dashboard/sharphotel/hotel",
      },
      {
        id: "hotel_bar",
        label: "Bar",
        icon: ClipboardList,
        to: "/dashboard/sharphotel/bar",
      },
      {
        id: "hotel_guests",
        label: "Guests",
        icon: Database,
        to: "/dashboard/sharphotel/guests",
      },
      {
        id: "hotel_restaurant",
        label: "Restaurant",
        icon: Utensils, // Better icon for restaurant
        to: "/dashboard/sharphotel/restaurent", // Fixed typo: restaurent -> restaurant
      },
      {
        id: "hotel_menu",
        label: "Menu",
        icon: BookOpen, // Better icon for menu
        to: "/dashboard/sharphotel/menu",
      },
      {
        id: "hotel_kitchen",
        label: "Kitchen",
        icon: Cookie, // Better icon for menu
        to: "/dashboard/sharphotel/kitchen",
      },
      {
        id: "hotel_inventory",
        label: "Inventory",
        icon: Package, // Better icon for inventory
        to: "/dashboard/sharphotel/inventory",
      },
      {
        id: "hotel_housekeeping",
        label: "House Keeping",
        icon: Sparkles, // Better icon for housekeeping
        to: "/dashboard/sharphotel/housekeeping", // Fixed: was pointing to inventory
      },
      {
        id: "hotel_settings",
        label: "Settings",
        icon: Settings,
        to: "/dashboard/sharphotel/settings",
      },
    ],
  },
];

export const SharpAccountingNavs = [
  {
    id: "sharpaccounting",
    title: "Sharp Accounting",
    items: [
      {
        id: "acc_transactions",
        label: "Transactions",
        icon: MessageSquare,
        to: "/dashboard/sharpAccounting/transactions",
      },
      {
        id: "acc_expense",
        label: "Expenses",
        icon: Bell,
        to: "/dashboard/sharpAccounting/expenses",
      },
      {
        id: "acc_invoices",
        label: "Invoices",
        icon: Database,
        to: "/dashboard/sharpAccounting/invoices",
      },
      {
        id: "acc_ledger",
        label: "Ledger",
        icon: Wrench,
        to: "/dashboard/sharpAccounting/ledger",
      },
      {
        id: "acc_customers",
        label: "Customers",
        icon: Shield,
        to: "/dashboard/sharpAccounting/customers",
      },
      {
        id: "acc_suppliers",
        label: "Suppliers & Vendors",
        icon: CalendarDays,
        to: "/dashboard/sharpAccounting/suppliersandvendors",
      },
      {
        id: "acc_reports",
        label: "Reports",
        icon: BarChart3,
        to: "/dashboard/sharpAccounting/Reports",
      },
    ],
  },
];

export const SharpMarketingNavs: NavSection[] = [
  {
    id: "sharpmarketing",
    title: "Sharp Marketing",
    items: [
      {
        id: "mkt_campaigns",
        label: "Campaigns",
        icon: Settings,
        to: "/dashboard/sharpmarketing/campaigns",
      },
      {
        id: "mkt_leads",
        label: "Leads",
        icon: Shield,
        to: "/dashboard/sharpmarketing/leads",
      },
      {
        id: "mkt_reports",
        label: "Reports",
        icon: Wrench,
        to: "/dashboard/sharpmarketing/reports",
      },
      {
        id: "mkt_social",
        label: "Social Media Mgmt",
        icon: MessageSquare,
        to: "/dashboard/sharpmarketing/social-media-management",
      },
    ],
  },
];

export const SharpHRNavs: NavSection[] = [
  {
    id: "sharphr",
    title: "Sharp HR",
    items: [
      {
        id: "hr_employee",
        label: "Employee",
        icon: UserCog,
        to: "/dashboard/sharphr/employee",
      },
      {
        id: "hr_payroll",
        label: "Payroll",
        icon: ClipboardList,
        to: "/dashboard/sharphr/payroll",
      },
      {
        id: "hr_leaves",
        label: "Leaves Mgmt",
        icon: CalendarDays,
        to: "/dashboard/sharphr/leaves-management",
      },
      {
        id: "hr_reports",
        label: "Reports",
        icon: BarChart3,
        to: "/dashboard/sharphr/reports",
      },
    ],
  },
];
