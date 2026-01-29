import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/dashboard/")({
  component: AddrCard,
});

function AddrCard() {
  return <div className="p-4 rounded shadow border-2 m-2">DashBoard Page</div>;
}
