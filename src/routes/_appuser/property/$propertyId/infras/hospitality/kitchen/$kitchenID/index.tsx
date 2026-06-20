import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/property/$propertyId/infras/hospitality/kitchen/$kitchenID/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_appuser/property/$propertyId/infras/hospitality/kitchen/$kitchenID/"!
    </div>
  )
}
