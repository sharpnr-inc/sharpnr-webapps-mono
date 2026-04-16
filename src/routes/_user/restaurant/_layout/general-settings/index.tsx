import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_user/restaurant/_layout/general-settings/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/restaurant/_layout/general-settings/"!</div>
}
