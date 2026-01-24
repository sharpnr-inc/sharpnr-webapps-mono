import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/employee/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello this is employee Home page!</div>
}
