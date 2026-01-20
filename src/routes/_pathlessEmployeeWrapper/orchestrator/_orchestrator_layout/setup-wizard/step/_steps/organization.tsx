import { OrchestratorHQSetup } from '@/_orchestrator/OrchestSetupWizard/components/OrchestHQSetup'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/step/_steps/organization',
)({
  component: OrchestratorHQSetup,
})

