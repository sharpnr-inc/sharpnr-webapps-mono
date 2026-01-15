import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessEmployeeWrapper/orchestrator')({
  component: Outlet,
})
