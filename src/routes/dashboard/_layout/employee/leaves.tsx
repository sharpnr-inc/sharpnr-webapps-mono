import MyLeavesPage from '@/ui_modules/Employee/EmployeeLeavePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/employee/leaves')({
  component: MyLeavesPage,
})


