import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/apps')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/apps"!</div>
}
