import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/folio/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/folio/"!</div>
}
