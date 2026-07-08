import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/deparments/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appuser/deparments/"!</div>
}
