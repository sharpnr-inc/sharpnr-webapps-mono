import RestaurantReservationPage from '@/_hospitalityapp/Restaurant/pages/RestaurantReservationPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/reservations/',
)({
  component: RestaurantReservationPage,
})

