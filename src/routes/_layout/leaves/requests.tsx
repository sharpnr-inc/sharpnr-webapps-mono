import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/leaves/requests')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/leaves/requests"!</div>
}
