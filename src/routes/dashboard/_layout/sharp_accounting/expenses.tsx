import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/_layout/sharp_accounting/expenses',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/sharpAccounting/expenses"!</div>
}
