import FormsIndexPage from "@/app/forms/pages/FormsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/forms/")({
  component: FormsIndexPage,
});
