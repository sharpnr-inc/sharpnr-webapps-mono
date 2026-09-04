import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Layers } from "lucide-react";

function SegmentsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Layers}
      title="Segments"
      description="Groups of contacts and customers defined by rules, ready to target with a campaign or journey."
      capabilities={[
        "Rule-based segments that stay up to date on their own",
        "Static lists for one-off sends",
        "Behavioural, attribute and lifecycle filters",
        "Live size preview while building",
        "Reusable as campaign and journey audiences",
      ]}
    />
  );
}

export default SegmentsIndexPage;
