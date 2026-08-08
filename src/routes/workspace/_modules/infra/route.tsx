import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/workspace/_modules/infra',
)({
  component: Outlet,
})
