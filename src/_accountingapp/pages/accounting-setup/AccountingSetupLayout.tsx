import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, ListTree, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountingSetupLayout({
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
            Accounting Setup
          </h2>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <Link
          to="/dashboard/sharp_accounting/accounting-setup/books"
          className={navClass(
            pathname === "/dashboard/sharp_accounting/accounting-setup/books",
            collapsed
          )}
        >
          <BookOpen className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Books</span>}
        </Link>

        <Link
          to="/dashboard/sharp_accounting/accounting-setup/chart-of-account"
          className={navClass(
            pathname ===
              "/dashboard/sharp_accounting/accounting-setup/chart-of-account",
            collapsed
          )}
        >
          <ListTree className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Chart of Accounts</span>}
        </Link>

        <Link
          to="/dashboard/sharp_accounting/accounting-setup/account-mappings"
          className={navClass(
            pathname ===
              "/dashboard/sharp_accounting/accounting-setup/account-mappings",
            collapsed
          )}
        >
          <Link2 className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Account Mappings</span>}
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
