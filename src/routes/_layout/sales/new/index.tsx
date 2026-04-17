import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/sales/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/sales/new/"!</div>
}
