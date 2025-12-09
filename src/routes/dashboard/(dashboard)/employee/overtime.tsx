import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(dashboard)/employee/overtime')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/employee/overtime"!</div>
}
