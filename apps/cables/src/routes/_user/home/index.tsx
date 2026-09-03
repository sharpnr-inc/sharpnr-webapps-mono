import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/home/"!</div>
}
