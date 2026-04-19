import OrganizationIndexPage from '@/_orchestrator/organization/OrganizationIndexPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/_console/organization/',
)({
  component: OrganizationIndexPage,
})
