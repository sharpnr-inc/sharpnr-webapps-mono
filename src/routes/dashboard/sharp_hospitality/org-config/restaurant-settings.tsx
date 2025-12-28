import RestaurantConfigSection from '@/_hospitalityapp/Restaurant/sections/RestaurantConfigSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/org-config/restaurant-settings',
)({
  component: RestaurantConfigSection,
})
