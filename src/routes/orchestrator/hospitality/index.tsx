import ORGConfigSection from '@/_orchestrator/components/ORGconfig'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orchestrator/hospitality/')({
  component: ORGConfigSection,
})

