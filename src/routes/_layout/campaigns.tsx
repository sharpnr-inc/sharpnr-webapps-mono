
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_layout/campaigns"
)({
  component: RouteComponent,
});

function RouteComponent(){
  return(
    <div>Unimplemented</div>
  )
}
