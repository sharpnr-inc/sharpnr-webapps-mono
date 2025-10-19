import EmployeeProfilePage from '@/components/UiModuels/employees/EmployeeProfilePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/employee/profile')({
  component: EmployeeProfilePage
})
