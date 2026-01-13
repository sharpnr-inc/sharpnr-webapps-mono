import RestaurantConfigSection from '@/_hospitalityapp/Restaurant/sections/RestaurantConfigSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/orchestrator/hospitality/restaurant-configs/',
)({
  component: RestaurantConfigSection,
})
