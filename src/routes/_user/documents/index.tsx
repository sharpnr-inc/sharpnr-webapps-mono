import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/documents/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/documents/"!</div>
}
