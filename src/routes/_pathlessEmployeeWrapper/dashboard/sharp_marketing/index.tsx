import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessEmployeeWrapper/dashboard/sharp_marketing/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/sharpmarketing/"!</div>
}
