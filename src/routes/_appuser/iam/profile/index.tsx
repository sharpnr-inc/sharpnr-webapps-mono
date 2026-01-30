import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/iam/profile/"!</div>
}
