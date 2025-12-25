import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/employee/requests')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/employee/requests"!</div>
}
