import HotelOrchestDashboardLayout from '@/_orchestrator/hospitality_dashboards/components/HotelOrchestDashboardLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId',
)({
  component: HotelOrchestDashboardLayout,
  staticData:{
    breadcrumb:"Test"
  }
})

