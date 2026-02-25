
import RoomBookingMainPage from '@/_hospitalityapp/Hotel/pages/booking/RoomBookingMainPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/hotel/booking/',
)({
  component: RoomBookingMainPage,
  staticData:{
    breadcrumb:"Bookings"
  }
})
