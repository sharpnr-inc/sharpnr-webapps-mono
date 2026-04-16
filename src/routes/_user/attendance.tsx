import AppUserAttendancePage from "@/app/pages/AppUserAttendancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/attendance")({
  component: AppUserAttendancePage,
});
