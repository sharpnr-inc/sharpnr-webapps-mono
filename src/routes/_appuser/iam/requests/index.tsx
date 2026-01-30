import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/requests/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/iam/requests/"!</div>
}
