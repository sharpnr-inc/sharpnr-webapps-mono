import { useState } from "react"
import { cn } from "@/lib/utils"
import { AccountingSetupLayout } from "./AccountingSetupLayout"
import { PanelLeft, PanelLeftClose } from "lucide-react"
import { Outlet } from "@tanstack/react-router"

export function AccountingSetupSideBarWrapper() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Floating Sidebar */}
      <aside
        className={cn(
          "absolute left-2 top-2 bottom-2 z-20",
          "rounded-xl border bg-background shadow-lg",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-14" : "w-64"
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="absolute -right-3 top-6 z-30 rounded-full border bg-background p-1 shadow hover:bg-accent"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>

        {/* Sidebar Content */}
        <AccountingSetupLayout collapsed={collapsed} />
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "h-full transition-all duration-300 ease-in-out",
          collapsed ? "pl-20" : "pl-72"
        )}
      >
        <div className="h-full overflow-auto p-2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
