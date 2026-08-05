import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/workspace/$propertyID/infra',
)({
  component: Outlet,
})
