import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/requests')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/requests"!</div>
}
