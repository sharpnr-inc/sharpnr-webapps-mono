import HotelSettingPage from '@/_hospitalityapp/Hotel/pages/settings/HotelSettingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/hotel/hotel-settings/',
)({
  component: HotelSettingPage,
})

