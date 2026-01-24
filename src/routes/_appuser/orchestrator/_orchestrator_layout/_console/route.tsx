import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console',
)({
  component: Outlet,
})


// TODO Add the dashboard header and sidebar here this is the console before user load the console we check and redirect them to the setup wizard
