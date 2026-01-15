import { HotelSideBarWrapper } from '@/_hospitalityapp/Hotel/components/SideBarWarpper'
import { createFileRoute } from '@tanstack/react-router'
import { Hotel } from 'lucide-react'

export const Route = createFileRoute('/_pathlessEmployeeWrapper/dashboard/sharp_hospitality/hotel')({
  component: HotelSideBarWrapper,
   context: () => ({
      heading: "Hotel Terminal",
      subheading: "Manage Collective Hotel operations",
      HeaderIcon: Hotel,
    }),
})
