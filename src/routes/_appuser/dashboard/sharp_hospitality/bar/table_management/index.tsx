import BarTableManagementPage from '@/_hospitalityapp/Bar/pages/BarTableManagementPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/dashboard/sharp_hospitality/bar/table_management/',
)({
  component: BarTableManagementPage,
})
