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
// 1. IMPORT LINK
import { Link } from "@tanstack/react-router"; 

interface SidebarMainProps {
  onToggleSidebar?: () => void;
}

export default function SidebarMain({}: SidebarMainProps) {
  const [active, setActive] = useState("dashboard");
  console.log(active)
  const [openGroups, setOpenGroups] = useState<string[]>(["sharphotel"]); // Keep Management open by default for demo

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  // === Sidebar structure with TanStack Router 'to' paths ===
  // Paths are derived from your file structure: /dashboard/_layout/employee/index.tsx -> /dashboard/employee
  const sidebarSections = [
   
    {
      id: "sharphotel",
      title: "Sharp Hotel",
      items: [
        // --- ROUTES MAPPING TO YOUR DEFINED FILES ---
        
        // Maps to /dashboard/_layout/employee/index.tsx
        { id: "employees", label: "Employees", icon: <UserCog size={18} />, to: "/dashboard/employee/" },
        
        // Maps to /dashboard/_layout/employee/employee-attendance.tsx
        { id: "attendance", label: "Attendance", icon: <ClipboardList size={18} />, to: "/dashboard/employee/employee-attendance" },
        
        // Maps to /dashboard/_layout/sharphotel/bookings.tsx
        { id: "bookings", label: "Bookings", icon: <CalendarDays size={18} />, to: "/dashboard/sharphotel/bookings" },

        // Maps to /dashboard/_layout/sharphr/employee.tsx
        { id: "hr_employees", label: "HR Employee", icon: <Database size={18} />, to: "/dashboard/sharphr/employee" },
        
        // Maps to /dashboard/_layout/sharpmarketing/index.tsx
        { id: "marketing", label: "Marketing", icon: <BarChart3 size={18} />, to: "/dashboard/sharpmarketing" },

        // Add more items here...
      ],
    },
    {
      id: "sharpaccounting",
      title: "Sharp Accounting",
      items: [
        { id: "messages", label: "Messages", icon: <MessageSquare size={18} />, to: "/dashboard/messages" },
        { id: "notifications", label: "Notifications", icon: <Bell size={18} />, to: "/dashboard/notifications" },
        { id: "calendar", label: "Calendar", icon: <CalendarDays size={18} />, to: "/dashboard/calendar" },
        // { id: "tasks", label: "Tasks", icon: <ClipboardList size={18} /> }, // Removed to avoid ID conflict with Attendance
      ],
    },
    {
      id: "sharpmarketing",
      title: "Sharp Marketing",
      items: [
        { id: "settings", label: "Settings", icon: <Settings size={18} />, to: "/dashboard/settings" },
        { id: "security", label: "Security", icon: <Shield size={18} />, to: "/dashboard/security" },
        { id: "maintenance", label: "Maintenance", icon: <Wrench size={18} />, to: "/dashboard/maintenance" },
      ],
    },
      {
      id: "sharphr",
      title: "Sharp HR",
      items: [
        { id: "settings", label: "Settings", icon: <Settings size={18} />, to: "/dashboard/settings" },
        { id: "security", label: "Security", icon: <Shield size={18} />, to: "/dashboard/security" },
        { id: "maintenance", label: "Maintenance", icon: <Wrench size={18} />, to: "/dashboard/maintenance" },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        // ... Tailwind classes for sidebar
        "fixed left-0 top-[4rem] w-64 h-[calc(100vh-4rem)]",
        "border-r shadow-sm bg-[#021826] text-amber-100 flex flex-col",
        "overflow-y-auto z-40",
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
      )}
    >
      {/* Menu Groups */}
      <nav className="flex-1 p-2 space-y-1">
        {sidebarSections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            <button
              onClick={() => toggleGroup(section.id)}
              className="flex w-full justify-between items-center px-4 py-2 font-semibold text-gray-100 hover:text-gray-950 text-sm hover:bg-gray-100 rounded-md transition"
            >
              <span>{section.title}</span>
              {openGroups.includes(section.id) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {/* Dropdown items */}
            {openGroups.includes(section.id) && (
              <div className="ml-2 mt-1 space-y-1 border-l border-blue-700 pl-3">
                {section.items.map((item) => (
                  // 2. REPLACE BUTTON WITH LINK COMPONENT
                  <Link 
                    key={item.id}
                    to={item.to} // Use the 'to' prop for navigation
                    // Use 'activeProps' for styling when the link is active
                    activeProps={{ className: "bg-teal-400 text-emerald-900" }}
                    // Use 'inactiveProps' for default styling
                    inactiveProps={{ className: "text-gray-100 hover:bg-gray-100 hover:text-gray-900" }}
                    onClick={() => setActive(item.id)} // Keep state for internal logic if needed
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                      // Remove the conditional className here, let activeProps handle it
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t p-4">
        {/* Replace with Link if 'logout' is a navigation route, or keep as button if it's an action */}
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium w-full px-2 py-2 rounded-md transition-all hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}