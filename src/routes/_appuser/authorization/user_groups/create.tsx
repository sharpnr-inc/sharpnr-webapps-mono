import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/authorization/user_groups/create',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/authorization/user_groups/create"!</div>
}
