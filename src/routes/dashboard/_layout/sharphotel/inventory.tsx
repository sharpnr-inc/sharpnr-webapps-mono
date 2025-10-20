import InventoryPage from '@/components/UiModuels/sharpHospitality/InventoryPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharphotel/inventory')(
  {
    component: InventoryPage
  },
)


