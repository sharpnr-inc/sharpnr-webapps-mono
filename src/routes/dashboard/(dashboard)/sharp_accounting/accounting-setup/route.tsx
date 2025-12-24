import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SidebarLink } from '@/components/custom/Sidebar-link'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_accounting/accounting-setup'
)({
  beforeLoad: ({ location }) => {
    // Only redirect if user is exactly on the parent route
    if (location.pathname.endsWith('/accounting-setup')) {
      throw redirect({
        to: '/dashboard/sharp_accounting/accounting-setup/books',
        replace: true,
      })
    }
  },

  component: AccountingSetupLayout,
})

function AccountingSetupLayout() {
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
  )
}
