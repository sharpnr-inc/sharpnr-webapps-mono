import ORGConfigSection from '@/_hospitalityapp/orchestrator/pages/ORGconfig'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/org-config/orchestrator',
)({
  component: ORGConfigSection,
})

