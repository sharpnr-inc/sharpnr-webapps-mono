import { RestaurantSideBarWrapper } from '@/_hospitalityapp/Restaurant/components/RestuarantSideBarWrapper'
import { createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_hospitality/restaurant')(
  {
    component: RestaurantSideBarWrapper,
  },
)

