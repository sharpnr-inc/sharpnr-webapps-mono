// src/routes/dashboard/_layout.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_layout")({
  beforeLoad: () => {
    const storedData = localStorage.getItem("_sharpnr_user_data_");
    const userData = storedData ? JSON.parse(storedData) : null;

    return { empId: userData?.EmployeeID };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ScrollArea className="h-full">
      <div className="mt-16 mr-2 ml-2">
        <Outlet />
      </div>
    </ScrollArea>
  );
}
