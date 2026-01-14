import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessEmployeeWrapper/dashboard/sharp_hospitality/bar/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hospitality/bar/"! Overview Page</div>
}
