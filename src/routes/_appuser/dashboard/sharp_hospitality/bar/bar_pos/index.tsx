import BarGeneralSalePage from '@/_hospitalityapp/Bar/pages/BarGeneralSalePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/bar/bar_pos/',
)({
  component: BarGeneralSalePage,
})

