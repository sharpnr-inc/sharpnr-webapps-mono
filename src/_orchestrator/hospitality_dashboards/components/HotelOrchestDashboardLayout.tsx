import { useState } from "react";
import { Outlet, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Settings,
  UtensilsCrossed,
  Beer,
  Building2,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const HotelOrchestDashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/" },
    { label: "Property", icon: Building2, to: "/property" },
    { label: "Kitchen", icon: UtensilsCrossed, to: "/kitchen" },
    { label: "Bar", icon: Beer, to: "/bar" },
    { label: "Settings", icon: Settings, to: "/settings" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col border-r"
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b shrink-0">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-sm font-bold tracking-wide">ORCHESTRATOR</h1>
                <p className="text-[10px] opacity-50 mt-0.5">Hotel Management</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setCollapsed((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-md border transition-all hover:bg-accent",
              collapsed && "mx-auto"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {collapsed ? (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="x"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {menuItems.map(({ label, icon: Icon, to }, index) => (
            <Link
              key={label}
              to={to}
              activeProps={{ 
                className: "bg-accent font-semibold" 
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all hover:bg-accent group",
                collapsed && "justify-center px-0"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Icon size={18} className="shrink-0 transition-transform group-hover:scale-110" />
              </motion.div>
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm tracking-wide"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="h-12 flex items-center justify-center border-t shrink-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-widest"
          >
            {collapsed ? "v1" : "VERSION 1.0.0"}
          </motion.div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
};

export default HotelOrchestDashboardLayout;