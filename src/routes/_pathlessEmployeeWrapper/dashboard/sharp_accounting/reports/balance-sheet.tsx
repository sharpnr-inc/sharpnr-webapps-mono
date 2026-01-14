import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/dashboard/sharp_accounting/reports/balance-sheet',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/dashboard/(dashboard)/sharp_accounting/reports/balance-sheet"!
    </div>
  )
}
