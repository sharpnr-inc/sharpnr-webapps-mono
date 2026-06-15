import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/expenses_claims/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/expenses_claims/"!</div>
}
