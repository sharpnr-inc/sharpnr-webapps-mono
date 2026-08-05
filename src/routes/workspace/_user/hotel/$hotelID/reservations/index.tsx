import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/_user/hotel/$hotelID/reservations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/hotel/$hotelID/reservations/"!</div>
}
