import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { CalendarCheck } from "lucide-react";

function ActivitiesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={CalendarCheck}
      title="Activities"
      description="Every call, meeting, task and follow-up that is due, in one list. The screen you open to answer “who do I talk to next?”"
      capabilities={[
        "Tasks and follow-ups with owners and due dates",
        "Call and meeting scheduling against contacts and deals",
        "Due-today and overdue queues",
        "Activity timeline rolled up per contact, company and deal",
        "Reassignment and team workload views",
      ]}
    />
  );
}

export default ActivitiesIndexPage;
