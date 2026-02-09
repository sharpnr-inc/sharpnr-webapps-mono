import RestaurantGenSettingsPage from '@/_hospitalityapp/Restaurant/pages/RestaurantGenSettingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/general-settings/',
)({
  component: RestaurantGenSettingsPage,
  staticData:{
    breadcrumb:"General Setting"
  }
})
