import { ProductsPage } from "@/app/products/ProductsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});
