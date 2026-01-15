import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/(orchestrator_configs)/configurations',
)({
  component: Outlet,
})
