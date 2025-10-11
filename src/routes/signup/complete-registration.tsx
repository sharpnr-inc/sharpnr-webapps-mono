import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup/complete-registration')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/signup/complete-registration"!</div>
}
