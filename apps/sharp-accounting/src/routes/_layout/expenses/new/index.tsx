import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/expenses/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/expenses/new/"!</div>
}
