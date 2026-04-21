import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/onboarding/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/onboarding/"!</div>
}
