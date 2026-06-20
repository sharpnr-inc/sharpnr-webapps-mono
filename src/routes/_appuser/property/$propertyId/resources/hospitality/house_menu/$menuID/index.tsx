import HouseMenuConfigIndexPage from "@/property_resources_modules/hospitality/house_menu/pages/HouseMenuConfigIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/resources/hospitality/house_menu/$menuID/",
)({
  component: HouseMenuConfigIndexPage,
});
