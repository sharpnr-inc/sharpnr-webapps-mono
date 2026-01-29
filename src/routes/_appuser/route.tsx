import { createFileRoute} from "@tanstack/react-router";

import UserRootLayout from "@/components/layouts/UserRootLayout";

export const Route = createFileRoute("/_appuser")({
  component: UserRootLayout,
});


