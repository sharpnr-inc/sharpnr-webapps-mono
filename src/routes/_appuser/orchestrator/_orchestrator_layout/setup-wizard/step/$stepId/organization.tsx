import { OrchestratorHQSetup } from '@/_orchestrator/SetupWizard/SetupWizardOrgHQPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/setup-wizard/step/$stepId/organization',
)({
  component: RouteComponent
})

function RouteComponent(){
  return(
    <div>
      <OrchestratorHQSetup/>
    </div>
  )
}