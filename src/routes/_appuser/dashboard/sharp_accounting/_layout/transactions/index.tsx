import TransactionPage from '@/_accountingapp/pages/Transactions/TransactionPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_accounting/_layout/transactions/',
)({
  component: TransactionPage,
})

