import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup/verify-otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/signup/verify-otp"!</div>
}
