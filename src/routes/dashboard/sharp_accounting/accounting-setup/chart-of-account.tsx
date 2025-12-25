import { ChartOfAccountPage } from '@/_accountingapp/pages/accounting-setup/ChartOfAccountPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_accounting/accounting-setup/chart-of-account',
)({
  component: ChartOfAccountPage,
})
