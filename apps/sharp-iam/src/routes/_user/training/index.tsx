import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/training/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/training/"!</div>
}
