import AccountingLedgerPage from '@/components/UiModuels/SharpAccounting/LedgerPages'
import { createFileRoute } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/_layout/sharp_accounting/ledger',
)({
  component: AccountingLedgerPage,
  context: () => ({
    heading: "Ledger",
    subheading: "View accounts and manage your chart of accounts",
    HeaderIcon: BookOpen,
  }),
})
