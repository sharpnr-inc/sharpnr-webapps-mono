import BarOrdersSection from '@/_hospitalityapp/Bar/sections/BarOrdersSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_pathlessEmployeeWrapper/dashboard/sharp_hospitality/bar/tables-management',
)({
  component: BarOrdersSection,
})
