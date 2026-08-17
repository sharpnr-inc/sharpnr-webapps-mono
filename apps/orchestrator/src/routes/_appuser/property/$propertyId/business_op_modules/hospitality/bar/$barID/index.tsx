import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/property/$propertyId/business_op_modules/hospitality/bar/$barID/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_appuser/property/$propertyId/business_op_modules/hospitality/bar/$barID/"!
    </div>
  )
}
