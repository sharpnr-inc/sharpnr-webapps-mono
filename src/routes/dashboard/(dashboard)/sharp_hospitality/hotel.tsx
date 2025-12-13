import { createFileRoute } from '@tanstack/react-router'
import SharpHospitalityHotelPage from '@/_hospitalityapp/pages/hotel/HotelPage'
import {Hotel} from "lucide-react"

export const Route = createFileRoute('/dashboard/(dashboard)/sharp_hospitality/hotel')({
  component: SharpHospitalityHotelPage,
    context: () => ({
    heading: "Dearie Hotel",
    subheading: "Manage Hotel operations",
    HeaderIcon:Hotel
  }),
})


