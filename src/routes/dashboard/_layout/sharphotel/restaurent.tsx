import SharpnrHotelRestaurantSection from '@/ui_modules/Hotel/SharpnrHotelRestaurantSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharphotel/restaurent',)({
  component: SharpnrHotelRestaurantSection,
})


