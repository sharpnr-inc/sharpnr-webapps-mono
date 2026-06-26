import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/authorization/users/$userID/$roleID/user_role_details',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_appuser/authorization/users/$userID/$roleID/user_role_details"!
    </div>
  )
}
