import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sharp-org-employee/verification/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: typeof search.token === "string" ? search.token : undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useSearch();

  return (
    <div style={{ padding: 20 }}>
      <h1>Employee Verification</h1>

      {token ? (
        <p>
          <strong>Token:</strong> {token}
        </p>
      ) : (
        <p style={{ color: "red" }}>No token found in URL</p>
      )}
    </div>
  );
}
