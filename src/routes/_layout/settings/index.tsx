import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/settings/"!</div>
}
