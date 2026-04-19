import PropertySettingPage from '@/_orchestrator/properties/property/PropertySettingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/property/$propertyId/property_settings/',
)({
  component: PropertySettingPage,
  staticData:{
    breadcrumb:"Property Settings"
  }
})


