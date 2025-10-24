import ServicePage from '@/components/UiModuels/sharpHospitality/ServicePage'
import { createFileRoute } from '@tanstack/react-router'
import { ServerCogIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/_layout/sharp_hospitality/services')({
  component: ServicePage,
  context:()=>({
    heading: "Service",
    subheading: "Section for Service",
    HeaderIcon:ServerCogIcon
  })
})
