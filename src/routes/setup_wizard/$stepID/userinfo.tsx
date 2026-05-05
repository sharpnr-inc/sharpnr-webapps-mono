import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setup_wizard/$stepID/userinfo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/setup_wizard/$stepID/userinfo"!</div>
}
