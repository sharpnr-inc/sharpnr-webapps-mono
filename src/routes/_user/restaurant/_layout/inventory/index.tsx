import RestaurantInventoryPage from '@/_hospitalityapp/Restaurant/pages/RestaurantInventoryPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_user/restaurant/_layout/inventory/',
)({
  component: RestaurantInventoryPage,
})