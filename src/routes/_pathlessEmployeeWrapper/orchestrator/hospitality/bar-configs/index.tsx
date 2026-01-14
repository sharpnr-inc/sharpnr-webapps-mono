import BarConfigSection from '@/_hospitalityapp/Bar/sections/BarConfigSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/orchestrator/hospitality/bar-configs/',
)({
  component: BarConfigSection,
})

