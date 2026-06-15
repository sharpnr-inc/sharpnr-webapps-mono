import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/goals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/goals/"!</div>
}
