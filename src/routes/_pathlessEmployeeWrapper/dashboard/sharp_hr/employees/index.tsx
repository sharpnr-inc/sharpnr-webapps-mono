import HRAllEmployeePage from '@/_hrapp/pages/HRAllEmployeePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessEmployeeWrapper/dashboard/sharp_hr/employees/',)({
  component: HRAllEmployeePage,
})

