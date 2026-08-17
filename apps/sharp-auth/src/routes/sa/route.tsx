import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sa')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sa"!</div>
}
