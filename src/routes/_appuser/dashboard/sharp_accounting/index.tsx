import { AccountingWelcomePage } from '@/_accountingapp/pages/welcome/AccountingWelcomePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_accounting/',
)({
  component: AccountingWelcomePage,
})
