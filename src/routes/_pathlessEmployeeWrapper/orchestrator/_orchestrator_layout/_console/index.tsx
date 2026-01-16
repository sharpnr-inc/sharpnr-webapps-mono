import { OrchestratorAdminConsole } from '@/_orchestrator/OrchestDashboard/Orchestrator'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/_console/',
)({
  component: OrchestratorAdminConsole,
})

