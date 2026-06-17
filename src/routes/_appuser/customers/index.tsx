import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/customers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/customers/"!</div>
}
