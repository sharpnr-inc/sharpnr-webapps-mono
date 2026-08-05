import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/$propertyID/hotel/$hotelID/inventory/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/hotel/$hotelID/inventory/"!</div>
}
