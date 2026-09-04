import ProductsIndexPage from "@/app/products/pages/ProductsIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/products/")({
  component: ProductsIndexPage,
});
