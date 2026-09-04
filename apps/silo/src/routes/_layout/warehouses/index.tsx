import WarehousesIndexPage from "@/app/warehouses/pages/WarehousesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/warehouses/")({
  component: WarehousesIndexPage,
});
