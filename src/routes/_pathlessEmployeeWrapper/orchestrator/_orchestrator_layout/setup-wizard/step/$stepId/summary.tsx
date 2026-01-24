import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/step/$stepId/summary',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/step/_steps/summary"!
    </div>
  )
}
