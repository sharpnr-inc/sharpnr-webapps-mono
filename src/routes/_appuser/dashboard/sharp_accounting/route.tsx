import AccountingRootLayout from '@/_accountingapp/components/AccountingRootLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_accounting')({
  component: AccountingRootLayout,
})
