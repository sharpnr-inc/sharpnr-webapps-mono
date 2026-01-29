import InventoryPage from '@/_hospitalityapp/shared/Inventory/InventoryPage'
import { createFileRoute } from '@tanstack/react-router'
import { InboxIcon } from 'lucide-react'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hospitality/inventory/')(
  {
    component: InventoryPage,
    context: () => ({
      heading: "Inventory",
      subheading: "Manage Collective Org inventory operations",
      HeaderIcon: InboxIcon,
    }),
  },
)
