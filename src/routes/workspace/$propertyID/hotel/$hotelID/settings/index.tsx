import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/$propertyID/hotel/$hotelID/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/hotel/$hotelID/settings/"!</div>
}
