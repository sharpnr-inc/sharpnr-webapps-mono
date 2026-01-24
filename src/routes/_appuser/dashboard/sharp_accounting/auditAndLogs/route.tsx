import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_accounting/auditAndLogs',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/dashboard/(dashboard)/sharp_accounting/_layout/auditAndLogs"!
    </div>
  )
}
