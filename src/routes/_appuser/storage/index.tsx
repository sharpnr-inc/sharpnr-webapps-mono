import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/storage/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/storage/"!</div>
}
