import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Workflow } from "lucide-react";

function JourneysIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Workflow}
      title="Journeys"
      description="Automation that responds to what customers do — a signup, a visit, a purchase — with the right next step, without anyone babysitting a campaign."
      capabilities={[
        "Visual journey builder",
        "Event, date and attribute-change triggers",
        "Branching, waits, and goal conditions",
        "Steps across email, SMS, tasks and record updates",
        "Entry and exit rules with re-entry control",
      ]}
    />
  );
}

export default JourneysIndexPage;
