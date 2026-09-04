import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Package } from "lucide-react";

function AssetsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Package}
      title="Assets"
      description="What IT owns, where it is, and who is responsible for it — tracked alongside the access controls that govern it."
      capabilities={[
        "Asset register beyond enrolled devices",
        "Assignment, location and custodian",
        "Purchase, warranty and lifecycle dates",
        "Licence and subscription tracking",
        "Depreciation handoff to Sharp-Accounting",
      ]}
    />
  );
}

export default AssetsIndexPage;
