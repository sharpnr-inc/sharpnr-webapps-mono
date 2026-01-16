import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout',
)({
  component: Outlet,
})
