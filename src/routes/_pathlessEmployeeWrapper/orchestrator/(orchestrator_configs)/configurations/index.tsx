import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/(orchestrator_configs)/configurations/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_pathlessEmployeeWrapper/orchestrator/(orchestrator_configs)/configurations/"!
    </div>
  )
}
