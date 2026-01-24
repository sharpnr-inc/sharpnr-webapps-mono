import { OrchestratorHQSetup } from '@/_orchestrator/SetupWizard/SetupWizardOrgHQPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/_orchestrator_layout/setup-wizard/step/_steps/organization',
)({
  component: RouteComponent
})

function RouteComponent(){
  return(
    <div>
      <OrchestratorHQSetup exam ={"lodu"}/>
    </div>
  )
}