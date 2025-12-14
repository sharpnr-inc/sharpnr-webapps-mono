import { createFileRoute } from '@tanstack/react-router'
import {Hotel} from "lucide-react"
import RestaurantMainLayout from '@/_hospitalityapp/pages/restuarant/RestaurantMainLayout'

export const Route = createFileRoute('/dashboard/(dashboard)/sharp_hospitality/hotel')({
  component: RestaurantMainLayout,
    context: () => ({
    heading: "Dearie Hotel",
    subheading: "Manage Hotel operations",
    HeaderIcon:Hotel
  }),
})


