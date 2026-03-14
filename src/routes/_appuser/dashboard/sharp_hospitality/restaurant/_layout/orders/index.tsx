import RestaurantOrdersPage from '@/_hospitalityapp/Restaurant/pages/RestaurantOrdersPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/_layout/orders/',
)({
  component: RestaurantOrdersPage,
  staticData:{
    breadcrumb:"Orders"
  }
})
