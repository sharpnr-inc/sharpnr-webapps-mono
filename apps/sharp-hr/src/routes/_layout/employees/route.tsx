import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/employees')({
  component: Outlet,
  staticData:{
    breadcrumb:"Employees"
  }
})


