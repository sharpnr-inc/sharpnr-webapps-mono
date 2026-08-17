import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";

export const Route = createFileRoute("/_user")({
  component: UserLayout,
});

function UserLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
