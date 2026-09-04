import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { FileCheck } from "lucide-react";

function PoliciesIndexPage() {
  return (
    <FeaturePlaceholder
      icon={FileCheck}
      title="Policies"
      description="Your organization's security posture expressed centrally — who may hold which roles, how credentials are handled, what access needs review."
      capabilities={[
        "Central policy definitions applied org-wide",
        "Conditions on role eligibility and credential handling",
        "Access review requirements and expiry rules",
        "Policy simulation before enforcement",
        "Violation reporting with owners",
      ]}
    />
  );
}

export default PoliciesIndexPage;
