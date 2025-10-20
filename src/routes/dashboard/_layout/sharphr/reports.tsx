import UpcomingFeature from '@/components/UiModuels/UpcomingFeature'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharphr/reports')({
  component: UpcomingFeature,
})

