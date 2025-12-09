import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: AddrCard,
});

function AddrCard() {
  return (
    <div className="p-4 rounded shadow border-2 m-2">
      <h2 className="text-xl font-bold mb-2">Dashboard Home</h2>
      <p className="mb-5">Welcome to your dashboard!</p>
    </div>
  );
}
