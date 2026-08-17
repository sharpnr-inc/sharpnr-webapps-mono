import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/employees/privileges/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/employees/privileges/"!</div>
}
