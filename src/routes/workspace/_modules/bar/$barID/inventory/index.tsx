import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/_modules/bar/$barID/inventory/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/bar/$barID/inventory/"!</div>
}
