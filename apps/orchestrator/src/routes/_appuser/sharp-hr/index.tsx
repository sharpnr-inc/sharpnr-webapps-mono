import HrServiceIndexPage from "@/app/sharp-hr/pages/HrServiceIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/sharp-hr/")({
  component: HrServiceIndexPage,
});
