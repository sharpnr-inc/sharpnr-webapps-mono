import SharpHotelsBookingsSection from '@/ui_modules/Hotel/SharpHotelsBookingsSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharphotel/bookings')({
  component: SharpHotelsBookingsSection,
})

