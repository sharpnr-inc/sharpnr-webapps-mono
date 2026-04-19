import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/_console/property/$propertyId/domain_hospitality/restaurant_dashboard',
)({
  component: Outlet,
})
