
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/employee/employee-attendance')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>This is Vlaendfjn</div>
}
