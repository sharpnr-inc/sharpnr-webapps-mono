import AccountingPurchasesPage from '@/_accountingapp/pages/Purchases/PurchasesPage'
import { createFileRoute } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_accounting/purchases',
)({
  component: AccountingPurchasesPage,
  context: () => ({
    heading: "Purchases",
    subheading: "Track bills, expenses, and vendor payments",
    HeaderIcon: ShoppingCart,
  }),
})
