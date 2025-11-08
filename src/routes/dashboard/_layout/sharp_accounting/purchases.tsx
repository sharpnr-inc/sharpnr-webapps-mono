import AccountingPurchasesPage from '@/components/UiModuels/SharpAccounting/PurchasesPage'
import { createFileRoute } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/_layout/sharp_accounting/purchases',
)({
  component: AccountingPurchasesPage,
  context: () => ({
    heading: "Purchases",
    subheading: "Track bills, expenses, and vendor payments",
    HeaderIcon: ShoppingCart,
  }),
})
