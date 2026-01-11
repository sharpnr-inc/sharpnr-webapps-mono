import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/hotel/kitchen/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hospitality/hotel/kitchen/"!</div>
}
