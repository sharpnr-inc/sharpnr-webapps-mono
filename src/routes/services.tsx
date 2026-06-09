// /services
import ArchitecturePage from "@/app/services/ArchitecturePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: ArchitecturePage,
  head: () => ({
    meta: [
      { title: "Services | Enterprise Consulting & Support" },
      {
        name: "description",
        content:
          "Professional services to help you implement and optimize Sharpnr for your business. CRM implementation, HRMS migration, and custom enterprise consulting.",
      },
    ],
  }),
});
