import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workspace/_modules/hotel/$hotelID/guests/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/hotel/$hotelID/guests/"!</div>
}
