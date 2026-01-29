import { HotelFloorConfig } from '@/_orchestrator/hospitality_configs/hotel/HotelConfigurationPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration',
)({
  component: HotelFloorConfig,
})

