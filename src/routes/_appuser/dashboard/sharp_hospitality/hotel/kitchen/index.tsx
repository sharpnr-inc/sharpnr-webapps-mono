import KitchenPage from '@/_hospitalityapp/shared/Kitchen/pages/KitchenPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/hotel/kitchen/',
)({
  component: KitchenPage,
})
