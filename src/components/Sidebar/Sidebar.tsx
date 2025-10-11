import {
  Home,
  Users,
  FolderKanban,
  Settings,
  LogOut,
  BarChart3,
  ChevronDown,
  ChevronRight,
  FileText,
  Briefcase,
  MessageSquare,
  Bell,
  CalendarDays,
  ClipboardList,
  UserCog,
  Database,
  Shield,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarMainProps {
  onToggleSidebar?: () => void;
}

export default function SidebarMain({}: SidebarMainProps) {
  const [active, setActive] = useState("dashboard");
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  // === Sidebar structure ===
  const sidebarSections = [
    {
      id: "main",
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
        { id: "projects", label: "Projects", icon: <FolderKanban size={18} /> },
        { id: "users", label: "Users", icon: <Users size={18} /> },
      ],
    },
    {
      id: "management",
      title: "Management",
      items: [
        { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
        { id: "analytics", label: "Analytics", icon: <FileText size={18} /> },
        { id: "clients", label: "Clients", icon: <Briefcase size={18} /> },
        { id: "employees", label: "Employees", icon: <UserCog size={18} /> },
        { id: "database", label: "Database", icon: <Database size={18} /> },
      ],
    },
    {
      id: "communication",
      title: "Communication",
      items: [
        { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
        { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
        { id: "calendar", label: "Calendar", icon: <CalendarDays size={18} /> },
        { id: "tasks", label: "Tasks", icon: <ClipboardList size={18} /> },
      ],
    },
    {
      id: "admin",
      title: "Admin",
      items: [
        { id: "settings", label: "Settings", icon: <Settings size={18} /> },
        { id: "security", label: "Security", icon: <Shield size={18} /> },
        { id: "maintenance", label: "Maintenance", icon: <Wrench size={18} /> },
        // Add more if needed up to 40 total buttons
      ],
    },
  ];

  return (
    <aside
      className={cn(
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
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                      active === item.id
                        ? "bg-teal-400 text-emerald-900"
                        : "text-gray-100 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t p-4">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium w-full px-2 py-2 rounded-md transition-all hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
