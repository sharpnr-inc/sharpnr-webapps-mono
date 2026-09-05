import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/sharp-hr/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/sharp-hr/"!</div>
}
