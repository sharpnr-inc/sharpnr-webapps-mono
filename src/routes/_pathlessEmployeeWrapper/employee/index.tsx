import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessEmployeeWrapper/employee/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/employee/"!</div>
}
