import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_hr/recruitment/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/sharp_hr/recruitment/"!</div>
}
