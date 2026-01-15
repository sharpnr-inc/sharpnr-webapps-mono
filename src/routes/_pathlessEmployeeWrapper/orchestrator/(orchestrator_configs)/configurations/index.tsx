import { OrgSetupConfiguration } from '@/_orchestrator/pages/orchestrator_configs/OrgSetupConfigs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/(orchestrator_configs)/configurations/',
)({
  component: OrgSetupConfiguration,
})

