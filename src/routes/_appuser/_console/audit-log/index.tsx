import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/_console/audit-log/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_appuser/orchestrator/_orchestrator_layout/_console/audit-log/"!
    </div>
  )
}
