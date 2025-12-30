import HouseKeepingPage from '@/_hospitalityapp/Hotel/hosekeeping/HouseKeepingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/hotel/houseKeeping',
)({
  component: HouseKeepingPage,
})
