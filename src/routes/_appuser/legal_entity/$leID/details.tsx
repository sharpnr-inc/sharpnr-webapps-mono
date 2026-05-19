import LegalEntityDetailsPage from "@/app/legal_entity/pages/LegalEntityDetailsPage";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  lename: z.string().optional(),
  le__type: z.string().optional(),
});

export const Route = createFileRoute("/_appuser/legal_entity/$leID/details")({
  validateSearch: searchSchema,
  component: LegalEntityDetailsPage,
});
