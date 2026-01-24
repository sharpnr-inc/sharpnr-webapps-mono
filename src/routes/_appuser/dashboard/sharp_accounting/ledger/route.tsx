import AccountingLedgerPage from '@/_accountingapp/pages/Ledger/LedgerPages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_accounting/ledger')({
  component: AccountingLedgerPage,
})
