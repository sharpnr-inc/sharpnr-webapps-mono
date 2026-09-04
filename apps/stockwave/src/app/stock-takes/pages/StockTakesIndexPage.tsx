import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { ClipboardCheck } from "lucide-react";

function StockTakesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ClipboardCheck}
      title="Stock Takes"
      description="Counting what is actually on the shelf and reconciling it against what the system believes."
      capabilities={[
        "Full, partial and cycle counts",
        "Count sheets assigned to counters by zone",
        "Blind counts to keep the expected figure hidden",
        "Variance review before anything is posted",
        "Adjustments generated from approved variances",
      ]}
    />
  );
}

export default StockTakesIndexPage;
