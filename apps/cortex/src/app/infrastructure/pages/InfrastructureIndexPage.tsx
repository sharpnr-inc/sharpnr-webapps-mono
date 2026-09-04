import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Server } from "lucide-react";

function InfrastructureIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Server}
      title="Infrastructure"
      description="The infrastructure running your organization on the platform, under the same role-based and audited access model as everything else."
      capabilities={[
        "Infrastructure inventory by environment",
        "Role-based operational access",
        "Session recording for privileged access",
        "Break-glass access with mandatory justification",
        "Change and access history per component",
      ]}
    />
  );
}

export default InfrastructureIndexPage;
