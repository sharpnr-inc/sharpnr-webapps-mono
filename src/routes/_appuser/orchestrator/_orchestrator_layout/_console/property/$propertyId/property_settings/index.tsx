import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property_settings/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property_settings/"!
    </div>
  )
}
