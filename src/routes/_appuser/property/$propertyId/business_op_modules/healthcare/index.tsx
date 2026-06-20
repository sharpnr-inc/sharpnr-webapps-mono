import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/property/$propertyId/business_op_modules/healthcare/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_appuser/property/$propertyId/business_op_modules/healthcare/"!
    </div>
  )
}
