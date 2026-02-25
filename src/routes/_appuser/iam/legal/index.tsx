import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/legal/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/iam/legal/"!</div>
}
