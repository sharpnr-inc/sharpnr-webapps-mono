import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/_modules/bar/$barID/table_management/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/bar/$barID/table_management/"!</div>
}
