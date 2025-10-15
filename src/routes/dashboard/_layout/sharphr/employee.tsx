import HrEmployeesManagementSection from '@/ui_modules/HR/Employees/HrEmployeeManagement'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharphr/employee')({
  component: HrEmployeesManagementSection,
})


