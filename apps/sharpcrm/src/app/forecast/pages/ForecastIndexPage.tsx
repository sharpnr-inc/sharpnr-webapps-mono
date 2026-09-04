import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { TrendingUp } from "lucide-react";

function ForecastIndexPage() {
  return (
    <FeaturePlaceholder
      icon={TrendingUp}
      title="Forecast"
      description="What the pipeline is expected to close, by period and by owner — pipeline turned into a number you can commit to."
      capabilities={[
        "Weighted and committed forecast views",
        "Roll-up by rep, team and territory",
        "Quota setting and attainment tracking",
        "Period-over-period comparison",
        "Pipeline coverage and gap-to-quota analysis",
      ]}
    />
  );
}

export default ForecastIndexPage;
