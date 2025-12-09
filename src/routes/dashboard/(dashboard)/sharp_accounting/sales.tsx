import AccountingSalesPage from '@/components/RoutesPages/SharpAccounting/SalesPage'
import { createFileRoute } from '@tanstack/react-router'
import { Receipt } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_accounting/sales',
)({
  component: AccountingSalesPage,
  context: () => ({
    heading: "Sales",
    subheading: "Manage invoices, customers, and revenue",
    HeaderIcon: Receipt,
  }),
})
