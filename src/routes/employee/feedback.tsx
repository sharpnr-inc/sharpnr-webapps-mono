import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employee/feedback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/employee/feedback"!</div>
}
