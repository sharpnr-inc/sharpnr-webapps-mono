import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/_layout/sharpAccounting/suppliersandvendors',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/dashboard/_layout/sharpAccounting/suppliersandvendors"!</div>
  )
}
