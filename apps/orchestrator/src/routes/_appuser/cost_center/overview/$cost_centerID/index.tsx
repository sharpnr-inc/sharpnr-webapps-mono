import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/cost_center/overview/$cost_centerID/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/cost_center/overview/$cost_centerID/"!</div>
}
