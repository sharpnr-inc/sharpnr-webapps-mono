import FeaturePlaceholder from "@/components/FeaturePlaceholder";
import { ShieldCheck } from "lucide-react";

function PermissionsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={ShieldCheck}
      title="Permissions"
      description="Who can reach which resource, at what level — the model Cortex governs and Silo enforces."
      capabilities={[
        "Read, Write and Admin grants per resource",
        "Role-based access inherited from Cortex",
        "Per-bucket, per-database and per-dataset scoping",
        "Effective-permission view for any user or service",
        "Grant expiry and scheduled access review",
      ]}
    />
  );
}

export default PermissionsIndexPage;
