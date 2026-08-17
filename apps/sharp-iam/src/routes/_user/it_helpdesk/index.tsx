import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/it_helpdesk/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/it_helpdesk/"!</div>
}
