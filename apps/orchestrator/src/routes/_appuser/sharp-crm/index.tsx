import CRMServiceIndexPage from "@/app/sharp_crm/pages/CRMServiceIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/sharp-crm/")({
  component: CRMServiceIndexPage,
});
