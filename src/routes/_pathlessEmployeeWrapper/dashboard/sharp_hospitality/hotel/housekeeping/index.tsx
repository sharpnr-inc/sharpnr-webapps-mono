import { HotelHouseKeepingPage } from '@/_hospitalityapp/Hotel/pages/houseKeeping/HotelHousekeepingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/dashboard/sharp_hospitality/hotel/housekeeping/',
)({
  component: HotelHouseKeepingPage,
})