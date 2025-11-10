import UpcomingFeature from '@/components/RoutesPages/UpcomingFeature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharp_hr/payroll')({
  component: UpcomingFeature,
})
