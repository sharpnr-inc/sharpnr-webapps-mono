import BarGeneralSalePage from '@/_hospitalityapp/Bar/pages/BarGeneralSalePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/dashboard/sharp_hospitality/bar/sale-counter',
)({
  component: BarGeneralSalePage,
})
