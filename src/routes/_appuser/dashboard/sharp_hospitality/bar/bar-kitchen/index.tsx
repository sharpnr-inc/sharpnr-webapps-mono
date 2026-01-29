import BarKitchenPage from '@/_hospitalityapp/Bar/pages/BarKitchenPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/bar/bar-kitchen/',
)({
  component: BarKitchenPage,
})

