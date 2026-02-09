import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hr/employees')({
  component: Outlet,
  staticData:{
    breadcrumb:"Employees"
  }
})


