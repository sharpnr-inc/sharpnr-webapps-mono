import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/social_media_management',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/dashboard/_layout/sharpmarketing/social-media-management"!
    </div>
  )
}
