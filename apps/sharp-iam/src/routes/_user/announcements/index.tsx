import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/announcements/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/announcements/"!</div>
}
