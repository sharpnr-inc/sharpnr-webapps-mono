import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/reports/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/reports/"!</div>
}
