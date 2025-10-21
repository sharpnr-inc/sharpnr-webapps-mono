import { createFileRoute } from '@tanstack/react-router'
import SharpHospitalityHotelPage from '@/components/UiModuels/sharpHospitality/HotelPage'
import {Hotel} from "lucide-react"

export const Route = createFileRoute('/dashboard/_layout/sharphotel/hotel')({
  component: SharpHospitalityHotelPage,
    context: () => ({
    heading: "Dearie Hotel",
    subheading: "Manage Hotel operations",
    HeaderIcon:Hotel
  }),
})


