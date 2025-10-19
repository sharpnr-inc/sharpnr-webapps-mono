import { createFileRoute } from '@tanstack/react-router'
import SharpHospitalityHotelPage from '@/components/UiModuels/sharpHospitality/HotelPage'

export const Route = createFileRoute('/dashboard/_layout/sharphotel/hotel')({
  component: SharpHospitalityHotelPage
})


