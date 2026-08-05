import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/workspace/_user/infra',
)({
  component: Outlet,
})
