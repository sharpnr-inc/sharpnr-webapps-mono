import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_accounting/accounting-setup',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/dashboard/(dashboard)/sharp_accounting/accounting-setup"!</div>
  )
}
