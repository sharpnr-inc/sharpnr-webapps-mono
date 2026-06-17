import OrganizationIndexPage from '@/app/organization/pages/OrganizationIndexPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/organization/',
)({
  component: OrganizationIndexPage,
})
