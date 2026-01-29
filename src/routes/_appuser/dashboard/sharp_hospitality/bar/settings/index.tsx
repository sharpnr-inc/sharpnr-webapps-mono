import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/bar/settings/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/dashboard/sharp_hospitality/bar/settings/"!</div>
}
