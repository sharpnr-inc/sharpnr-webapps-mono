import { GlobalHeader } from "@/components/Header/global/GlobalHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessEmployeeWrapper")({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <GlobalHeader />
      <Outlet />
    </>
  );
}
