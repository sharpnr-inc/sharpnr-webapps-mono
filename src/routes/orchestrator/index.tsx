import { OrchestratorIndex } from '@/_orchestrator/pages/Orchestrator'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orchestrator/')({
  component: OrchestratorIndex,
})
