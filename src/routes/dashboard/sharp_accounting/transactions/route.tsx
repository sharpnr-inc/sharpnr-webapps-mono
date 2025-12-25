import AccountingTransactionPage from '@/_accountingapp/pages/Transactions/TransactionPage'
import { createFileRoute } from '@tanstack/react-router'
import { Banknote } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/sharp_accounting/transactions',
)({
  component: AccountingTransactionPage,
    context: () => ({
      heading: "Transactions",
      subheading: "View and manage financial movements",
      HeaderIcon: Banknote,
    }),
})


