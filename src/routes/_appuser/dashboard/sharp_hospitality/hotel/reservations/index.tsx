import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/hotel/reservations/',
)({
  component: RouteComponent,
  staticData:{
    breadcrumb:"Reservations"
  }
})

function RouteComponent() {
  return (
    <div>
      Hello "/_appuser/dashboard/sharp_hospitality/hotel/reservations/"!
    </div>
  )
}
