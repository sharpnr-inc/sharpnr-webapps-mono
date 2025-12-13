import AccountingReportsPage from '@/_accountingapp/pages/Reports/ReportsPages'
import { createFileRoute } from '@tanstack/react-router'
import { BarChart3 } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_accounting/reports',
)({
  component: AccountingReportsPage,
  context: () => ({
    heading: "Reports",
    subheading: "Analyze financial performance and insights",
    HeaderIcon: BarChart3,
  }),
})

