import Header from "@/components/shared/Header";
import SidebarMain from "@/components/Sidebar/Sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_layout")({
  component: () => (
    <div className="flex h-screen">
      <Header></Header>
      <SidebarMain></SidebarMain>
      <main className="flex-1 p-4 mt-[4rem] ml-[16rem]">
        <Outlet />
      </main>
    </div>
  ),
});
