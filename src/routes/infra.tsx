// /infra
import { InfraPage } from "@/app/infra/InfraPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/infra")({
  component: InfraPage,
  head: () => ({
    meta: [
      { title: "Infrastructure | Sharpnr Enterprise Engine" },
      {
        name: "description",
        content:
          "Learn about the powerful infrastructure powering Sharpnr. High-performance, secure, and scalable foundation for enterprise operations.",
      },
    ],
  }),
});
