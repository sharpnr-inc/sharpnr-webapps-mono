import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hr/employees/$employeeId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/dashboard/(dashboard)/sharp_hr/employees/$employeeId"!</div>
  )
}
