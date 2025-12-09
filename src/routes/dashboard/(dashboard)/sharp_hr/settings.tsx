import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(dashboard)/sharp_hr/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/sharp_hr/settings"!</div>
}
