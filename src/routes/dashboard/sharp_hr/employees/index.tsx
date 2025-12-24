import HrEmployeePage from '@/_hrapp/pages/HrMainPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_hr/employees/',)({
  component: HrEmployeePage,
})

