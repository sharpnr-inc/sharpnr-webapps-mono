import { HotelSideBarWrapper } from '@/_hospitalityapp/Hotel/pages/SideBarWarpper'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_hospitality/hotel')({
  component: HotelSideBarWrapper,
})
