import { AddEmployeeDirectHirePage } from '@/_hrapp/pages/AddEmployeeDirectHirePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hr/employees/direct-hire/',
)({
  component: AddEmployeeDirectHirePage,
  staticData:{
    breadcrumb:"Direct Hire"
  }
})
