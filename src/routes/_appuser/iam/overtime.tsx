import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/overtime')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/employee/overtime"!</div>
}
