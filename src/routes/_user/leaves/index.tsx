import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/leaves/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/leaves/"!</div>
}
