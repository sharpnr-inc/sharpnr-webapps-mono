import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { TriangleAlert } from "lucide-react";

function AlertsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={TriangleAlert}
      title="Alerts"
      description="What needs attention right now: stock below its reorder point, items about to expire, and counts that do not reconcile."
      capabilities={[
        "Low-stock and out-of-stock alerts against reorder points",
        "Overstock and slow-moving inventory warnings",
        "Expiry and shelf-life alerts for dated stock",
        "Negative and mismatched stock flagged for investigation",
        "Routing so each alert reaches the person who can act on it",
      ]}
    />
  );
}

export default AlertsIndexPage;
