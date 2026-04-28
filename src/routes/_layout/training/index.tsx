import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/training/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/training/"!</div>
}
