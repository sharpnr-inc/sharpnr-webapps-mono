import PropertySettingPage from '@/_orchestrator/OrchestDashboard/property/PropertySettingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/property_settings/',
)({
  component: PropertySettingPage,
  staticData:{
    breadcrumb:"Property Settings"
  }
})


