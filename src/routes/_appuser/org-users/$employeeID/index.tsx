import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/org-users/$employeeID/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/org-users/$employeeID/"!</div>
}
