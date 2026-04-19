import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/cables/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/cables/"!</div>
}
