import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/settings/"!</div>
}
