import { AccountingSetupBooksPage } from '@/_accountingapp/pages/accounting-setup/AccountingBooksPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_accounting/accounting-setup/books',
)({
  component: AccountingSetupBooksPage,
})
