import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/compliance_policies/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/compliance_policies/"!</div>
}
