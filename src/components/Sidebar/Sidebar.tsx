import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Database,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  UserCog,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface SidebarMainProps {
  onToggleSidebar?: () => void;
}

// === Define all sidebar sections based on routeTree.gen.ts paths ===
const ALL_SIDEBAR_SECTIONS = [

    {
      id: "employee",
      title: "Employee Sections",
      items: [
        {
          id: "attendance",
          label: "Attendance",
          icon: <UserCog size={18} />,
          // Path: /dashboard/employee/employee-attendance
          to: "/dashboard/employee/employee-attendance", 
        },
        {
          id: "leaves",
          label: "Leaves",
          icon: <ClipboardList size={18} />,
          // Path: /dashboard/employee/leaves
          to: "/dashboard/employee/leaves", 
        },
        {
          id: "reviews",
          label: "Reviews",
          icon: <Database size={18} />,
          // Path: /dashboard/employee/reviews
          to: "/dashboard/employee/reviews", 
        },
        {
          id: "greivences",
          label: "Greivences",
          icon: <BarChart3 size={18} />,
          // Path: /dashboard/employee/greivences
          to: "/dashboard/employee/greivences", 
        },
        // Remaining items link to the Employee Index, as they lack specific routes
        {
          id: "requests",
          label: "Requests",
          icon: <CalendarDays size={18} />,
          to: "/dashboard/employee/requests", 
        },
        {
          id: "overtime",
          label: "Overtime",
          icon: <BarChart3 size={18} />,
          to: "/dashboard/employee/overtime", 
        },
        {
          id: "feedback",
          label: "Feedback",
          icon: <BarChart3 size={18} />,
          to: "/dashboard/employee/feedback", 
        },
      ],
    },

    {
      id: "sharphotel",
      title: "Sharp Hospitality",
      items: [
        { id: "hotel_settings", label: "Settings", icon: <Settings size={18} />, to: "/dashboard/sharphotel/settings" },
        { id: "hotel_bar", label: "Bar", icon: <ClipboardList size={18} />, to: "/dashboard/sharphotel/bar" },
        { id: "hotel_bookings", label: "Bookings", icon: <CalendarDays size={18} />, to: "/dashboard/sharphotel/bookings" },
        { id: "hotel_guests", label: "Guests", icon: <Database size={18} />, to: "/dashboard/sharphotel/guests" },
        { id: "hotel_restaurant", label: "Restaurant", icon: <BarChart3 size={18} />, to: "/dashboard/sharphotel/restaurent" },
        { id: "hotel_menu", label: "Menu", icon: <BarChart3 size={18} />, to: "/dashboard/sharphotel/menu" },
        { id: "hotel_kitchen", label: "Inventory", icon: <BarChart3 size={18} />, to: "/dashboard/sharphotel/inventory" },
        { id: "hotel_housekeeping", label: "House Keeping", icon: <BarChart3 size={18} />, to: "/dashboard/sharphotel/inventory" },
      ],
    },
    {
      id: "sharpaccounting",
      title: "Sharp Accounting",
      items: [
        { id: "acc_transactions", label: "Transactions", icon: <MessageSquare size={18} />, to: "/dashboard/sharpAccounting/transactions" },
        { id: "acc_expense", label: "Expenses", icon: <Bell size={18} />, to: "/dashboard/sharpAccounting/expenses" },
        { id: "acc_invoices", label: "Invoices", icon: <Database size={18} />, to: "/dashboard/sharpAccounting/invoices" },
        { id: "acc_ledger", label: "Ledger", icon: <Wrench size={18} />, to: "/dashboard/sharpAccounting/ledger" },
        { id: "acc_customers", label: "Customers", icon: <Shield size={18} />, to: "/dashboard/sharpAccounting/customers" },
        { id: "acc_suppliers", label: "Suppliers & Vendors", icon: <CalendarDays size={18} />, to: "/dashboard/sharpAccounting/suppliersandvendors" },
        { id: "acc_reports", label: "Reports", icon: <BarChart3 size={18} />, to: "/dashboard/sharpAccounting/Reports" },
      ],
    },
    {
      id: "sharpmarketing",
      title: "Sharp Marketing",
      items: [
        { id: "mkt_campaigns", label: "Campaigns", icon: <Settings size={18} />, to: "/dashboard/sharpmarketing/campaigns" },
        { id: "mkt_leads", label: "Leads", icon: <Shield size={18} />, to: "/dashboard/sharpmarketing/leads" },
        { id: "mkt_reports", label: "Reports", icon: <Wrench size={18} />, to: "/dashboard/sharpmarketing/reports" },
        { id: "mkt_social", label: "Social Media Mgmt", icon: <MessageSquare size={18} />, to: "/dashboard/sharpmarketing/social-media-management" },
      ],
    },
    {
      id: "sharphr",
      title: "Sharp HR",
      items: [
        { id: "hr_employee", label: "Employee", icon: <Settings size={18} />, to: "/dashboard/sharphr/employee" },
        { id: "hr_payroll", label: "Payroll", icon: <Shield size={18} />, to: "/dashboard/sharphr/payroll" },
        { id: "hr_leaves", label: "Leaves Mgmt", icon: <Wrench size={18} />, to: "/dashboard/sharphr/leaves-management" },
        { id: "hr_reports", label: "Reports", icon: <BarChart3 size={18} />, to: "/dashboard/sharphr/reports" },
      ],
    },
  ];

const EMPLOYEE_SECTION = ALL_SIDEBAR_SECTIONS.find(s => s.id === 'employee');
const COLLAPSIBLE_SECTIONS = ALL_SIDEBAR_SECTIONS.filter(s => s.id !== 'employee');


export default function SidebarMain({}: SidebarMainProps) {
  const [active, setActive] = useState("dashboard"); // Kept for internal logic if needed
  console.log(active)
  const [openGroups, setOpenGroups] = useState<string[]>(["sharphotel"]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
<div></div>
  );
}
