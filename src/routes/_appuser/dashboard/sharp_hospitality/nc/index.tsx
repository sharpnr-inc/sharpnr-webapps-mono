import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/nc/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="p-10 place-items-center-safe justify-between">
    <p>Feature Under development</p>
    </div>
}
