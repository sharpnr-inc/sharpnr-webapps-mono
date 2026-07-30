import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/emp/provisioning/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/emp/provisioning/"!</div>
}
