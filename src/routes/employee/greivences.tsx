import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employee/greivences')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/employee/greivences"!</div>
}
