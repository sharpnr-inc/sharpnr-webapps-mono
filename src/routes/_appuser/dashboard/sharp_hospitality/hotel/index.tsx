import HotelOverviewMainPage from '@/_hospitalityapp/Hotel/pages/overview/HotelOverviewPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hospitality/hotel/')({
  component: HotelOverviewMainPage,
})
