import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/nc/overview/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="p-10">Feature Under development</div>
}
