import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/authorization/policies/$policyID/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/authorization/policies/$policyID/"!</div>
}
