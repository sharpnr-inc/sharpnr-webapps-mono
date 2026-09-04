import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Settings } from "lucide-react";

function SettingsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Settings}
      title="Settings"
      description="How Stockwave is configured for your organization — costing, numbering, units, and who can move stock."
      capabilities={[
        "Costing method and valuation period",
        "Units of measure and conversions",
        "Document numbering for orders and transfers",
        "Reason codes for adjustments and returns",
        "Roles and approval thresholds for stock movements",
      ]}
    />
  );
}

export default SettingsIndexPage;
