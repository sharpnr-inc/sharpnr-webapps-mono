import AccountingLedgerPage from '@/components/RoutesPages/SharpAccounting/LedgerPages'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_accounting/ledger',
)({
  component: AccountingLedgerPage,
  context: () => ({
    heading: "Ledger",
    subheading: "View accounts and manage your chart of accounts",
    HeaderIcon: BookOpen,
  }),
})
