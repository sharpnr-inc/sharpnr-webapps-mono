import { Outlet } from "@tanstack/react-router";

export default function RestaurantMainLayout() {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
}
