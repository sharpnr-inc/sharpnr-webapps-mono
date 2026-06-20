import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/property/$propertyId/resources/hospitality/house_menu/$menuID/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_appuser/property/$propertyId/resources/hospitality/house_menu/$menuID/"!
    </div>
  )
}
