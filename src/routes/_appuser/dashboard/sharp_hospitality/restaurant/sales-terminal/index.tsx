import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/restaurant/sales-terminal/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/dashboard/sharp_hospitality/restaurant/sales-terminal/"!</div>
  )
}
