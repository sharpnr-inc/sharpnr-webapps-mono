// file: /dashboard/_layout/sharp_hospitality/restaurant/$tableId.tsx

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_layout/sharp_hospitality/restaurant/$tableId"
)({
  loader: async ({ params }) => {
    const { tableId } = params;
    console.log(tableId)

    if (!tableId) {
      throw redirect({
        to: "/dashboard/sharp_hospitality/restaurant",
      });
    }

    // return always an object
    return { tableId };
  },

  component: TablePage,
});

function TablePage() {
  const {tableId} = Route.useLoaderData();  // MUST NOT be undefined
  console.log(tableId)

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Table Page — {tableId}
      </h1>
    </div>
  );
}
