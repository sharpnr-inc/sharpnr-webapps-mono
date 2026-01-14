import { AccountingOverviewPage } from '@/_accountingapp/pages/overview/AccountingOverviewPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/dashboard/sharp_accounting/',
)({
  component: AccountingOverviewPage,
})
