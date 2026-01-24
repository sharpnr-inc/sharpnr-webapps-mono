
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/employee_attendance')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>This is Vlaendfjn</div>
}
