import RestaurantTableManagementSection from '@/_hospitalityapp/Restaurant/sections/RestaurantTableManagementSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/table/',
)({
  component: RestaurantTableManagementSection,
})

