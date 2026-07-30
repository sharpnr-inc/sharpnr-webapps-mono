import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/emp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/emp"!</div>
}
