import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/reviews/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/reviews/"!</div>
}
