import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sharp-org-employee/set-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sharp-org-employee/set-password/"!</div>
}
