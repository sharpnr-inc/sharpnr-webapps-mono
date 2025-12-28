import BarConfigSection from '@/_hospitalityapp/Bar/sections/BarConfigSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/sharp_hospitality/org-config/bar-settings',
)({
  component: BarConfigSection,
})

