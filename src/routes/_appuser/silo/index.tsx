import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/silo/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/silo/"!</div>
}
