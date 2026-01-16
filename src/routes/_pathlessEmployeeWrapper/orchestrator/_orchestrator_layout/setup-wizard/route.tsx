import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard',
)({
  component: Outlet,
})

// Here can put the Routes guard if Setup is complete then we can move the user
// then we can reroute the user to other place or dashboard
