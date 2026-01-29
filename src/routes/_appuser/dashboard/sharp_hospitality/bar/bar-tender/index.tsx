import BarTenderPage from '@/_hospitalityapp/Bar/pages/BarTenderPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/bar/bar-tender/',
)({
  component: BarTenderPage,
})
