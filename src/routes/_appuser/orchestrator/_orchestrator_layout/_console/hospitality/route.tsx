import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/hospitality',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/_console/hospitality"!
    </div>
  )
}
