import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/attendance/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/attendance/"!</div>
}
