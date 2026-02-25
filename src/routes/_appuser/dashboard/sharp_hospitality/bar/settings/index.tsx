import BarGenSettingsPage from '@/_hospitalityapp/Bar/pages/BarGenSettingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/bar/settings/',
)({
  component: BarGenSettingsPage,
})
