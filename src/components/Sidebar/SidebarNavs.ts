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
        icon: UserCog, // Component reference, not <UserCog />
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
        id: "hotel_settings",
        label: "Settings",
        icon: Settings,
        to: "/dashboard/sharphotel/settings",
      },
      {
        id: "hotel_bar",
        label: "Bar",
        icon: ClipboardList,
        to: "/dashboard/sharphotel/bar",
      },
      {
        id: "hotel_bookings",
        label: "Bookings",
        icon: CalendarDays,
        to: "/dashboard/sharphotel/bookings",
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
        to: "/dashboard/sharphotel/restaurant", // Fixed typo: restaurent -> restaurant
      },
      {
        id: "hotel_menu",
        label: "Menu",
        icon: BookOpen, // Better icon for menu
        to: "/dashboard/sharphotel/menu",
      },
      {
        id: "hotel_kitchen",
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
    ],
  },
];

export const SharpAccountingNavs = [];

export const SharpMarketingNave = [];

export const SharpHRNavs = [];
