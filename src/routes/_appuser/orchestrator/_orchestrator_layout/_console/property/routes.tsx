import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/property/routes',
)({
  component: Outlet,
  staticData:{
    breadcrumb:"Property"
  }
})


