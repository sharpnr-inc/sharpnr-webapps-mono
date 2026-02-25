import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_accounting/chart-of-account/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/_appuser/dashboard/sharp_accounting/chart-of-account/"!</div>
  )
}
