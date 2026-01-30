import OrganizationIndexPage from '@/_orchestrator/OrchestDashboard/organization/OrganizationIndexPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/organization/',
)({
  component: OrganizationIndexPage,
})
