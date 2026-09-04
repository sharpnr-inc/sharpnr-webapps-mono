import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { BarChart3 } from "lucide-react";

function AnalyticsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={BarChart3}
      title="Analytics"
      description="The dashboards that ship with SharpCRM — how the funnel, the campaigns and the team are actually performing."
      capabilities={[
        "Funnel and conversion analytics by stage and source",
        "Campaign ROI and multi-touch attribution",
        "Sales cycle length and pipeline velocity",
        "Cohort and retention analysis",
        "Team activity and productivity dashboards",
      ]}
    />
  );
}

export default AnalyticsIndexPage;
