import RestaurantTableManagementPage from '@/_hospitalityapp/Restaurant/pages/RestaurantTableManagementPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/table-management/',
)({
  component: RestaurantTableManagementPage,
})
