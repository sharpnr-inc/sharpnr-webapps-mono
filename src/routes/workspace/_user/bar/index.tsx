import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/_user/bar/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/bar/"!</div>
}
