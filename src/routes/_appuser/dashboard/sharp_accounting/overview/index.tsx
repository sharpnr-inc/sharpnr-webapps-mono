import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_accounting/overview/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/dashboard/sharp_accounting/overview/"!</div>
}
