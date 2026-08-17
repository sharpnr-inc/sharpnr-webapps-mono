import { RecruitmentAddEmployeePage } from "@/app/Recruitments/RecruitmentPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/recruitment/")({
  component: RecruitmentAddEmployeePage,
});
