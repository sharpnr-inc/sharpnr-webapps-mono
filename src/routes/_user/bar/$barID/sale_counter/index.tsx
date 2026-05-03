import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/bar/$barID/sale_counter/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/bar/$barID/sale_counter/"!</div>
}
