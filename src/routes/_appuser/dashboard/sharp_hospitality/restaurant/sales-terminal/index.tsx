import RestaurantSaleTerminalPage from '@/_hospitalityapp/Restaurant/pages/RestaurantSaleTerminalPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/sales-terminal/',
)({
  component: RestaurantSaleTerminalPage,
})

