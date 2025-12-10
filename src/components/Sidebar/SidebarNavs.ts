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
  MessageSquare,
  Shield,
  Wrench,
  Cookie,
  HotelIcon,
  TableConfig,
  Server,
  type LucideIcon,
  Wallet,
  ShoppingCart,
  FileText,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon; // Store the component, not JSX
  to: string;
  sub_module_name?:string
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
  module_name?:string
  
}

export const SharpHospitalityNavs: NavSection[] = [
  {
    id: "sharp_hospitality",
    title: "Sharp Hospitality",
    items: [
      {
        id: "hotel_index",
        label: "Hotel",
        icon: HotelIcon,
        to: "/dashboard/sharp_hospitality/hotel",
      },
      {
        id: "hotel_bar",
        label: "Bar",
        icon: ClipboardList,
        to: "/dashboard/sharp_hospitality/bar",
      },
      {
        id: "hotel_guests",
        label: "Guests",
        icon: Database,
        to: "/dashboard/sharp_hospitality/guests",
      },
      {
        id: "hotel_restaurant",
        label: "Restaurant",
        icon: Utensils, // Better icon for restaurant
        to: "/dashboard/sharp_hospitality/restaurant", // Fixed typo: restaurant -> restaurant
      },

      {
        id: "hotel_services",
        label: "Service",
        icon: Server, // Better icon for restaurant
        to: "/dashboard/sharp_hospitality/services", // Fixed typo: restaurant -> restaurant
      },
      {
        id: "hotel_menu",
        label: "Menu",
        icon: BookOpen, // Better icon for menu
        to: "/dashboard/sharp_hospitality/menu",
      },
      {
        id: "hotel_kitchen",
        label: "Kitchen",
        icon: Cookie, // Better icon for menu
        to: "/dashboard/sharp_hospitality/kitchen",
      },
      {
        id: "hotel_inventory",
        label: "Inventory",
        icon: Package, // Better icon for inventory
        to: "/dashboard/sharp_hospitality/inventory",
      },
      {
        id: "hotel_housekeeping",
        label: "House Keeping",
        icon: Sparkles, // Better icon for housekeeping
        to: "/dashboard/sharp_hospitality/housekeeping", // Fixed: was pointing to inventory
      },
      {
        id: "hotel_settings",
        label: "Settings",
        icon: Settings,
        to: "/dashboard/sharp_hospitality/settings",
      },

      {
        id: "org_config",
        label: "Org Configs",
        icon: TableConfig,
        to: "/dashboard/sharp_hospitality/orgConfig",
      },
    ],
  },
];

export const SharpAccountingNavs: NavSection[] = [
  {
    id: "sharp_accounting",
    title: "Sharp Accounting",
    items: [
      {
        id: "acc_transactions",
        label: "Transactions",
        icon: Wallet,
        to: "/dashboard/sharp_accounting/transactions",
      },
      {
        id: "acc_sales",
        label: "Sales",
        icon: ShoppingCart,
        to: "/dashboard/sharp_accounting/sales",
      },
      {
        id: "acc_purchases",
        label: "Purchases",
        icon: FileText,
        to: "/dashboard/sharp_accounting/purchases",
      },
      {
        id: "acc_ledger",
        label: "Ledger",
        icon: BookOpen,
        to: "/dashboard/sharp_accounting/ledger",
      },
      {
        id: "acc_reports",
        label: "Reports",
        icon: BarChart3,
        to: "/dashboard/sharp_accounting/reports",
      },
      {
        id: "acc_settings",
        label: "Settings",
        icon: Settings,
        to: "/dashboard/sharp_accounting/settings",
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
        to: "/dashboard/sharp_marketing/campaigns",
      },
      {
        id: "mkt_leads",
        label: "Leads",
        icon: Shield,
        to: "/dashboard/sharp_marketing/leads",
      },
      {
        id: "mkt_reports",
        label: "Reports",
        icon: Wrench,
        to: "/dashboard/sharp_marketing/reports",
      },
      {
        id: "mkt_social",
        label: "Social Media Mgmt",
        icon: MessageSquare,
        to: "/dashboard/sharp_marketing/social_media_management",
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
        to: "/dashboard/sharp_hr/employee",
      },
      {
        id: "hr_payroll",
        label: "Payroll",
        icon: ClipboardList,
        to: "/dashboard/sharp_hr/payroll",
      },
      {
        id: "hr_leaves",
        label: "Leaves Mgmt",
        icon: CalendarDays,
        to: "/dashboard/sharp_hr/leaves_management",
      },
      {
        id: "hr_reports",
        label: "Reports",
        icon: BarChart3,
        to: "/dashboard/sharp_hr/reports",
      },
       {
        id: "hr_settings",
        label: "Settings",
        icon: Settings,
        to: "/dashboard/sharp_hr/settings",
      },
    ],
  },
];
