import HotelOverviewSection from '@/_hospitalityapp/orchestrator/pages/HospitalityOrgOverviewSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/org-config/overview',
)({
  component: HotelOverviewSection,
})

