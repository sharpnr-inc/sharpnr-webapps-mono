import Calendar from '@/components/calander/Calander'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/employee/employee-attendance')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div><Calendar/></div>
}
