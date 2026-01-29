import HotelRoomRequestPage from '@/_hospitalityapp/Hotel/pages/room_requests/HotelRoomRequestPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/hotel/room-request/',
)({
  component: HotelRoomRequestPage,
})