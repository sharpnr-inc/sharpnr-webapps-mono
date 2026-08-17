import AppUserAttendancePage from "@/app/attendance/pages/AttendancePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/attendance/")({
  component: AppUserAttendancePage,
});
