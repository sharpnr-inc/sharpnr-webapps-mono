import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/legal/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/legal/"!</div>
}
