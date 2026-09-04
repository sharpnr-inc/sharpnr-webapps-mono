import CategoriesIndexPage from "@/app/categories/pages/CategoriesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/categories/")({
  component: CategoriesIndexPage,
});
