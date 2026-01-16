import { OrgSetupConfiguration } from '@/_orchestrator/OrchestSetupWizard/OrgSetupConfigs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/',
)({
  component: OrgSetupConfiguration,
})

