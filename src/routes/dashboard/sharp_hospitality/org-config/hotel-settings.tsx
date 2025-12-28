import HotelConfigSection from '@/_hospitalityapp/Hotel/sections/HotelConfigSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/org-config/hotel-settings',
)({
  component: HotelConfigSection,
})
