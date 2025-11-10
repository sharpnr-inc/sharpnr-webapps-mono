import { createFileRoute } from '@tanstack/react-router'
import SharpHospitalityHotelPage from '@/components/RoutesPages/sharpHospitality/HotelPage'
import {Hotel} from "lucide-react"

export const Route = createFileRoute('/dashboard/_layout/sharp_hospitality/hotel')({
  component: SharpHospitalityHotelPage,
    context: () => ({
    heading: "Dearie Hotel",
    subheading: "Manage Hotel operations",
    HeaderIcon:Hotel
  }),
})


