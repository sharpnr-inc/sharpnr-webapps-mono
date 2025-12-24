import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_accounting/reports/profit-loss',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/dashboard/(dashboard)/sharp_accounting/reports/profit-loss"!
    </div>
  )
}
