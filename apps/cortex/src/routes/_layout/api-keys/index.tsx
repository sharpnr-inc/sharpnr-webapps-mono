import ApiKeysIndexPage from "@/app/api-keys/pages/ApiKeysIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/api-keys/")({
  component: ApiKeysIndexPage,
});
