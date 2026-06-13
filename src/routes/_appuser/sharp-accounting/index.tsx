import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/sharp-accounting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/sharp-accounting/"!</div>
}
