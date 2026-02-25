import HotelCheckoutPage from '@/_hospitalityapp/Hotel/pages/checkouts/HotelCheckoutPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/hotel/checkout/',
)({
  component: HotelCheckoutPage,
  staticData:{
    breadcrumb:"Checkout"
  }
})
