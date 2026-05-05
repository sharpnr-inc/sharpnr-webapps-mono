import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setup_wizard/$stepID/base_setup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/setup_wizard/$stepID/base_setup"!</div>
}
