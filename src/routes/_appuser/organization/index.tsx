import OrganizationIndexPage from '@/_orchestrator/organization/OrganizationIndexPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/organization/',
)({
  component: OrganizationIndexPage,
})
