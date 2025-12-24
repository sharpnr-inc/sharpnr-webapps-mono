import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_accounting/accounting-setup/chart-of-account',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/dashboard/(dashboard)/sharp_accounting/accounting-setup/chart-of-account"!
    </div>
  )
}
