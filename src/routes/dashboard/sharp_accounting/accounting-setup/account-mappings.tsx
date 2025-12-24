import { AccountMappingPage } from '@/_accountingapp/pages/accounting-setup/AccountMappingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_accounting/accounting-setup/account-mappings',
)({
  component: AccountMappingPage,
})
