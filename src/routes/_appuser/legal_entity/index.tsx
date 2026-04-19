import { LegalEntityIndexPage } from "@/_orchestrator/legal_entity/LegalEntityIndexPage"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/legal_entity/',
)({
  component: LegalEntityIndexPage,
})
