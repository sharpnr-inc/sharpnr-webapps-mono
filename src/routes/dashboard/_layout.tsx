// src/routes/dashboard/_layout.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUIRenderer } from "@/context/ui-rendererContext";
import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/_layout")({
  beforeLoad: () => {
    const storedData = localStorage.getItem("_sharpnr_user_data_");
    const userData = storedData ? JSON.parse(storedData) : null;

    return { empId: userData?.EmployeeID };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasSectionAccess } = useUIRenderer();

  useEffect(() => {
    const path = location.pathname; // ← Use location from hook
    const segments = path.split("/").filter(Boolean);
    console.log(segments);

    // Skip guard if it's just /dashboard (no module/section)
    if (segments.length <= 1) {
      return;
    }

    // Extract module and section
    // /dashboard/_layout/sharphospitality/hotel -> ["dashboard", "_layout", "sharphotel", "hotel"]
    // Note: _layout is in the path!
    const moduleFolder = segments[1]; // "sharphotel" (skip "dashboard" and "_layout")
    const sectionName = segments[2]; // "hotel"

    if (!hasSectionAccess(moduleFolder, sectionName)) {
      navigate({ to: "/dashboard/unauthorised" });
    }
  }, [location.pathname, hasSectionAccess, navigate]);

  return (
    // <ScrollArea className="h-full">
      <div className="mt-16 mr-2 ml-2">
        <Outlet />
      </div>
    // </ScrollArea>
  );
}
