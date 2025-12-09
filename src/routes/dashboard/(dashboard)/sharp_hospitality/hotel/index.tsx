import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_hospitality/hotel/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/sharp_hospitality/hotel/"!</div>
}
