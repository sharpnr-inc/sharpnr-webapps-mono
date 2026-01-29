import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/grievances')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/employee/grievances"!</div>
}
