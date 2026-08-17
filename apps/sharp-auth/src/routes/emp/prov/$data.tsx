import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/emp/prov/$data")({
  beforeLoad: async ({ params }) => {
    // Extract raw string from URL params
    const rawData = params.data;
    if (!rawData) {
      throw redirect({ to: "/" });
    }

    // Split by '+' delimiter
    const parts = rawData.split("+");
    if (parts.length < 4) {
      throw redirect({ to: "/" });
    }

    const token = decodeURIComponent(parts[0]);
    const firstName = decodeURIComponent(parts[1]);
    const lastName = decodeURIComponent(parts[2]);
    const email = decodeURIComponent(parts[3]);

    try {
      // Send verification request to backend
      const response = await fetch(
        "https://apiengine.sharpnr.com/api/v1/identity/web/provision",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            firstName,
            lastName,
            email,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid or expired link");
      }

      // Verification passed: redirect to provisioning form and replace browser history
      // so the token URL is completely removed from browser history
      throw redirect({
        to: "/emp/provisioning",
        replace: true,
      });
    } catch (err) {
      // If it's already a TanStack redirect, rethrow it
      if (
        err instanceof Response ||
        (err && typeof err === "object" && "to" in err)
      ) {
        throw err;
      }
      // On API failure or bad token, redirect to login/home
      throw redirect({ to: "/" });
    }
  },
  component: () => null, // Never renders because beforeLoad redirects
});
