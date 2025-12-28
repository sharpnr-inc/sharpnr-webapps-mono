import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Link2, ListTree } from "lucide-react";

export function HospitalityOrchestratorLayout({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const { location } = useRouterState();
  const pathname = location.pathname;
  return (
    <div className="h-full flex flex-col p-2">
      {/* Header */}
      {!collapsed && (
        <div className="mb-3 px-2">
          <h2 className="text-sm font-semibold tracking-tight">
            Organization setting
          </h2>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <Link
          to="/dashboard/sharp_hospitality/org-config/overview"
          className={navClass(
            pathname === "/dashboard/sharp_hospitality/org-config/overview",
            collapsed
          )}
        >
          <BookOpen className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Overview</span>}
        </Link>

        <Link
          to="/dashboard/sharp_hospitality/org-config/orchestrator"
          className={navClass(
            pathname ===
              "/dashboard/sharp_hospitality/org-config/orchestrator",
            collapsed
          )}
        >
          <ListTree className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Parent Organization</span>}
        </Link>

        <Link
          to="/dashboard/sharp_hospitality/org-config/restaurant-settings"
          className={navClass(
            pathname ===
              "/dashboard/sharp_hospitality/org-config/restaurant-settings",
            collapsed
          )}
        >
          <Link2 className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Restaurant config</span>}
        </Link>

        <Link
          to="/dashboard/sharp_hospitality/org-config/bar-settings"
          className={navClass(
            pathname ===
              "/dashboard/sharp_hospitality/org-config/bar-settings",
            collapsed
          )}
        >
          <Link2 className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Bar config</span>}
        </Link>


        <Link
          to="/dashboard/sharp_hospitality/org-config/hotel-settings"
          className={navClass(
            pathname ===
              "/dashboard/sharp_hospitality/org-config/hotel-settings",
            collapsed
          )}
        >
          <Link2 className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Hotel config</span>}
        </Link>
      </nav>
    </div>
  );
}

/* Helper */
function navClass(active: boolean, collapsed: boolean) {
  return cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
    "hover:bg-accent",
    active && "bg-accent font-medium",
    collapsed && "justify-center px-0"
  );
}
