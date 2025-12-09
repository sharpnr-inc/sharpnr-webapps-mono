import UpcomingFeature from '@/components/RoutesPages/UpcomingFeature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(dashboard)/sharp_hr/reports')({
  component: UpcomingFeature,
})

