import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/authorization/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/authorization/users/"!</div>
}
