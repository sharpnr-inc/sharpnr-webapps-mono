import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Link2, ListTree } from "lucide-react";

export function HotelPageMainPageLayout({
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
            Hotel Management
          </h2>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <Link
          to="/dashboard/sharp_hospitality/hotel/overview"
          className={navClass(
            pathname === "/dashboard/sharp_hospitality/hotel/overview",
            collapsed
          )}
        >
          <BookOpen className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Overview</span>}
        </Link>

        <Link
          to="/dashboard/sharp_hospitality/hotel/reservations"
          className={navClass(
            pathname === "/dashboard/sharp_hospitality/hotel/reservations",
            collapsed
          )}
        >
          <ListTree className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Reservation</span>}
        </Link>

        <Link
          to="/dashboard/sharp_hospitality/hotel/houseKeeping"
          className={navClass(
            pathname ===
              "/dashboard/sharp_hospitality/hotel/houseKeeping",
            collapsed
          )}
        >
          <Link2 className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Room Management</span>}
        </Link>
        <Link
          to="/dashboard/sharp_hospitality/hotel/schedules"
          className={navClass(
            pathname ===
              "/dashboard/sharp_hospitality/hotel/schedules",
            collapsed
          )}
        >
          <Link2 className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Calender</span>}
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
