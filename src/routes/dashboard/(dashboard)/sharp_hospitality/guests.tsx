import { createFileRoute } from '@tanstack/react-router'
import { PersonStanding } from 'lucide-react'

export const Route = createFileRoute('/dashboard/(dashboard)/sharp_hospitality/guests')({
  component: RouteComponent,
    context: () => ({
    heading: "Guests",
    subheading: "Manage Guests operations",
    HeaderIcon:PersonStanding
  }),
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/sharphotel/guests"!</div>
}
