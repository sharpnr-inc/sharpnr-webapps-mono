import { HREmployeeDetailsPage } from '@/_hrapp/pages/HREmployeeDetailsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hr/employees/$employeeId',
)({
  component: HREmployeeDetailsPage,
})
