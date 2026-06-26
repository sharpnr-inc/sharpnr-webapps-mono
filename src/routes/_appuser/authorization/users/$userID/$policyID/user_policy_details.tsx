import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/authorization/users/$userID/$policyID/user_policy_details',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_appuser/authorization/users/$userID/$policyID/user_policy_details"!
    </div>
  )
}
