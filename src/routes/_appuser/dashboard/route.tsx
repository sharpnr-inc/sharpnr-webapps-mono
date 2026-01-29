import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* <DynamicIslandHost /> */}

      <Outlet />
    </>
  );
}


// Should we create the 