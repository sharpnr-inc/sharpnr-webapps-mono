import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_hr/payroll/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/payroll/"!</div>
}
