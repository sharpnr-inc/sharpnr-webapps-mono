import { HotelGuestPage } from '@/_hospitalityapp/Hotel/pages/guests/HotelGuestPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/dashboard/sharp_hospitality/hotel/guests/',
)({
  component: HotelGuestPage,
})

