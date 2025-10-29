import UpcomingFeature from '@/components/UiModuels/UpcomingFeature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharp_hr/reports')({
  component: UpcomingFeature,
})

