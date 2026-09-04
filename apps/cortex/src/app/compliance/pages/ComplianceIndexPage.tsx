import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { ClipboardCheck } from "lucide-react";

function ComplianceIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ClipboardCheck}
      title="Compliance"
      description="The evidence side of governance: control coverage, periodic access reviews, and the reports auditors ask for."
      capabilities={[
        "Control coverage against your chosen frameworks",
        "Scheduled access reviews with attestation",
        "Exception register with owners and expiry",
        "Evidence packs generated from audit data",
        "Multi-organization reporting from one control plane",
      ]}
    />
  );
}

export default ComplianceIndexPage;
