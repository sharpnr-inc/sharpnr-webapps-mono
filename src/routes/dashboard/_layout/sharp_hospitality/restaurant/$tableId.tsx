// file: /dashboard/_layout/sharp_hospitality/restaurant/$tableId.tsx

import TablePage from "@/components/RoutesPages/sharpHospitality/TablePage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { RockingChair } from "lucide-react";

export const Route = createFileRoute(
  "/dashboard/_layout/sharp_hospitality/restaurant/$tableId"
)({
  loader: async ({ params }) => {
    const { tableId } = params;

    if (!tableId) {
      throw redirect({
        to: "/dashboard/sharp_hospitality/restaurant",
      });
    }

    // return always an object
    return { tableId };
  },

  component: TablePage,
  context: () => ({
    heading: "Table",
    subheading: "Manage Table Session",
    HeaderIcon: RockingChair,
  }),
});
