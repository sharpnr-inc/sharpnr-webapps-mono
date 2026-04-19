import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/setup-wiz/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/setup-wiz/"!</div>
}
