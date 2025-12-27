import AccountingLedgerPage from '@/_accountingapp/pages/Ledger/LedgerPages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_accounting/ledger')({
  component: AccountingLedgerPage,
})
