import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { SlidersHorizontal } from "lucide-react";

function AdjustmentsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={SlidersHorizontal}
      title="Adjustments"
      description="Every change to stock that is not a purchase, sale or transfer — with a reason attached, because unexplained movement is how counts drift."
      capabilities={[
        "Write-offs for damage, loss and expiry",
        "Positive adjustments for found stock",
        "Mandatory reason codes on every adjustment",
        "Approval thresholds for high-value changes",
        "Cost impact posted through to valuation",
      ]}
    />
  );
}

export default AdjustmentsIndexPage;
