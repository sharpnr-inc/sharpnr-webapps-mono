import {
  Home,
  Users,
  FolderKanban,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils"; // optional helper for class merging (can remove if not using)

export default function SidebarMain() {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderKanban size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-semibold text-blue-600">SharpNR</h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                active === item.id
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 capitalize">
          {active} Page
        </h2>
        <div className="text-gray-700">
          This is the <b>{active}</b> section content.
        </div>
      </main>
    </div>
  );
}
