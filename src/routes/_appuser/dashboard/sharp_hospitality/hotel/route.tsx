import { HotelRootLayout } from '@/_hospitalityapp/Hotel/components/HotelRootLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hospitality/hotel')({
  component: HotelRootLayout,
  staticData:{
    breadcrumb:"Hotel"
  }
})
