import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/cortex/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/cortex/"!</div>
}
