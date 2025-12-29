import HotelOverviewMainPage from '@/_hospitalityapp/Hotel/pages/overview/HotelOverviewPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/hotel/overview',
)({
  component: HotelOverviewMainPage,
})
