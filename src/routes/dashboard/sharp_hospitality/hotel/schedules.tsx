import HotelRoomMgmSection from '@/_hospitalityapp/Hotel/sections/HotelRoomMgmSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/hotel/schedules',
)({
  component: HotelRoomMgmSection,
})

