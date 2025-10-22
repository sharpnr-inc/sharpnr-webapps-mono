import { createFileRoute } from '@tanstack/react-router'
import { Hotel } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/_layout/sharphotel/housekeeping',
)({
  component: RouteComponent,
    context: () => ({
    heading: "Dearie Hotel",
    subheading: "Manage Hotel operations",
    HeaderIcon:Hotel
  }),
  
})

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/sharphotel/housekeeping"!</div>
}
