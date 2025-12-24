import { SidebarLink } from "@/components/custom/Sidebar-link";
import { Outlet } from "@tanstack/react-router";

export function AccountingSetupLayout() {
  return (
    <div className="flex gap-6">
      <aside className="w-64 border-r pr-4">
        <h2 className="mb-4 text-lg font-semibold">Accounting Setup</h2>

        <nav className="space-y-1">
          <SidebarLink to="/dashboard/sharp_accounting/accounting-setup/books">
            Accounting Books
          </SidebarLink>

          <SidebarLink to="/dashboard/sharp_accounting/accounting-setup/chart-of-account">
            Chart of Accounts
          </SidebarLink>

          <SidebarLink to="/dashboard/sharp_accounting/accounting-setup/account-mappings">
            Account Mappings
          </SidebarLink>
        </nav>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
