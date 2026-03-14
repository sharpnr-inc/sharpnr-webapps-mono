import { LegalEntityIndexPage } from "@/_orchestrator/legal_entity/LegalEntityIndexPage"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/legal_entity/',
)({
  component: LegalEntityIndexPage,
})
