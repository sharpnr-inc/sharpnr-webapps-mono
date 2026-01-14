import HotelConfigSection from '@/_hospitalityapp/Hotel/sections/HotelConfigSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orchestrator/hospitality/hotel-configs/')({
  component: HotelConfigSection,
})
