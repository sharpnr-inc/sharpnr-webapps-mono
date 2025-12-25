import UpcomingFeature from '@/sharedPages/UpcomingFeature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_hr/payroll')({
  component: UpcomingFeature,
})
