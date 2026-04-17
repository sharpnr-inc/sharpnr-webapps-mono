import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/payroll/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/payroll/"!</div>
}
