import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/employees/documents/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/employees/documents/"!</div>
}
